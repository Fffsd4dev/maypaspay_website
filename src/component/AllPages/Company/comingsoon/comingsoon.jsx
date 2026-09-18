import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import comingSoonImg from "../../../../assets/img/coming-soon-final.png";

gsap.registerPlugin(ScrollTrigger);

// Set this to your real launch date/time
const LAUNCH_DATE = new Date("2026-12-01T00:00:00");

function getTimeLeft() {
    const diff = +LAUNCH_DATE - +new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
}

export default function HeroComingSoon() {

    const cardsRef = useRef(null);
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

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
                scrollTrigger: { trigger: cardsRef.current, start: "top 75%", once: true },
            });
        }, cardsRef);
        return () => ctx.revert();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
        return () => clearInterval(interval);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return;
        // TODO: wire this up to your actual notify/subscribe endpoint
        setSubmitted(true);
    };

    const units = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Minutes", value: timeLeft.minutes },
        { label: "Seconds", value: timeLeft.seconds },
    ];

    return (
        <div ref={cardsRef} className="py-15 md:py-25 lg:py-32" data-sttr-wrapper>
            <div className="container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

                    <div className="text-center lg:text-left order-2 lg:order-1">
                        <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium" data-sttr-card>
                            🚀 Launching Soon
                        </span>

                        <h1 className="text-4xl sm:text-[40px] md:text-5xl lg:text-[52px] font-bold leading-tight" data-sttr-card>
                            We're Building Something You'll Love
                        </h1>

                        <p className="mt-4 max-w-md mx-auto lg:mx-0 text-secondary" data-sttr-card>
                            Track spending, hit savings goals, and see your money clearly — all in one app. We're putting the finishing touches on it now.
                        </p>

                        <div className="mt-8 flex items-center justify-center lg:justify-start gap-3 sm:gap-6" data-sttr-card>
                            {units.map((unit) => (
                                <div key={unit.label} className="flex flex-col items-center">
                                    <div className="w-16 sm:w-20 py-3 rounded-xl bg-secondary/5 text-2xl sm:text-3xl font-bold tabular-nums">
                                        {String(unit.value).padStart(2, "0")}
                                    </div>
                                    <span className="mt-2 text-xs sm:text-sm text-secondary">{unit.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-center lg:justify-start" data-sttr-card>
                            {submitted ? (
                                <p className="text-primary font-medium">Thanks — we'll email you when we launch!</p>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full rounded-full border border-secondary/20 px-5 py-3 outline-none focus:border-primary"
                                    />
                                    <button type="submit" className="button-primary w-full sm:w-auto whitespace-nowrap">
                                        Notify Me
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 max-w-md mx-auto" data-sttr-card>
                        <img src={comingSoonImg} alt="App preview illustration" className="w-full h-auto" />
                    </div>

                </div>
            </div>
        </div>
    );
}