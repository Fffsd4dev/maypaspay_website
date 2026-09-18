import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../assets/img/title-icon.svg";
import overview3 from "../../assets/img/about-us/overview-3.webp";
import overview4 from "../../assets/img/about-us/overview-4.webp";
import overview5 from "../../assets/img/about-us/overview-5.webp";
import overview6 from "../../assets/img/about-us/overview-6.webp";
import overview7 from "../../assets/img/about-us/overview-7.webp";
import overview8 from "../../assets/img/about-us/overview-8.webp";

gsap.registerPlugin(ScrollTrigger);

export default function AboutOverview() {

    const sectionRef = useRef(null);
    const cardsRef1 = useRef(null);
    const cardsRef2 = useRef(null);

    const overviews = [
        {
            img : overview3, 
            title : 'Best Digital Banking App', 
            award : 'Global Finance Tech Awards', 
            year : '2026', 
        },
        {
            img : overview4, 
            title : 'Excellence in Cybersecurity', 
            award : 'Financial Security Summit', 
            year : '2025', 
        },
        {
            img : overview5, 
            title : 'Top Wealth Management Tool', 
            award : 'Investment Week Awards', 
            year : '2025', 
        },
        {
            img : overview6, 
            title : 'Innovation in Fintech', 
            award : 'Digital Banking Report', 
            year : '2024', 
        },
        {
            img : overview7, 
            title : 'Customer Service Choice', 
            award : 'Consumer Banking Association', 
            year : '2024', 
        },
        {
            img : overview8, 
            title : 'Most Secure Mobile Wallet', 
            award : 'Payment Systems Awards', 
            year : '2022', 
        }
    ];

    const sites = [
        {
            icon : '#lansbook', 
        },
        {
            icon : '#njadclub', 
        },
        {
            icon : '#clutch', 
        },
        {
            icon : '#awwwards', 
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
        <section className="bg-background section-spacing-lg">
            <div className="container max-w-full">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">INDUSTRY EXCELLENCE</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Trusted by experts, awarded for excellence in banking</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Our commitment to security, innovation, and customer satisfaction has earned.</p>
                </div>
                
                <div ref={cardsRef1} className="relative z-100" data-sttr-wrapper>
                    <div className="w-full" data-sttr-card>
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="w-[45%] md:w-[41.66%] pb-4 md:pb-6 pt-2.5 text-title_black text-lg lg:text-xl font-medium leading-none align-bottom pr-3 md:pr-6">Project</th>
                                    <th className="w-[35%] md:w-[41.66%] pb-4 md:pb-6 pt-2.5 text-title_black text-lg lg:text-xl font-medium leading-none align-bottom pr-3 md:pr-6">Award</th>
                                    <th className="w-[20%] md:w-[16.66%] pb-4 md:pb-6 pt-2.5 text-title_black text-lg lg:text-xl font-medium leading-none text-right align-bottom">Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {overviews.map((item, index)=>(
                                    <tr className="group relative border-b border-border hover:bg-transparent transition-colors" key={index}>
                                        <td className="pb-6 md:pb-9 pt-5 md:pt-6 text-title_black text-base leading-snug md:leading-none align-top pr-3 md:pr-6 font-semibold">
                                            {item.title}
                                        </td>
                                        <td className="pb-6 md:pb-9 pt-5 md:pt-6 text-title_black text-base leading-snug md:leading-none align-top pr-3 md:pr-6">
                                            {item.award}
                                        </td>
                                        <td className="pb-6 md:pb-9 pt-5 md:pt-6 text-title_black text-base leading-none text-right align-top relative">
                                            {item.year}
                                            <img className="hidden sm:block absolute right-[33%] md:right-[40%] top-1/2 -translate-y-1/2 w-25 md:w-48 lg:w-56 rounded-lg md:rounded-2xl object-cover opacity-0 scale-95 -rotate-6 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100 aspect-228/285 z-10 pointer-events-none" src={item.img} alt="about overview image" />
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>
                <div ref={cardsRef2} className="pt-8 md:pt-10 grid grid-cols-2 justify-items-center sm:flex sm:justify-between sm:flex-row gap-5 md:gap-8 lg:gap-10" data-sttr-wrapper>
                    
                    {sites.map((item, index)=>(
                        <div data-sttr-card key={index}>
                            <svg className="w-50 md:w-55 lg:w-65 xl:w-68 h-15 lg:h-20 xl:h-22 fill-current max-w-full">
                                <use href={item.icon}></use>
                            </svg>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    </>
  )
}
