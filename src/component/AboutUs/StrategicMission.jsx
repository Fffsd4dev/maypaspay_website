import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../assets/img/title-icon.svg";
import aboutUsImg1 from "../../assets/img/female-student-using-mobile-device.jpg.jpeg";
import aboutUsImg2 from "../../assets/img/as.png";

gsap.registerPlugin(ScrollTrigger);

export default function StrategicMission() {

    const sectionRef = useRef(null);
    const cardsRef1 = useRef(null);
    const cardsRef2 = useRef(null);
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
    const animateCards = (ref) => {

        if (!ref.current) return;

        const ctx = gsap.context(() => {

            const cards = gsap.utils.toArray("[data-sttr-card]", ref.current);

            gsap.from(cards, {
                y: 50,
                opacity: 0,
                filter: "blur(10px)",
                duration: 0.6,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 75%",
                    once: true,
                },
            });

        }, ref);

        return ctx;

    };

    useEffect(() => {

        const ctx1 = animateCards(cardsRef1);
        const ctx2 = animateCards(cardsRef2);

        return () => {
            ctx1?.revert();
            ctx2?.revert();
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
        <section className="section-spacing-lg-md bg-linear-to-b to-background from-white">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">OUR STRATEGIC MISSION</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>The borderless banking for your global finance</h2>
                    </div>
                </div>
                
                <div className="grid gap-12 sm:gap-16 lg:gap-20">
                    <div ref={cardsRef1} className="grid grid-cols-1 md:grid-cols-2  gap-15 xl:gap-20 items-center" data-sttr-wrapper>
                        <div className="order-2 md:order-0" data-sttr-card>
                            <img className="w-full lg:max-w-full rounded-3xl" src={aboutUsImg1} alt="SecureVest illustration" />
                        </div>
                        <div className="" data-sttr-card>
                            <h3 className="text-title_black leading-none text-xl md:text-2xl font-semibold">Redefining Africa Finance</h3>
                            <p className="text-base font-normal text-paragraph_black leading-normal mt-3">At Maypas Pay, we exist to bridge the gap between local liquidity and the global digital economy. We empower creators, traders, freelancers, and businesses to hold, swap, and spend crypto, USD, and Naira effortlessly, without card declines, settlement delays, or artificial banking borders.
                            </p>

                            <div className="flex flex-row gap-10 justify-between flex-wrap mt-6 md:mt-9">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-secondary leading-none text-4xl lg:text-5xl">50+</h3>
                                    <p className="text-base lg:text-lg font-normal text-title_black leading-[1.2] xl:leading-none">Countries</p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-secondary leading-none text-4xl lg:text-5xl">1 Billion</h3>
                                    <p className="text-base lg:text-lg font-normal text-title_black leading-[1.2] xl:leading-none">CApital Deployed</p>
                                </div>
                            </div>
                        </div>
                    </div>			
                    <div ref={cardsRef2} className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-20 items-center" data-sttr-wrapper>
                        <div ref={faqWrapperRef} className="grid gap-4 faq-wrapper" data-sttr-card>
                            <div className="single-faq duration-300 p-4 sm:p-5 border border-border overflow-hidden rounded-xl sm:rounded-2xl">
                                <div className="faq-head cursor-pointer duration-300 flex items-center justify-between gap-2">
                                    <button type="button" className="font-semibold text-base sm:text-lg text-left text-title_black cursor-pointer flex items-center gap-3">
                                        <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                            <svg className="w-5 h-5 fill-current">
                                                <use href="#about-faq-icon-01"></use>
                                            </svg>
                                        </span>
                                        <span className="flex-1">Eliminating Financial Friction</span>
                                    </button>
                                    <svg className="fill-current duration-300 ease-in-out h-4.5 w-4 faq-icon" >
                                        <use href="#arrow-down"></use>
                                    </svg>
                                </div>
                                <div className="faq-body hidden">
                                    <div className="mt-3.5">
                                        <p className="text-paragraph_black">Our vision is to create a seamless borderless ecosystem where your funds move from Bitcoin, USD, or Naira into spendable cards in seconds.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="single-faq duration-300 p-4 sm:p-5 border border-border overflow-hidden rounded-xl sm:rounded-2xl">
                                <div className="faq-head cursor-pointer duration-300 flex items-center justify-between gap-2">
                                    <button type="button" className="font-semibold text-base sm:text-lg text-left text-title_black cursor-pointer flex items-center gap-3">
                                        <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                            <svg className="w-5 h-5 fill-current">
                                                <use href="#about-faq-icon-02"></use>
                                            </svg>
                                        </span>
                                        <span className="flex-1">Global Treasury Integration</span>
                                    </button>
                                    <svg className="fill-current duration-300 ease-in-out h-4.5 w-4 faq-icon">
                                        <use href="#arrow-down"></use>
                                    </svg>
                                </div>
                                <div className="faq-body hidden">
                                    <div className="mt-3.5">
                                        <p className="text-paragraph_black">Receive international payments, hold foreign & digital currency, and settle transactions with complete financial sovereignty.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="single-faq duration-300 p-4 sm:p-5 border border-border overflow-hidden rounded-xl sm:rounded-2xl">
                                <div className="faq-head cursor-pointer duration-300 flex items-center justify-between gap-2">
                                    <button type="button" className="font-semibold text-base sm:text-lg text-left text-title_black cursor-pointer flex items-center gap-3">
                                        <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                            <svg className="w-5 h-5 fill-current">
                                                <use href="#about-faq-icon-03"></use>
                                            </svg>
                                        </span>
                                        <span className="flex-1">AI-Driven Equity</span>
                                    </button>
                                    <svg className="fill-current duration-300 ease-in-out h-4.5 w-4 faq-icon">
                                        <use href="#arrow-down"></use>
                                    </svg>
                                </div>
                                <div className="faq-body hidden">
                                    <div className="mt-3.5">
                                        <p className="text-paragraph_black">Harness an all-in-one financial operating system designed for instant crypto swaps, real-time conversion rates, and high-success virtual USD and NGN cards—all secured by institutional-grade custody.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="" data-sttr-card>
                            <img className="w-full h-full rounded-3xl" src={aboutUsImg2} alt="SecureVest illustration" />
                        </div>
                    </div>		
                </div>

            </div>
        </section>
    </>
  )
}
