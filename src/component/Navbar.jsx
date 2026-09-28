// import { useEffect, useRef } from 'react';
// import { useLocation, Link } from 'react-router-dom';

// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';

// import logo from "../assets/img/maypasWhite.png";

// const NAV_LINKS = [
//     { label: 'Home', path: '/' },
//     { label: 'About Us', path: '/about-us' },
//     { label: 'Services', path: '/services' },
//     { label: 'Contact Us', path: '/contact' },
// ];

// export default function Navbar() {

//     const headerRef = useRef(null);
//     const initializedRef = useRef(false);

//     // ----- Active route logic -----
//     const location = useLocation();
//     const currentPath = location.pathname.replace(/\/$/, '');
//     const isActive = (path) => currentPath === path.replace(/\/$/, '');

//     // ----- Main initialization -----
//     useEffect(() => {
//         if (initializedRef.current) return;
//         initializedRef.current = true;

//         // ----- Mobile menu toggle -----
//         const menuToggle = () => {
//             const toggleBtn = document.querySelector('.menuToggle');
//             const mainMenu = document.querySelector('.main-menu');
//             if (!toggleBtn || !mainMenu) return;

//             if (!mainMenu.hasAttribute('data-lenis-prevent')) {
//                 mainMenu.setAttribute('data-lenis-prevent', '');
//             }

//             const openMenu = () => {
//                 toggleBtn.classList.add('is-active');
//                 mainMenu.classList.add('menu-active');
//                 document.body.classList.add('menu-overlay');
//                 if (typeof window.lenis !== 'undefined' && window.lenis?.stop) {
//                     try { window.lenis.stop(); } catch { /* ignore */ }
//                 }
//                 document.body.style.overflow = 'hidden';
//                 document.documentElement.style.overflow = 'hidden';
//             };

//             const closeMenu = () => {
//                 toggleBtn.classList.remove('is-active');
//                 mainMenu.classList.remove('menu-active');
//                 document.body.classList.remove('menu-overlay');
//                 if (typeof window.lenis !== 'undefined' && window.lenis?.start) {
//                     try {
//                         window.lenis.start();
//                         document.documentElement.classList.remove('lenis-stopped');
//                     } catch { /* ignore */ }
//                 }
//                 document.body.style.overflow = '';
//                 document.documentElement.style.overflow = '';
//             };

//             toggleBtn.addEventListener('click', () => {
//                 if (toggleBtn.classList.contains('is-active')) {
//                     closeMenu();
//                 } else {
//                     openMenu();
//                 }
//             });

//             document.addEventListener('click', (e) => {
//                 const isInsideMenu = mainMenu.contains(e.target);
//                 const isToggle = toggleBtn.contains(e.target);
//                 if (!isInsideMenu && !isToggle && toggleBtn.classList.contains('is-active')) {
//                     closeMenu();
//                 }
//             });
//         };

//         // ----- Sticky header + ScrollTrigger -----
//         const initStickyHeader = () => {
//             const header = headerRef.current;
//             if (!header) return;
//             if (typeof gsap !== 'undefined') {
//                 gsap.set(header, { willChange: 'transform', force3D: true, y: 0 });
//                 if (typeof ScrollTrigger !== 'undefined') {
//                     ScrollTrigger.create({
//                         onUpdate: (self) => {
//                             const scroll = self.scroll();
//                             header.classList.toggle('sticky-header', scroll > 0);
//                             gsap.set(header, { y: 0 });
//                         }
//                     });
//                 }
//             }
//         };

//         // ----- Adjust body padding for fixed header -----
//         const adjustBodyPadding = () => {
//             const header = headerRef.current;
//             if (!header) return;
//             const height = header.offsetHeight;
//             if (height > 0) {
//                 document.body.style.paddingTop = height + 'px';
//             }
//         };

//         menuToggle();

//         // Force-close the menu on initial load
//         document.body.classList.remove('menu-overlay');
//         const mainMenu = document.querySelector('.main-menu');
//         if (mainMenu) mainMenu.classList.remove('menu-active');
//         const toggleBtn = document.querySelector('.menuToggle');
//         if (toggleBtn) toggleBtn.classList.remove('is-active');

//         initStickyHeader();
//         adjustBodyPadding();

//         let resizeTimer;
//         const handleResize = () => {
//             clearTimeout(resizeTimer);
//             resizeTimer = setTimeout(() => {
//                 adjustBodyPadding();
//             }, 200);
//         };
//         window.addEventListener('resize', handleResize);

//         return () => {
//             window.removeEventListener('resize', handleResize);
//         };
//     }, []);

//     return (
//         <header
//             ref={headerRef}
//             className="header-area lg:py-0 bg-secondary fixed w-full top-0 left-0 right-0 z-999999 border-b border-white/10"
//         >
//             <div className="container">
//                 <div className="header-wrapper flex items-center justify-between gap-5 py-2 sm:py-2.5 lg:py-0">

