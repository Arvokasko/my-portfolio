import React from 'react'
import Icons from "./Icons";
import useScrollAnimation from '../../hooks/useScrollAnimation';


const AboutMe = () => {
    const titleRef = useScrollAnimation({ threshold: 0.1 });
    const contentRef = useScrollAnimation({ threshold: 0.1 });
    const iconsRef = useScrollAnimation({ threshold: 0.1 });
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div id='aboutMe'
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                height: "auto",
                paddingBottom: "50vh"
            }}
        >
            <h1 ref={titleRef} className='scroll-animate animate-fade'>
                About me
            </h1>
            <div style={{ width: isMobile ? "90%" : "60%", marginTop: 60, marginBottom: 100 }}>

                <p>
                    I'm a passionate website developer currently in my second year of professional experience, based in Oulu, Finland. With a strong foundation in front-end and back-end technologies, I specialize in creating responsive, user-friendly websites that blend functionality with clean design. My journey in web development has been driven by curiosity, continuous learning, and a commitment to delivering high-quality digital experiences.

                </p>
            </div>
            <div ref={contentRef} style={{ maxWidth: "1200px", width: "90%", display: "flex", flexDirection: isMobile ? "column" : "row", gap: "40px", alignItems: isMobile ? "center" : "flex-start" }} className='scroll-animate animate-slide-up'>

                {/* <p style={{ marginTop: 40, marginBottom: 40 }}>
                </p> */}
                <div style={{ flex: 1, overflowWrap: "break-word", fontSize: isMobile ? 30 : 50, margin: isMobile ? 0 : 50, position: isMobile ? "static" : "sticky", top: isMobile ? "auto" : "33%" }}>
                    <h2>My toolbox</h2>
                </div>

                <div style={{ flex: 1, width: isMobile ? "100%" : "auto" }}>
                    <div ref={iconsRef} className='scroll-animate-group' style={{
                        display: "grid",
                        gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "1fr",
                        marginTop: isMobile ? 20 : 100,
                        gap: "20px"
                    }}>

                        <Icons iconClass="fab fa-html5 fa-4x" />
                        <Icons iconClass="fab fa-css3 fa-4x" />
                        <Icons iconClass="fab fa-js fa-4x" />
                        <Icons iconClass="fab fa-php fa-4x" />
                        <Icons iconClass="fab fa-python fa-4x" />
                        <Icons iconClass="fab fa-wordpress fa-4x" />
                        <Icons iconClass="fab fa-microsoft fa-4x" />
                        <Icons iconClass="fab fa-adobe fa-4x" />
                        <Icons iconClass="fab fa-github fa-4x" />
                        <Icons iconClass="fab fa-react fa-4x" />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutMe