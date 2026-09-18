import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import backgroundShape from "../../../assets/img/home-v2/banner/background-shape.webp";
import titleIcon from "../../../assets/img/title-icon.svg";
import bannerThumb from "../../../assets/img/home-v2/banner/banner-thumb.webp";
import shape02 from "../../../assets/img/home-v2/banner/shape-02.webp";

export default function HeroTwo() {

    const heroRef = useRef(null);

    useEffect(() => {

        if (!heroRef.current) return;

        const ctx = gsap.context(() => {

            const subtitle = heroRef.current.querySelector("[data-subtitle]");
            const title = heroRef.current.querySelector("[data-title]");
            const excerpt = heroRef.current.querySelector("[data-excerpt]");
            const button = heroRef.current.querySelector("[data-button]");

            const thumbnail = heroRef.current.querySelector("[data-thumbnail]");
            const circle = heroRef.current.querySelector("[data-circle]");
            const cards = heroRef.current.querySelectorAll("[data-scale-up]");

            const tl = gsap.timeline({
                defaults: {
                    ease: "power2.out",
                },
            });

            // Left Content
            tl.from(
                [subtitle, title, excerpt, button],
                {
                    y: 40,
                    opacity: 0,
                    filter: "blur(6px)",
                    duration: 0.6,
                    stagger: 0.15,
                }
            );

            // Image
            if (thumbnail) {
                tl.from(
                    thumbnail,
                    {
                        y: 50,
                        opacity: 0,
                        filter: "blur(6px)",
                        duration: 0.6,
                    },
                    "-=0.3"
                );
            }

            // Circle
            if (circle) {
                tl.fromTo(
                    circle,
                    {
                        clipPath: "circle(0% at 100% 0)",
                    },
                    {
                        clipPath: "circle(150% at 100% 0)",
                        duration: 1.2,
                    },
                    "-=0.5"
                );
            }

            // Floating Cards
            if (cards.length) {
                tl.from(
                    cards,
                    {
                        y: 30,
                        scale: 0.8,
                        opacity: 0,
                        filter: "blur(6px)",
                        duration: 0.5,
                        stagger: 0.12,
                    },
                    "-=0.8"
                );
            }

        }, heroRef);

        return () => ctx.revert();

    }, []);

  return (
    <>
        <section ref={heroRef} className="py-14 md:py-20 lg:py-24 xl:py-27 bg-[#F8F5F2] relative z-1" data-digital-hero-banner>
            <img className="hidden lg:block absolute top-[4%] left-0 -z-1" src={backgroundShape} alt="background-shape" />
            <div className="container">
                <div className="flex items-center justify-between gap-10 flex-col md:flex-row">
                    <div className="md:max-w-137.5 w-full">
                        <div className="flex items-center gap-2.5" data-subtitle>
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <p className="text-base sm:text-lg font-semibold leading-[1.1]! text-secondary uppercase">SMART LENDING</p>
                        </div>
                        <h1 className="text-4xl sm:text-[40px] md:text-5xl lg:text-[52px] xl:text-[64px] font-bold leading-[1.1]! text-title_black mt-4 md:mt-5" data-title>Empowering your financial future</h1>
                        <p className="text-base text-paragraph_black mt-4" data-excerpt>We help individuals and businesses grow wealth, reduce risk, and achieve long-term success. Our AI-driven platform analyzes your profile in real-time to unlock the best loan opportunities tailored to your needs.</p>
                        <div className="mt-6 sm:mt-8 lg:mt-12 flex items-center gap-3" data-button>
                            <a href="#global-access" className="button-primary">Download App</a>
                            <Link className="video-popup w-10 md:w-12 h-10 md:h-12 rounded-full bg-title_black flex items-center justify-center text-white" to="https://www.youtube.com/embed/S_CGed6E610?si=8usIVmgCLNXWZE_K">
                                <svg className="fill-current w-3.25 h-3.75">
                                    <use href="#playIcon"></use>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="max-w-120 lg:max-w-157.25 xl:max-w-145 2xl:max-w-157.25 w-full xl:-mr-10.5 pb-12 px-3 pt-3 relative z-1">
                        {/* <!-- Main Thumb --> */}
                        <img className="max-w-157.25 w-full ml-auto" src={bannerThumb} alt="thumb" data-thumbnail />

                        {/* <!-- Cercile Shpae --> */}
                        <div className="absolute top-0 right-[10%] -z-1 w-[70%] bg-primary aspect-square rounded-full" data-circle></div>
                        {/* <!-- Graph Shpae --> */}
                        <img className="w-[45%] lg:w-auto max-w-51.5 absolute bottom-0 xl:bottom-auto xl:top-[20%] left-0 xl:left-[-12%] z-1 shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)] rounded-2xl max-[380px]:hidden" src={shape02} alt="banner-sahpe" data-scale-up />
                        {/* <!-- Counter Up --> */}
                        {/* <div className="absolute bottom-0 max-[380px]:right-1/2 transform max-[380px]:translate-x-1/2 right-0 lg:right-auto lg:left-[50%] z-1 p-4 lg:p-6 bg-secondary rounded-xl lg:rounded-2xl shadow-[0px_4px_24px_0px_rgba(0,0,0,0.1)]" data-scale-up>
                            <div className="flex">
                                <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl text-white font-bold leading-none! counter" data-target="10">10</h2>
                                <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl text-white font-bold leading-none!">+</h2>
                            </div>
                            <div className="mt-2 lg:mt-4 flex flex-col gap-1.75">
                                <p className="text-sm text-white font-semibold">Years Of Experience</p>
                                <svg width="136" height="5" viewBox="0 0 136 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.75 3.75601C18.75 1.256 77.75 -0.743972 135.25 2.25601" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
