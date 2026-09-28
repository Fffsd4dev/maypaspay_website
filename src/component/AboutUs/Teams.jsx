import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import titlePrimary from "../../assets/img/title-icon-primary.svg";
import aboutUs3 from "../../assets/img/Paschal.jpg";
import aboutUs4 from "../../assets/img/IJ.jpg";
import aboutUs5 from "../../assets/img/Bola.jpg";
import aboutUs6 from "../../assets/img/about-us/about-us-6.webp";
import aboutUs7 from "../../assets/img/about-us/about-us-7.webp";
import aboutUs8 from "../../assets/img/about-us/about-us-8.webp";

gsap.registerPlugin(ScrollTrigger);

const SWIPE_THRESHOLD = 70; // px to drag before the card leaves
const STACK_OFFSET = 12; // px between stacked cards
const VISIBLE_BEHIND = 2; // cards showing under the top one
const AUTOPLAY_DELAY = 3500; // ms each card stays in front

export default function Teams() {

    const teams = [
        {
            img : aboutUs3, 
            name : 'Dr Paschal Ohalehi', 
            title : 'Chief Executive Officer', 
        },
        {
            img : aboutUs4, 
            name : 'Miss Ijeoma ', 
            title : 'Deputy Chief Executive Officer', 
        },
        {
            img : aboutUs5, 
            name : 'Miss Bola', 
            title : 'Chief Operating Officer', 
        }
    ];

    const sectionRef = useRef(null);
    const cardsRef = useRef(null);

    // ---------- Mobile swipe stack state ----------
    const [order, setOrder] = useState(() => teams.map((_, i) => i));
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
    const renderTeamCard = (item) => (
        <div className="blog-card rounded-2xl overflow-hidden relative group block">
            <img className="w-full h-full object-cover aspect-410/520 duration-1000 group-hover:transform-[scale(1.2)]" src={item.img} alt={item.name} />
            <div className="absolute z-3 bottom-0 left-0 w-full p-5">
                <div className="p-6 duration-300 rounded-2xl group-hover:rounded-none bg-white/70 group-hover:bg-transparent backdrop-blur-[34px] group-hover:backdrop-blur-none group-hover:duration-100">
                    <h3 className="text-xl text-title_black font-semibold leading-none duration-300 group-hover:text-white">{item.name}</h3>
                    <p className="text-base text-paragraph_black font-normal leading-none mt-2 duration-300 group-hover:text-paragraph_white group-hover:mb-6">{item.title}</p>

                    <div className="flex gap-5 absolute transition-all duration-500 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <Link to="https://www.facebook.com/" className="text-title_white hover:text-primary transition-all duration-500" target="_blank">
                            <svg className="w-5 h-5 fill-current">
                                <use href="#team-card-facebook"></use>
                            </svg>
                        </Link>
                        <Link to="https://www.instagram.com/" className="text-title_white hover:text-primary transition-all duration-500" target="_blank">
                            <svg className="w-5 h-5 fill-current">
                                <use href="#team-card-insta"></use>
                            </svg>
                        </Link>
                        <Link to="https://twitter.com/" className="text-title_white hover:text-primary transition-all duration-500" target="_blank">
                            <svg className="w-5 h-5 fill-current">
                                <use href="#team-card-twitter"></use>
                            </svg>
                        </Link>
                        <Link to="https://www.linkedin.com/" className="text-title_white hover:text-primary transition-all duration-500" target="_blank">
                            <svg className="w-5 h-5 fill-current">
                                <use href="#team-card-linkedin"></use>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );

    // Title animation
    useEffect(() => {

        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {

            const icon = sectionRef.current.querySelector(".rotate");
            const subtitle = sectionRef.current.querySelector("span");
            const heading = sectionRef.current.querySelector("h2");
            const paragraph = sectionRef.current.querySelector("p");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            if (icon) {
                tl.from(icon, {
                    scale: 0,
                    opacity: 0,
                    rotation: -180,
                    duration: 0.8,
                    ease: "power3.out",
                });
            }

            if (subtitle) {
                tl.from(subtitle, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                }, "-=0.4");
            }

            if (heading) {
                tl.from(heading, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                }, "-=0.3");
            }

            if (paragraph) {
                tl.from(paragraph, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                }, "-=0.4");
            }

        }, sectionRef);

        return () => ctx.revert();

    }, []);

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
        <section className="section-spacing-lg bg-secondary">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titlePrimary} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">EXPERT GUIDANCE</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4" data-content>Meet the minds behind your financial success</h2>
                    </div>
                </div>

                <div ref={cardsRef} data-sttr-wrapper>

                    {/* Mobile: swipe stack with autoplay */}
                    <div ref={mobileRef} data-sttr-card className="sm:hidden w-full">
                        <div className="grid" style={{ paddingBottom: VISIBLE_BEHIND * STACK_OFFSET }}>
                            {order.map((itemIndex, pos) => {
                                const item = teams[itemIndex];
                                const isTop = pos === 0;
                                return (
                                    <div
                                        key={itemIndex}
                                        style={{ gridArea: "1 / 1", ...getStackStyle(pos, itemIndex) }}
                                        className={`select-none [&_img]:pointer-events-none ${
                                            isTop ? "touch-pan-y cursor-grab active:cursor-grabbing" : "pointer-events-none"
                                        }`}
                                        {...(isTop && {
                                            onPointerDown,
                                            onPointerMove,
                                            onPointerUp,
                                            onPointerCancel: onPointerUp,
                                        })}
                                    >
                                        {renderTeamCard(item)}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Dots are white because this section has a dark background */}
                        <div className="mt-3 flex w-full items-center justify-center gap-2">
                            {teams.map((item, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    aria-label={`Show team member ${i + 1} of ${teams.length}`}
                                    onClick={() => bringToFront(i)}
                                    className={`h-2 rounded-full transition-all ${
                                        order[0] === i ? "w-6 bg-white" : "w-2 bg-white/30"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* sm and up: your original grid (only `hidden sm:grid` added) */}
                    <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.map((item, index)=>(
                            <div data-sttr-card key={index}>
                                {renderTeamCard(item)}
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    </>
  )
}