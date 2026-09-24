import { useRef, useState } from "react";
import icon01 from "../../../assets/img/home-v1/about/icon-01.svg";
import icon02 from "../../../assets/img/home-v1/about/icon-02.svg";
import icon03 from "../../../assets/img/home-v1/about/icon-03.svg";

const abouts = [
  {
    img: icon01,
    title: "Integrity Trust",
    desc: "Security is our core foundation. We utilize multi-layer encryption, cold-storage custody, and biometrics to ensure your assets remain protected..",
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

export default function AboutCompany() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const getStep = () => {
    const first = trackRef.current?.children[0];
    return first ? first.offsetWidth + 16 : 1; // 16 = gap-4
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / getStep()));
  };

  const goTo = (i) => {
    trackRef.current?.scrollTo({ left: i * getStep(), behavior: "smooth" });
  };

  return (
    <div className="w-full">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-4 px-4 pb-2
                   scrollbar-none [&::-webkit-scrollbar]:hidden
                   sm:mx-0 sm:px-0 sm:pb-0 sm:overflow-visible
                   sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-8"
      >
        {abouts.map((item) => (
          <div
            key={item.title}
            data-sttr-card
            className="shrink-0 w-[82%] snap-start p-5 rounded-2xl border border-black/5
                       sm:w-auto sm:p-0 sm:rounded-none sm:border-0"
          >
            <img
              className="w-10 h-10 sm:w-12.5 sm:h-12.5"
              src={item.img}
              alt=""
              width={50}
              height={50}
              loading="lazy"
            />
            <h3 className="mt-4 sm:mt-9 text-title_black text-lg sm:text-xl md:text-2xl font-semibold leading-tight!">
              {item.title}
            </h3>
            <p className="mt-2 sm:mt-3 text-sm sm:text-base paragraph_black">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Dots: mobile only */}
      <div className="mt-4 flex justify-center gap-2 sm:hidden">
        {abouts.map((item, i) => (
          <button
            key={item.title}
            type="button"
            aria-label={`Go to ${item.title}`}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all ${
              active === i ? "w-6 bg-black" : "w-2 bg-black/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}