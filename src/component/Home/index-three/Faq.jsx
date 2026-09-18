import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Faq() {

    const cardsRef = useRef(null);

    const faqs = [
        {
            title : 'How is my money protected?', 
            desc : 'Your funds are held in ring-fenced accounts at Tier-1 partner banks. Additionally, we use 256-bit AES encryption and multi-factor authentication (MFA) to ensure your data and capital remain margin spread.',
        },
        {
            title : 'What are the hidden service fees?', 
            desc : 'We pride ourselves on zero hidden fees. There are no monthly maintenance charges for basic accounts. We use mid-market exchange rates for all currency conversions with a transparent, low-margin spread.',
        },
        {
            title : 'Are there limits on international transfers?', 
            desc : 'Standard accounts can transfer up to $50,000 monthly. Premium and Enterprise users enjoy unlimited cross-border transfers with real-time tracking via SWIFT and SEPA networks.',
        },
        {
            title : 'How quickly can I freeze my card?', 
            desc : 'Instantly. Through the mobile app or web dashboard, you can toggle your virtual or physical cards to "Locked" status in real-time if you suspect any fraudulent activity or lose your card.',
        },
        {
            title : 'Can I hold crypto and fiat together?', 
            desc : 'Yes. Our unified vault allows you to manage traditional currencies alongside major digital assets like BTC and ETH, providing a seamless bridge between traditional banking and the DeFi ecosystem.',
        },
        {
            title : 'Is the platform fully regulated?', 
            desc : 'Absolutely. We operate under strict licenses in every region we serve, maintaining full compliance with AML (Anti-Money Laundering) and KYC (Know Your Customer) global regulations.',
        }
    ];

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

  return (
    <>
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6" data-sttr-wrapper>
                    
            {faqs.map((item, index)=>(
                <div className=" flex gap-4 lg:gap-6 p-4 lg:p-6 bg-background rounded-2xl border border-border" data-sttr-card key={index}>
                    <div className="w-8 sm:w-10 h-8 sm:h-10 flex items-center justify-center rounded-full bg-secondary shrink-0 text-white">
                        <svg className="w-3 sm:w-3.25 h-4 sm:h-4.5 fill-current">
                            <use href="#questionMark"></use>
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-title_black leading-snug text-xl font-semibold">{item.title}</h3>
                        <p className="text-base font-normal leading-normal text-paragraph_black mt-3">
                            {item.desc}
                        </p>
                    </div>
                </div>
            ))}

        </div>
    </>
  )
}
