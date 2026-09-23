import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../assets/img/title-icon.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {

    const sectionRef = useRef(null);
    const journeyRef = useRef(null);

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

    // Journey section animation
    useEffect(() => {
        const journeySection = journeyRef.current;
        if (!journeySection) return;

        const ctx = gsap.context(() => {
            const line = journeySection.querySelector("[data-sttr-line]");
            const dots = journeySection.querySelectorAll("[data-sttr-dots]");
            const cards = journeySection.querySelectorAll("[data-sttr-card]");

            if (!line && !dots.length && !cards.length) return;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: journeySection,
                    start: "top 85%",
                    once: true,
                    invalidateOnRefresh: true,
                },
            });

            tl.set(journeySection, { visibility: "visible", opacity: 1 }, 0);

            if (line) {
                const isMobile = window.innerWidth < 768;
                const isHorizontal = line.classList.contains("md:w-full");

                if (!isMobile && isHorizontal) {
                    gsap.set(line, { transformOrigin: "left center", scaleX: 0 });
                    tl.to(line, {
                        scaleX: 1,
                        duration: 1,
                        ease: typeof window.CustomEase !== "undefined" ? "osmo-ease" : "power2.out",
                    });
                } else {
                    gsap.set(line, { transformOrigin: "center top", scaleY: 0 });
                    tl.to(line, {
                        scaleY: 1,
                        duration: 1,
                        ease: typeof window.CustomEase !== "undefined" ? "osmo-ease" : "power2.out",
                    });
                }
            }

            if (dots.length) {
                gsap.set(dots, { scale: 0, transformOrigin: "center center" });
                tl.to(
                    dots,
                    {
                        scale: 1,
                        duration: 0.5,
                        stagger: 0.15,
                        ease: typeof window.CustomEase !== "undefined" ? "osmo-ease" : "back.out(1.7)",
                    },
                    "-=0.3"
                );
            }

            if (cards.length) {
                cards.forEach((card, index) => {
                    const isEven = index % 2 === 0;
                    const yOffset = isEven ? 20 : -20;
                    gsap.set(card, {
                        y: yOffset,
                        opacity: 0,
                        filter: "blur(10px)",
                    });

                    tl.to(
                        card,
                        {
                            y: 0,
                            opacity: 1,
                            filter: "blur(0px)",
                            duration: 0.6,
                            ease: typeof window.CustomEase !== "undefined" ? "osmo-ease" : "power3.out",
                        },
                        "-=" + (0.4 - 0.1 * index)
                    );
                });
            }
        }, journeyRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === journeySection) {
                    trigger.kill();
                }
            });
        };
    }, []);

  return (
    <>
        <section className="section-spacing-lg-md">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">OUR JOURNEY</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>A legacy of financial innovation</h2>
                    </div>
                </div>
                <div ref={journeyRef} className="max-w-320 h-auto relative" data-journey-section>
                    <div className="absolute top-0 md:top-1/2 left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 w-[2px] md:w-full h-full md:h-0.5 bg-paragraph_white  md:translate-y-1/2" data-sttr-line></div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10  xl:gap-15">
                        
                        <div className="relative flex flex-col items-center pt-0 md:pt-8">
                            <div className="hidden md:block absolute  top-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-5 border-primary bg-title_white z-10 shadow-sm " data-sttr-dots></div>
                            <div className="md:mt-32 bg-background py-6 px-3 lg:px-7  rounded-2xl border border-paragraph_white text-center  max-w-53 w-full relative shadow-sm" data-sttr-card>
                                <div className=" absolute top-1/2 -translate-y-1/2 -right-[15px] md:right-1/3 rotate-90 md:rotate-0 md:top-[-11px] md:left-1/2 md:-translate-x-1/2 md:translate-y-0">
                                    <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.207 0.728516L1.20703 9.72852H18.207L10.207 0.728516Z" fill="#FBFBFB" stroke="#E5E5E5"/>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold leading-none text-title_black">2022</h3>
                                <p className="text-paragraph_black text-sm mt-4 font-normal">The Vision Takes Root</p>
                            </div>
                        </div>

                        <div className="relative flex flex-col items-center pt-0 md:pt-8">
                            <div className=" absolute top-14 md:top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 left-[-18.75px] md:left-1/2 -translate-x-1/2 rounded-full border-5 border-primary bg-title_white z-10 shadow-sm" data-sttr-dots></div>
                            <div className="md:-mt-8 bg-background py-6 px-3 lg:px-7 rounded-2xl border border-paragraph_white text-center  max-w-53 w-full relative shadow-sm " data-sttr-card>
                                <div className=" absolute bottom-12 md:-bottom-2.75 -left-1.5 md:left-1/2 -translate-x-1/2 rotate-90  md:rotate-0">
                                    <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.207 9.5L1.20703 0.5H18.207L10.207 9.5Z" fill="#FBFBFB" stroke="#E5E5E5"/>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold leading-none text-title_black">2024</h3>
                                <p className="text-paragraph_black text-sm  mt-4 font-normal">The Foundation</p>
                            </div>
                        </div>

                        <div className="relative flex flex-col items-center pt-10 md:pt-8">
                            <div className="hidden md:block absolute top-1/2 -translate-y-1/2  w-5 h-5 rounded-full border-5 border-primary bg-title_white z-10 shadow-sm" data-sttr-dots></div>
                            <div className="md:mt-32 bg-background py-6 px-3 lg:px-7 rounded-2xl border border-paragraph_white text-center max-w-53 w-full relative shadow-sm" data-sttr-card>
                                <div className="absolute top-1/2 -translate-y-1/2 -right-[15px] md:right-1/3 rotate-90 md:rotate-0 md:top-[-11px] md:left-1/2 md:-translate-x-1/2 md:translate-y-0">
                                    <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.207 0.728516L1.20703 9.72852H18.207L10.207 0.728516Z" fill="#FBFBFB" stroke="#E5E5E5"/>
                                    </svg>
                                </div>

                                <h3 className="text-2xl font-semibold leading-none text-title_black">2025</h3>
                                <p className="text-paragraph_black text-sm mt-4 font-normal">Strategic Alliances</p>
                            </div>
                        </div>
                        <div className="relative flex flex-col items-center pt-10 md:pt-8">
                            <div className="  absolute top-23.5 md:top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 left-[-18.75px] md:left-1/2 -translate-x-1/2 rounded-full border-5 border-primary bg-title_white z-10 shadow-sm" data-sttr-dots></div>
                            <div className="md:-mt-8 bg-background py-6 px-3 lg:px-7 rounded-2xl border border-paragraph_white text-center max-w-53 w-full  relative shadow-sm " data-sttr-card>
                                <div className="absolute bottom-12 md:-bottom-2.75 -left-1.5 md:left-1/2 -translate-x-1/2 rotate-90  md:rotate-0 ">
                                    <svg width="20" height="11" viewBox="0 0 20 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.207 9.5L1.20703 0.5H18.207L10.207 9.5Z" fill="#FBFBFB" stroke="#E5E5E5"/>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-semibold leading-none text-title_black">2026</h3>
                                <p className="text-paragraph_black text-sm mt-4 font-normal">Wealth Management </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
