import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import shape from "../../assets/img/contact/shape.webp";
import titlePrimary from "../../assets/img/title-icon-primary.svg";

gsap.registerPlugin(ScrollTrigger);

export default function ContactData() {

    const sectionRef = useRef(null);
    const locationsRef = useRef(null);
    const lineRef = useRef(null);
    const progressRef = useRef(null);
    const cardRefs = useRef([]);
    const mapRefs = useRef([]);

    const contacts = [
        {
            number : '0', 
            name : 'New York', 
            address : '1221 Avenue of the Americas', 
            location : 'Floor 42, New York, NY 10020', 
            phone : 'Phone: +39 348 2030', 
        },
        {
            number : '1', 
            name : 'Los Angeles', 
            address : '99 South Bedford Street', 
            location : 'Sute 240, Burington, MA 018304', 
            phone : 'Phone: +39 348 2030', 
        },
        {
            number : '2', 
            name : 'London', 
            address : '99 South Bedford Street', 
            location : 'Sute 240, Burington, MA 018304', 
            phone : 'Phone: +39 348 2030', 
        }
    ];

    // Title animation
    useEffect(() => {

        if (!sectionRef.current) return;

        const ctx = gsap.context(() => {

            const icon = sectionRef.current.querySelector(".rotate");
            const subtitle = sectionRef.current.querySelector("span");
            const heading = sectionRef.current.querySelector("h2");
            const paragraph = sectionRef.current.querySelector("p");

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    once: true,
                },
            });

            if (icon) {
                tl.from(icon, {
                    scale: 0,
                    opacity: 0,
                    rotation: -180,
                    duration: 0.8,
                    ease: "power3.out",
                });
            }

            if (subtitle) {
                tl.from(subtitle, {
                    y: 20,
                    opacity: 0,
                    duration: 0.5,
                }, "-=0.4");
            }

            if (heading) {
                tl.from(heading, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                }, "-=0.3");
            }

            if (paragraph) {
                tl.from(paragraph, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                }, "-=0.4");
            }

        }, sectionRef);

        return () => ctx.revert();

    }, []);

    // Location map interaction
    useEffect(() => {
        const container = locationsRef.current;
        if (!container) return;

        const ctx = gsap.context(() => {
            const line = lineRef.current;
            const progress = progressRef.current;
            const cards = cardRefs.current;
            const maps = mapRefs.current;

            if (!line || !progress || !cards.length || !maps.length) return;

            gsap.set(container, { y: 50, opacity: 0 });
            gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top 75%",
                    once: true,
                    invalidateOnRefresh: true,
                }
            }).to(container, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: typeof window.CustomEase !== "undefined" ? "osmo-ease" : "power3.out"
            });

            // Set initial clip‑paths for maps
            maps.forEach((map, idx) => {
                if (idx === 0) {
                    gsap.set(map, {
                        clipPath: "inset(0% 0% 0% 0%)",
                        zIndex: 1,
                        willChange: "clip-path",
                        force3D: true,
                    });
                } else {
                    gsap.set(map, {
                        clipPath: "inset(0% 0% 0% 100%)",
                        zIndex: idx + 1,
                        willChange: "clip-path",
                        force3D: true,
                    });
                }
            });

            // Set up the progress line
            gsap.set(line, { height: "100%" });
            const stepHeight = 100 / cards.length;
            gsap.set(progress, { height: `${stepHeight}%`, width: "100%", top: 0, left: 0 });

            // Helper to get the start offset
            const getStart = () => (window.innerWidth <= 640 ? "top 5%" : "top 20%");

            let activeIndex = 0;
            const updateProgress = (progressValue) => {
                const total = cards.length;
                const step = 100 / total;
                const height = step + progressValue * (100 - step);
                gsap.set(progress, { height: `${height}%` });

                const newIndex = Math.min(Math.floor(progressValue * total), total - 1);
                if (newIndex !== activeIndex) {
                    activeIndex = newIndex;
                    maps.forEach((map, idx) => {
                        if (idx === activeIndex) {
                            gsap.to(map, {
                                clipPath: "inset(0% 0% 0% 0%)",
                                duration: 0.6,
                                ease: "power2.inOut",
                                force3D: true,
                            });
                        } else if (idx < activeIndex) {
                            gsap.set(map, { clipPath: "inset(0% 0% 0% 0%)", force3D: true });
                        } else {
                            gsap.set(map, { clipPath: "inset(0% 0% 0% 100%)", force3D: true });
                        }
                    });
                }
            };

            let scrollTrigger = ScrollTrigger.create({
                trigger: container,
                start: getStart(),
                end: "+=300%",
                pin: true,
                pinSpacing: true,
                scrub: 1,
                anticipatePin: 1,
                onUpdate: (self) => {
                    updateProgress(self.progress);
                },
                invalidateOnRefresh: true,
            });

            // Handle resize – recreate the trigger with new start
            let resizeTimer;
            const handleResize = () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    if (scrollTrigger) {
                        scrollTrigger.kill();
                        scrollTrigger = ScrollTrigger.create({
                            trigger: container,
                            start: getStart(),
                            end: "+=300%",
                            pin: true,
                            pinSpacing: true,
                            scrub: 1,
                            anticipatePin: 1,
                            onUpdate: (self) => {
                                updateProgress(self.progress);
                            },
                            invalidateOnRefresh: true,
                        });
                    }
                }, 250);
            };
            window.addEventListener('resize', handleResize);

            // CSS
            if (!document.getElementById('contact-location-styles')) {
                const style = document.createElement('style');
                style.id = 'contact-location-styles';
                style.textContent = `
                    .contact-map-iframe {
                        transition: clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
                        will-change: clip-path;
                        transform: translateZ(0);
                    }
                    [data-sttr-line] {
                        height: 100% !important;
                    }
                    [data-sttr-line-progress] {
                        width: 100% !important;
                        position: absolute !important;
                        top: 0 !important;
                        left: 0 !important;
                    }
                `;
                document.head.appendChild(style);
            }

            ScrollTrigger.refresh();

            return () => {
                window.removeEventListener('resize', handleResize);
                clearTimeout(resizeTimer);
                if (scrollTrigger) {
                    scrollTrigger.kill();
                    scrollTrigger = null;
                }
            };
        }, locationsRef);

        return () => {
            ctx.revert();
            ScrollTrigger.getAll().forEach((st) => {
                if (st.vars.trigger === container) {
                    st.kill();
                }
            });
        };
    }, []);

  return (
    <>
        <section className="section-spacing-lg bg-secondary relative z-1">
            <img className="absolute top-0 left-0 -z-1 select-none" src={shape} alt="shape" data-section-title />
            <div className="container">
                <div ref={sectionRef} className="flex items-start justify-between gap-4 md:gap-10 mb-12 sm:mb-14 md:mb-16 lg:mb-20 flex-col md:flex-row max-w-125 md:max-w-full" data-section-title>
                    <div className="md:max-w-170 w-full">
                        <div className="flex items-center gap-2.5">
                            <img className="rotate" src={titlePrimary} alt="title-icon" />
                            <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">GLOBAL INFRASTRUCTURE</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4" data-content>Strategic Hubs Across Every Major Market</h2>
                    </div>
                    <p className="md:max-w-115 w-full text-base sm:text-lg text-paragraph_white" data-content>Banking is a global endeavor. To support our millions of users, we maintain strategic physical headquarters in the world's primary financial centers.</p>
                </div>

                <div ref={locationsRef} className="flex items-center justify-between gap-8 md:gap-10 flex-col-reverse sm:flex-row" data-contact-locations>
                    <div className="sm:max-w-180 w-full rounded-2xl md:rounded-3xl overflow-hidden relative">
                        <iframe 
                            ref={(el) => { if (el) mapRefs.current[0] = el; }}
                            id="contact-map-0" 
                            className="contact-map-iframe w-full h-100 sm:h-153 relative" 
                            title="SecureVest New York office map" 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3258.2965579562365!2d-73.99390398815656!3d40.75788717126739!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25853174d55e3%3A0x99ced942dc90b3ac!2sW%2042nd%20St%2C%20New%20York%2C%20NY%2010036%2C%20USA!5e1!3m2!1sen!2sbd!4v1771163554679!5m2!1sen!2sbd" 
                            allowFullScreen
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <iframe 
                            ref={(el) => { if (el) mapRefs.current[1] = el; }}
                            id="contact-map-1" 
                            className="contact-map-iframe w-full h-100 sm:h-153 absolute top-0 left-0" 
                            title="SecureVest Los Angeles office map" 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.1234567890!2d-118.243685!3d34.052234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c75ddc27da13%3A0xe22fdf6f254608f4!2sLos%20Angeles%2C%20CA%2C%20USA!5e1!3m2!1sen!2sbd!4v1771163554679!5m2!1sen!2sbd" 
                            allowFullScreen
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                        <iframe 
                            ref={(el) => { if (el) mapRefs.current[2] = el; }}
                            id="contact-map-2" 
                            className="contact-map-iframe w-full h-100 sm:h-153 absolute top-0 left-0" 
                            title="SecureVest London office map" 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.1234567890!2d-0.1276!3d51.5074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604ce3941eb1f%3A0x1a5342fdf089c694!2sLondon%2C%20UK!5e1!3m2!1sen!2sbd!4v1771163554679!5m2!1sen!2sbd" 
                            allowFullScreen
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                    <div className="sm:max-w-115 w-full flex pl-8 relative">
                        <div ref={lineRef} className="min-w-0.75 bg-white/30 overflow-hidden absolute top-0 left-0" data-sttr-line>
                            <div ref={progressRef} className="absolute top-0 left-0 w-full h-0 bg-primary" data-sttr-line-progress></div>
                        </div>
                        <div className="flex-1 flex flex-col gap-12">
                            
                            {contacts.map((item, index)=>(
                                <div 
                                    key={index}
                                    ref={(el) => { if (el) cardRefs.current[index] = el; }}
                                    className="relative" 
                                    data-location-card 
                                    data-location-index={item.number} 
                                >
                                    <h3 className="text-white font-semibold leading-none text-xl md:text-2xl">{item.name}</h3>
                                    <p className="mt-3 text-paragraph_white">
                                        {item.address}
                                        <br/>
                                        {item.location}
                                        <br/>
                                        {item.phone}
                                    </p>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
