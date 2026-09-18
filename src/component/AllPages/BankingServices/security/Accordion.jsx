import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titlePrimary from "../../../../assets/img/title-icon-primary.svg";
import acordionThumb01 from "../../../../assets/img/excellence-accordion/excellence-acordion-thumb-01.webp";
import acordionThumb02 from "../../../../assets/img/excellence-accordion/excellence-acordion-thumb-02.webp";
import acordionThumb03 from "../../../../assets/img/excellence-accordion/excellence-acordion-thumb-03.webp";
import acordionThumb04 from "../../../../assets/img/excellence-accordion/excellence-acordion-thumb-04.webp";
import acordionThumb05 from "../../../../assets/img/excellence-accordion/excellence-acordion-thumb-05.webp";

gsap.registerPlugin(ScrollTrigger);

export default function Accordion() {

    const sectionRef = useRef(null);
    const cardsRef = useRef(null);
    const wrapperRef = useRef(null);
    
    const [activeIndex, setActiveIndex] = useState(0);

    const progressTweenRef = useRef(null);
    const autoPlayRef = useRef(null);

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

    // For Faqs
    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const items = wrapper.querySelectorAll(".next-gen-item");
        const images = wrapper.querySelectorAll(".next-gen-image");
        if (!items.length) return;

        const directions = ["top", "left", "right", "bottom"];
        const index = activeIndex;

        // items
        items.forEach((item, i) => {
            const progress = item.querySelector(".next-gen-progress-line");
            const desc = item.querySelector(".next-gen-description");

            if (progress) gsap.set(progress, { width: "0%" });

            if (i === index) {
                item.classList.add("active");
                if (desc) {
                    gsap.to(desc, { maxHeight: 500, opacity: 1, duration: 0.3 });
                }
            } else {
                item.classList.remove("active");
                if (desc) {
                    gsap.to(desc, { maxHeight: 0, opacity: 0, duration: 0.2 });
                }
            }
        });

        // Progress bar
        const activeProgress = items[index].querySelector(".next-gen-progress-line");
        if (activeProgress) {
            if (progressTweenRef.current) {
                progressTweenRef.current.kill();
                progressTweenRef.current = null;
            }
            gsap.set(activeProgress, { width: "0%" });
            progressTweenRef.current = gsap.to(activeProgress, {
                width: "100%",
                duration: 5,
                ease: "none",
            });
        }

        // Images
        images.forEach((img, i) => {
            const dir = directions[i] || "top";
            if (i === index) {
                let clip = "inset(100% 0% 0% 0%)";
                if (dir === "left") clip = "inset(0% 0% 0% 100%)";
                if (dir === "right") clip = "inset(0% 100% 0% 0%)";
                if (dir === "bottom") clip = "inset(0% 0% 100% 0%)";
                img.classList.add("active");
                gsap.set(img, { clipPath: clip, zIndex: 10 });
                gsap.to(img, {
                    clipPath: "inset(0% 0% 0% 0%)",
                    duration: 0.6,
                    ease: "power2.out",
                });
            } else {
                img.classList.remove("active");
                gsap.set(img, {
                    clipPath: "inset(100% 0% 0% 0%)",
                    zIndex: 1,
                });
            }
        });
    }, [activeIndex]);

    // ----- Auto‑play & hover pause -----
    useEffect(() => {
        const wrapper = wrapperRef.current;
        if (!wrapper) return;

        const items = wrapper.querySelectorAll(".next-gen-item");
        if (!items.length) return;

        const startAutoPlay = () => {
            if (autoPlayRef.current) clearInterval(autoPlayRef.current);
            autoPlayRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % items.length);
            }, 5000);
        };

        const stopAutoPlay = () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
                autoPlayRef.current = null;
            }
        };

        startAutoPlay();

        const onMouseEnter = () => {
            if (progressTweenRef.current) {
                progressTweenRef.current.pause();
            }
            stopAutoPlay();
        };

        const onMouseLeave = () => {
            if (progressTweenRef.current) {
                progressTweenRef.current.resume();
            }
            startAutoPlay();
        };

        wrapper.addEventListener("mouseenter", onMouseEnter);
        wrapper.addEventListener("mouseleave", onMouseLeave);

        return () => {
            wrapper.removeEventListener("mouseenter", onMouseEnter);
            wrapper.removeEventListener("mouseleave", onMouseLeave);
            stopAutoPlay();
            if (progressTweenRef.current) {
                progressTweenRef.current.kill();
                progressTweenRef.current = null;
            }
        };
    }, []);

  return (
    <>
        <section className="section-spacing-lg bg-secondary">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titlePrimary} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">ENGINEERED FOR EXCELLENCE</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4" data-content>Technology Stack We Use and Can Provide</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_white" data-content>Empower your financial future with a high-performance technology stack that aligns with the global digital economy.</p>
                </div>
                <div ref={cardsRef} data-sttr-wrapper>

                    <div data-sttr-card>
                        <div className="items-start gap-6 grid md:grid-cols-2 grid-cols-1">
                            <div ref={wrapperRef} className="md:max-w-151.75 w-full next-gen-accordion-wrapper excellence-accordion-wrapper flex flex-col gap-4 md:gap-6 lg:gap-9">
                                
                                {/* <!-- Accordion 01 --> */}
                                <div className={`next-gen-item ${activeIndex === 0 ? "active" : ""}`} data-index="0">
                                    <div className="next-gen-header cursor-pointer flex justify-between items-center gap-4" onClick={() => setActiveIndex(0)}>
                                        <div className="flex items-start gap-4 md:gap-6 lg:gap-9">
                                            <span className="next-gen-number text-lg font-semibold leading-normal text-[#CCCCCC] duration-300">01</span>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between gap-4 mb-2 md:mb-3">
                                                    <h3 className="text-xl md:text-2xl font-semibold text-title_white flex-1">Cloud Infrastructure</h3>
                                                    <button type="button" aria-label="Toggle section" className="excellence-accordion-toogle w-4.75 h-2.25">
                                                        <svg className="w-4.75 h-2.25 fill-none text-primary">
                                                            <use href="#excellence-accortion-arrow"></use>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="text-base text-[#CCCCCC] next-gen-description">Our platform operates on a resilient, multi-regional cloud network, ensuring 99.9% uptime and lightning-fast transaction processing for users worldwide.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="next-gen-progress relative h-px mt-4 overflow-hidden bg-white/10">
                                        <div className="next-gen-progress-line absolute top-0 left-0 h-full bg-primary"></div>
                                    </div>
                                </div>
                                {/* <!-- Accordion 02 --> */}
                                <div className={`next-gen-item ${activeIndex === 1 ? "active" : ""}`} data-index="1">
                                    <div className="next-gen-header cursor-pointer" onClick={() => setActiveIndex(1)}>
                                        <div className="flex items-start gap-4 md:gap-6 lg:gap-9">
                                            <span className="next-gen-number text-lg font-semibold leading-normal text-[#CCCCCC] duration-300">02</span>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between gap-4 mb-2 md:mb-3">
                                                    <h3 className="text-xl md:text-2xl font-semibold text-title_white flex-1">Blockchain Integration</h3>
                                                    <button type="button" aria-label="Toggle section" className="excellence-accordion-toogle w-4.75 h-2.25">
                                                        <svg className="w-4.75 h-2.25 fill-none text-primary">
                                                            <use href="#excellence-accortion-arrow"></use>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="text-base text-[#CCCCCC] next-gen-description">Send and receive money across borders instantly, without the high fees and long wait times. Experience truly global financial freedom.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="next-gen-progress relative h-px mt-4 overflow-hidden bg-white/10">
                                        <div className="next-gen-progress-line absolute top-0 left-0 h-full bg-primary"></div>
                                    </div>
                                </div>
                                {/* <!-- Accordion 03 --> */}
                                <div className={`next-gen-item ${activeIndex === 2 ? "active" : ""}`} data-index="2">
                                    <div className="next-gen-header cursor-pointer" onClick={() => setActiveIndex(2)}>
                                        <div className="flex items-start gap-4 md:gap-6 lg:gap-9">
                                            <span className="next-gen-number text-lg font-semibold leading-normal text-[#CCCCCC] duration-300">03</span>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between gap-4 mb-2 md:mb-3">
                                                    <h3 className="text-xl md:text-2xl font-semibold text-title_white flex-1">Real-time Monitoring Systems</h3>
                                                    <button type="button" aria-label="Toggle section" className="excellence-accordion-toogle w-4.75 h-2.25">
                                                        <svg className="w-4.75 h-2.25 fill-none text-primary">
                                                            <use href="#excellence-accortion-arrow"></use>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="text-base text-[#CCCCCC] next-gen-description">Set smart contracts and automated spending rules. Control your finances with programmable money that works exactly how you want it to, when you want it to.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="next-gen-progress relative h-px mt-4 overflow-hidden bg-white/10">
                                        <div className="next-gen-progress-line absolute top-0 left-0 h-full bg-primary"></div>
                                    </div>
                                </div>
                                {/* <!-- Accordion 04 --> */}
                                <div className={`next-gen-item ${activeIndex === 3 ? "active" : ""}`} data-index="3">
                                    <div className="next-gen-header cursor-pointer" onClick={() => setActiveIndex(3)}>
                                        <div className="flex items-start gap-4 md:gap-6 lg:gap-9">
                                            <span className="next-gen-number text-lg font-semibold leading-normal text-[#CCCCCC] duration-300">04</span>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between gap-4 mb-2 md:mb-3">
                                                    <h3 className="text-xl md:text-2xl font-semibold text-title_white flex-1">Open Banking APIs</h3>
                                                    <button type="button" aria-label="Toggle section" className="excellence-accordion-toogle w-4.75 h-2.25">
                                                        <svg className="w-4.75 h-2.25 fill-none text-primary">
                                                            <use href="#excellence-accortion-arrow"></use>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="text-base text-[#CCCCCC] next-gen-description">Experience the stability of traditional currency with the flexibility of digital assets. Our stablecoin maintains a consistent value, making it perfect for everyday transactions and long-term savings.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="next-gen-progress relative h-px mt-4 overflow-hidden bg-white/10">
                                        <div className="next-gen-progress-line absolute top-0 left-0 h-full bg-primary"></div>
                                    </div>
                                </div>
                                {/* <!-- Accordion 05 --> */}
                                <div className={`next-gen-item ${activeIndex === 4 ? "active" : ""}`} data-index="4">
                                    <div className="next-gen-header cursor-pointer" onClick={() => setActiveIndex(4)}>
                                        <div className="flex items-start gap-4 md:gap-6 lg:gap-9">
                                            <span className="next-gen-number text-lg font-semibold leading-normal text-[#CCCCCC] duration-300">05</span>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between gap-4 mb-2 md:mb-3">
                                                    <h3 className="text-xl md:text-2xl font-semibold text-title_white flex-1">AI Machine Learning Capabilities</h3>
                                                    <button type="button" aria-label="Toggle section" className="excellence-accordion-toogle w-4.75 h-2.25">
                                                        <svg className="w-4.75 h-2.25 fill-none text-primary">
                                                            <use href="#excellence-accortion-arrow"></use>
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="text-base text-[#CCCCCC] next-gen-description">Experience the stability of traditional currency with the flexibility of digital assets. Our stablecoin maintains a consistent value, making it perfect for everyday transactions and long-term savings.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="next-gen-progress relative h-px mt-4 overflow-hidden bg-white/10">
                                        <div className="next-gen-progress-line absolute top-0 left-0 h-full bg-primary"></div>
                                    </div>
                                </div>

                            </div>
                            <div className="md:max-w-125 ml-auto w-full h-full max-h-142.5 md:block hidden">
                                <div className="next-gen-image-wrapper relative overflow-hidden w-full h-full">
                                    <div className="next-gen-image-container relative flex items-start justify-center h-full w-full">
                                        
                                        {[acordionThumb01, acordionThumb02, acordionThumb03, acordionThumb04, acordionThumb05].map((img, idx) => (
                                            <img 
                                                key={idx}
                                                src={img}
                                                className={`next-gen-image max-h-full ${activeIndex === idx ? "active" : ""}`}
                                                alt={`excellence-accordion-thumb-${idx + 1}`}
                                            />
                                        ))}
                                    
                                    </div>
                                </div>
                            </div>
                        </div>			
                    </div>
                </div>

            </div>
        </section>
    </>
  )
}
