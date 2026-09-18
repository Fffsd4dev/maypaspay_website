import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Grow from "../../../Home/index/Grow";

import contactFormBg from "../../../../assets/img/services/contact-form-bg.webp";
import contactForm1 from "../../../../assets/img/services/contact-form-1.webp";
import contactForm3 from "../../../../assets/img/services/contact-form-3.webp";
import contactForm4 from "../../../../assets/img/services/contact-form-4.webp";
import contactForm5 from "../../../../assets/img/services/contact-form-5.webp";

gsap.registerPlugin(ScrollTrigger);

export default function HeroFinancialTools() {

    const cardsRef = useRef(null);

    const counters = [
        {
            title : 'Users worldwide', 
            target : '50', 
            symbol : 'M+', 
        },
        {
            title : 'Transaction', 
            target : '8', 
            symbol : 'M', 
        },
        {
            title : 'Countries', 
            target : '90', 
            symbol : '+', 
        }
    ];

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

        // Start observing each counter
        counters.forEach((counter) => {
            observer.observe(counter);
        });

        const container = document.getElementById("financial-tools-counters");
        if (container) {
            const countersInContainer = container.querySelectorAll(".counter");
            countersInContainer.forEach(c => {
                const rect = c.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    animateCounter(c);
                }
            });
        }

        return () => {
            observer.disconnect();
        };
    }, []);

  return (
    <>
        <section className="py-14 md:py-20 lg:py-24 xl:py-25 bg-cover bg-center bg-no-repeat relative z-1" style={{ backgroundImage: `url(${contactFormBg})` }}>
            <div className="hidden" data-section-title></div>
            <div className="container">
                <div ref={cardsRef} className="flex flex-col md:flex-row justify-between gap-9" data-sttr-wrapper>
                    <div className="max-w-135 w-full">
                        <h1 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl text-title_white leading-tight!" data-sttr-card>Contact our sales team</h1>
                        <p className="text-lg font-normal leading-normal text-paragraph_white mt-4" data-sttr-card>We help individuals and businesses grow wealth, reduce risk, and achieve long-term success.</p>

                        <ul className="flex flex-col gap-4 mt-9" data-sttr-card>
                            <li className="flex gap-3.25 items-start text-base font-normal leading-normal text-paragraph_white">
                                <svg className="mt-0.5 w-5 h-5 fill-current">
                                    <use href="#contactIcon-01"></use>
                                </svg>
                                <span className="flex-1">Scale engineering instantly: Ona Agents handle tasks securely to completion, no hand-holding required.</span>
                            </li>
                            <li className="flex gap-3.25 items-start shrink-0 text-base font-normal leading-normal text-paragraph_white">
                                <svg className="mt-0.5 w-5 h-5 fill-current">
                                    <use href="#contactIcon-02"></use>
                                </svg>
                                <span className="flex-1">One-click, always compliant environments: Ephemeral, policy enforced, and identical across every developer and Ona Agent.</span>
                            </li>
                            <li className="flex gap-3.25 items-start shrink-0 text-base font-normal leading-normal text-paragraph_white">
                                <svg className="mt-0.5 w-5 h-5 fill-current">
                                    <use href="#contactIcon-03"></use>
                                </svg>
                                <span className="flex-1">Seamless integrations: Connect to your repos, tools, and enterprise stack in seconds.</span>
                            </li>
                            <li className="flex gap-3.25 items-start shrink-0 text-base font-normal leading-normal text-paragraph_white">
                                <svg className="mt-0.5 w-5 h-5 fill-current">
                                    <use href="#contactIcon-04"></use>
                                </svg>
                                <span className="flex-1">Flexible deployment: Run Ona in our cloud or your VPC, whatever your compliance requires.</span>
                            </li>
                        </ul>
                        <div className=" mt-9" data-sttr-card>
                            <div className="flex items-center">
                                <div className="border-[2.3px] border-primary rounded-full bg-primary w-12.5 h-12.50 overflow-hidden">
                                    <img className="w-full h-full object-cover" src={contactForm1} alt="customer profile image 1" />
                                </div>
                                <div className="border-[2.3px] border-primary rounded-full bg-primary w-12.5 h-12.50 overflow-hidden -ml-4">
                                    <img className="w-full h-full object-cover" src={contactForm3} alt="customer profile image 2" />
                                </div>
                                <div className="border-[2.3px] border-primary rounded-full bg-primary w-12.5 h-12.50 overflow-hidden -ml-4">
                                    <img className="w-full h-full object-cover" src={contactForm4} alt="customer profile image 3" />
                                </div>
                                <div className="border-[2.3px] border-primary rounded-full bg-primary w-12.5 h-12.50 overflow-hidden -ml-4">
                                    <img className="w-full h-full object-cover" src={contactForm5} alt="customer profile image 4" />
                                </div>
                                <div className="-ml-4 ">
                                    <p className="text-sm font-semibold leading-none text-title_black border-[2.3px] border-primary w-12.5 h-12.5 bg-primary rounded-full flex items-center justify-center">5K+</p>
                                </div>
                            </div>
                            <p className="text-sm font-normal leading-none text-paragraph_white mt-3">Over 5,000+ Reviews</p>
                        </div>
                    </div>
                    <div className="md:max-w-129.25 w-full">
                        <div data-sttr-card>
                            
                            <Grow />

                        </div>

                        <div className="flex flex-wrap justify-between items-start gap-4 mt-6 sm:mt-8 lg:mt-12" id="financial-tools-counters" data-sttr-card>
                            
                            {counters.map((item, index)=>(
                                <div className="" key={index}>
                                    <div className="flex">
                                        <h3 className="text-primary font-bold leading-none! counter" data-target={item.target}>0</h3>
                                        <h3 className="text-primary font-bold leading-none!">{item.symbol}</h3>
                                    </div>
                                    <p className="mt-2 text-base lg:text-lg text-white leading-none">{item.title}</p>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
