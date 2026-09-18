import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import titleIcon from "../../../assets/img/title-icon.svg";
import connectedThumb from "../../../assets/img/home-v2/connected-thumb.webp";

gsap.registerPlugin(ScrollTrigger);

export default function ConnectedArea() {

    const sectionRef = useRef(null);
    const cardsRef = useRef(null);
    const faqWrapperRef = useRef(null);

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
            <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                <div className="md:max-w-170 w-full">
                    <div className="flex items-center gap-2.5">
                        <img className="rotate" src={titleIcon} alt="title-icon" />
                        <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">ALWAYS CONNECTED</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Financial help whenever you need it</h2>
                </div>
            </div>

            <div ref={cardsRef} className="flex items-start gap-6 flex-col md:flex-row" data-sttr-wrapper>
                <div className="max-w-70 lg:max-w-92.5 w-full" data-sttr-card>
                    <div className="p-6 bg-secondary rounded-2xl relative z-1 overflow-hidden">
                        <span className="text-[64px] font-bold text-white/10 absolute -z-1 select-none transform -rotate-90 translate-y-36 lg:translate-y-43 translate-x-15 lg:translate-x-33.75 block">SUPPORT</span>
                        <img className="rounded-2xl overflow-hidden connected-thumb" src={connectedThumb} alt="support-icon" />
                        <div className="my-8 flex-col gap-4 flex">
                            <div className="">
                                <p className="text-white">
                                    <Link className="text-white" to="tel:08008961234">0800 896 1234</Link>
                                    <span className="text-paragraph_white">(Toll Free)</span>
                                </p>
                                <p className="text-paragraph_white leading-none mt-1">Personal</p>
                            </div>
                            <div className="">
                                <Link to="tel:+496912345678" className="text-white leading-none">+49&nbsp;69&nbsp;1234&nbsp;5678</Link>
                                <p className="text-paragraph_white leading-none mt-1">Corporate</p>
                            </div>
                        </div>
                        <div className="mt-7.5">
                            <Link className="button-primary w-full" to="/contact">
                                Send Your Queries
                                <svg className="w-2.75 h-2.75 fill-current">
                                    <use href="#buttonArrow"></use>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div ref={faqWrapperRef} className="max-w-221.5 w-full flex flex-col gap-2.5 faq-wrapper">

                    <div className="single-faq p-3 sm:p-5.5 rounded-xl sm:rounded-2xl border border-border bg-background" data-sttr-card>
                        <div className="faq-head cursor-pointer duration-300 flex items-center justify-between gap-5">
                            <button type="button" className="font-semibold text-lg sm:text-xl text-left text-title_black cursor-pointer flex items-center gap-3">
                                <svg className="w-4 sm:w-5 h-4 sm:h-5 fill-current">
                                    <use href="#faqIcon-01"></use>
                                </svg>
                                <span className="flex-1">Live Payment Assistance</span>
                            </button>
                            <button type="button" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-title_black faq-icon">
                                <svg className="w-3 h-3 fill-current">
                                    <use href="#faqArrow"></use>
                                </svg>
                            </button>
                        </div>
                        <div className="faq-body hidden">
                            <div className="mt-4 sm:mt-5 sm:max-w-[90%]">
                                <p className="text-paragraph_black">SecrureVest is a next-generation AI writing platform designed to help creators, entrepreneurs, and teams produce high-quality content faster and smarter. It blends advanced language models with real-time context awareness, allowing you to generate human-sounding writing that feels natural, emotionally intelligent, and aligned with your brand's voice.</p>
                            </div>
                        </div>
                    </div>
                    <div className="single-faq p-3 sm:p-5.5 rounded-xl sm:rounded-2xl border border-border bg-background" data-sttr-card>
                        <div className="faq-head cursor-pointer duration-300 flex items-center justify-between gap-5">
                            <button type="button" className="font-semibold text-lg sm:text-xl text-left text-title_black cursor-pointer flex items-center gap-3">
                                <svg className="w-4 sm:w-5 h-4 sm:h-5 fill-current">
                                    <use href="#faqIcon-02"></use>
                                </svg>
                                <span className="flex-1">Instant Account Support</span>
                            </button>
                            <button type="button" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-title_black faq-icon">
                                <svg className="w-3 h-3 fill-current">
                                    <use href="#faqArrow"></use>
                                </svg>
                            </button>
                        </div>
                        <div className="faq-body hidden">
                            <div className="mt-4 sm:mt-5 sm:max-w-[90%]">
                                <p className="text-paragraph_black">Get quick and reliable help for any account-related issue. Our support team assists with login problems, profile updates, and account verification to ensure everything runs smoothly. We are always ready to provide guidance and resolve issues so you can manage your account without interruption.</p>
                            </div>
                        </div>
                    </div>
                    <div className="single-faq p-3 sm:p-5.5 rounded-xl sm:rounded-2xl border border-border bg-background" data-sttr-card>
                        <div className="faq-head cursor-pointer duration-300 flex items-center justify-between gap-5">
                            <button type="button" className="font-semibold text-lg sm:text-xl text-left text-title_black cursor-pointer flex items-center gap-3">
                                <svg className="w-4 sm:w-5 h-4 sm:h-5 fill-current">
                                    <use href="#faqIcon-03"></use>
                                </svg>
                                <span className="flex-1">Emergency Card Services</span>
                            </button>
                            <button type="button" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-title_black faq-icon">
                                <svg className="w-3 h-3 fill-current">
                                    <use href="#faqArrow"></use>
                                </svg>
                            </button>
                        </div>
                        <div className="faq-body hidden">
                            <div className="mt-4 sm:mt-5 sm:max-w-[90%]">
                                <p className="text-paragraph_black">Quickly report lost or stolen cards and secure your account instantly. Our emergency service allows you to block your card and request a replacement without delay. This ensures your banking remains protected and you can continue your transactions safely.</p>
                            </div>
                        </div>
                    </div>
                    <div className="single-faq p-3 sm:p-5.5 rounded-xl sm:rounded-2xl border border-border bg-background" data-sttr-card>
                        <div className="faq-head cursor-pointer duration-300 flex items-center justify-between gap-5">
                            <button type="button" className="font-semibold text-lg sm:text-xl text-left text-title_black cursor-pointer flex items-center gap-3">
                                <svg className="w-4 sm:w-5 h-4 sm:h-5 fill-current">
                                    <use href="#faqIcon-04"></use>
                                </svg>
                                <span className="flex-1">Security Fraud Alert</span>
                            </button>
                            <button type="button" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-title_black faq-icon">
                                <svg className="w-3 h-3 fill-current">
                                    <use href="#faqArrow"></use>
                                </svg>
                            </button>
                        </div>
                        <div className="faq-body hidden">
                            <div className="mt-4 sm:mt-5 sm:max-w-[90%]">
                                <p className="text-paragraph_black">Stay protected with advanced security monitoring and real-time alerts. Our system continuously tracks account activity and instantly notifies you of suspicious transactions. This helps prevent fraud and keeps your financial information safe and secure.</p>
                            </div>
                        </div>
                    </div>
                    <div className="single-faq p-3 sm:p-5.5 rounded-xl sm:rounded-2xl border border-border bg-background" data-sttr-card>
                        <div className="faq-head cursor-pointer duration-300 flex items-center justify-between gap-5">
                            <button type="button" className="font-semibold text-lg sm:text-xl text-left text-title_black cursor-pointer flex items-center gap-3">
                                <svg className="w-4 sm:w-5 h-4 sm:h-5 fill-current">
                                    <use href="#faqIcon-05"></use>
                                </svg>
                                <span className="flex-1">Digital Onboarding Guide</span>
                            </button>
                            <button type="button" className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-title_black faq-icon">
                                <svg className="w-3 h-3 fill-current">
                                    <use href="#faqArrow"></use>
                                </svg>
                            </button>
                        </div>
                        <div className="faq-body hidden">
                            <div className="mt-4 sm:mt-5 sm:max-w-[90%]">
                                <p className="text-paragraph_black">Start your digital banking journey with an easy step-by-step onboarding process. Complete your account setup, identity verification, and service activation quickly through our secure system. Enjoy convenient and modern banking services from anywhere.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
