import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import blogPost1 from "../../../../assets/img/blog-post/blog-3/blog-post-1.webp";
import blogPost2 from "../../../../assets/img/blog-post/blog-3/blog-post-2.webp";
import blogPost3 from "../../../../assets/img/blog-post/blog-3/blog-post-3.webp";
import blogPost4 from "../../../../assets/img/blog-post/blog-3/blog-post-4.webp";
import blogPost5 from "../../../../assets/img/blog-post/blog-3/blog-post-5.webp";
import donate from "../../../../assets/img/home-v1/about/donate.mp4";

gsap.registerPlugin(ScrollTrigger);

export default function BlogHeroThree() {

    const cardsRef = useRef(null);

    // Cards animation
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
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

        }, cardsRef);

        return () => ctx.revert();

    }, []);

    // For fslightbox
    useEffect(() => {
        if (typeof window.refreshFsLightbox === "function") {
            window.refreshFsLightbox();
        }
    }, []);

    // Sticky
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const triggers = [];

        const initSticky = () => {
            const stickyElements = document.querySelectorAll("[data-sticky]");
            if (!stickyElements.length) return;

            stickyElements.forEach((el) => {
                const section = el.closest("section");
                const parent = el.parentElement;
                if (!section || !parent) return;

                const start = el.dataset.stickyStart || "top top";
                const end = el.dataset.stickyEnd || "bottom bottom";
                const minWidth = parseInt(el.dataset.stickyMinWidth) || 0;
                const maxWidth = parseInt(el.dataset.stickyMaxWidth) || Infinity;

                let existingTrigger = triggers.find((t) => t.vars.pin === el);
                const winWidth = window.innerWidth;
                const shouldPin = winWidth >= minWidth && winWidth <= maxWidth;

                if (shouldPin && !existingTrigger) {
                    let endVal = end;
                    const siblings = Array.from(parent.children || []).filter(
                        (child) => child !== el
                    );
                    if (siblings.length) {
                        const sibling = siblings[0];
                        if (sibling) {
                            const diff = sibling.scrollHeight - el.scrollHeight;
                            if (diff > 0) {
                                endVal = `+=${diff}`;
                            } else {
                                endVal = "bottom bottom";
                            }
                        }
                    }

                    const trigger = ScrollTrigger.create({
                        trigger: parent,
                        start: start,
                        end: endVal,
                        pin: el,
                        pinSpacing: false,
                        invalidateOnRefresh: true,
                        anticipatePin: 1,
                    });
                    triggers.push(trigger);
                    ScrollTrigger.refresh();
                } else if (!shouldPin && existingTrigger) {
                    existingTrigger.kill();
                    const idx = triggers.indexOf(existingTrigger);
                    if (idx > -1) triggers.splice(idx, 1);
                    ScrollTrigger.refresh();
                }
            });
        };

        requestAnimationFrame(initSticky);

        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                initSticky();
            }, 150);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            triggers.forEach((t) => t.kill());
            window.removeEventListener("resize", handleResize);
            ScrollTrigger.refresh();
        };
    }, []);

  return (
    <>
        <div ref={cardsRef} data-sttr-wrapper>
            <section>
                <div className="section-spacing-lg bg-secondary relative z-1">
                    <img className="absolute w-full h-full top-0 left-0 -z-1 object-cover" src={blogPost3} alt="blog post hero banner" />
                    <div className="container">
                        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-5 md:gap-8 lg:gap-10 xl:gap-20">
                            <div className="lg:max-w-100 xl:max-w-125 flex flex-col justify-between gap-5">
                                <div>
                                    <span className="text-base md:text-lg leading-normal font-semibold text-primary block" data-sttr-card>Technology Implementation</span>
                                    <div className="pt-4">
                                        <h3 className="leading-[1.2] font-bold text-white" data-sttr-card>New Standard for Global Banking</h3>
                                        <p className="text-base pt-5 text-paragraph_white" data-sttr-card>Artificial Intelligence is no longer just a concept â€” it's a revolution changing how we work, create, and connect. From automation to decision-making, AI is shaping a smarter, faster, and more efficient.</p>
                                    </div>
                                </div>
                                <div data-sttr-card>
                                    <Link to="/blog-author">
                                        <div className="gap-4 items-center bg-white/12 p-2.5 inline-flex rounded-2xl border border-white/10">
                                            <div className="w-15.5 h-15.5">
                                                <img className="aspect-60/60 object-cover rounded-full w-full h-full" src={blogPost1} alt="Noah Reed" />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-white">Noah Reed</span>
                                                <p className="text-paragraph_white text-sm">Creative Director</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="w-full lg:max-w-175" data-sttr-card>
                                <img className="sm:aspect-700/400 w-full rounded-2xl md:rounded-3xl object-cover" src={blogPost2} alt="Blog Post Hero" />
                            </div>
                        </div>
                    </div>
                </div>	
            </section>

            <section className="pt-14 md:pt-20 lg:pt-24 xl:pt-25 overflow-hidden">
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between gap-10 max-w-257 mx-auto">
                        <div className="max-w-225 w-full">
                            <div className="article-content md:max-w-[calc(100%-88px)]!">
                                <p>
                                    This page demonstrates some basic elements and typography that you will use frequently within your blog. Explore the versatile and customizable elements available in our theme, designed to enhance your site's functionality and aesthetics. From buttons and icons to advanced layout options, each element is crafted to support and elevate your content.
                                </p>
                                <h1>Building a Diversified Portfolio</h1>
                                <p>
                                    Discover the Power of Our Theme's Elements" "Unleash the full potential of your website with our versatile and customizable elements. Perfectly designed to enhance both functionality and aesthetics.
                                </p>
                                <h2>Core Principles of Asset Allocation</h2>
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
                                                <path d="M35.5 10.1611C49.56 18.2787 56.59 22.3374 56.59 28.3477C56.59 34.3579 49.56 38.4166 35.5 46.5342C21.44 54.6517 14.41 58.7105 9.205 55.7054C4 52.7003 4 44.5827 4 28.3477C4 12.1126 4 3.99502 9.205 0.989912C14.41 -2.0152 21.44 2.04358 35.5 10.1611Z" fill="white"/>
                                            </g>
                                            <defs>
                                                <filter id="filter0_d_2323_4694" x="0" y="0" width="60.5898" height="64.6953" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                                                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                                                    <feOffset dy="4"/>
                                                    <feGaussianBlur stdDeviation="2"/>
                                                    <feComposite in2="hardAlpha" operator="out"/>
                                                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                                                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2323_4694"/>
                                                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2323_4694" result="shape"/>
                                                </filter>
                                            </defs>
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-12" data-sticky data-sticky-start="top top+=80" data-sticky-min-width="1023" data-sticky-max-width="3200">
                            <div className="flex flex-row md:flex-col gap-4">
                                <Link to="https://twitter.com" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:text-white duration-300 hover:bg-secondary text-title_black" target="_blank">
                                    <svg className="w-5 h-4.5 fill-current">
                                        <use href="#twitter"></use>
                                    </svg>
                                </Link>
                                <Link to="https://facebook.com" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:text-white duration-300 hover:bg-secondary text-title_black" target="_blank">
                                    <svg className="w-5 h-4.5 fill-current">
                                        <use href="#facebook"></use>
                                    </svg>
                                </Link>
                                <Link to="https://linkedin.com" className="w-12 h-12 bg-primary rounded-full flex items-center justify-center hover:text-white duration-300 hover:bg-secondary text-title_black" target="_blank">
                                    <svg className="w-5 h-4.5 fill-current">
                                        <use href="#linkedin"></use>
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <span className="hidden" data-section-title></span>
    </>
  )
}
