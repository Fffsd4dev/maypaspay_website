import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import titlePrimary from "../../../../assets/img/title-icon-primary.svg";
import getstratedPositon1 from "../../../../assets/img/get-strated/getstrated-positon-1.webp";
import getstratedPositon2 from "../../../../assets/img/get-strated/getstrated-position-2.webp";
import criteria01 from "../../../../assets/img/get-strated/criteria-01.webp";
import criteria02 from "../../../../assets/img/get-strated/criteria-02.webp";
import criteria03 from "../../../../assets/img/get-strated/criteria-03.webp";

gsap.registerPlugin(ScrollTrigger);

export default function CycleTab() {

    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    const tabs = [
        {
            number: '01',
            title: 'Who is Eligible for Funding?',
            link: '#home',
        },
        {
            number: '02',
            title: 'What Documents Do You Need?',
            link: '#profile',
        },
        {
            number: '03',
            title: 'Why This Process?',
            link: '#messages',
        },
    ];

    const [activeTab, setActiveTab] = useState('home');
    const autoCycleRef = useRef(null);

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

    // Animate tab panel content
    const animatePanel = useCallback((panel) => {
        if (!panel || typeof gsap === 'undefined') return;
        const heading = panel.querySelector('h3');
        const paragraph = panel.querySelector('p');
        const listItems = panel.querySelectorAll('ul li');
        const image = panel.querySelector('img');

        gsap.killTweensOf([heading, paragraph, listItems, image]);

        if (heading) gsap.set(heading, { y: 50, opacity: 0, filter: 'blur(10px)' });
        if (paragraph) gsap.set(paragraph, { y: 50, opacity: 0, filter: 'blur(10px)' });
        if (listItems.length) gsap.set(listItems, { y: 50, opacity: 0, filter: 'blur(10px)' });
        if (image) {
            const tabIds = ['home', 'profile', 'messages'];
            const idx = tabIds.indexOf(panel.id);
            const directions = ['top', 'left', 'right'];
            const dir = directions[idx % 3];
            let clip = 'inset(100% 0% 0% 0%)';
            if (dir === 'left') clip = 'inset(0% 0% 0% 100%)';
            if (dir === 'right') clip = 'inset(0% 100% 0% 0%)';
            gsap.set(image, { clipPath: clip });
        }

        const tl = gsap.timeline();
        if (heading) {
            tl.to(heading, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }, 0);
        }
        if (paragraph) {
            tl.to(paragraph, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }, 0.2);
        }
        if (listItems.length) {
            tl.to(listItems, {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 0.6,
                stagger: 0.15,
                ease: 'power2.out',
            }, 0.3);
        }
        if (image) {
            tl.to(image, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power2.inOut' }, 0.4);
        }
        return tl;
    }, []);

    // Switch tab
    const switchTab = useCallback((tabId) => {
        setActiveTab(tabId);
    }, []);

    // Update UI when activeTab changes
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const panels = container.querySelectorAll('.loan-criteria-tab-pane');
        panels.forEach((panel) => {
            if (panel.id === activeTab) {
                panel.classList.add('active');
                animatePanel(panel);
            } else {
                panel.classList.remove('active');
            }
        });
    }, [activeTab, animatePanel]);

    // Set initial panel states on mount
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const panels = container.querySelectorAll('.loan-criteria-tab-pane');
        panels.forEach((panel) => {
            const isActive = panel.classList.contains('active');
            const heading = panel.querySelector('h3');
            const paragraph = panel.querySelector('p');
            const listItems = panel.querySelectorAll('ul li');
            const image = panel.querySelector('img');

            if (!isActive) {
                if (heading) gsap.set(heading, { y: 50, opacity: 0, filter: 'blur(10px)' });
                if (paragraph) gsap.set(paragraph, { y: 50, opacity: 0, filter: 'blur(10px)' });
                if (listItems.length) gsap.set(listItems, { y: 50, opacity: 0, filter: 'blur(10px)' });
                if (image) {
                    const tabIds = ['home', 'profile', 'messages'];
                    const idxTab = tabIds.indexOf(panel.id);
                    const directions = ['top', 'left', 'right'];
                    const dir = directions[idxTab % 3];
                    let clip = 'inset(100% 0% 0% 0%)';
                    if (dir === 'left') clip = 'inset(0% 0% 0% 100%)';
                    if (dir === 'right') clip = 'inset(0% 100% 0% 0%)';
                    gsap.set(image, { clipPath: clip });
                }
            }
        });

        const activePanel = container.querySelector('.loan-criteria-tab-pane.active');
        if (activePanel) {
            setTimeout(() => {
                animatePanel(activePanel);
            }, 200);
        }
    }, [animatePanel]);

    // Auto‑cycle logic
    const startAutoCycle = useCallback(() => {
        if (autoCycleRef.current) clearInterval(autoCycleRef.current);
        autoCycleRef.current = setInterval(() => {
            const tabIds = ['home', 'profile', 'messages'];
            const currentIndex = tabIds.indexOf(activeTab);
            const nextIndex = (currentIndex + 1) % tabIds.length;
            setActiveTab(tabIds[nextIndex]);
        }, 5000);
    }, [activeTab]);

    const stopAutoCycle = useCallback(() => {
        if (autoCycleRef.current) {
            clearInterval(autoCycleRef.current);
            autoCycleRef.current = null;
        }
    }, []);

    useEffect(() => {
        startAutoCycle();
        return () => stopAutoCycle();
    }, [startAutoCycle, stopAutoCycle]);

    // Hover pause / resume
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onMouseEnter = stopAutoCycle;
        const onMouseLeave = startAutoCycle;

        container.addEventListener('mouseenter', onMouseEnter);
        container.addEventListener('mouseleave', onMouseLeave);

        return () => {
            container.removeEventListener('mouseenter', onMouseEnter);
            container.removeEventListener('mouseleave', onMouseLeave);
            stopAutoCycle();
        };
    }, [startAutoCycle, stopAutoCycle]);

    return (
        <>
            <section className="section-spacing-md">
                <div className="container-lg">
                    <div className="bg-secondary rounded-3xl overflow-hidden px-5 pt-10 pb-5 sm:p-10 md:p-15 xl:p-25 relative z-1" data-grid-reveal data-cols="15" data-rows="6" data-cols-sm="5" data-rows-sm="18" data-cols-lg="8" data-rows-lg="16" data-animation="wave" data-bg-color="white" data-trigger="top 70%" data-stagger="0.005" data-duration="0.6">
                        <div className="absolute bottom-0 left-0 pointer-events-none -z-1">
                            <img src={getstratedPositon1} alt="SecureVest illustration" />
                        </div>
                        <div className="absolute top-0 right-0 pointer-events-none -z-1">
                            <img src={getstratedPositon2} alt="SecureVest illustration" />
                        </div>
                        {/* <!-- Section Title --> */}
                        <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                            <div className="md:max-w-170 w-full">
                                <div className="flex items-center gap-2.5">
                                    <img className="rotate" src={titlePrimary} alt="title-icon" />
                                    <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">LOAN CRITERIA</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4" data-content>The Blueprint for Better Borrowing.</h2>
                            </div>
                            <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_white" data-content>We've stripped away the complexity of traditional banking to give you a lending experience that is faster, fairer, and completely transparent.</p>
                        </div>
                        <div ref={containerRef} className="cycle-tab-container">
                            <ul className="nav loan-criteria-nav-tabs grid sm:grid-cols-3 gap-5 sm:gap-10 xl:gap-20">

                                {tabs.map((item) => {
                                    const tabId = item.link.replace('#', '');
                                    return (
                                        <li className={`cycle-tab-item min-w-0 ${activeTab === tabId ? 'active' : ''}`} key={tabId}>
                                            <Link
                                                className="nav-link block min-w-0"
                                                to={item.link}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    switchTab(tabId);
                                                }}
                                            >
                                                <div className="flex items-center gap-2 sm:gap-4">
                                                    <h3 className="text-white/15 font-bold leading-none">{item.number}</h3>
                                                    <div className="flex-1 h-0.5 rounded-2xl bg-white/15 progress-line min-w-0"></div>
                                                </div>
                                                <div className="pl-6">
                                                    <p className="text-base md:text-lg lg:text-xl xl:text-[22px] font-semibold text-title_white leading-tight! text-ellipsis whitespace-nowrap overflow-hidden">{item.title}</p>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}

                            </ul>
                            <div className="tab-content mt-12 md:mt-15">

                                <div className="loan-criteria-tab-pane fade active in" id="home">
                                    <div className="flex items-center justify-between gap-8 sm:gap-10 flex-col md:flex-row">
                                        <div className="md:max-w-135 w-full">
                                            <h3 className="text-title_white text-xl md:text-2xl font-semibold">Must know Eligibility Criteria</h3>
                                            <p className="mt-3 text-paragraph_white text-base md:text-lg">Applicants must be 21+ years of age to qualify for institutional funding.</p>
                                            <ul className="flex flex-col gap-4 mt-6 md:mt-9">
                                                <li className="flex gap-3.25 items-start text-base font-normal leading-normal text-paragraph_white">
                                                    <svg className="mt-0.5 w-5 h-5 fill-current">
                                                        <use href="#contactIcon-01"></use>
                                                    </svg>
                                                    <span className="flex-1">Professional Status: We fund full-time employed executives, established business owners</span>
                                                </li>
                                                <li className="flex gap-3.25 items-start text-base font-normal leading-normal text-paragraph_white">
                                                    <svg className="mt-0.5 w-5 h-5 fill-current">
                                                        <use href="#contactIcon-02"></use>
                                                    </svg>
                                                    <span className="flex-1">Credit Tiers: While we serve a wide range, our "Prime Choice" benefits (750+ score) offer the most competitive market rates.</span>
                                                </li>
                                                <li className="flex gap-3.25 items-start text-base font-normal leading-normal text-paragraph_white">
                                                    <svg className="mt-0.5 w-5 h-5 fill-current">
                                                        <use href="#contactIcon-03"></use>
                                                    </svg>
                                                    <span className="flex-1">Residency: Open to residents and registered entities within our global network of 90+ supported countries.</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="md:max-w-165 w-full rounded-2xl md:rounded-3xl overflow-hidden">
                                            <img src={criteria01} alt="Criteria" />
                                        </div>
                                    </div>
                                </div>
                                <div className="loan-criteria-tab-pane fade" id="profile">
                                    <div className="flex items-center justify-between gap-8 sm:gap-10 flex-col md:flex-row">
                                        <div className="md:max-w-135 w-full">
                                            <h3 className="text-title_white text-xl md:text-2xl font-semibold">Required Documentation</h3>
                                            <p className="mt-3 text-paragraph_white text-base md:text-lg">Applicants must provide valid documents to verify identity, financial stability, and eligibility for funding.</p>
                                            <ul className="flex flex-col gap-4 mt-6 md:mt-9">
                                                <li className="flex gap-3.25 items-start text-base font-normal leading-normal text-paragraph_white">
                                                    <svg className="mt-0.5 w-5 h-5 fill-current">
                                                        <use href="#contactIcon-01"></use>
                                                    </svg>
                                                    <span className="flex-1">Identity Verification: A valid government-issued ID such as a passport, national ID, or driver's license.</span>
                                                </li>
                                                <li className="flex gap-3.25 items-start text-base font-normal leading-normal text-paragraph_white">
                                                    <svg className="mt-0.5 w-5 h-5 fill-current">
                                                        <use href="#contactIcon-02"></use>
                                                    </svg>
                                                    <span className="flex-1">Income Proof: Recent bank statements, salary slips, or business financial reports to confirm income sources.</span>
                                                </li>
                                                <li className="flex gap-3.25 items-start text-base font-normal leading-normal text-paragraph_white">
                                                    <svg className="mt-0.5 w-5 h-5 fill-current">
                                                        <use href="#contactIcon-03"></use>
                                                    </svg>
                                                    <span className="flex-1">Business Documents: Registered business certificate, tax documents, or proof of company ownership if applying as a business entity.</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="md:max-w-165 w-full rounded-2xl md:rounded-3xl overflow-hidden">
                                            <img src={criteria02} alt="Criteria" />
                                        </div>
                                    </div>
                                </div>
                                <div className="loan-criteria-tab-pane fade" id="messages">
                                    <div className="flex items-center justify-between gap-8 sm:gap-10 flex-col md:flex-row">
                                        <div className="md:max-w-135 w-full">
                                            <h3 className="text-title_white text-xl md:text-2xl font-semibold">Simple Transparent Funding Process</h3>
                                            <p className="mt-3 text-paragraph_white text-base md:text-lg">Our funding process is designed to be secure, transparent, and efficient for individuals and businesses.</p>
                                            <ul className="flex flex-col gap-4 mt-6 md:mt-9">
                                                <li className="flex gap-3.25 items-start text-base font-normal leading-normal text-paragraph_white">
                                                    <svg className="mt-0.5 w-5 h-5 fill-current">
                                                        <use href="#contactIcon-01"></use>
                                                    </svg>
                                                    <span className="flex-1">Fast Approval: Streamlined review system ensures quicker funding decisions and minimal waiting time.</span>
                                                </li>
                                                <li className="flex gap-3.25 items-start text-base font-normal leading-normal text-paragraph_white">
                                                    <svg className="mt-0.5 w-5 h-5 fill-current">
                                                        <use href="#contactIcon-02"></use>
                                                    </svg>
                                                    <span className="flex-1">Secure Transactions: Advanced security protocols protect your financial data and application details.</span>
                                                </li>
                                                <li className="flex gap-3.25 items-start text-base font-normal leading-normal text-paragraph_white">
                                                    <svg className="mt-0.5 w-5 h-5 fill-current">
                                                        <use href="#contactIcon-03"></use>
                                                    </svg>
                                                    <span className="flex-1">Flexible Solutions: Tailored funding options that match your financial needs and long-term business goals.</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="md:max-w-165 w-full rounded-2xl md:rounded-3xl overflow-hidden">
                                            <img src={criteria03} alt="Criteria" />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
