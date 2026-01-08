import React, { useState, useEffect } from 'react';
import './Sidebar.css';

const sectionMap = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'aboutMe', label: 'About me', href: '#aboutMe' },
    { id: 'works', label: 'Works', href: '#works' },
    { id: 'contact', label: 'Contact', href: '#contact' },
];

const Sidebar = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1500);
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Trigger animation on load
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Handle screen resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1500);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle section highlighting
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const visibleEntries = entries.filter(entry => entry.isIntersecting);
                if (visibleEntries.length > 0) {
                    setActiveSection(visibleEntries[0].target.id);
                }
            },
            { threshold: 0.1 }
        );

        sectionMap.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    // Desktop Sidebar
    if (!isMobile) {
        return (
            <div style={{
                marginLeft: '35px',
                position: 'fixed',
                width: '240px',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateX(0)' : 'translateX(-30px)',
                transition: 'opacity 0.6s ease, transform 0.6s ease',
                zIndex: 10,
            }}>
                <div style={{
                    marginTop: "100px",
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '40px',
                    alignItems: 'flex-start',
                }}>
                    {sectionMap.map(({ id, label, href }, index) => (
                        <a
                            key={id}
                            href={href}
                            style={{
                                marginLeft: activeSection === id ? '50px' : '0px',
                                scale: activeSection === id ? '1.5' : '1',
                                transition: 'margin-left 0.5s ease',
                                opacity: isLoaded ? 1 : 0,
                                transform: isLoaded ? 'translateX(0)' : 'translateX(-30px)',
                                animation: isLoaded ? `slideInLeft 0.6s ease forwards` : 'none',
                                animationDelay: `${index * 0.1}s`,
                            }}
                        >
                            {label}
                        </a>
                    ))}
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: "100px",
                    gap: "10px",
                    opacity: isLoaded ? 1 : 0,
                    transform: isLoaded ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.6s ease 0.4s, transform 0.6s ease 0.4s',
                }}>
                    <a className="sidebarLink" href="https://github.com/arvokasko">
                        <i className="fab fa-github" style={{ fontSize: "30px" }}></i>
                    </a>
                </div>
            </div>
        );
    }

    // Mobile Menu
    return (
        <div style={{ position: 'fixed', top: 20, left: 20, zIndex: 1000 }}>
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                    fontSize: '24px',
                    padding: '10px 15px',
                    background: 'rgba(0, 0, 0, 0)',
                    textShadow: '0px 18px 32px rgba(0, 0, 0, 1)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                ☰
            </button>

            {menuOpen && (
                <div style={{
                    marginTop: '10px',
                    background: 'rgba(0,0,0,0.9)',
                    padding: '20px',
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}>
                    {sectionMap.map(({ id, label, href }) => (
                        <a
                            key={id}
                            href={href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                                fontSize: '20px',
                            }}
                        >
                            {label}
                        </a>
                    ))}
                    <a className='sidebarLink' href="https://github.com/arvokasko">
                        <i className="fab fa-github" style={{ fontSize: "24px", color: "white" }}></i>
                    </a>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
