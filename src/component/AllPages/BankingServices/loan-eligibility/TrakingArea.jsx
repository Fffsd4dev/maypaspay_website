import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titlePrimary from "../../../../assets/img/title-icon-primary.svg";
import getstratedPositon1 from "../../../../assets/img/get-strated/getstrated-positon-1.webp";
import getstratedPositon2 from "../../../../assets/img/get-strated/getstrated-position-2.webp";

gsap.registerPlugin(ScrollTrigger);

export default function TrakingArea() {

    const trakings = [
        {
            name : 'Step', 
            number : '01', 
            title : 'Secure Data Sync', 
            desc : 'Securely connect your bank accounts via Plaid or manually upload your required documents for a seamless start.', 
        },
        {
            name : 'Step', 
            number : '02', 
            title : 'Real-Time AI Assessment', 
            desc : 'Once connected, our advanced engine analyzes 200+ unique data points in seconds to determine your profile strength.', 
        },
        {
            name : 'Step', 
            number : '03', 
            title : 'Instant Final Offer', 
            desc : 'Receive your personalized pre-approved limit and competitive interest rate immediately upon assessment.', 
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
                <div className="bg-secondary rounded-3xl overflow-hidden px-5 pt-10 pb-5 sm:p-10 md:p-15 xl:p-25 relative z-1">
                    <div className="absolute bottom-0 left-0 pointer-events-none -z-1">
                        <img src={getstratedPositon1} alt="SecureVest illustration" />
                    </div>
                    <div className="absolute top-0 right-0 pointer-events-none -z-1">
                        <img src={getstratedPositon2} alt="SecureVest illustration" />
                    </div>

                    <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                        <div className="md:max-w-170 w-full">
                            <div className="flex items-center gap-2.5">
                                <img className="rotate" src={titlePrimary} alt="title-icon" />
                                <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">REAL-TIME TRACKING</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4" data-content>Our 3-Step Eligibility Flow</h2>
                        </div>
                        <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_white" data-content>At SecureVest, we empower the entrepreneurs of tomorrow with the capital, security, and strategic guidance they need to scale globally.</p>
                    </div>
                    <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-sttr-wrapper>
                        
                        {trakings.map((item, index)=>(
                            <div className="bg-white/10 p-6 xl:p-8 rounded-2xl border border-white/10 backdrop-blur-[34px]" data-sttr-card key={index}>
                                <div className="flex items-center justify-between mb-9">
                                    <div className="">
                                        <h3 className="text-4xl text-white font-bold leading-[1.3]">{item.name}</h3>
                                    </div>
                                    <div className="">
                                        <span className="inline-block text-[60px] xl:text-[80px] text-white/10 font-bold leading-[1.1]">{item.number}</span>
                                    </div>
                                </div>

                                <div className="">
                                    <h4 className="text-xl xl:text-2xl text-white font-semibold leading-[1.4] mb-5">{item.title}</h4>
                                </div>

                                <div className="border-t border-white/10 pt-5">
                                    <p className="text-sm lg:text-base text-[#CCCCCC] font-regular leading-[1.5]">{item.desc}</p>
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
