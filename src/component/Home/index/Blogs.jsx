import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import calculatorBgShape from "../../../assets/img/home-v1/calculator-bg-shape.webp";
import titleIcon from "../../../assets/img/title-icon.svg";
import arrow from "../../../assets/img/menu/arrow.svg";

import { blogData } from "../../../data/data";

gsap.registerPlugin(ScrollTrigger);

export default function Blogs() {

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
        <section className="section-spacing-lg relative z-1"> 
            <img className="absolute w-full top-0 left-0 -z-1 pointer-events-none" src={calculatorBgShape} alt="calculator-bg-shape" />
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">BLOG POST</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Navigating the Future of Digital Finance</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Stay ahead of the curve with expert analysis on market trends, emerging financial technologies, and strategic updates from the frontier of the economy.</p>
                </div>		
                <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-sttr-wrapper>
                    
                    {blogData.slice(0, 3).map((item, index)=>(
                        <div data-sttr-card key={index}>
                            <div className="blog-card rounded-2xl overflow-hidden relative group block">
                                <Link to={`/blog-post-1/${item.id}/${item.title.replace(/\s+/g, '-').toLowerCase()}`}>
                                    <img className="w-full h-full object-center aspect-410/520 duration-1000 group-hover:transform-[skew(-5deg,5deg)_scale(1.2)]" src={item.img} alt={item.title} />
                                </Link>
                                <div className="absolute z-3 bottom-0 left-0 w-full p-4">
                                    <div className="px-4 py-5 duration-300 group-hover:pb-0! rounded-2xl group-hover:rounded-none bg-white/70 group-hover:bg-transparent backdrop-blur-[34px] group-hover:backdrop-blur-none">
                                        <Link to="/blog-genre" className="text-sm leading-none font-semibold text-secondary duration-300 group-hover:text-primary hover:text-white">{item.tag}</Link>
                                        <h3 className="mt-3 text-title_black text-xl md:text-2xl font-semibold duration-300 group-hover:text-white">
                                            <Link className="text-inherit white-underline-single" to={`/blog-post-1/${item.id}/${item.title.replace(/\s+/g, '-').toLowerCase()}`}>
                                                {item.title}
                                            </Link>
                                        </h3>
                                    </div>
                                </div>
                                <Link to={`/blog-post-1/${item.id}/${item.title.replace(/\s+/g, '-').toLowerCase()}`} className="arrow-icon w-15 h-15 rounded-full flex items-center justify-center bg-primary absolute top-[35%] left-1/2 transform -translate-x-1/2 z-3 duration-500 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
                                    <img src={arrow} alt="arrow" />
                                </Link>
                            </div>
                        </div>
                    ))}
                
                </div>
            </div>
        </section>
    </>
  )
}
