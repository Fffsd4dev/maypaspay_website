// // // import { useEffect, useRef, useCallback } from 'react';
// // // import { useLocation, Link } from 'react-router-dom';

// // // import gsap from 'gsap';
// // // import { SplitText } from 'gsap/SplitText';
// // // import { ScrollTrigger } from 'gsap/ScrollTrigger';
// // // import { CustomEase } from 'gsap/CustomEase';

// // // import logo from "../assets/img/maypasWhite.png";
// // // import home01 from "../assets/img/menu/home-01.webp";
// // // import home02 from "../assets/img/menu/home-02.webp";
// // // import home03 from "../assets/img/menu/home-03.webp";
// // // import arrow from "../assets/img/menu/arrow.svg";

// // // export default function Navbar() {

// // //     const headerRef = useRef(null);
// // //     const initializedRef = useRef(false);

// // //     // ----- Active route logic -----
// // //     const location = useLocation();
// // //     const currentPath = location.pathname.replace(/\/$/, '');
// // //     const isActive = (...paths) => {
// // //         return paths.some(path => currentPath === path.replace(/\/$/, ''));
// // //     };

// // //     // ----- Refs for tracking active mega tab -----
// // //     const activeMegaTabRef = useRef(null);

// // //     // -----  animateTabContent -----
// // //     const animateTabContent = (content, initial = false) => {
// // //         if (typeof gsap === 'undefined') return;
// // //         const title = content.querySelector('.megamenu-tab-content-title');
// // //         const items = content.querySelector('.megamenu-tab-content-items');
// // //         if (!title && !items) return;
// // //         const tl = gsap.timeline();

// // //         if (title && typeof SplitText !== 'undefined') {
// // //             const h5 = title.querySelector('h5');
// // //             const p = title.querySelector('p');
// // //             if (h5) {
// // //                 try {
// // //                     const split = SplitText.create(h5, { type: 'words', wordsClass: 'word' });
// // //                     if (split && split.words && split.words.length) {
// // //                         if (initial) {
// // //                             gsap.set(split.words, { yPercent: 0, opacity: 1 });
// // //                         } else {
// // //                             gsap.set(split.words, { yPercent: 110, opacity: 0 });
// // //                             tl.fromTo(
// // //                                 split.words,
// // //                                 { yPercent: 110, opacity: 0 },
// // //                                 {
// // //                                     yPercent: 0,
// // //                                     opacity: 1,
// // //                                     duration: 0.6,
// // //                                     stagger: 0.06,
// // //                                     ease: typeof CustomEase !== 'undefined' ? 'osmo-ease' : 'power3.out',
// // //                                 }
// // //                             );
// // //                         }
// // //                     }
// // //                 } catch { /* ignore */ }
// // //             }
// // //             if (p) {
// // //                 try {
// // //                     const split = SplitText.create(p, { type: 'lines', linesClass: 'line' });
// // //                     if (split && split.lines && split.lines.length) {
// // //                         if (initial) {
// // //                             gsap.set(split.lines, { yPercent: 0, opacity: 1 });
// // //                         } else {
// // //                             gsap.set(split.lines, { yPercent: 110, opacity: 0 });
// // //                             tl.fromTo(
// // //                                 split.lines,
// // //                                 { yPercent: 110, opacity: 0 },
// // //                                 {
// // //                                     yPercent: 0,
// // //                                     opacity: 1,
// // //                                     duration: 0.8,
// // //                                     stagger: 0.08,
// // //                                     ease: typeof CustomEase !== 'undefined' ? 'osmo-ease' : 'power3.out',
// // //                                 },
// // //                                 '-=0.5'
// // //                             );
// // //                         }
// // //                     }
// // //                 } catch { /* ignore */ }
// // //             }
// // //         }

// // //         if (items) {
// // //             const children = items.children;
// // //             if (children.length) {
// // //                 if (initial) {
// // //                     gsap.set(children, { opacity: 1, y: 0 });
// // //                 } else {
// // //                     Array.from(children).forEach((el) => {
// // //                         if (typeof el._disableHover === 'function') el._disableHover();
// // //                     });
// // //                     gsap.set(children, { opacity: 0, y: 50 });
// // //                     tl.to(
// // //                         children,
// // //                         {
// // //                             opacity: 1,
// // //                             y: 0,
// // //                             duration: 0.6,
// // //                             stagger: 0.04,
// // //                             ease: typeof CustomEase !== 'undefined' ? 'osmo-ease' : 'power3.out',
// // //                         },
// // //                         '-=0.8'
// // //                     );
// // //                     tl.call(() => {
// // //                         Array.from(children).forEach((el) => {
// // //                             if (typeof el._enableHover === 'function') el._enableHover();
// // //                         });
// // //                     });
// // //                 }
// // //             }
// // //         }
// // //     };

// // //     // -----  determine which mega tab should be active based on route -----
// // //     const getActiveMegaTabId = useCallback(() => {
// // //         const contents = document.querySelectorAll('.megamenu-tab-content');
// // //         for (const content of contents) {
// // //             const links = content.querySelectorAll('.megamenu-tab-content-item');
// // //             for (const link of links) {
// // //                 const href = link.getAttribute('href');
// // //                 if (href) {
// // //                     const path = href.replace(/\/$/, '');
// // //                     if (path === currentPath) {
// // //                         return content.id;
// // //                     }
// // //                 }
// // //             }
// // //         }
// // //         return 'megamenu-tab1';
// // //     }, [currentPath]);

// // //     // -----  active mega tab classes and animation -----
// // //     const updateActiveMegaTab = useCallback((tabId, animate = false) => {
// // //         if (activeMegaTabRef.current === tabId && !animate) return;
// // //         activeMegaTabRef.current = tabId;

// // //         const buttons = document.querySelectorAll('.megamenu-tab-btn');
// // //         const contents = document.querySelectorAll('.megamenu-tab-content');

// // //         buttons.forEach(btn => {
// // //             btn.classList.toggle('active', btn.dataset.tab === tabId);
// // //         });
// // //         contents.forEach(content => {
// // //             content.classList.toggle('active', content.id === tabId);
// // //         });

// // //         const activeContent = document.querySelector(`#${tabId}`);
// // //         if (activeContent) {
// // //             animateTabContent(activeContent, !animate);
// // //         }
// // //     }, []);

// // //     // ----- Main initialization -----
// // //     useEffect(() => {
// // //         if (initializedRef.current) return;
// // //         initializedRef.current = true;

