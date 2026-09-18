import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import HeroResetPassword from "../component/AllPages/BankingServices/reset-password/HeroResetPassword";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function ResetPassword() {

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
                    <HeroResetPassword />
                </main>
                <Footer />
                <Symbols />
                <BackToTop />
            </>
        )}
    </>
  )
}
