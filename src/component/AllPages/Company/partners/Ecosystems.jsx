import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../../../assets/img/title-icon.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Ecosystems() {

    const ecosystems = [
        {
            icon : '#segment', 
            title : 'LedgerSync', 
            desc : 'Automatically sync transaction data directly with Xero and QuickBooks for real-time bookkeeping.', 
        },
        {
            icon : '#zapier', 
            title : 'ShopFlow', 
            desc : 'Import your customer data and sales history from Shopify to unlock instant revenue-based lending.', 
        },
        {
            icon : '#dropbox', 
            title : 'NotifyBot', 
            desc : 'Create custom tax reserves and automate your quarterly filings using integrated government APIs.', 
        },
        {
            icon : '#atlassian', 
            title : 'AutoTax', 
            desc : 'Create custom tax reserves and automate your quarterly filings using integrated government APIs.', 
        },
        {
            icon : '#stripe', 
            title : 'SocialPay', 
            desc : 'Enhance your social media marketing by integrating your ad-spend accounts for real-time ROI tracking.', 
        },
        {
            icon : '#hubSpot', 
            title : 'ZapConnect', 
            desc : 'Automate complex workflows and connect with thousands of other apps using our official Zapier integration.', 
        },
        {
            icon : '#twilio', 
            title : 'CartMaster', 
            desc : 'Connect with WooCommerce to send personalized payout emails based on your customers shopping habits.', 
        },
        {
            icon : '#airtable', 
            title : 'GrowthCRM', 
            desc : 'Leverage HubSpot"s powerful CRM data to pre-qualify for higher credit limits and business loans.', 
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
        <section className="section-spacing-lg">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">INTEGRATED ECOSYSTEM</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Connect Your Financial Core to the Tools You Love</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Our platform provides a seamless bridge between traditional banking stability and the speed of digital innovation.</p>
                </div>		
                <div ref={cardsRef} className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" data-sttr-wrapper>
                    
                    {ecosystems.map((item, index)=>(
                        <div className="bg-background p-6 border border-border rounded-2xl" data-sttr-card key={index}>
                            <div>
                                <svg className="w-11.5 h-10.5 fill-current">
                                    <use href={item.icon}></use>
                                </svg>
                            </div>
                            <div className="pt-5 md:pt-8">
                                <h3 className="text-xl md:text-2xl font-semibold leading-none">{item.title}</h3>
                                <p className="leading-normal text-base pt-3">{item.desc}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    </>
  )
}
