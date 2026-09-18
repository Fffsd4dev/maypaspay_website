import { useState } from "react";
import { useParams } from 'react-router-dom';

import { caseData } from "../data/caseData";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import CaseHero from "../component/AllPages/LegalTrust/case-study-post/CaseHero";
import CaseProblems from "../component/AllPages/LegalTrust/case-study-post/CaseProblems";
import CaseStudys from "../component/AllPages/LegalTrust/case-study-post/CaseStudys";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function CaseStudyPost() {

    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const caseDatas = caseData.find(item => item.id === Number(id));

  return (
    <>
        {loading && (
            <Preloader onComplete={() => setLoading(false)} />
        )}

        {!loading && (
            <>
                <Navbar />
                <main id="main-content">
                    <CaseHero cases={caseDatas} />
                    <CaseProblems />
                    <CaseStudys />
                </main>
                <Footer />
                <Symbols />
                <BackToTop />
            </>
        )}
    </>
  )
}
