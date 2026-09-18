import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import backgroundShape from "../../../assets/img/home-v2/global-access/background-shape.webp";
import titlePrimary from "../../../assets/img/title-icon-primary.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Infrastructure() {

    const faqWrapperRef = useRef(null);

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

    // FAQ Accordion
    useEffect(() => {
        const wrapper = faqWrapperRef.current;
        if (!wrapper) return;

        const faqHeads = wrapper.querySelectorAll(".faq-head");
        if (!faqHeads.length) return;

        const handlers = [];

        faqHeads.forEach((head) => {
            const handler = function () {
                const parent = this.closest(".single-faq");
                if (!parent) return;
                const body = parent.querySelector(".faq-body");
                if (!body) return;

                const allFaqs = wrapper.querySelectorAll(".single-faq");
                allFaqs.forEach((faq) => {
                    if (faq !== parent) {
                        faq.classList.remove("active");
                        const otherBody = faq.querySelector(".faq-body");
                        if (otherBody) {
                            otherBody.style.height = otherBody.scrollHeight + "px";
                            setTimeout(() => {
                                otherBody.style.height = "0";
                            }, 10);
                            setTimeout(() => {
                                otherBody.style.display = "none";
                            }, 300);
                        }
                    }
                });

                // Toggle current FAQ
                if (parent.classList.contains("active")) {
                    // Close
                    parent.classList.remove("active");
                    body.style.height = body.scrollHeight + "px";
                    setTimeout(() => {
                        body.style.height = "0";
                    }, 10);
                    setTimeout(() => {
                        body.style.display = "none";
                    }, 300);
                } else {
                    // Open
                    parent.classList.add("active");
                    body.style.display = "block";
                    const height = body.scrollHeight + "px";
                    body.style.height = "0";
                    setTimeout(() => {
                        body.style.height = height;
                    }, 10);
                    setTimeout(() => {
                        body.style.height = "";
                    }, 300);
                }
            };

            head.addEventListener("click", handler);
            handlers.push({ element: head, handler });
        });

        return () => {
            handlers.forEach(({ element, handler }) => {
                element.removeEventListener("click", handler);
            });
        };
    }, []);

  return (
    <>
        <section className="section-spacing-md">
            <div className="container-lg">
                <div className="px-4 pb-4 pt-10 sm:p-8 md:p-10 xl:p-18 2xl:p-25 bg-secondary rounded-2xl md:rounded-3xl relative z-1 overflow-hidden" data-grid-reveal data-cols="8" data-rows="8" data-cols-sm="5" data-rows-sm="12" data-cols-lg="8" data-rows-lg="8" data-animation="horizontal" data-bg-color="white" data-trigger="top 70%" data-stagger="0.006" data-duration="0.8" data-play-once="true">
                    <img className="w-full h-full absolute top-0 left-0 -z-1 select-none" src={backgroundShape} alt="background-shape" />
                    
                    <div className="flex justify-between flex-col lg:flex-row gap-10">
                        <div className="max-w-180 lg:max-w-135 w-full">
                            <div className="flex items-center gap-2.5">
                                <img className="rotate" src={titlePrimary} alt="title-icon" />
                                <p className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">INTEGRATED MERCHANT INFRASTRUCTURE</p>
                            </div>
                            <h3 className="font-bold leading-tight text-title_white mt-4 sm:mt-5">Financial Rails for Global Expansion</h3>
                            <p className="mt-4 text-base sm:text-lg text-paragraph_white">SecureVest provides the enterprise-grade payment architecture and regulatory framework required to navigate complex markets.</p>
                            <ul className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 flex flex-col gap-3 text-paragraph_white text-base leading-tight">
                                <li className="flex items-center gap-2">
                                    <svg className="w-5.25 h-5.25">
                                        <use href="#roundedCheck"></use>
                                    </svg>
                                    <span className="flex-1">Cross-Border Settlement</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5.25 h-5.25">
                                        <use href="#roundedCheck"></use>
                                    </svg>
                                    <span className="flex-1">Unified Treasury View</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <svg className="w-5.25 h-5.25">
                                        <use href="#roundedCheck"></use>
                                    </svg>
                                    <span className="flex-1">Institutional Security</span>
                                </li>
                            </ul>
                            <div className="mt-6 md:mt-9 lg:mt-12">
                                <Link className="button-primary" to="/getstrated">
                                    Get started
                                    <svg className="w-3 h-3 fill-current">
                                        <use href="#buttonArrow"></use>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div ref={faqWrapperRef} className="lg:max-w-165 w-full rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 faq-wrapper">
                            <div className="single-faq v3-single-faq duration-300 p-3 sm:p-5.5 lg:p-8 border-b border-white/10 last-of-type:border-b-0 overflow-hidden">
                                <div className="faq-head cursor-pointer duration-300 flex items-center justify-between gap-5">
                                    <button type="button" className="font-semibold text-lg sm:text-xl text-left text-title_white cursor-pointer flex items-center gap-3 flex-1">
                                        <svg className="faq-head-icon duration-300 w-5 md:w-8 lg:w-10 h-5 md:h-8 lg:h-10 fill-current">
                                            <use href="#v3-faq-icon-01"></use>
                                        </svg>
                                        <span className="flex-1">Digital Onboarding Guide</span>
                                    </button>
                                    <button type="button" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-title_black">
                                        <svg className="w-3 h-3 fill-current">
                                            <use href="#faqArrow"></use>
                                        </svg>
                                    </button>
                                </div>
                                <div className="faq-body hidden">
                                    <div className=" md:ml-10 lg:ml-12 mt-4 sm:mt-5 sm:max-w-[90%]">
                                        <p className="text-paragraph_white">SecrureVest is a next-generation AI writing platform designed to help creators, entrepreneurs, and teams produce high-quality content faster and smarter. It blends advanced language models with real-time context awareness, allowing you to generate human-sounding writing that feels natural, emotionally intelligent, and aligned with your brand's voice.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="single-faq v3-single-faq duration-300 p-3 sm:p-5.5 lg:p-8 border-b border-white/10 last-of-type:border-b-0 overflow-hidden">
                                <div className="faq-head cursor-pointer duration-300 flex items-center justify-between gap-5">
                                    <button type="button" className="font-semibold text-lg sm:text-xl text-left text-title_white cursor-pointer flex items-center gap-3 flex-1">
                                        <svg className="faq-head-icon duration-300 w-5 md:w-8 lg:w-10 h-5 md:h-8 lg:h-10 fill-current">
                                            <use href="#v3-faq-icon-02"></use>
                                        </svg>
                                        <span className="flex-1">Strategic Liquidity Management</span>
                                    </button>
                                    <button type="button" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-title_black">
                                        <svg className="w-3 h-3 fill-current">
                                            <use href="#faqArrow"></use>
                                        </svg>
                                    </button>
                                </div>
                                <div className="faq-body hidden">
                                    <div className=" md:ml-10 lg:ml-12 mt-4 sm:mt-5 sm:max-w-[90%]">
                                        <p className="text-paragraph_white">Manage your cash flow efficiently with advanced liquidity planning solutions designed to support business stability and growth. Our strategies help organizations balance financial resources, optimize capital usage, and maintain strong financial flexibility in changing market conditions.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="single-faq v3-single-faq duration-300 p-3 sm:p-5.5 lg:p-8 border-b border-white/10 last-of-type:border-b-0 overflow-hidden">
                                <div className="faq-head cursor-pointer duration-300 flex items-center justify-between gap-5">
                                    <button type="button" className="font-semibold text-lg sm:text-xl text-left text-title_white cursor-pointer flex items-center gap-3 flex-1">
                                        <svg className="faq-head-icon duration-300 w-5 md:w-8 lg:w-10 h-5 md:h-8 lg:h-10 fill-current">
                                            <use href="#v3-faq-icon-03"></use>
                                        </svg>
                                        <span className="flex-1">Risk Compliance Architecture</span>
                                    </button>
                                    <button type="button" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-title_black">
                                        <svg className="w-3 h-3 fill-current">
                                            <use href="#faqArrow"></use>
                                        </svg>
                                    </button>
                                </div>
                                <div className="faq-body hidden">
                                    <div className=" md:ml-10 lg:ml-12 mt-4 sm:mt-5 sm:max-w-[90%]">
                                        <p className="text-paragraph_white">Strengthen your organization with a structured framework that ensures regulatory compliance and effective risk management. Our approach helps identify potential threats, monitor financial activities, and implement policies that protect your business from operational and financial risks.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="single-faq v3-single-faq duration-300 p-3 sm:p-5.5 lg:p-8 border-b border-white/10 last-of-type:border-b-0 overflow-hidden">
                                <div className="faq-head cursor-pointer duration-300 flex items-center justify-between gap-5">
                                    <button type="button" className="font-semibold text-lg sm:text-xl text-left text-title_white cursor-pointer flex items-center gap-3 flex-1">
                                        <svg className="faq-head-icon duration-300 w-5 md:w-8 lg:w-10 h-5 md:h-8 lg:h-10 fill-current">
                                            <use href="#v3-faq-icon-04"></use>
                                        </svg>
                                        <span className="flex-1">Revenue Operations Consulting</span>
                                    </button>
                                    <button type="button" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-title_black">
                                        <svg className="w-3 h-3 fill-current">
                                            <use href="#faqArrow"></use>
                                        </svg>
                                    </button>
                                </div>
                                <div className="faq-body hidden">
                                    <div className=" md:ml-10 lg:ml-12 mt-4 sm:mt-5 sm:max-w-[90%]">
                                        <p className="text-paragraph_white">Enhance your revenue performance through strategic consulting that aligns sales, marketing, and operational processes. We help businesses streamline workflows, improve decision-making, and maximize profitability with data-driven strategies and performance insights.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="single-faq v3-single-faq duration-300 p-3 sm:p-5.5 lg:p-8 border-b border-white/10 last-of-type:border-b-0 overflow-hidden">
                                <div className="faq-head cursor-pointer duration-300 flex items-center justify-between gap-5">
                                    <button type="button" className="font-semibold text-lg sm:text-xl text-left text-title_white cursor-pointer flex items-center gap-3 flex-1">
                                        <svg className="faq-head-icon duration-300 w-5 md:w-8 lg:w-10 h-5 md:h-8 lg:h-10 fill-current">
                                            <use href="#v3-faq-icon-05"></use>
                                        </svg>
                                        <span className="flex-1">Custom Corporate Financing</span>
                                    </button>
                                    <button type="button" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-title_black">
                                        <svg className="w-3 h-3 fill-current">
                                            <use href="#faqArrow"></use>
                                        </svg>
                                    </button>
                                </div>
                                <div className="faq-body hidden">
                                    <div className=" md:ml-10 lg:ml-12 mt-4 sm:mt-5 sm:max-w-[90%]">
                                        <p className="text-paragraph_white">Access customized financing solutions designed to support your companyâ€™s expansion and investment goals. We provide strategic funding structures that enable businesses to secure capital, manage financial resources effectively, and achieve long-term growth.</p>
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
