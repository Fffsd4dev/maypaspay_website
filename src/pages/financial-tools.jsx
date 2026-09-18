import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import HeroFinancialTools from "../component/AllPages/BankingServices/financial-tools/HeroFinancialTools";
import RoiCalculatorTwo from "../component/AllPages/BankingServices/financial-tools/RoiCalculatorTwo";
import EmiAreaTwo from "../component/AllPages/BankingServices/financial-tools/EmiAreaTwo";
import Currency from "../component/AllPages/BankingServices/financial-tools/Currency";
import OnboardingArea from "../component/AllPages/BankingServices/financial-tools/OnboardingArea";
import Footer from "../component/Footer";
import Popup from "../component/Home/index-two/Popup";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function FinancialTools() {

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
            <HeroFinancialTools />
            <RoiCalculatorTwo />
            <EmiAreaTwo />
            <Currency />
            <OnboardingArea />
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
