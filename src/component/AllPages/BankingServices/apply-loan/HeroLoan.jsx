import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titlePrimary from "../../../../assets/img/title-icon-primary.svg";
import bannerThumb from "../../../../assets/img/apply-loan/banner-thumb.webp";
import contactFormBg from "../../../../assets/img/services/contact-form-bg.webp";

gsap.registerPlugin(ScrollTrigger);

export default function HeroLoan() {

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
        <section className="py-14 md:py-20 lg:py-24 xl:px-32 bg-cover bg-center bg-no-repeat relative z-1" style={{ backgroundImage: `url(${contactFormBg})` }}>
            <div ref={cardsRef} className="container" data-sttr-wrapper>
                <div className="flex items-center flex-col md:flex-row justify-between gap-8 sm:gap-10">
                    <div className="md:max-w-135 w-full">
                        <div className="flex items-center gap-2.5" data-sttr-card>
                            <img className="rotate" src={titlePrimary} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">FLEXIBLE FINANCING</span>
                        </div>
                        <h1 className="mt-4 text-3xl md:text-4xl lg:text-[40px] xl:text-5xl text-title_white leading-tight!" data-sttr-card>Your Future with Flexible Financing.</h1>
                        <p className="text-lg font-normal leading-normal text-paragraph_white mt-4" data-sttr-card>From personal milestones to business breakthroughs, SecureVest provides the capital you need with a process that respects your time. Get funded in as little as 24 hours.</p>
                        <ul className="flex flex-col gap-4 mt-9" data-sttr-card>
                            <li className="flex gap-3.25 items-start text-base font-normal leading-normal text-paragraph_white">
                                <svg className="mt-0.5 w-5 h-5 fill-current">
                                    <use href="#contactIcon-01"></use>
                                </svg>
                                <span className="flex-1">Instant Pre-Approval: Know your status in minutes.</span>
                            </li>
                            <li className="flex gap-3.25 items-start shrink-0 text-base font-normal leading-normal text-paragraph_white">
                                <svg className="mt-0.5 w-5 h-5 fill-current">
                                    <use href="#contactIcon-02"></use>
                                </svg>
                                <span className="flex-1">Competitive Rates: Starting as low as 8.99% APR.</span>
                            </li>
                            <li className="flex gap-3.25 items-start shrink-0 text-base font-normal leading-normal text-paragraph_white">
                                <svg className="mt-0.5 w-5 h-5 fill-current">
                                    <use href="#contactIcon-03"></use>
                                </svg>
                                <span className="flex-1">Total Transparency: No hidden fees, ever.</span>
                            </li>

                        </ul>
                        <div className="mt-6 sm:mt-7 lg:mt-9 flex flex-wrap gap-3" data-sttr-card>
                            <a className="button-primary" href="#loan-form">Apply Now</a>
                            <a className="button-autline-white" href="#loan-options">View Loan Types</a>
                        </div>

                    </div>
                    <div className="md:max-w-137.5 w-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden" data-sttr-card>
                        <img className="w-full object-cover aspect-616/528" src={bannerThumb} alt="apply-loan" />
                    </div>
                </div>
            </div>
            <span className="hidden" data-section-title></span>
        </section>
    </>
  )
}
