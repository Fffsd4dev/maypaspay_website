import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import BlogHeroTwo from "../component/AllPages/LegalTrust/blog-post-2/BlogHeroTwo";
import ArticleTwo from "../component/AllPages/LegalTrust/blog-post-2/ArticleTwo";
import RelatedBlogs from "../component/AllPages/LegalTrust/blog-post-1/RelatedBlogs";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function BlogPost2() {

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
                    <BlogHeroTwo />
                    <ArticleTwo />
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
