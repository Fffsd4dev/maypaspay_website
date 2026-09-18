import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from 'react-router-dom';

import IntegretionBg from "../../../assets/img/home-v1/Integretion-bg.webp";
import integrationBottomOverlay from "../../../assets/img/home-v1/integration-bottom-overlay.webp";

import icon01 from "../../../assets/img/home-v1/integrations/integration-icon-01.svg";
import icon02 from "../../../assets/img/home-v1/integrations/integration-icon-02.svg";
import icon03 from "../../../assets/img/home-v1/integrations/integration-icon-03.svg";
import icon04 from "../../../assets/img/home-v1/integrations/integration-icon-04.svg";
import icon05 from "../../../assets/img/home-v1/integrations/integration-icon-05.svg";
import icon06 from "../../../assets/img/home-v1/integrations/integration-icon-06.svg";
import icon07 from "../../../assets/img/home-v1/integrations/integration-icon-07.svg";
import icon08 from "../../../assets/img/home-v1/integrations/integration-icon-08.svg";
import icon09 from "../../../assets/img/home-v1/integrations/integration-icon-09.svg";
import icon10 from "../../../assets/img/home-v1/integrations/integration-icon-10.svg";
import icon11 from "../../../assets/img/home-v1/integrations/integration-icon-11.svg";
import icon12 from "../../../assets/img/home-v1/integrations/integration-icon-12.svg";
import icon13 from "../../../assets/img/home-v1/integrations/integration-icon-13.svg";
import icon14 from "../../../assets/img/home-v1/integrations/integration-icon-14.svg";
import icon15 from "../../../assets/img/home-v1/integrations/integration-icon-15.svg";
import icon16 from "../../../assets/img/home-v1/integrations/integration-icon-16.svg";

const allIcons = [icon01, icon02, icon03, icon04, icon05, icon06, icon07, icon08, icon09, icon10, icon11, icon12, icon13, icon14, icon15, icon16];

gsap.registerPlugin(ScrollTrigger);

