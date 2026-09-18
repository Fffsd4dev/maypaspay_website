import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import titleIcon from "../../../../assets/img/title-icon.svg";
import blogPost6 from "../../../../assets/img/blog-post/blog-3/blog-post-6.webp";

import { blogData } from "../../../../data/data";

gsap.registerPlugin(ScrollTrigger);

export default function RelatedBlogs() {

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
        <div>
			<div className="container">
				<div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
					<div className="md:max-w-170 w-full">
						<div className="flex items-center gap-2.5">
							<img className="rotate" src={titleIcon} alt="title-icon" />
							<span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">FINANCIAL INSIGHTS</span>
						</div>
						<h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Related Blogs</h2>
					</div>
					<p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Stay ahead of the curve with expert analysis on market trends, fintech innovations, and the future of global finance from our senior research team.</p>
				</div>			
				<div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-sttr-wrapper>
					
					{blogData.slice(8, 11).map((item, index)=>(
                        <div data-sttr-card key={index}>
                            <div className="blog-card-2 blog-hover-card">
                                <Link to={`/blog-post-1/${item.id}/${item.title.replace(/\s+/g, '-').toLowerCase()}`} className="blog-card-thumb block relative overflow-hidden rounded-2xl">
                                    <img className="w-full rounded-2xl object-center object-cover aspect-410/250" src={item.img} alt={item.title} />
                                </Link>
                                <div className="flex gap-3 items-center pt-5 md:pt-7">
                                    <div className="flex items-center gap-3">
                                        <Link to="/blog-author" className="inline-block text-title_black duration-300 hover:text-secondary text-base md:text-lg font-normal">
                                            {item.name}
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-primary w-1.5 h-1.5 rounded-full"></div>
                                        <div>
                                            <span className="text-title_black text-base md:text-lg font-normal">
                                                {item.date}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="pt-4 duration-300 text-xl md:text-2xl font-semibold text-title_black">
                                        <Link to={`/blog-post-1/${item.id}/${item.title.replace(/\s+/g, '-').toLowerCase()}`} className="text-underline-1 text-current">
                                            {item.title}
                                        </Link>
                                    </h3>
                                    <p className="text-base mt-3">{item.desc}</p>
                                </div>
                            </div>				
                        </div>
                    ))}

				</div>
			</div>
			<div className="absolute bottom-0 -z-10 left-0">
				<img src={blogPost6} alt="" />
			</div>
		</div>
    </>
  )
}
