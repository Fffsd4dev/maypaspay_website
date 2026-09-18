import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import backgroundShape from "../../../assets/img/home-v2/global-access/background-shape.webp";
import titlePrimary from "../../../assets/img/title-icon-primary.svg";
import globalAccessThumb from "../../../assets/img/home-v2/global-access/global-access-thumb.webp";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalAccess() {

    const sectionRef = useRef(null);

    useEffect(() => {

        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {

            const icon = sectionRef.current.querySelector(".rotate");
            const subtitle = sectionRef.current.querySelector("span");
            const title = sectionRef.current.querySelector("h3");
            const text = sectionRef.current.querySelector("p");
            const buttons = sectionRef.current.querySelector(".btn-sttr");
            const image = sectionRef.current.querySelector(".thumbnail-img");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                }
            });

            if (icon) {
                tl.from(icon, {
                    scale: 0,
                    rotation: -180,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power3.out"
                });
            }

            if (subtitle) {
                tl.from(subtitle, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5
                }, "-=0.4");
            }

            if (title) {
                tl.from(title, {
                    y: 35,
                    opacity: 0,
                    duration: 0.6
                }, "-=0.3");
            }

            if (text) {
                tl.from(text, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6
                }, "-=0.4");
            }

            if (buttons) {
                tl.from(buttons, {
                    y: 35,
                    opacity: 0,
                    duration: 0.6
                }, "-=0.3");
            }

            if (image) {
                tl.from(image, {
                    y: 60,
                    opacity: 0,
                    scale: 0.95,
                    filter: "blur(10px)",
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.5");
            }

        }, sectionRef);

        return () => ctx.revert();

    }, []);

    return (
        <>
            <section className="section-spacing-lg-md" id="global-access">
                <div className="container-lg">
                    <div className="pt-10 pl-4 sm:pl-10 md:p-10 xl:p-18 2xl:p-25 bg-secondary rounded-2xl md:rounded-3xl relative z-1 overflow-hidden">
                        <img className="w-full h-full absolute top-0 left-0 -z-1 select-none"
                            src={backgroundShape} alt="background-shape" />
                        <div ref={sectionRef} className="flex flex-col md:flex-row gap-7" data-borderless-banking>
                            <div className="md:max-w-135 w-full md:w-1/2 pr-4 sm:pr-10 md:pr-0">
                                <div className="flex items-center gap-2.5">
                                    <img className="rotate" src={titlePrimary} alt="title-icon" />
                                    <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">GLOBAL ACCESS</span>
                                </div>
                                <h3 className="font-bold leading-tight text-title_white mt-4 sm:mt-5" data-content>Stuck? Start Using SecureVest Today!</h3>
                                <p className="mt-4 text-base sm:text-lg text-paragraph_white" data-content>
                                    We empower the next generation of founders with a mobile-first banking experience. Manage capital, monitor security, and scale your business from the palm of your hand.
                                </p>
                                <div className="flex gap-3 mt-6 md:mt-9 lg:mt-12 flex-wrap btn-sttr">
                                    <Link className="button-primary" to="https://www.apple.com/app-store" target="_blank">
                                        Download for iPhone
                                        <svg className="w-4 md:w-5 h-4 md:h-5 fill-current">
                                            <use href="#appleIcon"></use>
                                        </svg>
                                    </Link>
                                    <Link className="button-solid-white" to="https://play.google.com/store/games?hl=en" target="_blank">
                                        Download for Android
                                        <svg className="w-4 md:w-5 h-4 md:h-5 fill-current">
                                            <use href="#androidIcon"></use>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            <div className="md:w-[50%] md:absolute bottom-0 right-0 -z-1 ml-auto thumbnail-img">
                                <img className="w-full" src={globalAccessThumb}
                                    alt="global-access-thumb" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
