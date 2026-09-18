import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import titleIcon from "../../../../assets/img/title-icon.svg";

import { blogData } from "../../../../data/data";

gsap.registerPlugin(ScrollTrigger);

export default function FinancialBlog() {

    const sectionRef = useRef(null);
    const cardsRef1 = useRef(null);
    const cardsRef2 = useRef(null);

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
    const animateCards = (ref) => {

        if (!ref.current) return;

        const ctx = gsap.context(() => {

            const cards = gsap.utils.toArray("[data-sttr-card]", ref.current);

            gsap.from(cards, {
                y: 50,
                opacity: 0,
                filter: "blur(10px)",
                duration: 0.6,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top 75%",
                    once: true,
                },
            });

        }, ref);

        return ctx;

    };

    useEffect(() => {

        const ctx1 = animateCards(cardsRef1);
        const ctx2 = animateCards(cardsRef2);

        return () => {
            ctx1?.revert();
            ctx2?.revert();
        };

    }, []);

  return (
    <>
        <section className="section-spacing-lg">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">FINANCIAL INSIGHTS</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Latest Financial News and Global Updates</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Stay ahead of the curve with expert analysis on market trends, fintech innovations, and the future of global finance from our senior research team.</p>
                </div>
                <div ref={cardsRef1} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-sttr-wrapper>

                    {blogData.slice(8, 14).map((item, index)=>(
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

                <div ref={cardsRef2} className="flex justify-center pt-10 md:pt-20" data-sttr-wrapper>
                    
                    <ul className="flex items-center gap-1.5 rounded-full bg-white shadow-[0_0_14px_rgba(0,0,0,0.24)]" data-sttr-card>

                        <li>
                            <Link to="/blog-post-1" className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full font-semibold text-paragraph_white hover:text-title_black duration-300 transition text-base md:text-lg">
                                <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.99484 0.994601C10.3851 1.38482 10.3854 2.01739 9.99561 2.40804L4.53597 7.8796C4.14647 8.26995 4.14647 8.90193 4.53597 9.29227L9.99561 14.7638C10.3854 15.1545 10.3851 15.7871 9.99484 16.1773L9.29328 16.8788C8.90276 17.2694 8.26959 17.2694 7.87907 16.8788L0.293278 9.29304C-0.0972462 8.90252 -0.0972452 8.26935 0.293279 7.87883L7.87907 0.293043C8.26959 -0.0974808 8.90275 -0.0974801 9.29328 0.293044L9.99484 0.994601Z" fill="currentColor"/>
                                </svg>
                            </Link>
                        </li>

                        {/* <!-- active --> */}
                        <li>
                            <Link to="/blog-post-1" className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full font-semibold bg-primary text-title_black duration-300 transition text-base md:text-lg">
                                01
                            </Link>
                        </li>

                        {/* <!-- pages --> */}
                        <li>
                            <Link to="/blog-post-1" className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full font-semibold hover:bg-primary text-title_black duration-300 transition text-base md:text-lg">02</Link>
                        </li>
                        <li>
                            <Link to="/blog-post-1" className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full font-semibold hover:bg-primary text-title_black duration-300 transition text-base md:text-lg">03</Link>
                        </li>

                        {/* <!-- dots --> */}
                        <li className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full font-semibold text-title_black text-base md:text-lg">
                            <svg width="14" height="4" viewBox="0 0 14 4" fill="none">
                                <path d="M1.7 3.28a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28Zm5.2 0a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28Zm5.2 0a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28Z" fill="currentColor"/>
                            </svg>
                        </li>

                        <li>
                            <Link to="/blog-post-1" className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full font-semibold hover:bg-primary text-title_black duration-300 transition text-base md:text-lg">08</Link>
                        </li>
                        <li>
                            <Link to="/blog-post-1" className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full font-semibold hover:bg-primary text-title_black duration-300 transition text-base md:text-lg">09</Link>
                        </li>

                        {/* <!-- next --> */}
                        <li>
                            <Link to="/blog-post-1" className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full font-semibold text-paragraph_white hover:text-title_black duration-300 transition text-base md:text-lg">
                                <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.292274 0.994601C-0.0979489 1.38482 -0.0982945 2.01739 0.291503 2.40804L5.75114 7.8796C6.14064 8.26995 6.14064 8.90193 5.75114 9.29227L0.291503 14.7638C-0.0982946 15.1545 -0.0979497 15.7871 0.292273 16.1773L0.99383 16.8788C1.38435 17.2694 2.01752 17.2694 2.40804 16.8788L9.99383 9.29304C10.3844 8.90252 10.3844 8.26935 9.99383 7.87883L2.40804 0.293043C2.01752 -0.0974808 1.38435 -0.0974801 0.993831 0.293044L0.292274 0.994601Z" fill="currentColor"/>
                                </svg>
                            </Link>
                        </li>

                    </ul>

                </div>

            </div>
        </section>
    </>
  )
}
