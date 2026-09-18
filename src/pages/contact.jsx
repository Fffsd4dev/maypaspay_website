import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import HeroContact from "../component/ContactUs/HeroContact";
import ContactBanner from "../component/ContactUs/ContactBanner";
import ContactData from "../component/ContactUs/ContactData";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function Contact() {

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
              <HeroContact />
              <ContactBanner />
              <ContactData />
          </main>
          <Footer />
          <Symbols />
          <BackToTop />
        </>
      )}
    </>
  )
}
