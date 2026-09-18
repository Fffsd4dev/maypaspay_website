import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import LoanBanner from "../component/AllPages/BankingServices/loan-eligibility/LoanBanner";
import DocumentationTab from "../component/AllPages/BankingServices/loan-eligibility/DocumentationTab";
import PerformanceArea from "../component/AllPages/BankingServices/loan-eligibility/PerformanceArea";
import MaximizeArea from "../component/AllPages/BankingServices/loan-eligibility/MaximizeArea";
import TrakingArea from "../component/AllPages/BankingServices/loan-eligibility/TrakingArea";
import ServicesFAQ from "../component/Services/ServicesFAQ";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function LoanEligibility() {

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
                    <LoanBanner />
                    <DocumentationTab />
                    <PerformanceArea />
                    <MaximizeArea />
                    <TrakingArea />
                    <section className="section-spacing-md-lg">
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
