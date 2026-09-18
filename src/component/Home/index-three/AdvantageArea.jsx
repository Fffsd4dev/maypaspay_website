import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger, SplitText);

import IntegretionBg from "../../../assets/img/home-v1/Integretion-bg.webp";
import titlePrimary from "../../../assets/img/title-icon-primary.svg";
import advantageThumb from "../../../assets/img/home-v3/advantage-thumb.webp";

export default function AdvantageArea() {

    const sectionRef = useRef(null);

    // Animation effect
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const ctx = gsap.context(() => {
            const icon = section.querySelector("img.rotate");
            const span = section.querySelector("span");
            const heading = section.querySelector("h3[data-content]");
            const paragraph = section.querySelector("p[data-content]");
            const button = section.querySelector(".btn-sttr");
            const thumbnail = section.querySelector(".thumbnail-img");

            let splitSpan, splitHeading, splitParagraph;

            try {
                if (span) {
                    splitSpan = new SplitText(span, {
                        type: "lines, words, chars",
                        mask: "lines",
                        linesClass: "line",
                        wordsClass: "word",
                        charsClass: "letter",
                    });
                }
                if (heading) {
                    splitHeading = new SplitText(heading, {
                        type: "lines, words, chars",
                        mask: "lines",
                        linesClass: "line",
                        wordsClass: "word",
                        charsClass: "letter",
                    });
                }
                if (paragraph) {
                    splitParagraph = new SplitText(paragraph, {
                        type: "lines, words, chars",
                        mask: "lines",
                        linesClass: "line",
                        wordsClass: "word",
                        charsClass: "letter",
                    });
                }
            } catch (e) {
                console.warn("SplitText error:", e);
            }

            if (icon) {
                gsap.set(icon, {
                    scale: 0,
                    opacity: 0,
                    rotation: -180,
                    transformOrigin: "center center",
                });
            }

            if (splitSpan && splitSpan.chars && splitSpan.chars.length) {
                gsap.set(splitSpan.chars, { yPercent: 110 });
            }
            if (splitHeading && splitHeading.words && splitHeading.words.length) {
                gsap.set(splitHeading.words, { yPercent: 110 });
            }
            if (splitParagraph && splitParagraph.lines && splitParagraph.lines.length) {
                gsap.set(splitParagraph.lines, { yPercent: 110 });
            }

            if (thumbnail) {
                gsap.set(thumbnail, {
                    y: 50,
                    opacity: 0,
                    scale: 0.95,
                    filter: "blur(10px)",
                });
            }

            if (button) {
                gsap.set(button, { y: 50, opacity: 0 });
            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    once: true,
                    invalidateOnRefresh: true,
                },
            });

            // Icon
            if (icon) {
                tl.to(icon, {
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: 0.8,
                    ease: typeof window.CustomEase !== "undefined" ? "osmo-ease" : "power3.out",
                });
            }

            // SplitText span
            if (splitSpan && splitSpan.chars && splitSpan.chars.length) {
                tl.fromTo(
                    splitSpan.chars,
                    { yPercent: 110 },
                    {
                        yPercent: 0,
                        duration: 0.4,
                        stagger: 0.008,
                        ease: typeof window.CustomEase !== "undefined" ? "osmo-ease" : "power3.out",
                    },
                    "-=0.8"
                );
            }

            // SplitText heading
            if (splitHeading && splitHeading.words && splitHeading.words.length) {
                tl.fromTo(
                    splitHeading.words,
                    { yPercent: 110 },
                    {
                        yPercent: 0,
                        duration: 0.6,
                        stagger: 0.06,
                        ease: typeof window.CustomEase !== "undefined" ? "osmo-ease" : "power3.out",
                    },
                    "-=0.6"
                );
            }

            // SplitText paragraph
            if (splitParagraph && splitParagraph.lines && splitParagraph.lines.length) {
                tl.fromTo(
                    splitParagraph.lines,
                    { yPercent: 110 },
                    {
                        yPercent: 0,
                        duration: 0.6,
                        stagger: 0.06,
                        ease: typeof window.CustomEase !== "undefined" ? "osmo-ease" : "power3.out",
                    },
                    "-=0.5"
                );
            }

            // Button
            if (button) {
                tl.to(
                    button,
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.6,
                        ease: typeof window.CustomEase !== "undefined" ? "osmo-ease" : "power3.out",
                    },
                    "-=0.4"
                );
            }

            // Thumbnail image
            if (thumbnail) {
                tl.to(
                    thumbnail,
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        filter: "blur(0px)",
                        duration: 0.8,
                        ease: typeof window.CustomEase !== "undefined" ? "osmo-ease" : "power3.out",
                    },
                    "-=0.8"
                );
            }
        }, sectionRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.vars.trigger === section) {
                    trigger.kill();
                }
            });
        };
    }, []);

    return (
        <>
            <section ref={sectionRef} className="relative z-1 overflow-hidden" data-borderless-banking>
                <img className="absolute top-0 left-0 w-full h-full object-cover -z-1" src={IntegretionBg} alt="Integration" />
                <div className="container">
                    <div className="flex items-center sm:items-end sm:justify-between gap-6 flex-col sm:flex-row">
                        <div className="sm:max-w-155.75 w-full pt-14 sm:py-20 lg:py-24 xl:py-27.5 2xl:py-36.25">
                            <div className="flex items-center gap-2.5">
                                <img className="rotate" src={titlePrimary} alt="title-icon" />
                                <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">THE SECUREVEST ADVANTAGE</span>
                            </div>
                            <h3 className="font-bold leading-tight text-title_white mt-4" data-content>Ready to Architect Your Financial Future?</h3>
                            <p className="mt-4 text-base sm:text-lg text-paragraph_white" data-content>At SecureVest, we empower the entrepreneurs of tomorrow with the capital, security, and strategic guidance they need to scale globally.</p>
                            <div className="mt-6 md:mt-9 btn-sttr">
                                <Link className="button-primary" to="/contact">
                                    Schedule Your Consultation
                                    <svg className="w-3 h-3 fill-current">
                                        <use href="#buttonArrow"></use>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                        <div className="max-w-132.75 w-full thumbnail-img">
                            <img className="w-full" src={advantageThumb} alt="advantage-thumb" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
