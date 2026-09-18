import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import Article from "./Article";

import blogPost1 from "../../../../assets/img/blog-post/blog-3/blog-post-1.webp";
import blogPost2 from "../../../../assets/img/blog-post/blog-3/blog-post-2.webp";

gsap.registerPlugin(ScrollTrigger);

export default function BlogHero({ blog }) {

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
        <div ref={cardsRef} data-sttr-wrapper>
            <section className="pt-14 md:pt-20 lg:pt-24 xl:pt-25">
                <div className="container">
                    <div className="flex flex-wrap lg:flex-nowrap justify-between gap-5 md:gap-8 lg:gap-10 xl:gap-20">
                        <div className="lg:max-w-100 xl:max-w-125 flex flex-col justify-between gap-5">
                            <div>
                                <span className="text-base md:text-lg leading-normal font-semibold text-secondary block" data-sttr-card>Technology Implementation</span>
                                <div className="pt-4">
                                    <h3 className="leading-none! font-bold text-title_black" data-sttr-card>
                                        {blog ? blog.title : "New Standard for Global Banking"}
                                    </h3>
                                    <p className="text-base pt-5 text-paragraph_black" data-sttr-card>Artificial Intelligence is no longer just a concept â€” it's a revolution changing how we work, create, and connect. From automation to decision-making, AI is shaping a smarter, faster, and more efficient.</p>
                                </div>
                            </div>
                            <div data-sttr-card>
                                <Link to="/blog-author">
                                    <div className="gap-4 items-center bg-background p-2.5 inline-flex rounded-2xl border border-border sm:min-w-55">
                                        <div className="w-15.5 h-15.5">
                                            <img className="aspect-60/60 object-cover rounded-full" src={blogPost1} alt="Noah Reed" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-title_black">Noah Reed</span>
                                            <p className="text-paragraph_black text-sm">Tech Officer</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="w-full lg:max-w-175" data-sttr-card>
                            <img className="aspect-700/400 w-full rounded-xl sm:rounded-2xl md:rounded-3xl object-cover" src={blog ? blog.img : blogPost2} alt="Blog Post Hero" />
                        </div>
                    </div>
                </div>
            </section>

            <Article />
        </div>
        <span className="hidden" data-section-title></span>
    </>
  )
}
