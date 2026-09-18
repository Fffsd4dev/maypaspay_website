import { useState } from "react";

import Preloader from "../component/Preloader";
import Navbar from "../component/Navbar";
import HeroAbout from "../component/AboutUs/HeroAbout";
import Journey from "../component/AboutUs/Journey";
import StrategicMission from "../component/AboutUs/StrategicMission";
import Teams from "../component/AboutUs/Teams";
import FaqArea from "../component/Home/index-three/FaqArea";
import Footer from "../component/Footer";
import Symbols from "../component/Symbols";
import BackToTop from "../component/BackToTop";

export default function AboutUs() {
    
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
                    <HeroAbout />
                    <StrategicMission />
                    <Journey />
                    <Teams />
                    <FaqArea />
                </main>
                <Footer />
                <Symbols />
                <BackToTop />
            </>
        )}
    </>
  )
}