// // //         // ----- Add chevron SVG to parent menu items with submenu -----
// // //         const addChevronToSubmenuParents = () => {
// // //             document.querySelectorAll('.main-menu ul li').forEach((li) => {
// // //                 if (li.querySelector('.sub-menu, .mega-menu')) {
// // //                     const trigger = li.querySelector('button, a');
// // //                     if (trigger) {
// // //                         const chevron = `
// // //               <svg class="fill-current" width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
// // //                 <path d="M0.264139 0.267679C0.433317 0.0962844 0.662742 0 0.901961 0C1.14118 0 1.37061 0.0962844 1.53978 0.267679L6.00545 4.7932L10.4711 0.267679C10.6413 0.101142 10.8691 0.00899045 11.1057 0.0110735C11.3422 0.0131565 11.5685 0.109307 11.7358 0.278816C11.903 0.448325 11.9979 0.677629 12 0.917342C12.002 1.15705 11.9111 1.388 11.7468 1.56042L6.64327 6.73232C6.47409 6.90372 6.24467 7 6.00545 7C5.76623 7 5.5368 6.90372 5.36762 6.73232L0.264139 1.56042C0.0950107 1.38898 0 1.15648 0 0.914052C0 0.671626 0.0950107 0.439126 0.264139 0.267679Z"/>
// // //               </svg>`;
// // //                         trigger.insertAdjacentHTML('beforeend', chevron);
// // //                     }
// // //                 }
// // //             });
// // //         };

// // //         // ----- Mega Menu Tabs (Desktop) -----
// // //         const initMegaMenuTabs = () => {
// // //             const tabsContainer = document.querySelector('.megamenu-tabs');
// // //             if (!tabsContainer) return;
// // //             const tabBtns = document.querySelectorAll('.megamenu-tab-btn');
// // //             const tabContents = document.querySelectorAll('.megamenu-tab-content');
// // //             if (!tabBtns.length || !tabContents.length) return;

// // //             // Prepare inactive tabs with hidden content (GSAP setup)
// // //             if (typeof gsap !== 'undefined') {
// // //                 tabContents.forEach((content) => {
// // //                     if (!content.classList.contains('active')) {
// // //                         const title = content.querySelector('.megamenu-tab-content-title');
// // //                         if (title) {
// // //                             const h5Words = title.querySelector('h5 .word');
// // //                             const pLines = title.querySelector('p .line');
// // //                             if (h5Words) gsap.set(h5Words, { opacity: 0 });
// // //                             if (pLines) gsap.set(pLines, { opacity: 0 });
// // //                         }
// // //                         const items = content.querySelector('.megamenu-tab-content-items');
// // //                         if (items) {
// // //                             const children = items.children;
// // //                             if (children.length) gsap.set(children, { opacity: 0 });
// // //                         }
// // //                     }
// // //                 });
// // //             }

// // //             // Click event for tab buttons
// // //             tabBtns.forEach((btn) => {
// // //                 btn.addEventListener('click', () => {
// // //                     tabBtns.forEach((b) => b.classList.remove('active'));
// // //                     btn.classList.add('active');
// // //                     tabContents.forEach((c) => c.classList.remove('active'));

// // //                     const targetId = btn.dataset.tab;
// // //                     const target = document.getElementById(targetId);
// // //                     if (target) {
// // //                         target.classList.add('active');
// // //                         const items = target.querySelector('.megamenu-tab-content-items');
// // //                         if (items && items.children) {
// // //                             Array.from(items.children).forEach((el) => {
// // //                                 if (typeof el._disableHover === 'function') el._disableHover();
// // //                             });
// // //                         }
// // //                         animateTabContent(target, false);
// // //                         activeMegaTabRef.current = targetId;
// // //                     }
// // //                 });
// // //             });
// // //         };

// // //         // ----- Mega Menu Item Hover Effect -----
// // //         const initMegaMenuTabContentItemHover = () => {
// // //             if (typeof gsap === 'undefined') return;
// // //             const items = document.querySelectorAll('.megamenu-tab-content-item');
// // //             if (!items.length) return;

// // //             items.forEach((item) => {
// // //                 const iconWrapper = item.querySelector('.megamenu-item-icon-wrapper');
// // //                 const overlay = item.querySelector('.megamenu-item-overlay');
// // //                 if (!iconWrapper) return;

// // //                 const originalColor = window.getComputedStyle(iconWrapper).color;
// // //                 const isDesktop = window.innerWidth >= 1024;

// // //                 let tl = null;
// // //                 let disabled = false;

// // //                 const disableHover = () => {
// // //                     disabled = true;
// // //                     if (tl) { tl.kill(); tl = null; }
// // //                     if (overlay) gsap.set(overlay, { opacity: 0 });
// // //                     if (iconWrapper) gsap.set(iconWrapper, { color: originalColor });
// // //                 };

// // //                 const enableHover = () => { disabled = false; };

// // //                 item.addEventListener('mouseenter', () => {
// // //                     if (disabled) return;
// // //                     if (tl) tl.kill();
// // //                     tl = gsap.timeline();
// // //                     if (overlay) {
// // //                         tl.to(overlay, { opacity: 1, duration: 0.3, ease: typeof CustomEase !== 'undefined' ? 'osmo-ease' : 'power2.out' }, 0);
// // //                     }
// // //                     const targetColor = isDesktop ? '#ffffff' : '#D1DE6F';
// // //                     tl.to(iconWrapper, { color: targetColor, duration: 0.3, ease: typeof CustomEase !== 'undefined' ? 'osmo-ease' : 'power2.out' }, 0);
// // //                 });

// // //                 item.addEventListener('mouseleave', () => {
// // //                     if (disabled) return;
// // //                     if (tl) tl.kill();
// // //                     tl = gsap.timeline();
// // //                     if (overlay) {
// // //                         tl.to(overlay, { opacity: 0, duration: 0.25, ease: typeof CustomEase !== 'undefined' ? 'osmo-ease' : 'power2.in' }, 0);
// // //                     }
// // //                     tl.to(iconWrapper, { color: originalColor, duration: 0.25, ease: typeof CustomEase !== 'undefined' ? 'osmo-ease' : 'power2.in' }, 0);
// // //                 });

// // //                 item._disableHover = disableHover;
// // //                 item._enableHover = enableHover;
// // //             });
// // //         };

// // //         // ----- Menu Toggle (Hamburger + Mobile navigation) -----
// // //         const menuToggle = () => {
// // //             const toggleBtn = document.querySelector('.menuToggle');
// // //             const mainMenu = document.querySelector('.main-menu');
// // //             if (!toggleBtn || !mainMenu) return;

// // //             if (mainMenu && !mainMenu.hasAttribute('data-lenis-prevent')) {
// // //                 mainMenu.setAttribute('data-lenis-prevent', '');
// // //             }

// // //             const openMenu = () => {
// // //                 toggleBtn.classList.add('is-active');
// // //                 mainMenu.classList.add('menu-active');
// // //                 document.body.classList.add('menu-overlay');
// // //                 if (typeof window.lenis !== 'undefined' && window.lenis) {
// // //                     try {
// // //                         if (typeof window.lenis.stop === 'function') window.lenis.stop();
// // //                     } catch { /* ignore */ }
// // //                 }
// // //                 document.body.style.overflow = 'hidden';
// // //                 document.documentElement.style.overflow = 'hidden';
// // //             };

