import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/pagination';

import titleIcon from "../../../../assets/img/title-icon.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Loans() {

    const loans = [
        {
            icon : '#loan-option-icon-01', 
            icon_class : 'bg-[#114A43]', 
            title : 'Personal Loans', 
            desc : 'Flexible funds for weddings, travel, or debt consolidation with zero collateral.', 
        },
        {
            icon : '#loan-option-icon-02', 
            icon_class : 'bg-[#14265C]', 
            title : 'Business Growth', 
            desc : 'Fuel your expansion with higher credit limits and flexible repayment based on cash flow.', 
        },
        {
            icon : '#loan-option-icon-03', 
            icon_class : 'bg-[#621348]', 
            title : 'Home/Mortgage', 
            desc : 'Secure your dream home with competitive long-term rates and expert guidance.', 
        },
        {
            icon : '#loan-option-icon-04', 
            icon_class : 'bg-[#4878B5]', 
            title : 'Equipment Financing', 
            desc : 'Specialized capital to acquire high-value machinery, technology, or vehicles.', 
        },
        {
            icon : '#loan-option-icon-01', 
            icon_class : 'bg-[#114A43]', 
            title : 'Personal Loans', 
            desc : 'Flexible funds for weddings, travel, or debt consolidation with zero collateral.', 
        },
        {
            icon : '#loan-option-icon-02', 
            icon_class : 'bg-[#14265C]', 
            title : 'Business Growth', 
            desc : 'Fuel your expansion with higher credit limits and flexible repayment based on cash flow.', 
        },
        {
            icon : '#loan-option-icon-03', 
            icon_class : 'bg-[#621348]', 
            title : 'Home/Mortgage', 
            desc : 'Secure your dream home with competitive long-term rates and expert guidance.', 
        },
        {
            icon : '#loan-option-icon-04', 
            icon_class : 'bg-[#4878B5]', 
            title : 'Equipment Financing', 
            desc : 'Specialized capital to acquire high-value machinery, technology, or vehicles.', 
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
        <section className="section-spacing-lg-md" id="loan-options">
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titleIcon} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">LOAN OPTIONS</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Loan Categories Available for You, Check Yours.</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Explore our range of specialized financial products. Whether you are buying a home, starting a business, or managing personal expenses.</p>
                </div>		
                <div ref={cardsRef} data-sttr-wrapper>
                    
                    <Swiper
                        modules={[Pagination]}
                        slidesPerView={1}
                        spaceBetween={24}
                        pagination={{
                            el: '.loan-option-slider-pagination',
                            type: 'progressbar',
                        }}
                        breakpoints={{
                            480: { slidesPerView: 1 },
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 3 },
                            1536: { slidesPerView: 3 },
                        }}
                        className="loan-option-slider overflow-v"
                        data-sttr-card
                    >
                        {loans.map((item, index)=>(
                            <SwiperSlide key={index}>
                                <div className={`p-6 md:p-8 rounded-xl sm:rounded-2xl ${item.icon_class}`}>
                                    <svg className="w-10 sm:w-12.5 h-10 sm:h-12.5">
                                        <use href={item.icon}></use>
                                    </svg>
                                    <h3 className="mt-6 md:mt-9 text-xl md:text-2xl font-semibold text-white leading-none!">{item.title}</h3>
                                    <p className="mt-3 text-paragraph_white">{item.desc}</p>
                                    <Link to="/contact" className="mt-5 sm:mt-6 inline-flex items-center gap-2.5 text-base font-semibold text-white duration-300 hover:text-primary">
                                        Learn More
                                        <svg className="w-4 h-4 fill-current">
                                            <use href="#tabArrow"></use>
                                        </svg>
                                    </Link>
                                </div>				
                            </SwiperSlide>
                        ))}

                    </Swiper>
                    <div className="loan-option-slider-pagination relative! overflow-hidden mt-8 md:mt-9 !h-2 bg-background rounded-lg"></div>
                </div>
            </div>
        </section>
    </>
  )
}
