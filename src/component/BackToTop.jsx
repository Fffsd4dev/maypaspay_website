import { useEffect, useState } from "react";

export default function BackToTop() {

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {

        const handleScroll = () => {
            setShowButton(window.scrollY > 500);
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    const topFunction = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

  return (
    <>
        <button 
            onClick={topFunction}
            id="back-to-top" 
            className={`back-to-top fixed text-xl rounded-full z-10 bottom-5 inset-e-5 size-9 text-center bg-primary text-white justify-center items-center${
                showButton ? "flex opacity-100" : "hidden opacity-0"
            }`}
        >
            <i className="ri-arrow-up-s-line"></i>
        </button>
    </>
  )
}
