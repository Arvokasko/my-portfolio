import React from 'react'
import useScrollAnimation from '../../hooks/useScrollAnimation';

const Footer = () => {
    const footerRef = useScrollAnimation({ threshold: 0.1 });

    return (
        <div id='footer' ref={footerRef} className='scroll-animate animate-fade' style={{
            width: "100%",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            <p><i className="fa fa-copyright"></i> Aaron Huhtala</p>
        </div>
    )
}

export default Footer