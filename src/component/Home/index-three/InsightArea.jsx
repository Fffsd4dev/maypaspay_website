import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../../assets/img/title-icon.svg";
import logo from "../../../assets/img/logo.svg";
import slide01 from "../../../assets/img/home-v3/insight/slide-01.webp";

gsap.registerPlugin(ScrollTrigger);

export default function InsightArea() {

    const sectionRef = useRef(null);
    const cardsRef = useRef(null);

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
        <section className="section-spacing-lg-md">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">LEADERSHIP INSIGHT</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>
                            A Message from our Founding Director
                        </h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>
                        Integrity and foresight are the pillars of institutional banking. We are committed to providing the clarity and strategic depth.
                    </p>
                </div>		
                <div ref={cardsRef} data-sttr-wrapper>
                    <div className="flex justify-between bg-secondary rounded-2xl md:rounded-3xl overflow-hidden flex-col sm:flex-row" data-sttr-card>
                        <div className="sm:max-w-157.5 w-full px-4 py-6 sm:p-8 lg:p-12">
                            <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-medium">"We believe that true partnership is forged in the pursuit of excellence. Our mission is to provide more than just capitalâ€”we provide the stability and architecture that allow our clients to redefine what is possible."</h3>
                            <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-15 flex items-center justify-between flex-wrap gap-3">
                                <div className="">
                                    <h4 className="text-base sm:text-lg md:text-xl font-semibold leading-none! text-white">Brooklyn Simmons</h4>
                                    <p className="mt-3 text-paragraph_white leading-none!">CEO Founder, SecureVest</p>
                                </div>
                                <div className="max-w-43.5 w-full">
                                    <img className="w-full" src={logo} alt="logo" />
                                </div>
                            </div>
                        </div>
                        <div className="sm:max-w-135 w-full">
                            <img className="w-full h-full object-cover" src={slide01} alt="insigh-slider-thumb" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
