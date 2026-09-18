import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import enterpriseBgShape from "../../../assets/img/home-v3/enterprise-bg-shape.webp";
import titlePrimary from "../../../assets/img/title-icon-primary.svg";
import enterpriseThumb from "../../../assets/img/home-v3/enterprise-thumb.webp";

export default function Counters() {

    const counters = [
        {
            title : 'Global Partnerships', 
            target : '1000', 
            symbol : '+', 
        },
        {
            title : 'Strategic Deployments', 
            target : '3000', 
            symbol : '+', 
        },
        {
            title : 'Expert Advisors', 
            target : '2000', 
            symbol : '+', 
        }
    ];

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

    // Counter animation with IntersectionObserver
    useEffect(() => {
        const counters = document.querySelectorAll(".counter");
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

    // Enterprise Thumb Image Animation
    useEffect(() => {
        const thumbElements = document.querySelectorAll("[data-enterprise-thumb]");
        if (!thumbElements.length) return;

        const animations = [];

        thumbElements.forEach((thumbWrapper) => {
            const images = thumbWrapper.querySelectorAll("img");
            if (!images.length) return;

            images.forEach((img) => {
                gsap.set(img, {
                    clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                    force3D: true,
                });
            });

            const tl = gsap.timeline({ paused: true });

            images.forEach((img) => {
                tl.fromTo(
                    img,
                    {
                        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
                        force3D: true,
                    },
                    {
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                        duration: 1.2,
                        ease: "power3.out",
                        force3D: true,
                    },
                    0 
                );
            });

            const st = ScrollTrigger.create({
                trigger: thumbWrapper,
                start: "top 75%",
                end: "top 10%",
                animation: tl,
                toggleActions: "play none none none",
                invalidateOnRefresh: true,
            });

            animations.push(st);
        });

        return () => {
            animations.forEach((st) => st.kill());
        };
    }, []);

  return (
    <>
        <section className="flex flex-col md:flex-row">
            <div className="md:w-[60%] px-4 py-8 sm:p-8 md:p-10 xl:p-18 2xl:p-25 bg-secondary relative z-1 overflow-hidden before:absolute before:w-full before:h-full before:top-0 before:left-0 before:-z-1 before:bg-secondary/80" data-grid-reveal data-cols="8" data-rows="8" data-cols-sm="5" data-rows-sm="12" data-cols-lg="8" data-rows-lg="8" data-animation="horizontal" data-bg-color="white" data-trigger="top 70%" data-stagger="0.006" data-duration="0.8" data-play-once="true">
                <img className="w-full h-full absolute top-0 left-0 -z-2 select-none object-cover" src={enterpriseBgShape} alt="background-shape" />
                <div className="max-w-225">
                    <div className="flex items-center gap-2.5">
                        <img className="rotate" src={titlePrimary} alt="title-icon" />
                        <p className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">ELEVATE YOUR ENTERPRISE</p>
                    </div>
                    <h3 className="font-bold leading-tight text-title_white mt-4 sm:mt-5">The Strategic Engine for Your Global Ambitions.</h3>
                    <p className="mt-4 text-base sm:text-lg text-paragraph_white">Don't navigate the complexities of international finance alone. SecureVest provides the elite capital, institutional security, and high-level advisory required to transform your vision into a global market leader.</p>
                    <div className="mt-6 md:mt-9 max-w-175 flex justify-between gap-6 flex-wrap">
                        
                        {counters.map((item, index)=>(
                            <div className="" key={index}>
                                <div className="flex">
                                    <h3 className="text-white font-bold leading-none! counter" data-target={item.target}>0</h3>
                                    <h3 className="text-white font-bold leading-none!">{item.symbol}</h3>
                                </div>
                                <p className="mt-3 sm:mt-4 text-white leading-none">{item.title}</p>
                            </div>
                        ))}

                    </div>
                    <div className="mt-6 md:mt-9">
                        <Link className="button-primary" to="/getstrated">
                            Open Your Bank Account
                            <svg className="w-3 h-3 fill-current">
                                <use href="#buttonArrow"></use>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="md:w-[40%]" data-enterprise-thumb>
                <img className="w-full h-full object-cover" src={enterpriseThumb} alt="enterprise" />
            </div>
        </section>
    </>
  )
}
