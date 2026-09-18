import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import lock from "../../../../assets/img/sign-in/lock.svg";

gsap.registerPlugin(ScrollTrigger);

export default function HeroResetPassword() {

    const cardsRef = useRef(null);

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ email: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

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

    // ----- Form handlers -----
    const handleChange = (e) => {
        setEmail(e.target.value);
        if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return 'This field is required.';
        if (!emailRegex.test(email)) return 'Please enter a valid email address.';
        return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailError = validateEmail(email);
        if (emailError) {
            setErrors({ email: emailError });
            setSubmitMessage('');
            return;
        }

        // Simulate sending the reset code
        setIsSubmitting(true);
        setSubmitMessage('');

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitMessage('✅ Reset code sent to your email!');
            // Reset form
            setEmail('');
            setErrors({});
            setTimeout(() => setSubmitMessage(''), 4000);
        }, 1500);
    };

    return (
        <>
            <div ref={cardsRef} className="min-h-[92vh] flex items-center justify-center" data-sttr-wrapper>
                <div className="container">
                    <div className="section-spacing-lg">
                        <div className="w-21.5 mx-auto text-center" data-sttr-card>
                            <img src={lock} alt="lock icon" />
                        </div>
                        <div className="mt-6 sm:mt-8 md:mt-10 text-center">
                            <h1 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold" data-sttr-card>Reset Your Password</h1>
                            <form className="mt-8 md:mt-10 max-w-137.5 mx-auto" onSubmit={handleSubmit} noValidate data-sttr-card>
                                <div className="flex items-start gap-4 flex-col sm:flex-row">
                                    <div className="flex-1 w-full">
                                        <div className="">
                                            <input 
                                                className={`h-11 w-full bg-background border border-border backdrop-blur-[34px] rounded-[100px] text-base text-title_black flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-secondary bg-white! placeholder:text-[#404040]! h-[48px]! ${errors.email ? 'border-red-500' : ''}`}
                                                type="email"
                                                id="reset-email"
                                                name="reset-email"
                                                placeholder="Enter your email address"
                                                autoComplete="off"
                                                required
                                                value={email}
                                                onChange={handleChange}
                                                aria-describedby="reset-email-error"
                                            />
                                            <p id="reset-email-error" className={`mt-1 text-sm text-red-400 transition-opacity duration-300 ${errors.email ? '' : 'hidden'}`}>
                                                {errors.email}
                                            </p>
                                        </div>
                                    </div>
                                    <button 
                                        disabled={isSubmitting} 
                                        type="submit" 
                                        className="h-12! w-full sm:w-auto button-secondary"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Code'}
                                    </button>
                                </div>
                                
                                {submitMessage && (
                                    <div id="formMessage" className="sm:col-span-2 mt-3 text-center text-sm text-green-400 transition-opacity duration-300">
                                        {submitMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
