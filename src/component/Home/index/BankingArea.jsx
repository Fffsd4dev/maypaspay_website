import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import bannerBg from "../../../assets/img/banner/banner-bg.webp";
import bannerStar01 from "../../../assets/img/banner/banner-star-shape-01.svg";
import bannerStar02 from "../../../assets/img/banner/banner-star-shape-02.svg";
import titlePrimary from "../../../assets/img/title-icon-primary.svg";
import blankPosition from "../../../assets/img/home-v1/card/blank-position.webp";
import cardX3 from "../../../assets/img/home-v1/card/card-x-3.webp";
import cardX2 from "../../../assets/img/home-v1/card/card-x-2.webp";
import cardX1 from "../../../assets/img/home-v1/card/card-x-1.webp";
import bankingCards from "../../../assets/img/home-v1/banking-cards.webp";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function BankingArea() {

    const sectionRef = useRef(null);

    useEffect(() => {

        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {

            const icon = sectionRef.current.querySelector(".rotate");
            const subtitle = sectionRef.current.querySelector("span");
            const heading = sectionRef.current.querySelector("h3[data-content]");
            const paragraph = sectionRef.current.querySelector("p[data-content]");
            const button = sectionRef.current.querySelector(".btn-sttr");

            const mobileImage =
                sectionRef.current.querySelector(".thumbnail-img");

            const desktopCards =
                sectionRef.current.querySelector(".thumb-animated");

            const card1 =
                sectionRef.current.querySelector(".item-1");

            const card2 =
                sectionRef.current.querySelector(".item-2");

            const card3 =
                sectionRef.current.querySelector(".item-3");

            let splitTitle = null;
            let splitHeading = null;
            let splitParagraph = null;

            try {
                if (subtitle) {
                    splitTitle = SplitText.create(subtitle, {
                        type: "chars",
                    });
                }

                if (heading) {
                    splitHeading = SplitText.create(heading, {
                        type: "words",
                    });
                }

                if (paragraph) {
                    splitParagraph = SplitText.create(paragraph, {
                        type: "lines",
                    });
                }

            } catch (error) {
                console.log(error);
            }

            if (icon) {
                gsap.set(icon, {
                    scale: 0,
                    opacity: 0,
                    rotation: -180,
                });
            }

            if (splitTitle) {
                gsap.set(splitTitle.chars, {
                    yPercent: 110,
                });
            }

            if (splitHeading) {
                gsap.set(splitHeading.words, {
                    yPercent: 110,
                });
            }

            if (splitParagraph) {
                gsap.set(splitParagraph.lines, {
                    yPercent: 110,
                });
            }

            gsap.set([mobileImage, desktopCards], {
                y: 50,
                opacity: 0,
                scale: .95,
                filter: "blur(10px)",
            });

            gsap.set(button, {
                y: 40,
                opacity: 0,
            });

            if (card1 && card2 && card3) {

                gsap.set([card1, card2, card3], {
                    rotation: 45,
                    skewX: -20,
                    opacity: 1,
                });

            }

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            if (icon) {
                tl.to(icon, {
                    scale: 1,
                    opacity: 1,
                    rotation: 0,
                    duration: .8,
                    ease: "power3.out",

                });

            }

            if (desktopCards) {
                tl.to(desktopCards, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: .8,
                    ease: "power3.out",
                }, "-=.8");

            }

            if (splitTitle) {
                tl.to(splitTitle.chars, {
                    yPercent: 0,
                    stagger: .01,
                    duration: .4,
                    ease: "power3.out",
                }, "-=.6");

            }

            if (splitHeading) {
                tl.to(splitHeading.words, {
                    yPercent: 0,
                    stagger: .05,
                    duration: .6,
                    ease: "power3.out",
                }, "-=.4");
            }

            if (splitParagraph) {
                tl.to(splitParagraph.lines, {
                    yPercent: 0,
                    stagger: .06,
                    duration: .6,
                    ease: "power3.out",
                }, "-=.4");

            }

            if (button) {
                tl.to(button, {
                    y: 0,
                    opacity: 1,
                    duration: .6,
                }, "-=.3");
            }

            if (mobileImage) {
                tl.to(mobileImage, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: .8,
                }, "-=.6");

            }

            if (card1 && card2 && card3) {
                gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 50%",
                        end: "top 20%",
                        scrub: .5,
                    },
                })

                .to(card3, {
                    rotation: 85,
                    skewX: -10,
                    skewY: -7,
                    y: -55,
                    x: 10,
                }, 0)

                .to(card2, {
                    rotation: 67,
                    skewX: -15,
                    skewY: -3,
                }, 0)

                .to(card1, {
                    rotation: 70,
                    skewX: -5,
                    skewY: -22,
                    y: 20,
                    x: -15,
                }, 0);

            }

        }, sectionRef);

        return () => ctx.revert();

    }, []);

  return (
    <section className="py-15 bg-secondary relative z-1">
		<img className="absolute -z-1 w-full h-full top-0 left-0" src={bannerBg} alt="banner-shape" />
		<img className="absolute -z-1 top-[12%] left-[12%] rotate hidden xl:block" src={bannerStar01} alt="banner-shape" />
		<img className="absolute -z-1 top-[5%] right-[10%] rotate" src={bannerStar02} alt="banner-shape" />
		<div className="container">
			<div ref={sectionRef} className="flex items-center justify-between gap-10 flex-col md:flex-row" data-borderless-banking>
				<div className="md:max-w-135 w-full md:py-5 lg:py-8 xl:py-10">
					<div className="flex items-center gap-2.5">
						<img className="rotate" src={titlePrimary} alt="title-icon" />
						<span className="text-base md:text-lg font-semibold leading-[1.1]! text-primary capitalize">BORDERLESS BANKING</span>
					</div>
					<h3 className="font-bold leading-tight text-white mt-4" data-content>One card for all your global journeys</h3>
					<p className="mt-4 sm:mt-5 text-base sm:text-lg text-paragraph_white" data-content>Unlock the power of instant multi-currency accounts. Swap between USD, EUR, GBP, and more in seconds with the highest security standards in the industry.</p>
					<div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 btn-sttr">
						<Link className="button-primary" to="/contact">Get Your Card</Link>
					</div>
				</div>
				<div className="max-w-165 w-full relative xl:block hidden thumb-animated">
					<img src={blankPosition} alt="banking-cards" />
					<img className="item-1 absolute bottom-0 left-0 max-w-[calc(100%-220px)]" src={cardX3} alt="banking-cards" />
					<img className="item-2 absolute bottom-0 left-0 max-w-[calc(100%-220px)]" src={cardX2} alt="banking-cards" />
					<img className="item-3 absolute bottom-0 left-0 max-w-[calc(100%-220px)]" src={cardX1} alt="banking-cards" />
				</div>
				<div className="max-w-112.5 max-md:mx-auto md:max-w-165 w-full relative xl:hidden block thumbnail-img">
					<img src={bankingCards} alt="banking-cards" />
				</div>
			</div>
		</div>
	</section>
  )
}
