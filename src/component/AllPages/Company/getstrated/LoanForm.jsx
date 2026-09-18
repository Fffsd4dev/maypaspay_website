import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import roiCalculatorBg from "../../../../assets/img/home-v1/roi-calculator-bg-shape.webp";
import titlePrimary from "../../../../assets/img/title-icon-primary.svg";

gsap.registerPlugin(ScrollTrigger);

export default function LoanForm() {

  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  const [step, setStep] = useState(1);

  // Form data
  const [formData, setFormData] = useState({
    loanPurpose: 'Business Expansion',
    requestedAmount: '20,000',
    desiredTerm: '60',
    fullLegalName: '',
    dateOfBirth: '',
    grossAnnualIncome: '',
    employmentStatus: 'Business Owner',
    phoneNumber: '',
  });

  // Errors
  const [errors, setErrors] = useState({});

  // File uploads
  const [files, setFiles] = useState({
    idPassport: null,
    taxReturns: null,
    utilityBill: null,
    statements: null,
  });

  // Popup visibility
  const [showPopup, setShowPopup] = useState(false);

  // Review summary data
  const [reviewData, setReviewData] = useState('');

  const formRef = useRef(null);

  // Mapping from DOM id to state key
  const idToStateKey = {
    'loanPurpose': 'loanPurpose',
    'requested-amount': 'requestedAmount',
    'desiredTerm': 'desiredTerm',
    'fullLegalName': 'fullLegalName',
    'loan-dob': 'dateOfBirth',
    'gross-annual-income': 'grossAnnualIncome',
    'employment-status': 'employmentStatus',
    'loan-phone': 'phoneNumber',
  };

  // Title animation
  useEffect(() => {

    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {

      const icon = sectionRef.current.querySelector(".rotate");
      const subtitle = sectionRef.current.querySelector("span");
      const heading = sectionRef.current.querySelector("h3");
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

  // Format amount input with commas
  const formatAmount = (value) => {
    const clean = value.replace(/[^0-9]/g, '');
    if (!clean) return '';
    const num = parseInt(clean, 10);
    return num.toLocaleString();
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const stateKey = idToStateKey[id] || id;
    let val = value;

    if (id === 'requested-amount') {
      val = formatAmount(value);
    }

    setFormData(prev => ({
      ...prev,
      [stateKey]: val,
    }));

    // Clear error for this field
    if (errors[stateKey]) {
      setErrors(prev => ({ ...prev, [stateKey]: '' }));
    }
  };

  // Handle select changes
  const handleSelectChange = (e) => {
    const { id, value } = e.target;
    const stateKey = idToStateKey[id] || id;
    setFormData(prev => ({ ...prev, [stateKey]: value }));
    if (errors[stateKey]) {
      setErrors(prev => ({ ...prev, [stateKey]: '' }));
    }
  };

  // Date picker trigger
  const handleDateTrigger = (e) => {
    e.preventDefault();
    const input = document.getElementById('loan-dob');
    if (input) {
      if (typeof input.showPicker === 'function') {
        try {
          input.showPicker();
        } catch { /* ignore */ }
      } else {
        input.focus();
      }
    }
  };

  // Validate step 1 fields
 const validateStep1 = () => {
    const requiredFields = [
      'loanPurpose', 'requestedAmount', 'desiredTerm', 'fullLegalName',
      'dateOfBirth', 'grossAnnualIncome', 'employmentStatus', 'phoneNumber'
    ];
    const newErrors = {};
    let hasError = false;

    requiredFields.forEach(field => {
      const value = formData[field]?.trim() || '';
      if (!value) {
        newErrors[field] = 'This field is required.';
        hasError = true;
      }
    });

    // Check requested amount > 0
    const amountNum = parseInt(formData.requestedAmount.replace(/,/g, ''), 10);
    if (!amountNum || amountNum <= 0) {
      newErrors['requestedAmount'] = 'Please enter a valid amount.';
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  // Go to next step
  const goToStep = (targetStep) => {
    if (targetStep === 1) {
      setErrors({});
    }

    if (targetStep === 2 && step === 1) {
      if (validateStep1()) {
        generateReview();
        setStep(2);
      }
    } else if (targetStep === 3 && step === 2) {
      const allUploaded = Object.values(files).every(f => f !== null);
      if (allUploaded) {
        setStep(3);
      } else {
        alert('Please upload all required documents before proceeding.');
      }
    } else {
      setStep(targetStep);
    }
  };

  // Generate review summary
  const generateReview = () => {
    const fields = [
      { key: 'Loan Purpose', getVal: () => document.getElementById('loanPurpose')?.value || '' },
      { key: 'Desired Term (Month)', getVal: () => document.getElementById('desiredTerm')?.value || '' },
      { key: 'Date of Birth', getVal: () => document.getElementById('loan-dob')?.value || '' },
      { key: 'Employment Status', getVal: () => document.getElementById('employment-status')?.value || '' },
      { key: 'Requested Amount', getVal: () => formData.requestedAmount || '0' },
      { key: 'Full Legal Name', getVal: () => formData.fullLegalName || '' },
      { key: 'Gross Annual Income', getVal: () => formData.grossAnnualIncome || '' },
      { key: 'Phone Number', getVal: () => formData.phoneNumber || '' },
    ];
    let html = '';
    fields.forEach(field => {
      const val = field.getVal();
      html += `<p><strong class="text-title_white">${field.key}:</strong> <span class="text-paragraph_white">${val || '—'}</span></p>`;
    });
    setReviewData(html || '<p class="text-paragraph_white">No data to review.</p>');
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      generateReview();
      setStep(2);
    }
  };

  // File upload handlers
  const handleFileChange = (e, fileKey) => {
    const file = e.target.files[0] || null;
    setFiles(prev => ({ ...prev, [fileKey]: file }));
  };

  const removeFile = (fileKey) => {
    setFiles(prev => ({ ...prev, [fileKey]: null }));
    const input = document.querySelector(`input[data-file-key="${fileKey}"]`);
    if (input) input.value = '';
  };

  // Trigger file input when clicking the upload card
  const handleCardClick = (fileKey) => {
    const input = document.querySelector(`input[data-file-key="${fileKey}"]`);
    if (input) input.click();
  };

  // Check if all 4 files are uploaded
  const allFilesUploaded = useCallback(() => {
    return Object.values(files).every(f => f !== null);
  }, [files]);

  // Popup controls
   const openPopup = () => {
    setShowPopup(true);
    document.body.style.overflow = 'hidden';
    if (window.lenis) {
      try { window.lenis.stop(); } catch { /* ignore */ }
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    document.body.style.overflow = '';
    if (window.lenis) {
      try { window.lenis.start(); } catch { /* ignore */ }
    }
  };

  // Reset the entire form
  const resetForm = () => {
    setFormData({
      loanPurpose: 'Business Expansion',
      requestedAmount: '20,000',
      desiredTerm: '60',
      fullLegalName: '',
      dateOfBirth: '',
      grossAnnualIncome: '',
      employmentStatus: 'Business Owner',
      phoneNumber: '',
    });
    setErrors({});
    setFiles({
      idPassport: null,
      taxReturns: null,
      utilityBill: null,
      statements: null,
    });
    document.querySelectorAll('.loan-verify-file-input').forEach(input => input.value = '');
    if (window.$ && window.$.fn && typeof window.$.fn.niceSelect === 'function') {
      window.$('.loan-apply-select').each(function () {
        const $el = window.$(this);
        if ($el.next('.nice-select').length) {
          $el.niceSelect('destroy');
        }
        $el.niceSelect();
      });
    }
    setStep(1);
  };

  useEffect(() => {
    const steps = document.querySelectorAll('.loan-apply-step');
    steps.forEach(el => {
      const stepNum = parseInt(el.dataset.step, 10);
      el.classList.toggle('active', stepNum === step);
    });
    const panes = document.querySelectorAll('.loan-apply-step-pane');
    panes.forEach(el => {
      const paneNum = parseInt(el.dataset.pane, 10);
      el.classList.toggle('active', paneNum === step);
    });
  }, [step]);

  return (
    <>
      <section className="section-spacing-md" data-loan-apply-section>
        <div className="container-lg">
          <div className="pt-10 pb-4 px-4 sm:p-10 xl:p-18 2xl:p-25 bg-secondary rounded-2xl md:rounded-3xl relative z-1 overflow-hidden">
            <img className="w-full absolute bottom-0 right-0 -z-1 opacity-60" src={roiCalculatorBg} alt="" />
            <div ref={sectionRef} className="md:max-w-150 mx-auto w-full text-center mb-10 sm:mb-12 md:mb-14" data-section-title>
              <div className="flex items-center justify-center gap-2.5">
                <img className="rotate" src={titlePrimary} alt="title-icon" />
                <span className="text-base lg:text-lg font-semibold leading-[1.1]! text-primary uppercase">LOAN FORM</span>
              </div>
              <h3 className="font-bold leading-tight text-title_white mt-4" data-content>Apply and Get Loan!</h3>
              <p className="mt-4 text-base sm:text-lg text-paragraph_white" data-content>At SecureVest, we empower the entrepreneurs of tomorrow with the capital, security, and strategic guidance they need to scale globally.</p>
            </div>

            <div ref={cardsRef} className="" data-sttr-wrapper>

              <div className="loan-apply-steps flex items-start justify-between gap-2 max-w-137.5 mx-auto relative before:absolute before:w-[70%] sm:before:w-[80%] before:h-0.75 before:bg-[#CCCCCC] before:left-1/2 before:transform before:-translate-x-1/2 before:top-5 sm:before:top-6 before:-z-1 mb-10">
                <div className={`loan-apply-step flex flex-col items-center gap-2 sm:gap-3 text-center ${step === 1 ? 'active' : ''}`} data-step="1">
                  <span className="loan-apply-step-num flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/10 bg-white/10 text-paragraph_white backdrop-blur-2xl font-bold text-sm sm:text-base text-center">1</span>
                  <span className="loan-apply-step-label text-white/70 font-semibold text-sm sm:text-base text-center">Eligibility Intent</span>
                </div>
                <div className={`loan-apply-step flex flex-col items-center gap-2 sm:gap-3 text-center ${step === 2 ? 'active' : ''}`} data-step="2">
                  <span className="loan-apply-step-num flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/10 bg-white/10 text-paragraph_white backdrop-blur-2xl font-bold text-sm sm:text-base text-center">2</span>
                  <span className="loan-apply-step-label text-white/70 font-semibold text-sm sm:text-base text-center">Verification Phase</span>
                </div>
                <div className={`loan-apply-step flex flex-col items-center gap-2 sm:gap-3 text-center ${step === 3 ? 'active' : ''}`} data-step="3">
                  <span className="loan-apply-step-num flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white/10 bg-white/10 text-paragraph_white backdrop-blur-2xl font-bold text-sm sm:text-base text-center">3</span>
                  <span className="loan-apply-step-label text-white/70 font-semibold text-sm sm:text-base text-center">Funding</span>
                </div>
              </div>

              {/* <!-- Step 1: Eligibility Intent form --> */}
              <div className={`loan-apply-step-pane ${step === 1 ? 'active' : ''} max-w-175 mx-auto p-5 sm:p-6 md:p-9 bg-white/10 border border-white/10 backdrop-blur-2xl rounded-2xl md:rounded-3xl`} data-pane="1" data-sttr-card>
                <form ref={formRef} id="loanApplyForm" className="loan-apply-form" onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-x-5 lg:gap-y-7">
                    <div>
                      <label className="font-medium text-title_white inline-block mb-2 md:mb-3" htmlFor="loanPurpose">Loan Purpose</label>
                      <div className="select-box-dark backdrop-blur-none">
                        <select id="loanPurpose" name="loan_purpose" className="select-active loan-apply-select w-full" required value={formData.loanPurpose} onChange={handleSelectChange}>
                          <option value="">Select purpose</option>
                          <option value="Business Expansion">Business Expansion</option>
                          <option value="Working Capital">Working Capital</option>
                          <option value="Equipment Purchase">Equipment Purchase</option>
                          <option value="Debt Consolidation">Debt Consolidation</option>
                          <option value="Real Estate">Real Estate</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.loanPurpose && <p className="mt-1 text-sm text-red-400">{errors.loanPurpose}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="font-medium text-title_white inline-block mb-2 md:mb-3" htmlFor="requested-amount">Requested Amount</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-white/80 font-medium">$</span>
                        <input id="requested-amount" name="requested_amount" type="text" inputMode="numeric" className={`loan-apply-input loan-apply-amount h-11 w-full bg-white/10 border border-white/10 rounded-[100px] pl-8 pr-5 text-white placeholder:text-white/50 focus:outline-none focus:border-primary duration-300 ${errors['requested-amount'] ? 'border-red-500' : ''}`} placeholder="0" value={formData.requestedAmount} onChange={handleInputChange} required aria-describedby="requested-amount-error" data-amount-input />
                        {errors['requested-amount'] && <p id="requested-amount-error" className="mt-1 text-sm text-red-400">{errors['requested-amount']}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="font-medium text-title_white inline-block mb-2 md:mb-3" htmlFor="desiredTerm">Desired Term (Month)</label>
                      <div className="select-box-dark backdrop-blur-none">
                        <select id="desiredTerm" name="desired_term" className="select-active loan-apply-select w-full" required value={formData.desiredTerm} onChange={handleSelectChange}>
                          <option value="">Select Value</option>
                          <option value="24">24</option>
                          <option value="36">36</option>
                          <option value="48">48</option>
                          <option value="60">60</option>
                          <option value="72">72</option>
                          <option value="84">84</option>
                          <option value="96">96</option>
                        </select>
                        {errors.desiredTerm && <p className="mt-1 text-sm text-red-400">{errors.desiredTerm}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="font-medium text-title_white inline-block mb-2 md:mb-3" htmlFor="fullLegalName">Full Legal Name</label>
                      <input id="fullLegalName" name="full_legal_name" type="text" className={`loan-apply-input h-11 w-full bg-white/10 border border-white/10 rounded-[100px] pl-5 pr-5 text-white placeholder:text-white focus:outline-none focus:border-primary duration-300 ${errors.fullLegalName ? 'border-red-500' : ''}`} placeholder="Enter your full name" required value={formData.fullLegalName} onChange={handleInputChange} aria-describedby="full-legal-name-error" />
                      {errors.fullLegalName && <p className="mt-1 text-sm text-red-400">{errors.fullLegalName}</p>}
                    </div>
                    <div>
                      <label className="font-medium text-title_white inline-block mb-2 md:mb-3" htmlFor="loan-dob">Date of Birth</label>
                      <div className="relative">
                        <input id="loan-dob" name="date_of_birth" type="date" className={`loan-apply-input loan-apply-dob-input h-11 w-full bg-white/10 border border-white/10 rounded-[100px] pl-5 pr-12 text-white placeholder:text-white/50 focus:outline-none focus:border-primary appearance-none ${errors.dateOfBirth ? 'border-red-500' : ''}`} required value={formData.dateOfBirth} onChange={handleInputChange} aria-describedby="loan-dob-error" />
                        <button type="button" className="loan-apply-dob-trigger absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-white/80 hover:text-white inline-flex items-center justify-center w-8 h-8 bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 rounded" aria-label="Choose date" onClick={handleDateTrigger}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        </button>
                      </div>
                      {errors.dateOfBirth && <p className="mt-1 text-sm text-red-400">{errors.dateOfBirth}</p>}
                    </div>
                    <div>
                      <label className="font-medium text-title_white inline-block mb-2 md:mb-3" htmlFor="gross-annual-income">Gross Annual Income</label>
                      <input id="gross-annual-income" name="gross_annual_income" type="text" inputMode="numeric" className={`loan-apply-input h-11 w-full bg-white/10 border border-white/10 rounded-[100px] pl-5 pr-5 text-white placeholder:text-white focus:outline-none focus:border-primary duration-300 ${errors.grossAnnualIncome ? 'border-red-500' : ''}`} placeholder="Enter your Gross Annual Income" required value={formData.grossAnnualIncome} onChange={handleInputChange} aria-describedby="gross-annual-income-error" />
                      {errors.grossAnnualIncome && <p className="mt-1 text-sm text-red-400">{errors.grossAnnualIncome}</p>}
                    </div>
                    <div>
                      <label className="font-medium text-title_white inline-block mb-2 md:mb-3" htmlFor="employment-status">Employment Status</label>
                      <div className="select-box-dark backdrop-blur-none">
                        <select id="employment-status" name="employment_status" className="select-active loan-apply-select w-full" required value={formData.employmentStatus} onChange={handleSelectChange}>
                          <option value="">Select status</option>
                          <option value="Business Owner">Business Owner</option>
                          <option value="Employed">Employed</option>
                          <option value="Self-Employed">Self-Employed</option>
                          <option value="Freelancer">Freelancer</option>
                          <option value="Retired">Retired</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.employmentStatus && <p className="mt-1 text-sm text-red-400">{errors.employmentStatus}</p>}
                      </div>
                    </div>
                    <div>
                      <label className="font-medium text-title_white inline-block mb-2 md:mb-3" htmlFor="loan-phone">Phone Number</label>
                      <input id="loan-phone" name="phone_number" type="tel" className={`loan-apply-input h-11 w-full bg-white/10 border border-white/10 rounded-[100px] pl-5 pr-5 text-white placeholder:text-white focus:outline-none focus:border-primary duration-300 ${errors.phoneNumber ? 'border-red-500' : ''}`} placeholder="Enter your number" required value={formData.phoneNumber} onChange={handleInputChange} aria-describedby="loan-phone-error" />
                      {errors.phoneNumber && <p className="mt-1 text-sm text-red-400">{errors.phoneNumber}</p>}
                    </div>
                  </div>
                  <div className="mt-6 md:mt-9">
                    <button type="submit" className="loan-apply-go-ahead button-primary w-full">Go Ahead</button>
                  </div>
                </form>
              </div>

              {/* <!-- Step 2: Verification Phase (Proof of Income + Identity Check) --> */}
              <div className={`loan-apply-step-pane ${step === 2 ? 'active' : ''} max-w-175 mx-auto p-5 sm:p-6 md:p-9 bg-white/10 border border-white/10 backdrop-blur-2xl rounded-2xl md:rounded-3xl`} data-pane="2" data-sttr-card>
                <div
                  className="max-w-2xl mx-auto space-y-8">

                    <div className="p-5 sm:p-6 rounded-xl bg-white/10 border border-white/20" data-loan-apply-review>
                      <h4 className="text-title_white font-semibold mb-4">Review Your Application</h4>
                      <div className="space-y-2" dangerouslySetInnerHTML={{ __html: reviewData }} />
                    </div>
                  {/* <!-- Proof of Income --> */}
                  <div>
                    <p className="text-title_white font-semibold mb-5">Proof of Income</p>
                    <button type="button" className="loan-verify-connect-bank w-full flex items-center justify-center gap-2 p-3 rounded-[100px] bg-transparent border border-primary text-primary font-semibold text-base hover:bg-primary/10 hover:border-primary duration-300" onClick={openPopup}>
                      <svg className="w-5 sm:w-6 h-5 sm:h-6 fill-current">
                        <use href="#loan-option-icon-05"></use>
                      </svg>
                      Connect Bank Instantly
                    </button>
                    <div className="flex items-center gap-3 my-5">
                      <span className="flex-1 h-px bg-white/20"></span>
                      <span className="text-paragraph_white text-xs uppercase tracking-wide">Or upload manually</span>
                      <span className="flex-1 h-px bg-white/20"></span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">

                      {['idPassport', 'taxReturns', 'utilityBill', 'statements'].map((key, idx) => {
                      const labels = ['ID / Passport', 'Tax Returns', 'Utility Bill', 'Statements'];
                      const iconIds = ['#loan-option-icon-06', '#loan-option-icon-07', '#loan-option-icon-08', '#loan-option-icon-09'];
                        return (
                          <div 
                            key={key} 
                            className="loan-verify-upload-card overflow-hidden flex flex-col items-center justify-center gap-2 p-4 sm:p-5 rounded-xl bg-white/5 border-2 border-dashed border-white/20 text-title_white font-medium text-sm cursor-pointer hover:border-primary/50 hover:bg-white/10 duration-300 transition-colors min-h-[100px]"
                            onClick={() => handleCardClick(key)}
                          >
                            <input 
                              type="file" 
                              className="sr-only loan-verify-file-input" 
                              accept="image/*,.pdf" 
                              aria-label={`Upload ${labels[idx]}`}
                              data-file-key={key}
                              onChange={(e) => handleFileChange(e, key)}
                            />
                            <span className={`loan-verify-upload-default ${files[key] ? 'hidden' : ''} flex flex-col items-center justify-center gap-2`}>
                              <svg className="w-6 sm:w-7 h-6 sm:h-7 fill-current">
                                <use href={iconIds[idx]} />
                              </svg>
                              <span>{labels[idx]}</span>
                            </span>
                            <span className={`loan-verify-upload-selected ${files[key] ? '' : 'hidden'} flex flex-col items-center justify-center gap-2 text-center`}>
                              <span className="loan-verify-file-name text-title_white text-sm truncate max-w-full px-1">{files[key] ? files[key].name : ''}</span>
                              <button type="button" className="loan-verify-remove-file text-paragraph_white hover:text-primary text-xs font-medium" onClick={(e) => { e.stopPropagation(); removeFile(key); }}>Remove</button>
                            </span>
                          </div>
                        );
                      })}

                    </div>
                  </div>
                  {/* <!-- Identity Check --> */}
                  <div>
                    <p className="text-title_white font-semibold mb-5">Identity Check</p>
                    <button type="button" className="loan-verify-face-scan w-full flex items-center justify-center gap-2 p-3 rounded-[100px] bg-transparent border border-primary text-primary font-semibold text-base hover:bg-primary/10 hover:border-primary duration-300">
                      <svg className="w-5 sm:w-6 h-5 sm:h-6 fill-current">
                        <use href="#loan-option-icon-10"></use>
                      </svg>
                      Open Camera for Face Scan
                    </button>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-6 md:mt-9">
                      <button type="button" className="loan-apply-prev button-autline-primary" onClick={() => goToStep(1)}>Back</button>
                      <button type="button" className={`loan-apply-next-verify button-primary ${!allFilesUploaded() ? 'disabled:opacity-60 disabled:pointer-events-none' : ''}`} disabled={!allFilesUploaded()} onClick={() => goToStep(3)}>Continue to Funding</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Step 3: Funding (success / confirmation) --> */}
              <div className={`loan-apply-step-pane ${step === 3 ? 'active' : ''} max-w-[700px] mx-auto p-5 sm:p-6 md:p-9 bg-white/10 border border-white/10 backdrop-blur-2xl rounded-2xl md:rounded-3xl`} data-pane="3" data-sttr-card>
                <div className="mx-w-100 mx-auto flex flex-col">
                  <div className="p-5 sm:p-6 rounded-xl md:rounded-2xl bg-white/10">
                    <div className="mb-4 pb-4 border-b border-white/20 flex flex-col gap-3">
                      <p className="flex items-center justify-between gap-2 text-sm text-title_white">
                        <span>Approved Amount</span>
                        <span>$20,000.00</span>
                      </p>
                      <p className="flex items-center justify-between gap-2 text-sm text-title_white">
                        <span>Interest Rate</span>
                        <span>5.2% APR</span>
                      </p>
                    </div>
                    <p className="flex items-center justify-between gap-2 text-base font-bold text-primary leading-none">
                      <span>Monthly Payment</span>
                      <span>$400.00</span>
                    </p>
                  </div>
                  <div className="w-full mt-6 md:mt-9">
                    <div className="select-box-dark w-full block">
                      <label className="font-medium text-title_white block text-left mb-2 md:mb-3" htmlFor="bank-name">Bank Name</label>
                      <select id="bank-name" name="bank_name" className="select-active bg-white/10!">
                        <option value="1">JP Morgan Chase</option>
                        <option value="2">HSBC Bank</option>
                        <option value="3">Citibank</option>
                        <option value="4">Wells Fargo</option>
                        <option value="5">Bank of America</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-5">
                    <div className="w-full sm:w-1/2">
                      <label htmlFor="account-no" className="font-medium text-title_white block text-left mb-2 md:mb-3">IBAN Account No.</label>
                      <input className="h-11.5 w-full bg-white/10 border border-white/10 backdrop-blur-[34px] rounded-[100px] text-base text-white flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-primary placeholder:text-[#CCCCCC]" type="number" id="account-no" name="account_no" defaultValue="1234567890" />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <label htmlFor="swift-code" className="font-medium text-title_white block text-left mb-2 md:mb-3">SWIFT Routing Code</label>
                      <input className="h-11.5 w-full bg-white/10 border border-white/10 backdrop-blur-[34px] rounded-[100px] text-base text-white flex items-center relative pl-5 pr-9 appearance-none outline-none duration-300 focus:border-primary placeholder:text-[#CCCCCC]" type="number" id="swift-code" name="swift_code" defaultValue="021000021" />
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className="font-medium text-title_white block text-left mb-2 md:mb-3">Electronic Signature</p>
                    <label className="loan-signature-area min-h-36.5 flex flex-col gap-4 items-center justify-center rounded-xl border-2 border-dashed border-white/20 bg-white/5 p-4 cursor-pointer text-base md:text-lg font-medium md:font-semibold text-white">
                      <svg className="w-7 sm:w-9 h-7 sm:h-9 fill-current">
                        <use href="#loan-option-icon-11"></use>
                      </svg>
                      <span className="">Draw or type signature here</span>
                    </label>
                    <div className="my-6 md:mt-9">
                      <label className="flex items-start gap-3 mt-5 cursor-pointer group">
                        <input type="checkbox" name="agree_terms" id="loan-agree-terms" className="mt-1 w-4 h-4 rounded border-white/30 bg-white/10 text-primary focus:ring-primary focus:ring-offset-0" required />
                        <span className="text-paragraph_white text-sm">I agree to the Terms of Service and authorize the electronic transfer of funds to the account above.</span>
                      </label>
                    </div>
                  </div>
                  <button type="button" className="loan-apply-reset button-primary w-full" onClick={resetForm}>Sign Submit for Instant Funding</button>
                </div>
              </div>

              <div className={`loan-connect-popup fixed w-screen h-screen inset-0 z-9999999999 ${showPopup ? 'flex' : 'hidden'} items-center justify-center p-4`} aria-hidden={!showPopup}>
                <div className="loan-connect-popup-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm" data-close-popup onClick={closePopup}></div>
                <div className="loan-connect-popup-box relative max-w-md w-full bg-white/10 border border-white/10 backdrop-blur-2xl rounded-2xl p-6 sm:p-8 shadow-xl">
                  <p className="text-title_white text-center text-base sm:text-lg mb-6">This feature is coming soon. For now, please upload your file manually from here.</p>
                  <button type="button" className="loan-connect-popup-close button-primary w-full" data-close-popup onClick={closePopup}>Close</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
