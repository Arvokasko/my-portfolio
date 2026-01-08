import React, { useState, useEffect, useRef, useCallback } from 'react';
import './ImageSlider.css';

const ImageSlider = () => {
    const GAP = 20;
    const ANIMATION_DURATION = 300;

    const images = [
        {
            src: `assets/Screenshot 2025-11-07 121857.png`,
            link: 'https://geronimo.okol.org/~huhaar/keystone/',
            title: 'Keystone',
            description: 'A modern web application with clean design and intuitive navigation',
        },
        {
            src: `assets/Screenshot 2025-11-07 134055.png`,
            link: 'https://geronimo.okol.org/~huhaar/KotkantienMaalaus/',
            title: 'Kotkantien Maalaus',
            description: 'Professional painting service website with portfolio showcase',
        },
        {
            src: `assets/bewo thumbnail.jpg`,
            link: 'https://github.com/arvokasko/bewo/',
            title: 'Bewo',
            description: 'Simple taskcard mobile app with user sharing',
        },
    ];

    const [containerWidth, setContainerWidth] = useState(window.innerWidth);
    const [currentIndex, setCurrentIndex] = useState(3);
    const [transition, setTransition] = useState(true);
    const [scrollWidth, setScrollWidth] = useState(0);
    const isAnimatingRef = useRef(false);
    const transitionTimeoutRef = useRef(null);
    const sliderContainerRef = useRef(null);

    const visibleCount = containerWidth < 1400 ? 1 : containerWidth < 2000 ? 2 : 3;
    // Create 3 sets of images (9 total) for infinite carousel
    const loopedImages = [...images, ...images, ...images];

    const handleSlideChange = useCallback((newIndex) => {
        if (isAnimatingRef.current) return;

        isAnimatingRef.current = true;
        setTransition(true);
        setCurrentIndex(newIndex);

        if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);

        transitionTimeoutRef.current = setTimeout(() => {
            setTransition(false);
            // Detect when user has scrolled through all images once
            const totalImages = images.length * 3;
            let resetIndex = newIndex % totalImages;
            if (resetIndex < 0) resetIndex += totalImages;

            // If user has scrolled past the end of set 1 (indices 3-5) to set 2, jump back to set 1
            // Or if scrolled past start of set 1 to set 0, jump back to set 2
            if (newIndex >= images.length * 2) {
                resetIndex = images.length; // Jump to start of set 2 (which looks like set 1)
            } else if (newIndex < images.length) {
                resetIndex = images.length * 2; // Jump to start of set 3 (which looks like set 1)
            }

            setCurrentIndex(resetIndex);
            isAnimatingRef.current = false;
        }, ANIMATION_DURATION);
    }, [images.length]);

    const handleNext = useCallback(() => handleSlideChange(currentIndex + 1), [currentIndex, handleSlideChange]);
    const handlePrev = useCallback(() => handleSlideChange(currentIndex - 1), [currentIndex, handleSlideChange]);

    useEffect(() => {
        const handleResize = () => setContainerWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        let rafId = null;
        let lastScrollWidth = 0;

        const handleScroll = () => {
            if (!sliderContainerRef.current) return;

            const rect = sliderContainerRef.current.getBoundingClientRect();
            const elementTop = rect.top;
            const elementHeight = rect.height;
            const windowHeight = window.innerHeight;

            // Calculate position within the element
            const centerOffset = windowHeight / 2;
            const distanceFromCenter = elementTop + elementHeight / 2 - centerOffset;
            const maxDistance = elementHeight / 2 + windowHeight / 2;

            // At center: 100%, stays at 100% after passing center
            const progress = Math.max(0, 1 - Math.max(distanceFromCenter, 0) / maxDistance);
            const newScrollWidth = progress * 100;

            // Only update state if value changed (reduces unnecessary re-renders)
            if (Math.abs(newScrollWidth - lastScrollWidth) > 0.5) {
                lastScrollWidth = newScrollWidth;
                setScrollWidth(newScrollWidth);
            }
        };

        const throttledScroll = () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(handleScroll);
        };

        // Small delay to ensure DOM is ready
        const initialTimeout = setTimeout(() => {
            handleScroll();
            window.addEventListener('scroll', throttledScroll);
        }, 100);

        return () => {
            clearTimeout(initialTimeout);
            window.removeEventListener('scroll', throttledScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (isAnimatingRef.current) return;
            if (e.key === 'ArrowRight') handleNext();
            else if (e.key === 'ArrowLeft') handlePrev();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleNext, handlePrev]);

    useEffect(() => {
        return () => {
            if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
        };
    }, []);

    const imageWidth = Math.min(600, containerWidth * 0.9);

    return (
        <div className="slider-container" ref={sliderContainerRef}>
            <div style={{ backgroundColor: "#0000008f", height: "75vh", position: "absolute", width: `${Math.min(scrollWidth, 85)}vw`, zIndex: -100, borderRadius: 20 }} />
            <div className="slider-wrapper">
                <div
                    className="slider-track"
                    style={{
                        width: `${visibleCount * (imageWidth + GAP)}px`,
                    }}
                >
                    <div
                        className="slider-slides"
                        style={{
                            gap: `${GAP}px`,
                            width: `${loopedImages.length * (imageWidth + GAP)}px`,
                            transform: `translateX(-${currentIndex * (imageWidth + GAP)}px)`,
                            transition: transition ? `transform ${ANIMATION_DURATION}ms cubic-bezier(0.34, 1.56, 0.64, 1)` : 'none',
                        }}
                    >
                        {loopedImages.map((img, index) => (
                            <a
                                key={index}
                                href={img.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="slider-card"
                                style={{ width: `${imageWidth}px`, marginTop: 80 }}
                            >
                                <div className="slider-image-container">
                                    <img
                                        src={img.src}
                                        alt={img.title}
                                        className="slider-image"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="slider-link-icon-right">
                                        <i className="fas fa-external-link-alt"></i>
                                    </div>
                                </div>
                                <div className="slider-card-content">
                                    <h3 className="slider-card-title">{img.title}</h3>
                                    <p className="slider-card-description">{img.description}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
            <div className="slider-button-container">
                <button
                    onClick={handlePrev}
                    disabled={isAnimatingRef.current}
                    className="slider-bottom-button"
                >
                    ❮
                </button>
                <button
                    onClick={handleNext}
                    disabled={isAnimatingRef.current}
                    className="slider-bottom-button"
                >
                    ❯
                </button>
            </div>
        </div>
    );
};

export default ImageSlider;
