import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import { caseData } from "../../../data/caseData";

gsap.registerPlugin(ScrollTrigger);

export default function Cases() {

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
        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" data-sttr-wrapper>
                    
            {caseData.map((item, index)=>(
                <div data-sttr-card key={index}>
                    <div>
                        <div>
                            <Link to={`/case-study-post/${item.id}/${item.title.replace(/\s+/g, '-').toLowerCase()}`}>
                                <img src={item.img} alt={item.title} className="rounded-2xl object-cover w-full" />
                            </Link>
                        </div>
                        <div>
                            <ul className="pt-7 flex gap-3 flex-wrap">
                                <li>
                                    <span className="text-paragraph_black bg-background border border-border py-2 px-3 inline-block rounded-full text-sm leading-none duration-300 hover:bg-secondary hover:text-white">{item.tag}</span>
                                </li>
                                <li>
                                    <span className="text-paragraph_black bg-background border border-border py-2 px-3 inline-block rounded-full text-sm leading-none duration-300 hover:bg-secondary hover:text-white">{item.tag2}</span>
                                </li>
                                <li>
                                    <span className="text-paragraph_black bg-background border border-border py-2 px-3 inline-block rounded-full text-sm leading-none duration-300 hover:bg-secondary hover:text-white">{item.tag3}</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold">
                                <Link to={`/case-study-post/${item.id}/${item.title.replace(/\s+/g, '-').toLowerCase()}`} className="pt-4 inline-block text-title_black!">
                                    {item.title}
                                </Link>
                            </h3>
                            <p className="pt-3 text-paragraph_black line-clamp-2 leading-normal max-w-98.5">{item.desc}</p>
                        </div>

                    </div>
                </div>
            ))}

        </div>
    </>
  )
}
