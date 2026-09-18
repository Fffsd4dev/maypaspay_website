import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import HeroTwo from "../component/Home/index-two/HeroTwo";
import Banner from "../component/Home/index/Banner";
import ConnectedArea from "../component/Home/index-two/ConnectedArea";
import GlobalAccess from "../component/Home/index-two/GlobalAccess";
import Footer from "../component/Footer";
import Popup from "../component/Home/index-two/Popup";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";
import AboutArea from "../component/Home/index/AboutArea";
import Services from "../component/Home/index/Services";
import BankingArea from "../component/Home/index/BankingArea";

export default function IndexTwo() {

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
                    <HeroTwo />
                    <Banner />
                    <AboutArea />
                    <Services />
                    <BankingArea />
                    <section className="section-spacing-md relative z-10">
                        <div className="container">
                            <ConnectedArea />
                        </div>
                    </section>
                    <GlobalAccess />
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
