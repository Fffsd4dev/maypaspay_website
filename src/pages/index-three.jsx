import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import HeroThree from "../component/Home/index-three/HeroThree";
import InstitutionalExcellence from "../component/Home/index-three/InstitutionalExcellence";
import Infrastructure from "../component/Home/index-three/Infrastructure";
import CaseStudies from "../component/Home/index-three/CaseStudies";
import Counters from "../component/Home/index-three/Counters";
import EmiCalculatorArea from "../component/Home/index-three/EmiCalculatorArea";
import AdvantageArea from "../component/Home/index-three/AdvantageArea";
import InsightArea from "../component/Home/index-three/InsightArea";
import Knowledge from "../component/Home/index-three/Knowledge";
import InfrastructureCounter from "../component/Home/index-three/InfrastructureCounter";
import FaqArea from "../component/Home/index-three/FaqArea";
import Footer from "../component/Footer";
import Popup from "../component/Home/index-two/Popup";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function IndexThree() {

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
                    <HeroThree />
                    <InstitutionalExcellence />
                    <Infrastructure />
                    <CaseStudies />
                    <Counters />
                    <EmiCalculatorArea />
                    <AdvantageArea />
                    <InsightArea />
                    <Knowledge />
                    <InfrastructureCounter />
                    <FaqArea />
                </main>
                <Footer />
                <Popup />
                <Symbols />
                <BackToTop />
            </>
        )}
    </>
  )
}
