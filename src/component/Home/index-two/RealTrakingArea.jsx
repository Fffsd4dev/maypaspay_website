import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Annual from "./Annual";

import trackingBackgroundShape from "../../../assets/img/home-v2/time-tracking-background-shape.webp";
import titleIcon from "../../../assets/img/title-icon.svg";
import roiCalculatorBg from "../../../assets/img/home-v1/roi-calculator-bg-shape.webp";
import titlePrimary from "../../../assets/img/title-icon-primary.svg";

gsap.registerPlugin(ScrollTrigger);

export default function RealTrakingArea() {

    const sectionRef1 = useRef(null);
    const sectionRef2 = useRef(null);
    const cardsRef1 = useRef(null);
    const cardsRef2 = useRef(null);

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
            desc : 'Receive your personalized pre-approved limit and competitive interest rate immediately upon assessment completion.',
        }
    ];

    // Title animation
    const animateTitle = (ref) => {

        if (!ref.current) return;

        const ctx = gsap.context(() => {

            const icon = ref.current.querySelector(".rotate");
            const subtitle = ref.current.querySelector("span");
            const heading = ref.current.querySelector("h2");
            const paragraph = ref.current.querySelector("p");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 75%",
                    once: true,
                },
            });

            if (icon) {
                tl.from(icon, {
                    scale: 0,
                    rotation: -180,
                    opacity: 0,
                    duration: .8,
                });
            }

            if (subtitle) {
                tl.from(subtitle,{
                    y:20,
                    opacity:0
                },"-=0.4");
            }

            if (heading) {
                tl.from(heading,{
                    y:30,
                    opacity:0
                },"-=0.3");
            }

            if (paragraph) {
                tl.from(paragraph,{
                    y:30,
                    opacity:0
                },"-=0.3");
            }

        }, ref);

        return ctx;

    };

    useEffect(() => {

        const ctx1 = animateTitle(sectionRef1);
        const ctx2 = animateTitle(sectionRef2);

        return () => {
            ctx1?.revert();
            ctx2?.revert();
        };

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

  return (
    <>
        <section className="section-spacing-lg-md relative z-1 overflow-hidden">
            <img src={trackingBackgroundShape} alt="time-tracking-background-shape" className="absolute top-0 left-0 -z-1 w-full h-full object-cover" />
            <div className="container">
                <div ref={sectionRef1} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">REAL-TIME TRACKING</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Our 3-Step Eligibility Flow</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>At SecureVest, we empower the entrepreneurs of tomorrow with the capital, security, and strategic guidance.</p>
                </div>		
                <div ref={cardsRef1} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-sttr-wrapper>
                    
                    {trakings.map((item, index)=>(
                        <div data-sttr-card key={index}>
                            <div className="bg-background p-5 sm:p-6 lg:p-8 rounded-2xl border border-border relative backdrop-blur-[34px]">
                                <h3 className="text-title_black text-2xl md:text-3xl lg:text-4xl font-bold">{item.name}</h3>
                                <span className="text-[#E5E5E5] absolute top-3 sm:top-4 right-4 text-[40px] sm:text-5xl md:text-[52px] lg:text-6xl xl:text-7xl 2xl:text-[80px] leading-none! font-bold">{item.number}</span>
                                <div className="mt-6 md:mt-9 w-full md:max-w-86.5">
                                    <h4 className="text-title_black pb-4 sm:pb-5 border-b border-border text-xl md:text-2xl font-semibold">{item.title}</h4>
                                    <p className="text-paragraph_black mt-4 sm:mt-5">{item.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
            <div className="container-lg pt-14 md:pt-20 lg:pt-24 xl:pt-25" data-grid-reveal data-cols="10" data-rows="6" data-cols-sm="5" data-rows-sm="12" data-cols-lg="8" data-rows-lg="8" data-animation="horizontal" data-bg-color="white" data-trigger="top 70%" data-stagger="0.007" data-duration="0.8" data-play-once="true">
                <div ref={cardsRef2} className="pt-10 pb-4 px-4 sm:p-10 xl:p-18 2xl:p-25 bg-secondary rounded-2xl md:rounded-3xl relative z-1 overflow-hidden" data-sttr-wrapper>
                    <img className="w-full absolute bottom-0 left-0 -z-1 select-none" src={roiCalculatorBg} alt="background-shape" data-sttr-card />
                    <div data-sttr-card>
                        <div ref={sectionRef2} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                            <div className="md:max-w-170 w-full">
                                <div className="flex items-center gap-2.5">
                                    <img className="rotate" src={titlePrimary} alt="title-icon" />
                                    <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">THE SECUREVEST EDGE</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4" data-content>The Blueprint for Better Saving</h2>
                            </div>
                            <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_white" data-content>Weâ€™ve simplified personal finance to give you a wealth-building experience that is faster, smarter, and completely transparent.</p>
                        </div>			
                    </div>
                    
                    <Annual />

                </div>
            </div>
        </section>
    </>
  )
}
