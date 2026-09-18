import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import blogPost4 from "../../../../assets/img/blog-post/blog-3/blog-post-4.webp";
import blogPost5 from "../../../../assets/img/blog-post/blog-3/blog-post-5.webp";
import donate from "../../../../assets/img/home-v1/about/donate.mp4";
import blogPost10 from "../../../../assets/img/blog-post/blog-3/blog-post-10.webp";
import blogPost11 from "../../../../assets/img/blog-post/blog-3/blog-post-11.webp";
import blogPost12 from "../../../../assets/img/blog-post/blog-3/blog-post-12.webp";

gsap.registerPlugin(ScrollTrigger);

export default function Article() {

    const articleContentRef = useRef(null);
    const tocListRef = useRef(null);

    // For fslightbox
    useEffect(() => {
        if (typeof window.refreshFsLightbox === "function") {
            window.refreshFsLightbox();
        }
    }, []);

    // ===== TOC generation & scroll highlighting =====
    useEffect(() => {
        const article = articleContentRef.current;
        const tocList = tocListRef.current;
        if (!article || !tocList) return;

        const headings = article.querySelectorAll("h2, h3, h4, h5");
        if (!headings.length) return;

        const usedIds = new Set();
        tocList.innerHTML = "";

        headings.forEach((heading, index) => {
            let id = heading.getAttribute("id");
            if (!id) {
                const raw = (heading.textContent || heading.innerText || "section")
                    .toString()
                    .trim()
                    .toLowerCase()
                    .replace(/[\s\W]+/g, "_")
                    .replace(/^_+|_+$/g, "") || "section";
                let candidate = raw;
                let counter = 1;
                while (usedIds.has(candidate) || document.getElementById(candidate)) {
                    candidate = `${raw}_${counter++}`;
                }
                id = candidate;
                heading.setAttribute("id", id);
                usedIds.add(id);
            }

            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = `#${id}`;
            a.textContent = heading.textContent || heading.innerText || `Section ${index + 1}`;
            li.appendChild(a);
            tocList.appendChild(li);
        });

        const handleTocClick = (e) => {
            const link = e.target.closest("a");
            if (!link) return;
            const href = link.getAttribute("href");
            if (!href || href.charAt(0) !== "#") return;

            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();

            const header = document.querySelector(".header-area");
            const offset = header ? header.offsetHeight : 0;

            if (window.lenis && typeof window.lenis.scrollTo === "function") {
                window.lenis.scrollTo(target, { offset: -offset, duration: 0.8 });
            } else {
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: "smooth" });
            }
        };

        tocList.addEventListener("click", handleTocClick);

        const updateActive = () => {
            const links = Array.from(tocList.querySelectorAll("a"));
            if (!links.length) return;

            const header = document.querySelector(".header-area");
            const headerOffset = header ? header.offsetHeight : 0;
            const threshold = headerOffset + 8;

            let activeIndex = 0;
            const targetElements = links.map((link) =>
                document.querySelector(link.getAttribute("href"))
            ).filter(Boolean);

            for (let i = 0; i < targetElements.length; i++) {
                const rect = targetElements[i].getBoundingClientRect();
                if (rect.top - threshold <= 0) {
                    activeIndex = i;
                } else {
                    break;
                }
            }

            links.forEach((link, idx) => {
                const parent = link.parentElement;
                if (parent) {
                    if (idx === activeIndex) {
                        parent.classList.add("active");
                        link.setAttribute("aria-current", "true");
                    } else {
                        parent.classList.remove("active");
                        link.removeAttribute("aria-current");
                    }
                }
            });

            const activeLink = links[activeIndex];
            const activeLi = activeLink ? activeLink.parentElement : null;
            if (activeLi) {
                const tocRect = tocList.getBoundingClientRect();
                const liRect = activeLi.getBoundingClientRect();
                let progress = liRect.top - tocRect.top + liRect.height / 2;
                const containerHeight = tocRect.height;
                progress = Math.max(0, Math.min(containerHeight, progress));
                tocList.style.setProperty("--toc-progress", progress + "px");
            }
        };

        if (window.lenis && typeof window.lenis.on === "function") {
            window.lenis.on("scroll", updateActive);
        } else {
            window.addEventListener("scroll", updateActive, { passive: true });
        }

        const handleResize = () => updateActive();
        window.addEventListener("resize", handleResize);
        updateActive();

        return () => {
            tocList.removeEventListener("click", handleTocClick);
            if (window.lenis && typeof window.lenis.off === "function") {
                window.lenis.off("scroll", updateActive);
            } else {
                window.removeEventListener("scroll", updateActive);
            }
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <>
            <section className="pt-14 md:pt-20 lg:pt-24 xl:pt-25">
                <div className="container">
                    <div className="flex flex-col lg:flex-row sm:justify-center  gap-6 relative">
                        <div
                            className="lg:max-w-80 xl:max-w-95 w-full mx-auto flex flex-col gap-6"
                            data-sticky data-sticky-start="top top+=80" data-sticky-min-width="1023" data-sticky-max-width="3200"
                        >
                            {/* <!-- items --> */}
                            <div className="bg-background p-6 xl:p-9 rounded-xl md:rounded-2xl lg:rounded-3xl border border-border">
                                <h3 className="font-bold text-lg">On this page</h3>
                                <div className="pt-6">
                                    <ul ref={tocListRef} className="toc-list"></ul>
                                </div>
                            </div>
                            {/* <!-- items --> */}
                            <div className="bg-background p-8 xl:p-9 rounded-xl md:rounded-2xl lg:rounded-3xl border border-border hidden lg:block">
                                <h3 className="font-bold text-lg">Share article</h3>
                                <div className="pt-6 flex gap-3">
                                    <div className="flex items-center gap-4.5">
                                        <Link to="https://mail.google.com" className="text-paragraph_black hover:text-secondary block" target="_blank">
                                            <svg className="w-8 h-8 fill-current">
                                                <use href="#emailIcon"></use>
                                            </svg>
                                        </Link>
                                        <button type="button" className="text-paragraph_black hover:text-secondary relative copy-link-btn block">
                                            <svg className="w-6 h-6 fill-current">
                                                <use href="#link"></use>
                                            </svg>
                                            <span className="copy-tooltip">Copied!</span>
                                        </button>
                                        <Link to="https://www.facebook.com" className="text-paragraph_black hover:text-secondary block">
                                            <svg className="w-6 h-6 fill-current">
                                                <use href="#facebook-share"></use>
                                            </svg>
                                        </Link>
                                        <Link to="https://twitter.com/" className="text-paragraph_black hover:text-secondary block" target="_blank">
                                            <svg className="w-6 h-6 fill-current">
                                                <use href="#twitter"></use>
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <!-- items --> */}
                        <div className="lg:max-w-[calc(100%-344px)] xl:max-w-[calc(100%-404px)] w-full flex flex-col gap-6">
                            <div ref={articleContentRef} className="article-content">
                                <p>
                                    This page demonstrates some basic elements and typography that you will use frequently within your blog. Explore the versatile and customizable elements available in our theme, designed to enhance your site's functionality and aesthetics. From buttons and icons to advanced layout options, each element is crafted to support and elevate your content.
                                </p>
                                <h1>Navigating Market Volatility with Confidence</h1>
                                <p>
                                    Discover the Power of Our Theme's Elements" "Unleash the full potential of your website with our versatile and customizable elements. Perfectly designed to enhance both functionality and aesthetics.
                                </p>
                                <h2>Understanding Risk in Modern Markets</h2>
                                <p>
                                    Discover the Power of Our Theme's Elements" "Unleash the full potential of your website with our versatile and customizable elements. Perfectly designed to enhance both functionality and aesthetics.
                                </p>
                                <h3>H3 Heading</h3>
                                <p>
                                    Discover the Power of Our Theme's Elements" "Unleash the full potential of your website with our versatile and customizable elements. Perfectly designed to enhance both functionality and aesthetics.
                                </p>
                                <h4>H4 Heading</h4>
                                <p>
                                    Donec tempor arcu quis ex gravida pellentesque. Quisque eros augue, placerat non tincidunt id, posuere et mauris. Mauris porta sollicitudin feugiat.
                                </p>
                                <h5>H5 Heading</h5>
                                <p>
                                    Discover the Power of Our Theme's Elements" "Unleash the full potential of your website with our versatile and customizable elements. Perfectly designed to enhance both functionality and aesthetics.
                                </p>
                                <h6>H6 Heading</h6>
                                <p>
                                    Discover the Power of Our Theme's Elements" "Unleash the full potential of your website with our versatile and customizable elements. Perfectly designed to enhance both functionality and aesthetics.
                                </p>
                                <h5>Image Example</h5>
                                <p>
                                    Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc lacinia dapibus dui, at iaculis metus condimentum ac. Mauris nibh eros, tincidunt eu semper in, accumsan scelerisque dolor. Phasellus molestie suscipit ornare. Nulla dapibus interdum lacus, in ornare ex efficitur vel.
                                </p>
                                <Link to={blogPost4} data-fslightbox="gallery">
                                    <img src={blogPost4} alt="blog-details" />
                                </Link>
                                <p>
                                    Integer sit amet justo tortor. Nullam eget metus in elit convallis mollis. Ut a arcu neque. Vestibulum consequat ut mi vel tincidunt. Donec tincidunt diam tellus, eget rutrum turpis accumsan a. In convallis eu tortor a euismod. Donec lobortis gravida viverra.
                                </p>
                                <p>
                                    Donec sed porta diam. Cras scelerisque, lorem consectetur consequat blandit, orci justo consectetur lacus, sed sodales nisi augue vel leo. Nullam non eleifend lacus, commodo pulvinar tortor. Vestibulum a sem et urna consectetur eleifend.
                                </p>
                                <h5>Unordered list</h5>
                                <p>
                                    Donec tincidunt faucibus enim, non malesuada enim blandit vel. Nunc eu metus consequat, tempor magna sit amet, porttitor arcu. Nulla auctor odio tincidunt, tincidunt ipsum vitae, accumsan lectus.
                                </p>
                                <ul>
                                    <li>Felis ut ultricies lacinia.</li>
                                    <li>Mauris nec eros at ex luctus.</li>
                                    <li>Suspendisse fringilla.</li>
                                    <li>Lacinia porta vel eget erat.</li>
                                </ul>
                                <h5>Ordered list</h5>
                                <p>
                                    Donec tincidunt faucibus enim, non malesuada enim blandit vel. Nunc eu metus consequat, tempor magna sit amet, porttitor arcu. Nulla auctor odio tincidunt, tincidunt ipsum vitae, accumsan lectus.
                                </p>

                                <ol>
                                    <li>Suspendisse fringilla. You can call
                                        <strong>John</strong>
                                        but not
                                        <strong>Jhon.</strong>
                                    </li>
                                    <li>Mauris nec eros at ex luctus. To import libraries in C, do this
                                        <code>#include $your-lib-name</code>
                                        <br />
                                        or call system libraries
                                        <code>#include $your-lib-nam</code>
                                    </li>
                                    <li>Felis ut ultricies lacinia.
                                        <Link to="https://shreethemes.in/" target="_blank">website</Link>
                                    </li>
                                    <li>Felis ut ultricies lacinia.</li>
                                </ol>
                                <h5>Blockquotes</h5>
                                <p>
                                    Vivamus vulputate sapien vitae nisl tempus laoreet. Fusce non eros risus. Sed tristique ex tellus, id tempus turpis ultricies ac. In porttitor, sem in scelerisque convallis, massa quam facilisis mauris, vitae faucibus est arcu eget magna.
                                </p>
                                <blockquote>
                                    Green building practices not only reduce environmental impact but also contribute to healthier living spaces. Green building practices not only reduce environmental impact but also contribute.
                                </blockquote>
                                <h5>Table</h5>
                                <p>
                                    Vivamus vulputate sapien vitae nisl tempus laoreet. Fusce non eros risus. Sed tristique ex tellus, id tempus turpis ultricies ac. In porttitor, sem in scelerisque convallis, massa quam facilisis mauris, vitae faucibus est arcu eget magna.
                                </p>
                                <div className="not-prose rounded-2xl mt-6">
                                    <div className="table-container">
                                        <table className="transaction-table">
                                            <thead className="table-header">
                                                <tr className="border-b border-paragraph_white">
                                                    <th className="column-id">Transaction ID</th>
                                                    <th className="column-date">Date</th>
                                                    <th className="column-description">Description</th>
                                                    <th className="column-amount">Amount</th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-gray-200 bg-white">
                                                <tr className="transaction-row">
                                                    <td className="id-value">#TRX-9902</td>
                                                    <td className="date-value">Jan 12, 2027</td>
                                                    <td className="desc-value">Apple Store - MacBook Air</td>
                                                    <td className="amount-value">-$1,299.00</td>
                                                </tr>

                                                <tr className="transaction-row-color">
                                                    <td className="id-value">#TRX-9841</td>
                                                    <td className="date-value">Jan 10, 2027</td>
                                                    <td className="desc-value">Global Corp - Monthly Salary</td>
                                                    <td className="amount-value">+$5,400.00</td>
                                                </tr>

                                                <tr className="transaction-row">
                                                    <td className="id-value">#TRX-9730</td>
                                                    <td className="date-value">Jan 09, 2027</td>
                                                    <td className="desc-value">Starbucks Coffee</td>
                                                    <td className="amount-value">-$6.50</td>
                                                </tr>

                                                <tr className="transaction-row-color">
                                                    <td className="id-value">#TRX-9615</td>
                                                    <td className="date-value">Jan 08, 2027</td>
                                                    <td className="desc-value">Internal Transfer to Savings</td>
                                                    <td className="amount-value">-$500.00</td>
                                                </tr>

                                                <tr className="transaction-row">
                                                    <td className="id-value">#TRX-9502</td>
                                                    <td className="date-value">Jan 05, 2027</td>
                                                    <td className="desc-value">Prime Membership</td>
                                                    <td className="amount-value">-$14.99</td>
                                                </tr>

                                                <tr className="transaction-row-color">
                                                    <td className="id-value">#TRX-9488</td>
                                                    <td className="date-value">Jan 04, 2027</td>
                                                    <td className="desc-value">Nike Online Store - Refund</td>
                                                    <td className="amount-value">+$120.00</td>
                                                </tr>

                                                <tr className="transaction-row">
                                                    <td className="id-value">#TRX-9321</td>
                                                    <td className="date-value">Jan 03, 2027</td>
                                                    <td className="desc-value">City Power Light Utility</td>
                                                    <td className="amount-value">-$84.20</td>
                                                </tr>

                                                <tr className="transaction-row-color">
                                                    <td className="id-value">#TRX-9210</td>
                                                    <td className="date-value">Jan 01, 2027</td>
                                                    <td className="desc-value">Airbnb - London Booking</td>
                                                    <td className="amount-value">-$450.00</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <h5>Video cards</h5>
                                <div className="relative">
                                    <img src={blogPost5} alt="blog-details" />
                                    <Link data-fslightbox="gallery" to={donate} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer">
                                        <svg width="61" height="65" viewBox="0 0 61 65" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_d_2323_4694)">
                                                <path d="M35.5 10.1611C49.56 18.2787 56.59 22.3374 56.59 28.3477C56.59 34.3579 49.56 38.4166 35.5 46.5342C21.44 54.6517 14.41 58.7105 9.205 55.7054C4 52.7003 4 44.5827 4 28.3477C4 12.1126 4 3.99502 9.205 0.989912C14.41 -2.0152 21.44 2.04358 35.5 10.1611Z" fill="white" />
                                            </g>
                                            <defs>
                                                <filter id="filter0_d_2323_4694" x="0" y="0" width="60.5898" height="64.6953" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                                    <feOffset dy="4" />
                                                    <feGaussianBlur stdDeviation="2" />
                                                    <feComposite in2="hardAlpha" operator="out" />
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2323_4694" />
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2323_4694" result="shape" />
                                                </filter>
                                            </defs>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                            {/* <!-- items --> */}
                            <div>
                                <div className="flex gap-6 flex-wrap sm:flex-nowrap">
                                    <div className="bg-background w-full p-4 sm:p-6 rounded-xl md:rounded-2xl lg:rounded-3xl border border-border">
                                        <h5 className="font-bold text-lg">Popular Tags</h5>
                                        <div>
                                            <ul className="flex gap-2 flex-wrap xl:flex-nowrap pt-6">
                                                <li>
                                                    <Link to="/blog-genre" className="bg-white inline-block hover:bg-secondary hover:text-white duration-400 text-paragraph_black px-3 py-2 rounded-2xl text-base text-center border border-border leading-none">Core Banking</Link>
                                                </li>
                                                <li>
                                                    <Link to="/blog-genre" className="bg-white inline-block hover:bg-secondary hover:text-white duration-400 text-paragraph_black px-3 py-2 rounded-2xl text-base text-center border border-border leading-none">Card</Link>
                                                </li>
                                                <li>
                                                    <Link to="/blog-genre" className="bg-white inline-block hover:bg-secondary hover:text-white duration-400 text-paragraph_black px-3 py-2 rounded-2xl text-base text-center border border-border leading-none">Fraud</Link>
                                                </li>
                                                <li>
                                                    <Link to="/blog-genre" className="bg-white inline-block hover:bg-secondary hover:text-white duration-400 text-paragraph_black px-3 py-2 rounded-2xl text-base text-center border border-border leading-none">Support</Link>
                                                </li>
                                                <li>
                                                    <Link to="/blog-genre" className="bg-white inline-block hover:bg-secondary hover:text-white duration-400 text-paragraph_black px-3 py-2 rounded-2xl text-base text-center border border-border leading-none">Services</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* <!-- items --> */}
                                    <div className="bg-background p-6 rounded-xl md:rounded-2xl lg:rounded-3xl border border-border w-full sm:w-auto">
                                        <h5 className="font-bold text-lg">Share article</h5>
                                        <div className="pt-6 flex gap-3 ">
                                            <div className="flex items-center gap-4.5">
                                                <Link to="https://mail.google.com" className="text-paragraph_black hover:text-secondary block" target="_blank">
                                                    <svg className="w-8 h-8 fill-current">
                                                        <use href="#emailIcon"></use>
                                                    </svg>
                                                </Link>
                                                <button type="button" className="text-paragraph_black hover:text-secondary relative copy-link-btn block">
                                                    <svg className="w-6 h-6 fill-current">
                                                        <use href="#link"></use>
                                                    </svg>
                                                    <span className="copy-tooltip">Copied!</span>
                                                </button>
                                                <Link to="https://www.facebook.com" className="text-paragraph_black hover:text-secondary block">
                                                    <svg className="w-6 h-6 fill-current">
                                                        <use href="#facebook-share"></use>
                                                    </svg>
                                                </Link>
                                                <Link to="https://twitter.com/" className="text-paragraph_black hover:text-secondary block" target="_blank">
                                                    <svg className="w-6 h-6 fill-current">
                                                        <use href="#twitter"></use>
                                                    </svg>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- items --> */}
                            <div>
                                <h5 className="font-semibold">3 Comments</h5>
                                <div>
                                    <div className="flex items-center gap-3 pt-6 ">
                                        <div className="w-9 h-9 rounded-full overflow-hidden">
                                            <img className="w-full h-full object-cover" src={blogPost10} alt="Coastal Resort" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="font-semibold text-title_black text-base md:text-lg">Coastal Resort</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="border-b border-title_black/10 pb-6">
                                            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
                                                <div className="px-3 pt-3">
                                                    <p className="text-base text-paragraph_black max-w-170.5">"Iâ€™ve been using this platform for six months now, and the interface is incredibly intuitive. Managing my savings goals has never been easier. The real-time transaction alerts give me great peace of mind!</p>
                                                </div>
                                                <div>
                                                    <Link to="#" className="text-title_black border border-title_black rounded-full py-2.5 px-3 sm:px-4 md:px-5.5">Replay</Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pt-6 pl-5 md:pl-8.5">
                                            <div className="border-l-[1.27px] border-dashed border-[#90949C4D] pl-4 md:pl-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-9 h-9 rounded-full overflow-hidden">
                                                        <img src={blogPost10} alt="Coastal Resort" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <span className="font-semibold text-title_black text-base md:text-lg">Coastal Resort</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex flex-col gap-3">
                                                        <div className="px-3 pt-3">
                                                            <p className="text-base text-paragraph_black max-w-170.5">"Iâ€™ve been using this platform for six months now, and the interface is incredibly intuitive. Managing my savings goals has never been easier. The real-time transaction alerts give me great peace of mind!</p>
                                                        </div>
                                                        <div>
                                                            <ul className="flex gap-8">
                                                                <li>
                                                                    <Link to="javascript:void(0)" className="text-[#0080FF]">Like</Link>
                                                                </li>
                                                                <li className="list-disc">
                                                                    <Link to="javascript:void(0)" className="text-[#0080FF]">Reply</Link>
                                                                </li>
                                                                <li className="list-disc">6h</li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 pt-6 ">
                                        <div className="w-9 h-9 rounded-full overflow-hidden">
                                            <img src={blogPost11} alt="Coastal Resort" className="w-full h-full rounded-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="font-semibold text-title_black text-base md:text-lg">Coastal Resort</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="border-b border-title_black/10 pb-6">
                                            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
                                                <div className="px-3 pt-3">
                                                    <p className="text-base text-paragraph_black max-w-170.5">The clean UI and fast load times are impressive. I love the dark mode option and the way the data visualization charts break down my monthly spending. Looking forward to seeing even more integration features in the future.</p>
                                                </div>
                                                <div>
                                                    <Link to="javascript:void(0)" className="text-title_black border border-title_black rounded-full py-2.5 px-3 sm:px-4 md:px-5.5">Replay</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 pt-6 ">
                                        <div className="w-9 h-9 rounded-full overflow-hidden">
                                            <img src={blogPost12} alt="Coastal Resort" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="font-semibold text-title_black text-base md:text-lg">Coastal Resort</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div>
                                            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4">
                                                <div className="px-3 pt-3">
                                                    <p className="text-base text-paragraph_black max-w-170.5">Security is my top priority when it comes to online banking, and this template handles multi-factor authentication seamlessly. It feels robust and professional. Highly recommend it for anyone looking for a reliable banking experience.</p>
                                                </div>
                                                <div>
                                                    <Link to="javascript:void(0)" className="text-title_black border border-title_black rounded-full py-2.5 px-3 sm:px-4 md:px-5.5">Replay</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <!-- items --> */}
                            <div className="bg-background border border-border p-6 rounded-2xl">
                                <form action="#">
                                    <div className="">
                                        <h5>Leave a Comment</h5>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                                        <div>
                                            <input type="text" placeholder="Enter your full name" className="w-full placeholder-paragraph_black text-title_black p-4 rounded-xl md:rounded-2xl border border-border bg-white outline-none" />
                                        </div>
                                        <div>
                                            <input type="email" placeholder="Enter your email" className="w-full placeholder-paragraph_black text-title_black p-4 rounded-xl md:rounded-2xl border border-border bg-white outline-none" />
                                        </div>
                                    </div>
                                    <div className="pt-5">
                                        <textarea rows="4" placeholder="Write your notes" className="w-full placeholder-paragraph_black text-title_black p-4 rounded-xl md:rounded-2xl border border-border bg-white outline-none resize-none"></textarea>
                                    </div>

                                    <button type="button" className="button-secondary mt-4">
                                        Confirm Appointment
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