// // //             const closeMenu = () => {
// // //                 toggleBtn.classList.remove('is-active');
// // //                 mainMenu.classList.remove('menu-active');
// // //                 document.body.classList.remove('menu-overlay');
// // //                 if (typeof window.lenis !== 'undefined' && window.lenis) {
// // //                     try {
// // //                         if (typeof window.lenis.start === 'function') window.lenis.start();
// // //                         document.documentElement.classList.remove('lenis-stopped');
// // //                     } catch { /* ignore */ }
// // //                 }
// // //                 document.body.style.overflow = '';
// // //                 document.documentElement.style.overflow = '';
// // //                 mainMenu.querySelectorAll('li').forEach((li) => {
// // //                     li.classList.remove('active');
// // //                     li.querySelectorAll('.sub-menu, .mega-menu').forEach((sub) => {
// // //                         sub.style.height = '0';
// // //                         setTimeout(() => { sub.style.display = 'none'; }, 300);
// // //                     });
// // //                 });
// // //             };

// // //             toggleBtn.addEventListener('click', () => {
// // //                 const isActive = toggleBtn.classList.contains('is-active');
// // //                 if (isActive) {
// // //                     closeMenu();
// // //                 } else {
// // //                     openMenu();
// // //                 }
// // //             });

// // //             mainMenu.addEventListener('click', (e) => {
// // //                 const targetLi = e.target.closest('li');
// // //                 if (!targetLi) return;
// // //                 if (targetLi.closest('.mega-menu')) return;
// // //                 const sub = targetLi.querySelector('.sub-menu, .mega-menu');
// // //                 if (!sub) return;

// // //                 if (targetLi.classList.contains('active')) {
// // //                     targetLi.classList.remove('active');
// // //                     sub.style.height = sub.scrollHeight + 'px';
// // //                     setTimeout(() => { sub.style.height = '0'; }, 10);
// // //                     setTimeout(() => { sub.style.display = 'none'; }, 300);
// // //                 } else {
// // //                     const siblings = targetLi.parentElement?.querySelectorAll(':scope > li') || [];
// // //                     siblings.forEach((sib) => {
// // //                         if (sib === targetLi) return;
// // //                         sib.classList.remove('active');
// // //                         sib.querySelectorAll(':scope > .sub-menu, :scope > .mega-menu').forEach((s) => {
// // //                             s.style.height = '0';
// // //                             setTimeout(() => { s.style.display = 'none'; }, 300);
// // //                         });
// // //                     });
// // //                     targetLi.classList.add('active');
// // //                     sub.style.display = 'block';
// // //                     const height = sub.scrollHeight + 'px';
// // //                     sub.style.height = '0';
// // //                     setTimeout(() => { sub.style.height = height; }, 10);
// // //                     setTimeout(() => { sub.style.height = ''; }, 300);
// // //                 }
// // //             });

// // //             document.addEventListener('click', (e) => {
// // //                 const isInsideMenu = mainMenu.contains(e.target);
// // //                 const isToggle = toggleBtn.contains(e.target);
// // //                 if (!isInsideMenu && !isToggle) {
// // //                     if (toggleBtn.classList.contains('is-active')) {
// // //                         closeMenu();
// // //                     }
// // //                 }
// // //             });

// // //             mainMenu.querySelectorAll('.mega-menu').forEach((mega) => {
// // //                 mega.addEventListener('click', (e) => e.stopPropagation(), { passive: true });
// // //                 const items = mega.querySelectorAll('.megamenu-item');
// // //                 items.forEach((item) => {
// // //                     const toggle = item.querySelector('.megamenu-item-toogle');
// // //                     const list = item.querySelector('.mega-menu-list');
// // //                     if (!toggle || !list) return;
// // //                     list.style.overflow = 'hidden';
// // //                     if (!item.classList.contains('active')) {
// // //                         list.style.display = 'none';
// // //                         list.style.height = '0';
// // //                     }
// // //                     toggle.addEventListener('click', (e) => {
// // //                         e.preventDefault();
// // //                         e.stopPropagation();
// // //                         const isActive = item.classList.contains('active');
// // //                         items.forEach((other) => {
// // //                             if (other === item) return;
// // //                             other.classList.remove('active');
// // //                             const otherList = other.querySelector('.mega-menu-list');
// // //                             if (otherList) {
// // //                                 otherList.style.height = otherList.scrollHeight + 'px';
// // //                                 otherList.getBoundingClientRect();
// // //                                 otherList.style.height = '0';
// // //                                 setTimeout(() => { otherList.style.display = 'none'; }, 300);
// // //                             }
// // //                         });
// // //                         if (isActive) {
// // //                             item.classList.remove('active');
// // //                             list.style.height = list.scrollHeight + 'px';
// // //                             list.getBoundingClientRect();
// // //                             list.style.height = '0';
// // //                             setTimeout(() => { list.style.display = 'none'; }, 300);
// // //                         } else {
// // //                             item.classList.add('active');
// // //                             list.style.display = 'block';
// // //                             const h = list.scrollHeight + 'px';
// // //                             list.style.height = '0';
// // //                             requestAnimationFrame(() => {
// // //                                 list.style.height = h;
// // //                             });
// // //                             setTimeout(() => { list.style.height = ''; }, 300);
// // //                         }
// // //                     });
// // //                 });
// // //             });
// // //         };

// // //         // ----- Submenu item overlay effect -----
// // //         const initSubmenuItemOverlay = () => {
// // //         const submenuItems = document.querySelectorAll('.submenu-item');
// // //         if (!submenuItems.length) return;

// // //         const handlers = [];

// // //         submenuItems.forEach((item) => {
// // //             const enterHandler = () => {
// // //             // Only apply on desktop (>= 1024px)
// // //             if (window.innerWidth >= 1024) {
// // //                 submenuItems.forEach((sibling) => {
// // //                 if (sibling !== item) {
// // //                     sibling.classList.add('overlay');
// // //                 }
// // //                 });
// // //             }
// // //             };

// // //             const leaveHandler = () => {
// // //             if (window.innerWidth >= 1024) {
// // //                 submenuItems.forEach((sibling) => {
// // //                 sibling.classList.remove('overlay');
// // //                 });
// // //             }
// // //             };

// // //             item.addEventListener('mouseenter', enterHandler);
// // //             item.addEventListener('mouseleave', leaveHandler);

// // //             handlers.push({ item, enterHandler, leaveHandler });
// // //         });

// // //         window.__submenuHandlers = handlers;
// // //         };

// // //         // ----- Sticky header + ScrollTrigger -----
// // //         const initStickyHeader = () => {
// // //             const header = headerRef.current;
// // //             if (!header) return;
// // //             if (typeof gsap !== 'undefined') {
// // //                 gsap.set(header, {
// // //                     willChange: 'transform',
// // //                     force3D: true,
// // //                     y: 0,
// // //                 });
// // //                 if (typeof ScrollTrigger !== 'undefined') {
// // //                     ScrollTrigger.create({
// // //                         onUpdate: (self) => {
// // //                             const scroll = self.scroll();
// // //                             if (scroll > 0) {
// // //                                 header.classList.add('sticky-header');
// // //                             } else {
// // //                                 header.classList.remove('sticky-header');
// // //                             }
// // //                             gsap.set(header, { y: 0 });
// // //                         }
// // //                     });
// // //                 }
// // //             }
// // //         };

