import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../../assets/img/title-icon.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Services() {

    const titleRef = useRef(null);
    const cardsRef = useRef(null);

    const services = [
        {
            icon : '#group-lcon', 
            number : '01', 
            title : 'Instant Crypto Settlement', 
            desc : 'Convert Bitcoin to Naira or Dollars instantly in seconds;  transparent fees, and best market conversion rates.', 
        },
        {
            icon : '#piggy-bank-icon', 
            number : '02', 
            title : 'Multi-Currency Virtual Cards', 
            desc : 'Issue USD and NGN virtual cards in seconds to pay for global subscriptions, Meta ads, AWS, and online shopping with zero decline rates.', 
        },
        {
            icon : '#chart-line-icon', 
            number : '03', 
            title : 'USD & Naira Bank Accounts', 
            desc : 'Get dedicated account numbers in USD and NGN to receive foreign transfers, employer payouts, and local bank transfers effortlessly.', 
        },
        {
            icon : '#globe-icon', 
            number : '04', 
            title : 'Frictionless Asset Exchange',
            desc : 'Swap seamlessly between BTC, USD, and NGN inside one unified wallet without jumping across multiple platforms.', 
        },
        {
            icon : '#refresh-icon', 
            number : '05', 
            title : 'Multi-Currency Savings', 
            desc : 'Store assets in stable currencies to hedge against inflation, earn competitive yields, and preserve long-term purchasing power.', 
        },
        {
            icon : '#credit-card-icon', 
            number : '06', 
            title : 'Bank-Grade Infrastructure', 
            desc : 'Protect your assets with multi-factor authentication, end-to-end encryption, and licensed institutional custody partners.', 
        }
    ];

    // Section Title Animation
    useEffect(() => {

        if (!titleRef.current) return;

        const ctx = gsap.context(() => {

            const icon = titleRef.current.querySelector(".rotate");
            const subtitle = titleRef.current.querySelector("span");
            const heading = titleRef.current.querySelector("h2");
            const paragraph = titleRef.current.querySelector("p");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: titleRef.current,
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
                    duration: 0.4,
                }, "-=0.4");
            }

            if (heading) {
                tl.from(heading, {
                    y: 35,
                    opacity: 0,
                    duration: 0.6,
                }, "-=0.2");
            }

            if (paragraph) {
                tl.from(paragraph, {
                    y: 35,
                    opacity: 0,
                    duration: 0.6,
                }, "-=0.3");
            }

        }, titleRef);

        return () => ctx.revert();

    }, []);

    // Cards Animation
    useEffect(() => {

        if (!cardsRef.current) return;

        const ctx = gsap.context(() => {

            const cards = gsap.utils.toArray(
                "[data-sttr-card]",
                cardsRef.current
            );

            gsap.from(cards, {
                y: 50,
                opacity: 0,
                filter: "blur(10px)",
                duration: 0.6,
                stagger: 0.08,
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
    <section className="section-spacing-lg-md">
		<div className="container">
			
			<div ref={titleRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                <div className="md:max-w-170 w-full">
                    <div className="flex items-center gap-2.5">
                        <img className="rotate" src={titleIcon} alt="title-icon" />
                        <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">KEY SERVICES OVERVIEW</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Comprehensive Solutions for Modern Banking</h2>
                </div>
            </div>
            <div ref={cardsRef} className="grid gap-6 lg:gap-0 sm:grid-cols-2 lg:grid-cols-3 items-stretch lg:rounded-2xl lg:border lg:border-border lg:border-b-0 overflow-hidden service-card-wrapper calculator-border" data-sttr-wrapper>
                
                {services.map((item, index)=>(
                    <div data-sttr-card key={index}>
                        <div className="relative h-full  px-5 sm:px-6 xl:px-9 py-7 md:py-9 duration-600! transition-all ease-in-out overflow-hidden group border lg:border-t-0 lg:border-l-0 lg:border-b lg:border-r border-border lg:nth-[3]:border-r-0 lg:nth-[6]:border-r-0 bg-background lg:bg-transparent rounded-xl lg:rounded-none service-card">
                            <div className="w-10 h-10 shrink-0 text-secondary transition-all group-hover:text-primary duration-300!">
                                <svg className="w-10 h-10 fill-current">
                                    <use href={item.icon}></use>
                                </svg>
                            </div>
                            <div className="flex flex-col items-start gap-3 md:gap-4 pt-7 sm:pt-9 md:pt-12">
                                <h2 className="w-full text-title_black group-hover:text-white text-xl md:text-2xl font-semibold leading-[1.3] transition-all duration-300">
                                    {item.title}
                                </h2>
                                <p className="w-full text-paragraph_black group-hover:text-paragraph_white translate-all duration-300 font-normal text-4 leading-normal">
                                    {item.desc}
                                </p>
                            </div>
                            <div className="absolute -top-5 xl:-top-6.5 -right-3 xl:-right-5 text-[100px] md:text-[120px] xl:text-[150px] leading-[100%] font-bold text-transparent opacity-15 [-webkit-text-stroke:2px_#114A43] transition-all duration-300 ease-in-out group-hover:[-webkit-text-stroke:2px_#22C55E] z-0">
                                {item.number}
                            </div>
                        </div>	
                    </div>
                ))}
                
            </div>

		</div>
	</section>
  )
}
