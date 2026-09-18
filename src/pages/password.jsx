import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import HeroPassword from "../component/AllPages/BankingServices/password/HeroPassword";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function Password() {

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
                    <HeroPassword />
                </main>
                <Footer />
                <Symbols />
                <BackToTop />
            </>
        )}
    </>
  )
}
