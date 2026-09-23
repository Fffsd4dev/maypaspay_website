import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import titlePrimary from "../../assets/img/title-icon-primary.svg";
import aboutUs3 from "../../assets/img/about-us/about-us-3.webp";
import aboutUs4 from "../../assets/img/about-us/about-us-4.webp";
import aboutUs5 from "../../assets/img/about-us/about-us-5.webp";
import aboutUs6 from "../../assets/img/about-us/about-us-6.webp";
import aboutUs7 from "../../assets/img/about-us/about-us-7.webp";
import aboutUs8 from "../../assets/img/about-us/about-us-8.webp";

gsap.registerPlugin(ScrollTrigger);

export default function Teams() {

    const teams = [
        {
            img : aboutUs3, 
            name : 'Jonathan Sterling', 
            title : 'Chief Executive Officer', 
        },
        {
            img : aboutUs4, 
            name : 'Sarah V. Jenkins', 
            title : 'Head of Private Wealth', 
        },
        {
            img : aboutUs5, 
            name : 'Sarah V. Jenkins', 
            title : 'Head of Private Wealth', 
        }
        // {
        //     img : aboutUs6, 
        //     name : 'Elena Rodriguez', 
        //     title : 'Director of Investment Strategy', 
        // },
        // {
        //     img : aboutUs7, 
        //     name : 'David Chen', 
        //     title : 'VP of Digital Innovation', 
        // },
        // {
        //     img : aboutUs8, 
        //     name : 'Sophia Al-Madi', 
        //     title : 'Head of Global Compliance', 
        // }
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
        <section className="section-spacing-lg bg-secondary">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titlePrimary} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">EXPERT GUIDANCE</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4" data-content>Meet the minds behind your financial success</h2>
                    </div>
                </div>
                <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-sttr-wrapper>
                    
                    {teams.map((item, index)=>(
                        <div data-sttr-card key={index}>
                            <div className="blog-card rounded-2xl overflow-hidden relative group block">
                                <img className="w-full h-full object-cover aspect-410/520 duration-1000 group-hover:transform-[skew(-5deg,5deg)_scale(1.2)]" src={item.img} alt={item.name} />
                                <div className="absolute z-3 bottom-0 left-0 w-full p-5">
                                    <div className="p-6 duration-300 rounded-2xl group-hover:rounded-none bg-white/70 group-hover:bg-transparent backdrop-blur-[34px] group-hover:backdrop-blur-none group-hover:duration-100">
                                        <h3 className="text-xl text-title_black font-semibold leading-none duration-300 group-hover:text-white">{item.name}</h3>
                                        <p className="text-base text-paragraph_black font-normal leading-none mt-2 duration-300 group-hover:text-paragraph_white group-hover:mb-6">{item.title}</p>

                                        <div className="flex gap-5 absolute transition-all duration-500 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                            <Link to="https://www.facebook.com/" className="text-title_white hover:text-primary transition-all duration-500" target="_blank">
                                                <svg className="w-5 h-5 fill-current">
                                                    <use href="#team-card-facebook"></use>
                                                </svg>
                                            </Link>
                                            <Link to="https://www.instagram.com/" className="text-title_white hover:text-primary transition-all duration-500" target="_blank">
                                                <svg className="w-5 h-5 fill-current">
                                                    <use href="#team-card-insta"></use>
                                                </svg>
                                            </Link>
                                            <Link to="https://twitter.com/" className="text-title_white hover:text-primary transition-all duration-500" target="_blank">
                                                <svg className="w-5 h-5 fill-current">
                                                    <use href="#team-card-twitter"></use>
                                                </svg>
                                            </Link>
                                            <Link to="https://www.linkedin.com/" className="text-title_white hover:text-primary transition-all duration-500" target="_blank">
                                                <svg className="w-5 h-5 fill-current">
                                                    <use href="#team-card-linkedin"></use>
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>    
                        </div>
                    ))}

                </div>
            </div>
        </section>
    </>
  )
}
