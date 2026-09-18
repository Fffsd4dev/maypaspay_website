import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../../../assets/img/title-icon.svg";
import security1 from "../../../../assets/img/security/security-1.webp";
import security2 from "../../../../assets/img/security/security-2.webp";
import security3 from "../../../../assets/img/security/securty-3.webp";
import security4 from "../../../../assets/img/security/security-4.webp";
import security5 from "../../../../assets/img/security/security-5.webp";

gsap.registerPlugin(ScrollTrigger);

export default function SecurityProtocols() {

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
        <div className="container">
            <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                <div className="md:max-w-170 w-full">
                    <div className="flex items-center gap-2.5">
                        <img className="rotate" src={titleIcon} alt="title-icon" />
                        <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">SECURITY PROTOCOLS</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Our Security Protocols That You Can Explore</h2>
                </div>
                <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Our expert financial services provide security protocols tailored to your unique needs.</p>
            </div>
            <div className="flex flex-col gap-6">
        
                <div ref={cardsRef1} className="grid grid-cols-1 md:grid-cols-2 gap-6" data-sttr-wrapper>
                    <div className="bg-secondary z-[-20] relative overflow-hidden rounded-2xl flex flex-col max-h-157" data-sttr-card>
                        <div className="w-62.75 h-62 bg-title_white/10 rounded-bl-full absolute top-0 z-[-10] right-0"></div>
                        <div className="px-5 lg:px-9 pt-5 lg:pt-9">
                            <div className="w-14 h-14 bg-white/30 rounded-xl flex justify-center items-center">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_5679_17201)">
                                <path d="M26.6667 5.33333H20C20 3.91885 19.4381 2.56229 18.4379 1.5621C17.4377 0.561903 16.0812 0 14.6667 0L5.33333 0C3.91885 0 2.56229 0.561903 1.5621 1.5621C0.561903 2.56229 0 3.91885 0 5.33333L0 30.6667C0 31.0203 0.140476 31.3594 0.390524 31.6095C0.640573 31.8595 0.979711 32 1.33333 32C1.68696 32 2.02609 31.8595 2.27614 31.6095C2.52619 31.3594 2.66667 31.0203 2.66667 30.6667V17.3333H13.3333C13.3333 18.7478 13.8952 20.1044 14.8954 21.1046C15.8956 22.1048 17.2522 22.6667 18.6667 22.6667H26.6667C28.0812 22.6667 29.4377 22.1048 30.4379 21.1046C31.4381 20.1044 32 18.7478 32 17.3333V10.6667C32 9.25218 31.4381 7.89562 30.4379 6.89543C29.4377 5.89524 28.0812 5.33333 26.6667 5.33333ZM2.66667 14.6667V5.33333C2.66667 4.62609 2.94762 3.94781 3.44772 3.44772C3.94781 2.94762 4.62609 2.66667 5.33333 2.66667H14.6667C15.3739 2.66667 16.0522 2.94762 16.5523 3.44772C17.0524 3.94781 17.3333 4.62609 17.3333 5.33333V12C17.3333 12.7072 17.0524 13.3855 16.5523 13.8856C16.0522 14.3857 15.3739 14.6667 14.6667 14.6667H2.66667ZM29.3333 17.3333C29.3333 18.0406 29.0524 18.7189 28.5523 19.219C28.0522 19.719 27.3739 20 26.6667 20H18.6667C17.9594 20 17.2811 19.719 16.781 19.219C16.281 18.7189 16 18.0406 16 17.3333V17.144C17.1415 16.8493 18.1532 16.1846 18.8769 15.2539C19.6006 14.3232 19.9956 13.179 20 12V8H26.6667C27.3739 8 28.0522 8.28095 28.5523 8.78105C29.0524 9.28115 29.3333 9.95942 29.3333 10.6667V17.3333Z" fill="white"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_5679_17201">
                                <rect width="32" height="32" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>
                            </div>
                            <h3 className="mt-6 text-title_white text-2xl md:text-3xl lg:text-4xl font-bold">Our mission is to protect and grow your financial interests</h3>
                            <p className="mt-4 text-title_white leading-normal font-normal">Trusted by millions, we deliver secure financial solutions backed by transparency, smart insights, and long-term reliability.</p>
                        </div>
                        <div className="mt-13.75 self-center -translate-x-3">
                            <img className="max-w-full flex justify-center   " src={security1} alt="security dashboard illustration" />
                        </div>
                    </div>

                    <div className="bg-Cool_Blue relative overflow-hidden z-[-20] rounded-2xl flex flex-col justify-between max-h-157" data-sttr-card>
                        <div className="w-62.75 h-62 bg-title_white/10 rounded-bl-full absolute top-0 right-0 z-[-20] "></div>
                        <div className=" px-5 lg:px-9 pt-5 lg:pt-9">
                            <div className="w-14 h-14 bg-white/30 rounded-xl flex justify-center items-center">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_5679_17285)">
                                <path d="M28.2066 26.3212C30.6553 23.4397 31.9998 19.7814 31.9998 15.9999C31.9998 12.2184 30.6553 8.56011 28.2066 5.67858L29.3532 4.53192C29.6033 4.28173 29.7436 3.94247 29.7435 3.58878C29.7434 3.23508 29.6028 2.89593 29.3526 2.64592C29.1024 2.39591 28.7631 2.25552 28.4094 2.25565C28.0558 2.25577 27.7166 2.39639 27.4666 2.64658L26.3199 3.79325C23.4384 1.34449 19.7801 0 15.9986 0C12.2171 0 8.55878 1.34449 5.67725 3.79325L4.53058 2.64658C4.27894 2.40388 3.94204 2.26972 3.59245 2.273C3.24285 2.27628 2.90853 2.41674 2.66149 2.66413C2.41445 2.91152 2.27446 3.24604 2.27167 3.59564C2.26889 3.94524 2.40352 4.28195 2.64658 4.53325L3.79325 5.67992C1.34449 8.56145 0 12.2198 0 16.0013C0 19.7827 1.34449 23.4411 3.79325 26.3226L2.64658 27.4692C2.51933 27.5923 2.41786 27.7395 2.34809 27.9023C2.27833 28.065 2.24168 28.24 2.24027 28.417C2.23885 28.594 2.27271 28.7696 2.33987 28.9334C2.40703 29.0972 2.50614 29.246 2.63141 29.3711C2.75669 29.4962 2.90563 29.5951 3.06954 29.662C3.23344 29.729 3.40904 29.7626 3.58608 29.7609C3.76311 29.7592 3.93804 29.7223 4.10067 29.6523C4.26329 29.5824 4.41034 29.4807 4.53325 29.3532L5.67992 28.2066C8.56145 30.6553 12.2198 31.9998 16.0013 31.9998C19.7827 31.9998 23.4411 30.6553 26.3226 28.2066L27.4692 29.3532C27.7209 29.596 28.0578 29.7301 28.4074 29.7268C28.757 29.7236 29.0913 29.5831 29.3383 29.3357C29.5854 29.0883 29.7254 28.7538 29.7282 28.4042C29.7309 28.0546 29.5963 27.7179 29.3532 27.4666L28.2066 26.3212ZM29.3333 15.9999C29.3357 19.0752 28.2696 22.0558 26.3173 24.4319L21.5559 19.6706C22.2801 18.5834 22.6665 17.3062 22.6665 15.9999C22.6665 14.6936 22.2801 13.4165 21.5559 12.3292L26.3173 7.56792C28.2696 9.94401 29.3357 12.9246 29.3333 15.9999ZM11.9999 15.9999C11.9999 15.2088 12.2345 14.4354 12.674 13.7776C13.1136 13.1198 13.7383 12.6071 14.4692 12.3044C15.2001 12.0016 16.0044 11.9224 16.7803 12.0768C17.5562 12.2311 18.2689 12.6121 18.8283 13.1715C19.3878 13.7309 19.7687 14.4436 19.9231 15.2196C20.0774 15.9955 19.9982 16.7997 19.6954 17.5307C19.3927 18.2616 18.88 18.8863 18.2222 19.3258C17.5644 19.7653 16.791 19.9999 15.9999 19.9999C14.9391 19.9999 13.9216 19.5785 13.1715 18.8283C12.4213 18.0782 11.9999 17.0608 11.9999 15.9999ZM15.9999 2.66658C19.0752 2.66413 22.0558 3.73025 24.4319 5.68258L19.6706 10.4439C18.5834 9.71973 17.3062 9.33332 15.9999 9.33332C14.6936 9.33332 13.4165 9.71973 12.3292 10.4439L7.56792 5.68258C9.94401 3.73025 12.9246 2.66413 15.9999 2.66658ZM2.66658 15.9999C2.66413 12.9246 3.73025 9.94401 5.68258 7.56792L10.4439 12.3292C9.71973 13.4165 9.33332 14.6936 9.33332 15.9999C9.33332 17.3062 9.71973 18.5834 10.4439 19.6706L5.68258 24.4319C3.73025 22.0558 2.66413 19.0752 2.66658 15.9999ZM15.9999 29.3333C12.9246 29.3357 9.94401 28.2696 7.56792 26.3173L12.3292 21.5559C13.4165 22.2801 14.6936 22.6665 15.9999 22.6665C17.3062 22.6665 18.5834 22.2801 19.6706 21.5559L24.4319 26.3173C22.0558 28.2696 19.0752 29.3357 15.9999 29.3333Z" fill="white"/>
                                </g>
                                <defs>
                                <clipPath id="clip0_5679_17285">
                                <rect width="32" height="32" fill="white"/>
                                </clipPath>
                                </defs>
                                </svg>

                            </div>
                            <h3 className="mt-6 text-title_white text-2xl md:text-3xl lg:text-4xl font-bold">Our mission is to protect and grow your financial interests</h3>
                            <p className="mt-4 text-title_white leading-normal font-normal">Trusted by millions, we deliver secure financial solutions backed by transparency, smart insights, and long-term reliability.</p>
                        </div>
                        <div className="mt-12 self-center -translate-x-2 max-w-4/5">
                            <img className="max-w-full   " src={security2} alt="encrypted data flow illustration" />
                        </div>
                    </div>
                </div>

                <div ref={cardsRef2} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 " data-sttr-wrapper>
                    <div className="bg-Navy_Green rounded-2xl flex flex-col justify-between max-h-102.5 overflow-hidden" data-sttr-card>
                        <div className=" px-5 md:px-9 pt-5 md:pt-9">
                            <div className="w-14 h-14 bg-white/30 rounded-xl flex justify-center items-center">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.33301 22.667C8.43758 22.667 9.33301 21.7716 9.33301 20.667C9.33301 19.5624 8.43758 18.667 7.33301 18.667C6.22844 18.667 5.33301 19.5624 5.33301 20.667C5.33301 21.7716 6.22844 22.667 7.33301 22.667Z" fill="white"/>
                                <path d="M25.3333 4H6.66667C4.89921 4.00212 3.20474 4.70518 1.95496 5.95496C0.705176 7.20474 0.00211714 8.89921 0 10.6667L0 21.3333C0.00211714 23.1008 0.705176 24.7953 1.95496 26.045C3.20474 27.2948 4.89921 27.9979 6.66667 28H25.3333C27.1008 27.9979 28.7953 27.2948 30.045 26.045C31.2948 24.7953 31.9979 23.1008 32 21.3333V10.6667C31.9979 8.89921 31.2948 7.20474 30.045 5.95496C28.7953 4.70518 27.1008 4.00212 25.3333 4ZM6.66667 6.66667H25.3333C26.3942 6.66667 27.4116 7.08809 28.1618 7.83824C28.9119 8.58839 29.3333 9.6058 29.3333 10.6667H2.66667C2.66667 9.6058 3.08809 8.58839 3.83824 7.83824C4.58839 7.08809 5.6058 6.66667 6.66667 6.66667ZM25.3333 25.3333H6.66667C5.6058 25.3333 4.58839 24.9119 3.83824 24.1618C3.08809 23.4116 2.66667 22.3942 2.66667 21.3333V13.3333H29.3333V21.3333C29.3333 22.3942 28.9119 23.4116 28.1618 24.1618C27.4116 24.9119 26.3942 25.3333 25.3333 25.3333Z" fill="white"/>
                                </svg>
                            </div>
                            <h4 className="mt-6 text-title_white text-2xl leading-1.3">Debit, Mastercard, and credit card solutions you can rely</h4>
                        </div>

                        <div className="mt-15.5 self-center -translate-x-2 max-w-4/5 px-4 transform: translate-y-1 ">
                            <img className="max-w-full " src={security3} alt="secure card services illustration" />
                        </div>
                    </div>
                    <div className="bg-Wine_Berry rounded-2xl flex flex-col justify-between max-h-102.5 " data-sttr-card>
                        <div className=" px-5 md:px-9 pt-5 md:pt-9">
                            <div className="w-14 h-14 bg-white/30 rounded-xl flex justify-center items-center">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_5679_17364)">
                                    <path d="M22 0C16.392 0 12 2.636 12 6V9.44933C11.356 9.37333 10.6867 9.33333 10 9.33333C4.392 9.33333 0 11.9693 0 15.3333V26C0 29.364 4.392 32 10 32C14.5427 32 18.288 30.2707 19.5467 27.8253C20.344 27.9413 21.1653 28 22 28C27.608 28 32 25.364 32 22V6C32 2.636 27.608 0 22 0ZM29.3333 16.6667C29.3333 18.24 26.1973 20 22 20C21.3173 20 20.648 19.9533 20 19.8627V17.2173C20.6533 17.2933 21.3227 17.3333 22 17.3333C24.9253 17.3333 27.52 16.616 29.3333 15.452V16.6667ZM2.66667 19.452C4.48 20.616 7.07467 21.3333 10 21.3333C12.9253 21.3333 15.52 20.616 17.3333 19.452V20.6667C17.3333 22.24 14.1973 24 10 24C5.80267 24 2.66667 22.24 2.66667 20.6667V19.452ZM29.3333 11.3333C29.3333 12.9067 26.1973 14.6667 22 14.6667C21.2867 14.6667 20.5867 14.616 19.912 14.5173C19.6547 13.3347 18.8453 12.272 17.6373 11.42C18.9493 11.7933 20.4267 12 22 12C24.9253 12 27.52 11.2827 29.3333 10.1187V11.3333ZM22 2.66667C26.1973 2.66667 29.3333 4.42667 29.3333 6C29.3333 7.57333 26.1973 9.33333 22 9.33333C17.8027 9.33333 14.6667 7.57333 14.6667 6C14.6667 4.42667 17.8027 2.66667 22 2.66667ZM10 12C14.1973 12 17.3333 13.76 17.3333 15.3333C17.3333 16.9067 14.1973 18.6667 10 18.6667C5.80267 18.6667 2.66667 16.9067 2.66667 15.3333C2.66667 13.76 5.80267 12 10 12ZM10 29.3333C5.80267 29.3333 2.66667 27.5733 2.66667 26V24.7853C4.48 25.9493 7.07467 26.6667 10 26.6667C12.9253 26.6667 15.52 25.9493 17.3333 24.7853V26C17.3333 27.5733 14.1973 29.3333 10 29.3333ZM22 25.3333C21.3173 25.3333 20.648 25.2867 20 25.196V22.5507C20.6533 22.6267 21.3227 22.6667 22 22.6667C24.9253 22.6667 27.52 21.9493 29.3333 20.7853V22C29.3333 23.5733 26.1973 25.3333 22 25.3333Z" fill="white"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_5679_17364">
                                    <rect width="32" height="32" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>

                            </div>
                            <h4 className="mt-6 text-title_white text-2xl leading-1.3">Send money anywhere in the world, instantly</h4>
                        </div>

                        <div className=" self-center -translate-x-2 max-w-4/5 pb-9 pt-15.25">
                            <img className="max-w-full " src={security4} alt="global transfer illustration" />
                        </div>
                    </div>

                    <div className="bg-Marine rounded-2xl flex flex-col justify-between max-h-102.5" data-sttr-card>
                        <div className="px-5 md:px-9 pt-5 md:pt-9">
                            <div className="w-14 h-14 bg-white/30 rounded-xl flex justify-center items-center">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_5679_17281)">
                                    <path d="M28.2066 26.3212C30.6553 23.4397 31.9998 19.7814 31.9998 15.9999C31.9998 12.2184 30.6553 8.56011 28.2066 5.67858L29.3532 4.53192C29.6033 4.28173 29.7436 3.94247 29.7435 3.58878C29.7434 3.23508 29.6028 2.89593 29.3526 2.64592C29.1024 2.39591 28.7631 2.25552 28.4094 2.25565C28.0558 2.25577 27.7166 2.39639 27.4666 2.64658L26.3199 3.79325C23.4384 1.34449 19.7801 0 15.9986 0C12.2171 0 8.55878 1.34449 5.67725 3.79325L4.53058 2.64658C4.27894 2.40388 3.94204 2.26972 3.59245 2.273C3.24285 2.27628 2.90853 2.41674 2.66149 2.66413C2.41445 2.91152 2.27446 3.24604 2.27167 3.59564C2.26889 3.94524 2.40352 4.28195 2.64658 4.53325L3.79325 5.67992C1.34449 8.56145 0 12.2198 0 16.0013C0 19.7827 1.34449 23.4411 3.79325 26.3226L2.64658 27.4692C2.51933 27.5923 2.41786 27.7395 2.34809 27.9023C2.27833 28.065 2.24168 28.24 2.24027 28.417C2.23885 28.594 2.27271 28.7696 2.33987 28.9334C2.40703 29.0972 2.50614 29.246 2.63141 29.3711C2.75669 29.4962 2.90563 29.5951 3.06954 29.662C3.23344 29.729 3.40904 29.7626 3.58608 29.7609C3.76311 29.7592 3.93804 29.7223 4.10067 29.6523C4.26329 29.5824 4.41034 29.4807 4.53325 29.3532L5.67992 28.2066C8.56145 30.6553 12.2198 31.9998 16.0013 31.9998C19.7827 31.9998 23.4411 30.6553 26.3226 28.2066L27.4692 29.3532C27.7209 29.596 28.0578 29.7301 28.4074 29.7268C28.757 29.7236 29.0913 29.5831 29.3383 29.3357C29.5854 29.0883 29.7254 28.7538 29.7282 28.4042C29.7309 28.0546 29.5963 27.7179 29.3532 27.4666L28.2066 26.3212ZM29.3333 15.9999C29.3357 19.0752 28.2696 22.0558 26.3173 24.4319L21.5559 19.6706C22.2801 18.5834 22.6665 17.3062 22.6665 15.9999C22.6665 14.6936 22.2801 13.4165 21.5559 12.3292L26.3173 7.56792C28.2696 9.94401 29.3357 12.9246 29.3333 15.9999ZM11.9999 15.9999C11.9999 15.2088 12.2345 14.4354 12.674 13.7776C13.1136 13.1198 13.7383 12.6071 14.4692 12.3044C15.2001 12.0016 16.0044 11.9224 16.7803 12.0768C17.5562 12.2311 18.2689 12.6121 18.8283 13.1715C19.3878 13.7309 19.7687 14.4436 19.9231 15.2196C20.0774 15.9955 19.9982 16.7997 19.6954 17.5307C19.3927 18.2616 18.88 18.8863 18.2222 19.3258C17.5644 19.7653 16.791 19.9999 15.9999 19.9999C14.9391 19.9999 13.9216 19.5785 13.1715 18.8283C12.4213 18.0782 11.9999 17.0608 11.9999 15.9999ZM15.9999 2.66658C19.0752 2.66413 22.0558 3.73025 24.4319 5.68258L19.6706 10.4439C18.5834 9.71973 17.3062 9.33332 15.9999 9.33332C14.6936 9.33332 13.4165 9.71973 12.3292 10.4439L7.56792 5.68258C9.94401 3.73025 12.9246 2.66413 15.9999 2.66658ZM2.66658 15.9999C2.66413 12.9246 3.73025 9.94401 5.68258 7.56792L10.4439 12.3292C9.71973 13.4165 9.33332 14.6936 9.33332 15.9999C9.33332 17.3062 9.71973 18.5834 10.4439 19.6706L5.68258 24.4319C3.73025 22.0558 2.66413 19.0752 2.66658 15.9999ZM15.9999 29.3333C12.9246 29.3357 9.94401 28.2696 7.56792 26.3173L12.3292 21.5559C13.4165 22.2801 14.6936 22.6665 15.9999 22.6665C17.3062 22.6665 18.5834 22.2801 19.6706 21.5559L24.4319 26.3173C22.0558 28.2696 19.0752 29.3357 15.9999 29.3333Z" fill="white"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_5679_17281">
                                    <rect width="32" height="32" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                            </div>
                            <h4 className="mt-6 text-title_white text-2xl leading-1.3">Our mission is to protect and grow your financial interests</h4>
                        </div>

                        <div className=" self-center -translate-x-2 max-w-4/5 pb-9 pt-17.75">
                            <img className="max-w-full " src={security5} alt="fraud protection illustration" />
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </>
  )
}
