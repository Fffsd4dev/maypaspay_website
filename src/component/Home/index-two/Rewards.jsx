import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../../assets/img/title-icon.svg";
import instantRewardsThumb from "../../../assets/img/home-v2/instant-rewards-thumb.webp";

gsap.registerPlugin(ScrollTrigger);

export default function Rewards() {

    const sectionRef = useRef(null);
    const cardsRef = useRef(null);

    // Initialize nice-select after component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof window.$ !== 'undefined' && window.$.fn && typeof window.$.fn.niceSelect === 'function') {
                window.$('select').niceSelect();
            } else {
                setTimeout(() => {
                    if (typeof window.$ !== 'undefined' && window.$.fn && typeof window.$.fn.niceSelect === 'function') {
                        window.$('select').niceSelect();
                    }
                }, 200);
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

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
        <section className="section-spacing-md-lg relative z-10">
            <div className="container">
                
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">INSTANT REWARDS</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Instant Virtual Cards with 25% Cashback</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Generate secure virtual cards in seconds to start earning. Use the calculator below to see how reinvesting</p>
                </div>		
                <div ref={cardsRef} className="flex items-center justify-between gap-6 sm:gap-10 flex-col md:flex-row" data-sttr-wrapper>
                    <div className="md:max-w-135 w-full" data-sttr-card>
                        <form className="flex flex-col gap-6 w-full">
                            <div className="">
                                <label className="text-base font-normal leading-normal text-title_black mb-2 block" >Initial Deposit</label>
                                <div className="relative">
                                    <input className="h-11 w-full bg-background border border-border backdrop-blur-[34px] rounded-[100px] cursor-pointer text-base text-title_black flex items-center relative pl-9 pr-5 appearance-none outline-none duration-300 focus:border-secondary" type="number" defaultValue="7" id="initial-deposit" name="initial-deposit" />
                                    <span className="text-base text-title_black absolute top-1/2 transform -translate-1/2 left-6">$</span>
                                </div>
                            </div>
                            
                            <div className="select-box-light">
                                <label className="text-base font-normal leading-normal text-title_black mb-2 block">Cashback Growth Horizon (Years)</label>
                                <select className="select-active">
                                    <option value="1">10</option>
                                    <option value="2">20</option>
                                    <option value="3">30</option>
                                    <option value="4">40</option>
                                    <option value="5">50</option>
                                </select>
                            </div>					
                            <div className="">
                                <label className="text-base font-normal leading-normal text-title_black mb-2 block">Estimated Annual Growth (%)</label>
                                <div className="relative">
                                    <input className="h-10 w-full bg-background border border-border backdrop-blur-[34px] rounded-[100px] cursor-pointer text-base text-title_black flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-secondary" type="number" defaultValue="7" name="estimated-growth" id="estimated-growth" />
                                    <span className="text-base font-semibold text-title_black absolute top-1/2 transform -translate-1/2 right-5">%</span>
                                </div>
                            </div>
                            
                            <div className="select-box-light">
                                <label className="text-base font-normal leading-normal text-title_black mb-2 block">Compound Frequency</label>
                                <select className="select-active">
                                    <option value="1">Monthly</option>
                                    <option value="2">Quarterly</option>
                                    <option value="3">Semi-Annual</option>
                                    <option value="4">Annual</option>
                                    <option value="5">One-Time</option>
                                </select>
                            </div>
                            
                            <button className="button-primary" type="button">Calculate My Potential</button>
                        </form>
                    </div>
                    <div className="md:max-w-171 w-full rounded-2xl md:rounded-3xl border border-border shadow-[0px_0px_19px_0px_#0000004D]" data-sttr-card>
                        <img className="w-full rounded-2xl" src={instantRewardsThumb} alt="rewards-chart" />
                    </div>
                </div>

            </div>
        </section>
    </>
  )
}
