import React, { useState, useEffect } from 'react'
import './Home.css';

const Home = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const videoSrc = `${import.meta.env.BASE_URL}assets/Timeline.mp4`;

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div id='home'
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
            }}
        >
            {/* <video autoPlay muted loop className={`background-video ${isLoaded ? 'loaded' : ''}`}>
                <source src={videoSrc} type="video/mp4" />
            </video> */}
            <h1 className={`homeHeader ${isLoaded ? 'loaded' : ''}`}>Aaron Huhtala</h1>
            {/* <div className='fadeDiv'></div> */}
        </div>
    )
}

export default Home