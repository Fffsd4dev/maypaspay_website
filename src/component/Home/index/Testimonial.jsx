import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../../assets/img/title-icon.svg";
import tmnlIcon01 from "../../../assets/img/home-v1/tmnl-list-icon-01.svg";
import tmnlIcon02 from "../../../assets/img/home-v1/tmnl-list-icon-02.svg";
import tmnlIcon03 from "../../../assets/img/home-v1/tmnl-list-icon-03.svg";
import client01 from "../../../assets/img/home-v1/client-01.webp";
import client02 from "../../../assets/img/home-v1/client-02.webp";
import client03 from "../../../assets/img/home-v1/client-03.webp";
import client04 from "../../../assets/img/home-v1/client-04.webp";
import client06 from "../../../assets/img/home-v1/client-06.webp";
import client07 from "../../../assets/img/home-v1/client-07.webp";
import testimonialShape from "../../../assets/img/home-v1/testimonial-shape.webp";
import quite from "../../../assets/img/home-v1/quite.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {

    const cardsRef = useRef(null);
    const autoScrollRef = useRef(null);

    const testimonials = [
        {
            img : client01, 
            name : 'Noah Reed', 
            title : 'Creative Director', 
            desc : 'Luctus nibh finibus facilisis dapibus etiam interdum tortor. Tincidunt nam porta elementum.',
        },
        {
            img : client02, 
            name : 'Marcus Thorne', 
            title : 'CEO, CloudScale Tech', 
            desc : 'SecureVest transformed how we manage our international payroll. Their real-time exchange rates saved us thousands in our first month alone.',
        },
        {
            img : client03, 
            name : 'Elena Rodriguez', 
            title : 'Founder, Bloom Digital', 
            desc : 'As a startup founder, I need a bank that moves at my speed. The SecureVest mobile interface is the most intuitive I"ve ever used for high-stakes wealth management.',
        },
        {
            img : client04, 
            name : 'Noah Reed', 
            title : 'Creative Director', 
            desc : 'Luctus nibh finibus facilisis dapibus etiam interdum tortor. Tincidunt nam porta elementum.',
        },
        {
            img : client06, 
            name : 'Sophia Al-Madi', 
            title : 'Co-Founder, GreenHorizon', 
            desc : 'Finally, a bank that understands the needs of a modern founder. Their automated financial tools have given me hours of my time back every week.',
        },
        {
            img : client07, 
            name : 'Jonathan Sterling', 
            title : 'Creative Director', 
            desc : 'Their dedicated wealth advisors provided the institutional stability we needed while maintaining the agility of a fintech partner.',
        }
    ];

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

    // Auto Scroll Columns
    useEffect(() => {

        const columns = autoScrollRef.current?.querySelectorAll(
            ".auto-scroll-content, .auto-scroll-content-reverse"
        );

        if (!columns?.length) return;

        const updateHeight = () => {

            columns.forEach((column) => {

                // Duplicate only once
                if (!column.dataset.cloned) {

                    column.dataset.cloned = "true";

                    [...column.children].forEach((item) => {
                        column.appendChild(item.cloneNode(true));
                    });

                }

                const originalCount = column.children.length / 2;

                const items = [...column.children].slice(0, originalCount);

                if (!items.length) return;

                const first = items[0];
                const last = items[items.length - 1];

                const gap = parseFloat(getComputedStyle(column).rowGap || 0);

                const distance =
                    last.offsetTop +
                    last.offsetHeight -
                    first.offsetTop +
                    gap;

                column.style.setProperty(
                    "--auto-scroll-distance",
                    `${distance}px`
                );

                column.style.animationPlayState = "running";

            });

        };

        updateHeight();

        window.addEventListener("load", updateHeight);
        window.addEventListener("resize", updateHeight);

        return () => {
            window.removeEventListener("load", updateHeight);
            window.removeEventListener("resize", updateHeight);
        };

    }, []);

  return (
    <>
        <section className="section-spacing-lg">
            <div className="container-lg">
                <div ref={cardsRef} className="flex items-center justify-between gap-10 flex-col md:flex-row" data-sttr-wrapper>
                    <div className="md:max-w-135 w-full" data-sttr-card>
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <p className="text-base sm:text-lg font-semibold leading-[1.1]! text-secondary capitalize">CLIENT SUCCESS STORIES</p>
                        </div>
                        <h3 className="font-bold leading-tight text-title_black mt-4" data-sttr-card>Trusted by the Next Gen. of Founders</h3>
                        <p className="mt-4 text-base sm:text-lg text-paragraph_black" data-sttr-card>At SecureVest, we empower the entrepreneurs of tomorrow with the capital, security, and strategic guidance they need to scale globally.</p>
                        <ul className="flex flex-col gap-4 mt-9" data-sttr-card>
                            <li className="text-base flex items-start gap-3">
                                <img className="w-5" src={tmnlIcon01} alt="testimonial icon 1" />
                                <span className="flex-1">Instant Capital Access: Apply for business credit lines and receive funding decisions in under 24 hours.</span>
                            </li>
                            <li className="text-base flex items-start gap-3">
                                <img className="w-5" src={tmnlIcon02} alt="testimonial icon 2" />
                                <span className="flex-1">Enterprise-Grade Security: Every account is protected by multi-factor biometric encryption and real-time fraud monitoring.</span>
                            </li>
                            <li className="text-base flex items-start gap-3">
                                <img className="w-5" src={tmnlIcon03} alt="testimonial icon 3" />
                                <span className="flex-1">Global Financial Network: Seamlessly manage multi-currency accounts and international transfers across 90+ countries.</span>
                            </li>
                        </ul>
                        <div className="flex mt-9" data-sttr-card>
                            <img className="w-12 h-12 rounded-full border border-primary" src={client01} alt="client-01" />
                            <img className="-ml-3 w-12 h-12 rounded-full border border-primary" src={client02} alt="client-02" />
                            <img className="-ml-3 w-12 h-12 rounded-full border border-primary" src={client03} alt="client-03" />
                            <img className="-ml-3 w-12 h-12 rounded-full border border-primary" src={client04} alt="client-04" />
                            <div className="-ml-3 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-title_black font-semibold leading-none text-sm">
                                5k+
                            </div>
                        </div>
                        <p className="mt-3 text-sm" data-sttr-card>Over 5,000+ Verified Professional Reviews</p>
                    </div>
                    <div ref={autoScrollRef} className="md:max-w-206 w-full grid sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-6 max-h-225 overflow-hidden relative">
                        <img className="absolute w-full h-[calc(100%+8px)] -top-1 bottom-0 left-0 right-0 z-1 pointer-events-none" src={testimonialShape} alt="testimonial-shape" />
                        <div className="flex flex-col gap-6 auto-scroll-content">
                            
                            {testimonials.map((item, index)=>(
                                <div className="p-5 sm:p-6 lg:p-8 bg-background border border-border rounded-2xl" key={index}>
                                    <img className="w-9.5" src={quite} alt="quite" />
                                    <h3 className="mt-4.25 text-title_black text-lg md:text-xl font-semibold">{item.desc}</h3>
                                    <div className="mt-5 sm:mt-6 flex items-center gap-3 sm:gap-4">
                                        <img className="w-15.5 h-15.5 rounded-full object-cover" src={item.img} alt={item.name} />
                                        <div className="">
                                            <p className="text-lg font-semibold leading-none text-title_black">{item.name}</p>
                                            <p className="mt-2 text-pragraph_black text-sm">{item.title}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                        <div className="hidden sm:flex md:hidden xl:flex flex-col gap-6 auto-scroll-content-reverse">
                            
                            {testimonials.map((item, index)=>(
                                <div className="p-5 sm:p-6 lg:p-8 bg-background border border-border rounded-2xl" key={index}>
                                    <img className="w-9.5" src={quite} alt="quite" />
                                    <h3 className="mt-4.25 text-title_black text-lg md:text-xl font-semibold">{item.desc}</h3>
                                    <div className="mt-5 sm:mt-6 flex items-center gap-3 sm:gap-4">
                                        <img className="w-15.5 h-15.5 rounded-full object-cover" src={item.img} alt={item.name} />
                                        <div className="">
                                            <p className="text-lg font-semibold leading-none text-title_black">{item.name}</p>
                                            <p className="mt-2 text-pragraph_black text-sm">{item.title}</p>
                                        </div>
                                    </div>
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
