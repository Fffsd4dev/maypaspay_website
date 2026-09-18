import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import contactFormBg from "../../../../assets/img/services/contact-form-bg.webp";
import contactForm1 from "../../../../assets/img/services/contact-form-1.webp";
import contactForm3 from "../../../../assets/img/services/contact-form-3.webp";
import contactForm4 from "../../../../assets/img/services/contact-form-4.webp";
import contactForm5 from "../../../../assets/img/services/contact-form-5.webp";
import bannerThumb from "../../../../assets/img/platform/banner-thumb.webp";

gsap.registerPlugin(ScrollTrigger);

export default function PlatformBanner() {

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
        <section className="py-14 md:py-20 lg:py-24 xl:px-31.25 bg-cover bg-center bg-no-repeat relative z-1 bg-secondary" style={{ backgroundImage: `url(${contactFormBg})` }}>
            <div ref={cardsRef} className="container" data-sttr-wrapper>
                <div className="flex flex-col md:flex-row gap-9">
                    <div className="max-w-135 w-full md:w-1/2">
                        <h1 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl text-title_white leading-tight!" data-sttr-card>Empowering your financial future</h1>
                        <p className="text-lg font-normal leading-normal text-paragraph_white mt-4" data-sttr-card>We help individuals and businesses grow wealth, reduce risk, and achieve long-term success.</p>

                        <ul className="flex flex-col gap-4 mt-9" data-sttr-card>
                            <li className="flex gap-3.25 items-start text-base font-normal leading-normal text-paragraph_white">
                                <svg className="mt-0.5 w-5 h-5 fill-current">
                                    <use href="#contactIcon-01"></use>
                                </svg>
                                <span className="flex-1">Scale engineering instantly: Ona Agents handle tasks securely to completion, no hand-holding required.</span>
                            </li>
                            <li className="flex gap-3.25 items-start shrink-0 text-base font-normal leading-normal text-paragraph_white">
                                <svg className="mt-0.5 w-5 h-5 fill-current">
                                    <use href="#contactIcon-02"></use>
                                </svg>
                                <span className="flex-1">One-click, always compliant environments: Ephemeral, policy enforced, and identical across every developer and Ona Agent.</span>
                            </li>
                            <li className="flex gap-3.25 items-start shrink-0 text-base font-normal leading-normal text-paragraph_white">
                                <svg className="mt-0.5 w-5 h-5 fill-current">
                                    <use href="#contactIcon-03"></use>
                                </svg>
                                <span className="flex-1">Seamless integrations: Connect to your repos, tools, and enterprise stack in seconds.</span>
                            </li>
                            <li className="flex gap-3.25 items-start shrink-0 text-base font-normal leading-normal text-paragraph_white">
                                <svg className="mt-0.5 w-5 h-5 fill-current">
                                    <use href="#contactIcon-04"></use>
                                </svg>
                                <span className="flex-1">Flexible deployment: Run Ona in our cloud or your VPC, whatever your compliance requires.</span>
                            </li>
                        </ul>
                        <div className="mt-9" data-sttr-card>
                            <div className="flex items-center">
                                <div className="border-[2.3px] border-primary overflow-hidden rounded-full bg-primary w-12.5 h-12.5">
                                    <img className="w-full h-full object-cover" src={contactForm1} alt="customer profile image 1" />
                                </div>
                                <div className="border-[2.3px] border-primary overflow-hidden rounded-full bg-primary w-12.5 h-12.5 -ml-4">
                                    <img className="w-full h-full object-cover" src={contactForm3} alt="customer profile image 2" />
                                </div>
                                <div className="border-[2.3px] border-primary overflow-hidden rounded-full bg-primary w-12.5 h-12.5 -ml-4">
                                    <img className="w-full h-full object-cover" src={contactForm4} alt="customer profile image 3" />
                                </div>
                                <div className="border-[2.3px] border-primary overflow-hidden rounded-full bg-primary w-12.5 h-12.5 -ml-4">
                                    <img className="w-full h-full object-cover" src={contactForm5} alt="customer profile image 4" />
                                </div>
                                <div className="-ml-4 ">
                                    <p className="text-sm font-semibold leading-none text-title_black border-[2.3px] border-primary w-12.5 h-12.5 bg-primary rounded-full flex items-center justify-center">5K+</p>
                                </div>
                            </div>
                            <p className="text-sm font-normal leading-none text-paragraph_white mt-3">Over 5,000+ Reviews</p>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 md:absolute md:top-1/2 right-0 md:transform md:-translate-y-1/2 -z-1 p-2 sm:p-3 md:pr-0! bg-white/10 border md:border-r-0 border-white/10 rounded-2xl md:rounded-l-2xl md:rounded-r-none!" data-sttr-card>
                        <img className="w-full rounded-xl md:rounded-l-xl md:rounded-r-none!" src={bannerThumb} alt="banner thumb" />
                    </div>
                </div>
            </div>
            <span className="hidden" data-section-title></span>
        </section>
    </>
  )
}
