import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import ContactForm from "../component/Services/ContactForm";
import AboutCompanyArea from "../component/AllPages/Company/getstrated/AboutCompanyArea";
import Trackings from "../component/AllPages/Company/getstrated/Trackings";
import CriteriaArea from "../component/AllPages/Company/getstrated/CriteriaArea";
import LoanForm from "../component/AllPages/Company/getstrated/LoanForm";
import FaqAreaTwo from "../component/AllPages/Company/getstrated/FaqAreaTwo";
import ConnectedArea from "../component/Home/index-two/ConnectedArea";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

import contactFormBg from "../assets/img/services/contact-form-bg.webp";

export default function Getstrated() {

    const [loading, setLoading] = useState(true);

  return (
    <>
        {loading && (
            <Preloader onComplete={() => setLoading(false)} />
        )}
    
        {!loading && (
            <>
                <Navbar />
                <main id="main-content">
                    <section className="section-spacing-lg bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${contactFormBg})` }}>
                        <div className="container">
                            <h1 className="hidden">For Seo</h1>
                            <ContactForm />
                        </div>
                    </section>
                    <AboutCompanyArea />
                    <Trackings />
                    <CriteriaArea />
                    <LoanForm />
                    <FaqAreaTwo />
                    <section className="section-spacing-md-lg">
                        <div className="container">
                            <ConnectedArea />
                        </div>
                    </section>
                </main>
                <Footer />
                <Symbols />
                <BackToTop />
            </>
        )}
    </>
  )
}