// // //         // ----- Adjust body padding for fixed header -----
// // //         const adjustBodyPadding = () => {
// // //             const header = headerRef.current;
// // //             if (!header) return;
// // //             const height = header.offsetHeight;
// // //             if (height > 0) {
// // //                 document.body.style.paddingTop = height + 'px';
// // //             }
// // //         };

// // //         // ----- Run all init functions -----
// // //         addChevronToSubmenuParents();

// // //         const initialTabId = getActiveMegaTabId();
// // //         updateActiveMegaTab(initialTabId, false);

// // //         initMegaMenuTabs();
// // //         initMegaMenuTabContentItemHover();
// // //         menuToggle();
// // //         initSubmenuItemOverlay();

// // //         // Force-close the menu on initial load to prevent unwanted overlay
// // //         document.body.classList.remove('menu-overlay');
// // //         const mainMenu = document.querySelector('.main-menu');
// // //         if (mainMenu) mainMenu.classList.remove('menu-active');
// // //         const toggleBtn = document.querySelector('.menuToggle');
// // //         if (toggleBtn) toggleBtn.classList.remove('is-active');

// // //         initStickyHeader();
// // //         adjustBodyPadding();

// // //         let resizeTimer;
// // //         const handleResize = () => {
// // //             clearTimeout(resizeTimer);
// // //             resizeTimer = setTimeout(() => {
// // //                 adjustBodyPadding();
// // //             }, 200);
// // //         };
// // //         window.addEventListener('resize', handleResize);

// // //         return () => {
// // //             window.removeEventListener('resize', handleResize);

// // //             if (window.__submenuHandlers) {
// // //                 window.__submenuHandlers.forEach(({ item, enterHandler, leaveHandler }) => {
// // //                     item.removeEventListener('mouseenter', enterHandler);
// // //                     item.removeEventListener('mouseleave', leaveHandler);
// // //                 });
// // //                 delete window.__submenuHandlers;
// // //             }
// // //         };
// // //     }, [getActiveMegaTabId, updateActiveMegaTab]);

// // //     // ----- Route change effect -----
// // //     useEffect(() => {
// // //         const timer = setTimeout(() => {
// // //             const newTabId = getActiveMegaTabId();
// // //             updateActiveMegaTab(newTabId, true);
// // //         }, 50);
// // //         return () => clearTimeout(timer);
// // //     }, [currentPath, getActiveMegaTabId, updateActiveMegaTab]);

// // //     return (
// // //         <>
// // //             <header ref={headerRef} className="header-area lg:py-1.5 bg-secondary fixed w-full top-0 left-0 right-0 z-999999 border-b border-white/10">
// // //                 <div className="container">
// // //                     <div className="header-wrapper flex items-center justify-between gap-5 py-3 sm:py-4 lg:py-0">
// // //                         <Link className="max-w-43.5 w-full logo" to="/">
// // //                             <img className="w-full h-auto bg-blend-exclusion" src={logo} alt="site-logo" />
// // //                         </Link>
// // //                         <nav className="main-menu" data-lenis-prevent>
// // //                             <ul>
// // //                                 <li className="relative parent-parent-menu-item">
// // //                                     <button className={`home-link ${isActive(
// // //                                         "/", "/index-two", "/index-three"
// // //                                     ) ? "active" : ""}`} type="button"
// // //                                     >Home</button>
// // //                                     <ul className="sub-menu">
// // //                                         <li className="submenu-item">
// // //                                             <Link to="/"
// // //                                                 className={`sub-menu-item lg:flex flex-col items-start lg:items-center justify-start lg:justify-center text-left lg:text-center gap-5 text-base lg:text-lg font-normal lg:font-medium text-white lg:text-title_black leading-none group duration-300 lg:hover:text-secondary
// // //                                                 ${isActive('/') ? 'active' : ''}`}
// // //                                             >
// // //                                                 <div className="relative hidden lg:flex items-center justify-center border border-border rounded-lg overflow-hidden submenu-thumb">
// // //                                                     <img className="w-full" src={home01} alt="home-01" />
// // //                                                     <div className="w-15 h-15 rounded-full flex items-center justify-center bg-primary absolute scale-0 transform opacity-0 duration-300 group-hover:scale-100 group-hover:opacity-100 submenu-item-link">
// // //                                                         <img src={arrow} alt="arrow" />
// // //                                                     </div>
// // //                                                 </div>
// // //                                                 Wealth Insights
// // //                                             </Link>
// // //                                         </li>
// // //                                         <li className="submenu-item">
// // //                                             <Link to="/index-two"
// // //                                                 className={`sub-menu-item lg:flex flex-col items-start lg:items-center justify-start lg:justify-center text-left lg:text-center gap-5 text-base lg:text-lg font-normal lg:font-medium text-white lg:text-title_black leading-none group duration-300 lg:hover:text-secondary
// // //                                                 ${isActive('/index-two') ? 'active' : ''}`}
// // //                                             >
// // //                                                 <div className="relative hidden lg:flex items-center justify-center border border-border rounded-lg overflow-hidden submenu-thumb">
// // //                                                     <img className="w-full" src={home02} alt="home-02" />
// // //                                                     <div
// // //                                                         className="w-15 h-15 rounded-full flex items-center justify-center bg-primary absolute scale-0 transform opacity-0 duration-300 group-hover:scale-100 group-hover:opacity-100 submenu-item-link">
// // //                                                         <img src={arrow} alt="arrow" />
// // //                                                     </div>
// // //                                                 </div>
// // //                                                 Digital-First Bank
// // //                                             </Link>
// // //                                         </li>
// // //                                         <li className="submenu-item">
// // //                                             <Link to="/index-three"
// // //                                                 className={`sub-menu-item lg:flex flex-col items-start lg:items-center justify-start lg:justify-center text-left lg:text-center gap-5 text-base lg:text-lg font-normal lg:font-medium text-white lg:text-title_black leading-none group duration-300 lg:hover:text-secondary
// // //                                                 ${isActive('/index-three') ? 'active' : ''}`}
// // //                                             >
// // //                                                 <div
// // //                                                     className="relative hidden lg:flex items-center justify-center border border-border rounded-lg overflow-hidden submenu-thumb">
// // //                                                     <img className="w-full" src={home03} alt="home-03" />
// // //                                                     <div
// // //                                                         className="w-15 h-15 rounded-full flex items-center justify-center bg-primary absolute scale-0 transform opacity-0 duration-300 group-hover:scale-100 group-hover:opacity-100 submenu-item-link">
// // //                                                         <img src={arrow} alt="arrow" />
// // //                                                     </div>
// // //                                                 </div>
// // //                                                 Institutional Trust Bank
// // //                                             </Link>
// // //                                         </li>
// // //                                     </ul>
// // //                                 </li>
// // //                                 <li>
// // //                                     <Link to="/about-us" className={`sub-menu-item ${isActive('/about-us') ? 'active' : ''}`}>About Us</Link>
// // //                                 </li>
// // //                                 <li>
// // //                                     <Link to="/services" className={`sub-menu-item ${isActive('/services') ? 'active' : ''}`}>Services</Link>
// // //                                 </li>
// // //                                 <li>
// // //                                     <Link to="/contact" className={`sub-menu-item ${isActive('/contact') ? 'active' : ''}`}>Contact Us</Link>
// // //                                 </li>
// // //                                 <li className="relative parent-parent-menu-item">
// // //                                     <button className={`home-link ${isActive(
// // //                                         "/partners", "/getstrated", "/404",
// // //                                         "/financial-tools", "/loan-eligibility", "/platform", "/security", "/apply-loan", "/sign-in", "/sign-up", "/reset-password", "/password",
// // //                                         "/blog", "/case-study", "/blog-post-1", "/case-study-post", "/blog-post-2", "/disclaimer", "/blog-post-3", "/blog-author", "/blog-genre"
// // //                                     ) ? "active" : ""}`}
// // //                                         type="button"
// // //                                     >All Pages</button>
// // //                                     <div className="mega-menu">
// // //                                         {/* Desktop Megamenu */}
// // //                                         <div className="hidden lg:flex justify-between gap-6 w-full">
// // //                                             <div className="megamenu-tabs max-w-50 w-full flex flex-col justify-between gap-6">
// // //                                                 <div className="flex flex-col gap-3">
// // //                                                     <button type="button"
// // //                                                         className="megamenu-tab-btn w-full py-3 px-4 rounded-lg bg-transparent flex items-center justify-between gap-2 text-base leading-none text-title_black transition-all duration-300 active"
// // //                                                         data-tab="megamenu-tab1">
// // //                                                         Company
// // //                                                         <svg className="w-5 h-5 fill-current">
// // //                                                             <use href="#tabArrow"></use>
// // //                                                         </svg>
// // //                                                     </button>
// // //                                                     <button type="button"
// // //                                                         className="megamenu-tab-btn w-full py-3 px-4 rounded-lg bg-transparent flex items-center justify-between gap-2 text-base leading-none text-title_black transition-all duration-300"
// // //                                                         data-tab="megamenu-tab2">
// // //                                                         Banking Services
// // //                                                         <svg className="w-5 h-5 fill-current">
// // //                                                             <use href="#tabArrow"></use>
// // //                                                         </svg>
// // //                                                     </button>
// // //                                                     <button type="button"
// // //                                                         className="megamenu-tab-btn w-full py-3 px-4 rounded-lg bg-transparent flex items-center justify-between gap-2 text-base leading-none text-title_black transition-all duration-300"
// // //                                                         data-tab="megamenu-tab3">
// // //                                                         Legal Trust
// // //                                                         <svg className="w-5 h-5 fill-current">
// // //                                                             <use href="#tabArrow"></use>
// // //                                                         </svg>
// // //                                                     </button>
// // //                                                 </div>

