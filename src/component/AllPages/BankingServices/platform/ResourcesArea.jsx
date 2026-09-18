import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import titleIcon from "../../../../assets/img/title-icon.svg";
import platformImg1 from "../../../../assets/img/platform/platform-img-1.webp";

gsap.registerPlugin(ScrollTrigger);

export default function ResourcesArea() {

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
        <section className="section-spacing-lg">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">RESOURCES</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Platform Demo Video That You Need To Know!</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Transitioning your financial life should never be a burden. We have engineered a three-step integration.</p>
                </div>
                <div ref={cardsRef} className="flex items-center justify-between gap-8 md:gap-10 flex-col md:flex-row" data-sttr-wrapper>
                    <div className="md:max-w-165 w-full overflow-hidden!" id="video-all-wrapper">
                        <div className="w-full overflow-hidden rounded-2xl md:rounded-3xl relative flex items-center justify-center" id="video-container" data-sttr-card>
                            <img className="w-full h-full object-cover aspect-660/480" src={platformImg1} alt="Platform Demo" />
                            <Link className="video-popup animated-play-button absolute w-10 md:w-12 h-10 md:h-12 rounded-full bg-primary flex items-center justify-center text-title_black" to="https://www.youtube.com/embed/S_CGed6E610?si=8usIVmgCLNXWZE_K">
                                <svg className="fill-current w-3.25 h-3.75">
                                    <use href="#playIcon"></use>
                                </svg>
                            </Link>
                        </div>
                    </div>
                    <div className="md:max-w-135 w-full">
                        <h3 className="text-title_black text-xl md:text-2xl font-semibold" data-sttr-card>Digital Identity Verification</h3>
                        <p className="mt-3" data-sttr-card>Complete your KYC in under 2 minutes using our secure biometric interface. No physical branch visits required. Transitioning your financial life should never be a burden. We have engineered a three-step integration process that securely migrates your data and assets</p>
                        <ul className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 flex flex-col gap-3 text-title_black text-base leading-tight font-semibold" data-sttr-card>
                            <li className="flex items-center gap-2.5">
                                <svg className="w-6 h-6 fill-current text-primary">
                                    <use href="#primaryRoundedCheck"></use>
                                </svg>
                                <span className="flex-1">Easy to use survey maker interface</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <svg className="w-6 h-6 fill-current text-primary">
                                    <use href="#primaryRoundedCheck"></use>
                                </svg>
                                <span className="flex-1">Drag and drop to change the order of questions</span>
                            </li>
                            <li className="flex items-center gap-2.5">
                                <svg className="w-6 h-6 fill-current text-primary">
                                    <use href="#primaryRoundedCheck"></use>
                                </svg>
                                <span className="flex-1">Quota management</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
