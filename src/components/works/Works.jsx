import React from 'react'
import ImageSlider from './ImageSlider'
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Works = () => {
    const titleRef = useScrollAnimation({ threshold: 0.1 });
    const contentRef = useScrollAnimation({ threshold: 0.1 });

    return (
        <div id='works'
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            <h1 ref={titleRef} style={{ zIndex: 10 }} className='scroll-animate animate-fade'>My works</h1>
            <div ref={contentRef} className='scroll-animate animate-scale'>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                }}>
                    <ImageSlider />

                </div>
            </div>
        </div>
    )
}

export default Works