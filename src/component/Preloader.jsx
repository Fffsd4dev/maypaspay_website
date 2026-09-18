import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MIN_LOAD_TIME = 1400; // floor so the loader never feels like a flash
const SOFT_CAP = 90;        // never let the "fake" progress claim done before the window actually loads

// Drop this in /public/preloader/:
//   counting.mp4   – the clip, flat near-white bg — the bg is keyed out live in a <canvas>,
//                     so this single file is all that's needed across every browser now.
const CHARACTER_VIDEO_MP4 = '/preloader/counting.mp4';
const KEY_COLOR = [250, 250, 250]; // the video's near-white backdrop, sampled from the source
const KEY_INNER = 15;              // distance from KEY_COLOR below which a pixel is fully transparent
const KEY_OUTER = 45;              // distance above which a pixel is fully opaque (soft edge between the two)
const BRAND_COLOR = '#fe0002';
const BRAND_COLOR_LIGHT = '#ffe6e6'; // pale tint of BRAND_COLOR, used as the loader backdrop

export default function Preloader({ onComplete }) {
    const preloaderAreaRef = useRef(null);
    const progressPercentRef = useRef(null);
    const progressFillRef = useRef(null);
    const progressSheenRef = useRef(null);
    const characterRef = useRef(null); // the visible <canvas>
    const hiddenVideoRef = useRef(null); // the offscreen <video> feeding it frames
    const keyFrameRef = useRef(null);
    const loaderLogoRef = useRef(null);
    const loaderBlocksContainerRef = useRef(null);

    const isWindowLoadedRef = useRef(false);
    const progressTweenRef = useRef(null);
    const progressStateRef = useRef({ value: 0 });
    const finishedRef = useRef(false);

    const prefersReducedMotion = useCallback(
        () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        []
    );

    // Arrange blocks and tag each with a distance-from-center so the wipe can
    // reveal from the middle outward instead of a flat left-to-right sweep.
    const setupLoaderBlocks = useCallback(() => {
        const container = loaderBlocksContainerRef.current;
        if (!container) return [];
        const blocks = Array.from(container.querySelectorAll('.loader-block'));
        const total = blocks.length;
        if (total === 0) return [];
        const widthPercent = 100 / total;
        const extra = widthPercent + 1;
        const center = (total - 1) / 2;

        blocks.forEach((block, index) => {
            block.style.width = `${extra}%`;
            block.style.left = `${index * widthPercent}%`;
        });

        return blocks
            .map((block, index) => ({ block, distance: Math.abs(index - center) }))
            .sort((a, b) => a.distance - b.distance)
            .map((entry) => entry.block);
    }, []);

    const preventScroll = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const startLenis = useCallback(() => {
        if (typeof window !== 'undefined' && window.lenis?.start) {
            try {
                window.lenis.start();
            } catch (e) {
                console.warn('Lenis start error:', e);
            }
        }
    }, []);

    const finishLoader = useCallback((orderedBlocks) => {
        if (finishedRef.current) return;
        finishedRef.current = true;

        progressTweenRef.current?.kill();
        gsap.killTweensOf(characterRef.current);
        keyFrameRef.current?.();
        hiddenVideoRef.current?.pause();

        const reduced = prefersReducedMotion();
        const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } });

        window.scrollTo(0, 0);
        if (window.lenis?.scrollTo) {
            try {
                window.lenis.scrollTo(0, { immediate: true });
            } catch (e) {
                console.warn('Lenis scrollTo error:', e);
            }
        }

        if (reduced) {
            tl.set(preloaderAreaRef.current, { opacity: 0 });
        } else {
            // One clean exit beat: character + UI lift and fade together...
            tl.to(characterRef.current, {
                opacity: 0,
                y: -16,
                scale: 0.92,
                duration: 0.4,
                ease: 'power2.in',
            }).to(
                ['.loader-percent', '.loader-logo', '.loader-loading', '.progress-bar'],
                { opacity: 0, y: -12, duration: 0.4, stagger: 0.04 },
                '<'
            )
                // ...then the field wipes open from the center out, like a curtain.
                .to(
                    orderedBlocks,
                    {
                        width: '0%',
                        duration: 0.9,
                        ease: 'expo.inOut',
                        stagger: { each: 0.035, from: 'center' },
                    },
                    '-=0.1'
                )
                .to(preloaderAreaRef.current, { opacity: 0, duration: 0.3 }, '-=0.4');
        }

        tl.call(() => {
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            window.removeEventListener('scroll', preventScroll);
            document.body.classList.remove('overflow-hidden');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            if (preloaderAreaRef.current) preloaderAreaRef.current.style.display = 'none';

            setTimeout(startLenis, 200);
            window.initHeroAnimation?.();
            window.initAnimations?.();
            requestAnimationFrame(() => ScrollTrigger.refresh());

            onComplete?.();
        });
    }, [preventScroll, startLenis, onComplete, prefersReducedMotion]);

    // Drive the visible number/bar off a single GSAP-tweened value instead of
    // hand-rolled interval math — smoother curve, no drift, one source of truth.
    const startProgress = useCallback((orderedBlocks) => {
        const state = progressStateRef.current;
        const setDisplay = (value) => {
            const clamped = Math.min(Math.round(value), 100);
            if (progressFillRef.current) progressFillRef.current.style.width = `${value}%`;
            if (progressPercentRef.current) progressPercentRef.current.textContent = `${clamped}%`;
        };

        const climbToSoftCap = () => {
            progressTweenRef.current = gsap.to(state, {
                value: SOFT_CAP,
                duration: MIN_LOAD_TIME / 1000,
                ease: 'power2.out',
                onUpdate: () => setDisplay(state.value),
            });
        };

        const finish = () => {
            progressTweenRef.current?.kill();
            progressTweenRef.current = gsap.to(state, {
                value: 100,
                duration: 0.35,
                ease: 'power1.out',
                onUpdate: () => setDisplay(state.value),
                onComplete: () => finishLoader(orderedBlocks),
            });
        };

        climbToSoftCap();

        const startedAt = performance.now();
        const tryFinish = () => {
            if (!isWindowLoadedRef.current) return;
            const elapsed = performance.now() - startedAt;
            const remaining = Math.max(MIN_LOAD_TIME - elapsed, 0);
            gsap.delayedCall(remaining / 1000, finish);
        };

        return tryFinish;
    }, [finishLoader]);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const orderedBlocks = setupLoaderBlocks();

        document.body.classList.add('overflow-hidden');
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
        window.addEventListener('scroll', preventScroll, { passive: false });

        const tryFinish = startProgress(orderedBlocks);

        const onLoad = () => {
            isWindowLoadedRef.current = true;
            window.scrollTo(0, 0);
            tryFinish();
        };

        if (document.readyState === 'complete') {
            onLoad();
        } else {
            window.addEventListener('load', onLoad);
        }

        // Entrance for the visible canvas.
        if (characterRef.current) {
            gsap.set(characterRef.current, { y: 16, opacity: 0 });
            gsap.to(characterRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: 'power2.out',
            });
        }

        // Force autoplay reliably. React's `muted` JSX prop doesn't always sync
        // the live DOM property before the browser checks autoplay eligibility,
        // and Safari in particular can silently no-op a play() call made too
        // early (before it has metadata) without ever rejecting the promise —
        // so a single play() call on mount isn't trustworthy. Attempt it from
        // several angles and keep a cheap watchdog running just in case.
        const hiddenVideo = hiddenVideoRef.current;
        let watchdogId = null;
        let retryOnInteraction = null;
        let attemptPlay = null;

        if (hiddenVideo) {
            hiddenVideo.muted = true;
            hiddenVideo.defaultMuted = true;

            attemptPlay = () => {
                hiddenVideo.play().catch(() => {});
            };

            attemptPlay(); // right away
            hiddenVideo.addEventListener('loadedmetadata', attemptPlay);
            hiddenVideo.addEventListener('canplay', attemptPlay);
            hiddenVideo.load(); // forces a fresh load so the above events reliably fire

            // Belt-and-suspenders: if it's still paused shortly after, something
            // blocked it (e.g. a Safari "never autoplay" site setting) — the
            // next tap/click anywhere retries, since a preloader shouldn't
            // otherwise need a click to do anything.
            watchdogId = setTimeout(() => {
                if (hiddenVideo.paused) {
                    retryOnInteraction = () => attemptPlay();
                    window.addEventListener('pointerdown', retryOnInteraction, { once: true });
                }
            }, 400);
        }

        // Draw the hidden video into the visible canvas every frame, knocking
        // out its near-white background pixel-by-pixel. This sidesteps a real
        // WebKit bug where mix-blend-mode doesn't composite correctly on
        // <video> — canvas alpha compositing works the same in every browser,
        // so Safari, Chrome and Firefox all render identically from one mp4.
        const canvas = characterRef.current;
        const ctx = canvas?.getContext('2d', { willReadFrequently: true });
        let rafId = null;

        if (canvas && ctx && hiddenVideo) {
            const [kr, kg, kb] = KEY_COLOR;

            const drawFrame = () => {
                rafId = requestAnimationFrame(drawFrame);
                if (hiddenVideo.readyState < 2) return; // not enough data yet

                ctx.drawImage(hiddenVideo, 0, 0, canvas.width, canvas.height);
                const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = frame.data;

                for (let i = 0; i < data.length; i += 4) {
                    const dr = data[i] - kr;
                    const dg = data[i + 1] - kg;
                    const db = data[i + 2] - kb;
                    const dist = Math.sqrt(dr * dr + dg * dg + db * db);
                    if (dist <= KEY_INNER) {
                        data[i + 3] = 0;
                    } else if (dist < KEY_OUTER) {
                        data[i + 3] = Math.round(((dist - KEY_INNER) / (KEY_OUTER - KEY_INNER)) * 255);
                    }
                    // dist >= KEY_OUTER: leave alpha untouched (fully opaque)
                }

                ctx.putImageData(frame, 0, 0);
            };

            rafId = requestAnimationFrame(drawFrame);
        }
        keyFrameRef.current = () => {
            if (rafId) cancelAnimationFrame(rafId);
        };

        // Subtle sheen sweeping across the progress fill.
        let sheenTween = null;
        if (progressSheenRef.current && !prefersReducedMotion()) {
            sheenTween = gsap.fromTo(
                progressSheenRef.current,
                { xPercent: -150 },
                { xPercent: 150, duration: 1.2, repeat: -1, ease: 'power1.inOut' }
            );
        }

        if (loaderLogoRef.current && !prefersReducedMotion()) {
            gsap.from(loaderLogoRef.current, { opacity: 0, y: 10, duration: 0.6, delay: 0.2, ease: 'power2.out' });
        }

        window.hideSectionTitles?.();

        return () => {
            window.removeEventListener('load', onLoad);
            window.removeEventListener('wheel', preventScroll);
            window.removeEventListener('touchmove', preventScroll);
            window.removeEventListener('scroll', preventScroll);
            document.body.classList.remove('overflow-hidden');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';

            progressTweenRef.current?.kill();
            sheenTween?.kill();
            keyFrameRef.current?.();
            if (watchdogId) clearTimeout(watchdogId);
            if (retryOnInteraction) window.removeEventListener('pointerdown', retryOnInteraction);
            if (hiddenVideo && attemptPlay) {
                hiddenVideo.removeEventListener('loadedmetadata', attemptPlay);
                hiddenVideo.removeEventListener('canplay', attemptPlay);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setupLoaderBlocks, preventScroll, startProgress, prefersReducedMotion]);

    return (
        <div
            ref={preloaderAreaRef}
            className="preloader-area fixed top-0 left-0 w-full h-screen z-99999999 pointer-events-none"
            style={{ backgroundColor: BRAND_COLOR_LIGHT }}
        >
            <div className="fixed z-9999 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="relative" style={{ width: 146, height: 260 }}>
                    {/* Decodes the real clip; sits directly under the canvas, which
                        fully covers it — kept in-flow (not off-screen) since Safari
                        can throttle decoding of elements it considers off-viewport. */}
                    <video
                        ref={hiddenVideoRef}
                        src={CHARACTER_VIDEO_MP4}
                        autoPlay
                        muted
                        loop
                        playsInline
                        disablePictureInPicture
                        preload="auto"
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-contain"
                        style={{ opacity: 0, pointerEvents: 'none' }}
                    />
                    {/* What's actually visible — the same frames, background keyed out live. */}
                    <canvas
                        ref={characterRef}
                        width={293}
                        height={520}
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-contain select-none"
                    />
                </div>
                <div
                    className="progress-bar mt-3 w-[160px] sm:w-[200px] h-[3px] overflow-hidden rounded relative"
                    style={{ backgroundColor: `${BRAND_COLOR}26` }}
                >
                    <div
                        ref={progressFillRef}
                        className="progress-fill h-full w-[0%] relative overflow-hidden"
                        style={{ backgroundColor: BRAND_COLOR }}
                    >
                        <div
                            ref={progressSheenRef}
                            className="absolute inset-y-0 w-8 -skew-x-12 bg-white/40"
                        />
                    </div>
                </div>
            </div>
            <div className="loader-footer fixed bottom-6 z-99999 left-0 right-0 flex flex-wrap justify-between px-3 sm:px-5 md:px-8 lg:px-12 items-center text-black/80 text-sm font-light tracking-[3px] gap-5">
                <div ref={loaderLogoRef} className="loader-logo max-[370px]:hidden" style={{ color: BRAND_COLOR }}>
                    <svg className="fill-current max-w-[150px] sm:max-w-[200px] h-8">
                        <use href="#logo"></use>
                    </svg>
                </div>
                <div
                    ref={progressPercentRef}
                    className="loader-percent text-base font-semibold tabular-nums"
                    style={{ color: BRAND_COLOR }}
                >
                    0%
                </div>
                <div className="loader-loading text-base font-semibold text-title_black">Loading...</div>
            </div>
            <div ref={loaderBlocksContainerRef} className="loader-blocks-container w-full h-screen">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="loader-block absolute top-0 h-full"
                        style={{ backgroundColor: BRAND_COLOR_LIGHT }}
                    />
                ))}
            </div>
        </div>
    );
}