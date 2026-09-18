import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

import bannerShape from "../../../assets/img/home-v1/banner-shape.png";
import bannerStar01 from "../../../assets/img/banner/banner-star-shape-01.svg";

import Grow from "./Grow";

export default function Hero() {

    const heroRef = useRef(null);

    //  Email Form
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [emailSuccess, setEmailSuccess] = useState("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = (e) => {
        e.preventDefault();

        const value = email.trim();

        setEmailError("");
        setEmailSuccess("");

        if (!value) {
            setEmailError("Email is required.");
            return;
        }

        if (!emailRegex.test(value)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        setEmailSuccess("Thank you! You've been subscribed.");
        setEmail("");

        setTimeout(() => {
            setEmailSuccess("");
        }, 4000);
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;

        setEmail(value);

        if (emailError) {
            setEmailError("");
        }
    };

    // For Animation
    useEffect(() => {

        if (!heroRef.current) return;

        const ctx = gsap.context(() => {

            const elements = heroRef.current.querySelectorAll(
                "[data-subtitle], [data-title], [data-excerpt], .btn-sttr, .btn, [data-button], .thumbnail-img, .thumb-image, [data-thumb]"
            );

            if (!elements.length) return;

            gsap.set(elements, {
                y: 60,
                opacity: 0,
                filter: "blur(6px)",
                visibility: "hidden",
            });

            const tl = gsap.timeline({
                defaults: {
                    ease: "power2.out",
                },
            });

            elements.forEach((element, index) => {
                tl.to(
                    element,
                    {
                        y: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                        visibility: "visible",
                        duration: 0.6,
                    },
                    index === 0 ? 0 : "-=0.5"
                );
            });

        }, heroRef);

        return () => ctx.revert();

    }, []);

    return (
        <>
            <section ref={heroRef} className="py-14 md:py-20 lg:py-24 xl:py-28.5 bg-secondary relative z-1" data-hero-banner>
                <img className="absolute -z-1 w-full h-full top-0 left-0" src={bannerShape} alt="banner-shape" />
                <img className="absolute -z-1 top-[2%] md:top-[5%] left-[80%] md:left-[12%] rotate" src={bannerStar01} alt="banner-shape" />
                <div className="container">
                    <div className="flex items-center justify-between gap-10 flex-col md:flex-row">
                        <div className="md:max-w-137.5 w-full">
                            <h1 className="text-[40px] sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[80px] leading-tight! text-white font-bold max-md:max-w-120" data-title>Empowering your financial future</h1>
                            <p className="text-base sm:text-lg text-paragraph_white mt-4" data-excerpt>We help individuals and businesses grow wealth, reduce risk, and achieve long-term success. Our AI-driven platform analyzes your profile in real-time to unlock the best loan opportunities tailored to your needs.</p>
                            
                            <form 
                                className="mt-8 md:mt-12 relative w-full max-w-92.5" 
                                data-button 
                                id="hero-email-form" 
                                noValidate 
                                onSubmit={handleSubmit}
                                data-gramm="false" 
                                data-gramm_editor="false"
                            >
                                <input 
                                    className={`w-full h-12.5 md:h-14.5 rounded-[100px] p-4 pr-40 duration-300 outline-0 focus:bg-white/10 focus:backdrop-blur-2xl placeholder:text-paragraph_white text-white border ${
                                        emailError
                                            ? "border-red-500"
                                            : email &&
                                              emailRegex.test(email)
                                            ? "border-green-500"
                                            : "border-primary"
                                    }`}
                                    type="email" 
                                    value={email}
                                    onChange={handleEmailChange}
                                    id="hero-email" 
                                    placeholder="Enter your email" 
                                    required 
                                />
                                {emailError && (
                                    <span
                                        className="mt-2 text-sm text-red-400 block"
                                        role="alert"
                                    >
                                        {emailError}
                                    </span>
                                )}

                                {emailSuccess && (
                                    <span
                                        className="mt-2 text-sm text-primary block"
                                        role="status"
                                    >
                                        {emailSuccess}
                                    </span>
                                )}
                                <button type="submit" className="button-primary bg-primary before:hidden! text-title_black! border-primary! h-10 md:h-12 absolute! right-1.25 top-1.25">
                                    Start Growing
                                </button>
                            </form>

                        </div>
                        <div className="md:max-w-129.25 w-full" data-thumb>

                            <Grow />

                        </div>
                    </div>
                </div>
            </section>
            <span className="hidden" data-section-title></span>
        </>
    )
}
