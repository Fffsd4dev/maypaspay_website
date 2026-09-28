import { useEffect, useRef, useState } from "react";
import icon01 from "../../../assets/img/home-v1/about/icon-01.svg";
import icon02 from "../../../assets/img/home-v1/about/icon-02.svg";
import icon03 from "../../../assets/img/home-v1/about/icon-03.svg";

const SWIPE_THRESHOLD = 70; // px to drag before the card leaves
const STACK_OFFSET = 12; // px between stacked cards
const AUTOPLAY_DELAY = 3500; // ms each card stays in front

const abouts = [
  {
    img: icon01,
    title: "Integrity Trust",
    desc: "Security is our core foundation. We utilize multi-layer encryption, cold-storage custody, and biometrics to ensure your assets remain protected.",
  },
  {
    img: icon02,
    title: "Innovation Vision",
    desc: "We don't just process transactions; we build ecosystems. From AI-driven automated savings tools to instant cross-border settlement.",
  },
  {
    img: icon03,
    title: "Collaboration Teamwork",
    desc: "Success is a shared journey. Our platform is designed to scale with you, providing the collaborative tools and 24/7 human support.",
  },
];

function CardContent({ item }) {
  return (
    <>
      <img
        className="w-10 h-10 sm:w-12.5 sm:h-12.5"
        src={item.img}
        alt=""
        width={50}
        height={50}
        loading="lazy"
        draggable={false}
      />
      <h3 className="mt-4 sm:mt-9 text-title_black text-lg sm:text-xl md:text-2xl font-semibold leading-tight!">
        {item.title}
      </h3>
      <p className="mt-2 sm:mt-3 text-sm sm:text-base paragraph_black">
        {item.desc}
      </p>
    </>
  );
}

export default function AboutCompany() {
  const [order, setOrder] = useState(() => abouts.map((_, i) => i));
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
    return {
      transform: `translateY(${pos * STACK_OFFSET}px) scale(${1 - pos * 0.05})`,
      transformOrigin: "bottom center",
      transition: moved === itemIndex ? "none" : "transform 250ms ease-out, opacity 250ms ease-out",
      zIndex: 30 - pos,
    };
  };

  return (
    <div className="w-full min-w-0 col-span-full">
      {/* Mobile: swipe stack with autoplay */}
      <div ref={mobileRef} data-sttr-card className="sm:hidden w-full">
        <div
          className="grid"
          style={{ paddingBottom: (abouts.length - 1) * STACK_OFFSET }}
        >
          {order.map((itemIndex, pos) => {
            const item = abouts[itemIndex];
            const isTop = pos === 0;
            return (
              <div
                key={item.title}
                style={{ gridArea: "1 / 1", ...getStackStyle(pos, itemIndex) }}
                className={`bg-white p-5 rounded-2xl border border-black/5 shadow-sm select-none ${
                  isTop ? "touch-pan-y cursor-grab active:cursor-grabbing" : "pointer-events-none"
                }`}
                {...(isTop && {
                  onPointerDown,
                  onPointerMove,
                  onPointerUp,
                  onPointerCancel: onPointerUp,
                })}
              >
                <CardContent item={item} />
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex w-full items-center justify-center gap-2">
          {abouts.map((item, i) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Show ${item.title}`}
              onClick={() => bringToFront(i)}
              className={`h-2 rounded-full transition-all ${
                order[0] === i ? "w-6 bg-black" : "w-2 bg-black/20"
              }`}
            />
          ))}
        </div>
      </div>

      {/* sm and up: original grid layout */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
        {abouts.map((item) => (
          <div key={item.title} data-sttr-card>
            <CardContent item={item} />
          </div>
        ))}
      </div>
    </div>
  );
}