// // //                                             </div>
// // //                                             <div className="w-px bg-border"></div>
// // //                                             <div className="max-w-142.5 w-full">
// // //                                                 <div id="megamenu-tab1" className="megamenu-tab-content active" data-tab-content="megamenu-tab1">
// // //                                                     <div className="">
// // //                                                         <div className="megamenu-tab-content-title max-w-[520px]">
// // //                                                             <h5>Who We Are</h5>
// // //                                                             <p className="mt-3">Learn about our company identity, homepages,
// // //                                                                 partnerships, and brand essentials that define trust and
// // //                                                                 credibility.</p>
// // //                                                         </div>
// // //                                                         <div
// // //                                                             className="grid grid-cols-2 gap-4 megamenu-tab-content-items mt-10 overflow-hidden">

// // //                                                             <div>
// // //                                                                 <Link to="/about-us"
// // //                                                                     className="megamenu-tab-content-item flex items-start gap-4 group">
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-07"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             About Us</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Company overview with mission, vision, and values.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/partners"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/partners') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-02"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Partner</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Partnership opportunities and collaborations.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/getstrated"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/getstrated') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-04"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Get Started</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Quick-start guide for new users or clients.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/404"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/404') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-06"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             404 Error Page</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Error page template for broken or missing links.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/contact"
// // //                                                                     className="megamenu-tab-content-item flex items-start gap-4 group">
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-13"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Contact Us</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Contact information and inquiry form.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                         </div>
// // //                                                     </div>
// // //                                                 </div>
// // //                                                 <div id="megamenu-tab2" className="megamenu-tab-content" data-tab-content="megamenu-tab2">
// // //                                                     <div className="">
// // //                                                         <div className="megamenu-tab-content-title max-w-[520px]">
// // //                                                             <h5>How We Serve You</h5>
// // //                                                             <p className="mt-3">Explore our banking solutions â€” from financial tools
// // //                                                                 and loan services to secure platforms designed for modern customers.
// // //                                                             </p>
// // //                                                         </div>
// // //                                                         <div
// // //                                                             className="grid grid-cols-2 gap-4 megamenu-tab-content-items mt-10 overflow-hidden">

// // //                                                             <div>
// // //                                                                 <Link to="/financial-tools"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/financial-tools') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-08"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Financial Tools</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Interactive calculators and tools for financial
// // //                                                                             planning.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/services"
// // //                                                                     className="megamenu-tab-content-item flex items-start gap-4 group">
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-09"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Products Service</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Overview of banking products and services offered.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/loan-eligibility"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/loan-eligibility') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-10"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Loan Eligibility</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Page to check eligibility criteria for loans.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/platform"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/platform') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-11"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Platform</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Details about the banking platform and features.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/security"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/security') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-12"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Security</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Information on security measures and data protection.
// // //                                                                         </p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/apply-loan"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/apply-loan') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-14"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Apply for a Loan</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Loan application form and process details.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/sign-in"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/sign-in') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-22"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Sign In</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Access your account securely.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/sign-up"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/sign-up') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-23"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Sign Up</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Create your SecureVest account.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/reset-password"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/reset-password') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-24"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Reset Password</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Reset your account password securely.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/password"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/password') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-24"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Password Protected</p>
// // //                                                                         <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Protect Your account Password.
// // //                                                                         </p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                         </div>
// // //                                                     </div>
// // //                                                 </div>
// // //                                                 <div id="megamenu-tab3" className="megamenu-tab-content" data-tab-content="megamenu-tab3">
// // //                                                     <div className="">
// // //                                                         <div className="megamenu-tab-content-title max-w-[520px]">
// // //                                                             <h5>Resources Legal</h5>
// // //                                                             <p className="mt-3"> Where Knowledge Meets Trust Short Description: Access
// // //                                                                 resources and compliance pages â€” blogs, case studies, and legal
// // //                                                                 documentation that provide transparency and insight.</p>
// // //                                                         </div>
// // //                                                         <div
// // //                                                             className="grid grid-cols-2 gap-4 megamenu-tab-content-items mt-10 overflow-hidden">

