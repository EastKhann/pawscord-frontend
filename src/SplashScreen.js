// frontend/src/SplashScreen.js - Modern Animated Splash

import React, { useState } from 'react';
import './SplashScreen.css';
import { LOGO_URL } from './utils/cdn';

// R2 CDN'den logo - fallback olarak SVG
const R2_LOGO_URL = LOGO_URL;

// Fallback SVG paw logo
const PawLogoSVG = () => (
    <svg className="splash-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="62" rx="22" ry="18" fill="white" />
        <ellipse cx="28" cy="38" rx="10" ry="12" fill="white" />
        <ellipse cx="72" cy="38" rx="10" ry="12" fill="white" />
        <ellipse cx="22" cy="55" rx="8" ry="10" fill="white" />
        <ellipse cx="78" cy="55" rx="8" ry="10" fill="white" />
    </svg>
);

// R2'den logo, yüklenemezse SVG fallback
const PawLogo = () => {
    const [imgError, setImgError] = useState(false);

    if (imgError) {
        return <PawLogoSVG />;
    }

    return (
        <img
            src={R2_LOGO_URL}
            alt="Pawscord"
            className="splash-logo"
            onError={() => setImgError(true)}
        />
    );
};

const SplashScreen = ({ animationState }) => {
    return (
        <div className={`splash-screen ${animationState}`}>
            {/* Background particles */}
            <div className="particles">
                {[...Array(15)].map((_, i) => (
                    <div key={i} className="particle" style={{
                        '--delay': `${Math.random() * 2}s`,
                        '--x': `${Math.random() * 100}%`,
                        '--size': `${4 + Math.random() * 8}px`,
                        '--duration': `${2 + Math.random() * 3}s`
                    }} />
                ))}
            </div>

            {/* Animated rings */}
            <div className="rings-container">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
            </div>

            {/* Logo with glow - R2'den, fallback SVG */}
            <div className="logo-container">
                <div className="logo-glow"></div>
                <PawLogo />
            </div>

            {/* Brand text */}
            <div className="brand-text">
                <span className="letter" style={{ '--i': 0 }}>P</span>
                <span className="letter" style={{ '--i': 1 }}>A</span>
                <span className="letter" style={{ '--i': 2 }}>W</span>
                <span className="letter" style={{ '--i': 3 }}>S</span>
                <span className="letter" style={{ '--i': 4 }}>C</span>
                <span className="letter" style={{ '--i': 5 }}>O</span>
                <span className="letter" style={{ '--i': 6 }}>R</span>
                <span className="letter" style={{ '--i': 7 }}>D</span>
            </div>

            {/* Loading indicator */}
            <div className="loading-bar">
                <div className="loading-progress"></div>
            </div>
        </div>
    );
};

export default React.memo(SplashScreen);

