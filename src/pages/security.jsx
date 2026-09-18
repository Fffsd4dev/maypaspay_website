import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import HeroSecurity from "../component/AllPages/BankingServices/security/HeroSecurity";
import SecurityCard from "../component/AllPages/BankingServices/security/SecurityCard";
import SecurityProtocols from "../component/AllPages/BankingServices/platform/SecurityProtocols";
import Accordion from "../component/AllPages/BankingServices/security/Accordion";
import HelpCenter from "../component/AllPages/BankingServices/security/HelpCenter";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function Security() {

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
                    <HeroSecurity />
                    <SecurityCard />
                    <section className="section-spacing-md-lg">
                        <SecurityProtocols />
                    </section>
                    <Accordion />
                    <HelpCenter />
                </main>
                <Footer />
                <Symbols />
                <BackToTop />
            </>
        )}
    </>
  )
}
