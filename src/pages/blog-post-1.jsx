import { useState } from "react";
import { useParams } from 'react-router-dom';

import { blogData } from "../data/data";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import BlogHero from "../component/AllPages/LegalTrust/blog-post-1/BlogHero";
import RelatedBlogs from "../component/AllPages/LegalTrust/blog-post-1/RelatedBlogs";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function BlogPost1() {

    const [loading, setLoading] = useState(true);

    const { id } = useParams();
    const blogDatas = blogData.find(item => item.id === Number(id));

  return (
    <>
        {loading && (
            <Preloader onComplete={() => setLoading(false)} />
        )}

        {!loading && (
            <>
                <Navbar />
                <main id="main-content">
                    <BlogHero blog={blogDatas} />
                    <section className="section-spacing-lg relative overflow-hidden">
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
