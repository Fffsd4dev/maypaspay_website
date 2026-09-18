import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import PlatformBanner from "../component/AllPages/BankingServices/platform/PlatformBanner";
import ResourcesArea from "../component/AllPages/BankingServices/platform/ResourcesArea";
import Integration from "../component/Home/index/Integration";
import SecurityProtocols from "../component/AllPages/BankingServices/platform/SecurityProtocols";
import Footer from "../component/Footer";
import Popup from "../component/Home/index-two/Popup";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function Platform() {

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
                    <PlatformBanner />
                    <ResourcesArea />
                    <Integration />
                    <section className="section-spacing-lg">
                        <SecurityProtocols />
                    </section>
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
