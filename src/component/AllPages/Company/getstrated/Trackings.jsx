import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titlePrimary from "../../../../assets/img/title-icon-primary.svg";
import position1 from "../../../../assets/img/get-strated/getstrated-positon-1.webp";
import position2 from "../../../../assets/img/get-strated/getstrated-position-2.webp";

gsap.registerPlugin(ScrollTrigger);

export default function Trackings() {

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
                    <div className="px-5 pt-10 pb-5 sm:p-10 md:p-15 xl:p-25 relative z-50">
                        <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                            <div className="md:max-w-170 w-full">
                                <div className="flex items-center gap-2.5">
                                    <img className="rotate" src={titlePrimary} alt="title-icon" />
                                    <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">REAL-TIME TRACKING</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4" data-content>Our 5 Step Eligibility Flow</h2>
                            </div>
                            <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_white" data-content>At SecureVest, we empower the entrepreneurs of tomorrow with the capital, security, and strategic guidance they need to scale globally.</p>
                        </div>				
                        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mt-10 md:mt-14 lg:mt-20" data-sttr-wrapper>
                            
                            <div className="lg:col-span-2 bg-white/10 py-5 xl:py-8 pl-6 xl:pl-8 pr-3 xl:pr-4 rounded-2xl  border border-white/10 relative backdrop-blur-xl" data-sttr-card>
                                <h3 className="text-title_white text-2xl md:text-3xl lg:text-4xl font-bold">Step</h3>
                                <span className="text-[40px] sm:text-5xl md:text-[52px] lg:text-6xl xl:text-7xl 2xl:text-[80px] font-bold inline-block text-white/10 absolute top-4 right-4">01</span>
                                <div className="mt-9 w-full md:max-w-86.5 pr-4">
                                    <h4 className="text-xl md:text-2xl font-semibold text-title_white pb-5 border-b border-white/10">Choose Your Plan/Product</h4>
                                    <p className="text-paragraph_white mt-5">
                                        Securely connect your bank accounts via Plaid or manually upload your required documents for a seamless start.
                                    </p>
                                </div>
                            </div>
                            <div className="lg:col-span-2 bg-white/10 py-5 xl:py-8 pl-6 xl:pl-8 pr-3 xl:pr-4 rounded-2xl  border border-white/10 relative backdrop-blur-xl" data-sttr-card>
                                <h3 className="text-title_white text-2xl md:text-3xl lg:text-4xl font-bold">Step</h3>
                                <span className="text-[40px] sm:text-5xl md:text-[52px] lg:text-6xl xl:text-7xl 2xl:text-[80px] font-bold inline-block text-white/10 absolute top-4 right-4">02</span>
                                <div className="mt-9 w-full md:max-w-86.5 pr-4">
                                    <h4 className="text-xl md:text-2xl font-semibold text-title_white pb-5 border-b border-white/10">Personal Information</h4>
                                    <p className="text-paragraph_white mt-5">
                                        Once connected, our advanced engine analyzes 200+ unique data points in seconds to determine your profile strength.
                                    </p>
                                </div>
                            </div>
                            <div className=" lg:col-span-2 bg-white/10 py-5 xl:py-8 pl-6 xl:pl-8 pr-3 xl:pr-4 rounded-2xl  border-white/10 relative backdrop-blur-xl" data-sttr-card>
                                <h3 className="text-title_white text-2xl md:text-3xl lg:text-4xl font-bold">Step</h3>
                                <span className="text-[40px] sm:text-5xl md:text-[52px] lg:text-6xl xl:text-7xl 2xl:text-[80px] font-bold inline-block text-white/10 absolute top-4 right-4">03</span>
                                <div className="mt-9 w-full md:max-w-86.5 pr-4">
                                    <h4 className="text-xl md:text-2xl font-semibold text-title_white pb-5 border-b border-white/10">Verification</h4>
                                    <p className="text-paragraph_white mt-5">
                                        Receive your personalized pre-approved limit and competitive interest rate immediately upon assessment completion.
                                    </p>
                                </div>
                            </div>
                            <div className=" lg:col-span-3 bg-white/10 py-8 pl-8 pr-4 rounded-2xl  border border-white/10 relative backdrop-blur-xl" data-sttr-card>
                                <h3 className="text-title_white text-2xl md:text-3xl lg:text-4xl font-bold">Step</h3>
                                <span className="text-[40px] sm:text-5xl md:text-[52px] lg:text-6xl xl:text-7xl 2xl:text-[80px] font-bold inline-block text-white/10 absolute top-4 right-4">04</span>
                                <div className="mt-9 w-full md:max-w-full pr-4">
                                    <h4 className="text-xl md:text-2xl font-semibold text-title_white pb-5 border-b border-white/10">Account Setup</h4>
                                    <p className="text-paragraph_white mt-5">
                                        Once connected, our advanced engine analyzes 200+ unique data points in seconds to determine your profile strength.
                                    </p>
                                </div>
                            </div>
                            <div className=" lg:col-span-3 bg-white/10 py-8 pl-8 pr-4 rounded-2xl  border border-white/10 relative backdrop-blur-xl" data-sttr-card>
                                <h3 className="text-title_white text-2xl md:text-3xl lg:text-4xl font-bold">Step</h3>
                                <span className="text-[40px] sm:text-5xl md:text-[52px] lg:text-6xl xl:text-7xl 2xl:text-[80px] font-bold inline-block text-white/10 absolute top-4 right-4">05</span>
                                <div className="mt-9 w-full md:max-w-full pr-4">
                                    <h4 className="text-xl md:text-2xl font-semibold text-title_white pb-5 border-b border-white/10">Funding/Activation</h4>
                                    <p className="text-paragraph_white mt-5">
                                        Receive your personalized pre-approved limit and competitive interest rate immediately upon assessment completion.
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 pointer-events-none z-10">
                        <img src={position1} alt="SecureVest illustration" />
                    </div>
                    <div className="absolute top-0 right-0 pointer-events-none z-10">
                        <img src={position2} alt="SecureVest illustration" />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
