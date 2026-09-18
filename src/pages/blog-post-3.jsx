import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import BlogHeroThree from "../component/AllPages/LegalTrust/blog-post-3/BlogHeroThree";
import RelatedBlogs from "../component/AllPages/LegalTrust/blog-post-1/RelatedBlogs";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function BlogPost3() {

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
                    <BlogHeroThree />
                    <section className="section-spacing-lg relative">
                        <RelatedBlogs />
                    </section>
                </main>
                <Footer />
                <Symbols />
                <BackToTop />
            </>
        )}
    </>
  )
}
