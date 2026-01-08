import { useState, useRef, useEffect } from 'react'
import Sidebar from './components/sidebar/Sidebar'
import Home from './components/home/Home'
import AboutMe from './components/aboutMe/AboutMe'
import Works from './components/works/Works'
import Contact from './components/contact/Contact'
import Footer from './components/footer/Footer'
import './App.css'
import './styles/scrollAnimations.css'

function App() {
  return (
    <>
      {/* Animated gradient background */}
      <div
        style={{
          minHeight: '100vh',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -2,
          background: 'linear-gradient(135deg, #111111ff, #2d0057ff, #111111ff)',
          backgroundSize: '800% 800%',
          animation: 'gradientAnimation 5s linear infinite'
        }}
      />
      {/* Static SVG overlay */}
      <div
        style={{
          backgroundImage: `url('${import.meta.env.BASE_URL}assets/endless-clouds.svg')`,
          backgroundSize: '100px',
          backgroundRepeat: 'repeat',
          minHeight: '100vh',
          width: '100%',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Sidebar />
        <Home />
        <AboutMe />
        <Works />
        <Contact />
        <Footer />
      </div>
    </>
  )
}

export default App
