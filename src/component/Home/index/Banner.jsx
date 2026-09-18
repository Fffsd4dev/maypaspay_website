import { useEffect, useRef } from "react";

import start from "../../../assets/img/home-v1/start.svg";

export default function Banner() {

    const marqueeRef = useRef(null);
    const speedRef = useRef(1);
    const animationRef = useRef(null);

    useEffect(() => {

        const marquee = marqueeRef.current;

        if (!marquee) return;

        let position = 0;

        const animate = () => {

            position -= speedRef.current;

            if (Math.abs(position) >= marquee.scrollWidth / 2) {
                position = 0;
            }

            marquee.style.transform = `translate3d(${position}px, 0, 0)`;

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        const handleMouseEnter = () => {
            speedRef.current = 0;
        };

        const handleMouseLeave = () => {
            speedRef.current = 1;
        };

        marquee.addEventListener("mouseenter", handleMouseEnter);
        marquee.addEventListener("mouseleave", handleMouseLeave);

        return () => {

            cancelAnimationFrame(animationRef.current);

            marquee.removeEventListener("mouseenter", handleMouseEnter);
            marquee.removeEventListener("mouseleave", handleMouseLeave);

        };

    }, []);

    const items = [
        "Regulatory Compliance",
        "Global Markets",
        "Institutional Trading",
        "Wealth Management",
        "Market Analysis Tools",
        "Market Analysis Tools",
        "Strategic Risk Analysis",
    ];

  return (
    <div className="py-6 bg-primary overflow-hidden">
        <div className="">
            
            <div ref={marqueeRef} className="marquee-slider flex gap-9 will-change-transform">
                
                {[...items, ...items].map((item, index) => (

                    <div
                        key={index}
                        className="flex items-center gap-9"
                    >

                        <div className="whitespace-nowrap">
                            <img
                                className="rotate w-4.5 h-4.5 min-w-4.5 min-h-4.5"
                                src={start}
                                alt="star"
                            />
                        </div>

                        <div className="whitespace-nowrap text-base sm:text-lg leading-none! font-semibold text-title_black">
                            {item}
                        </div>

                    </div>

                ))}

            </div>

        </div>
    </div>
  )
}
