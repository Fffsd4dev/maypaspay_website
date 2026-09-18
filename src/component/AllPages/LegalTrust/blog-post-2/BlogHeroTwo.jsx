import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import blogPost7 from "../../../../assets/img/blog-post/blog-3/blog-post-7.webp";
import blogPost4 from "../../../../assets/img/blog-post/blog-3/blog-post-4.webp";

gsap.registerPlugin(ScrollTrigger);

export default function BlogHeroTwo() {

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
        <section ref={cardsRef} className="pt-14 md:pt-20 lg:pt-24 xl:pt-25" data-sttr-wrapper>
            <div className="container">
                <div className="text-center">
                    <p className="text-secondary font-semibold leading-[1.4] text-base md:text-lg pb-4" data-sttr-card>
                        Technology Implementation
                    </p>
                    <h3 data-sttr-card>ROI of Digital Assets: Performance Metrics for Institutional Investors</h3>
                    <ul className="flex items-center flex-wrap gap-4 justify-center text-center pt-5" data-sttr-card>
                        <li>
                            <Link to="/blog-author" className="flex items-center gap-2.5 text-paragraph_black hover:text-secondary duration-300">
                                <div className="w-7 h-7">
                                    <img className="w-full h-full rounded-full object-cover" src={blogPost7} alt="Blog Post 2" />
                                </div>
                                <span className="flex-1">Dr. Anya Sharma</span>
                            </Link>
                        </li>
                        <li>
                            <svg className="hidden sm:flex" width=" 6" height=" 6" viewBox=" 0 0 6 6" fill=" none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="3" cy="3" r="3" fill="#1B9C85"/>
                            </svg>
                        </li>
                        <li>Updated on:October 26, 2026</li>
                    </ul>
                </div>

                <div className="pt-10 md:pt-15" data-sttr-card>
                    <img className="rounded-xl md:rounded-2xl lg:rounded-3xl aspect-10/5 md:aspect-13/6 object-cover w-full" src={blogPost4} alt="blog-details" />
                </div>
            </div>
        </section>
        <span className="hidden" data-section-title></span>
    </>
  )
}
