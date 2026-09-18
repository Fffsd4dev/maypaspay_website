import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * MoneyCounterLoader
 * A flat-illustration guy + lady counting cash behind a counter, looping
 * indefinitely. Drop it into Preloader.jsx wherever the visual focal point
 * should be (e.g. above the progress bar, in place of / alongside the
 * "MAYPAS PAY" title).
 *
 * Palette (kept small and deliberate — money is the one bold accent):
 *   ink   #1C1C1C  — counter + outlines
 *   skin  #D9A066  — heads + hands
 *   navy  #2B3A55  — guy's shirt
 *   plum  #6B2E43  — lady's dress
 *   green #2F9E58  — cash
 *   gold  #E3B23C  — coins
 */
export default function MoneyCounterLoader({ className = '' }) {
    const guyHeadRef = useRef(null);
    const guyTorsoRef = useRef(null);
    const guyArmRef = useRef(null);

    const ladyHeadRef = useRef(null);
    const ladyTorsoRef = useRef(null);
    const ladyArmRef = useRef(null);

    const billRef = useRef(null);
    const coinRefs = useRef([]);

    useEffect(() => {
        const tweens = [];

        // Gentle idle bob on each character — heads + torsos move together,
        // slightly out of phase so they don't read as a single mirrored unit.
        tweens.push(
            gsap.to([guyHeadRef.current, guyTorsoRef.current], {
                y: -3,
                duration: 1.1,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            })
        );
        tweens.push(
            gsap.to([ladyHeadRef.current, ladyTorsoRef.current], {
                y: -3,
                duration: 1.1,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: 0.55,
            })
        );

        // Counting taps — each arm pivots at the shoulder, alternating so
        // it reads as "back and forth" between the two of them.
        tweens.push(
            gsap.to(guyArmRef.current, {
                rotation: 10,
                svgOrigin: '176 128',
                duration: 0.28,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
            })
        );
        tweens.push(
            gsap.to(ladyArmRef.current, {
                rotation: -10,
                svgOrigin: '304 128',
                duration: 0.28,
                repeat: -1,
                yoyo: true,
                ease: 'power1.inOut',
                delay: 0.14,
            })
        );

        // The top bill being riffled — a quick squash-and-flip on loop,
        // synced roughly to the tapping rhythm above.
        const billTl = gsap.timeline({ repeat: -1, delay: 0.1 });
        billTl
            .set(billRef.current, { scaleY: 1, y: 0, transformOrigin: '50% 100%' })
            .to(billRef.current, { y: -6, duration: 0.14, ease: 'power1.out' })
            .to(billRef.current, { scaleY: 0.15, duration: 0.08, ease: 'power1.in' })
            .to(billRef.current, { scaleY: 1, duration: 0.1, ease: 'back.out(2)' })
            .to(billRef.current, { y: 0, duration: 0.14, ease: 'power1.in' })
            .to({}, { duration: 0.26 }); // beat of rest before the next flip
        tweens.push(billTl);

        // Coins drifting up off the stack and fading out, staggered.
        coinRefs.current.forEach((coin, i) => {
            const coinTl = gsap.timeline({
                repeat: -1,
                delay: i * 0.5,
                repeatDelay: 0.9,
            });
            coinTl
                .fromTo(
                    coin,
                    { y: 0, opacity: 0 },
                    { y: -34, opacity: 1, duration: 0.7, ease: 'power1.out' }
                )
                .to(coin, { opacity: 0, duration: 0.5, ease: 'power1.in' }, '+=0.1');
            tweens.push(coinTl);
        });

        return () => tweens.forEach((t) => t.kill());
    }, []);

    return (
        <svg
            viewBox="0 0 480 260"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Counter */}
            <rect x="30" y="190" width="420" height="60" rx="10" fill="#1C1C1C" />
            <rect x="30" y="182" width="420" height="12" rx="6" fill="#1C1C1C" />

            {/* Guy */}
            <g ref={guyTorsoRef}>
                <path
                    d="M118 195 C118 145 128 108 150 108 C172 108 182 145 182 195 Z"
                    fill="#2B3A55"
                />
            </g>
            <circle ref={guyHeadRef} cx="150" cy="88" r="26" fill="#D9A066" />
            <g ref={guyArmRef}>
                <rect x="168" y="126" width="16" height="60" rx="8" fill="#2B3A55" />
                <circle cx="176" cy="184" r="10" fill="#D9A066" />
            </g>

            {/* Lady */}
            <g ref={ladyTorsoRef}>
                <path
                    d="M298 195 C298 140 308 106 330 106 C352 106 362 140 362 195 Z"
                    fill="#6B2E43"
                />
            </g>
            <circle cx="336" cy="70" r="8" fill="#6B2E43" /> {/* bun */}
            <circle ref={ladyHeadRef} cx="330" cy="86" r="25" fill="#D9A066" />
            <g ref={ladyArmRef}>
                <rect x="296" y="126" width="16" height="60" rx="8" fill="#6B2E43" />
                <circle cx="304" cy="184" r="10" fill="#D9A066" />
            </g>

            {/* Cash stack sitting on the counter between them */}
            <g>
                <rect x="208" y="174" width="64" height="10" rx="2" fill="#2F9E58" />
                <rect x="210" y="168" width="60" height="10" rx="2" fill="#2F9E58" />
                <rect x="208" y="162" width="64" height="10" rx="2" fill="#2F9E58" />
            </g>
            <rect
                ref={billRef}
                x="212"
                y="150"
                width="56"
                height="26"
                rx="2"
                fill="#2F9E58"
                stroke="#1C1C1C"
                strokeWidth="1.5"
            />

            {/* Coins */}
            {[0, 1, 2].map((i) => (
                <circle
                    key={i}
                    ref={(el) => (coinRefs.current[i] = el)}
                    cx={220 + i * 20}
                    cy={155}
                    r="5"
                    fill="#E3B23C"
                />
            ))}
        </svg>
    );
}