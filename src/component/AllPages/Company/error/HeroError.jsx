import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import error404 from "../../../../assets/img/404.svg";

gsap.registerPlugin(ScrollTrigger);

export default function HeroError() {

    const cardsRef = useRef(null);

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
        <div ref={cardsRef} className="py-15 md:py-25 lg:py-42.25" data-sttr-wrapper>
            <div className="container">
                <div>
                    <div className="max-w-80 sm:max-w-110 md:max-w-155.5 max-h-76.5 mx-auto text-center" data-sttr-card>
                        <img src={error404} alt="SecureVest illustration" />
                    </div>
                    <div className="mt-6 md:mt-10 lg:mt-12.5 text-center">
                        <h1 className="text-4xl sm:text-[40px] md:text-5xl lg:text-[52px] xl:text-[64px] font-bold" data-sttr-card>Page Not Found!</h1>
                        <div className="flex items-center justify-center" data-sttr-card>
                            <Link to="/" className="button-primary mt-6">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