//                     {/* Logo — left */}
//                     <Link className="logo shrink-0" to="/">
//                         <img className="h-8 lg:h-9 w-auto bg-blend-exclusion" src={logo} alt="site-logo" />
//                     </Link>

//                     {/* Flat nav — right */}
//                     <nav className="main-menu" data-lenis-prevent>
//                         <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
//                             {NAV_LINKS.map((link) => (
//                                 <li key={link.path}>
//                                     <Link
//                                         to={link.path}
//                                         className={`sub-menu-item text-base leading-none text-white transition-colors duration-300 hover:text-primary ${isActive(link.path) ? 'active' : ''}`}
//                                     >
//                                         {link.label}
//                                     </Link>
//                                 </li>
//                             ))}
//                             <li>
//                                 <Link to="/coming-soon" className="button-primary">
//                                     Get Started
//                                 </Link>
//                             </li>
//                         </ul>
//                     </nav>

//                     {/* Mobile toggle — hidden on desktop since nav sits inline on the right */}
//                     <button type="button" className="menuToggle lg:hidden" aria-label="Toggle navigation menu">
//                         <svg className="stroke-current text-white" width="40" viewBox="0 0 100 100">
//                             <path className="line line1"
//                                 d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
//                             <path className="line line2" d="M 20,50 H 80" />
//                             <path className="line line3"
//                                 d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
//                         </svg>
//                     </button>
//                 </div>
//             </div>
//         </header>
//     )
// }



import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

import logo from "../assets/img/maypasWhite.png";

const NAV_LINKS = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Services', path: '/services' },
    { label: 'Contact Us', path: '/contact' },
];

const normalize = (p) => p.replace(/\/$/, '') || '/';

export default function Navbar() {
    const location = useLocation();
    const currentPath = normalize(location.pathname);

    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    const headerRef = useRef(null);
    const linkRefs = useRef([]);
    const [pill, setPill] = useState({ x: 0, w: 0, visible: false });
    const [pillReady, setPillReady] = useState(false);

    const activeIndex = NAV_LINKS.findIndex((l) => normalize(l.path) === currentPath);

    // ----- Sliding highlight (desktop) -----
    const placePill = useCallback((index) => {
        const el = linkRefs.current[index];
        if (!el) {
            setPill((p) => ({ ...p, visible: false }));
            return;
        }
        setPill({ x: el.offsetLeft, w: el.offsetWidth, visible: true });
    }, []);

    useLayoutEffect(() => {
        placePill(activeIndex);
        const raf = requestAnimationFrame(() => setPillReady(true));

        const onResize = () => placePill(activeIndex);
        window.addEventListener('resize', onResize);
        document.fonts?.ready.then(onResize);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', onResize);
        };
    }, [activeIndex, placePill]);

    // ----- Scroll state (header stays fixed, only its surface changes) -----
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // ----- Keep page content clear of the fixed header (no extra spacer) -----
    useEffect(() => {
        const header = headerRef.current;
        if (!header) return;
        const sync = () => {
            document.body.style.paddingTop = header.offsetHeight + 'px';
        };
        sync();
        const ro = new ResizeObserver(sync);
        ro.observe(header);
        return () => {
            ro.disconnect();
            document.body.style.paddingTop = '';
        };
    }, []);

    // ----- Close the mobile menu on navigation -----
    useEffect(() => {
        setOpen(false);
    }, [location.pathname]);

    // ----- Mobile menu side effects: scroll lock, Escape, breakpoint -----
    useEffect(() => {
        if (!open) return;

        const lenis = window.lenis;
        try { lenis?.stop?.(); } catch { /* ignore */ }
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        const mq = window.matchMedia('(min-width: 1024px)');
        const onMq = (e) => e.matches && setOpen(false);

        window.addEventListener('keydown', onKey);
        mq.addEventListener('change', onMq);

        return () => {
            window.removeEventListener('keydown', onKey);
            mq.removeEventListener('change', onMq);
            try {
                lenis?.start?.();
                document.documentElement.classList.remove('lenis-stopped');
            } catch { /* ignore */ }
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [open]);

    return (
        <>
            <header ref={headerRef} className="fixed inset-x-0 top-0 z-[999999] h-16 lg:h-[72px]">
                {/* Surface: solid at the top, frosted glass once the page scrolls */}
                <div
                    aria-hidden
                    className={`absolute inset-0 transition-[background-color,box-shadow] duration-500 ${
                        scrolled || open
                            ? 'bg-black shadow-[0_12px_32px_-16px_rgba(0,0,0,0.8)]'
                            : 'bg-secondary'
                    }`}
                />
                {/* Hairline highlight along the bottom edge */}
                <div
                    aria-hidden
                    className={`absolute inset-x-0 bottom-0 h-px transition-opacity duration-500 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] ${
                        scrolled ? 'opacity-100' : 'opacity-40'
                    }`}
                />

                <div className="container relative h-full">
                    <div className="flex h-full items-center justify-between gap-6">
                        {/* Logo */}
                        <Link
                            to="/"
                            aria-label="Maypas Homes, home"
                            className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/70"
                        >
                            <img
                                src={logo}
                                alt="Maypas Homes"
                                className={`w-auto origin-left transition-[height] duration-500 ease-out ${
                                    scrolled ? 'h-7 lg:h-8' : 'h-8 lg:h-9'
                                }`}
                            />
                        </Link>

                        {/* Desktop navigation */}
                        <nav aria-label="Primary" className="hidden lg:flex items-center gap-3">
                            <ul
                                className="relative flex items-center gap-1"
                                onMouseLeave={() => placePill(activeIndex)}
                            >
                                <span
                                    aria-hidden
                                    className={`pointer-events-none absolute inset-y-0 left-0 rounded-full bg-primary shadow-[inset_0_1px_0_rgba(255,255,255,0.25)] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                        pillReady ? 'transition-[transform,width,opacity] duration-500' : ''
                                    } ${pill.visible ? 'opacity-100' : 'opacity-0'}`}
                                    style={{ width: pill.w, transform: `translateX(${pill.x}px)` }}
                                />
                                {NAV_LINKS.map((link, i) => {
                                    const active = i === activeIndex;
                                    return (
                                        <li key={link.path}>
                                            <Link
                                                ref={(el) => (linkRefs.current[i] = el)}
                                                to={link.path}
                                                aria-current={active ? 'page' : undefined}
                                                onMouseEnter={() => placePill(i)}
                                                onFocus={() => placePill(i)}
                                                onBlur={() => placePill(activeIndex)}
                                                className={`relative z-10 block rounded-full px-5 py-2.5 text-[15px] leading-none tracking-[0.01em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 ${
                                                    active ? 'text-white' : 'text-white/65 hover:text-white'
                                                }`}
                                            >
                                                {link.label}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                            <span aria-hidden className="mx-2 h-6 w-px bg-white/15" />

                            <Link
                                to="/coming-soon"
                                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-white px-6 py-3 text-[15px] font-medium leading-none text-black transition-[transform,background-color] duration-300 hover:-translate-y-px hover:bg-white/90 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
                            >
                                <span
                                    aria-hidden
                                    className="pointer-events-none absolute inset-y-0 -left-full w-1/2 -skew-x-12 bg-black/10 blur-md transition-transform duration-700 ease-out group-hover:translate-x-[400%]"
                                />
                                <span className="relative">Get Started</span>
                            </Link>
                        </nav>

                        {/* Mobile toggle */}
                        <button
                            type="button"
                            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
                            aria-expanded={open}
                            aria-controls="mobile-menu"
                            onClick={() => setOpen((v) => !v)}
                            className="relative -mr-2 grid h-11 w-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 lg:hidden"
                        >
                            <span className="relative block h-3.5 w-6">
                                <span
                                    className={`absolute left-0 h-0.5 w-6 rounded-full bg-current transition-all duration-300 ${
                                        open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                                    }`}
                                />
                                <span
                                    className={`absolute bottom-0 left-0 h-0.5 rounded-full bg-current transition-all duration-300 ${
                                        open ? 'bottom-1/2 w-6 translate-y-1/2 -rotate-45' : 'w-4'
                                    }`}
                                />
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile menu panel */}
            <div
                id="mobile-menu"
                aria-hidden={!open}
                className={`fixed inset-x-0 bottom-0 top-16 z-[999998] overflow-y-auto bg-black transition-[opacity,visibility,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
                    open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-3 opacity-0 pointer-events-none'
                }`}
            >
                <nav aria-label="Mobile" className="container flex min-h-full flex-col justify-between gap-10 pb-10 pt-6">
                    <ul className="flex flex-col">
                        {NAV_LINKS.map((link, i) => {
                            const active = i === activeIndex;
                            return (
                                <li
                                    key={link.path}
                                    className={`border-b border-white/10 transition-all duration-500 ease-out ${
                                        open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                    }`}
                                    style={{ transitionDelay: open ? `${100 + i * 60}ms` : '0ms' }}
                                >
                                    <Link
                                        to={link.path}
                                        tabIndex={open ? 0 : -1}
                                        aria-current={active ? 'page' : undefined}
                                        className={`flex items-center justify-between py-5 text-3xl font-medium tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/70 ${
                                            active ? 'text-primary' : 'text-white/70 hover:text-white'
                                        }`}
                                    >
                                        {link.label}
                                        {active && <span aria-hidden className="h-2 w-2 rounded-full bg-primary" />}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div
                        className={`transition-all duration-500 ease-out ${
                            open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`}
                        style={{ transitionDelay: open ? '380ms' : '0ms' }}
                    >
                        <Link
                            to="/coming-soon"
                            tabIndex={open ? 0 : -1}
                            className="flex w-full items-center justify-center rounded-full bg-primary px-6 py-4 text-base font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] transition-[filter] hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
                        >
                            Get Started
                        </Link>
                    </div>
                </nav>
            </div>
        </>
    );
}