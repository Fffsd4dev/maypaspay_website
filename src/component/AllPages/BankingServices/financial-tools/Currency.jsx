import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import roiCalculatorBg from "../../../../assets/img/home-v1/roi-calculator-bg-shape.webp";
import titlePrimary from "../../../../assets/img/title-icon-primary.svg";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function formatCurrencyOutput(value, currencyCode) {
    const noDecimals = ["JPY", "KRW", "VND", "IDR"].includes(currencyCode);
    return new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: noDecimals ? 0 : 2,
        maximumFractionDigits: noDecimals ? 0 : 2,
    }).format(value);
}

export default function Currency() {

    const sectionRef = useRef(null);
    const cardsRef = useRef(null);

    const amountRef = useRef(null);
    const fromRef = useRef(null);
    const targetRef = useRef(null);
    const outputRef = useRef(null);
    const swapRef = useRef(null);

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

    // ========== <-- NEW: Currency Exchange Calculator Logic ==========
    useEffect(() => {
        const amountInput = amountRef.current;
        const fromSelect = fromRef.current;
        const targetSelect = targetRef.current;
        const outputInput = outputRef.current;
        const swapButton = swapRef.current;

        if (!amountInput || !fromSelect || !targetSelect || !outputInput) return;

        // Debounce timer
        let debounceTimer = null;

        // Core conversion function
        const performConversion = () => {
            const amount = parseFloat(amountInput.value) || 0;
            const from = fromSelect.value;
            const to = targetSelect.value;

            if (amount <= 0) {
                outputInput.value = "";
                return;
            }
            if (from === to) {
                outputInput.value = formatCurrencyOutput(amount, to);
                return;
            }

            outputInput.value = "…"; // loading indicator

            // Primary API: exchangerate.host
            const primaryUrl = `https://api.exchangerate.host/convert?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&amount=${encodeURIComponent(amount)}`;

            // Fallback 1: static CDN (daily rates)
            const fromLower = from.toLowerCase();
            const toLower = to.toLowerCase();
            const fallbackUrl = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${encodeURIComponent(fromLower)}.min.json`;

            // Fallback 2: open.er-api.com
            const erApiUrl = `https://open.er-api.com/v6/latest/${encodeURIComponent(from)}`;

            const tryPrimary = () =>
                fetch(primaryUrl, { method: "GET", mode: "cors", headers: { Accept: "application/json" } })
                    .then((res) => {
                        if (!res.ok) throw new Error(`Primary HTTP ${res.status}`);
                        return res.json();
                    })
                    .then((data) => {
                        if (data && typeof data.result === "number") {
                            outputInput.value = formatCurrencyOutput(data.result, to);
                        } else if (data && data.rates && data.rates[to] != null) {
                            outputInput.value = formatCurrencyOutput(data.rates[to] * amount, to);
                        } else {
                            throw new Error("Primary response missing rate");
                        }
                    });

            const tryFallbackStatic = () =>
                fetch(fallbackUrl, { method: "GET", mode: "cors", headers: { Accept: "application/json" } })
                    .then((res) => {
                        if (!res.ok) throw new Error(`Static CDN HTTP ${res.status}`);
                        return res.json();
                    })
                    .then((data) => {
                        if (data && data[fromLower] && typeof data[fromLower][toLower] === "number") {
                            const rate = data[fromLower][toLower];
                            outputInput.value = formatCurrencyOutput(rate * amount, to);
                        } else {
                            throw new Error("Static CDN missing rate");
                        }
                    });

            const tryFallbackER = () =>
                fetch(erApiUrl, { method: "GET", mode: "cors", headers: { Accept: "application/json" } })
                    .then((res) => {
                        if (!res.ok) throw new Error(`ER API HTTP ${res.status}`);
                        return res.json();
                    })
                    .then((data) => {
                        if (data && data.rates && typeof data.rates[to] === "number") {
                            outputInput.value = formatCurrencyOutput(data.rates[to] * amount, to);
                        } else {
                            throw new Error("ER API missing rate");
                        }
                    });

            // Chain: primary → static → ER → error
            tryPrimary()
                .catch(() => tryFallbackStatic())
                .catch(() => tryFallbackER())
                .catch(() => {
                    outputInput.value = "";
                    console.warn("Unable to fetch exchange rates. Check connection.");
                });
        };

        // Debounced version for input
        const handleInput = () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(performConversion, 400);
        };

        // Event listeners
        amountInput.addEventListener("input", handleInput);
        amountInput.addEventListener("change", performConversion);
        fromSelect.addEventListener("change", performConversion);
        targetSelect.addEventListener("change", performConversion);

        // Swap button
        if (swapButton) {
            swapButton.addEventListener("click", () => {
                const fromVal = fromSelect.value;
                const toVal = targetSelect.value;
                fromSelect.value = toVal;
                targetSelect.value = fromVal;
                // If you use niceSelect, update here (we skip it to keep simple)
                performConversion();
            });
        }

        // Initial conversion on mount
        performConversion();

        // Cleanup
        return () => {
            clearTimeout(debounceTimer);
            amountInput.removeEventListener("input", handleInput);
            amountInput.removeEventListener("change", performConversion);
            fromSelect.removeEventListener("change", performConversion);
            targetSelect.removeEventListener("change", performConversion);
            if (swapButton) {
                swapButton.removeEventListener("click", performConversion);
            }
        };
    }, []);

    return (
        <>
            <section className="section-spacing-md overflow-hidden">
                <div className="container-lg">
                    <div className="pt-10 pb-4 px-4 sm:p-10 xl:p-18 2xl:p-25 bg-secondary rounded-2xl md:rounded-3xl relative z-1">
                        <img className="w-full absolute bottom-0 left-0 -z-1" src={roiCalculatorBg} alt="background-shape" />
                        <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                            <div className="md:max-w-170 w-full">
                                <div className="flex items-center gap-2.5">
                                    <img className="rotate" src={titlePrimary} alt="title-icon" />
                                    <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">FOREIGN EXCHANGE RATES</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4" data-content>Real-Time Global Currency Exchange</h2>
                            </div>
                            <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_white" data-content>Our automated engine updates every 60 seconds, ensuring your cross-border transactions and digital wallet conversions.</p>
                        </div>

                        {/* <!-- Currency Exchange Calculator --> */}
                        <div ref={cardsRef} data-sttr-wrapper>
                            <div className="currency-exchange-calculator px-4 py-6 md:p-6 bg-white/5 border border-white/10 backdrop-blur-[34px] rounded-2xl md:rounded-3xl" data-sttr-card>
                                <div className="flex flex-col sm:flex-row items-center xl:items-end gap-4 md:gap-6">
                                    <div className="w-full sm:flex-1 grid grid-cols-1 xl:grid-cols-2 gap-3">
                                        <div className="">
                                            <label className="text-base font-normal leading-normal text-white mb-2 block">Amount</label>
                                            <input 
                                                ref={amountRef}
                                                type="number" 
                                                id="currencyAmount" 
                                                className="currency-input h-11 w-full bg-white/10 border border-white/10 rounded-[100px] pl-5 pr-4 text-base font-semibold text-white outline-none duration-300 focus:border-primary" 
                                                defaultValue="1000" 
                                                min="1" 
                                                step="1" 
                                                placeholder="1000" 
                                            />
                                        </div>
                                        <div className="select-box-dark backdrop-blur-none currency-select-wrapper">
                                            <label className="text-base font-normal leading-normal text-white mb-2 block">From</label>
                                            <select 
                                                ref={fromRef}
                                                id="currencyFrom" 
                                                className="select-active currency-select h-11 w-full bg-white/10 border border-white/10 backdrop-blur-[34px] rounded-[100px] px-5 text-base font-semibold text-white cursor-pointer appearance-none outline-none duration-300 focus:border-primary"
                                            >
                                                <option value="USD">USD - US Dollar</option>
                                                <option value="CAD">CAD - Canadian Dollar</option>
                                                <option value="EUR">EUR - Euro</option>
                                                <option value="JPY">JPY - Japanese Yen</option>
                                                <option value="INR">INR - Indian Rupee</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="w-12.5">
                                        <button 
                                            ref={swapRef}
                                            type="button" 
                                            id="currencySwap" 
                                            className="currency-swap-btn w-12.5 h-12.5 rounded-full flex items-center justify-center text-white hover:bg-primary hover:text-title_black transition-all duration-300 border border-white hover:border-transparent" 
                                            aria-label="Swap currencies"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.0364 1.19818L13.283 3.45136H0.627894V4.70595H13.283L11.0373 6.95818L11.922 7.84289L15.6867 4.07818L11.922 0.313477L11.0373 1.19818H11.0364ZM0.626953 11.6076L4.39166 15.3723L5.27636 14.4876L3.03072 12.2354H15.6867V10.9808H3.03072L5.27636 8.72759L4.39166 7.84289L0.626953 11.6076Z" fill="currentColor" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="w-full sm:flex-1 grid grid-cols-1 xl:grid-cols-2 gap-3">
                                        <div className="select-box-dark backdrop-blur-none currency-select-wrapper">
                                            <label className="text-base font-normal leading-normal text-white mb-2 block">Target</label>
                                            <select 
                                                ref={targetRef}
                                                id="currencyTarget" 
                                                className="select-active currency-select h-11 w-full bg-white/10 border border-white/10 backdrop-blur-[34px] rounded-[100px] px-5 text-base font-semibold text-white cursor-pointer appearance-none outline-none duration-300 focus:border-primary"
                                            >
                                                <option value="CAD">CAD - Canadian Dollar</option>
                                                <option value="USD">USD - US Dollar</option>
                                                <option value="EUR">EUR - Euro</option>
                                                <option value="JPY">JPY - Japanese Yen</option>
                                                <option value="INR">INR - Indian Rupee</option>
                                            </select>
                                        </div>
                                        <div className="">
                                            <label className="text-base font-normal leading-normal text-white mb-2 block">Output</label>
                                            <input 
                                                ref={outputRef}
                                                type="text" 
                                                id="currencyOutput" 
                                                className="currency-output h-11 w-full bg-white/10 border border-white/10 rounded-[100px] pl-5 pr-4 text-base font-semibold text-white outline-none cursor-default" 
                                                readOnly
                                                placeholder="—"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 flex items-start lg:items-center gap-4 lg:gap-3 justify-between flex-col lg:flex-row">
                                    <p className="flex items-center gap-1.5 mt-2 text-sm text-paragraph_white">
                                        We use midmarket rates
                                        <span className="currency-info-tooltip inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20 text-white text-xs cursor-help" title="Mid-market rate is the midpoint between buy and sell prices from global markets.">i</span>
                                    </p>
                                    <div className="flex flex-wrap items-end gap-3">
                                        <button type="button" className="button-primary" id="currencyTrackBtn">Track currency</button>
                                        <Link to="/contact" className="button-solid-black" id="currencyQuoteBtn">
                                            View transfer quote
                                            <svg className="w-2.75 h-2.75 fill-current">
                                                <use href="#buttonArrow"></use>
                                            </svg>
                                        </Link>
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