export default function Integration() {

    const cardsRef = useRef(null);
    const sectionRef = useRef(null);
    const canvasRef = useRef(null);

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

    // Canvas Integration
    useEffect(() => {
        const canvas = canvasRef.current;
        const section = sectionRef.current;
        if (!canvas || !section) return;

        if (typeof window.Matter === 'undefined') {
            console.warn('Matter.js not loaded – retrying...');
            const retry = setTimeout(() => { }, 200);
            return () => clearTimeout(retry);
        }

        const { Engine, World, Bodies, Runner, Mouse, MouseConstraint, Events } = window.Matter;

        const getConfig = () => {
            const isMobile = window.innerWidth < 640;
            return {
                iconPaths: isMobile ? allIcons.slice(0, 14) : allIcons,
                iconSize: isMobile ? 60 : 80,
                spacing: isMobile ? 90 : 120,
            };
        };

        let config = getConfig();
        let { iconPaths, iconSize, spacing } = config;

        const loadedImages = [];
        const bodies = [];
        let walls = [];
        let loadedCount = 0;
        let animationFrameId = null;
        let engine = null;
        let runner = null;
        let mouseConstraint = null;
        let isRunning = false;
        let width = 0;
        let height = 0;
        let mouseInstance = null;
        let isDragging = false;

        const createBodies = () => {
            if (bodies.length > 0) {
                World.remove(engine.world, bodies);
                bodies.length = 0;
            }
            if (walls.length > 0) {
                World.remove(engine.world, walls);
                walls.length = 0;
            }

            const cols = Math.ceil(Math.sqrt(iconPaths.length));
            const startX = width / 2 - ((cols - 1) * spacing) / 2;

            iconPaths.forEach((imgSrc, idx) => {
                const col = idx % cols;
                const row = Math.floor(idx / cols);
                const x = startX + col * spacing + 50 * (Math.random() - 0.5);
                const y = -150 - 60 * row + 40 * (Math.random() - 0.5);

                const body = Bodies.circle(x, y, iconSize / 2, {
                    restitution: 0.4,
                    friction: 0.1,
                    frictionAir: 0.01,
                    density: 0.0008,
                    angle: 0.5 * (Math.random() - 0.5),
                });
                body.image = loadedImages[idx];
                bodies.push(body);
                World.add(engine.world, body);
            });

            const wallThickness = 100;
            walls = [
                Bodies.rectangle(width / 2, height + 50, width * 2, wallThickness, { isStatic: true, render: { visible: false } }),
                Bodies.rectangle(-50, height / 2, wallThickness, height * 3, { isStatic: true, render: { visible: false } }),
                Bodies.rectangle(width + 50, height / 2, wallThickness, height * 3, { isStatic: true, render: { visible: false } }),
            ];
            World.add(engine.world, walls);
        };

        const resize = () => {
            const rect = section.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = width;
            canvas.height = height;
            if (mouseInstance) {
                mouseInstance.pixelRatio = window.devicePixelRatio || 1;
            }

            const newConfig = getConfig();
            if (newConfig.iconPaths.length !== iconPaths.length || newConfig.iconSize !== iconSize || newConfig.spacing !== spacing) {
                config = newConfig;
                iconPaths = config.iconPaths;
                iconSize = config.iconSize;
                spacing = config.spacing;
                if (loadedCount > 0) {
                    loadedImages.length = 0;
                    loadedCount = 0;
                    loadIcons();
                }
            }
            if (loadedCount === iconPaths.length) {
                createBodies();
            }
        };

        const loadIcons = () => {
            iconPaths.forEach((src, idx) => {
                const img = new Image();
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === iconPaths.length) {
                        createBodies();
                        startAnimation();
                    }
                };
                img.onerror = () => {
                    loadedCount++;
                    if (loadedCount === iconPaths.length) {
                        createBodies();
                        startAnimation();
                    }
                };
                img.src = src;
                loadedImages[idx] = img;
            });
        };

        const startAnimation = () => {
            if (isRunning) return;
            if (!engine) return;
            if (!runner) {
                runner = Runner.create();
                Runner.run(runner, engine);
            }
            isRunning = true;
            const animate = () => {
                if (!isRunning) return;
                Engine.update(engine);
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, width, height);
                bodies.forEach(body => {
                    if (!body.image || !body.image.complete) return;
                    const pos = body.position;
                    const angle = body.angle;
                    ctx.save();
                    ctx.translate(pos.x, pos.y);
                    ctx.rotate(angle);
                    const size = iconSize;
                    ctx.drawImage(body.image, -size / 2, -size / 2, size, size);
                    ctx.restore();
                });
                animationFrameId = requestAnimationFrame(animate);
            };
            animate();
        };

        const stopAnimation = () => {
            isRunning = false;
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
            if (runner) {
                try {
                    Runner.stop(runner);
                } catch { /* ignore */ }
                runner = null;
            }
        };

        // Create engine
        engine = Engine.create();
        engine.world.gravity.y = 0;
        engine.world.gravity.scale = 0.001;

        // Setup mouse
        const setupMouse = () => {
            mouseInstance = Mouse.create(canvas);
            mouseInstance.pixelRatio = window.devicePixelRatio || 1;
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouseInstance,
                constraint: {
                    stiffness: 0.2,
                    render: { visible: false },
                },
            });
            World.add(engine.world, mouseConstraint);

            Events.on(mouseConstraint, 'startdrag', () => {
                isDragging = true;
                document.body.style.overflow = 'hidden';
            });
            Events.on(mouseConstraint, 'enddrag', () => {
                isDragging = false;
                document.body.style.overflow = '';
            });

            canvas.addEventListener('wheel', (e) => {
                if (isDragging) e.preventDefault();
            }, { passive: false });

            const updateMousePosition = (clientX, clientY) => {
                const rect = canvas.getBoundingClientRect();
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;
                mouseInstance.position.x = (clientX - rect.left) * scaleX;
                mouseInstance.position.y = (clientY - rect.top) * scaleY;
            };

            canvas.addEventListener('mousemove', (e) => updateMousePosition(e.clientX, e.clientY));
            canvas.addEventListener('mousedown', (e) => updateMousePosition(e.clientX, e.clientY));
            canvas.addEventListener('touchstart', (e) => {
                const touch = e.touches[0];
                if (touch) updateMousePosition(touch.clientX, touch.clientY);
            });
            canvas.addEventListener('touchmove', (e) => {
                if (isDragging) e.preventDefault();
                const touch = e.touches[0];
                if (touch) updateMousePosition(touch.clientX, touch.clientY);
            }, { passive: false });

            const stopDrag = () => {
                if (isDragging) {
                    isDragging = false;
                    document.body.style.overflow = '';
                }
            };
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
        };

        setupMouse();

        // Initial resize and load
        resize();
        loadIcons();

        // Intersection Observer
        let observer = null;
        let gravityEnabled = false;

        const setupObserver = () => {
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const ratio = entry.intersectionRatio;
                        if (ratio >= 0.7) {
                            if (!gravityEnabled) {
                                gravityEnabled = true;
                                engine.world.gravity.y = 0.8;
                            }
                            if (!isRunning && loadedCount === iconPaths.length) {
                                startAnimation();
                            }
                        } else if (entry.isIntersecting) {
                            if (!isRunning && loadedCount === iconPaths.length) {
                                startAnimation();
                            }
                        } else {
                            stopAnimation();
                        }
                    });
                },
                { threshold: [0, 0.7, 1] }
            );
            observer.observe(section);
        };
        setupObserver();

        // Resize listener
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(resize, 250);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            if (observer) {
                observer.disconnect();
                observer = null;
            }

            stopAnimation();

            if (mouseConstraint && engine && World) {
                try {
                    World.remove(engine.world, mouseConstraint);
                } catch { /* ignore */ }
                mouseConstraint = null;
            }

            // SAFELY clear mouse instance
            if (mouseInstance) {
                if (Mouse && typeof Mouse.clear === 'function') {
                    try {
                        Mouse.clear(mouseInstance);
                    } catch { /* ignore */ }
                }
                mouseInstance = null;
            }

            if (engine) {
                try {
                    World.clear(engine.world);
                    Engine.clear(engine);
                } catch { /* ignore */ }
                engine = null;
            }

            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimer);

            document.body.style.overflow = '';

            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };
    }, []);

    return (
        <>
            <section ref={sectionRef} className="pt-14 md:pt-20 lg:pt-24 xl:pt-25 pb-73 relative z-1 overflow-hidden">
                <img className="absolute top-0 left-0 w-full h-full object-cover -z-1" src={IntegretionBg} alt="Integration" />
                <img className="absolute bottom-0 left-0 w-full object-cover pointer-events-none" src={integrationBottomOverlay} alt="Integration" />
                <div className="container">
                    <div ref={cardsRef} className="sm:max-w-150 2xl:max-w-180 mx-auto text-center" data-sttr-wrapper>
                        <p className="text-base md:text-lg font-semibold leading-[1.1]! text-primary capitalize" data-sttr-card>200+ integrations to
                            scale faster</p>
                        <h2 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold leading-tight text-title_white mt-4" data-sttr-card>Seamlessly Sync with the Tools You Use Daily</h2>
                        <p className="mt-4 sm:mt-5 text-base sm:text-lg text-paragraph_white" data-sttr-card>Stop switching between tabs. Our open-API architecture allows you to connect your financial core with leading accounting, project management, and communication platforms for a unified workflow.</p>
                        <div className="flex justify-center mt-6 sm:mt-7 md:mt-9" data-sttr-card>
                            <Link className="button-primary" to="/partners">
                                Explore All Integrations
                                <svg className="w-2.75 h-2.75 fill-current">
                                    <use href="#buttonArrow"></use>
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 -z-1 w-full h-full flex justify-center">
                    <canvas ref={canvasRef} id="integration-canvas" className="w-full h-full!"></canvas>
                </div>
            </section>
        </>
    )
}
