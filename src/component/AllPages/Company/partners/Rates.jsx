import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titlePrimary from "../../../../assets/img/title-icon-primary.svg";
import icon01 from "../../../../assets/img/home-v1/about/icon-01.svg";
import icon02 from "../../../../assets/img/home-v1/about/icon-02.svg";
import icon03 from "../../../../assets/img/home-v1/about/icon-03.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Rates() {

    const rates = [
        {
            img : icon01, 
            title : 'Integrity Trust', 
            desc : 'Security is our core foundation. We utilize multi-layer encryption, cold-storage custody, and biometrics to ensure your assets remain protected under the highest global regulatory standards.', 
        },
        {
            img : icon02, 
            title : 'Innovation Vision', 
            desc : 'We don"t just process transactions; we build ecosystems. From AI-driven automated savings tools to instant cross-border settlement rails for our users for worldwide.', 
        },
        {
            img : icon03, 
            title : 'Collaboration Teamwork', 
            desc : 'Success is a shared journey. Our platform is designed to scale with you, providing the collaborative tools and 24/7 human support, so you will be satisfied.', 
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
        <section className="bg-secondary py-14 md:py-20 lg:py-24">
            <div className="container">
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
                <div ref={cardsRef} className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12" data-sttr-wrapper>
                    
                    {rates.map((item, index)=>(
                        <div className="" data-sttr-card key={index}>
                            <img className="w-12.5 h-12.5" src={item.img} alt={item.title} />
                            <h3 className="text-xl md:text-2xl mt-6 sm:mt-9 text-white font-semibold leading-tight!">{item.title}</h3>
                            <p className="mt-3 text-paragraph_white">{item.desc}</p>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    </>
  )
}
