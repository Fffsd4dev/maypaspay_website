import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import titleIcon from "../../../../assets/img/title-icon.svg";

import { blogData } from "../../../../data/data";

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedBlog() {

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
        <section className="section-spacing-lg bg-background">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">FEATURED FINANCIAL INSIGHTS</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Strategies for the Modern Digital Economy</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Stay ahead of the curve with expert analysis on market trends, fintech innovations, and the future of global finance from our senior research team.</p>
                </div>		
                <div ref={cardsRef} className="grid md:grid-cols-2 gap-6" data-sttr-wrapper>
                    
                    {blogData.slice(6, 8).map((item, index)=>(
                        <div data-sttr-card key={index}>
                            <div className="group blog-hover-card">
                                <Link to={`/blog-post-1/${item.id}/${item.title.replace(/\s+/g, '-').toLowerCase()}`} className="blog-card-thumb block rounded-2xl relative overflow-hidden">
                                    <img className="w-full rounded-2xl object-center object-cover aspect-628/380" src={item.img} alt="Blog Economy" />
                                </Link>
                                <div className="flex gap-3 items-center pt-5 md:pt-8.75">
                                    <Link to="/blog-author" className="flex items-center gap-3 text-title_black text-base md:text-lg font-normal duration-300 hover:text-secondary">
                                        <div className="w-8 h-8 rounded-full overflow-hidden">
                                            <img className="rounded-full object-cover aspect-8/8" src={item.img2} alt="Blog Economy" />
                                        </div>
                                        <span className="flex-1">
                                            {item.name}
                                        </span>
                                    </Link>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary w-1.5 h-1.5 rounded-full"></div>
                                        <div>
                                            <span className="text-title_black text-base md:text-lg font-normal">
                                                {item.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="pt-4 block text-2xl md:text-3xl lg:text-4xl font-bold leading-snug! text-title_black">
                                    <Link to={`/blog-post-1/${item.id}/${item.title.replace(/\s+/g, '-').toLowerCase()}`} className="text-underline-2 text-inherit">{item.title}</Link>
                                </h3>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    </>
  )
}
