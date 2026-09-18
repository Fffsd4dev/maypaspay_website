import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import Grow from "../../../Home/index/Grow";

import contactFormBg from "../../../../assets/img/services/contact-form-bg.webp";
import titlePrimary from "../../../../assets/img/title-icon-primary.svg";

gsap.registerPlugin(ScrollTrigger);

export default function LoanBanner() {

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
            <div className="container">
                <div ref={cardsRef} className="flex items-center flex-col md:flex-row justify-between gap-8 sm:gap-10" data-sttr-wrapper>
                    <div className="md:max-w-135 w-full">
                        <div className="flex items-center gap-2.5" data-sttr-card>
                            <img className="rotate" src={titlePrimary} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">QUICK CHECK</span>
                        </div>
                        <h1 className="mt-4 text-3xl md:text-4xl lg:text-[40px] xl:text-5xl text-title_white leading-tight!" data-sttr-card>See What You Can Borrow in 60 Seconds</h1>
                        <p className="text-lg font-normal leading-normal text-paragraph_white mt-4" data-sttr-card>Get a real-time estimate of your borrowing power without affecting your credit score. Our soft-pull technology ensures your financial standing remains protected while you explore your options.</p>
                        <div className="mt-6 sm:mt-7 lg:mt-9 flex flex-wrap gap-3" data-sttr-card>
                            <Link className="button-primary" to="/apply-loan">Check Full Eligibility</Link>
                            <a className="button-autline-white" href="#documentation">How It Works</a>
                        </div>
                    </div>
                    <div className="md:max-w-129.25 w-full" data-sttr-card>
                        
                        <Grow />

                    </div>			

                </div>
            </div>
        </section>

        <span className="hidden" data-section-title></span>
    </>
  )
}
