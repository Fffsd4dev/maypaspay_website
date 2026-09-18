import { useEffect, useRef } from "react";

import shadow from "../../../assets/img/home-v1/logos/shadow.webp";
import logo01 from "../../../assets/img/home-v1/logos/logo-01.svg";
import logo02 from "../../../assets/img/home-v1/logos/logo-02.svg";
import logo03 from "../../../assets/img/home-v1/logos/logo-03.svg";
import logo04 from "../../../assets/img/home-v1/logos/logo-04.svg";
import logo05 from "../../../assets/img/home-v1/logos/logo-05.svg";
import logo06 from "../../../assets/img/home-v1/logos/logo-06.svg";
import logo07 from "../../../assets/img/home-v1/logos/logo-07.svg";
import logo08 from "../../../assets/img/home-v1/logos/logo-08.svg";
import logo09 from "../../../assets/img/home-v1/logos/logo-09.svg";

export default function Logos() {

    const marqueeRef = useRef(null);

    const logos = [
        {
            img : logo01, 
        },
        {
            img : logo02, 
        },
        {
            img : logo03, 
        },
        {
            img : logo04, 
        },
        {
            img : logo05, 
        },
        {
            img : logo06, 
        },
        {
            img : logo07, 
        },
        {
            img : logo08, 
        },
        {
            img : logo09, 
        }
    ];

    useEffect(() => {

        const track = marqueeRef.current;

        if (!track) return;

        let position = 0;
        let speed = 1;
        let animationFrame;

        const animate = () => {

            position -= speed;

            if (Math.abs(position) >= track.scrollWidth / 2) {
                position = 0;
            }

            track.style.transform = `translate3d(${position}px,0,0)`;

            animationFrame = requestAnimationFrame(animate);

        };

        animationFrame = requestAnimationFrame(animate);

        const pause = () => {
            speed = 0;
        };

        const play = () => {
            speed = 1;
        };

        track.addEventListener("mouseenter", pause);
        track.addEventListener("mouseleave", play);

        return () => {

            cancelAnimationFrame(animationFrame);

            track.removeEventListener("mouseenter", pause);
            track.removeEventListener("mouseleave", play);

        };

    }, []);

  return (
    <div className="py-6 relative">
        <img className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none" src={shadow} alt="shadow" />
        <div ref={marqueeRef} className="marquee-slider flex items-center gap-10 md:gap-15 will-change-transform">
            
            {[...logos, ...logos].map((item, index) => (
                <div key={index}>
                    <img className="w-25 sm:w-auto max-w-50 aspect-148/42" src={item.img} alt="client-logo" />
                </div>
            ))}

        </div>
    </div>
  )
}
