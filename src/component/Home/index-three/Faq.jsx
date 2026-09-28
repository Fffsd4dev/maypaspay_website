import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SWIPE_THRESHOLD = 70; // px to drag before the card leaves
const STACK_OFFSET = 12; // px between stacked cards
const VISIBLE_BEHIND = 2; // cards showing under the top one
const AUTOPLAY_DELAY = 5000; // ms each card stays in front (longer, since FAQ answers take more time to read)

export default function Faq() {

    const cardsRef = useRef(null);

    const faqs = [
        {
            title : 'How is my crypto and money protected?', 
            desc : 'Your digital assets are secured in offline cold-storage custody with institutional-grade partners. Fiat balances are held in ring-fenced accounts at licensed partner institutions, protected by 256-bit AES encryption and multi-factor authentication (MFA).',
        },
        {
            title : 'Can I hold BTC, USD, and Naira together?', 
            desc : 'Yes. Our unified triple-wallet engine allows you to manage traditional currencies (USD and NGN) alongside digital assets like Bitcoin inside one app, giving you a seamless bridge for instant swaps without needing multiple platforms.',
        },
        {
            title : 'What can I use Maypas virtual cards for?', 
            desc : 'Maypas USD and NGN virtual cards are built for high-success global spending. You can use them for international subscriptions (Netflix, Spotify, OpenAI), software services (AWS, Google Workspace), Meta & Google Ads, and online shopping wherever Mastercard or Visa is accepted.',
        },
        {
            title : 'What are the conversion and card fees?', 
            desc : 'We operate on full fee transparency with no hidden maintenance charges. Currency conversions between BTC, USD, and NGN use real-time market rates with transparent spreads displayed before you confirm any swap or card creation.',
        },
        {
            title : 'How fast do crypto to Naira/USD swaps process?', 
            desc : 'Instantly. Instead of waiting for peer-to-peer (P2P) matchings or bank processing delays, Maypas Pay executes swaps directly inside your app so you can off-ramp crypto to fiat or fund your virtual cards in seconds.',
        },
        {
            title : 'How do I get started and complete verification?', 
            desc : 'Download the Maypas Pay app, register with your email, and submit a valid government ID along with your BVN/NIN for automated KYC verification. Once verified, your multi-currency wallets and virtual cards are active immediately.',
        }
    ];

    // ---------- Mobile swipe stack state ----------
    const [order, setOrder] = useState(() => faqs.map((_, i) => i));
    const [dx, setDx] = useState(0);
    const [dragging, setDragging] = useState(false);
    const [leaving, setLeaving] = useState(0); // -1 | 0 | 1
    const [moved, setMoved] = useState(null); // card that just went to the back
    const [inView, setInView] = useState(false);
    const startX = useRef(0);
    const swipeTimer = useRef(null);
    const mobileRef = useRef(null);

    useEffect(() => () => clearTimeout(swipeTimer.current), []);

    // Makes the card that went to the back appear in place instead of sweeping in from the side
    useEffect(() => {
        if (moved === null) return;
        const id = setTimeout(() => setMoved(null), 60);
        return () => clearTimeout(id);
    }, [moved]);

    const sendToBack = (dir) => {
        setLeaving(dir);
        swipeTimer.current = setTimeout(() => {
            const front = order[0];
            setMoved(front);
            setOrder([...order.slice(1), front]);
            setLeaving(0);
            setDx(0);
        }, 250);
    };

    // Track whether the mobile stack is on screen
    useEffect(() => {
        const el = mobileRef.current;
        if (!el) return;
        const io = new IntersectionObserver(
            ([entry]) => setInView(entry.isIntersecting),
            { threshold: 0.4 }
        );
        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Autoplay: send the top card to the back after a delay
    useEffect(() => {
        if (!inView || dragging || leaving) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const id = setTimeout(() => sendToBack(-1), AUTOPLAY_DELAY);
        return () => clearTimeout(id);
    }, [order, inView, dragging, leaving]);

    const bringToFront = (i) => {
        if (leaving) return;
        const pos = order.indexOf(i);
        if (pos > 0) setOrder([...order.slice(pos), ...order.slice(0, pos)]);
    };

    const onPointerDown = (e) => {
        if (leaving) return;
        startX.current = e.clientX;
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e) => {
        if (dragging) setDx(e.clientX - startX.current);
    };

    const onPointerUp = () => {
        if (!dragging) return;
        setDragging(false);
        if (Math.abs(dx) > SWIPE_THRESHOLD) sendToBack(dx > 0 ? 1 : -1);
        else setDx(0);
    };

    const getStackStyle = (pos, itemIndex) => {
        if (pos === 0) {
            const x = leaving ? `${leaving * 120}%` : `${dx}px`;
            const rot = leaving ? leaving * 8 : dx / 20;
            return {
                transform: `translateX(${x}) rotate(${rot}deg)`,
                opacity: leaving ? 0 : 1,
                transition: dragging ? "none" : "transform 250ms ease-out, opacity 250ms ease-out",
                zIndex: 30,
            };
        }
        const depth = Math.min(pos, VISIBLE_BEHIND);
        return {
            transform: `translateY(${depth * STACK_OFFSET}px) scale(${1 - depth * 0.05})`,
            transformOrigin: "bottom center",
            opacity: pos > VISIBLE_BEHIND ? 0 : 1,
            transition: moved === itemIndex ? "none" : "transform 250ms ease-out, opacity 250ms ease-out",
            zIndex: 30 - pos,
        };
    };

    // Your exact card markup, used for both mobile and desktop
    const renderFaqCard = (item) => (
        <div className=" flex gap-4 lg:gap-6 p-4 lg:p-6 bg-background rounded-2xl border border-border">
            <div className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-full bg-secondary shrink-0 text-white">
                <svg className="w-3 sm:w-3.25 h-4 sm:h-4.5 fill-current">
                    <use href="#questionMark"></use>
                </svg>
            </div>
            <div>
                <h3 className="text-title_black leading-snug text-xl font-semibold">{item.title}</h3>
                <p className="text-base font-normal leading-normal text-paragraph_black mt-3">
                    {item.desc}
                </p>
            </div>
        </div>
    );

    // Cards animation
    useEffect(() => {

        if (!cardsRef.current) return;

        const ctx = gsap.context(() => {

            const cards = gsap.utils.toArray("[data-sttr-card]", cardsRef.current);

            gsap.from(cards, {
                y: 50,
                opacity: 0,
                filter: "blur(10px)",
                duration: 0.6,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

        }, cardsRef);

        return () => ctx.revert();

    }, []);

  return (
    <>
        <div ref={cardsRef} data-sttr-wrapper>

            {/* Mobile: swipe stack with autoplay */}
            <div ref={mobileRef} data-sttr-card className="md:hidden w-full">
                <div className="grid" style={{ paddingBottom: VISIBLE_BEHIND * STACK_OFFSET }}>
                    {order.map((itemIndex, pos) => {
                        const item = faqs[itemIndex];
                        const isTop = pos === 0;
                        return (
                            <div
                                key={item.title}
                                style={{ gridArea: "1 / 1", ...getStackStyle(pos, itemIndex) }}
                                className={`select-none [&>*]:h-full ${
                                    isTop ? "touch-pan-y cursor-grab active:cursor-grabbing" : "pointer-events-none"
                                }`}
                                {...(isTop && {
                                    onPointerDown,
                                    onPointerMove,
                                    onPointerUp,
                                    onPointerCancel: onPointerUp,
                                })}
                            >
                                {renderFaqCard(item)}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-3 flex w-full items-center justify-center gap-2">
                    {faqs.map((item, i) => (
                        <button
                            key={item.title}
                            type="button"
                            aria-label={`Show question ${i + 1} of ${faqs.length}`}
                            onClick={() => bringToFront(i)}
                            className={`h-2 rounded-full transition-all ${
                                order[0] === i ? "w-6 bg-black" : "w-2 bg-black/20"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* md and up: your original grid (only `hidden md:grid` added) */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                {faqs.map((item, index)=>(
                    <div data-sttr-card key={index}>
                        {renderFaqCard(item)}
                    </div>
                ))}
            </div>

        </div>
    </>
  )
}