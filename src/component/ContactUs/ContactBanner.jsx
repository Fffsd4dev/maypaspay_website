import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

import tmnlIcon02 from "../../assets/img/home-v1/tmnl-list-icon-02.svg";
import tmnlIcon03 from "../../assets/img/home-v1/tmnl-list-icon-03.svg";
import tmnlIcon04 from "../../assets/img/home-v1/tmnl-list-icon-04.svg";
import mail from "../../assets/img/contact/mail.svg";
import phone from "../../assets/img/contact/phone.svg";
import location from "../../assets/img/contact/location.svg";

gsap.registerPlugin(ScrollTrigger);

export default function ContactBanner() {

    const cardsRef = useRef(null);
    const formRef = useRef(null);
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        department: '1',
        note: '',
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

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        const keyMap = {
            'full-name': 'fullName',
            'contact-email': 'email',
            'contact-number': 'phone',
            'department': 'department',
        };
        const stateKey = keyMap[id] || id;
        setFormData(prev => ({ ...prev, [stateKey]: value }));
        if (errors[stateKey]) {
            setErrors(prev => ({ ...prev, [stateKey]: '' }));
        }
    };

    // Validate a single field
    const validateField = (key, value) => {
        if (key === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) return 'This field is required.';
            if (!emailRegex.test(value)) return 'Please enter a valid email address.';
            return '';
        }
        if (key === 'fullName' || key === 'phone') {
            if (!value) return 'This field is required.';
            return '';
        }
        return '';
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};
        let hasError = false;

        ['fullName', 'email', 'phone'].forEach((key) => {
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

        setIsSubmitting(true);
        setSubmitMessage('');

        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitMessage('✅ Message sent successfully!');

            setFormData({
                fullName: '',
                email: '',
                phone: '',
                department: '1',
                note: '',
            });
            setErrors({});

            setTimeout(() => {
                setSubmitMessage('');
            }, 4000);
        }, 1500);
    };

  return (
    <>
        <section className="section-spacing-lg">
            <div className="container">
                <div ref={cardsRef} className="flex items-center justify-between gap-10 flex-col md:flex-row" data-sttr-wrapper>
                    <div className="md:md:max-w-135 w-full">
                        <h2 className="font-bold leading-tight text-title_black mt-4" data-sttr-card>Speak with a wealth advisor</h2>
                        <p className="mt-4 text-base sm:text-lg text-paragraph_black" data-sttr-card>Whether you are looking to scale your business capital or secure your family's future, our expert advisors are ready to help you navigate your journey.</p>
                        <ul className="flex flex-col gap-4 mt-9" data-sttr-card>
                            <li className="text-base flex items-start gap-3">
                                <img className="w-5" src={tmnlIcon02} alt="testimonial icon 2" />
                                <span className="flex-1">Tailored Financial Advice: Get personalized strategies that align with your unique risk profile and long-term capital goals.</span>
                            </li>
                            <li className="text-base flex items-start gap-3">
                                <img className="w-5" src={tmnlIcon03} alt="testimonial icon 3" />
                                <span className="flex-1">Institutional Security: Experience the peace of mind that comes with industry-leading encryption and regulatory compliance.</span>
                            </li>
                            <li className="text-base flex items-start gap-3">
                                <img className="w-5" src={tmnlIcon04} alt="testimonial icon 4" />
                                <span className="flex-1">Seamless Global Access: Manage your international assets and transfers with a support team available across all time zones.</span>
                            </li>
                        </ul>
                        <div className="flex flex-col gap-3 md:gap-4 mt-6 md:mt-9" data-sttr-card>
                            <Link className="flex items-center gap-3 text-base sm:text-lg font-semibold text-title_black duration-300 hover:text-secondary" to="mailto:hello@securevest.com">
                                <div className="w-10.5 h-10.5 rounded-full bg-primary flex items-center justify-center">
                                    <img src={mail} alt="email" />
                                </div>
                                <span>hello@securevest.com</span>
                            </Link>
                            <Link className="flex items-center gap-3 text-base sm:text-lg font-semibold text-title_black duration-300 hover:text-secondary" to="tel:+0001234455">
                                <div className="w-10.5 h-10.5 rounded-full bg-primary flex items-center justify-center">
                                    <img src={phone} alt="phone" />
                                </div>
                                <span>+123-456-7890</span>
                            </Link>
                            <Link className="flex items-center gap-3 text-base sm:text-lg font-semibold text-title_black duration-300 hover:text-secondary" to="https://share.google/zwdok0vLof5BBMYcZ" target="_blank">
                                <div className="w-10.5 h-10.5 rounded-full bg-primary flex items-center justify-center">
                                    <img src={location} alt="location" />
                                </div>
                                <span>123 Fifth Ave, New York, NY 12004</span>
                            </Link>
                        </div>
                    </div>
                    <div className="md:max-w-165 w-full bg-background border border-border rounded-2xl md:rounded-3xl py-5 px-4 sm:p-6 md:p-8 lg:p-9" data-sttr-card>
                        <div className="mb-8 md:mb-10 lg:mb-12">
                            <h4 className="text-xl md:text-2xl text-title_black font-semibold leading-tight!">Book Your Consultation Slot</h4>
                            <p className="text-title_black mt-3 text-base md:text-lg">Fill out the form below to secure your preferred consultation time with a senior account manager.</p>
                        </div>
                        <form ref={formRef} onSubmit={handleSubmit} noValidate>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <div className="">
                                    <label htmlFor="full-name" className="font-medium text-title_black inline-block mb-2 md:mb-3">Full Name</label>
                                    <div className="">
                                        <input className={`h-11 w-full bg-background border border-border backdrop-blur-[34px] rounded-[100px] text-base text-title_black flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-secondary bg-white! placeholder:text-[#404040]! h-[46px]! ${
                                                errors.fullName ? 'border-red-500' : ''
                                            }`}
                                            type="text"
                                            name="full-name"
                                            placeholder="Enter your full name"
                                            id="full-name"
                                            autoComplete="off"
                                            required
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            aria-describedby="full-name-error"
                                        />
                                        <p id="full-name-error" className={`mt-1 text-sm text-red-400 transition-opacity duration-300 ${errors.fullName ? '' : 'hidden'}`}>
                                            {errors.fullName}
                                        </p>
                                    </div>						
                                </div>
                                <div className="">
                                    <label htmlFor="contact-email" className="font-medium text-title_black inline-block mb-2 md:mb-3">Email</label>
                                    <div className="">
                                        <input className={`h-11 w-full bg-background border border-border backdrop-blur-[34px] rounded-[100px] text-base text-title_black flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-secondary bg-white! placeholder:text-[#404040]! h-[46px]! ${
                                                errors.email ? 'border-red-500' : ''
                                            }`}
                                            type="email"
                                            name="contact-email"
                                            placeholder="Enter your email"
                                            id="contact-email"
                                            autoComplete="off"
                                            required
                                            value={formData.email}
                                            onChange={handleChange}
                                            aria-describedby="contact-email-error"
                                        />
                                        <p id="contact-email-error" className={`mt-1 text-sm text-red-400 transition-opacity duration-300 ${errors.email ? '' : 'hidden'}`}>
                                            {errors.email}
                                        </p>
                                    </div>						
                                </div>
                                <div className="">
                                    <label htmlFor="contact-number" className="font-medium text-title_black inline-block mb-2 md:mb-3">Phone Number</label>
                                    <div className="">
                                        <input className={`h-11 w-full bg-background border border-border backdrop-blur-[34px] rounded-[100px] text-base text-title_black flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-secondary bg-white! placeholder:text-[#404040]! h-[46px]! ${
                                                errors.phone ? 'border-red-500' : ''
                                            }`}
                                            type="number"
                                            name="contact-number"
                                            placeholder="Enter your number"
                                            id="contact-number"
                                            autoComplete="off"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            aria-describedby="contact-number-error"
                                        />
                                        <p id="contact-number-error" className={`mt-1 text-sm text-red-400 transition-opacity duration-300 ${errors.phone ? '' : 'hidden'}`}>
                                            {errors.phone}
                                        </p>
                                    </div>						
                                </div>
                                <div className="">
                                    <div className="select-box-light">
                                        <label className="font-medium text-title_black inline-block mb-2 md:mb-3">Select Department</label>
                                        <select 
                                            className="select-active bg-white!"
                                            id="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                        >
                                            <option value="1">Wealth Management</option>
                                            <option value="2">Health Management</option>
                                            <option value="3">Wealth Management</option>
                                            <option value="4">Health Management</option>
                                            <option value="5">Wealth Management</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="lg:col-span-2">
                                    <label className="font-medium text-title_black inline-block mb-2 md:mb-3">Your Note</label>
                                    <textarea 
                                        rows="4" 
                                        placeholder="Write your primary financial goals or specific inquiries here..." 
                                        className="h-28 sm:h-37.5 w-full bg-white border border-border backdrop-blur-[34px] rounded-2xl text-base text-title_black flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-secondary p-4 placeholder:text-[#404040] resize-none" 
                                        id="note"
                                        value={formData.note}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>

                            <button type="submit" className="mt-6 md:mt-8 lg:mt-9 button-primary w-full!" disabled={isSubmitting}>
                                {isSubmitting ? 'Sending...' : 'Send message'}
                            </button>

                            {submitMessage && (
                                <div id="formMessage" className="sm:col-span-2 mt-3 text-center text-sm text-green-400 transition-opacity duration-300">
                                    {submitMessage}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}
