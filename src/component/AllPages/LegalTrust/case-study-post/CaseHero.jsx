import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import blogPost3 from "../../../../assets/img/blog-post/blog-3/blog-post-3.webp";
import case1 from "../../../../assets/img/case-study-post/case-1.webp";

gsap.registerPlugin(ScrollTrigger);

export default function CaseHero({ cases }) {

    const cardsRef = useRef(null);

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
        <section className="section-spacing-lg bg-secondary relative z-1">
            <img className="absolute w-full h-full top-0 left-0 -z-1 object-cover" src={blogPost3} alt="blog post hero banner" />
            <div ref={cardsRef} className="container" data-sttr-wrapper>
                <div className="grid lg:grid-cols-2 gap-5 md:gap-8">
                    <div>
                        <div className="flex flex-col justify-between gap-5 md:gap-8 xl:gap-10 ">
                            <div>
                                <span className="text-base md:text-lg leading-normal font-semibold text-primary" data-sttr-card>Technology Implementation</span>
                                <h3 className="font-bold text-white pt-4 leading-[1.2]" data-sttr-card>
                                    {cases ? cases.title : "High-Volume Fintech Infrastructure"}
                                </h3>
                            </div>
                            <div className="flex gap-13" data-sttr-card>
                                <div>
                                    <span className="text-[17px] md:text-lg text-white font-semibold">Year</span>
                                    <p className="text-base text-paragraph_white">2026</p>
                                </div>
                                <div>
                                    <span className="text-[17px] md:text-lg text-white font-semibold">Genre</span>
                                    <p className="text-base text-paragraph_white">Institutional Treasury</p>
                                </div>
                            </div>
                            <div data-sttr-card>
                                <span className="text-[17px] md:text-lg text-white font-semibold">Tools</span>
                                <div className="mt-3 flex flex-wrap gap-3">
                                    <span className="text-paragraph_white bg-white/10 border border-white/10 py-2 px-4 inline-block rounded-full hover:bg-primary hover:text-title_black duration-300 leading-none text-sm">SECURITY</span>
                                    <span className="text-paragraph_white bg-white/10 border border-white/10 py-2 px-4 inline-block rounded-full hover:bg-primary hover:text-title_black duration-300 leading-none text-sm">FINTECH</span>
                                    <span className="text-paragraph_white bg-white/10 border border-white/10 py-2 px-4 inline-block rounded-full hover:bg-primary hover:text-title_black duration-300 leading-none text-sm">INFRA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:aspect-500/300 lg:aspect-600/400 overflow-hidden lg:pr-10 xl:pr-16" data-sttr-card>
                        <img src={cases ? cases.img : case1} alt="Blog Post Hero" className="h-full object-cover rounded-3xl w-full" />
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
