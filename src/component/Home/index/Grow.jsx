import { useState, useRef, useEffect, useCallback } from "react";

export default function Grow() {

    const [deposit, setDeposit] = useState(50);
    const [duration, setDuration] = useState(24);

    const depositSliderRef = useRef(null);
    const durationSliderRef = useRef(null);
    const depositValueRef = useRef(null);
    const durationValueRef = useRef(null);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    const calculateBalance = () => {
        let balance = 0;

        for (let i = 1; i <= duration; i++) {
            balance = (balance + deposit) * 1.0075;
        }

        return Math.round(balance);
    };

    const result = calculateBalance();

    const updateSlider = useCallback(
        (slider, valueElement, isCurrency = false) => {
            if (!slider || !valueElement) return;

            const value = Number(slider.value);
            const min = Number(slider.min);
            const max = Number(slider.max);

            const percentage = ((value - min) / (max - min)) * 100;

            valueElement.textContent = isCurrency
                ? formatCurrency(value)
                : value;

            const left = (percentage / 100) * (slider.offsetWidth - 24) + 12;

            valueElement.style.left = `${left}px`;

            slider
                .closest(".slider-container")
                ?.style.setProperty("--slider-progress", `${percentage}%`);
        },
        []
    );

    useEffect(() => {
        updateSlider(
            depositSliderRef.current,
            depositValueRef.current,
            true
        );

        updateSlider(
            durationSliderRef.current,
            durationValueRef.current,
            false
        );
    }, [deposit, duration, updateSlider]);

    useEffect(() => {
        let timeout;

        const handleResize = () => {
            clearTimeout(timeout);

            timeout = setTimeout(() => {
                updateSlider(
                    depositSliderRef.current,
                    depositValueRef.current,
                    true
                );

                updateSlider(
                    durationSliderRef.current,
                    durationValueRef.current,
                    false
                );
            }, 250);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener("resize", handleResize);
        };
    }, [updateSlider]);

  return (
    <div className="pt-6 pb-4 px-4 sm:p-8 lg:p-9 bg-white/10 border border-white/10 rounded-2xl backdrop-blur-[34px]">
        <div className="financial-calculator">
            <h2 className="text-white leading-none! text-2xl md:text-3xl lg:text-4xl font-bold">How will money grow?</h2>
            <div className="calculator-controls mt-8 lg:mt-12 flex flex-col gap-6 lg:gap-9">
                <div className="slider-group relative">
                    <label className="slider-label text-base sm:text-lg leading-none! font-medium text-white mb-2.5 block">Deposit Per Month</label>
                    <div className="slider-container relative">
                        <input 
                            ref={depositSliderRef} 
                            type="range" 
                            id="depositSlider" 
                            className="slider" 
                            min="10" 
                            max="1000" 
                            value={deposit}
                            step="10"
                            onChange={(e) =>
                                setDeposit(Number(e.target.value))
                            }
                        />
                        <div ref={depositValueRef} className="slider-value" id="depositValue">{formatCurrency(deposit)}</div>
                    </div>
                </div>

                <div className="slider-group relative">
                    <label className="slider-label text-base sm:text-lg leading-none! font-medium text-white mb-2.5 block">Deposit Duration (Month)</label>
                    <div className="slider-container relative">
                        <input 
                            ref={durationSliderRef}
                            type="range" 
                            id="durationSlider" 
                            className="slider" 
                            min="1" 
                            max="120" 
                            value={duration}
                            step="1"
                            onChange={(e) =>
                                setDuration(Number(e.target.value))
                            }
                        />
                        <div ref={durationValueRef} className="slider-value" id="durationValue">{duration}</div>
                    </div>
                </div>
            </div>

            <div className="calculator-result mt-8 lg:mt-12 p-8 lg:p-15 bg-white/10 border border-white/10 flex flex-col justify-center gap-2 items-center text-center rounded-2xl">
                <h3 className="text-white font-bold leading-none!" id="resultValue">{formatCurrency(result)}</h3>
                <div className="text-base leading-none text-white" id="resultDescription">
                    Your balance after {duration}{" "}
                    {duration === 1 ? "month" : "months"}
                </div>
            </div>
        </div>
    </div>
  )
}
