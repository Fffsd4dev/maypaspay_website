import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../../assets/img/title-icon.svg";
import donate from "../../../assets/img/home-v1/about/donate.mp4";
import AboutCompany from "./AboutCompany";
import Logos from "./Logos";

gsap.registerPlugin(ScrollTrigger);

export default function AboutArea() {

    const sectionRef = useRef(null);
    const cardsRef = useRef(null);

    const stickyRef = useRef(null);
    const videoContainerRef = useRef(null);
    const stickyAnimationRef = useRef(null);

    //  VIDEO CONTROLS

    const initVideoControls = (
        container,
        button,
        video,
        isMobile = false
    ) => {

        if (!container || !button || !video) return;

        let active = false;

        const getPosition = (e) => {

            const rect = container.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const bw = button.offsetWidth;
            const bh = button.offsetHeight;

            return {
                left: Math.min(Math.max(x - bw / 2, 0), rect.width - bw),
                top: Math.min(Math.max(y - bh / 2, 0), rect.height - bh),
            };

        };

        video.muted = true;
        video.loop = true;
        video.autoplay = true;

        video.play().catch(() => {});

        button.innerHTML = video.paused
            ? "<span class='play-icon'>Play</span>"
            : "<span class='pause-icon'>Pause</span>";

        // ---------------- MOBILE ----------------

        if (isMobile) {

            gsap.set(button, {
                xPercent: -50,
                yPercent: -50,
                left: "50%",
                top: "50%",
                scale: 1,
                opacity: 0,
            });

        }

        // ---------------- DESKTOP ----------------

        else {

            gsap.set(button, {
                xPercent: -50,
                yPercent: -50,
                left: "50%",
                top: "50%",
                scale: 0,
                opacity: 0,
            });

            const move = (e) => {

                if (!active) return;

                const pos = getPosition(e);

                gsap.to(button, {
                    left: pos.left,
                    top: pos.top,
                    xPercent: 0,
                    yPercent: 0,
                    duration: .3,
                });

            };

            const enter = (e) => {

                active = true;

                const pos = getPosition(e);

                gsap.set(button, {
                    left: pos.left,
                    top: pos.top,
                    xPercent: 0,
                    yPercent: 0,
                    scale: 0,
                    opacity: 0,
                });

                gsap.to(button, {
                    scale: 1.2,
                    opacity: 1,
                    duration: .3,
                    ease: "back.out(1.7)"
                });

            };

            const leave = () => {

                active = false;

                gsap.to(button, {
                    opacity: 0,
                    scale: 0,
                    duration: .3
                });

            };

            container.addEventListener("mousemove", move);
            container.addEventListener("mouseenter", enter);
            container.addEventListener("mouseleave", leave);

        }

        const updateUI = () => {

            if (video.paused) {

                button.innerHTML = "<span class='play-icon'>Play</span>";

                if (isMobile) {

                    gsap.to(button, {
                        opacity: 1,
                        scale: 1
                    });

                }

            } else {

                button.innerHTML = "<span class='pause-icon'>Pause</span>";

                if (isMobile) {

                    gsap.to(button, {
                        opacity: 0,
                        scale: 1
                    });

                }

            }

        };

        const toggle = (e) => {

            e.preventDefault();
            e.stopPropagation();

            if (video.paused)
                video.play();
            else
                video.pause();

        };

        button.addEventListener("click", toggle);

        container.addEventListener("click", (e) => {

            if (e.target === container || e.target === video)
                toggle(e);

        });

        video.addEventListener("play", updateUI);
        video.addEventListener("pause", updateUI);

        updateUI();

    };

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

    // For Video Animation
    useEffect(() => {

        const wrapper = stickyAnimationRef.current;
        const container = videoContainerRef.current;

        if (!wrapper || !container) return;

        let startWidth = 0;
        let startRadius = 0;
        let scrollTrigger = null;

        const isDesktop = () => window.innerWidth >= 1024;

        const getStartWidth = () => {
            return Math.min(1280, window.innerWidth);
        };

        const getBorderRadius = () => {

            const radius = window.getComputedStyle(container).borderRadius;

            if (!radius || radius === "0px") return 0;

            const value = parseFloat(radius);

            return radius.includes("rem")
                ? value * 16
                : value;

        };

        gsap.set(container, {
            force3D: true,
            willChange: "width,borderRadius",
        });

        const updateAnimation = (progress) => {

            const eased = gsap.parseEase("power2.inOut")(
                gsap.utils.clamp(0, 1, progress)
            );

            const width =
                startWidth +
                (window.innerWidth - startWidth) * eased;

            const radius =
                startRadius * (1 - eased);

            gsap.set(container, {
                width,
                borderRadius: radius,
                opacity: 1,
                force3D: true,
            });

        };

        const createTrigger = () => {

            if (!isDesktop()) {

                if (scrollTrigger) {

                    scrollTrigger.kill();
                    scrollTrigger = null;

                }

                gsap.set(container, {
                    clearProps: "width,borderRadius,opacity",
                });

                return;

            }

            if (scrollTrigger) return;

            startWidth = getStartWidth();
            startRadius = getBorderRadius();

            gsap.set(container, {
                width: startWidth,
                borderRadius: startRadius,
                opacity: 1,
            });

            scrollTrigger = ScrollTrigger.create({

                trigger: wrapper,

                start: "top 65%",

                end: "+=120%",

                scrub: 0.8,

                invalidateOnRefresh: true,

                onUpdate: (self) => {

                    requestAnimationFrame(() => {

                        updateAnimation(self.progress);

                    });

                },

            });

        };

        createTrigger();

        let resizeTimer;

        const handleResize = () => {

            clearTimeout(resizeTimer);

            resizeTimer = setTimeout(() => {

                const desktop = isDesktop();

                if (!desktop) {

                    scrollTrigger?.kill();
                    scrollTrigger = null;

                    gsap.set(container, {
                        clearProps: "width,borderRadius,opacity",
                    });

                    return;

                }

                startWidth = getStartWidth();
                startRadius = getBorderRadius();

                ScrollTrigger.refresh();

            }, 250);

        };

        window.addEventListener("resize", handleResize);

        return () => {

            window.removeEventListener("resize", handleResize);

            scrollTrigger?.kill();

        };

    }, []);

    // VIDEO STICKY ANIMATION
    useEffect(() => {

        const desktopContainer = videoContainerRef.current;

        if (desktopContainer) {

            initVideoControls(
                desktopContainer,
                desktopContainer.querySelector("#play-button"),
                desktopContainer.querySelector("#video"),
                false
            );

        }

        const mobileContainer =
            document.getElementById("video-container-mobile");

        if (mobileContainer) {

            initVideoControls(
                mobileContainer,
                mobileContainer.querySelector("#play-button-mobile"),
                mobileContainer.querySelector("#video-mobile"),
                true
            );

        }

    }, []);

    // GRID REVEAL
    useEffect(() => {

        const elements = document.querySelectorAll("[data-grid-reveal]");

        const animations = [];

        elements.forEach((element) => {

            const cols =
                parseInt(element.dataset.cols) || 12;

            const rows =
                parseInt(element.dataset.rows) || 12;

            const total = cols * rows;

            let masks = element.querySelector(".grid-reveal-masks");

            if (!masks) {

                masks = document.createElement("div");
                masks.className = "grid-reveal-masks";

                element.style.position = "relative";
                element.appendChild(masks);

            }

            masks.innerHTML = "";

            const items = [];

            for (let i = 0; i < total; i++) {

                const mask = document.createElement("div");

                mask.className = "grid-reveal-mask";

                mask.style.position = "absolute";
                mask.style.inset = 0;
                mask.style.background =
                    element.dataset.bgColor || "#ffffff";

                const x = (i % cols) * (100 / cols);
                const y = Math.floor(i / cols) * (100 / rows);

                mask.style.clipPath = `polygon(
                    ${x}% ${y}%,
                    ${x + (100 / cols)}% ${y}%,
                    ${x + (100 / cols)}% ${y + (100 / rows)}%,
                    ${x}% ${y + (100 / rows)}%
                )`;

                masks.appendChild(mask);

                items.push(mask);

            }

            gsap.set(items, {
                opacity: 1,
            });

            animations.push(

                gsap.to(items, {

                    opacity: 0,

                    duration:
                        Number(element.dataset.duration) || .5,

                    stagger:
                        Number(element.dataset.stagger) || .01,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: element,

                        start: () => {

                            // Desktop
                            if (window.innerWidth >= 1536) {
                                return "top center";
                            }

                            // Tablet
                            if (window.innerWidth >= 768) {
                                return "top 85%";
                            }

                            // Mobile
                            return "top 95%";
                        },

                        once: true,

                    },

                    onComplete: () => {
                        ScrollTrigger.refresh();
                    },

                })

            );

        });

        return () => {
            animations.forEach(animation => animation.kill());
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    }, []);

  return (
    <>
        <section className="pt-14 md:pt-20 lg:pt-24 xl:pt-25 pb-7.5">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">About Company</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Expert financial services for your needs</h2>
                    </div>
                </div>		
                <div ref={cardsRef} className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12 lg:mb-15" data-sttr-wrapper>
                    
                    <AboutCompany />

                </div>
                <div ref={stickyRef} className="w-full cursor-none overflow-hidden rounded-2xl md:rounded-3xl absolute top-0 left-1/2 -translate-x-1/2 2xl:hidden block" id="video-container-mobile" data-grid-reveal data-cols="12" data-rows="12" data-cols-sm="5" data-rows-sm="5" data-cols-lg="10" data-rows-lg="10" data-animation="random" data-bg-color="white" data-trigger="top 70%" data-stagger="0.004" data-duration="0.6">
                    <video id="video-mobile" data-content preload="metadata" autoPlay muted loop playsInline>
                        <source type="video/mp4" src={donate} />
                    </video>
                    <button className="absolute top-1/2 left-1/2 transform -translate-1/2 w-12 sm:w-20 h-12 sm:h-20 rounded-full bg-white/40 border-2 border-white/25 backdrop-blur-[7px] cursor-none text-white font-semibold text-sm sm:text-base leading-none flex items-center justify-center text-center z-10" id="play-button-mobile" type="button" aria-label="Play video">
                        <span className="pause-icon">Pause</span>
                    </button>
                </div>
            </div>
            <div ref={stickyAnimationRef} className="video-sticky-wrapper 2xl:block hidden min-h-screen px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 overflow-hidden!" id="video-sticky-wrapper">
                <div ref={videoContainerRef} className="w-full cursor-none overflow-hidden rounded-2xl md:rounded-3xl absolute top-0 left-1/2 -translate-x-1/2" id="video-container" data-grid-reveal data-cols="12" data-rows="12" data-cols-sm="5" data-rows-sm="5" data-cols-lg="10" data-rows-lg="10" data-animation="random" data-bg-color="white" data-trigger="top 100%" data-stagger="0.002" data-duration="0.2">
                    <video id="video" data-content preload="metadata" autoPlay muted loop playsInline>
                        <source type="video/mp4" src={donate} />
                    </video>
                    <button className="absolute top-1/2 left-1/2 transform -translate-1/2 w-12 sm:w-20 h-12 sm:h-20 rounded-full bg-white/40 border-2 border-white/25 backdrop-blur-[7px] cursor-none text-white font-semibold text-sm sm:text-base leading-none flex items-center justify-center text-center z-10" id="play-button" type="button" aria-label="Play video">
                        <span className="pause-icon">Pause</span>
                    </button>
                </div>
            </div>
            <div className="mt-8 lg:mt-12">
                
                {/* <Logos /> */}

            </div>
        </section>
    </>
  )
}
