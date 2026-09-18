import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import HeroLoan from "../component/AllPages/BankingServices/apply-loan/HeroLoan";
import Loans from "../component/AllPages/BankingServices/apply-loan/Loans";
import CycleTab from "../component/AllPages/BankingServices/apply-loan/CycleTab";
import AccordionUs from "../component/AllPages/BankingServices/apply-loan/AccordionUs";
import Trust from "../component/Home/index/Trust";
import ApplyForm from "../component/AllPages/BankingServices/apply-loan/ApplyForm";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function ApplyLoan() {

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
                    <HeroLoan />
                    <Loans />
                    <CycleTab />
                    <AccordionUs />
                    <Trust />
                    <ApplyForm />
                </main>
                <Footer />
                <Symbols />
                <BackToTop />
            </>
        )}
    </>
  )
}
