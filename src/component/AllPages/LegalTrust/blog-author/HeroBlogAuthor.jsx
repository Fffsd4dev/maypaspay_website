import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import bannerBg from "../../../../assets/img/banner/banner-bg.webp";
import bannerStar01 from "../../../../assets/img/banner/banner-star-shape-01.svg";
import bannerStar02 from "../../../../assets/img/banner/banner-star-shape-02.svg";
import blogPost1 from "../../../../assets/img/blog-post/blog-3/blog-post-1.webp";

import BlogCard from "../blog-genre/BlogCard";

gsap.registerPlugin(ScrollTrigger);

export default function HeroBlogAuthor() {

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
            <section className="section-spacing-lg bg-secondary relative z-1">
                <img className="absolute w-full h-full top-0 left-0 -z-1" src={bannerBg} alt="banner-bg" />
                <img className="absolute top-[70%] sm:top-1/2 transform sm:-translate-y-1/2 left-[5%] sm:left-[12%] -z-1" src={bannerStar01} alt="banner-shape" />
                <img className="absolute top-[12%] right-[5%] sm:right-[12%] -z-1" src={bannerStar02} alt="banner-shape" />
                <h1 className="hidden">For Seo</h1>
                <div className="container">
                    <div className="max-w-176.5 mx-auto text-center">
                        <div className="gap-4 sm:gap-6 items-center flex rounded-2xl justify-center flex-wrap">
                            <div data-sttr-card>
                                <img className="w-15 sm:w-20 aspect-80/80 object-cover rounded-full" src={blogPost1} alt="Noah Reed" />
                            </div>
                            <div data-sttr-card>
                                <h2 className="text-white leading-none">Noah Reed</h2>
                            </div>
                        </div>
                        <p className="text-paragraph_white pt-5.5 leading-normal" data-sttr-card>Meet the author behind the insightsâ€”an experienced professional sharing practical knowledge, real-world lessons, and a passion for quality work</p>

                        <div className="flex flex-row items-center gap-3 justify-center px-3 pt-3.5" data-sttr-card>
                            <Link to="https://twitter.com" className="flex items-center justify-center w-10.5 h-10.5 bg-white/10 border-[0.84px] border-white/10 backdrop-blur-[17px] rounded-[13.44px] transition text-white duration-300 hover:bg-primary hover:text-title_black" target="_blank">
                                <svg className="w-4.5 h-4 fill-current">
                                    <use href="#twitter"></use>
                                </svg>
                            </Link>

                            <Link to="https://facebook.com" className="flex items-center justify-center w-10.5 h-10.5 bg-white/10 border-[0.84px] border-white/10 backdrop-blur-[17px] rounded-[13.44px] transition text-white duration-300 hover:bg-primary hover:text-title_black" target="_blank">
                                <svg className="w-4.5 h-4 fill-current">
                                    <use href="#facebook"></use>
                                </svg>
                            </Link>

                            <Link to="https://linkedin.com" className="flex items-center justify-center w-10.5 h-10.5 bg-white/10 border-[0.84px] border-white/10 backdrop-blur-[17px] rounded-[13.44px] transition text-white duration-300 hover:bg-primary hover:text-title_black" target="_blank">
                                <svg className="w-4.5 h-4 fill-current">
                                    <use href="#linkedin"></use>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Blog Area Start --> */}
            <section className="py-14 md:py-20 lg:py-24">
                <div className="container">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        
                        <BlogCard />

                    </div>
                </div>
            </section>
        </div>
    </>
  )
}
