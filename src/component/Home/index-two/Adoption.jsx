import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../../assets/img/title-icon.svg";
import tab01 from "../../../assets/img/home-v2/nextgen-adoption/tab-01.webp";
import tab02 from "../../../assets/img/home-v2/nextgen-adoption/tab-02.webp";
import tab03 from "../../../assets/img/home-v2/nextgen-adoption/tab-03.webp";
import tab04 from "../../../assets/img/home-v2/nextgen-adoption/tab-04.webp";

gsap.registerPlugin(ScrollTrigger);

export default function Adoption() {

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
            <section className="section-spacing-md relative z-1">
                <div className="container">
                    <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                        <div className="md:max-w-170 w-full">
                            <div className="flex items-center gap-2.5">
                                <img className="rotate" src={titleIcon} alt="title-icon" />
                                <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">NEXT-GEN ADOPTION</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Bridging Traditional Finance with the Crypto Revolution</h2>
                        </div>
                        <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>We aren't just building a bank; we are architecting the gateway for the upcoming financial shift.</p>
                    </div>

                    <div ref={cardsRef} className="items-start gap-6  grid md:grid-cols-2 grid-cols-1" data-sttr-wrapper>
                        <div ref={wrapperRef} className="next-gen-accordion-wrapper flex flex-col gap-4 md:gap-6 lg:gap-9" data-sttr-card>
                            {/* <!-- Feature 01 --> */}
                            <div className={`next-gen-item ${activeIndex === 0 ? "active" : ""}`}>
                                <div className="next-gen-header cursor-pointer" onClick={() => setActiveIndex(0)}>
                                    <div className="flex items-start gap-4 md:gap-6 lg:gap-9">
                                        <span
                                            className="next-gen-number text-lg font-semibold leading-normal text-[#CCCCCC] duration-300">01</span>
                                        <div className="flex-1">
                                            <h3 className="text-xl xl:text-2xl font-semibold text-title_black mb-2 md:mb-3">Buy sell digital assets instantly.
                                            </h3>
                                            <p className="text-base text-[#404040] next-gen-description">Break the wall between fiat and crypto. Access deep liquidity pools to swap assets in real-time without the standard 3-day banking wait.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="next-gen-progress relative h-px mt-4 overflow-hidden bg-border">
                                    <div className="next-gen-progress-line absolute top-0 left-0 h-full bg-secondary"></div>
                                </div>
                            </div>
                            {/* <!-- Feature 02 --> */}
                            <div className={`next-gen-item ${activeIndex === 1 ? "active" : ""}`}>
                                <div className="next-gen-header cursor-pointer" onClick={() => setActiveIndex(1)}>
                                    <div className="flex items-start gap-4 md:gap-6 lg:gap-9">
                                        <span
                                            className="next-gen-number text-lg font-semibold leading-normal text-[#CCCCCC] duration-300">02</span>
                                        <div className="flex-1">
                                            <h3 className="text-xl xl:text-2xl font-semibold text-title_black mb-2 md:mb-3">Borderless Send Receive</h3>
                                            <p className="text-base text-[#404040] next-gen-description">Send and receive money across borders instantly, without the high fees and long wait times. Experience truly global financial freedom.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="next-gen-progress relative h-px mt-4 overflow-hidden bg-border">
                                    <div className="next-gen-progress-line absolute top-0 left-0 h-full bg-secondary"></div>
                                </div>
                            </div>
                            {/* <!-- Feature 03 --> */}
                            <div className={`next-gen-item ${activeIndex === 2 ? "active" : ""}`}>
                                <div className="next-gen-header cursor-pointer" onClick={() => setActiveIndex(2)}>
                                    <div className="flex items-start gap-4 md:gap-6 lg:gap-9">
                                        <span
                                            className="next-gen-number text-lg font-semibold leading-normal text-[#CCCCCC] duration-300">03</span>
                                        <div className="flex-1">
                                            <h3 className="text-xl xl:text-2xl font-semibold text-title_black mb-2 md:mb-3">Spend with Programmable Money</h3>
                                            <p className="text-base text-[#404040] next-gen-description">Set smart contracts and automated spending rules. Control your finances with programmable money that works exactly how you want it to, when you want it to.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="next-gen-progress relative h-px mt-4 overflow-hidden bg-border">
                                    <div className="next-gen-progress-line absolute top-0 left-0 h-full bg-secondary"></div>
                                </div>
                            </div>
                            {/* <!-- Feature 04 --> */}
                            <div className={`next-gen-item ${activeIndex === 3 ? "active" : ""}`}>
                                <div className="next-gen-header cursor-pointer" onClick={() => setActiveIndex(3)}>
                                    <div className="flex items-start gap-4 md:gap-6 lg:gap-9">
                                        <span
                                            className="next-gen-number text-lg font-semibold leading-normal text-[#CCCCCC] duration-300">04</span>
                                        <div className="flex-1">
                                            <h3 className="text-xl xl:text-2xl font-semibold text-title_black mb-2 md:mb-3">A stablecoin that holds steady value.</h3>
                                            <p className="text-base text-[#404040] next-gen-description">Experience the stability of traditionalcurrency with the flexibility of digital assets. Our stablecoin maintains a consistent value, making it perfect for everyday transactions and long-term savings.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="next-gen-progress relative h-px mt-4 overflow-hidden bg-border">
                                    <div className="next-gen-progress-line absolute top-0 left-0 h-full bg-secondary"></div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full h-full max-h-100 md:block hidden" data-sttr-card>
                            <div className="next-gen-image-wrapper relative overflow-hidden w-full h-full">
                                <div className="next-gen-image-container relative flex items-start justify-center h-full w-full">

                                    {[tab01, tab02, tab03, tab04].map((img, idx) => (
                                        <img
                                            key={idx}
                                            src={img}
                                            className={`next-gen-image max-h-full ${activeIndex === idx ? "active" : ""}`}
                                            alt={`next-gen-image-${idx + 1}`}
                                        />
                                    ))}

                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}
