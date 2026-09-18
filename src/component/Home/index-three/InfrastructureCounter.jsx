import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titlePrimary from "../../../assets/img/title-icon-primary.svg";
import mapShape from "../../../assets/img/home-v3/map-shape.webp";

gsap.registerPlugin(ScrollTrigger);

export default function InfrastructureCounter() {

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

    // Counter animation
    useEffect(() => {
        const container = cardsRef.current;
        if (!container) return;

        const counters = container.querySelectorAll(".counter");
        if (!counters.length) return;

        const animateCounter = (el) => {
            if (el.dataset.animated === "true") return;
            el.dataset.animated = "true";

            const target = parseInt(el.getAttribute("data-target"), 10) || 0;
            const duration = 2000;
            const startTime = performance.now();

            const update = (timestamp) => {
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4);
                const current = Math.floor(eased * target);
                el.textContent = current;
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target;
                }
            };
            requestAnimationFrame(update);
        };

        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    animateCounter(el);
                    observer.unobserve(el);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, {
            threshold: 0.1,
            rootMargin: "0px",
        });

        counters.forEach((counter) => {
            observer.observe(counter);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

  return (
    <>
        <section className="section-spacing-lg bg-secondary">
            <div className="container">
                <div ref={sectionRef} className="flex text-center md:text-left items-center md:items-start justify-center md:justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 mx-auto md:mx-0 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5 justify-center md:justify-start">
                            <img className="rotate" src={titlePrimary} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">GLOBAL INFRASTRUCTURE</span>
                        </div>
                        <h3 className="font-bold leading-tight text-title_white mt-4" data-content>Institutional Reach. Local Expertise.</h3>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_white" data-content>At SecureVest, we bridge the gap between global markets. Our interconnected network of regional hubs.</p>
                </div>
                <div ref={cardsRef} className="relative z-1 md:h-100 lg:h-142.75" data-sttr-wrapper>
                    <div className="mix-blend-plus-darker" data-sttr-card>
                        <img className="absolute top-1/2 left-1/2 transform -translate-1/2 md:translate-0 md:static w-full h-full object-contain object-center" src={mapShape} alt="map-shape" />
                    </div>
                    <div className="grid grid-cols-2 gap-6 sm:gap-10 md:block">
                        
                        <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 md:top-[12%] text-center" data-sttr-card>
                            <div className="flex justify-center">
                                <h3 className="text-white font-bold leading-none! counter" data-target="3000">0</h3>
                                <h3 className="text-white font-bold leading-none!">+</h3>
                            </div>
                            <p className="mt-3 sm:mt-4 text-white leading-none">Regional Financial Experts</p>
                        </div>
                        <div className="md:absolute md:top-1/2 transform md:-translate-y-1/2 left-[10%] lg:left-[12%] text-center" data-sttr-card>
                            <div className="flex justify-center">
                                <h3 className="text-white font-bold leading-none! counter" data-target="10000">0</h3>
                                <h3 className="text-white font-bold leading-none!">+</h3>
                            </div>
                            <p className="mt-3 sm:mt-4 text-white leading-none">Global Institutional Partners</p>
                        </div>
                        <div className="md:absolute md:left-[35%] bottom-[20%] text-center" data-sttr-card>
                            <div className="flex justify-center">
                                <h3 className="text-white font-bold leading-none! counter" data-target="10000">0</h3>
                                <h3 className="text-white font-bold leading-none!">+</h3>
                            </div>
                            <p className="mt-3 sm:mt-4 text-white leading-none">Strategic Hubs Branches</p>
                        </div>
                        <div className="md:absolute md:right-[10%] lg:right-[16%] bottom-[30%] text-center" data-sttr-card>
                            <div className="flex justify-center">
                                <h3 className="text-white font-bold leading-none! counter" data-target="12">0</h3>
                                <h3 className="text-white font-bold leading-none!">Million+</h3>
                            </div>
                            <p className="mt-3 sm:mt-4 text-white leading-none">Annual Secure Transactions</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
