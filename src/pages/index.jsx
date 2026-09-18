import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import Hero from "../component/Home/index/Hero";
import Banner from "../component/Home/index/Banner";
import AboutArea from "../component/Home/index/AboutArea";
import BankingArea from "../component/Home/index/BankingArea";
import Services from "../component/Home/index/Services";
import Benefits from "../component/Home/index/Benefits";
import Trust from "../component/Home/index/Trust";
import EmiArea from "../component/Home/index/EmiArea";
import RoiCalculator from "../component/Home/index/RoiCalculator";
import Testimonial from "../component/Home/index/Testimonial";
import Integration from "../component/Home/index/Integration";
import Blogs from "../component/Home/index/Blogs";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";
import MoneyCounterLoader from "../component/MoneyCounterLoader";

export default function Index() {

  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && (
        <Preloader onComplete={() => setLoading(false)} />
        // <MoneyCounterLoader onComplete={() => setLoading(false)} /> 
      )}

      {!loading && (
        <>
          <Navbar />
          <main id="main-content">
            <Hero />
            <Banner />
            <AboutArea />
            <BankingArea />
            <Services />
            <Benefits />
            <Trust />
            <EmiArea />
            <RoiCalculator />
            <Testimonial />
            <Integration />
            <Blogs />
          </main>
          <Footer />
          <Symbols />
          <BackToTop />
        </>
      )}
    </>
  )
}
