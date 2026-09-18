import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';

import roiCalculatorBg from "../../../../assets/img/home-v1/roi-calculator-bg-shape.webp";
import titlePrimary from "../../../../assets/img/title-icon-primary.svg";

gsap.registerPlugin(ScrollTrigger);

export default function RoiCalculatorTwo() {

    const sectionRef = useRef(null);
    const formRef = useRef(null);
    const chartCanvasRef = useRef(null);
    const chartInstanceRef = useRef(null);

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

    // ----- Form handler -----
    useEffect(() => {
        const form = formRef.current;
        if (form) {
            const handleSubmit = (e) => e.preventDefault();
            form.addEventListener("submit", handleSubmit);

            const submitBtn = form.querySelector('button[type="submit"], [type="submit"]');
            if (submitBtn) {
                const handleClick = (e) => e.preventDefault();
                submitBtn.addEventListener("click", handleClick);
                form._submitBtnClickHandler = handleClick;
            }
            form._submitHandler = handleSubmit;

            return () => {
                form.removeEventListener("submit", handleSubmit);
                if (submitBtn && form._submitBtnClickHandler) {
                    submitBtn.removeEventListener("click", form._submitBtnClickHandler);
                    delete form._submitBtnClickHandler;
                }
                delete form._submitHandler;
            };
        }
    }, []);

    // ===== CHART INITIALIZATION  =====
    useEffect(() => {
        const canvas = chartCanvasRef.current;
        if (!canvas) return;

        const createChart = () => {
            if (typeof window.Chart === 'undefined') {
                setTimeout(createChart, 100);
                return;
            }

            const ctx = canvas.getContext('2d');
            const isMobile = window.innerWidth < 768;
            const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

            let gradientsApplied = false;

            const chart = new window.Chart(ctx, {
                type: "line",
                data: {
                    labels: [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036],
                    datasets: [
                        {
                            label: "Conservative",
                            data: [30, 30, 30, 65, 100, 57, 15, 32, 50, 45, 40],
                            borderColor: "rgb(239, 68, 68)",
                            backgroundColor: "rgba(239, 68, 68, 0.3)",
                            fill: true,
                            tension: 0.4,
                            borderWidth: isMobile ? 1.5 : 1,
                            pointRadius: isMobile ? 3 : 4,
                            pointBackgroundColor: "rgb(239, 68, 68)",
                            pointBorderColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: isMobile ? 5 : 6,
                        },
                        {
                            label: "Balanced",
                            data: [75, 90, 115, 150, 185, 107, 30, 62, 95, 112, 130],
                            borderColor: "rgb(34, 197, 94)",
                            backgroundColor: "rgba(34, 197, 94, 0.3)",
                            fill: true,
                            tension: 0.4,
                            borderWidth: isMobile ? 1.5 : 1,
                            pointRadius: isMobile ? 3 : 4,
                            pointBackgroundColor: "rgb(34, 197, 94)",
                            pointBorderColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: isMobile ? 5 : 6,
                        },
                        {
                            label: "Aggressive",
                            data: [130, 157, 185, 230, 260, 187, 115, 135, 155, 175, 210],
                            borderColor: "rgb(234, 179, 8)",
                            backgroundColor: "rgba(234, 179, 8, 0.3)",
                            fill: true,
                            tension: 0.4,
                            borderWidth: isMobile ? 1.5 : 1,
                            pointRadius: isMobile ? 3 : 4,
                            pointBackgroundColor: "rgb(234, 179, 8)",
                            pointBorderColor: "#fff",
                            pointBorderWidth: 1,
                            pointHoverRadius: isMobile ? 5 : 6,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: isMobile ? 1.2 : isTablet ? 1.8 : 2,
                    plugins: {
                        title: {
                            display: true,
                            text: "Annual Investment Returns",
                            color: "#fff",
                            font: { size: isMobile ? 14 : isTablet ? 16 : 18, weight: "bold" },
                            padding: { top: isMobile ? 5 : 10, bottom: isMobile ? 10 : 20 },
                        },
                        legend: {
                            display: true,
                            position: "bottom",
                            labels: {
                                color: "#fff",
                                padding: isMobile ? 6 : 10,
                                font: { size: isMobile ? 8 : isTablet ? 9 : 10 },
                                usePointStyle: true,
                                pointStyle: "circle",
                                boxWidth: isMobile ? 6 : 8,
                                boxHeight: isMobile ? 6 : 8,
                            },
                        },
                        tooltip: {
                            backgroundColor: "rgba(0, 0, 0, 0.8)",
                            titleColor: "#fff",
                            bodyColor: "#fff",
                            borderColor: "rgba(255, 255, 255, 0.1)",
                            borderWidth: 1,
                            padding: isMobile ? 8 : 12,
                            titleFont: { size: isMobile ? 11 : 12 },
                            bodyFont: { size: isMobile ? 10 : 11 },
                            displayColors: true,
                            callbacks: {
                                label: function (context) {
                                    return context.dataset.label + ": " + context.parsed.y;
                                },
                            },
                        },
                    },
                    scales: {
                        x: {
                            title: { display: false },
                            ticks: {
                                color: "rgba(255, 255, 255, 0.7)",
                                font: { size: isMobile ? 9 : isTablet ? 10 : 11 },
                                maxRotation: 0,
                                callback: function (value, index) {
                                    if (isMobile) {
                                        return index % 3 === 0 ? this.getLabelForValue(value) : "";
                                    }
                                    return index % 2 === 0 ? this.getLabelForValue(value) : "";
                                },
                            },
                            grid: { display: false, drawBorder: false },
                            border: { display: false },
                        },
                        y: {
                            title: { display: false },
                            beginAtZero: true,
                            max: 300,
                            ticks: {
                                color: "rgba(255, 255, 255, 0.7)",
                                font: { size: isMobile ? 9 : isTablet ? 10 : 11 },
                                stepSize: isMobile ? 120 : 60,
                                callback: function (value) { return value; },
                            },
                            grid: { display: false, drawBorder: false },
                            border: { display: false },
                        },
                    },
                    interaction: { intersect: false, mode: "index" },
                    animation: {
                        onComplete: function () {
                            if (gradientsApplied) return;
                            gradientsApplied = true;

                            const chart = this.chart || chartInstanceRef.current;
                            if (!chart) return;
                            const area = chart.chartArea;
                            if (!area) return;
                            const ctx = chart.ctx;
                            const datasets = chart.data.datasets;

                            // Conservative gradient
                            if (datasets[0] && !datasets[0]._gradientApplied) {
                                const grad = ctx.createLinearGradient(0, area.top, 0, area.bottom);
                                grad.addColorStop(0, "rgba(239, 68, 68, 0.4)");
                                grad.addColorStop(0.5, "rgba(239, 68, 68, 0.2)");
                                grad.addColorStop(1, "rgba(239, 68, 68, 0)");
                                datasets[0].backgroundColor = grad;
                                datasets[0]._gradientApplied = true;
                            }
                            // Balanced gradient
                            if (datasets[1] && !datasets[1]._gradientApplied) {
                                const grad = ctx.createLinearGradient(0, area.top, 0, area.bottom);
                                grad.addColorStop(0, "rgba(34, 197, 94, 0.4)");
                                grad.addColorStop(0.5, "rgba(34, 197, 94, 0.2)");
                                grad.addColorStop(1, "rgba(34, 197, 94, 0)");
                                datasets[1].backgroundColor = grad;
                                datasets[1]._gradientApplied = true;
                            }
                            // Aggressive gradient
                            if (datasets[2] && !datasets[2]._gradientApplied) {
                                const grad = ctx.createLinearGradient(0, area.top, 0, area.bottom);
                                grad.addColorStop(0, "rgba(234, 179, 8, 0.4)");
                                grad.addColorStop(0.5, "rgba(234, 179, 8, 0.2)");
                                grad.addColorStop(1, "rgba(234, 179, 8, 0)");
                                datasets[2].backgroundColor = grad;
                                datasets[2]._gradientApplied = true;
                            }

                            requestAnimationFrame(() => {
                                chart.update("none");
                            });
                        },
                    },
                },
            });

            chartInstanceRef.current = chart;
        };

        createChart();

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.resize();
                }
            }, 250);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimer);
        };
    }, []);

    // Initialize nice-select after component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof window.$ !== 'undefined' && window.$.fn && typeof window.$.fn.niceSelect === 'function') {
                window.$('select').niceSelect();
            } else {
                setTimeout(() => {
                    if (typeof window.$ !== 'undefined' && window.$.fn && typeof window.$.fn.niceSelect === 'function') {
                        window.$('select').niceSelect();
                    }
                }, 200);
            }
        }, 100);
        return () => clearTimeout(timer);
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

  return (
    <>
        <section className="section-spacing-lg-md">
            <div className="container-lg" data-grid-reveal data-cols="15" data-rows="6" data-cols-sm="5" data-rows-sm="18" data-cols-lg="8" data-rows-lg="16" data-animation="wave" data-bg-color="white" data-trigger="top 70%" data-stagger="0.006" data-duration="0.6">

                <div className="pt-10 pb-4 px-4 sm:p-10 xl:p-18 2xl:p-25 bg-secondary rounded-2xl md:rounded-3xl relative z-1 overflow-hidden" data-content>
                    <img className="w-full hidden md:block xl:h-full absolute top-0 left-0 -z-1" src={roiCalculatorBg} alt="background-shape" />
                    <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                        <div className="md:max-w-170 w-full">
                            <div className="flex items-center gap-2.5">
                                <img className="rotate" src={titlePrimary} alt="title-icon" />
                                <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">ROI CALCULATOR</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4" data-content>Visualize Your Path to Financial Freedom</h2>
                        </div>
                        <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_white" data-content>Use our interactive ROI engine to project your wealth growth over time, allowing you to fine-tune your investment strategy.</p>
                    </div>
                    <div className="flex items-start gap-6 flex-col lg:flex-row">
                        <div className="lg:max-w-87 w-full">
                            <form ref={formRef} className="grid sm:grid-cols-2 lg:flex lg:flex-col gap-6 w-full home-1-roi-calculator">

                                <div className="select-box-dark">
                                    <label className="text-base font-normal leading-normal text-white mb-2 block">Investment Horizon (Years)</label>
                                    <select className="select-active ">
                                        <option value="1">10</option>
                                        <option value="2">20</option>
                                        <option value="3">30</option>
                                        <option value="4">40</option>
                                        <option value="5">50</option>
                                    </select>
                                </div>

                                <div className="select-box-dark">
                                    <label className="text-base font-normal leading-normal text-white mb-2 block">Risk Tolerance Profile</label>
                                    <select className="select-active ">
                                        <option value="1">Balanced</option>
                                        <option value="2">Conservative</option>
                                        <option value="3">Moderately</option>
                                        <option value="4">Moderately</option>
                                        <option value="5">Aggressive</option>
                                    </select>
                                </div>

                                <div className="select-box-dark">
                                    <label className="text-base font-normal leading-normal text-white mb-2 block">Asset Allocation Strategy</label>
                                    <select className="select-active ">
                                        <option value="1">Diversified Growth</option>
                                        <option value="2">Income Focused</option>
                                        <option value="3">Balanced Allocation</option>
                                        <option value="4">Growth Oriented</option>
                                        <option value="5">Diversified Growth</option>
                                    </select>
                                </div>

                                <div className="">
                                    <label className="text-base font-normal leading-normal text-white mb-2 block">Expected Annual Return (%)</label>
                                    <div className="relative">
                                        <input className="h-10 w-full bg-white/10 border border-white/10 backdrop-blur-[34px] rounded-[100px] cursor-pointer text-base font-semibold text-white flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-primary" type="number" defaultValue="7" />
                                        <span className="text-base font-semibold text-white absolute top-1/2 transform -translate-1/2 right-5">%</span>
                                    </div>
                                </div>

                                <div className="">
                                    <label className="text-base font-normal leading-normal text-white mb-2 block">Initial Principal Investment</label>
                                    <div className="relative">
                                        <input className="h-10 w-full bg-white/10 border border-white/10 backdrop-blur-[34px] rounded-[100px] cursor-pointer text-base font-semibold text-white flex items-center relative pl-9 pr-5 appearance-none outline-none duration-300 focus:border-primary" type="number" defaultValue="100000" />
                                        <span className="text-base font-semibold text-white absolute top-1/2 transform -translate-1/2 left-6.25">$</span>
                                    </div>
                                </div>

                                <div className="">
                                    <label className="text-base font-normal leading-normal text-white mb-2 block">Recurring Monthly Deposit</label>
                                    <div className="relative">
                                        <input className="h-10 w-full bg-white/10 border border-white/10 backdrop-blur-[34px] rounded-[100px] cursor-pointer text-base font-semibold text-white flex items-center relative pl-9 pr-5 appearance-none outline-none duration-300 focus:border-primary" type="number" defaultValue="1000" />
                                        <span className="text-base font-semibold text-white absolute top-1/2 transform -translate-1/2 left-6.25">$</span>
                                    </div>
                                </div>

                                <div className="select-box-dark">
                                    <label className="text-base font-normal leading-normal text-white mb-2 block">Compound Frequency</label>
                                    <select className="select-active ">
                                        <option value="1">Monthly</option>
                                        <option value="2">Quarterly</option>
                                        <option value="3">Semi-Annual</option>
                                        <option value="4">Annual</option>
                                        <option value="5">One-Time</option>
                                    </select>
                                </div>

                                <div className="flex items-end">
                                    <button className="button-primary w-full flex-1" type="submit">Calculate results</button>
                                </div>
                            </form>
                        </div>
                        <div className="md:max-w-227 w-full grid gap-6">
                            <div className="p-5 sm:p-6 bg-white/10 border border-white/10 rounded-2xl backdrop-blur-[34px] text-center">
                                <h3 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl leading-none">
                                    $374,051
                                </h3>
                                <p className="text-base sm:text-lg mt-3 text-white font-medium">Total Investment fund after 10 years</p>
                            </div>

                            <div className="w-full p-3 sm:p-6 bg-white/10 border border-white/10 rounded-2xl backdrop-blur-[34px] overflow-hidden">
                                <canvas ref={chartCanvasRef} id="investmentChart"></canvas>
                            </div>
                            <div className="p-5 sm:p-6 bg-white/10 border border-white/10 rounded-2xl backdrop-blur-[34px] flex items-start lg:items-center justify-between gap-4 lg:gap-6 flex-col lg:flex-row">
                                <div className="flex-1">
                                    <p className="text-white text-lg font-semibold">Get Started On Planning Your Finances</p>
                                    <p className="text-base mt-3 text-paragraph_white max-w-154.25">Our AI-driven AdvisorMatch tool will help you find a certified specialist to plan your custom portfolio.</p>
                                </div>
                                <div className="w-fit">
                                    <Link to="/contact" className="button-autline-white w-fit">
                                        Find an advisor
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
