import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import signIn from "../../../../assets/img/sign-in/sign-in.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSignIn() {

    const cardsRef = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });
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
        const { id, value } = e.target;
        if (id === 'contact-email') {
            setEmail(value);
            // Clear email error if any
            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
        } else if (id === 'sign-in-password') {
            setPassword(value);
            if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
        }
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
        const passwordError = password.trim() ? '' : 'This field is required.';

        const newErrors = {};
        if (emailError) newErrors.email = emailError;
        if (passwordError) newErrors.password = passwordError;

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            setSubmitMessage('');
            return;
        }

        // Simulate submission
        setIsSubmitting(true);
        setSubmitMessage('');

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitMessage('✅ Signed in successfully!');
            // Reset form
            setEmail('');
            setPassword('');
            setErrors({});
            setTimeout(() => setSubmitMessage(''), 4000);
        }, 1500);
    };

    return (
        <>
            <div ref={cardsRef} className="section-spacing-lg" data-sttr-wrapper>
                <div className="container">
                    <div className="flex items-center justify-between gap-10">
                        <div className="max-w-135 w-full mx-auto md:mx-0" data-sttr-card>
                            <h1 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold" data-sttr-card>Welcome Back</h1>
                            <p className="mt-4 text-base sm:text-lg text-[#404040]" data-sttr-card>Whether you are looking to scale your business capital or secure your family's future, our expert advisors are ready to help you navigate your journey.</p>
                            <form className="mt-8 md:mt-10 lg:mt-20" onSubmit={handleSubmit} noValidate>
                                <div className="flex flex-col gap-4 md:gap-5">
                                    <div className="" data-sttr-card>
                                        <label className="font-medium text-title_black inline-block mb-2 md:mb-3" htmlFor="contact-email">Email Address</label>
                                        <div className="">
                                            <input 
                                                className={`h-11 w-full bg-background border border-border backdrop-blur-[34px] rounded-[100px] text-base text-title_black flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-secondary bg-white! placeholder:text-[#404040]! h-[46px]! ${errors.email ? 'border-red-500' : ''}`}
                                                type="email"
                                                id="contact-email"
                                                name="contact-email"
                                                placeholder="Enter your Email"
                                                autoComplete="off"
                                                required
                                                value={email}
                                                onChange={handleChange}
                                                aria-describedby="contact-email-error"
                                            />
                                            <p id="contact-email-error" className={`mt-1 text-sm text-red-400 transition-opacity duration-300 ${errors.email ? '' : 'hidden'}`}>
                                                {errors.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="" data-sttr-card>
                                        <label className="font-medium text-title_black inline-block mb-2 md:mb-3" htmlFor="sign-in-password">Password</label>
                                        <div className="">
                                            <input 
                                                className={`h-11 w-full bg-background border border-border backdrop-blur-[34px] rounded-[100px] text-base text-title_black flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-secondary bg-white! placeholder:text-[#404040]! h-[46px]! ${errors.password ? 'border-red-500' : ''}`}
                                                type="password"
                                                id="sign-in-password"
                                                name="sign-in-password"
                                                placeholder="Enter your Password"
                                                autoComplete="off"
                                                required
                                                value={password}
                                                onChange={handleChange}
                                                aria-describedby="sign-in-password-error"
                                            />
                                            <p id="sign-in-password-error" className={`mt-1 text-sm text-red-400 transition-opacity duration-300 ${errors.password ? '' : 'hidden'}`}>
                                                {errors.password}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    disabled={isSubmitting} 
                                    type="submit" 
                                    className="mt-6 md:mt-9 w-full button-primary"
                                >
                                    {isSubmitting ? 'Signing in...' : "Let's Sign In"}
                                </button>
                                {submitMessage && (
                                    <div id="formMessage" className="sm:col-span-2 mt-3 text-center text-sm text-green-400 transition-opacity duration-300">
                                        {submitMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                        <div className="max-w-165 w-full rounded-xl sm:rounded-r-2xl md:rounded-r-3xl overflow-hidden hidden md:block" data-sttr-card>
                            <img className="w-full h-full object-cover aspect-square" src={signIn} alt="Sign in image" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
