import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import HeroError from "../component/AllPages/Company/error/HeroError";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";
import HeroComingSoon from "../component/AllPages/Company/comingsoon/comingsoon.jsx";

export default function ComingSoon() {

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
                    <HeroComingSoon />
                </main>
                <Footer />
                <Symbols />
                <BackToTop />
            </>
        )}
    </>
  )
}
