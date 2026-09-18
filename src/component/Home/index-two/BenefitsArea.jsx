import { useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

import benefisBgShape from "../../../assets/img/home-v2/benefis-bg-shape.webp";
import titlePrimary from "../../../assets/img/title-icon-primary.svg";
import benefit01 from "../../../assets/img/home-v1/benefit/benefit-01.webp";
import benefit01Mobile from "../../../assets/img/home-v1/benefit/benefit-01-mobile.webp";
import benefit02 from "../../../assets/img/home-v1/benefit/benefit-02.webp";
import benefit02Mobile from "../../../assets/img/home-v1/benefit/benefit-02-mobile.webp";
import benefit03 from "../../../assets/img/home-v1/benefit/benefit-03.webp";
import benefit03Mobile from "../../../assets/img/home-v1/benefit/benefit-03-mobile.webp";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function BenefitsArea() {

    const sectionRef = useRef(null);
    const titleWrapperRef = useRef(null);
    const cardsWrapperRef = useRef(null);
    const sliderWrapperRef = useRef(null);
    const cursorRef = useRef(null);

    // ----- SECTION TITLE & CARDS ANIMATIONS -----
    useEffect(() => {
        if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

        const ctx = gsap.context(() => {
            // ----- 1. TITLE ANIMATION -----
            const titleEl = titleWrapperRef.current;
            if (titleEl && !titleEl.dataset.bannerAnimated) {
                const icon = titleEl.querySelector('img.rotate');
                const span = titleEl.querySelector('span');
                const heading = titleEl.querySelector('h2[data-content]');
                const paragraph = titleEl.querySelector('p[data-content]');

                let splitSpan, splitHeading, splitParagraph;

                try {
                    if (span) splitSpan = new SplitText(span, {
                        type: 'lines, words, chars',
                        mask: 'lines',
                        linesClass: 'line',
                        wordsClass: 'word',
                        charsClass: 'letter',
                    });
                    if (heading) splitHeading = new SplitText(heading, {
                        type: 'lines, words, chars',
                        mask: 'lines',
                        linesClass: 'line',
                        wordsClass: 'word',
                        charsClass: 'letter',
                    });
                    if (paragraph) splitParagraph = new SplitText(paragraph, {
                        type: 'lines, words, chars',
                        mask: 'lines',
                        linesClass: 'line',
                        wordsClass: 'word',
                        charsClass: 'letter',
                    });
                } catch (e) { console.warn('SplitText error:', e); }

                if (icon) gsap.set(icon, { scale: 0, opacity: 0, rotation: -180, transformOrigin: 'center center' });
                if (splitSpan && splitSpan.chars) gsap.set(splitSpan.chars, { yPercent: 110 });
                if (splitHeading && splitHeading.words) gsap.set(splitHeading.words, { yPercent: 110 });
                if (splitParagraph && splitParagraph.lines) gsap.set(splitParagraph.lines, { yPercent: 110 });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: titleEl,
                        start: 'top 75%',
                        once: true,
                        invalidateOnRefresh: true,
                    },
                });

                tl.set(titleEl, { visibility: 'visible', opacity: 1 }, 0);

                if (icon) {
                    tl.to(icon, {
                        scale: 1,
                        opacity: 1,
                        rotation: 0,
                        duration: 1,
                        ease: typeof window.CustomEase !== 'undefined' ? 'osmo-ease' : 'power3.out',
                    }, 0);
                }

                if (splitSpan && splitSpan.chars && splitSpan.chars.length) {
                    tl.fromTo(splitSpan.chars, { yPercent: 110 }, {
                        yPercent: 0,
                        duration: 0.4,
                        stagger: 0.008,
                        ease: typeof window.CustomEase !== 'undefined' ? 'osmo-ease' : 'power3.out',
                    }, '-=0.8');
                }

                if (splitHeading && splitHeading.words && splitHeading.words.length) {
                    tl.fromTo(splitHeading.words, { yPercent: 110 }, {
                        yPercent: 0,
                        duration: 0.6,
                        stagger: 0.06,
                        ease: typeof window.CustomEase !== 'undefined' ? 'osmo-ease' : 'power3.out',
                    }, '-=0.6');
                }

                if (splitParagraph && splitParagraph.lines && splitParagraph.lines.length) {
                    tl.fromTo(splitParagraph.lines, { yPercent: 110 }, {
                        yPercent: 0,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: typeof window.CustomEase !== 'undefined' ? 'osmo-ease' : 'power3.out',
                    }, '-=0.5');
                }

                titleEl.dataset.bannerAnimated = 'true';
            }

            // ----- 2. CARDS ANIMATION -----
            const cardsWrapper = cardsWrapperRef.current;
            if (cardsWrapper && !cardsWrapper.dataset.bannerAnimated) {
                const cards = cardsWrapper.querySelectorAll('[data-sttr-card]');
                if (cards.length) {
                    gsap.set(cardsWrapper, { visibility: 'visible', opacity: 1 });

                    const tl = gsap.timeline({ paused: true });
                    cards.forEach((card) => {
                        gsap.set(card, { force3D: true, willChange: 'transform, opacity, filter' });
                        tl.fromTo(card,
                            { y: 50, opacity: 0, filter: 'blur(10px)', force3D: true },
                            {
                                y: 0,
                                opacity: 1,
                                filter: 'blur(0px)',
                                ease: 'power3.out',
                                duration: 0.6,
                                force3D: true,
                            },
                            '-=0.4'
                        );
                    });

                    ScrollTrigger.create({
                        trigger: cardsWrapper,
                        start: 'top 75%',
                        end: 'top 20%',
                        animation: tl,
                        toggleActions: 'play none none none',
                        invalidateOnRefresh: true,
                    });

                    cardsWrapper.dataset.bannerAnimated = 'true';
                }
            }

            // ----- 3. DRAG CURSOR -----
            const wrapper = sliderWrapperRef.current;
            const cursor = cursorRef.current;
            if (wrapper && cursor && typeof gsap !== 'undefined') {
                let active = false;
                const interactiveElements = wrapper.querySelectorAll('a, button, [role="button"]');

                const getPosition = (e) => {
                    const rect = wrapper.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const bw = cursor.offsetWidth;
                    const bh = cursor.offsetHeight;
                    return {
                        x: Math.min(Math.max(x - bw / 2, 0), rect.width - bw),
                        y: Math.min(Math.max(y - bh / 2, 0), rect.height - bh),
                    };
                };

                const enter = (e) => {
                    if (!active) {
                        active = true;
                        const pos = getPosition(e);
                        gsap.set(cursor, { left: pos.x + 'px', top: pos.y + 'px', xPercent: 0, yPercent: 0, scale: 0, opacity: 0 });
                        gsap.to(cursor, { opacity: 1, scale: 1.2, duration: 0.3, ease: 'back.out(1.7)' });
                    }
                };

                const leave = () => {
                    if (active) {
                        active = false;
                        gsap.to(cursor, { opacity: 0, scale: 0, duration: 0.3, ease: 'power2.out' });
                    }
                };

                gsap.set(cursor, { xPercent: -50, yPercent: -50, left: '50%', top: '50%', scale: 0, opacity: 0 });

                const onMove = (e) => {
                    if (!active) return;
                    const pos = getPosition(e);
                    gsap.to(cursor, {
                        left: pos.x + 'px',
                        top: pos.y + 'px',
                        xPercent: 0,
                        yPercent: 0,
                        duration: 0.3,
                        ease: 'power2.out',
                    });
                };

                wrapper.addEventListener('mousemove', onMove);
                wrapper.addEventListener('mouseenter', enter);
                wrapper.addEventListener('mouseleave', leave);

                interactiveElements.forEach((el) => {
                    if (el === cursor) return;
                    el.addEventListener('mouseenter', () => { leave(); });
                    el.addEventListener('mouseleave', (e) => {
                        const rect = wrapper.getBoundingClientRect();
                        const x = e.clientX,
                            y = e.clientY;
                        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
                            enter(e);
                        }
                    });
                });

                return () => {
                    wrapper.removeEventListener('mousemove', onMove);
                    wrapper.removeEventListener('mouseenter', enter);
                    wrapper.removeEventListener('mouseleave', leave);
                    interactiveElements.forEach((el) => {
                        el.removeEventListener('mouseenter', leave);
                    });
                };
            }
        }, sectionRef);

        return () => {
            ctx.revert();
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof ScrollTrigger !== 'undefined') ScrollTrigger.refresh();
        }, 200);
        return () => clearTimeout(timer);
    }, []);

  return (
    <>
        <section ref={sectionRef} className="section-spacing-lg bg-secondary relative z-1">
            <img src={benefisBgShape} alt="benefits-bg-shape" className="absolute top-0 left-0 -z-1 w-full h-full object-cover" />
            <div className="container">
                <div ref={titleWrapperRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titlePrimary} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">EXCLUSIVE BENEFITS</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4" data-content>Elite class Rewards for Your Global Lifestyle</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_white" data-content>Transparency in lending is the cornerstone of trust. Use our interactive tools to estimate your monthly rewards.</p>
                </div>	
            </div>

            <div ref={cardsWrapperRef} className="overflow-hidden" data-sttr-wrapper>
                <div ref={sliderWrapperRef} className="cursor-none drag-cursor-wrapper relative">
                    <button ref={cursorRef} className="absolute top-1/2 left-1/2 transform -translate-1/2 w-12 sm:w-20 h-12 sm:h-20 rounded-full bg-secondary  cursor-none text-white font-semibold text-sm sm:text-base leading-none flex items-center justify-center text-center z-99999 pointer-events-none" id="drag-cursor" type="button" aria-label="Drag cursor">
                        <span className="play-icon">Drag</span>
                    </button>
                    <div className="benefit-slider max-w-271.5 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-20 relative" data-sttr-card>
                        
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
                                768: { slidesPerView: 1.1 },
                                1024: { slidesPerView: 1 },
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
                            
                            <SwiperSlide>
                                <div className="flex justify-between bg-white/10 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden flex-col sm:flex-row backdrop-blur-[34px]">
                                    <div className="sm:max-w-135 w-full px-5 py-7 pb-5 sm:p-8 md:p-10 lg:p-12">
                                        <p className="text-base sm:text-lg font-semibold leading-[1.1]! text-primary capitalize">WEALTH MANAGEMENT</p>
                                        <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-title_white mt-4">Grow Your Portfolio with Expert Precision</h3>
                                        <p className="mt-4 text-base text-paragraph_white">Our automated strategies help you maximize returns while managing risk in a volatile global market.</p>
                                        <ul className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 flex flex-col gap-3 text-paragraph_white text-base leading-tight">
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">AI-Driven Tax-Loss Harvesting</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">Real-time Market Analytics</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">Custom Asset Allocation</span>
                                            </li>
                                        </ul>
                                        <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-9">
                                            <Link className="button-primary" to="/contact">Get Your Card</Link>
                                        </div>
                                    </div>
                                    <div className="sm:max-w-127.5 w-full">
                                        <img className="w-full h-full object-bottom-right object-contain hidden sm:block" src={benefit01} alt="benefit-desktop-thumb" />
                                        <img className="w-full h-full object-bottom-right object-contain block sm:hidden" src={benefit01Mobile} alt="benefit-mobile-thumb" />
                                    </div>
                                </div>						
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex justify-between bg-white/10 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden flex-col sm:flex-row backdrop-blur-[34px]">
                                    <div className="sm:max-w-135 w-full px-5 py-7 pb-5 sm:p-8 md:p-10 lg:p-12">
                                        <p className="text-base sm:text-lg font-semibold leading-[1.1]! text-primary capitalize">EXCLUSIVE OFFER</p>
                                        <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-title_white mt-4">Get 20% Cashback on all International Travel</h3>
                                        <p className="mt-4 text-base text-paragraph_white">Enjoy seamless spending abroad while earning rewards on every transaction, from flights dining.</p>
                                        <ul className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 flex flex-col gap-3 text-paragraph_white text-base leading-tight">
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">High-Yield Savings (4.75% APY)</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">Advanced Portfolio Analytics</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">Automated Multi-Currency Wallets</span>
                                            </li>
                                        </ul>
                                        <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-9">
                                            <Link className="button-primary" to="/apply-loan">Claim This Offer</Link>
                                        </div>
                                    </div>
                                    <div className="sm:max-w-127.5 w-full">
                                        <img className="w-full h-full object-bottom-right object-contain hidden sm:block" src={benefit02} alt="benefit-desktop-thumb" />
                                        <img className="w-full h-full object-bottom-right object-contain block sm:hidden" src={benefit02Mobile} alt="benefit-mobile-thumb" />
                                    </div>
                                </div>						
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex justify-between bg-white/10 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden flex-col sm:flex-row backdrop-blur-[34px]">
                                    <div className="sm:max-w-135 w-full px-5 py-7 pb-5 sm:p-8 md:p-10 lg:p-12">
                                        <p className="text-base sm:text-lg font-semibold leading-[1.1]! text-primary capitalize">BUSINESS SOLUTIONS</p>
                                        <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-title_white mt-4">Scalable Capital for Your Next Big Move</h3>
                                        <p className="mt-4 text-base text-paragraph_white">Our platform integrates seamlessly with your existing workflow to keep your capital moving.</p>
                                        <ul className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 flex flex-col gap-3 text-paragraph_white text-base leading-tight">
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">Zero-Fee Global Payroll</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">Multi-User Expense Control</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">Custom Asset Allocation</span>
                                            </li>
                                        </ul>
                                        <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-9">
                                            <Link className="button-primary" to="/contact">Open Business Account</Link>
                                        </div>
                                    </div>
                                    <div className="sm:max-w-127.5 w-full">
                                        <img className="w-full h-full object-bottom-right object-contain hidden sm:block" src={benefit03} alt="benefit-desktop-thumb" />
                                        <img className="w-full h-full object-bottom-right object-contain block sm:hidden" src={benefit03Mobile} alt="benefit-mobile-thumb" />
                                    </div>
                                </div>						
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex justify-between bg-white/10 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden flex-col sm:flex-row backdrop-blur-[34px]">
                                    <div className="sm:max-w-135 w-full px-5 py-7 pb-5 sm:p-8 md:p-10 lg:p-12">
                                        <p className="text-base sm:text-lg font-semibold leading-[1.1]! text-primary capitalize">EXCLUSIVE OFFER</p>
                                        <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-title_white mt-4">Get 20% Cashback on all International Travel</h3>
                                        <p className="mt-4 text-base text-paragraph_white">Enjoy seamless spending abroad while earning rewards on every transaction, from flights dining.</p>
                                        <ul className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 flex flex-col gap-3 text-paragraph_white text-base leading-tight">
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">High-Yield Savings (4.75% APY)</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">Advanced Portfolio Analytics</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">Automated Multi-Currency Wallets</span>
                                            </li>
                                        </ul>
                                        <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-9">
                                            <Link className="button-primary" to="/apply-loan">Claim This Offer</Link>
                                        </div>
                                    </div>
                                    <div className="sm:max-w-127.5 w-full">
                                        <img className="w-full h-full object-bottom-right object-contain hidden sm:block" src={benefit02} alt="benefit-desktop-thumb" />
                                        <img className="w-full h-full object-bottom-right object-contain block sm:hidden" src={benefit02Mobile} alt="benefit-mobile-thumb" />
                                    </div>
                                </div>						
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className="flex justify-between bg-white/10 border border-white/10 rounded-2xl md:rounded-3xl overflow-hidden flex-col sm:flex-row backdrop-blur-[34px]">
                                    <div className="sm:max-w-135 w-full px-5 py-7 pb-5 sm:p-8 md:p-10 lg:p-12">
                                        <p className="text-base sm:text-lg font-semibold leading-[1.1]! text-primary capitalize">BUSINESS SOLUTIONS</p>
                                        <h3 className="font-bold text-2xl md:text-3xl lg:text-4xl leading-tight text-title_white mt-4">Scalable Capital for Your Next Big Move</h3>
                                        <p className="mt-4 text-base text-paragraph_white">Our platform integrates seamlessly with your existing workflow to keep your capital moving.</p>
                                        <ul className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 flex flex-col gap-3 text-paragraph_white text-base leading-tight">
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">Zero-Fee Global Payroll</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">Multi-User Expense Control</span>
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <svg className="w-5.25 h-5.25">
                                                    <use href="#roundedCheck"></use>
                                                </svg>
                                                <span className="flex-1">Custom Asset Allocation</span>
                                            </li>
                                        </ul>
                                        <div className="mt-6 sm:mt-7 md:mt-8 lg:mt-9">
                                            <Link className="button-primary" to="/contact">Open Business Account</Link>
                                        </div>
                                    </div>
                                    <div className="sm:max-w-127.5 w-full">
                                        <img className="w-full h-full object-bottom-right object-contain hidden sm:block" src={benefit03} alt="benefit-desktop-thumb" />
                                        <img className="w-full h-full object-bottom-right object-contain block sm:hidden" src={benefit03Mobile} alt="benefit-mobile-thumb" />
                                    </div>
                                </div>						
                            </SwiperSlide>

                        </Swiper>
                    </div>
                </div>
                
                <div className="mt-9 flex w-36 mx-auto bg-white/10 border border-white/10 backdrop-blur-[34px] rounded-[100px] benifet-slide-navigation" data-sttr-card>
                    <button type="button" className="benefit-slider-button-prev text-title_white w-10.5 h-10 flex items-center justify-center" aria-label="Previous slide">
                        <svg className="w-2.25 h-3.75 fill-current">
                            <use href="#sliderLeft"></use>
                        </svg>
                    </button>
                    <div className="benefit-slider-pagination text-title_white font-semibold leading-none flex-1 flex items-center justify-center text-center"></div>
                    <button type="button" className="benefit-slider-button-next text-title_white w-10.5 h-10 flex items-center justify-center" aria-label="Next slide">
                        <svg className="w-2.25 h-3.75 fill-current">
                            <use href="#sliderRight"></use>
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    </>
  )
}
