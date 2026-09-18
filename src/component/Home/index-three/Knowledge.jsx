import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../../assets/img/title-icon.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Knowledge() {

    const sectionRef = useRef(null);
    const cardsRef = useRef(null);

    const knowledges = [
        {
            icon : '#knowledgehub-icon2', 
            title : '2027 Annual Fiscal & Impact Report', 
            desc : 'A detailed analysis of our institutional growth, capital deployment strategies, and audited financial statements.',
        },
        {
            icon : '#knowledgehub-icon3', 
            title : 'Governance Compliance Framework', 
            desc : 'Review our Tier-1 regulatory standards, risk mitigation protocols, and commitment to international banking transparency.',
        },
        {
            icon : '#knowledgehub-icon4', 
            title : 'Q3 Global Market Intelligence Report', 
            desc : 'Expert projections on emerging market trends, interest rate volatility, and strategic cross-border investment opportunities.',
        },
        {
            icon : '#knowledgehub-icon5', 
            title : 'Advanced Treasury Optimization Guide', 
            desc : 'A strategic blueprint for automating liquidity flows and maximizing yield on idle corporate capital across multiple jurisdictions.',
        },
        {
            icon : '#knowledgehub-icon6', 
            title : 'Institutional Cybersecurity Protocols', 
            desc : 'An in-depth look at our multi-layered encryption and asset protection technologies designed for high-net-worth security.',
        },
        {
            icon : '#knowledgehub-icon7', 
            title : 'ESG Sustainable Investment Portfolio', 
            desc : 'Explore how SecureVest is integrating Environmental, Social, and Governance criteria into our long-term capital allocation models.',
        }
    ];

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
        <section className="section-spacing-md-lg">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">KNOWLEDGE HUB</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Strategic Insights Performance Reports</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>
                        Access our comprehensive library of institutional research, annual performance audits.
                    </p>
                </div>

                <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-sttr-wrapper>
                    
                    {knowledges.map((item, index)=>(
                        <div data-sttr-card key={index}>
                            <div className="p-5 md:p-6 bg-background border border-border rounded-2xl h-full">
                                <svg className="md:w-13 w-10 md:h-13 h-10 text-secondary">
                                    <use href={item.icon}></use>
                                </svg>
                                <h3 className="mt-5 sm:mt-6 md:mt-8 lg:mt-9 text-title_black text-xl md:text-2xl font-semibold leading-snug!">
                                    {item.title}
                                </h3>
                                <p className="mt-3">
                                    {item.desc}
                                </p>
                            </div>			
                        </div>
                    ))}

                </div>
            </div>
        </section>
    </>
  )
}
