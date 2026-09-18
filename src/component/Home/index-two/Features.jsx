import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import bgShape from "../../../assets/img/home-v2/feature/bg-shape.webp";
import titlePrimary from "../../../assets/img/title-icon-primary.svg";
import featureIcon01 from "../../../assets/img/home-v2/feature/feature-icon-01.svg";
import featureIcon02 from "../../../assets/img/home-v2/feature/feature-icon-02.svg";
import featureIcon03 from "../../../assets/img/home-v2/feature/feature-icon-03.svg";
import featureIcon04 from "../../../assets/img/home-v2/feature/feature-icon-04.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Features() {

    const features = [
        {
            img : featureIcon01, 
            title : 'Financial Efficiency', 
            desc : 'Get AI-powered analytics and real-time reports to make data-driven financial decisions effortlessly.',
        },
        {
            img : featureIcon02, 
            title : 'Scalable Infrastructure', 
            desc : 'Access the tools needed to manage high-volume transactions and expand your reach to new markets.',
        },
        {
            img : featureIcon03, 
            title : 'Multi-User Collaboration', 
            desc : 'Assign roles and manage team spending with granular permission controls and real-time activity tracking.',
        },
        {
            img : featureIcon04, 
            title : 'Vault-Level Protection', 
            desc : 'Utilize our data-driven system to monitor account integrity and ensure your assets remain secure 24/7.',
        }
    ];

    // GRID REVEAL
    useEffect(() => {

        const elements = document.querySelectorAll("[data-grid-reveal]");

        const animations = [];

        elements.forEach((element) => {

            const cols =
                parseInt(element.dataset.cols) || 12;

            const rows =
                parseInt(element.dataset.rows) || 12;

            const total = cols * rows;

            let masks = element.querySelector(".grid-reveal-masks");

            if (!masks) {

                masks = document.createElement("div");
                masks.className = "grid-reveal-masks";

                element.style.position = "relative";
                element.appendChild(masks);

            }

            masks.innerHTML = "";

            const items = [];

            for (let i = 0; i < total; i++) {

                const mask = document.createElement("div");

                mask.className = "grid-reveal-mask";

                mask.style.position = "absolute";
                mask.style.inset = 0;
                mask.style.background =
                    element.dataset.bgColor || "#ffffff";

                const x = (i % cols) * (100 / cols);
                const y = Math.floor(i / cols) * (100 / rows);

                mask.style.clipPath = `polygon(
                    ${x}% ${y}%,
                    ${x + (100 / cols)}% ${y}%,
                    ${x + (100 / cols)}% ${y + (100 / rows)}%,
                    ${x}% ${y + (100 / rows)}%
                )`;

                masks.appendChild(mask);

                items.push(mask);

            }

            gsap.set(items, {
                opacity: 1,
            });

            animations.push(

                gsap.to(items, {

                    opacity: 0,

                    duration:
                        Number(element.dataset.duration) || .5,

                    stagger:
                        Number(element.dataset.stagger) || .01,

                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: element,

                        start: () => {

                            // Desktop
                            if (window.innerWidth >= 1536) {
                                return "top center";
                            }

                            // Tablet
                            if (window.innerWidth >= 768) {
                                return "top 85%";
                            }

                            // Mobile
                            return "top 95%";
                        },

                        once: true,

                    },

                    onComplete: () => {
                        ScrollTrigger.refresh();
                    },

                })

            );

        });

        return () => {
            animations.forEach(animation => animation.kill());
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    }, []);

  return (
    <>
        <section className="section-spacing-lg-md">
            <div className="container-lg">
                <div className="pt-10 pb-4 px-4 sm:p-10 xl:p-18 2xl:p-25 bg-secondary rounded-2xl md:rounded-3xl relative z-1 overflow-hidden" data-grid-reveal data-cols="8" data-rows="8" data-cols-sm="5" data-rows-sm="12" data-cols-lg="8" data-rows-lg="8" data-animation="horizontal" data-bg-color="white" data-trigger="top 70%" data-stagger="0.006" data-duration="0.8" data-play-once="true">
                    <img className="w-full absolute bottom-0 select-none left-0 -z-1" src={bgShape} alt="background-shape" />
                    <div className="flex xl:items-start justify-between gap-10 flex-col lg:flex-row relative">
                        <div className="max-w-175 lg:max-w-135 w-full lg:self-start" data-sticky data-sticky-start="top 10%" data-sticky-end="bottom 0%" data-sticky-min-width="1025" data-sticky-max-width="1280">
                            <div className="flex items-center gap-2.5">
                                <img className="rotate" src={titlePrimary} alt="title-icon" />
                                <p className="text-base sm:text-lg font-semibold leading-[1.1]! text-primary capitalize">CORE BANKING FEATURES</p>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4">Trusted by the Next Gen. of Founders</h2>
                            <p className="mt-4 text-base sm:text-lg text-paragraph_white">We provide modern entrepreneurs with the digital tools, high-speed security, and financial clarity needed to scale business operations globally.</p>
                            <ul className="flex flex-col gap-4 mt-9 text-paragraph_white">
                                <li className="text-base flex items-start gap-3">
                                    <svg className="w-5 h-5 fill-current mt-1">
                                        <use href="#tmnlList-01"></use>
                                    </svg>
                                    <span className="flex-1">Instant Capital Access: Apply for business credit lines and receive funding decisions in under 24 hours.</span>
                                </li>
                                <li className="text-base flex items-start gap-3">
                                    <svg className="w-5 h-5 fill-current mt-1">
                                        <use href="#tmnlList-02"></use>
                                    </svg>
                                    <span className="flex-1">Enterprise-Grade Security: Every account is protected by multi-factor biometric encryption and real-time fraud monitoring.</span>
                                </li>
                                <li className="text-base flex items-start gap-3">
                                    <svg className="w-5 h-5 fill-current mt-1">
                                        <use href="#tmnlList-03"></use>
                                    </svg>
                                    <span className="flex-1">Global Financial Network: Seamlessly manage multi-currency accounts and international transfers across 90+ countries.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="lg:max-w-165 w-full grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 max-xl:flex-1">
                            
                            {features.map((item, index)=>(
                                <div className="p-5 sm:p-6 lg:p-8 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-[34px]" key={index}>
                                    <img className="w-12" src={item.img} alt="feature icon" />
                                    <h3 className="mt-6 md:mt-9 text-lg md:text-xl font-semibold text-white">{item.title}</h3>
                                    <p className="mt-3 text-base text-paragraph_white">{item.desc}</p>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
