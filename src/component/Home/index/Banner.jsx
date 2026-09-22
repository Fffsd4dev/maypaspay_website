// import { useEffect, useRef } from "react";

// import start from "../../../assets/img/home-v1/start.svg";

// export default function Banner() {

//     const marqueeRef = useRef(null);
//     const speedRef = useRef(1);
//     const animationRef = useRef(null);

//     useEffect(() => {

//         const marquee = marqueeRef.current;

//         if (!marquee) return;

//         let position = 0;

//         const animate = () => {

//             position -= speedRef.current;

//             if (Math.abs(position) >= marquee.scrollWidth / 2) {
//                 position = 0;
//             }

//             marquee.style.transform = `translate3d(${position}px, 0, 0)`;

//             animationRef.current = requestAnimationFrame(animate);
//         };

//         animationRef.current = requestAnimationFrame(animate);

//         const handleMouseEnter = () => {
//             speedRef.current = 0;
//         };

//         const handleMouseLeave = () => {
//             speedRef.current = 1;
//         };

//         marquee.addEventListener("mouseenter", handleMouseEnter);
//         marquee.addEventListener("mouseleave", handleMouseLeave);

//         return () => {

//             cancelAnimationFrame(animationRef.current);

//             marquee.removeEventListener("mouseenter", handleMouseEnter);
//             marquee.removeEventListener("mouseleave", handleMouseLeave);

//         };

//     }, []);

//     const items = [
//         "Regulatory Compliance",
//         "Global Markets",
//         "Institutional Trading",
//         "Wealth Management",
//         "Market Analysis Tools",
//         "Market Analysis Tools",
//         "Strategic Risk Analysis",
//     ];

//   return (
//     <div className="py-6 bg-primary overflow-hidden">
//         <div className="">
            
//             <div ref={marqueeRef} className="marquee-slider flex gap-9 will-change-transform">
                
//                 {[...items, ...items].map((item, index) => (

//                     <div
//                         key={index}
//                         className="flex items-center gap-9"
//                     >

//                         <div className="whitespace-nowrap">
//                             <img
//                                 className="rotate w-4.5 h-4.5 min-w-4.5 min-h-4.5"
//                                 src={start}
//                                 alt="star"
//                             />
//                         </div>

//                         <div className="whitespace-nowrap text-base sm:text-lg leading-none! font-semibold text-title_black">
//                             {item}
//                         </div>

//                     </div>

//                 ))}

//             </div>

//         </div>
//     </div>
//   )
// }



import { useEffect, useRef, useState } from "react";

import start from "../../../assets/img/home-v1/start.svg";

const FIAT_PAIRS = [
    { base: "USD", quote: "NGN", label: "USD/NGN", flagCode: "us" },
    { base: "EUR", quote: "NGN", label: "EUR/NGN", flagCode: "eu" },
    { base: "GBP", quote: "NGN", label: "GBP/NGN", flagCode: "gb" },
];

const CRYPTO_IDS = ["bitcoin", "ethereum", "tether"];

export default function Banner() {

    const marqueeRef = useRef(null);
    const speedRef = useRef(1);
    const animationRef = useRef(null);

    const [items, setItems] = useState([]);

    // Fetch rates on mount, then refresh every 5 minutes
    useEffect(() => {

        let cancelled = false;

        const fetchRates = async () => {
            try {
                const [fxRes, cryptoRes] = await Promise.all([
                    fetch("https://open.er-api.com/v6/latest/USD"),
                    fetch(
                        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${CRYPTO_IDS.join(
                            ","
                        )}&price_change_percentage=24h`
                    ),
                ]);

                const fxData = await fxRes.json();
                const cryptoData = await cryptoRes.json();

                if (cancelled) return;

                const fxItems = FIAT_PAIRS.map(({ base, quote, label, flagCode }) => {
                    // rates are USD-based; convert USD->quote and USD->base if needed
                    const usdToQuote = fxData?.rates?.[quote];
                    const usdToBase = base === "USD" ? 1 : fxData?.rates?.[base];

                    if (!usdToQuote || !usdToBase) return null;

                    const rate = usdToQuote / usdToBase;

                    return {
                        key: label,
                        label,
                        value: rate.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        }),
                        icon: `https://flagcdn.com/w40/${flagCode}.png`,
                        change: null,
                    };
                }).filter(Boolean);

                const cryptoItems = (cryptoData || []).map((coin) => ({
                    key: coin.id,
                    label: coin.symbol?.toUpperCase(),
                    value: `$${coin.current_price?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}`,
                    icon: coin.image,
                    change:
                        typeof coin.price_change_percentage_24h === "number"
                            ? coin.price_change_percentage_24h
                            : null,
                }));

                setItems([...fxItems, ...cryptoItems]);
            } catch (err) {
                console.error("Failed to fetch rates:", err);
            }
        };

        fetchRates();
        const interval = setInterval(fetchRates, 5 * 60 * 1000);

        return () => {
            cancelled = true;
            clearInterval(interval);
        };

    }, []);

    useEffect(() => {

        const marquee = marqueeRef.current;

        if (!marquee || items.length === 0) return;

        let position = 0;

        const animate = () => {

            position -= speedRef.current;

            if (Math.abs(position) >= marquee.scrollWidth / 2) {
                position = 0;
            }

            marquee.style.transform = `translate3d(${position}px, 0, 0)`;

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        const handleMouseEnter = () => {
            speedRef.current = 0;
        };

        const handleMouseLeave = () => {
            speedRef.current = 1;
        };

        marquee.addEventListener("mouseenter", handleMouseEnter);
        marquee.addEventListener("mouseleave", handleMouseLeave);

        return () => {

            cancelAnimationFrame(animationRef.current);

            marquee.removeEventListener("mouseenter", handleMouseEnter);
            marquee.removeEventListener("mouseleave", handleMouseLeave);

        };

    }, [items]);

    if (items.length === 0) return null;

  return (
    <div className="py-6 bg-black overflow-hidden">
        <div className="">

            <div ref={marqueeRef} className="marquee-slider flex gap-9 will-change-transform">

                {[...items, ...items].map((item, index) => (

                    <div
                        key={`${item.key}-${index}`}
                        className="flex items-center gap-9"
                    >

                        <div className="whitespace-nowrap">
                            <img
                                className="rotate w-4.5 h-4.5 min-w-4.5 min-h-4.5"
                                src={start}
                                alt="star"
                            />
                        </div>

                        <div className="whitespace-nowrap text-base sm:text-lg leading-none! font-semibold text-white flex items-center gap-2">
                            {item.icon && (
                                <img
                                    src={item.icon}
                                    alt={item.label}
                                    className="w-5 h-5 min-w-5 min-h-5 rounded-full object-cover"
                                />
                            )}
                            <span>{item.label}</span>
                            <span>{item.value}</span>
                            {typeof item.change === "number" && (
                                <span
                                    className={
                                        item.change >= 0
                                            ? "text-green-400"
                                            : "text-red-400"
                                    }
                                >
                                    {item.change >= 0 ? "▲" : "▼"}
                                    {Math.abs(item.change).toFixed(1)}%
                                </span>
                            )}
                        </div>

                    </div>

                ))}

            </div>

        </div>
    </div>
  )
}