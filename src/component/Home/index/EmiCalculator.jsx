import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';

import calculator from "../../../assets/img/home-v1/calculator.svg";

gsap.registerPlugin(ScrollTrigger);

// ----- Helper functions -----
const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};

const formatLargeCurrency = (value) => {
    if (value >= 1e6) return "$" + (value / 1e6).toFixed(2) + "M";
    if (value >= 1e3) return "$" + (value / 1e3).toFixed(0) + "K";
    return formatCurrency(value);
};

const calculateEMI = (principal, annualRate, years) => {
    const monthlyRate = annualRate / 100 / 12;
    const months = 12 * years;
    if (monthlyRate === 0) return principal / months;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
};

// ----- Default values for each panel -----
const defaultPanels = {
    'tab-1': { amount: 500000, term: 20, rate: 8.5 },
    'tab-2': { amount: 500000, term: 20, rate: 8.5 },
    'tab-3': { amount: 45000, term: 5, rate: 7.2 },
    'tab-4': { amount: 850000, term: 25, rate: 5.8 },
    'tab-5': { amount: 120000, term: 6, rate: 9.8 },
};

// Map tab IDs to the label text
const labelMap = {
    'tab-1': 'Monthly EMI',
    'tab-2': 'Monthly EMI',
    'tab-3': 'Monthly Vehicle Payment',
    'tab-4': 'Monthly Mortgage Payment',
    'tab-5': 'Monthly EMI',
};

