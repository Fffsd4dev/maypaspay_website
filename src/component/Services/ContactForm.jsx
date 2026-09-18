import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import contactForm1 from "../../assets/img/services/contact-form-1.webp";
import contactForm3 from "../../assets/img/services/contact-form-3.webp";
import contactForm4 from "../../assets/img/services/contact-form-4.webp";
import contactForm5 from "../../assets/img/services/contact-form-5.webp";

gsap.registerPlugin(ScrollTrigger);

export default function ContactForm() {

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
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-9" data-sttr-wrapper>
            <div className="" data-sttr-card>
                <h3 className="text-title_white leading-none">Contact our sales team</h3>
                <p className="text-lg font-normal leading-normal text-paragraph_white mt-4">We help individuals and businesses grow wealth, reduce risk, and achieve long-term success.</p>

                <ul className="flex flex-col gap-4 mt-9">
                    <li className="flex gap-3.25 items-start text-base font-normal leading-normal text-paragraph_white">
                        <svg className="mt-1 w-5 h-5 fill-current">
                            <use href="#contactIcon-01"></use>
                        </svg>
                        <span className="flex-1">Scale engineering instantly: Ona Agents handle tasks securely to completion, no hand-holding required.</span>
                    </li>
                    <li className="flex gap-3.25 items-start shrink-0 text-base font-normal leading-normal text-paragraph_white">
                        <svg className="mt-1 w-5 h-5 fill-current">
                            <use href="#contactIcon-02"></use>
                        </svg>
                        <span className="flex-1">One-click, always compliant environments: Ephemeral, policy enforced, and identical across every developer and Ona Agent.</span>
                    </li>
                    <li className="flex gap-3.25 items-start shrink-0 text-base font-normal leading-normal text-paragraph_white">
                        <svg className="mt-1 w-5 h-5 fill-current">
                            <use href="#contactIcon-03"></use>
                        </svg>
                        <span className="flex-1">Seamless integrations: Connect to your repos, tools, and enterprise stack in seconds.</span>
                    </li>
                    <li className="flex gap-3.25 items-start shrink-0 text-base font-normal leading-normal text-paragraph_white">
                        <svg className="mt-1 w-5 h-5 fill-current">
                            <use href="#contactIcon-04"></use>
                        </svg>
                        <span className="flex-1">Flexible deployment: Run Ona in our cloud or your VPC, whatever your compliance requires.</span>
                    </li>
                </ul>
                <div className="mt-9">
                    <div className="flex items-center">
                        <div className="border-[2.3px] border-primary rounded-full bg-primary w-12.5 h-12.50 overflow-hidden">
                            <img className="w-full h-full object-cover  aspect-50/50" src={contactForm1} alt="customer profile image 1" />
                        </div>
                        <div className="border-[2.3px] border-primary rounded-full bg-primary w-12.5 h-12.50 overflow-hidden -ml-4">
                            <img className="w-full h-full object-cover  aspect-50/50" src={contactForm3} alt="customer profile image 2" />
                        </div>
                        <div className="border-[2.3px] border-primary rounded-full bg-primary w-12.5 h-12.50 overflow-hidden -ml-4">
                            <img className="w-full h-full object-cover  aspect-50/50" src={contactForm4} alt="customer profile image 3" />
                        </div>
                        <div className="border-[2.3px] border-primary rounded-full bg-primary w-12.5 h-12.50 overflow-hidden -ml-4">
                            <img className="w-full h-full object-cover aspect-50/50" src={contactForm5} alt="customer profile image 4" />
                        </div>
                        <div className="-ml-4">
                            <p className="text-sm font-semibold leading-none text-title_black border-[2.3px] border-primary w-12.5 h-12.5 bg-primary rounded-full flex items-center justify-center">5K+</p>
                        </div>
                    </div>
                    <p className="text-sm font-normal leading-none text-paragraph_white mt-3">Over 5,000+ Reviews</p>
                </div>
            </div>

            <div className="bg-white/10 border border-white/10 rounded-2xl md:rounded-3xl py-5 px-4 sm:p-6 md:p-8 lg:p-9 backdrop-blur-xl" data-sttr-card>
                <div className="pb-9 md:pb-12">
                    <h4 className="text-xl md:text-2xl font-semibold text-white leading-none">Book Your Consultation Slot</h4>
                    <p className="text-white/80 leading-[1.3] pt-3 text-base md:text-lg">Fill out the form below to secure your preferred consultation time with a senior account manager.</p>
                </div>
                <form ref={formRef} onSubmit={handleSubmit} noValidate data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false">
                    <div className=" grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                        <div className="">
                            <label htmlFor="full-name" className="font-medium text-title_white inline-block mb-2 md:mb-3">Full Name</label>
                            <div className="">
                                <input className={`h-11 w-full bg-white/10 border border-white/10 backdrop-blur-[34px] rounded-[100px] text-base text-white flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-primary placeholder:text-[#CCCCCC] h-[46px]! ${
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
                            <label htmlFor="contact-email" className="font-medium text-title_white inline-block mb-2 md:mb-3">Email</label>
                            <div className="">
                                <input className={`h-11 w-full bg-white/10 border border-white/10 backdrop-blur-[34px] rounded-[100px] text-base text-white flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-primary placeholder:text-[#CCCCCC] h-[46px]! ${
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
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5 items-center">
                        <div className="">
                            <label htmlFor="contact-number" className="font-medium text-title_white inline-block mb-2 md:mb-3">Phone Number</label>
                            <div className="">
                                <input className={`h-11 w-full bg-white/10 border border-white/10 backdrop-blur-[34px] rounded-[100px] text-base text-white flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-primary placeholder:text-[#CCCCCC] h-[46px]! ${
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
                            <div className="select-box-dark">
                                <label className="text-base font-normal leading-normal text-white mb-2 block">Select Department</label>
                                <select 
                                    className="select-active"
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
                    </div>
                    <div>
                        <div className="flex flex-col gap-3">
                            <label className="text-base font-normal leading-normal text-white mb-2 block">Your Note</label>
                            <textarea 
                                rows="4" 
                                placeholder="Write your primary financial goals or specific inquiries here..."
                                className="bg-white/10 border border-white/10 rounded-2xl p-3.75 text-white placeholder:text-paragraph_white duration-300 focus:outline-none  focus:border-primary resize-none" 
                                id="note"
                                value={formData.note}
                                onChange={handleChange}
                                data-gramm="false" 
                                data-gramm_editor="false"
                            ></textarea>
                        </div>
                    </div>

                    <button type="submit" className="w-full mt-6 md:mt-8 lg:mt-9 button-primary" disabled={isSubmitting}>
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
    </>
  )
}