// // //                                                             <div>
// // //                                                                 <Link to="/blog"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/blog') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-15"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Blog List</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Listing page for all blog posts.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/case-study"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/case-study') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-16"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Case Study</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Listing page for case studies.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/blog-post-1"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/blog-post-1') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-17"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Single Blog V1</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Individual blog post layout version 1.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/case-study-post"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/case-study-post') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-18"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Single Case Study</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Template for individual case study details.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/blog-post-2"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/blog-post-2') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-19"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Single Blog V2</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Individual blog post layout version 2.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/disclaimer"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/disclaimer') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-20"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Disclaimer</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Legal disclaimer and compliance information.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/blog-post-3"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/blog-post-3') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-21"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Single Blog V3</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Individual blog post layout version 3.</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/blog-author"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/blog-author') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-21"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Blog Author</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Template for all blog authors</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                             <div>
// // //                                                                 <Link to="/blog-genre"
// // //                                                                     className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                                     ${isActive('/blog-genre') ? 'active' : ''}`}
// // //                                                                 >
// // //                                                                     <div
// // //                                                                         className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                         <svg className="w-5 h-5 fill-current">
// // //                                                                             <use href="#megamenuItemIcon-21"></use>
// // //                                                                         </svg>
// // //                                                                         <div
// // //                                                                             className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                         </div>
// // //                                                                     </div>
// // //                                                                     <div className="flex-1">
// // //                                                                         <p
// // //                                                                             className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                             Blog Genre</p>
// // //                                                                         <p
// // //                                                                             className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                             Template for all blog categories</p>
// // //                                                                     </div>
// // //                                                                 </Link>
// // //                                                             </div>
// // //                                                         </div>
// // //                                                     </div>
// // //                                                 </div>
// // //                                             </div>
// // //                                         </div>
// // //                                         {/* Mobile Megamenu */}
// // //                                         <div className="block lg:hidden">
// // //                                             <div className="w-full megamenu-item">
// // //                                                 <button type="button"
// // //                                                     className="flex items-center justify-between gap-3 mb-5 cursor-pointer w-full megamenu-item-toogle text-base leading-none text-white">
// // //                                                     Company
// // //                                                     <svg className="block lg:hidden w-4.5 h-4.5 fill-current text-white">
// // //                                                         <use href="#tabArrow"></use>
// // //                                                     </svg>
// // //                                                 </button>
// // //                                                 <div className="mega-menu-list">

// // //                                                     <div>
// // //                                                         <Link to="/about-us"
// // //                                                             className="megamenu-tab-content-item flex items-start gap-4 group">
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-07"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     About Us</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">Company
// // //                                                                     overview with mission, vision, and values.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/partners"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/partners') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-02"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Partner</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                     Partnership opportunities and collaborations.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/getstrated"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/getstrated') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-04"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Get Started</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                     Quick-start guide for new users or clients.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/404"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/404') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-06"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     404 Error Page</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">Error
// // //                                                                     page template for broken or missing links.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/contact"
// // //                                                             className="megamenu-tab-content-item flex items-start gap-4 group">
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-13"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Contact Us</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">Contact
// // //                                                                     information and inquiry form.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                 </div>
// // //                                             </div>
// // //                                             <div className="w-full megamenu-item">
// // //                                                 <button type="button"
// // //                                                     className="flex items-center justify-between gap-3 mb-5 cursor-pointer w-full megamenu-item-toogle text-base leading-none text-white">
// // //                                                     Banking Services
// // //                                                     <svg className="block lg:hidden w-4.5 h-4.5 fill-current text-white">
// // //                                                         <use href="#tabArrow"></use>
// // //                                                     </svg>
// // //                                                 </button>
// // //                                                 <div className="mega-menu-list">

// // //                                                     <div>
// // //                                                         <Link to="/financial-tools"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/financial-tools') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-08"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Financial Tools</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                     Interactive calculators and tools for financial planning.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/services"
// // //                                                             className="megamenu-tab-content-item flex items-start gap-4 group">
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-09"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Products Service</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                     Overview of banking products and services offered.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/loan-eligibility"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/loan-eligibility') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-10"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Loan Eligibility</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">Page to
// // //                                                                     check eligibility criteria for loans.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/platform"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/platform') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-11"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Platform</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">Details
// // //                                                                     about the banking platform and features.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/security"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/security') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-12"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Security</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                     Information on security measures and data protection.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/apply-loan"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/apply-loan') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-14"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Apply for a Loan</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">Loan
// // //                                                                     application form and process details.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/sign-in"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/sign-in') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-22"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Sign In</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">Access
// // //                                                                     your account securely.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/sign-up"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/sign-up') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-23"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Sign Up</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">Create
// // //                                                                     your SecureVest account.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/reset-password"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/reset-password') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-24"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Reset Password</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">Reset
// // //                                                                     your account password securely.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/password"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/password') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-24"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Password Protected</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                     Protect Your account Password.
// // //                                                                 </p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                 </div>
// // //                                             </div>
// // //                                             <div className="w-full megamenu-item">
// // //                                                 <button type="button"
// // //                                                     className="flex items-center justify-between gap-3 mb-5 cursor-pointer w-full megamenu-item-toogle text-base leading-none text-white">
// // //                                                     Legal Trust
// // //                                                     <svg className="block lg:hidden w-4.5 h-4.5 fill-current text-white">
// // //                                                         <use href="#tabArrow"></use>
// // //                                                     </svg>
// // //                                                 </button>
// // //                                                 <div className="mega-menu-list">

// // //                                                     <div>
// // //                                                         <Link to="/blog"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/blog') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-15"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Blog List</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">Listing
// // //                                                                     page for all blog posts.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/blog-post-1"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/blog-post-1') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-17"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Single Blog V1</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                     Individual blog post layout version 1.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/blog-post-2"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/blog-post-2') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-19"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Single Blog V2</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                     Individual blog post layout version 2.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/blog-post-3"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/blog-post-3') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-21"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Single Blog V3</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                     Individual blog post layout version 3.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/blog-author"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/blog-author') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-21"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Blog Author</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                     Template for all blog authors</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/blog-genre"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/blog-genre') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-21"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Blog Genre</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                     Template for all blog categories</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/case-study"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/case-study') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-16"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Case Study</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">Listing
// // //                                                                     page for case studies.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/case-study-post"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/case-study-post') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-18"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Single Case Study</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">
// // //                                                                     Template for individual case study details.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                     <div>
// // //                                                         <Link to="/disclaimer"
// // //                                                             className={`sub-menu-item megamenu-tab-content-item flex items-start gap-4 group
// // //                                                             ${isActive('/disclaimer') ? 'active' : ''}`}
// // //                                                         >
// // //                                                             <div
// // //                                                                 className="megamenu-item-icon-wrapper w-8 h-8 rounded-md flex items-center justify-center border border-primary lg:border-border relative z-1 overflow-hidden text-primary! lg:text-secondary! group-hover:text-title_black! lg:group-hover:text-white! bg-white/10 lg:bg-background">
// // //                                                                 <svg className="w-5 h-5 fill-current">
// // //                                                                     <use href="#megamenuItemIcon-20"></use>
// // //                                                                 </svg>
// // //                                                                 <div
// // //                                                                     className="megamenu-item-overlay absolute -z-1 top-1/2 left-1/2 transform -translate-1/2 w-full h-full bg-primary lg:bg-secondary opacity-0">
// // //                                                                 </div>
// // //                                                             </div>
// // //                                                             <div className="flex-1">
// // //                                                                 <p
// // //                                                                     className="megamenu-item-title text-base leading-none text-white lg:text-title_black font-semibold">
// // //                                                                     Disclaimer</p>
// // //                                                                 <p className="text-sm mt-1 text-white/60 lg:text-title_black/80">Legal
// // //                                                                     disclaimer and compliance information.</p>
// // //                                                             </div>
// // //                                                         </Link>
// // //                                                     </div>
// // //                                                 </div>
// // //                                             </div>
// // //                                         </div>
// // //                                     </div>
// // //                                 </li>
// // //                                 <li className="block sm:hidden">
// // //                                     <div className="">
// // //                                         <Link to="/apply-loan"
// // //                                             className="button-primary sm:block! text-center justify-center! w-full">
// // //                                             Quick Loan
// // //                                         </Link>
// // //                                     </div>
// // //                                 </li>
// // //                             </ul>
// // //                         </nav>
// // //                         <div className="flex items-center gap-5">
// // //                             <Link to="/apply-loan" className="button-primary hidden! sm:inline-flex!">
// // //                                 Quick Loan
// // //                             </Link>
// // //                             {/* Hamburger */}
// // //                             <button type="button" className="menuToggle" aria-label="Toggle navigation menu">
// // //                                 <svg className="stroke-current text-white" width="40" viewBox="0 0 100 100">
// // //                                     <path className="line line1"
// // //                                         d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
// // //                                     <path className="line line2" d="M 20,50 H 80" />
// // //                                     <path className="line line3"
// // //                                         d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
// // //                                 </svg>
// // //                             </button>
// // //                         </div>
// // //                     </div>
// // //                 </div>
// // //             </header>
// // //         </>
// // //     )
// // // }



