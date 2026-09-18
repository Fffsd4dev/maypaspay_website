import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import titleIcon from "../../../../assets/img/title-icon.svg";

gsap.registerPlugin(ScrollTrigger);

export default function HelpCenter() {

    const centers = [
        {
            title : 'Cookie Policy', 
            desc : 'GlobalBank integrated SecureVestâ€™s cold-storage vault infrastructure to offer their HNW clients secure access to regulated digital asset portfolios.', 
        },
        {
            title : 'Privacy Policy', 
            desc : 'Your privacy is important to us. We collect and protect personal information responsibly, ensuring that all user data is securely stored and only used to improve our services and provide a better digital experience.', 
        },
        {
            title : 'Terms and Conditions', 
            desc : 'These terms outline the rules and guidelines for using our services and platform. By accessing our website, users agree to comply with all policies designed to maintain a secure and reliable environment.', 
        },
        {
            title : 'User Rights (GDPR)', 
            desc : 'We respect user rights regarding personal data and privacy. Users have the right to access, modify, or request deletion of their information in accordance with international data protection regulations.', 
        },
        {
            title : 'AML/KYC Policy', 
            desc : 'Our Anti-Money Laundering and Know Your Customer policies help ensure a secure financial environment. We verify identities and monitor transactions to prevent fraud, illegal activities, and financial misuse.', 
        },
        {
            title : 'Disclaimer', 
            desc : 'All information provided on this platform is for general informational purposes only. While we strive for accuracy, we do not guarantee completeness and are not responsible for decisions made based on this information.', 
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
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">HELP CENTER</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Our Core Banking Legal Resources That You Can See</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Our expert provides core banking legal resources for guidance and strategies that support informed decision-making and growth.</p>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 " data-sttr-wrapper>
                    
                    {centers.map((item, index)=>(
                        <div data-sttr-card key={index}>
                            <Link to="/disclaimer" className="bg-background group rounded-2xl border border-border p-6 lg:p-8 cursor-pointer hover:bg-primary overflow-hidden transition hover:border-primary duration-300 ease-in-out h-full flex flex-col justify-between items-start">
                                <div className="">
                                    <h3 className="text-title_black leading-none text-xl md:text-2xl font-semibold">{item.title}</h3>
                                    <p className="text-paragraph_black text-base leading-normal font-normal mt-3">{item.desc}</p>
                                </div>
                                <div className=" mt-6 relative  inline-block text-title_black">
                                    <span className="text-title_black leading-none text-base font-semibold opacity-0 -translate-x-14 group-hover:translate-x-0 group-hover:opacity-100 duration-300 ease-in-out block pr-2">Learn More</span>
                                    <svg className="absolute top-1/2 -translate-y-1/2 left-0 group-hover:left-full duration-300 ease-in-out w-3.25 h-2.5 fill-current">
                                        <use href="#securityArrow"></use>
                                    </svg>
                                </div>
                            </Link>
                        </div>
                    ))}

                </div>	
            </div>
        </section>
    </>
  )
}
