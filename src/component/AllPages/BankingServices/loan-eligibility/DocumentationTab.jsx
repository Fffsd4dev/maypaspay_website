import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import titleIcon from "../../../../assets/img/title-icon.svg";
import tab1 from "../../../../assets/img/loan-eligibility/tab-1.webp";
import tab2 from "../../../../assets/img/loan-eligibility/tab-2.webp";
import tab3 from "../../../../assets/img/loan-eligibility/tab-3.webp";
import tab4 from "../../../../assets/img/loan-eligibility/tab-4.webp";

gsap.registerPlugin(ScrollTrigger);

export default function DocumentationTab() {

    const sectionRef = useRef(null);
    const cardsRef = useRef(null);
    const containerRef = useRef(null);

    const [activeTab, setActiveTab] = useState('tab1');

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

    // Animate a single tab panel
    const animateTab = useCallback((panel, directionIndex = 0) => {
        if (!panel || typeof gsap === 'undefined') return;
        const grid = panel.querySelector('.grid');
        if (!grid) return;

        const paragraph = grid.querySelector('p:first-of-type');
        const heading = grid.querySelector('h4, h3');
        const allPs = grid.querySelectorAll('p');
        const extraParagraph = allPs.length > 1 ? allPs[1] : null;
        const listItems = grid.querySelectorAll('ul li');
        const image = grid.querySelector('img');

        const directions = ['top', 'left', 'right', 'bottom'];
        const dir = directions[directionIndex % 4];

        // Reset tweens
        gsap.killTweensOf([paragraph, heading, extraParagraph, listItems, image]);

        // Set initial states
        if (paragraph) gsap.set(paragraph, { y: 50, opacity: 0, filter: 'blur(10px)' });
        if (heading) gsap.set(heading, { y: 50, opacity: 0, filter: 'blur(10px)' });
        if (extraParagraph) gsap.set(extraParagraph, { y: 50, opacity: 0, filter: 'blur(10px)' });
        if (listItems.length) gsap.set(listItems, { y: 50, opacity: 0, filter: 'blur(10px)' });
        if (image) {
            let clip = 'inset(100% 0% 0% 0%)';
            if (dir === 'left') clip = 'inset(0% 0% 0% 100%)';
            else if (dir === 'right') clip = 'inset(0% 100% 0% 0%)';
            else if (dir === 'bottom') clip = 'inset(0% 0% 100% 0%)';
            gsap.set(image, { clipPath: clip });
        }

        // Build reveal timeline
        const tl = gsap.timeline();
        if (paragraph) {
            tl.to(paragraph, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }, 0);
        }
        if (heading) {
            tl.to(heading, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }, 0.1);
        }
        if (extraParagraph) {
            tl.to(extraParagraph, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.6, ease: 'power2.out' }, 0.2);
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
            tl.to(image, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power2.inOut' }, 0.2);
        }
        return tl;
    }, []);

    // ----- Switch tab -----
    const switchTab = useCallback((tabId, directionIndex = 0) => {
        setActiveTab(tabId);
        switchTabRef.current = { tabId, directionIndex };
    }, []);

    const switchTabRef = useRef({ tabId: 'tab1', directionIndex: 0 });

    // ----- animate panel when activeTab changes -----
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const activePanel = container.querySelector(`#${activeTab}`);
        if (activePanel) {
            const { directionIndex } = switchTabRef.current;
            // Small delay to let React finish painting
            const timer = setTimeout(() => {
                animateTab(activePanel, directionIndex);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [activeTab, animateTab]);

    // ----- Attach click handlers to tab buttons -----
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const tabBtns = container.querySelectorAll('.documentation-nav-tab');
        const handlers = [];

        tabBtns.forEach((btn, index) => {
            const handler = () => {
                const tabId = btn.dataset.tab;
                switchTab(tabId, index);
            };
            btn.addEventListener('click', handler);
            handlers.push({ element: btn, handler });
        });

        return () => {
            handlers.forEach(({ element, handler }) => {
                element.removeEventListener('click', handler);
            });
        };
    }, [switchTab]);

    // ----- Initial setup: hide inactive panels and animate the active one -----
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const panels = container.querySelectorAll('.documentation-tab-content');
        const activePanel = container.querySelector('.documentation-tab-content.active');

        // Set hidden states for all panels
        panels.forEach((panel, idx) => {
            const isActive = panel === activePanel;
            const grid = panel.querySelector('.grid');
            if (!grid) return;

            const paragraph = grid.querySelector('p:first-of-type');
            const heading = grid.querySelector('h4, h3');
            const allPs = grid.querySelectorAll('p');
            const extraParagraph = allPs.length > 1 ? allPs[1] : null;
            const listItems = grid.querySelectorAll('ul li');
            const image = grid.querySelector('img');

            if (!isActive) {
                // Inactive panels – hide everything
                if (paragraph) gsap.set(paragraph, { y: 50, opacity: 0, filter: 'blur(10px)' });
                if (heading) gsap.set(heading, { y: 50, opacity: 0, filter: 'blur(10px)' });
                if (extraParagraph) gsap.set(extraParagraph, { y: 50, opacity: 0, filter: 'blur(10px)' });
                if (listItems.length) gsap.set(listItems, { y: 50, opacity: 0, filter: 'blur(10px)' });
                if (image) {
                    const directions = ['top', 'left', 'right', 'bottom'];
                    const dir = directions[idx % 4];
                    let clip = 'inset(100% 0% 0% 0%)';
                    if (dir === 'left') clip = 'inset(0% 0% 0% 100%)';
                    else if (dir === 'right') clip = 'inset(0% 100% 0% 0%)';
                    else if (dir === 'bottom') clip = 'inset(0% 0% 100% 0%)';
                    gsap.set(image, { clipPath: clip });
                }
            }
        });

        // Animate the active panel after a delay
        if (activePanel) {
            const index = Array.from(panels).indexOf(activePanel);
            const timer = setTimeout(() => {
                animateTab(activePanel, index);
                switchTabRef.current = { tabId: activePanel.id, directionIndex: index };
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [animateTab]);

    return (
        <>
            <section className="section-spacing-lg-md" id="documentation">
                <div className="container">
                    <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                        <div className="md:max-w-170 w-full">
                            <div className="flex items-center gap-2.5">
                                <img className="rotate" src={titleIcon} alt="title-icon" />
                                <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-secondary uppercase block">DOCUMENTATION</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_black mt-4" data-content>Documents You'll Need To Get a Loan</h2>
                        </div>
                        <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_black" data-content>Ensuring you have the right documents ready accelerates your application process.</p>
                    </div>
                    <div ref={cardsRef} className="documentation" data-sttr-wrapper>
                        <div ref={containerRef} className="documentation-inner">
                            <div className="documentation-nav-tabs grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 md:mb-9" data-sttr-card>
                                <button type="button" className={`documentation-nav-tab ${activeTab === 'tab1' ? 'active' : ''}`} data-tab="tab1">Salaried Employees</button>
                                <button type="button" className={`documentation-nav-tab ${activeTab === 'tab2' ? 'active' : ''}`} data-tab="tab2">Self-Employed/Business</button>
                                <button type="button" className={`documentation-nav-tab ${activeTab === 'tab3' ? 'active' : ''}`} data-tab="tab3">Freelancer</button>
                                <button type="button" className={`documentation-nav-tab ${activeTab === 'tab4' ? 'active' : ''}`} data-tab="tab4">Identity (All Users)</button>
                            </div>

                            <div className="" data-sttr-card>

                                <div className={`documentation-tab-content ${activeTab === 'tab1' ? 'active' : ''}`} id="tab1">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="px-4 py-6 sm:p-6 md:p-8 lg:p-10.5 bg-background border border-border rounded-2xl">
                                            <p className="text-base sm:text-lg font-semibold leading-[1.1]! text-secondary capitalize">ELIGIBILITY CATEGORY</p>
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-title_black mt-4">Verification for Salaried Professionals</h3>
                                            <p className="mt-4 text-base text-paragraph_black">To process your application swiftly, please provide documentation confirming your stable income and employment status.</p>
                                            <ul className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 flex flex-col gap-3 text-paragraph_black text-base leading-tight">
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    <span className="flex-1">Last 3 months' payslips</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    <span className="flex-1">Most recent W-2 or Tax Return</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    <span className="flex-1">6 months of bank statements showing salary credit</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="rounded-2xl md:rounded-3xl overflow-hidden">
                                            <img src={tab1} alt="tab-1-image" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                                <div className={`documentation-tab-content ${activeTab === 'tab2' ? 'active' : ''}`} id="tab2">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="px-4 py-6 sm:p-6 md:p-8 lg:p-10.5 bg-background border border-border rounded-2xl">
                                            <p className="text-base sm:text-lg font-semibold leading-[1.1]! text-secondary capitalize">ELIGIBILITY CATEGORY</p>
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-title_black mt-4">Verification for Self-Employed/Business Professionals</h3>
                                            <p className="mt-4 text-base text-paragraph_black">To process your application swiftly, please provide documentation confirming your stable income and business status.</p>
                                            <ul className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 flex flex-col gap-3 text-paragraph_black text-base leading-tight">
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    <span className="flex-1">Last 3 months' payslips</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    <span className="flex-1">Most recent W-2 or Tax Return</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    <span className="flex-1">6 months of bank statements showing salary credit</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="rounded-2xl md:rounded-3xl overflow-hidden">
                                            <img src={tab2} alt="tab-1-image" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                                <div className={`documentation-tab-content ${activeTab === 'tab3' ? 'active' : ''}`} id="tab3">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="px-4 py-6 sm:p-6 md:p-8 lg:p-10.5 bg-background border border-border rounded-2xl">
                                            <p className="text-base sm:text-lg font-semibold leading-[1.1]! text-secondary capitalize">ELIGIBILITY CATEGORY</p>
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-title_black mt-4">Verification for Freelancers</h3>
                                            <p className="mt-4 text-base text-paragraph_black">To process your application swiftly, please provide documentation confirming your stable income and freelance status.</p>
                                            <ul className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 flex flex-col gap-3 text-paragraph_black text-base leading-tight">
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    <span className="flex-1">Last 3 months' payslips</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    <span className="flex-1">Most recent W-2 or Tax Return</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    <span className="flex-1">6 months of bank statements showing salary credit</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="rounded-2xl md:rounded-3xl overflow-hidden">
                                            <img src={tab3} alt="tab-1-image" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                                <div className={`documentation-tab-content ${activeTab === 'tab4' ? 'active' : ''}`} id="tab4">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div className="px-4 py-6 sm:p-6 md:p-8 lg:p-10.5 bg-background border border-border rounded-2xl">
                                            <p className="text-base sm:text-lg font-semibold leading-[1.1]! text-secondary capitalize">ELIGIBILITY CATEGORY</p>
                                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-title_black mt-4">Verification for Identity (All Users)</h3>
                                            <p className="mt-4 text-base text-paragraph_black">To process your application swiftly, please provide documentation confirming your identity and address.</p>
                                            <ul className="mt-6 sm:mt-7 md:mt-8 lg:mt-9 flex flex-col gap-3 text-paragraph_black text-base leading-tight">
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    <span className="flex-1">Valid government-issued ID</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    <span className="flex-1">Recent utility bill or bank statement</span>
                                                </li>
                                                <li className="flex items-center gap-2">
                                                    <svg className="w-5.25 h-5.25">
                                                        <use href="#roundedCheck"></use>
                                                    </svg>
                                                    <span className="flex-1">Proof of address (e.g., lease agreement)</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="rounded-2xl md:rounded-3xl overflow-hidden">
                                            <img src={tab4} alt="tab-1-image" className="w-full h-full object-cover" />
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