// // import { useEffect, useRef } from 'react';
// // import { useLocation, Link } from 'react-router-dom';

// // import gsap from 'gsap';
// // import { ScrollTrigger } from 'gsap/ScrollTrigger';

// // import logo from "../assets/img/maypasWhite.png";

// // const NAV_LINKS = [
// //     { label: 'Home', path: '/' },
// //     { label: 'About Us', path: '/about-us' },
// //     { label: 'Services', path: '/services' },
// //     { label: 'Contact Us', path: '/contact' },
// // ];

// // export default function Navbar() {

// //     const headerRef = useRef(null);
// //     const initializedRef = useRef(false);

// //     // ----- Active route logic -----
// //     const location = useLocation();
// //     const currentPath = location.pathname.replace(/\/$/, '');
// //     const isActive = (path) => currentPath === path.replace(/\/$/, '');

// //     // ----- Main initialization -----
// //     useEffect(() => {
// //         if (initializedRef.current) return;
// //         initializedRef.current = true;

// //         // ----- Mobile menu toggle -----
// //         const menuToggle = () => {
// //             const toggleBtn = document.querySelector('.menuToggle');
// //             const mainMenu = document.querySelector('.main-menu');
// //             if (!toggleBtn || !mainMenu) return;

// //             if (!mainMenu.hasAttribute('data-lenis-prevent')) {
// //                 mainMenu.setAttribute('data-lenis-prevent', '');
// //             }

// //             const openMenu = () => {
// //                 toggleBtn.classList.add('is-active');
// //                 mainMenu.classList.add('menu-active');
// //                 document.body.classList.add('menu-overlay');
// //                 if (typeof window.lenis !== 'undefined' && window.lenis?.stop) {
// //                     try { window.lenis.stop(); } catch { /* ignore */ }
// //                 }
// //                 document.body.style.overflow = 'hidden';
// //                 document.documentElement.style.overflow = 'hidden';
// //             };

// //             const closeMenu = () => {
// //                 toggleBtn.classList.remove('is-active');
// //                 mainMenu.classList.remove('menu-active');
// //                 document.body.classList.remove('menu-overlay');
// //                 if (typeof window.lenis !== 'undefined' && window.lenis?.start) {
// //                     try {
// //                         window.lenis.start();
// //                         document.documentElement.classList.remove('lenis-stopped');
// //                     } catch { /* ignore */ }
// //                 }
// //                 document.body.style.overflow = '';
// //                 document.documentElement.style.overflow = '';
// //             };

// //             toggleBtn.addEventListener('click', () => {
// //                 if (toggleBtn.classList.contains('is-active')) {
// //                     closeMenu();
// //                 } else {
// //                     openMenu();
// //                 }
// //             });

// //             document.addEventListener('click', (e) => {
// //                 const isInsideMenu = mainMenu.contains(e.target);
// //                 const isToggle = toggleBtn.contains(e.target);
// //                 if (!isInsideMenu && !isToggle && toggleBtn.classList.contains('is-active')) {
// //                     closeMenu();
// //                 }
// //             });
// //         };

// //         // ----- Sticky header + ScrollTrigger -----
// //         const initStickyHeader = () => {
// //             const header = headerRef.current;
// //             if (!header) return;
// //             if (typeof gsap !== 'undefined') {
// //                 gsap.set(header, { willChange: 'transform', force3D: true, y: 0 });
// //                 if (typeof ScrollTrigger !== 'undefined') {
// //                     ScrollTrigger.create({
// //                         onUpdate: (self) => {
// //                             const scroll = self.scroll();
// //                             header.classList.toggle('sticky-header', scroll > 0);
// //                             gsap.set(header, { y: 0 });
// //                         }
// //                     });
// //                 }
// //             }
// //         };

// //         // ----- Adjust body padding for fixed header -----
// //         const adjustBodyPadding = () => {
// //             const header = headerRef.current;
// //             if (!header) return;
// //             const height = header.offsetHeight;
// //             if (height > 0) {
// //                 document.body.style.paddingTop = height + 'px';
// //             }
// //         };

// //         menuToggle();

// //         // Force-close the menu on initial load
// //         document.body.classList.remove('menu-overlay');
// //         const mainMenu = document.querySelector('.main-menu');
// //         if (mainMenu) mainMenu.classList.remove('menu-active');
// //         const toggleBtn = document.querySelector('.menuToggle');
// //         if (toggleBtn) toggleBtn.classList.remove('is-active');

// //         initStickyHeader();
// //         adjustBodyPadding();

// //         let resizeTimer;
// //         const handleResize = () => {
// //             clearTimeout(resizeTimer);
// //             resizeTimer = setTimeout(() => {
// //                 adjustBodyPadding();
// //             }, 200);
// //         };
// //         window.addEventListener('resize', handleResize);

// //         return () => {
// //             window.removeEventListener('resize', handleResize);
// //         };
// //     }, []);

// //     return (
// //         <header
// //             ref={headerRef}
// //             className="header-area lg:py-1.5 bg-secondary fixed w-full top-0 left-0 right-0 z-999999 border-b border-white/10"
// //         >
// //             <div className="container">
// //                 <div className="header-wrapper flex items-center justify-between gap-5 py-3 sm:py-4 lg:py-0">

