import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../../../assets/img/title-icon.svg";

gsap.registerPlugin(ScrollTrigger);

export default function MaximizeArea() {

    const areas = [
        {
            icon : '#maximize-icon-01', 
            icon_class : 'bg-[#114A43] lg:col-span-2', 
            title : 'LOWER DTI', 
            title_class : '', 
            desc : 'Combine your annual income with a spouse or business partner to lower your debt-to-income (DTI) ratio.', 
        },
        {
            icon : '#maximize-icon-02', 
            icon_class : 'bg-[#14265C] lg:col-span-2', 
            title : 'CREDIT OPTIMIZATION', 
            title_class : '', 
            desc : 'Clear small credit card balances at least 30 days before applying partner to lower your  EMI, making the loan.', 
        },
        {
            icon : '#maximize-icon-03', 
            icon_class : 'bg-[#621348] lg:col-span-2', 
            title : 'LIQUIDITY RATIO', 
            title_class : '', 
            desc : 'Opting for a longer tenure lowers your monthly EMI, making the loan more "affordable".', 
        },
        {
            icon : '#maximize-icon-04', 
            icon_class : 'bg-[#4878B5] lg:col-span-3', 
            title : 'TOTAL CAPITAL', 
            title_class : 'leading-[1.4]', 
            desc : 'Donâ€™t just list your base salary. Include performance bonuses, stock dividends, and rental income to provide a complete picture of your global wealth.', 
        },
        {
            icon : '#maximize-icon-05', 
            icon_class : 'bg-[#3A4B05] lg:col-span-3', 
            title : 'DATA VERIFICATION', 
            title_class : 'leading-[1.4]', 
            desc : 'Securely sync your primary business accounts via Plaid. Real-time transaction history provides the "hard data" our AI needs to bypass standard paperwork delays.', 
        }
    ];

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

  return (
    <>
        <section className="section-spacing-md">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">MAXIMIZE YOUR ODDS</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>How to Improve Your Approval Chance</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Transparency in lending is the cornerstone of trust. Use these strategic boosters to strengthen your financial profile.</p>
                </div>
                <div className="">
                    <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-6 gap-y-4 md:gap-6" data-sttr-wrapper>
                        
                        {areas.map((item, index)=>(
                            <div className={`${item.icon_class} p-6 sm:p-8 rounded-xl sm:rounded-2xl`} data-sttr-card key={index}>
                                <div className="">
                                    <svg className="w-10 sm:w-12 h-10 sm:h-12 fill-current text-primary">
                                        <use href={item.icon}></use>
                                    </svg>
                                </div>
                                <div className="mt-6 md:mt-9">
                                    <h3 className={`text-white text-2xl font-semibold ${item.title_class}`}>{item.title}</h3>
                                </div>
                                <div className="mt-3">
                                    <p className="text-base text-[#CCCCCC] font-regular leading-[1.5]">{item.desc}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
