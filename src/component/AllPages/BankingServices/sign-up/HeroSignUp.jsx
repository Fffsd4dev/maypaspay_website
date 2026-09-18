import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import signUp from "../../../../assets/img/sign-in/sign-up.jpg";

gsap.registerPlugin(ScrollTrigger);

export default function HeroSignUp() {

    const cardsRef = useRef(null);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        department: '1',
        country: '0',
        zipCode: '',
    });
    const [errors, setErrors] = useState({});
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

    // Initialize nice-select after component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            if (typeof window.$ !== 'undefined' && window.$.fn && typeof window.$.fn.niceSelect === 'function') {
                window.$('select').niceSelect();
            } else {
                setTimeout(() => {
                    if (typeof window.$ !== 'undefined' && window.$.fn && typeof window.$.fn.niceSelect === 'function') {
                        window.$('select').niceSelect();
                    }
                }, 200);
            }
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    // ----- Form handlers -----
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const handleSelectChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (errors[id]) {
            setErrors(prev => ({ ...prev, [id]: '' }));
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) return 'This field is required.';
        if (!emailRegex.test(email)) return 'Please enter a valid email address.';
        return '';
    };

    const validateField = (key, value) => {
        if (key === 'email') return validateEmail(value);
        if (key === 'department') return '';
        if (!value || !value.trim()) return 'This field is required.';
        return '';
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        let hasError = false;

        // Validate each field
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
                hasError = true;
            }
        });

        if (hasError) {
            setErrors(newErrors);
            setSubmitMessage('');
            return;
        }

        // Simulate submission
        setIsSubmitting(true);
        setSubmitMessage('');

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitMessage('✅ Account created successfully!');
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                department: '1',
                country: '0',
                zipCode: '',
            });
            setErrors({});
            setTimeout(() => setSubmitMessage(''), 4000);
        }, 1500);
    };

    return (
        <>
            <div ref={cardsRef} className="section-spacing-lg" data-sttr-wrapper>
                <div className="container">
                    <div className="flex items-center justify-between gap-10">
                        <div className="max-w-135 w-full mx-auto" data-sttr-card>
                            <h1 className="text-3xl md:text-4xl lg:text-[40px] xl:text-5xl font-bold" data-sttr-card>Create Account</h1>
                            <p className="mt-4 text-base sm:text-lg text-[#404040]" data-sttr-card>Whether you are looking to scale your business capital or secure your family's future, our expert advisors are ready to help you navigate your journey.</p>
                            <form className="mt-8 md:mt-10 lg:mt-20" onSubmit={handleSubmit} noValidate data-sttr-card>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                    <div className="">
                                        <label className="font-medium text-title_black inline-block mb-2 md:mb-3" htmlFor="fullName">Full Name</label>
                                        <div className="">
                                            <input 
                                                className={`h-11 w-full bg-background border border-border backdrop-blur-[34px] rounded-[100px] text-base text-title_black flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-secondary bg-white! placeholder:text-[#404040]! h-[46px]! ${errors.fullName ? 'border-red-500' : ''}`}
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                                placeholder="Enter your full name"
                                                autoComplete="off"
                                                required
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                aria-describedby="full-name-error"
                                            />
                                            <p id="full-name-error" className={`mt-1 text-sm text-red-400 transition-opacity duration-300 ${errors.fullName ? '' : 'hidden'}`}>
                                                {errors.fullName}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <label className="font-medium text-title_black inline-block mb-2 md:mb-3" htmlFor="email">Email</label>
                                        <div className="">
                                            <input 
                                                className={`h-11 w-full bg-background border border-border backdrop-blur-[34px] rounded-[100px] text-base text-title_black flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-secondary bg-white! placeholder:text-[#404040]! h-[46px]! ${errors.email ? 'border-red-500' : ''}`}
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="Enter your Email"
                                                autoComplete="off"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                aria-describedby="contact-email-error"
                                            />
                                            <p id="contact-email-error" className={`mt-1 text-sm text-red-400 transition-opacity duration-300 ${errors.email ? '' : 'hidden'}`}>
                                                {errors.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <label className="font-medium text-title_black inline-block mb-2 md:mb-3" htmlFor="phone">Phone Number</label>
                                        <div className="">
                                            <input 
                                                className={`h-11 w-full bg-background border border-border backdrop-blur-[34px] rounded-[100px] text-base text-title_black flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-secondary bg-white! placeholder:text-[#404040]! h-[46px]! ${errors.phone ? 'border-red-500' : ''}`}
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                placeholder="Enter your Number"
                                                autoComplete="off"
                                                required
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                aria-describedby="phone-number-error"
                                            />
                                            <p id="phone-number-error" className={`mt-1 text-sm text-red-400 transition-opacity duration-300 ${errors.phone ? '' : 'hidden'}`}>
                                                {errors.phone}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="select-box-light">
                                            <label className="font-medium text-title_black inline-block mb-2 md:mb-3" htmlFor="department">Select Department</label>
                                            <select 
                                                id="department"
                                                className={`select-active bg-white! ${errors.department ? 'border-red-500' : ''}`}
                                                value={formData.department}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="1">Wealth Management</option>
                                                <option value="2">Health Management</option>
                                                <option value="3">Wealth Management</option>
                                                <option value="4">Health Management</option>
                                                <option value="5">Wealth Management</option>
                                            </select>
                                            {errors.department && <p className="mt-1 text-sm text-red-400">{errors.department}</p>}
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="select-box-light">
                                            <label className="font-medium text-title_black inline-block mb-2 md:mb-3" htmlFor="country">Country</label>
                                            <select 
                                                id="country"
                                                className={`select-active bg-white! ${errors.country ? 'border-red-500' : ''}`}
                                                value={formData.country}
                                                onChange={handleSelectChange}
                                            >
                                                <option value="0">Select your Country</option>
                                                <option value="1">United States</option>
                                                <option value="2">Canada</option>
                                                <option value="3">United Kingdom</option>
                                                <option value="4">Australia</option>
                                                <option value="5">Germany</option>
                                            </select>
                                            {errors.country && <p className="mt-1 text-sm text-red-400">{errors.country}</p>}
                                        </div>
                                    </div>
                                    <div className="">
                                        <label className="font-medium text-title_black inline-block mb-2 md:mb-3" htmlFor="zipCode">Zip Code</label>
                                        <div className="">
                                            <input 
                                                className={`h-11 w-full bg-background border border-border backdrop-blur-[34px] rounded-[100px] text-base text-title_black flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-secondary bg-white! placeholder:text-[#404040]! h-[46px]! ${errors.zipCode ? 'border-red-500' : ''}`}
                                                type="text"
                                                id="zipCode"
                                                name="zipCode"
                                                placeholder="Enter your Zip Code"
                                                autoComplete="off"
                                                required
                                                value={formData.zipCode}
                                                onChange={handleInputChange}
                                                aria-describedby="zip-code-error"
                                            />
                                            <p id="zip-code-error" className={`mt-1 text-sm text-red-400 transition-opacity duration-300 ${errors.zipCode ? '' : 'hidden'}`}>
                                                {errors.zipCode}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    id="formBtn" 
                                    type="submit" 
                                    className="mt-6 md:mt-9 w-full button-primary h-11.5!" 
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Creating account...' : "Let's Sign Up"}
                                </button>
                                
                                {submitMessage && (
                                    <div id="formMessage" className="sm:col-span-2 mt-3 text-center text-sm text-green-400 transition-opacity duration-300">
                                        {submitMessage}
                                    </div>
                                )}
                            </form>
                        </div>
                        <div className="max-w-165 w-full rounded-xl sm:rounded-r-2xl md:rounded-r-3xl overflow-hidden hidden lg:block" data-sttr-card>
                            <img className="w-full h-full object-cover aspect-square" src={signUp} alt="Sign up image" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
