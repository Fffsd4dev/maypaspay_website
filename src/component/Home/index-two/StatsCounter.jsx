import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import counter1 from "../../../assets/img/home-v2/counter-img/counter-1.webp";
import counter2 from "../../../assets/img/home-v2/counter-img/counter-2.webp";

gsap.registerPlugin(ScrollTrigger);

export default function StatsCounter() {

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

    // Counter Animation
    useEffect(() => {

        if (!cardsRef.current) return;

        const counters = cardsRef.current.querySelectorAll(".counter");

        const animateCounter = (counter) => {

            if (counter.dataset.animated) return;

            counter.dataset.animated = "true";

            const target = Number(counter.dataset.target) || 0;

            const textNode = counter.childNodes[0]; // only number

            const start = performance.now();

            const duration = 2000;

            const update = (time) => {

                const progress = Math.min((time - start) / duration, 1);

                const eased = 1 - Math.pow(1 - progress, 4);

                const value = Math.floor(target * eased);

                if (textNode) {
                    textNode.textContent = value;
                } else {
                    counter.textContent = value;
                }

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    if (textNode) {
                        textNode.textContent = target;
                    } else {
                        counter.textContent = target;
                    }
                }

            };

            requestAnimationFrame(update);

        };

        const trigger = ScrollTrigger.create({

            trigger: cardsRef.current,

            start: "top 75%",

            once: true,

            onEnter: () => {
                counters.forEach(animateCounter);
            }

        });

        return () => trigger.kill();

    }, []);

  return (
    <>
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8" data-sttr-wrapper>
            <div className="sm:col-span-2" data-sttr-card>
                <img src={counter1} alt="counter image" className="rounded-lg md:rounded-2xl object-cover aspect-835/310 w-full h-full" />
            </div>
            <div className="bg-secondary p-5 sm:p-8 rounded-2xl flex flex-col justify-between gap-5" data-sttr-card>
                <div className="flex items-start gap-1">
                    <h2 className="counter text-primary font-bold leading-[1.1] text-4xl sm:text-[40px] md:text-5xl lg:text-[52px] xl:text-[64px]" data-target="80">0<span className="text-primary font-bold leading-[1.1]">%</span>
                    </h2>
                </div>
                <div>
                    <h3 className="text-white text-xl md:text-2xl font-semibold">
                        Unexpected Fee Structure
                    </h3>

                    <p className="pt-3 sm:pt-4 text-white/80 text-base leading-normal">
                        Experience complete transparency with zero hidden costs, ensuring your capital.
                    </p>
                </div>
            </div>
            <div className="bg-[#621348] p-5 sm:p-8 rounded-2xl flex flex-col justify-between gap-5" data-sttr-card>
                <div className="flex items-start gap-1">
                    <h2 className="counter text-primary font-bold leading-[1.1] text-4xl sm:text-[40px] md:text-5xl lg:text-[52px] xl:text-[64px]" data-target="100">0</h2>
                    <h2 className="text-primary font-bold leading-[1.1] text-4xl sm:text-[40px] md:text-5xl lg:text-[52px] xl:text-[64px]">K</h2>
                </div>
                <div>
                    <h3 className="text-white text-xl md:text-2xl font-semibold">
                        Global Enterprise Clients
                    </h3>

                    <p className="pt-3 sm:pt-4 text-white/80 text-base leading-[1.5]">
                        Empowering over 100,000 corporate entities with seamless cross-border.
                    </p>
                </div>
            </div>

            <div data-sttr-card>
                <img src={counter2} alt="counter image" className="rounded-lg md:rounded-2xl object-cover aspect-410/310 w-full h-full" />
            </div>

            <div className="bg-[#14265C] p-5 sm:p-8 rounded-2xl flex flex-col justify-between gap-5" data-sttr-card>
                <div className="flex items-start gap-1">
                    <h2 className="counter text-primary font-bold leading-[1.1] text-4xl sm:text-[40px] md:text-5xl lg:text-[52px] xl:text-[64px]" data-target="95">0</h2>
                    <h2 className="text-primary font-bold leading-[1.1] text-4xl sm:text-[40px] md:text-5xl lg:text-[52px] xl:text-[64px]">%</h2>
                </div>
                <div>
                    <h3 className="text-white text-xl md:text-2xl font-semibold">
                        Faster Capital Approval
                    </h3>

                    <p className="pt-3 sm:pt-4 text-white/80 text-base leading-[1.5]">
                        Our streamlined underwriting process reduces traditional wait times by 95%.
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}