export default function EmiCalculator() {

    const cardsRef = useRef(null);
    const [activeTab, setActiveTab] = useState('tab-1');
    const [panels, setPanels] = useState(defaultPanels);

    // ----- Update slider progress bar -----
    const updateSliderProgress = useCallback((panelId, input) => {
        const val = parseFloat(input.value);
        const min = parseFloat(input.min);
        const max = parseFloat(input.max);
        const percent = ((val - min) / (max - min)) * 100;
        const container = input.closest(".slider-container");
        if (container) {
            container.style.setProperty("--slider-progress", `${percent}%`);
        }
    }, []);

    // ----- Handle slider change -----
    const handleSliderChange = useCallback((panelId, field, e) => {
        const input = e.target;
        const newValue = parseFloat(input.value);
        setPanels(prev => ({
            ...prev,
            [panelId]: {
                ...prev[panelId],
                [field]: newValue,
            }
        }));
        updateSliderProgress(panelId, input);
    }, [updateSliderProgress]);

    // ----- Switch tab -----
    const switchTab = useCallback((tabId) => {
        setActiveTab(tabId);

        // GSAP animation for the new panel content
        setTimeout(() => {
            const activePanel = document.querySelector(`#${tabId}`);
            const wrapper = activePanel?.querySelector(".emi-calculator-wrapper");
            if (wrapper && typeof gsap !== "undefined") {
                const children = Array.from(wrapper.children);
                gsap.killTweensOf(children);
                gsap.set(children, { y: 100, opacity: 0, filter: "blur(6px)" });
                gsap.to(children, {
                    y: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.6,
                    ease: "power2.out",
                    stagger: 0.25,
                });
            }
        }, 0);
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

    // ----- Update slider progress on mount and resize -----
    useEffect(() => {
        const updateAllSliders = () => {
            Object.keys(panels).forEach((panelId) => {
                const panel = document.querySelector(`#${panelId}`);
                if (!panel) return;
                const inputs = panel.querySelectorAll(".slider");
                inputs.forEach((input) => {
                    updateSliderProgress(panelId, input);
                });
            });
        };

        updateAllSliders();

        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateAllSliders, 200);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimer);
        };
    }, [panels, updateSliderProgress]);

    // ----- Render helper -----
    const getPanelData = (panelId) => panels[panelId] || { amount: 0, term: 0, rate: 0 };

    // ----- Render a single panel -----
    const renderPanel = (panelId) => {
        const data = getPanelData(panelId);
        const { amount, term, rate } = data;
        const emi = calculateEMI(amount, rate, term);
        const total = emi * (12 * term);
        const interest = total - amount;

        // Add 'active' class if this panel is the active one
        const isActive = panelId === activeTab;
        const panelClass = `calculator-tab-panel${isActive ? ' active' : ''}`;

        // Get the correct label for this tab
        const label = labelMap[panelId] || 'Monthly EMI';

        return (
            <div className={panelClass} id={panelId}>
                <div className="grid md:grid-cols-2 gap-6 emi-calculator-wrapper">
                    {/* Left column */}
                    <div className="pt-9.5 pb-6 md:pb-12 px-4 sm:px-6 bg-background border border-border rounded-2xl flex flex-col">
                        <div className="text-center bg-secondary py-13 rounded-2xl relative">
                            <div className="w-12 md:w-17.5 h-12 md:h-17.5 bg-white rounded-full flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 -top-8.5 shadow-[0_0_12px_0_rgba(0,0,0,0.14)] p-3">
                                <img src={calculator} alt="calculator icon" />
                            </div>
                            <p className="text-base sm:text-lg leading-none! font-semibold text-white/50">{label}</p>
                            <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold leading-none! mt-2.5 emi-monthly-emi">
                                {formatCurrency(emi)}
                            </h3>
                        </div>
                        <div className="text-center -mt-6 relative z-10">
                            <Link to="/apply-loan" className="inline-flex items-center justify-center gap-2 p-3 md:py-4 px-7 text-base md:text-lg font-semibold leading-none text-title_black rounded-[100px] bg-white shadow-[0_0_12px_0_rgba(0,0,0,0.14)] duration-300 hover:text-secondary hover:bg-primary">
                                <svg className="w-3.25 h-2.75 text-secondary"><use href="#applyOnlineButtonArrow"></use></svg>
                                Apply Online
                            </Link>
                        </div>
                        <div className="mt-5 md:mt-6.5 flex flex-col gap-4 flex-1 justify-around">
                            <div className="flex items-start gap-3">
                                <svg className="w-3.25 h-3.25 text-secondary mt-1"><use href="#calculatorStarIcon"></use></svg>
                                <div>
                                    <p className="text-lg leading-none font-semibold text-title_black">Interest Amount</p>
                                    <p className="text-base leading-none text-[#666666] mt-2.5 emi-interest-amount">{formatLargeCurrency(interest)}</p>
                                </div>
                            </div>
                            <div className="w-full h-px bg-[#D9D9D9]"></div>
                            <div className="flex items-start gap-3">
                                <svg className="w-3.25 h-3.25 text-secondary mt-1"><use href="#calculatorStarIcon"></use></svg>
                                <div>
                                    <p className="text-lg leading-none font-semibold text-title_black">Total Amount</p>
                                    <p className="text-base leading-none text-[#666666] mt-2.5 emi-total-amount">{formatLargeCurrency(total)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column – Sliders */}
                    <div className="order-0 md:order-1 pt-6 pb-4 px-4 sm:p-8 bg-background border border-border rounded-2xl flex flex-col gap-3.5">
                        {/* Loan Amount */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-title_black text-base sm:text-lg font-semibold leading-none!">Loan Amount</label>
                                <span className="text-title_black text-base sm:text-lg font-semibold leading-none! emi-loan-amount-value">
                                    {amount >= 1e6 ? "$" + (amount / 1e6).toFixed(1) + "M" : amount >= 1e3 ? "$" + (amount / 1e3).toFixed(0) + "K" : formatCurrency(amount)}
                                </span>
                            </div>
                            <div className="relative p-4.5 bg-white border border-border rounded-2xl mt-3">
                                <div className="flex justify-between text-base leading-none text-[#666666] mb-1.25">
                                    <span>{panelId === 'tab-1' ? '$50,000' : panelId === 'tab-2' ? '$50,000' : panelId === 'tab-3' ? '$10,000' : panelId === 'tab-4' ? '$100,000' : '$20,000'}</span>
                                    <span>{panelId === 'tab-1' ? '$2.5 million' : panelId === 'tab-2' ? '$2.5 Million' : panelId === 'tab-3' ? '$150,000' : panelId === 'tab-4' ? '$5 Million' : '$500,000'}</span>
                                </div>
                                <div className="slider-container">
                                    <input
                                        type="range"
                                        className="slider emi-loan-amount"
                                        min={panelId === 'tab-1' ? 50000 : panelId === 'tab-2' ? 50000 : panelId === 'tab-3' ? 10000 : panelId === 'tab-4' ? 100000 : 20000}
                                        max={panelId === 'tab-1' ? 2500000 : panelId === 'tab-2' ? 2500000 : panelId === 'tab-3' ? 150000 : panelId === 'tab-4' ? 5000000 : 500000}
                                        step={panelId === 'tab-1' ? 10000 : panelId === 'tab-2' ? 10000 : panelId === 'tab-3' ? 1000 : panelId === 'tab-4' ? 10000 : 1000}
                                        value={amount}
                                        onChange={(e) => handleSliderChange(panelId, 'amount', e)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Loan Term */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-title_black text-base sm:text-lg font-semibold leading-none!">Loan Term (Years)</label>
                                <span className="text-title_black text-base sm:text-lg font-semibold leading-none! emi-loan-term-value">{term}</span>
                            </div>
                            <div className="relative p-4.5 bg-white border border-border rounded-2xl mt-3">
                                <div className="flex justify-between text-base leading-none text-[#666666] mb-1.25">
                                    <span>{panelId === 'tab-1' ? '20 Years' : panelId === 'tab-2' ? '1 Years' : panelId === 'tab-3' ? '2 Years' : panelId === 'tab-4' ? '10 Years' : '1 Years'}</span>
                                    <span>{panelId === 'tab-1' ? '40 Years' : panelId === 'tab-2' ? '20 Years' : panelId === 'tab-3' ? '7 Years' : panelId === 'tab-4' ? '30 Years' : '10 Years'}</span>
                                </div>
                                <div className="slider-container">
                                    <input
                                        type="range"
                                        className="slider emi-loan-term"
                                        min={panelId === 'tab-1' ? 20 : panelId === 'tab-2' ? 1 : panelId === 'tab-3' ? 2 : panelId === 'tab-4' ? 10 : 1}
                                        max={panelId === 'tab-1' ? 40 : panelId === 'tab-2' ? 20 : panelId === 'tab-3' ? 7 : panelId === 'tab-4' ? 30 : 10}
                                        step="1"
                                        value={term}
                                        onChange={(e) => handleSliderChange(panelId, 'term', e)}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Interest Rate */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-title_black text-base sm:text-lg font-semibold leading-none!">Interest Rate</label>
                                <span className="text-title_black text-base sm:text-lg font-semibold leading-none! emi-interest-rate-value">{rate.toFixed(1)}%</span>
                            </div>
                            <div className="relative p-4.5 bg-white border border-border rounded-2xl mt-3">
                                <div className="flex justify-between text-base leading-none text-[#666666] mb-1.25">
                                    <span>{panelId === 'tab-1' ? '6%' : panelId === 'tab-2' ? '6%' : panelId === 'tab-3' ? '4%' : panelId === 'tab-4' ? '3%' : '7%'}</span>
                                    <span>{panelId === 'tab-1' ? '18%' : panelId === 'tab-2' ? '18%' : panelId === 'tab-3' ? '14%' : panelId === 'tab-4' ? '9%' : '16%'}</span>
                                </div>
                                <div className="slider-container">
                                    <input
                                        type="range"
                                        className="slider emi-interest-rate"
                                        min={panelId === 'tab-1' ? 6 : panelId === 'tab-2' ? 6 : panelId === 'tab-3' ? 4 : panelId === 'tab-4' ? 3 : 7}
                                        max={panelId === 'tab-1' ? 18 : panelId === 'tab-2' ? 18 : panelId === 'tab-3' ? 14 : panelId === 'tab-4' ? 9 : 16}
                                        step="0.1"
                                        value={rate}
                                        onChange={(e) => handleSliderChange(panelId, 'rate', e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // CSS to show/hide panels
    const panelStyles = `
    .calculator-tab-panel {
      display: none;
    }
    .calculator-tab-panel.active {
      display: block;
    }
  `;

    return (
        <>
            <style>{panelStyles}</style>

            <div ref={cardsRef} className="calculator-tabs" data-sttr-wrapper>
                <div className="relative calculator-tabs-bg">
                    <div className="overflow-auto calculator-tab-nav-wrap" data-sttr-card>
                        <div className="calculator-tab-nav lg:bg-background lg:border lg:border-border lg:p-1 lg:rounded-[100px] flex gap-2.5 items-center flex-nowrap calculator-border">
                            <button 
                                type="button" 
                                className={`calculator-tab-btn lg:flex-1${activeTab === 'tab-1' ? ' active' : ''}`} 
                                data-tab="tab-1"
                                onClick={() => switchTab('tab-1')}
                            >
                                Personal Loan
                            </button>
                            <div className="w-px h-7 bg-border hidden lg:block"></div>
                            <button 
                                type="button" 
                                className={`calculator-tab-btn lg:flex-1${activeTab === 'tab-2' ? ' active' : ''}`}
                                data-tab="tab-2"
                                onClick={() => switchTab('tab-2')}
                            >
                                Business Credit
                            </button>
                            <div className="w-px h-7 bg-border hidden lg:block"></div>
                            <button 
                                type="button" 
                                className={`calculator-tab-btn lg:flex-1${activeTab === 'tab-3' ? ' active' : ''}`}
                                data-tab="tab-3"
                                onClick={() => switchTab('tab-3')}
                            >
                                Vehicle Loan
                            </button>
                            <div className="w-px h-7 bg-border hidden lg:block"></div>
                            <button 
                                type="button" 
                                className={`calculator-tab-btn lg:flex-1${activeTab === 'tab-4' ? ' active' : ''}`}
                                data-tab="tab-4"
                                onClick={() => switchTab('tab-4')}
                            >
                                Mortgage Tech
                            </button>
                            <div className="w-px h-7 bg-border hidden lg:block"></div>
                            <button 
                                type="button" 
                                className={`calculator-tab-btn lg:flex-1${activeTab === 'tab-5' ? ' active' : ''}`}
                                data-tab="tab-5"
                                onClick={() => switchTab('tab-5')}
                            >
                                SME Lending
                            </button>
                        </div>
                    </div>
                </div>

                <div className="calculator-tab-content mt-8" data-sttr-card>
                    {renderPanel('tab-1')}
                    {renderPanel('tab-2')}
                    {renderPanel('tab-3')}
                    {renderPanel('tab-4')}
                    {renderPanel('tab-5')}
                </div>
            </div>
        </>
    )
}
