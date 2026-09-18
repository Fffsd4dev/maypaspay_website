import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import bannerBg from "../../../../assets/img/banner/banner-bg.webp";
import bannerStar01 from "../../../../assets/img/banner/banner-star-shape-01.svg";
import bannerStar02 from "../../../../assets/img/banner/banner-star-shape-02.svg";

import BlogCard from "./BlogCard";

export default function HeroBlogGenre() {

    const heroRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {

        if (!heroRef.current) return;

        const ctx = gsap.context(() => {

            const items = heroRef.current.querySelectorAll(
                "[data-subtitle], [data-title], [data-excerpt], .btn-sttr, .btn, [data-button], .thumbnail-img, .thumb-image, [data-thumb]"
            );

            if (!items.length) return;

            gsap.set(items, {
                y: 60,
                opacity: 0,
                filter: "blur(6px)",
            });

            const tl = gsap.timeline({
                defaults: {
                    ease: "power2.out",
                },
            });

            items.forEach((item, index) => {

                tl.to(item, {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.6,
                }, index === 0 ? 0 : "-=0.4");

            });

        }, heroRef);

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
        <section ref={heroRef} className="section-spacing-lg bg-secondary relative z-1" data-hero-banner>
            <img className="absolute w-full h-full top-0 left-0 -z-1" src={bannerBg} alt="banner-bg" />
            <img className="absolute top-[70%] sm:top-1/2 transform sm:-translate-y-1/2 left-[5%] sm:left-[12%] -z-1" src={bannerStar01} alt="banner-shape" />
            <img className="absolute top-[12%] right-[5%] sm:right-[12%] -z-1" src={bannerStar02} alt="banner-shape" />
            <div className="container">
                <div className="text-center">
                    <h1 className="text-4xl sm:text-[40px] md:text-5xl lg:text-[52px] xl:text-[64px] leading-none! font-bold text-white" data-title>Design Science Blog</h1>
                    <div className="flex items-center justify-center gap-2 mt-3.75" data-excerpt>
                        <Link to="/" className="text-base leading-normal font-normal text-[#b2b2b2] duration-300 hover:text-primary">Home</Link>
                        <svg width="6" height="8" viewBox="0 0 6 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.38177e-05 -0.000469208H1.84009L5.71209 3.66353L1.84009 7.34353H9.38177e-05L3.87209 3.66353L9.38177e-05 -0.000469208Z" fill="#808080"/>
                        </svg>
                        <p className="text-base leading-normal font-normal text-white">Design Science Blog</p>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-14 md:py-20 lg:py-24">
            <h2 className="hidden">For Seo</h2>
            <div className="container">
                <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-sttr-wrapper>
                    
                    <BlogCard />

                </div>
            </div>
        </section>
    </>
  )
}
