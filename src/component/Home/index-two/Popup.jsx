import { useEffect, useRef, useState, useCallback } from "react";

export default function Popup() {

    const [isOpen, setIsOpen] = useState(false);
    const [videoSrc, setVideoSrc] = useState("");
    const overlayRef = useRef(null);
    const iframeRef = useRef(null);
    const closeBtnRef = useRef(null);
    const preventWheelHandlerRef = useRef(null);

    // ----- Close popup -----
    const closePopup = useCallback(() => {
        setIsOpen(false);
        setVideoSrc("");

        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";

        if (typeof window.lenis !== 'undefined' && window.lenis) {
            try {
                if (typeof window.lenis.start === 'function') {
                    window.lenis.start();
                }
                document.documentElement.classList.remove('lenis-stopped');
            } catch (e) {
                console.warn('Lenis start error:', e);
            }
        }

        if (preventWheelHandlerRef.current) {
            window.removeEventListener('wheel', preventWheelHandlerRef.current, { capture: true });
            window.removeEventListener('touchmove', preventWheelHandlerRef.current, { capture: true });
            window.removeEventListener('scroll', preventWheelHandlerRef.current, { capture: true });
            preventWheelHandlerRef.current = null;
        }
    }, []);

    // ----- Open popup -----
    const openPopup = useCallback((href) => {
        let url = href;
        if (url && url.indexOf('?') !== -1 && url.indexOf('autoplay') === -1) {
            url += (url.indexOf('?') === url.length - 1 ? '' : '&') + 'autoplay=1';
        }
        setVideoSrc(url || "");
        setIsOpen(true);

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        if (typeof window.lenis !== 'undefined' && window.lenis) {
            try {
                if (typeof window.lenis.stop === 'function') {
                    window.lenis.stop();
                }
            } catch (e) {
                console.warn('Lenis stop error:', e);
            }
        }

        const preventWheel = (e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
        };
        window.addEventListener('wheel', preventWheel, { passive: false, capture: true });
        window.addEventListener('touchmove', preventWheel, { passive: false, capture: true });
        window.addEventListener('scroll', preventWheel, { passive: false, capture: true });
        preventWheelHandlerRef.current = preventWheel;
    }, []);

    // ----- Attach click listeners to all .video-popup links -----
    useEffect(() => {
        const videoLinks = document.querySelectorAll('.video-popup');
        const handlers = [];

        videoLinks.forEach((link) => {
            const handler = (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href) {
                    openPopup(href);
                }
            };
            link.addEventListener('click', handler);
            handlers.push({ link, handler });
        });

        return () => {
            handlers.forEach(({ link, handler }) => {
                link.removeEventListener('click', handler);
            });
        };
    }, [openPopup]);

    // ----- Close on overlay click -----
    useEffect(() => {
        const overlay = overlayRef.current;
        if (!overlay) return;

        const handleOverlayClick = (e) => {
            if (e.target === overlay) {
                closePopup();
            }
        };
        overlay.addEventListener('click', handleOverlayClick);

        return () => {
            overlay.removeEventListener('click', handleOverlayClick);
        };
    }, [closePopup]);

    // ----- Close on close button click -----
    useEffect(() => {
        const closeBtn = closeBtnRef.current;
        if (!closeBtn) return;

        const handler = () => closePopup();
        closeBtn.addEventListener('click', handler);

        return () => {
            closeBtn.removeEventListener('click', handler);
        };
    }, [closePopup]);

    // ----- Keyboard: ESC to close -----
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closePopup();
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, closePopup]);

    return (
        <>
            <div
                ref={overlayRef}
                id="popup-overlay"
                className="popup-overlay popup-overlay-none fixed top-0 left-0 w-screen h-screen bg-secondary/50 flex items-center justify-center z-99999999 backdrop-blur-sm cursor-pointer"
                style={{ display: isOpen ? 'flex' : 'none' }}
            >
                <div className="popup-content relative w-[90%] sm:w-[80%] max-w-200 bg-secondary p-2 rounded-lg">

                    {videoSrc && (
                        <iframe
                            ref={iframeRef}
                            className="w-full h-112.5 pointer-events-auto!"
                            id="popup-video"
                            title="SecureVest promotional video"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            src={videoSrc}
                        ></iframe>
                    )}
                </div>
                <button
                    ref={closeBtnRef}
                    type="button"
                    id="popup-close"
                    className="absolute top-2 right-2 w-10 h-10 rounded-full bg-white/90 hover:bg-white items-center justify-center text-title_black z-10 hidden"
                    style={{ display: isOpen ? 'flex' : 'none' }}
                    aria-label="Close video"
                >
                    <svg className="w-5 h-5 fill-current"><use href="#closeIcon"></use></svg>
                </button>
            </div>
        </>
    )
}
