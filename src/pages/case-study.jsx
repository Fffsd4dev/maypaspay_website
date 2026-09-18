import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import HeroCase from "../component/AllPages/LegalTrust/case-study/HeroCase";
import CaseUsers from "../component/AllPages/LegalTrust/case-study/CaseUsers";
import ClientStories from "../component/AllPages/LegalTrust/case-study/ClientStories";
import Logos from "../component/Home/index/Logos";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function CaseStudy() {

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
                    <HeroCase />
                    <CaseUsers />
                    <ClientStories />
                    <div className="mb-7">
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
