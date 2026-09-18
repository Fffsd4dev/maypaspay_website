import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titlePrimary from "../../../../assets/img/title-icon-primary.svg";
import getstratedPositon1 from "../../../../assets/img/get-strated/getstrated-positon-1.webp";
import getstratedPositon2 from "../../../../assets/img/get-strated/getstrated-position-2.webp";

gsap.registerPlugin(ScrollTrigger);

export default function PerformanceArea() {

    const areas = [
        {
            tag : 'Building', 
            title : '01 - 670', 
            desc : 'Tailored solutions that may require additional collateral or a co-signer to help you build your history and graduate to higher tiers.', 
            name : 'Accessible Capital', 
            name2 : 'Credit Growth Tools', 
            name3 : 'Enhanced Security', 
        },
        {
            tag : 'Standard', 
            title : '670 - 749', 
            desc : 'Benefit from highly competitive market rates and a streamlined digital approval process with standard documentation.', 
            name : 'Market-Leading Rates', 
            name2 : 'Streamlined Approval', 
            name3 : 'Flexible Terms', 
        },
        {
            tag : 'Prime Choice', 
            title : '750 - 850', 
            desc : 'Access the absolute lowest institutional rates, maximum credit limits, and Instant Disbursement of funds.', 
            name : 'Institutional Rates', 
            name2 : 'Instant Disbursement', 
            name3 : 'Extended Limits', 
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
            <div className="container-lg">
                <div className="bg-secondary rounded-3xl overflow-hidden relative">
                    <div className="px-5 pt-10 pb-5 sm:p-10 md:p-15 xl:p-25 relative z-1">
                        <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                            <div className="md:max-w-170 w-full">
                                <div className="flex items-center gap-2.5">
                                    <img className="rotate" src={titlePrimary} alt="title-icon" />
                                    <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">PERFORMANCE TIERS</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4" data-content>How Your Credit Score Impacts Rates</h2>
                            </div>
                            <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_white" data-content>At SecureVest, we reward financial responsibility. Your credit score serves as a real-time risk indicator.</p>
                        </div>
                        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-14 lg:mt-20" data-sttr-wrapper>

                            {areas.map((item, index)=>(
                                <div className="bg-white/10 py-7 xl:py-8 px-5 md:px-8 rounded-xl sm:rounded-2xl border border-white/10 relative backdrop-blur-[34px]" data-sttr-card key={index}>
                                    <div className="flex flex-col justify-between h-full gap-5 md:gap-9">
                                        <div>
                                            <div className="pb-4 ">
                                                <p className="py-[7px] px-[11px] bg-primary inline-block rounded-full text-title_black leading-[1] font-medium text-[12px]">{item.tag}</p>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-semibold text-title_white leading-[1]">{item.title}</h3>
                                            <p className="text-paragraph_white mt-5">
                                                {item.desc}
                                            </p>
                                        </div>

                                        <div>
                                            <ul className="flex flex-col gap-3">
                                                <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_white ">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    {item.name}
                                                </li>
                                                <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_white">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    {item.name2}
                                                </li>
                                                <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_white ">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    {item.name3}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        
                        </div>
                        <div className="absolute bottom-0 left-0 pointer-events-none -z-1">
                            <img src={getstratedPositon1} alt="SecureVest illustration" />
                        </div>
                        <div className="absolute top-0 right-0 pointer-events-none -z-1">
                            <img src={getstratedPositon2} alt="SecureVest illustration" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
