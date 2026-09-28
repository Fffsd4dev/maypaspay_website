import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import footerLeft from "../assets/img/footer/footer-left.webp";
import footerRight from "../assets/img/footer/footer-right.webp";
import footerLogo from "../assets/img/maypasWhite.png";
import map from "../assets/img/footer/map.png";
import mail from "../assets/img/footer/mail.png";
import phone from "../assets/img/footer/phone.png";

gsap.registerPlugin(ScrollTrigger);

const MAIN_LINKS = [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about-us" },
    { label: "Services", to: "/services" },
    { label: "Contact Us", to: "/contact" },
];

const MORE_LINKS = [
    { label: "Blog", to: "/blog" },
    { label: "Blog Details", to: "/blog-post-1" },
    { label: "Case Studies", to: "/case-study" },
    { label: "Case Study Details", to: "/case-study-post" },
];

const SOCIALS = [
    { label: "Pinterest", icon: "#pinterest" },
    { label: "Vimeo", icon: "#vimeo" },
    { label: "Twitter", icon: "#twitter" },
    { label: "Facebook", icon: "#facebook" },
];

const CONTACTS = [
    {
        icon: map,
        alt: "Address",
        href: "https://www.google.com/maps",
        external: true,
        text: "96a, Odudwa Crescent, GRA Ikeja. Lagos State, Nigeria",
        desktopOnly: true,
    },
    {
        icon: mail,
        alt: "Email",
        href: "mailto:support@maypaspay.com",
        text: "support@maypaspay.com",
    },
    {
        icon: phone,
        alt: "Phone",
        href: "tel:+0001234455",
        text: "+0001234455",
    },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Layout lives here (not in Tailwind classes) so global CSS can't override it.
const footerCss = `
.ft-grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 2rem 1.5rem !important;
    padding-bottom: 2rem;
}
.ft-grid > * { min-width: 0; }
.ft-span-all { grid-column: 1 / -1 !important; }
.ft-desktop-only { display: none !important; }
.ft-heading { display: none !important; }

@media (min-width: 768px) {
    .ft-grid {
        grid-template-columns: 1.7fr 1fr 1fr 1.5fr !important;
        column-gap: 2rem !important;
        row-gap: 3rem !important;
        padding-bottom: 3rem;
    }
    .ft-span-all { grid-column: auto !important; }
    .ft-desktop-only { display: block !important; }
    .ft-heading { display: block !important; }
}
@media (min-width: 1024px) {
    .ft-grid {
        column-gap: 3rem !important;
        padding-bottom: 4rem;
    }
}
`;

const linkClass =
    "group inline-flex items-center gap-0 text-paragraph_white leading-none transition-[color,gap] duration-300 hover:gap-2.5 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70";

function FooterLink({ to, children }) {
    return (
        <Link to={to} className={linkClass}>
            <span
                aria-hidden
                className="h-px w-0 bg-primary transition-[width] duration-300 group-hover:w-3"
            />
            {children}
        </Link>
    );
}

export default function Footer() {
    const footerRef = useRef(null);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [success, setSuccess] = useState("");

    // ----- Grid reveal (scoped to this footer only) -----
    useEffect(() => {
        const element = footerRef.current;
        if (!element) return;

        const cols = parseInt(element.dataset.cols) || 12;
        const rows = parseInt(element.dataset.rows) || 12;
        const total = cols * rows;

        let masks = element.querySelector(".grid-reveal-masks");
        if (!masks) {
            masks = document.createElement("div");
            masks.className = "grid-reveal-masks";
            masks.style.pointerEvents = "none";
            element.appendChild(masks);
        }
        masks.innerHTML = "";

        const items = [];
        for (let i = 0; i < total; i++) {
            const mask = document.createElement("div");
            mask.className = "grid-reveal-mask";
            mask.style.position = "absolute";
            mask.style.inset = 0;
            mask.style.background = element.dataset.bgColor || "#ffffff";

            const x = (i % cols) * (100 / cols);
            const y = Math.floor(i / cols) * (100 / rows);
            mask.style.clipPath = `polygon(
                ${x}% ${y}%,
                ${x + 100 / cols}% ${y}%,
                ${x + 100 / cols}% ${y + 100 / rows}%,
                ${x}% ${y + 100 / rows}%
            )`;

            masks.appendChild(mask);
            items.push(mask);
        }

        gsap.set(items, { opacity: 1 });

        const tween = gsap.to(items, {
            opacity: 0,
            duration: Number(element.dataset.duration) || 0.5,
            stagger: Number(element.dataset.stagger) || 0.01,
            ease: "power3.out",
            scrollTrigger: {
                trigger: element,
                start: () => {
                    if (window.innerWidth >= 1536) return "top center";
                    if (window.innerWidth >= 768) return "top 85%";
                    return "top 95%";
                },
                once: true,
            },
            onComplete: () => ScrollTrigger.refresh(),
        });

        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
            masks.innerHTML = "";
        };
    }, []);

    // ----- Newsletter form -----
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
        setTimeout(() => setSuccess(""), 4000);
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
        if (emailError) setEmailError("");
    };

    return (
        <footer
            ref={footerRef}
            className="relative z-[1] overflow-hidden bg-black pt-10 md:pt-20 lg:pt-24"
            data-cols="15"
            data-rows="6"
            data-bg-color="#ffffff"
            data-stagger="0.004"
            data-duration="0.5"
        >
            <style>{footerCss}</style>

            {/* Decorative shapes */}
            <img
                className="absolute bottom-0 left-0 -z-[1] w-[20%] opacity-60 lg:bottom-auto lg:top-1/2 lg:w-auto lg:-translate-y-1/2"
                src={footerLeft}
                alt=""
                aria-hidden
            />
            <img
                className="absolute right-0 top-0 -z-[1] w-[20%] opacity-60 lg:w-auto"
                src={footerRight}
                alt=""
                aria-hidden
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -bottom-48 left-1/2 -z-[1] h-96 w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
            />
            <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)]"
            />

            <div className="container">
                {/* md+: brand | main | links | contact, left to right in one row */}
                <div className="ft-grid">
                    {/* Brand + newsletter */}
                    <div className="ft-span-all flex flex-col gap-5 md:gap-8">
                        <div className="max-w-md">
                            <Link
                                to="/"
                                aria-label="Maypas, home"
                                className="inline-block rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
                            >
                                <img className="h-8 w-auto md:h-10" src={footerLogo} alt="Maypas" />
                            </Link>
                            {/* Hidden on mobile to keep the footer compact */}
                            <p className="ft-desktop-only mt-5 leading-relaxed text-paragraph_white">
                                Streamline your global payments, convert assets instantly, and spend without limits with Africa's all-in-one borderless financial hub.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="relative w-full max-w-md"
                            id="footer-newsletter-form"
                            noValidate
                            data-gramm="false"
                            data-gramm_editor="false"
                            data-enable-grammarly="false"
                        >
                            <label htmlFor="newsletter-email" className="sr-only">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="newsletter-email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={handleChange}
                                aria-invalid={!!emailError}
                                aria-describedby="newsletter-feedback"
                                className={`h-12 w-full rounded-full bg-white/5 pl-6 pr-16 text-white outline-0 transition-[background-color,border-color] duration-300 placeholder:text-paragraph_white focus:bg-white/10 md:h-[3.25rem] ${
                                    emailError
                                        ? "border border-red-500"
                                        : success
                                        ? "border border-green-500"
                                        : "border border-white/15 focus:border-primary"
                                }`}
                            />
                            <button
                                type="submit"
                                aria-label="Subscribe to newsletter"
                                className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] transition-[transform,filter] duration-300 hover:brightness-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80 md:h-10 md:w-10"
                            >
                                <svg className="h-4 w-5 fill-current" aria-hidden>
                                    <use href="#tabArrow"></use>
                                </svg>
                            </button>
                            <div id="newsletter-feedback" role="status" aria-live="polite">
                                {emailError && <span className="mt-2 block pl-2 text-sm text-red-400">{emailError}</span>}
                                {success && <span className="mt-2 block pl-2 text-sm text-primary">{success}</span>}
                            </div>
                        </form>
                    </div>

                    {/* Main links: horizontal row on mobile, column on md+ */}
                    <nav aria-label="Main" className="ft-span-all">
                        <h3 className="ft-heading mb-6 text-lg font-semibold leading-none text-white">Main</h3>
                        <ul className="flex flex-row flex-wrap items-start gap-x-5 gap-y-3 md:flex-col md:gap-5">
                            {MAIN_LINKS.map((l) => (
                                <li key={l.to}>
                                    <FooterLink to={l.to}>{l.label}</FooterLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* More links: hidden on mobile */}
                    <nav aria-label="More links" className="ft-desktop-only">
                        <h3 className="mb-6 text-lg font-semibold leading-none text-white">Links</h3>
                        <ul className="flex flex-col items-start gap-5">
                            {MORE_LINKS.map((l) => (
                                <li key={l.to}>
                                    <FooterLink to={l.to}>{l.label}</FooterLink>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact */}
                    <div className="ft-span-all">
                        <h3 className="ft-heading mb-6 text-lg font-semibold leading-none text-white">Contact</h3>
                        <ul className="flex flex-col items-start gap-3 md:gap-4">
                            {CONTACTS.map((c) => (
                                <li key={c.alt} className={c.desktopOnly ? "ft-desktop-only" : ""}>
                                    <a
                                        href={c.href}
                                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                        className="group flex items-start gap-3 leading-snug text-paragraph_white transition-colors duration-300 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
                                    >
                                        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/5 ring-1 ring-inset ring-white/10 transition-colors duration-300 group-hover:bg-white group-hover:ring-primary md:h-9 md:w-9">
                                            <img className="w-4" src={c.icon} alt={c.alt} />
                                        </span>
                                        <span className="min-w-0 flex-1 break-words pt-1.5 md:pt-2">{c.text}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar: stacked + centered on mobile, side by side from sm */}
                <div className="relative flex flex-col-reverse items-center justify-between gap-3 py-5 sm:flex-row sm:gap-4 md:py-8">
                    <div
                        aria-hidden
                        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)]"
                    />
                    <p className="text-center text-sm text-paragraph_white sm:text-left md:text-base">
                        © {new Date().getFullYear()} Maypas Pay. All rights reserved.
                    </p>

                    <div className="flex items-center gap-2 md:gap-3">
                        {SOCIALS.map((s) => (
                            <a
                                key={s.label}
                                href="#"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white ring-1 ring-inset ring-white/10 transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-primary hover:ring-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 md:h-10 md:w-10"
                            >
                                <svg className="h-4 w-4 fill-current" aria-hidden>
                                    <use href={s.icon}></use>
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}