import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../../../assets/img/title-icon.svg";

gsap.registerPlugin(ScrollTrigger);

export default function SecurityCard() {

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
        <section className="section-spacing-lg-md">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">UNCOMPROMISED PROTECTION</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Security at the Speed of Light in Our Services</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>TWe use bank-grade encryption and multi-layer authentication to ensure your assets and data remain inaccessible to unauthorized parties..</p>
                </div>

                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 " data-sttr-wrapper>
                    
                    <div className=" bg-secondary rounded-2xl p-6 lg:p-9" data-sttr-card>
                        <div className="flex gap-3  lg:gap-3.5 items-center justify-center">
                            <div className="">
                                <svg className="max-w-10 md:max-w-12 lg:max-w-15 h-auto" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M47.5 50H12.5C9.73858 50 7.5 47.7614 7.5 45L7.5 15C7.5 12.2386 9.73858 10 12.5 10L37.5 10C40.2614 10 42.5 12.2386 42.5 15V17.5M47.5 50C44.7386 50 42.5 47.7614 42.5 45L42.5 17.5M47.5 50C50.2614 50 52.5 47.7614 52.5 45V22.5C52.5 19.7386 50.2614 17.5 47.5 17.5L42.5 17.5M32.5 10L22.5 10M17.5 40H32.5M17.5 20H32.5V30H17.5V20Z" stroke="#D1DE6F" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h3 className="text-primary leading-none">99.9%</h3>
                        </div>
                        <p className="text-paragraph_white text-base mt-4 lg:mt-6 leading-normal text-center m-auto">Our infrastructure is built on distributed cloud networks to ensure your funds are accessible 24/7 without interruption.</p>
                    </div>
                    <div className=" bg-secondary rounded-2xl p-6 lg:p-9" data-sttr-card>
                        <div className="flex gap-3  lg:gap-3.5 items-center justify-center">
                            <div className="">
                                <svg className="max-w-10 md:max-w-12 lg:max-w-15 h-auto" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M35.3637 23.4831C35.9066 24.1088 36.854 24.1759 37.4797 23.633C38.1054 23.09 38.1725 22.1426 37.6296 21.5169L36.4966 22.5L35.3637 23.4831ZM24.6364 36.5169C24.0934 35.8912 23.1461 35.8241 22.5204 36.367C21.8946 36.91 21.8275 37.8574 22.3705 38.4831L23.5034 37.5L24.6364 36.5169ZM31.5 17.5C31.5 16.6716 30.8284 16 30 16C29.1716 16 28.5 16.6716 28.5 17.5H30H31.5ZM28.5 42.5C28.5 43.3284 29.1715 44 30 44C30.8284 44 31.5 43.3285 31.5 42.5L30 42.5L28.5 42.5ZM52.5 30H51C51 41.598 41.598 51 30 51V52.5V54C43.2548 54 54 43.2548 54 30H52.5ZM30 52.5V51C18.402 51 9 41.598 9 30H7.5H6C6 43.2548 16.7452 54 30 54V52.5ZM7.5 30H9C9 18.402 18.402 9 30 9V7.5V6C16.7452 6 6 16.7452 6 30H7.5ZM30 7.5V9C41.598 9 51 18.402 51 30H52.5H54C54 16.7452 43.2548 6 30 6V7.5ZM30 30V28.5C28.1838 28.5 26.6073 28.0065 25.5287 27.2875C24.4397 26.5614 24 25.7231 24 25H22.5H21C21 27.0383 22.2392 28.7 23.8646 29.7836C25.5005 30.8742 27.6741 31.5 30 31.5V30ZM22.5 25H24C24 24.2769 24.4397 23.4386 25.5287 22.7125C26.6073 21.9935 28.1838 21.5 30 21.5V20V18.5C27.6741 18.5 25.5005 19.1258 23.8646 20.2164C22.2392 21.3 21 22.9617 21 25H22.5ZM30 20V21.5C32.4661 21.5 34.4245 22.4007 35.3637 23.4831L36.4966 22.5L37.6296 21.5169C35.9752 19.6103 33.086 18.5 30 18.5V20ZM30 30V31.5C31.8162 31.5 33.3927 31.9935 34.4713 32.7125C35.5604 33.4386 36.0001 34.2769 36.0001 35H37.5001H39.0001C39.0001 32.9617 37.7608 31.3 36.1354 30.2164C34.4995 29.1258 32.3259 28.5 30 28.5V30ZM30 17.5H28.5V20H30H31.5V17.5H30ZM30.0001 40L28.5001 40L28.5 42.5L30 42.5L31.5 42.5L31.5001 40L30.0001 40ZM30.0001 40L30.0001 38.5C27.534 38.5 25.5756 37.5993 24.6364 36.5169L23.5034 37.5L22.3705 38.4831C24.0248 40.3897 26.9141 41.5 30 41.5L30.0001 40ZM37.5001 35H36.0001C36.0001 35.7231 35.5604 36.5614 34.4713 37.2875C33.3927 38.0065 31.8163 38.5 30.0001 38.5V40V41.5C32.326 41.5 34.4995 40.8742 36.1354 39.7836C37.7608 38.7 39.0001 37.0383 39.0001 35H37.5001ZM30 20L28.5 20L28.5001 40L30.0001 40L31.5001 40L31.5 20L30 20Z" fill="#D1DE6F"/>
                                </svg>
                            </div>
                            <h3 className="text-primary leading-none whitespace-nowrap">256-Bit</h3>
                        </div>
                        <p className="text-paragraph_white text-base mt-4 lg:mt-6 leading-normal text-center m-auto">Every byte of data is protected by the same encryption standards used by global military and intelligence agencies.</p>
                    </div>
                    <div className=" bg-secondary rounded-2xl p-6 lg:p-9" data-sttr-card>
                        <div className="flex gap-3  lg:gap-3.5 items-center justify-center">
                            <div className="">
                                <svg className="max-w-10 md:max-w-12 lg:max-w-15 h-auto" width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 17.5V42.5C10 48.0228 18.9543 52.5 30 52.5C41.0457 52.5 50 48.0228 50 42.5V17.5M10 17.5C10 23.0228 18.9543 27.5 30 27.5C41.0457 27.5 50 23.0228 50 17.5M10 17.5C10 11.9772 18.9543 7.5 30 7.5C41.0457 7.5 50 11.9772 50 17.5M50 30C50 35.5228 41.0457 40 30 40C18.9543 40 10 35.5228 10 30" stroke="#D1DE6F" strokeWidth="3"/>
                                </svg>
                            </div>
                            <h3 className="text-primary leading-none">0%</h3>
                        </div>
                        <p className="text-paragraph_white text-base mt-4 lg:mt-6 leading-normal text-center m-auto">Our "Zero Liability" policy means you are never held responsible for unauthorized charges detected by our AI systems.</p>
                    </div>

                </div>	
            </div>
        </section>
    </>
  )
}
