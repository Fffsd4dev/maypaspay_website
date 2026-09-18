import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import { caseData } from "../../../../data/caseData";

import titleIcon from "../../../../assets/img/title-icon.svg";
import blogPost6 from "../../../../assets/img/blog-post/blog-3/blog-post-6.webp";

gsap.registerPlugin(ScrollTrigger);

export default function CaseStudys() {

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
        <section className="section-spacing-lg relative">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">CASE STUDIES</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Banking-Related Case Study That You Can See</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Explore how we help the worldâ€™s most ambitious startups build credible brands, optimize operations, and acquire their first 10k users.</p>
                </div>		
                <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-sttr-wrapper>
                    
                    {caseData.slice(0, 3).map((item, index)=>(
                        <div data-sttr-card key={index}>
                            <div>
                                <Link to={`/case-study-post/${item.id}/${item.title.replace(/\s+/g, '-').toLowerCase()}`}>
                                    <img src={item.img} alt={item.title} className="rounded-2xl object-cover w-full" />
                                </Link>
                            </div>
                            <div>
                                <ul className="pt-7 flex gap-3 flex-wrap">
                                    <li>
                                        <span className="text-paragraph_black bg-background border border-border py-2 px-3 inline-block rounded-full text-sm leading-none duration-300 hover:bg-secondary hover:text-white">{item.tag}</span>
                                    </li>
                                    <li>
                                        <span className="text-paragraph_black bg-background border border-border py-2 px-3 inline-block rounded-full text-sm leading-none duration-300 hover:bg-secondary hover:text-white">{item.tag2}</span>
                                    </li>
                                    <li>
                                        <span className="text-paragraph_black bg-background border border-border py-2 px-3 inline-block rounded-full text-sm leading-none duration-300 hover:bg-secondary hover:text-white">{item.tag3}</span>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-xl md:text-2xl font-semibold">
                                    <Link to={`/case-study-post/${item.id}/${item.title.replace(/\s+/g, '-').toLowerCase()}`} className="pt-4 inline-block text-title_black!">
                                        {item.title}
                                    </Link>
                                </h3>
                                <p className="pt-3 text-paragraph_black line-clamp-2 leading-normal max-w-98.5">{item.desc}</p>
                            </div>

                        </div>
                    ))}

                </div>
                <div className="absolute bottom-0 -z-10 left-0">
                    <img src={blogPost6} alt="post-thumb" />
                </div>
            </div>
        </section>
    </>
  )
}
