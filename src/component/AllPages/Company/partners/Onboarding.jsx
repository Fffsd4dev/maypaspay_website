import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../../../assets/img/title-icon.svg";
import Partners1 from "../../../../assets/img/partners/Partners-1.webp";

gsap.registerPlugin(ScrollTrigger);

export default function Onboarding() {

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
        <section className="py-14 md:py-20 lg:py-24">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">SEAMLESS ONBOARDING</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Your Journey to Modern Banking in Minutes</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Transitioning your financial life should never be a burden. We have engineered a three-step integration process that securely migrates your data and assets</p>
                </div>		
                <div ref={cardsRef} className="flex flex-wrap lg:flex-nowrap items-center gap-5 xl:gap-10" data-sttr-wrapper>
                    
                    <div className="w-full lg:w-1/2" data-sttr-card>
                        <img className="aspect-660/550 w-full rounded-2xl md:rounded-3xl object-cover" src={Partners1} alt="Digital Identity" />
                    </div>

                    <div className="w-full lg:w-1/2 flex flex-col">
                        <div className="step-item flex gap-5" data-sttr-card>
                            <div className="flex flex-col items-center pb-3 md:pb-5">
                                <span className="w-12 h-12 shrink-0 bg-primary text-title_black font-bold flex items-center justify-center rounded-full text-base leading-[1]">01</span>
                                <div className="vertical-line h-12 md:h-16 border-l-2 border-dotted border-[#B2B2B2] my-2"></div>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-semibold text-title_black leading-[1] py-3">Digital Identity Verification</h3>
                                <p className="text-base leading-[1.4] paragraph_black font-normal">
                                    Complete your KYC in under 2 minutes using our secure biometric interface. No physical branch visits required.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6" data-sttr-card>
                            <div className="flex flex-col items-center pb-3 md:pb-5">
                                <span className="w-12 h-12 shrink-0 bg-primary text-title_black font-bold flex items-center justify-center rounded-full text-base leading-none">02</span>

                                <div className="vertical-line h-12 md:h-16 border-l-2 border-dotted border-[#B2B2B2] my-2"></div>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-semibold text-title_black leading-none py-3">Smart Account Migration</h3>
                                <p className="text-base leading-[1.4] paragraph_black font-normal">
                                    Use our automated switching service to securely link your existing accounts and migrate direct debits with a single click.
                                </p>
                            </div>
                        </div>
                        <div className="step-item flex gap-5" data-sttr-card>
                            <div className="flex flex-col items-center">
                                <span className="w-12 h-12 shrink-0 bg-primary text-title_black font-bold flex items-center justify-center rounded-full text-base leading-none">03</span>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-semibold text-title_black leading-none py-3">Instant Asset Activation</h3>
                                <p className="text-base leading-[1.4] paragraph_black font-normal">
                                    Your virtual cards are issued immediately. Start spending, investing, and managing your global wealth from day one.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    </>
  )
}
