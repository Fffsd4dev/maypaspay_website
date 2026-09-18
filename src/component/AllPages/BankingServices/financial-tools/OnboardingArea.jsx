import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import titleIcon from "../../../../assets/img/title-icon.svg";
import slide01 from "../../../../assets/img/financial-tools/slide-01.webp";
import slide02 from "../../../../assets/img/financial-tools/slide-02.webp";
import slide03 from "../../../../assets/img/financial-tools/slide-03.webp";

gsap.registerPlugin(ScrollTrigger);

export default function OnboardingArea() {

    const areas = [
        {
            img : slide01, 
            title : 'slider 01', 
        },
        {
            img : slide02, 
            title : 'slider 02', 
        },
        {
            img : slide03, 
            title : 'slider 03', 
        },
        {
            img : slide01, 
            title : 'slider 01', 
        },
        {
            img : slide02, 
            title : 'slider 02', 
        },
        {
            img : slide03, 
            title : 'slider 03', 
        },
        {
            img : slide02, 
            title : 'slider 02', 
        },
        {
            img : slide03, 
            title : 'slider 03', 
        }
    ];

    const sectionRef = useRef(null);
    const cardsRef = useRef(null);

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
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">SEAMLESS ONBOARDING</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>How to Use Guide Our Banking App and Web Portal</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Transitioning your financial life should never be a burden. We have engineered a three-step integration process.</p>
                </div>
                <div ref={cardsRef} className="relative" data-sttr-wrapper>
                    <div className="benefit-slider max-w-134 px-4 sm:px-6 relative" data-sttr-card>
                        
                        <Swiper
                            className="overflow-v"
                            modules={[Navigation, Autoplay, Pagination]}
                            spaceBetween={30}
                            slidesPerView={1}
                            loop={true}
                            loopAdditionalSlides={2}
                            centeredSlides={true}
                            autoHeight={true}
                            breakpoints={{
                                640: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                            navigation={{
                                nextEl: ".benefit-slider-button-next",
                                prevEl: ".benefit-slider-button-prev"
                            }}
                            pagination={{
                                el: ".benefit-slider-pagination",
                                type: "fraction"
                            }}
                            autoplay={true}
                            speed={1000}
                            onSlideChange={(swiper) => swiper.updateAutoHeight()}
                            onImagesReady={(swiper) => swiper.updateAutoHeight()}
                        >
                            
                            {areas.map((item, index)=>(
                                <SwiperSlide className="swiper-area" key={index}>
                                    <div className="relative overflow-hidden rounded-xl md:rounded-2xl">
                                        <img src={item.img} alt={item.title} />
                                        <Link className="video-popup w-10 md:w-12 h-10 md:h-12 rounded-full bg-white flex items-center justify-center text-title_black absolute top-1/2 left-1/2 transform -translate-1/2 z-2" to="https://www.youtube.com/embed/S_CGed6E610?si=8usIVmgCLNXWZE_K">
                                            <svg className="fill-current w-3.25 h-3.75">
                                                <use href="#playIcon"></use>
                                            </svg>
                                        </Link>
                                    </div>
                                </SwiperSlide>
                            ))}
                        
                        </Swiper>
                    </div>
                    {/* <!-- Slider Navigation --> */}
                    <div className="mt-9 flex w-36 mx-auto bg-white rounded-[100px] benifet-slide-navigation" data-sttr-card>
                        <button type="button" className="benefit-slider-button-prev text-title_black w-10.5 h-10 flex items-center justify-center" aria-label="Previous slide">
                            <svg className="w-2.25 h-3.75 fill-current">
                                <use href="#sliderLeft"></use>
                            </svg>
                        </button>
                        <div className="benefit-slider-pagination text-title_black font-semibold leading-none flex-1 flex items-center justify-center text-center"></div>
                        <button type="button" className="benefit-slider-button-next text-title_black w-10.5 h-10 flex items-center justify-center" aria-label="Next slide">
                            <svg className="w-2.25 h-3.75 fill-current">
                                <use href="#sliderRight"></use>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