// //                     {/* Logo — left */}
// //                     <Link className="max-w-43.5 w-full logo" to="/">
// //                         <img className="w-full h-auto bg-blend-exclusion" src={logo} alt="site-logo" />
// //                     </Link>

// //                     {/* Flat nav — right */}
// //                     <nav className="main-menu" data-lenis-prevent>
// //                         <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
// //                             {NAV_LINKS.map((link) => (
// //                                 <li key={link.path}>
// //                                     <Link
// //                                         to={link.path}
// //                                         className={`sub-menu-item text-base leading-none text-white transition-colors duration-300 hover:text-primary ${isActive(link.path) ? 'active' : ''}`}
// //                                     >
// //                                         {link.label}
// //                                     </Link>
// //                                 </li>
// //                             ))}
// //                             <li>
// //                                 <Link to="/apply-loan" className="button-primary">
// //                                     Quick Loan
// //                                 </Link>
// //                             </li>
// //                         </ul>
// //                     </nav>

// //                     {/* Mobile toggle — hidden on desktop since nav sits inline on the right */}
// //                     <button type="button" className="menuToggle lg:hidden" aria-label="Toggle navigation menu">
// //                         <svg className="stroke-current text-white" width="40" viewBox="0 0 100 100">
// //                             <path className="line line1"
// //                                 d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
// //                             <path className="line line2" d="M 20,50 H 80" />
// //                             <path className="line line3"
// //                                 d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
// //                         </svg>
// //                     </button>
// //                 </div>
// //             </div>
// //         </header>
// //     )
// // }


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
//             className="header-area lg:py-1.5 bg-secondary fixed w-full top-0 left-0 right-0 z-999999 border-b border-white/10"
//         >
//             <div className="container">
//                 <div className="header-wrapper flex items-center justify-between gap-5 py-3 sm:py-4 lg:py-0">

//                     {/* Logo — left */}
//                     <Link className="max-w-43.5 w-full logo" to="/">
//                         <img className="w-full h-auto bg-blend-exclusion" src={logo} alt="site-logo" />
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
//                                 <Link to="/apply-loan" className="button-primary">
//                                     Quick Loan
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



import { useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import logo from "../assets/img/maypasWhite.png";

const NAV_LINKS = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Services', path: '/services' },
    { label: 'Contact Us', path: '/contact' },
];

export default function Navbar() {

    const headerRef = useRef(null);
    const initializedRef = useRef(false);

    // ----- Active route logic -----
    const location = useLocation();
    const currentPath = location.pathname.replace(/\/$/, '');
    const isActive = (path) => currentPath === path.replace(/\/$/, '');

    // ----- Main initialization -----
    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;

        // ----- Mobile menu toggle -----
        const menuToggle = () => {
            const toggleBtn = document.querySelector('.menuToggle');
            const mainMenu = document.querySelector('.main-menu');
            if (!toggleBtn || !mainMenu) return;

            if (!mainMenu.hasAttribute('data-lenis-prevent')) {
                mainMenu.setAttribute('data-lenis-prevent', '');
            }

            const openMenu = () => {
                toggleBtn.classList.add('is-active');
                mainMenu.classList.add('menu-active');
                document.body.classList.add('menu-overlay');
                if (typeof window.lenis !== 'undefined' && window.lenis?.stop) {
                    try { window.lenis.stop(); } catch { /* ignore */ }
                }
                document.body.style.overflow = 'hidden';
                document.documentElement.style.overflow = 'hidden';
            };

            const closeMenu = () => {
                toggleBtn.classList.remove('is-active');
                mainMenu.classList.remove('menu-active');
                document.body.classList.remove('menu-overlay');
                if (typeof window.lenis !== 'undefined' && window.lenis?.start) {
                    try {
                        window.lenis.start();
                        document.documentElement.classList.remove('lenis-stopped');
                    } catch { /* ignore */ }
                }
                document.body.style.overflow = '';
                document.documentElement.style.overflow = '';
            };

            toggleBtn.addEventListener('click', () => {
                if (toggleBtn.classList.contains('is-active')) {
                    closeMenu();
                } else {
                    openMenu();
                }
            });

            document.addEventListener('click', (e) => {
                const isInsideMenu = mainMenu.contains(e.target);
                const isToggle = toggleBtn.contains(e.target);
                if (!isInsideMenu && !isToggle && toggleBtn.classList.contains('is-active')) {
                    closeMenu();
                }
            });
        };

        // ----- Sticky header + ScrollTrigger -----
        const initStickyHeader = () => {
            const header = headerRef.current;
            if (!header) return;
            if (typeof gsap !== 'undefined') {
                gsap.set(header, { willChange: 'transform', force3D: true, y: 0 });
                if (typeof ScrollTrigger !== 'undefined') {
                    ScrollTrigger.create({
                        onUpdate: (self) => {
                            const scroll = self.scroll();
                            header.classList.toggle('sticky-header', scroll > 0);
                            gsap.set(header, { y: 0 });
                        }
                    });
                }
            }
        };

        // ----- Adjust body padding for fixed header -----
        const adjustBodyPadding = () => {
            const header = headerRef.current;
            if (!header) return;
            const height = header.offsetHeight;
            if (height > 0) {
                document.body.style.paddingTop = height + 'px';
            }
        };

        menuToggle();

        // Force-close the menu on initial load
        document.body.classList.remove('menu-overlay');
        const mainMenu = document.querySelector('.main-menu');
        if (mainMenu) mainMenu.classList.remove('menu-active');
        const toggleBtn = document.querySelector('.menuToggle');
        if (toggleBtn) toggleBtn.classList.remove('is-active');

        initStickyHeader();
        adjustBodyPadding();

        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                adjustBodyPadding();
            }, 200);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <header
            ref={headerRef}
            className="header-area lg:py-0 bg-secondary fixed w-full top-0 left-0 right-0 z-999999 border-b border-white/10"
        >
            <div className="container">
                <div className="header-wrapper flex items-center justify-between gap-5 py-2 sm:py-2.5 lg:py-0">

                    {/* Logo — left */}
                    <Link className="logo shrink-0" to="/">
                        <img className="h-8 lg:h-9 w-auto bg-blend-exclusion" src={logo} alt="site-logo" />
                    </Link>

                    {/* Flat nav — right */}
                    <nav className="main-menu" data-lenis-prevent>
                        <ul className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-8">
                            {NAV_LINKS.map((link) => (
                                <li key={link.path}>
                                    <Link
                                        to={link.path}
                                        className={`sub-menu-item text-base leading-none text-white transition-colors duration-300 hover:text-primary ${isActive(link.path) ? 'active' : ''}`}
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Link to="/coming-soon" className="button-primary">
                                    Get Started
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Mobile toggle — hidden on desktop since nav sits inline on the right */}
                    <button type="button" className="menuToggle lg:hidden" aria-label="Toggle navigation menu">
                        <svg className="stroke-current text-white" width="40" viewBox="0 0 100 100">
                            <path className="line line1"
                                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                            <path className="line line2" d="M 20,50 H 80" />
                            <path className="line line3"
                                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}