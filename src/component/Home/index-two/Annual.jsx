import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import mony from "../../../assets/img/home-v2/securevest-edge/mony.svg";

export default function Annual() {

    const chartCanvasRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const resizeTimerRef = useRef(null);

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

    // Chart initialization
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

            const chart = new window.Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ['1', '2', '3', '4', '5', '6'],
                    datasets: [
                        {
                            label: 'Initial contribution',
                            data: [1750, 0, 0, 0, 0, 0],
                            backgroundColor: '#3B82F6',
                            borderColor: '#3B82F6',
                            borderWidth: 0,
                            borderRadius: 0,
                        },
                        {
                            label: 'Savings',
                            data: [16000, 24000, 29000, 35500, 42000, 40000],
                            backgroundColor: '#D1DE6F',
                            borderColor: '#D1DE6F',
                            borderWidth: 0,
                            borderRadius: 0,
                        },
                        {
                            label: 'Growth',
                            data: [0, 0, 1000, 2000, 3000, 3500],
                            backgroundColor: '#9CA3AF',
                            borderColor: '#9CA3AF',
                            borderWidth: 0,
                            borderRadius: 0,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    aspectRatio: isMobile ? 1.2 : isTablet ? 1.5 : 1.8,
                    indexAxis: 'x',
                    scales: {
                        x: {
                            stacked: true,
                            grid: { display: false, drawBorder: false },
                            border: { display: false },
                            ticks: {
                                color: 'rgba(255, 255, 255, 0.7)',
                                font: { size: isMobile ? 11 : isTablet ? 12 : 13 },
                            },
                        },
                        y: {
                            stacked: true,
                            beginAtZero: true,
                            max: 45000,
                            ticks: {
                                stepSize: 5000,
                                color: 'rgba(255, 255, 255, 0.7)',
                                font: { size: isMobile ? 10 : isTablet ? 11 : 12 },
                                callback: (value) => '$' + value.toLocaleString(),
                            },
                            grid: { display: true, color: 'rgba(255, 255, 255, 0.1)', drawBorder: false },
                            border: { display: false },
                        },
                    },
                    plugins: {
                        title: {
                            display: true,
                            text: 'Savings breakdown',
                            align: 'start',
                            color: '#FFFFFF',
                            font: { size: isMobile ? 16 : isTablet ? 18 : 20, weight: '600' },
                            padding: { top: 0, bottom: isMobile ? 10 : 20 },
                        },
                        legend: {
                            display: true,
                            position: 'bottom',
                            align: 'center',
                            labels: {
                                color: '#FFFFFF',
                                padding: isMobile ? 8 : 12,
                                font: { size: isMobile ? 11 : isTablet ? 12 : 13 },
                                usePointStyle: true,
                                pointStyle: 'circle',
                                boxWidth: 8,
                                boxHeight: 8,
                            },
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            titleColor: '#fff',
                            bodyColor: '#fff',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                            borderWidth: 1,
                            padding: isMobile ? 8 : 12,
                            titleFont: { size: isMobile ? 11 : 12 },
                            bodyFont: { size: isMobile ? 10 : 11 },
                            displayColors: true,
                            callbacks: {
                                label: (context) => {
                                    return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                                },
                            },
                        },
                    },
                    interaction: { intersect: false, mode: 'index' },
                },
            });

            chartInstanceRef.current = chart;
        };

        createChart();

        const handleResize = () => {
            clearTimeout(resizeTimerRef.current);
            resizeTimerRef.current = setTimeout(() => {
                if (chartInstanceRef.current) {
                    chartInstanceRef.current.resize();
                }
            }, 250);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearTimeout(resizeTimerRef.current);
            window.removeEventListener('resize', handleResize);
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
                chartInstanceRef.current = null;
            }
        };
    }, []);

    return (
        <>
            <div className="flex items-start gap-6 flex-col lg:flex-row" data-sttr-card>
                <div className="lg:max-w-151 w-full p-5 sm:p-8 lg:p-10 bg-white/10 border border-white/10 backdrop-blur-[34px] rounded-2xl relative z-50">
                    <h3 className="text-xl md:text-[22px] flex items-start sm:items-center gap-2.5 text-title_white font-semibold mb-6 md:mb-9">
                        <img className="mt-1 sm:mt-0" src={mony} alt="money-icon" />
                        Annual Investment Returns
                    </h3>
                    <form className="grid sm:grid-cols-2 lg:grid-cols-1 gap-6 w-full">

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

                        <div className="col-span-1 sm:col-span-2 lg:col-span-1">
                            <button type="button" className="button-primary">Calculate My Potential</button>
                        </div>
                    </form>
                </div>
                <div className="lg:max-w-227 w-full p-5 sm:p-8 lg:p-10 bg-white/10 border border-white/10 backdrop-blur-[34px] rounded-2xl">
                    <h3 className="text-xl md:text-[22px] gap-2.5 text-title_white font-semibold">Savings required:</h3>
                    <span className="text-4xl sm:text-[42px] font-bold leading-none! text-primary inline-block mt-4">$ 524
                        <sub className="text-[#CCCCCC] font-normal text-lg bottom-0"> monthly</sub>
                    </span>
                    <p className="text-sm text-white font-semibold mt-4">to reach your goal of $40,000 in 5 years, 10 months.</p>
                    <div className="py-4 sm:py-6 lg:py-9 my-4 sm:my-6 lg:my-9 border-y border-white/10 flex flex-wrap justify-between gap-5">
                        <div className="">
                            <p className="text-sm text-white font-semibold">Total contributions:</p>
                            <h4 className="text-2xl md:text-[26px] leading-none! font-bold text-white mt-4">$ 36,695</h4>
                        </div>
                        <div className="">
                            <p className="text-sm text-white font-semibold">Total growth:</p>
                            <h4 className="text-2xl md:text-[26px] leading-none! font-bold text-white mt-4">$ 3,305</h4>
                        </div>
                    </div>
                    <div className="min-h-62.5">
                        <canvas ref={chartCanvasRef} id="savingsBreakdownChart"></canvas>
                    </div>
                    <div className="mt-6 md:mt-9 flex flex-col gap-5 sm:gap-6">
                        <h3 className="text-xl md:text-[22px] flex items-center gap-2.5 text-title_white font-semibold">We're here to help you achieve your financial goals.</h3>
                        <Link className="button-solid-white" to="/financial-tools">Explore your options</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
