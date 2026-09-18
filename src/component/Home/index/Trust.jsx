import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import backgroundThumb from "../../../assets/img/home-v1/trust/background-thumb.webp";
import shape from "../../../assets/img/home-v1/trust/shape.webp";
import titlePrimary from "../../../assets/img/title-icon-primary.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Trust() {

    const sectionRef = useRef(null);
    const cardsRef = useRef(null);

    const trusts = [
        {
            target : '97', 
            title : 'System Availability', 
            desc : 'Maintaining a 97% uptime record to ensure your banking services are always online.', 
        },
        {
            target : '98', 
            title : 'Customer Retention', 
            desc : 'Our intuitive design and seamless payment logic result in industry-leading retention.', 
        },
        {
            target : '99', 
            title : 'Automated AML/KYC', 
            desc : 'Streamlined verification processes that reduce onboarding friction by 99%.', 
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

    // Trust Progress Animation
    useEffect(() => {

        if (!cardsRef.current) return;

        const pies = cardsRef.current.querySelectorAll(".pie");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: cardsRef.current,
                start: "top 75%",
                once: true,
            },
        });

        pies.forEach((pie, index) => {

            const progress = pie.querySelector(".progress");
            const target = Number(pie.dataset.target) || 0;

            const obj = { value: 0 };

            tl.to(obj, {
                value: target,
                duration: 2,
                ease: "power4.out",

                onUpdate: () => {

                    const value = Math.round(obj.value);

                    pie.style.setProperty("--percent", value);
                    pie.dataset.percent = value;

                    if (progress) {
                        progress.textContent = `${value}%`;
                    }

                }

            }, index * 0.2);

        });

        return () => {

            tl.scrollTrigger?.kill();
            tl.kill();

        };

    }, []);

  return (
    <>
        <section className="section-spacing-lg relative z-1 before:absolute before:w-full before:h-full before:top-0 before:left-0 before:bg-secondary/60 before:-z-1">
            <img className="absolute w-full h-full top-0 left-0 -z-2 object-cover object-center" src={backgroundThumb} alt="trust" />
            <img className="absolute bottom-0 left-0 -z-2" src={shape} alt="trust-shape" />
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titlePrimary} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">TRUST INDICATORS</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4" data-content>Driving the Future of Digital Finance</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_white" data-content>Our platform is built on transparency, high-velocity performance, and institutional-grade security.</p>
                </div>
                <div ref={cardsRef} className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-9" id="trust-indicators" data-sttr-wrapper>

                    {trusts.map((item, index)=>(
                        <div className="flex items-center gap-3 sm:gap-4 md:gap-6" data-sttr-card key={index}>
                            <div className="flex justify-center w-20 md:w-30">
                                <div className="pie w-20 md:w-30 h-20 md:h-30 rounded-full flex items-center justify-center" data-target={item.target} data-percent="0" style={{ "--percent": 0 }}>
                                    <h3 className="progress text-lg md:text-xl w-17.5 md:w-25 h-17.5 md:h-25 bg-white rounded-full text-secondary font-semibold leading-none flex items-center justify-center border-7 md:border-10 border-secondary">0%</h3>
                                </div>
                            </div>
                            <div className="flex-1 flex flex-col gap-2.5">
                                <h4 className="text-white text-lg md:text-xl font-semibold leading-none">{item.title}</h4>
                                <p className="text-paragraph_white">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
        </section>
    </>
  )
}
