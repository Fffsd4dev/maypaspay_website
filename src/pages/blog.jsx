import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import HeroBlog from "../component/AllPages/LegalTrust/blog/HeroBlog";
import FeaturedBlog from "../component/AllPages/LegalTrust/blog/FeaturedBlog";
import FinancialBlog from "../component/AllPages/LegalTrust/blog/FinancialBlog";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function Blog() {

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
                    <HeroBlog />
                    <FeaturedBlog />
                    <FinancialBlog />
                </main>
                <Footer />
                <Symbols />
                <BackToTop />
            </>
        )}
    </>
  )
}
