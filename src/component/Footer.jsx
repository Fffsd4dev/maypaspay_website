import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import footerLeft from "../assets/img/footer/footer-left.webp";
import footerRight from "../assets/img/footer/footer-right.webp";
import footerLogo from "../assets/img/maypasWhite.png";
import map from "../assets/img/footer/map.svg";
import mail from "../assets/img/footer/mail.svg";
import phone from "../assets/img/footer/phone.svg";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [success, setSuccess] = useState("");

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

    // For Form
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleSubmit = (e) => {
        e.preventDefault();

        setEmailError("");
        setSuccess("");

        const value = email.trim();

        if (!value) {
            setEmailError("Email is required.");
            return;
        }

        if (!emailRegex.test(value)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        setSuccess("Thank you! You've been subscribed.");
        setEmail("");

        setTimeout(() => {
            setSuccess("");
        }, 4000);
    };

    const handleChange = (e) => {
        const value = e.target.value;

        setEmail(value);

        if (emailError) {
            setEmailError("");
        }
    };

  return (
    <>
        <footer className="bg-secondary pt-14 md:pt-20 lg:pt-23 relative z-1"
                data-grid-reveal
                data-cols="15"
                data-rows="6"
                data-cols-sm="5"
                data-rows-sm="16"
                data-cols-lg="10"
                data-rows-lg="6"
                data-animation="random"
                data-bg-color="#ffffff"
                data-trigger="top 70%"
                data-stagger="0.004"
                data-duration="0.5">
            <img className="absolute left-0 bottom-0 lg:bottom-auto lg:top-1/2 transform lg:-translate-y-1/2 -z-1 w-[20%] lg:w-auto" src={footerLeft} alt="footer-left-shape" />
            <img className="absolute top-0 right-0 -z-1 w-[20%] lg:w-auto" src={footerRight} alt="footer-left-shape" />

            <div className="container">
                {/* <div className="flex items-start md:items-center justify-start md:justify-between gap-6 md:gap-8 pb-10 md:pb-12 lg:pb-15 flex-col md:flex-row">
                    <div className="md:max-w-120 lg:max-w-125 w-full">
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold text-white leading-tight!">Ready to Scale Your Fintech Vision?</h2>
                        <p className="mt-4 sm:mt-5 text-paragraph_white">Join the ecosystem of high-growth digital banks and global payment platforms. Our modular architecture is built to support your journey from seed stage to market leader.</p>
                    </div>
                    <div className="flex items-center justify-start sm:justify-end gap-4 flex-wrap">
                        <Link to="/contact" className="button-primary">
                            Get Support
                            <svg className="w-2.5 h-2.5 fill-current">
                                <use href="#buttonArrow"></use>
                            </svg>
                        </Link>
                        <Link to="/platform" className="button-autline-white">
                            Platform Demo
                            <svg className="w-2.5 h-2.5 fill-current">
                                <use href="#buttonArrow"></use>
                            </svg>
                        </Link>
                    </div>
                </div> */}
                <div className="flex justify-between lg:gap-10 border-y border-white/10 flex-col lg:flex-row">
                    <div className="py-10 lg:py-12.5 lg:max-w-87.5 w-full flex flex-col sm:flex-row lg:flex-col justify-between gap-6 sm:items-end">
                        <div className="sm:max-w-100 lg:mx-none w-full">
                            <img className="w-[70%] md:w-auto max-[350px]" src={footerLogo} alt="footer-logo" />
                            <p className="mt-4 sm:mt-6 md:mt-8 text-paragraph_white">Streamline your global operations, automate compliance, and drive financial innovation with our all-in-one institutional-grade platform.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="relative w-full max-w-95 sm:max-w-100 lg:max-w-none" id="footer-newsletter-form" noValidate data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false">
                            <input 
                                type="email" 
                                id="newsletter-email" 
                                placeholder="Enter your email" 
                                value={email}
                                onChange={handleChange}
                                className={`w-full h-12 rounded-[100px] p-4 pr-11 text-white duration-300 placeholder:text-paragraph_white outline-0 focus:bg-white/10 focus:backdrop-blur-2xl
                                ${
                                    emailError
                                        ? "border border-red-500"
                                        : success
                                        ? "border border-green-500"
                                        : "border border-paragraph_white focus:border-primary"
                                }`}
                            />
                            {emailError && (
                                <span className="mt-2 block text-sm text-red-400">
                                    {emailError}
                                </span>
                            )}
                            {success && (
                                <span className="mt-2 block text-sm text-primary">
                                    {success}
                                </span>
                            )}
                            <button type="submit" className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-title_black absolute right-2 top-2">
                                <svg className="w-5 h-4 fill-current">
                                    <use href="#tabArrow"></use>
                                </svg>
                            </button>
                        </form>

                    </div>
                    <div className="w-full lg:w-px h-px lg:h-auto bg-white/10"></div>
                    <div className="py-10 lg:py-12.5 lg:max-w-161.25 w-full grid grid-cols-2 sm:flex items-start justify-between gap-10">
                        <div className="">
                            <h3 className="mb-6 text-white text-xl md:text-2xl font-semibold leading-none!">Main</h3>
                            <ul className="flex flex-col items-start gap-3 sm:gap-5">
                                <li><Link className="text-paragraph_white leading-none duration-300 hover:text-primary block" to="/">Home</Link></li>
                                <li><Link className="text-paragraph_white leading-none duration-300 hover:text-primary block" to="/about--us">About Us</Link></li>
                                <li><Link className="text-paragraph_white leading-none duration-300 hover:text-primary block" to="/index-three">Services</Link></li>
                                <li><Link className="text-paragraph_white leading-none duration-300 hover:text-primary block" to="/contact">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div className="">
                            <h3 className="mb-6 text-white text-xl md:text-2xl font-semibold leading-none!">Links</h3>
                            <ul className="flex flex-col items-start gap-3 sm:gap-5">
                                <li><Link className="text-paragraph_white leading-none duration-300 hover:text-primary block" to="/blog">Blog</Link></li>
                                <li><Link className="text-paragraph_white leading-none duration-300 hover:text-primary block" to="/blog-post-1">Blog Details</Link></li>
                                <li><Link className="text-paragraph_white leading-none duration-300 hover:text-primary block" to="/case-study">Case Studies</Link></li>
                                <li><Link className="text-paragraph_white leading-none duration-300 hover:text-primary block" to="/case-study-post">Case Study Details</Link></li>
                            </ul>
                        </div>
                        <div className="col-span-2 sm:max-w-57.5 w-full">
                            <h3 className="mb-6 text-white text-xl md:text-2xl font-semibold leading-none!">Contact</h3>
                            <ul className="flex flex-col items-start gap-3 sm:gap-5">
                                <li>
                                    <Link className="text-paragraph_white leading-snug duration-300 hover:text-primary flex items-start gap-2.5" to="https://www.google.com/maps" target="_blank">
                                        <img className="w-4" src={map} alt="map" />
                                        <span className="flex-1">96a, Odudwa Crescent, GRA Ikeja. Lagos State, Nigeria</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-paragraph_white leading-none duration-300 hover:text-primary flex items-center gap-2.5" to="mailto:support@maypaspay.com">
                                        <img className="w-4" src={mail} alt="mail" />
                                        <span className="flex-1">support@maypaspay.com</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link className="text-paragraph_white leading-none duration-300 hover:text-primary flex items-center gap-2.5" to="tel:+0001234455">
                                        <img className="w-4" src={phone} alt="phone" />
                                        <span className="flex-1">+0001234455</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="py-5 md:py-8 lg:py-10.5 flex items-center justify-between gap-4 sm:gap-6 flex-col sm:flex-row">
                    <p className="text-paragraph_white text-center sm:text-left">© {new Date().getFullYear()} Maypas Pay.</p>
                    <div className="flex items-center gap-4">
                        <Link to="#" className="w-8.5 h-8.5 bg-white/10 rounded-full flex items-center justify-center text-white duration-300 hover:bg-primary hover:text-title_black" rel="noopener noreferrer" aria-label="Pinterest">
                            <svg className="w-4 h-4 fill-current">
                                <use href="#pinterest"></use>
                            </svg>
                        </Link>
                        <Link to="#" className="w-8.5 h-8.5 bg-white/10 rounded-full flex items-center justify-center text-white duration-300 hover:bg-primary hover:text-title_black" rel="noopener noreferrer" aria-label="Vimeo">
                            <svg className="w-4 h-4 fill-current">
                                <use href="#vimeo"></use>
                            </svg>
                        </Link>
                        <Link to="#" className="w-8.5 h-8.5 bg-white/10 rounded-full flex items-center justify-center text-white duration-300 hover:bg-primary hover:text-title_black" rel="noopener noreferrer" aria-label="Twitter">
                            <svg className="w-4 h-4 fill-current">
                                <use href="#twitter"></use>
                            </svg>
                        </Link>
                        <Link to="#" className="w-8.5 h-8.5 bg-white/10 rounded-full flex items-center justify-center text-white duration-300 hover:bg-primary hover:text-title_black" rel="noopener noreferrer" aria-label="Facebook">
                            <svg className="w-4 h-4 fill-current">
                                <use href="#facebook"></use>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    </>
  )
}
