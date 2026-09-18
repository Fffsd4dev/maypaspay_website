import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import HeroServices from "../component/Services/HeroServices";
import Services from "../component/Home/index/Services";
import ContactForm from "../component/Services/ContactForm";
import ServicesFAQ from "../component/Services/ServicesFAQ";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

import contactFormBg from "../assets/img/services/contact-form-bg.webp";

export default function Service() {

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
                    <HeroServices />
                    <Services />
                    <section className="section-spacing-lg bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${contactFormBg})` }}>
                        <div className="container">
                            <ContactForm />
                        </div>
                    </section>
                    <section className="section-spacing-lg-md">
                        <ServicesFAQ />
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
