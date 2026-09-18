import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import titleIcon from "../../assets/img/title-icon.svg";

gsap.registerPlugin(ScrollTrigger);

export default function PricingCards() {

    const sectionRef = useRef(null);
    const cardsRef = useRef(null);

    const [isYearly, setIsYearly] = useState(false);

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
        <section className="section-spacing-md-lg">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">PRICING PLAN</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Choose the Plan that Best Fits Your Needs</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Transparency in lending is the cornerstone of trust. Use our interactive calculator to estimate your monthly repayments, visualize interest breakdowns.</p>
                </div>
                <div ref={cardsRef} data-sttr-wrapper>
                    
                    <div className=" flex items-center justify-center toggle-wrapper" data-sttr-card>
                        <div className="toggle-wrapper inline-flex items-center justify-center gap-3 relative">
                            <div className="flex items-end sm:items-start gap-1.5 absolute left-[80%] sm:left-full bottom-full text-secondary">
                                <svg width="36" height="20" viewBox="0 0 36 20" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <mask id="drawMask">
                                            <rect width="36" height="20" fill="black"/>
                                            <path id="revealStroke" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M35.4425 1.05272C35.8034 1.27768 35.9136 1.7526 35.6886 2.11349C35.4636 2.47437 34.9887 2.58456 34.6278 2.3596L35.0352 1.70616L35.4425 1.05272ZM15.0222 10.8354L14.2599 10.9446L15.0222 10.8354ZM27.204 6.08888L27.7276 5.52431L27.204 6.08888ZM1.62019 18.9488C1.19753 18.9957 0.816829 18.6912 0.769865 18.2685L0.00454224 11.3809C-0.0424219 10.9582 0.262138 10.5775 0.684796 10.5306C1.10745 10.4836 1.48816 10.7882 1.53512 11.2108L2.21541 17.3331L8.33773 16.6528C8.76039 16.6059 9.14109 16.9104 9.18806 17.3331C9.23502 17.7558 8.93046 18.1365 8.5078 18.1834L1.62019 18.9488ZM35.0352 1.70616L34.6278 2.3596C34.4838 2.26984 34.062 2.11601 33.3247 1.96494C32.6225 1.82105 31.7193 1.69596 30.6886 1.61932C28.6244 1.46584 26.0968 1.51025 23.7029 1.96138C21.296 2.41497 19.1093 3.26371 17.6373 4.65131C16.206 6.00048 15.3826 7.92022 15.7844 10.7263L15.0222 10.8354L14.2599 10.9446C13.7916 7.67385 14.7628 5.24455 16.581 3.5307C18.3583 1.8553 20.8758 0.927057 23.4177 0.448022C25.9727 -0.0334738 28.6387 -0.0773411 30.8028 0.0835597C31.8862 0.164116 32.8559 0.296875 33.6339 0.456291C34.3768 0.608532 35.0426 0.80347 35.4425 1.05272L35.0352 1.70616ZM15.0222 10.8354L15.7844 10.7263C16.3581 14.7331 17.8982 16.7615 19.5609 17.6027C21.2364 18.4503 23.2624 18.2088 25.0513 17.1959C26.8414 16.1823 28.2719 14.4589 28.7417 12.5556C29.1995 10.7009 28.769 8.59057 26.6804 6.65344L27.204 6.08888L27.7276 5.52431C30.2071 7.82397 30.8352 10.5007 30.2369 12.9246C29.6506 15.3 27.9104 17.3467 25.8101 18.5359C23.7087 19.7258 21.1249 20.1198 18.8657 18.9769C16.594 17.8275 14.8749 15.2393 14.2599 10.9446L15.0222 10.8354ZM27.204 6.08888L26.6804 6.65344C24.1154 4.27451 21.4923 3.69823 18.948 4.14377C16.3543 4.59794 13.7748 6.12828 11.4057 8.10106C6.65559 12.0567 3.06834 17.4996 2.13643 18.6645L1.53516 18.1835L0.933884 17.7024C1.74223 16.692 5.51052 11.0062 10.4203 6.91765C12.8812 4.86835 15.7077 3.14775 18.6823 2.62685C21.7063 2.09732 24.8137 2.82183 27.7276 5.52431L27.204 6.08888Z"/>
                                        </mask>
                                    </defs>

                                    <path fill="currentColor" mask="url(#drawMask)" d="M35.4425 1.05272C35.8034 1.27768 35.9136 1.7526 35.6886 2.11349C35.4636 2.47437 34.9887 2.58456 34.6278 2.3596L35.0352 1.70616L35.4425 1.05272ZM15.0222 10.8354L14.2599 10.9446L15.0222 10.8354ZM27.204 6.08888L27.7276 5.52431L27.204 6.08888ZM1.62019 18.9488C1.19753 18.9957 0.816829 18.6912 0.769865 18.2685L0.00454224 11.3809C-0.0424219 10.9582 0.262138 10.5775 0.684796 10.5306C1.10745 10.4836 1.48816 10.7882 1.53512 11.2108L2.21541 17.3331L8.33773 16.6528C8.76039 16.6059 9.14109 16.9104 9.18806 17.3331C9.23502 17.7558 8.93046 18.1365 8.5078 18.1834L1.62019 18.9488ZM35.0352 1.70616L34.6278 2.3596C34.4838 2.26984 34.062 2.11601 33.3247 1.96494C32.6225 1.82105 31.7193 1.69596 30.6886 1.61932C28.6244 1.46584 26.0968 1.51025 23.7029 1.96138C21.296 2.41497 19.1093 3.26371 17.6373 4.65131C16.206 6.00048 15.3826 7.92022 15.7844 10.7263L15.0222 10.8354L14.2599 10.9446C13.7916 7.67385 14.7628 5.24455 16.581 3.5307C18.3583 1.8553 20.8758 0.927057 23.4177 0.448022C25.9727 -0.0334738 28.6387 -0.0773411 30.8028 0.0835597C31.8862 0.164116 32.8559 0.296875 33.6339 0.456291C34.3768 0.608532 35.0426 0.80347 35.4425 1.05272L35.0352 1.70616ZM15.0222 10.8354L15.7844 10.7263C16.3581 14.7331 17.8982 16.7615 19.5609 17.6027C21.2364 18.4503 23.2624 18.2088 25.0513 17.1959C26.8414 16.1823 28.2719 14.4589 28.7417 12.5556C29.1995 10.7009 28.769 8.59057 26.6804 6.65344L27.204 6.08888L27.7276 5.52431C30.2071 7.82397 30.8352 10.5007 30.2369 12.9246C29.6506 15.3 27.9104 17.3467 25.8101 18.5359C23.7087 19.7258 21.1249 20.1198 18.8657 18.9769C16.594 17.8275 14.8749 15.2393 14.2599 10.9446L15.0222 10.8354ZM27.204 6.08888L26.6804 6.65344C24.1154 4.27451 21.4923 3.69823 18.948 4.14377C16.3543 4.59794 13.7748 6.12828 11.4057 8.10106C6.65559 12.0567 3.06834 17.4996 2.13643 18.6645L1.53516 18.1835L0.933884 17.7024C1.74223 16.692 5.51052 11.0062 10.4203 6.91765C12.8812 4.86835 15.7077 3.14775 18.6823 2.62685C21.7063 2.09732 24.8137 2.82183 27.7276 5.52431L27.204 6.08888Z"/>
                                </svg>				
                                <span className="text-sm font-medium sm:whitespace-nowrap">20% Saved</span>
                            </div>
                            <span className="monthly text-base sm:text-lg sm:-tracking-[0.2px] text-black/40 duration-300">Monthly</span>
                            <label className="pricing-switch relative inline-block w-14 h-7 rounded-2xl bg-secondary cursor-pointer">
                                <input type="checkbox" id="priceToggle" className="hidden" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
                                <span
                                    className="pricing-switch-slider absolute w-5 h-5 rounded-full bg-primary top-1 left-1 transition-transform duration-300"
                                    style={{ transform: isYearly ? 'translateX(28px)' : 'translateX(0)' }}
                                ></span>
                            </label>
                            <span className="yearly text-base sm:text-lg sm:-tracking-[0.2px] text-black/40 duration-300">Yearly</span>
                        </div>
                    </div>
                    
                    <div className="pricing-table grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-11.75">
                        
                        <div data-sttr-card>
                            <div className="bg-background border border-border rounded-2xl p-6 xl:p-8 transition duration-300 flex flex-col justify-between gap-10 md:gap-12 h-full">
                                <div className="">
                                    <p className="text-paragraph_black text-lg font-semibold leading-none group-hover:text-paragraph_white">
                                        Essential
                                    </p>
                                    <div className="mt-5 mb-4 flex flex-wrap">
                                        <h2 className="price text-5xl xl:text-[64px] leading-none text-titile-black">{isYearly ? '$190' : '$19'}</h2>
                                        <p className="text-paragraph_black text-base font-normal leading-none items-end flex gap-0.5 pb-2.5">
                                            per <span className="period">{isYearly ? '/ year' : '/ month'}</span>
                                        </p>
                                    </div>
                                    <p className="text-paragraph_black text-base font-normal">Perfect for individuals starting their financial journey.</p>
                                </div>
                                <div className="">
                                    <ul className="space-y-3">
                                        <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_black   ">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path className="text-black group-hover:text-primary transition"
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="currentColor" />
                                                <path className="fill-white group-hover:fill-secondary transition"
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#FBFBFB" />
                                            </svg>
                                            Free International Transfers
                                        </li>
                                        <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_black ">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path className="text-black group-hover:text-primary transition"
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="currentColor" />
                                                <path className="fill-white group-hover:fill-secondary transition"
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#FBFBFB" />
                                            </svg>
                                            Standard Savings Interest
                                        </li>
                                        <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_black ">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path className="text-black group-hover:text-primary transition"
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="currentColor" />
                                                <path className="fill-white group-hover:fill-secondary transition"
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#FBFBFB" />
                                            </svg>
                                            Basic Budgeting Tools
                                        </li>
                                        <li className="flex gap-2  items-start leading-normal text-base font-normal text-paragraph_black ">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path className="text-black group-hover:text-primary transition"
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="currentColor" />
                                                <path className="fill-white group-hover:fill-secondary transition"
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#FBFBFB" />
                                            </svg>
                                            Virtual Debit Card
                                        </li>
                                        <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_black ">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path className="text-black group-hover:text-primary transition"
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="currentColor" />
                                                <path className="fill-white group-hover:fill-secondary transition"
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#FBFBFB" />
                                            </svg>
                                            No Monthly Maintenance Fee
                                        </li>
                                    </ul>
                                </div>
                                <Link to="/contact" className="w-full px-6 py-4 text-base leading-none font-semibold text-title_white bg-title_black group-hover:bg-primary rounded-full cursor-pointer hover:text-title_black hover:bg-primary transition duration-300 text-center justify-center!">Get Started Today</Link>
                            </div>
                        </div>
                        <div data-sttr-card>
                            <div className="bg-secondary border border-secondary rounded-2xl p-6 xl:p-8 flex flex-col justify-between gap-10 md:gap-12">
                                <div className="">
                                    <p className=" text-lg font-semibold leading-none text-paragraph_white">Professional</p>
                                    <div className="mt-5 mb-4 flex flex-wrap">
                                        <h2 className="price text-5xl xl:text-[64px] leading-none text-title_white group-hover:transition-300">{isYearly ? '$490' : '$49'}</h2>
                                        <p className="text-paragraph_white text-base font-normal leading-none items-end flex gap-0.5 pb-2.5">
                                            per <span className="period">{isYearly ? '/ year' : '/ month'}</span>
                                        </p>
                                    </div>
                                    <p className="text-paragraph_white text-base font-normal flex items-end leading-normal">Advanced tools for serious investors and high-growth savers.</p>
                                </div>
                                <div className="">
                                    <ul className="space-y-3">
                                        <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_white ">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="#D1DE6F" />
                                                <path
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#114A43" />
                                            </svg>
                                            Priority 24/7 Support
                                        </li>
                                        <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_white">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="#D1DE6F" />
                                                <path
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#114A43" />
                                            </svg>
                                            High-Yield Savings (4.5% APY)
                                        </li>
                                        <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_white ">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="#D1DE6F" />
                                                <path
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#114A43" />
                                            </svg>
                                            Advanced Portfolio Analytics
                                        </li>
                                        <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_white ">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="#D1DE6F" />
                                                <path
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#114A43" />
                                            </svg>
                                            Physical Metal Debit Card
                                        </li>
                                        <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_white ">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="#D1DE6F" />
                                                <path
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#114A43" />
                                            </svg>
                                            Automated Tax-Loss Harvesting
                                        </li>
                                    </ul>
                                </div>
                                <Link to="/contact" className="w-full px-6 py-4 text-base leading-none font-semibold text-title_black bg-primary rounded-full cursor-pointer group-hover:text-title_black text-center justify-center!">Get Started Today</Link>
                            </div>
                        </div>
                        <div data-sttr-card>
                            <div className="bg-background border border-border rounded-2xl p-6 xl:p-8 transition duration-300 flex flex-col justify-between gap-10 md:gap-12 h-full">
                                <div className="">
                                    <p className="text-paragraph_black text-lg font-semibold leading-none">Enterprise</p>
                                    <div className="mt-5 mb-4 flex flex-wrap">
                                        <h2 className="price text-5xl xl:text-[64px] leading-none text-title_black">{isYearly ? '$990' : '$99'}</h2>
                                        <p className="text-paragraph_black text-base font-normal leading-none items-end flex gap-0.5 pb-2.5">
                                            per <span className="period">{isYearly ? '/ year' : '/ month'}</span>
                                        </p>
                                    </div>
                                    <p className="text-paragraph_black text-base font-normal ">Complete wealth management for high-net-worth individuals.</p>
                                </div>
                                <div className="">
                                    <ul className="space-y-3">
                                        <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_black">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path className="text-black group-hover:text-primary transition"
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="currentColor" />
                                                <path className="fill-white group-hover:fill-secondary transition"
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#FBFBFB" />
                                            </svg>
                                            Dedicated Wealth Manager
                                        </li>
                                        <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_black">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path className="text-black group-hover:text-primary transition"
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="currentColor" />
                                                <path className="fill-white group-hover:fill-secondary transition"
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#FBFBFB" />
                                            </svg>
                                            Custom Investment Strategies
                                        </li>
                                        <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_black">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path className="text-black group-hover:text-primary transition"
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="currentColor" />
                                                <path className="fill-white group-hover:fill-secondary transition"
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#FBFBFB" />
                                            </svg>
                                            Zero Foreign Exchange Fees
                                        </li>
                                        <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_black">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path className="text-black group-hover:text-primary transition"
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="currentColor" />
                                                <path className="fill-white group-hover:fill-secondary transition"
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#FBFBFB" />
                                            </svg>
                                            Unlimited Lounge Access
                                        </li>
                                        <li className="flex gap-2 items-start leading-normal text-base font-normal text-paragraph_black">
                                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path className="text-black group-hover:text-primary transition"
                                                    d="M8.90633 2.10176C9.70664 1.0463 11.2934 1.0463 12.0937 2.10176L12.6058 2.77715C13.0425 3.35305 13.7559 3.64856 14.4719 3.55011L15.3116 3.43466C16.6238 3.25423 17.7458 4.37621 17.5653 5.68844L17.4499 6.52813C17.3514 7.24413 17.6469 7.95754 18.2228 8.39422L18.8982 8.90633C19.9537 9.70664 19.9537 11.2934 18.8982 12.0937L18.2228 12.6058C17.6469 13.0425 17.3514 13.7559 17.4499 14.4719L17.5653 15.3116C17.7458 16.6238 16.6238 17.7458 15.3116 17.5653L14.4719 17.4499C13.7559 17.3514 13.0425 17.6469 12.6058 18.2228L12.0937 18.8982C11.2934 19.9537 9.70664 19.9537 8.90633 18.8982L8.39422 18.2228C7.95754 17.6469 7.24413 17.3514 6.52813 17.4499L5.68844 17.5653C4.37621 17.7458 3.25423 16.6238 3.43466 15.3116L3.55011 14.4719C3.64856 13.7559 3.35305 13.0425 2.77715 12.6058L2.10176 12.0937C1.0463 11.2934 1.0463 9.70664 2.10176 8.90633L2.77715 8.39422C3.35305 7.95754 3.64856 7.24413 3.55011 6.52813L3.43466 5.68844C3.25423 4.37621 4.37621 3.25423 5.68844 3.43466L6.52813 3.55011C7.24413 3.64856 7.95754 3.35305 8.39422 2.77715L8.90633 2.10176Z"
                                                    fill="currentColor" />
                                                <path className="fill-white group-hover:fill-secondary transition"
                                                    d="M13.3617 7.63459L9.34883 11.6475L7.63019 9.92881C7.31402 9.61265 6.80329 9.61265 6.48712 9.92881C6.17096 10.245 6.17096 10.7557 6.48712 11.0719L8.78135 13.3661C9.09752 13.6823 9.60825 13.6823 9.92442 13.3661L14.5129 8.77765C14.829 8.46148 14.829 7.95075 14.5129 7.63459C14.1886 7.31842 13.6779 7.31842 13.3617 7.63459Z"
                                                    fill="#FBFBFB" />
                                            </svg>
                                            Estate Planning Services
                                        </li>
                                    </ul>
                                </div>
                                <Link to="/contact" className="w-full px-6 py-4 text-base leading-none font-semibold text-title_white bg-title_black rounded-full cursor-pointer hover:text-title_black hover:bg-primary transition duration-300 text-center justify-center!">Get Started Today</Link>
                            </div>
                        </div>

                    </div>
                </div>	
            </div>
        </section>
    </>
  )
}
