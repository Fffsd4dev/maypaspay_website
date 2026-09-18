import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom";

import backgroundShape from "../../../assets/img/home-v2/banner/background-shape.webp";
import bannerShape from "../../../assets/img/home-v3/banner/banner-shape.webp";
import titlePrimary from "../../../assets/img/title-icon-primary.svg";
import client01 from "../../../assets/img/home-v1/client-01.webp";
import client02 from "../../../assets/img/home-v1/client-02.webp";
import client03 from "../../../assets/img/home-v1/client-03.webp";
import client04 from "../../../assets/img/home-v1/client-04.webp";
import bannerThumb from "../../../assets/img/home-v3/banner/banner-thumb.webp";
import logo from "../../../assets/img/home-v3/banner/logo.svg";
import google from "../../../assets/img/home-v3/banner/google.svg";
import bannerFromBackground from "../../../assets/img/home-v3/banner/banner-from-background.webp";

export default function HeroThree() {

    const heroRef = useRef(null);

    // Hero Animation
    useEffect(() => {
        if (!heroRef.current) return;
        const ctx = gsap.context(() => {
            const content = heroRef.current.querySelectorAll(
                "[data-subtitle], [data-title], [data-excerpt], [data-button], [data-review-thumb], [data-review-text]"
            );
            const form = heroRef.current.querySelector(
                "[data-hero-from-content]"
            );
            const heroThumb = heroRef.current.querySelector(
                "[data-hero-thumb]"
            );
            const scaleItems = heroRef.current.querySelectorAll(
                "[data-scale-up]"
            );
            const tl = gsap.timeline({
                defaults: {
                    ease: "power2.out",
                },
            });

            // Left Content
            content.forEach((item, index) => {
                tl.from(item, {
                    y: 50,
                    opacity: 0,
                    filter: "blur(6px)",
                    duration: 0.6,
                }, index === 0 ? 0 : "-=0.4");
            });

            // Form
            if (form) {
                tl.from(form, {
                    y: 50,
                    opacity: 0,
                    filter: "blur(6px)",
                    duration: 0.6,
                }, "-=0.4");
            }

            // Banner Image
            if (heroThumb) {
                tl.from(heroThumb, {
                    clipPath: "polygon(100% 0,100% 0,100% 100%,100% 100%)",
                    duration: 1,
                }, "-=0.5");
            }

            // Floating Shape
            gsap.from(scaleItems, {
                y: 30,
                scale: .7,
                opacity: 0,
                filter: "blur(6px)",
                duration: .6,
                stagger: .08,
                ease: "power2.out"
            });

        }, heroRef);

        return () => ctx.revert();

    }, []);

    // Form tabs with GSAP animation
    useEffect(() => {
        const container = heroRef.current;
        if (!container) return;

        const formTabs = container.querySelectorAll(".form-tabs");
        if (!formTabs.length) return;

        const allHandlers = [];

        formTabs.forEach((tabsWrapper) => {
            const tabBtns = tabsWrapper.querySelectorAll(".form-tab");
            const tabPanels = tabsWrapper.querySelectorAll(".form-tab-panel");

            tabBtns.forEach((btn) => {
                const handler = () => {
                    const tabId = btn.dataset.tab;
                    const targetPanel = tabsWrapper.querySelector(`#${tabId}`);
                    if (!targetPanel) return;

                    if (btn.classList.contains("active") && targetPanel.classList.contains("active")) return;

                    tabBtns.forEach((b) => b.classList.remove("active"));
                    tabPanels.forEach((panel) => {
                        panel.classList.remove("active");
                        if (panel !== targetPanel) {
                            const wrapper = panel.querySelector(".form-tab-panel-wrapper");
                            if (wrapper) {
                                gsap.killTweensOf(wrapper);
                                gsap.set(wrapper, { y: 100, opacity: 0, filter: "blur(6px)" });
                            }
                        }
                    });

                    btn.classList.add("active");
                    targetPanel.classList.add("active");

                    const wrapper = targetPanel.querySelector(".form-tab-panel-wrapper");
                    if (wrapper) {
                        gsap.killTweensOf(wrapper);
                        gsap.fromTo(
                            wrapper,
                            { y: 100, opacity: 0, filter: "blur(6px)" },
                            { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.out" }
                        );
                    }
                };

                btn.addEventListener("click", handler);
                allHandlers.push({ element: btn, handler });
            });
        });

        return () => {
            allHandlers.forEach(({ element, handler }) => {
                element.removeEventListener("click", handler);
            });
        };
    }, []);

    // Password toggle
    useEffect(() => {
        const container = heroRef.current;
        if (!container) return;

        const passwordFields = container.querySelectorAll(".password-field");
        if (!passwordFields.length) return;

        const handlers = [];

        passwordFields.forEach((field) => {
            const input = field.querySelector(".password-input");
            const toggle = field.querySelector(".password-toggle");
            if (!input || !toggle) return;

            const handler = () => {
                const isPassword = input.type === "password";
                input.type = isPassword ? "text" : "password";
                toggle.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
                toggle.classList.toggle("active");
            };

            toggle.addEventListener("click", handler);
            handlers.push({ toggle, handler });
        });

        // Cleanup
        return () => {
            handlers.forEach(({ toggle, handler }) => {
                toggle.removeEventListener("click", handler);
            });
        };
    }, []);

    return (
        <>
            <section ref={heroRef} className="bg-[#F8F5F2] relative z-1" data-institutional-hero>
                <img className="w-[20%] md:w-auto absolute top-[10%] left-0 select-none -z-1" src={backgroundShape} alt="banner-shape" />
                <div className="p-4 sm:p-6 max-w-480 mx-auto">
                    <div className="flex gap-6 flex-col lg:flex-row">
                        <div className="max-w-315.25 w-full bg-secondary flex lg:items-center rounded-2xl md:rounded-3xl overflow-hidden flex-col md:flex-row relative z-1">
                            <img className="w-[20%] md:w-auto absolute top-0 left-0 select-none -z-1" src={bannerShape} alt="banner-shape" data-scale-up />
                            <div className="md:max-w-179 w-full px-6 py-8 sm:p-10 md:p-6 md:pr-0 lg:p-10 xl:p-16 xl:pr-0">
                                <div className="flex items-center gap-2.5" data-subtitle>
                                    <img className="rotate" src={titlePrimary} alt="title-icon" />
                                    <p className="text-sm sm:text-base md:text-lg font-semibold leading-[1.1]! text-primary uppercase">
                                        STRATEGIC CAPITAL SOLUTIONS</p>
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-[1.1]! text-white mt-4 md:mt-5" data-title>
                                    Your Vision, Backed by Our Institutional Strength.</h1>
                                <p className="text-base text-paragraph_white mt-4" data-excerpt>SecureVest bridges the gap between ambition and execution. We provide high-velocity financing tailored to the complexities of modern global trade.
                                </p>
                                <div className="mt-6 sm:mt-8 lg:mt-12 flex items-center gap-3" data-button>
                                    <Link to="/partners" className="button-primary">
                                        Speak with a Partner
                                        <svg className="w-2.75 h-2.75 fill-current">
                                            <use href="#buttonArrow"></use>
                                        </svg>
                                    </Link>
                                    <Link className="video-popup w-10 md:w-12 h-10 md:h-12 rounded-full bg-white flex items-center justify-center text-title_black" to="https://www.youtube.com/embed/S_CGed6E610?si=8usIVmgCLNXWZE_K">
                                        <svg className="fill-current w-3.25 h-3.75">
                                            <use href="#playIcon"></use>
                                        </svg>
                                    </Link>
                                </div>
                                <div className="flex mt-9 md:mt-12" data-review-thumb>
                                    <div className="w-12 h-12 rounded-full bg-white p-px overflow-hidden flex items-center justify-center">
                                        <img className="rounded-full w-full h-full object-contain" src={client01} alt="client-01" />
                                    </div>
                                    <div className="-ml-3 w-12 h-12 rounded-full bg-white p-px overflow-hidden flex items-center justify-center">
                                        <img className="rounded-full w-full h-full object-contain" src={client02} alt="client-02" />
                                    </div>
                                    <div className="-ml-3 w-12 h-12 rounded-full bg-white p-px overflow-hidden flex items-center justify-center">
                                        <img className="rounded-full w-full h-full object-contain" src={client03} alt="client-03" />
                                    </div>
                                    <div className="-ml-3 w-12 h-12 rounded-full bg-white p-px overflow-hidden flex items-center justify-center">
                                        <img className="rounded-full w-full h-full object-contain" src={client04} alt="client-04" />
                                    </div>
                                    <div className="-ml-3 w-12 h-12 rounded-full bg-white flex items-center justify-center text-title_black font-semibold leading-none text-sm">
                                        5k+
                                    </div>
                                </div>
                                <p className="mt-3 text-sm text-paragraph_white" data-review-text>Over 5,000+ Verified Professional Reviews</p>
                            </div>
                            <div className="lg:hidden xl:block md:max-w-187.25 w-full lg:h-full max-md:[clip-path:polygon(0%_0,100%_0,100%_100%,0%_100%)]! md:[clip-path:polygon(24%_0,100%_0,100%_100%,0%_100%)] overflow-hidden md:-ml-11.25" data-hero-thumb>
                                <img className="w-full h-full object-cover" src={bannerThumb} alt="banner-thumb" />
                            </div>
                        </div>
                        <div className="lg:max-w-120 2xl:max-w-146.75 w-full p-4 sm:p-10 2xl:p-16.25 flex items-center justify-center bg-cover bg-center bg-no-repeat rounded-2xl md:rounded-3xl overflow-hidden" style={{ backgroundImage: `url(${bannerFromBackground})` }} data-hero-form>
                            <div className="max-w-114 w-full bg-white rounded-xl md:rounded-2xl p-5 sm:p-6 md:p-8" data-hero-from-content>
                                <div className="">
                                    <img className="max-w-29.5 w-full" src={logo} alt="logo" />
                                    <h2 className="text-title_black text-xl md:text-2xl font-semibold mt-4">Banking Portal</h2>
                                </div>
                                <div className="mt-8 md:mt-12 form-tabs overflow-hidden">
                                    <div className="form-tab-buttons flex items-start flex-wrap gap-4 lg:gap-6">
                                        <button type="button" className="form-tab text-paragraph_white inline-block leading-none duration-300 relative active" data-tab="tab1">Personal Banking</button>
                                        <button type="button" className="form-tab text-paragraph_white inline-block leading-none duration-300 relative" data-tab="tab2">Business Banking</button>
                                    </div>
                                    <div className="form-tab-content mt-6">
                                        <div className="form-tab-panel active" id="tab1">
                                            <div className="form-tab-panel-wrapper">
                                                <form className="grid gap-4">
                                                    <div className="">
                                                        <label className="text-[12px] font-medium text-title_black inline-block mb-2" htmlFor="email">User ID</label>
                                                        <input className="w-full h-12 p-4 bg-background border border-border rounded-lg outline-none text-title_black placeholder:text-[#404040] duration-300 focus:border-secondary" type="text" id="email" name="email" placeholder="ID, Email or phone number" autoComplete="username" />
                                                    </div>
                                                    <div className="">
                                                        <label className="text-[12px] font-medium text-title_black inline-block mb-2" htmlFor="password">Password</label>
                                                        <div className="password-field relative">
                                                            <input className="w-full h-12 p-4 bg-background border border-border rounded-lg outline-none text-title_black placeholder:text-[#404040] duration-300 focus:border-secondary password-input" type="password" id="password" name="password" placeholder="Enter password" autoComplete="current-password" />
                                                            <button type="button" className="password-toggle absolute right-4 top-1/2 transform -translate-y-1/2" aria-label="Show password">
                                                                <svg className="w-4 h-4 fill-current hide">
                                                                    <use href="#password-hide-icon"></use>
                                                                </svg>
                                                                <svg className="w-4 h-4 fill-current show">
                                                                    <use href="#password-show-icon"></use>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <label className="toggle-switch cursor-pointer" htmlFor="remember1">
                                                                <input type="checkbox" id="remember1" name="remember1" className="toggle-switch-input" />
                                                                <span className="toggle-switch-slider"></span>
                                                            </label>
                                                            <label className="text-sm text-title_black cursor-pointer select-none" htmlFor="remember1">Remember me</label>
                                                        </div>
                                                        <Link className="text-sm text-secondary" to="/reset-password">Forgot ID or password?</Link>
                                                    </div>
                                                </form>
                                                <Link to="/sign-up" className="button-primary w-full mt-5 md:mt-8">Sign Up</Link>
                                                <div className="my-5 md:my-8 w-full h-px bg-border"></div>
                                                <Link to="https://www.google.com" className="button-solid-black w-full" target="_blank">
                                                    <img src={google} alt="google" />
                                                    Continue with Google
                                                </Link>
                                                <p className="text-[12px] font-medium text-title_black mt-5 md:mt-6 text-center">Dont have an account?
                                                    <Link className="text-secondary" to="/getstrated"> Open New Bank Account</Link>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="form-tab-panel" id="tab2">
                                            <div className="form-tab-panel-wrapper">
                                                <form className="grid gap-4">
                                                    <div className="">
                                                        <label className="text-[12px] font-medium text-title_black inline-block mb-2" htmlFor="email">User ID</label>
                                                        <input className="w-full h-12 p-4 bg-background border border-border rounded-lg outline-none text-title_black placeholder:text-[#404040] duration-300 focus:border-secondary" type="text" id="email2" name="email" placeholder="ID, Email or phone number" autoComplete="username" />
                                                    </div>
                                                    <div className="">
                                                        <label className="text-[12px] font-medium text-title_black inline-block mb-2" htmlFor="password">Password</label>
                                                        <div className="password-field relative">
                                                            <input className="w-full h-12 p-4 bg-background border border-border rounded-lg outline-none text-title_black placeholder:text-[#404040] duration-300 focus:border-secondary password-input" type="password" id="password2" name="password" placeholder="Enter password" autoComplete="current-password" />
                                                            <button type="button" className="password-toggle absolute right-4 top-1/2 transform -translate-y-1/2" aria-label="Show password">
                                                                <svg className="w-4 h-4 fill-current hide">
                                                                    <use href="#password-hide-icon"></use>
                                                                </svg>
                                                                <svg className="w-4 h-4 fill-current show">
                                                                    <use href="#password-show-icon"></use>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap justify-between items-center gap-4">
                                                        <div className="flex items-center gap-2">
                                                            <label className="toggle-switch cursor-pointer" htmlFor="remember2">
                                                                <input type="checkbox" id="remember2" name="remember2" className="toggle-switch-input" />
                                                                <span className="toggle-switch-slider"></span>
                                                            </label>
                                                            <label className="text-sm text-title_black cursor-pointer select-none" htmlFor="remember2">Remember me</label>
                                                        </div>
                                                        <Link className="text-sm text-secondary" to="/reset-password">Forgot ID or password?</Link>
                                                    </div>
                                                </form>
                                                <Link to="/sign-up" className="button-primary w-full mt-5 md:mt-8">Sign Up</Link>
                                                <div className="my-5 md:my-8 w-full h-px bg-border"></div>
                                                <Link to="https://shreethemes.in/" className="button-solid-black w-full" target="_blank">
                                                    <img src={google} alt="google" />
                                                    Continue with Google
                                                </Link>
                                                <p className="text-[12px] font-medium text-title_black mt-5 md:mt-6 text-center">Dont have an account?
                                                    <Link className="text-secondary" to="/getstrated">Open New Bank Account</Link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <span className="hidden" data-section-title></span>
        </>
    )
}
