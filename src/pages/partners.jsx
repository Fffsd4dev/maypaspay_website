import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import HeroPartners from "../component/AllPages/Company/partners/HeroPartners";
import Ecosystems from "../component/AllPages/Company/partners/Ecosystems";
import Rates from "../component/AllPages/Company/partners/Rates";
import Onboarding from "../component/AllPages/Company/partners/Onboarding";
import Integration from "../component/Home/index/Integration";
import ClientsectionTwo from "../component/AllPages/Company/partners/ClientsectionTwo";
import Logos from "../component/Home/index/Logos";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function Partners() {

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
                    <HeroPartners />
                    <Ecosystems />
                    <Rates />
                    <Onboarding />
                    <Integration />
                    <ClientsectionTwo />
                    <div className="mb-7.5">
                        <Logos />
                    </div>
                </main>
                <Footer />
                <Symbols />
                <BackToTop />
            </>
        )}
    </>
  )
}
