// frontend/src/SplashScreen.js - Premium Animated Splash

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import './SplashScreen.css';
import { LOGO_URL } from '../utils/cdn';

const R2_LOGO_URL = LOGO_URL;

const PawLogoSVG = () => (
    <svg
        className="splash-logo"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <ellipse cx="50" cy="62" rx="22" ry="18" fill="white" />
        <ellipse cx="28" cy="38" rx="10" ry="12" fill="white" />
        <ellipse cx="72" cy="38" rx="10" ry="12" fill="white" />
        <ellipse cx="22" cy="55" rx="8" ry="10" fill="white" />
        <ellipse cx="78" cy="55" rx="8" ry="10" fill="white" />
    </svg>
);

const PawLogo = () => {
    const [imgError, setImgError] = useState(false);
    if (imgError) return <PawLogoSVG />;
    return (
        <img
            src={R2_LOGO_URL}
            alt="Pawscord"
            className="splash-logo"
            onError={() => setImgError(true)}
        />
    );
};

const LETTERS = ['P', 'A', 'W', 'S', 'C', 'O', 'R', 'D'];

const SplashScreen = ({ animationState }) => {
    const particles = useMemo(
        () =>
            Array.from({ length: 20 }, (_, i) => ({
                delay: Math.random() * 2.5,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: 3 + Math.random() * 6,
                duration: 3 + Math.random() * 4,
                drift: -30 + Math.random() * 60,
            })),
        []
    );

    const orbs = useMemo(
        () =>
            Array.from({ length: 6 }, (_, i) => ({
                delay: i * 0.4,
                angle: i * 60,
                radius: 90 + Math.random() * 30,
                size: 4 + Math.random() * 4,
                duration: 6 + Math.random() * 4,
            })),
        []
    );

    return (
        <div aria-label="Pawscord loading" className={`splash-screen ${animationState}`}>
            {/* Mesh gradient background */}
            <div className="splash-bg-mesh" />

            {/* Floating particles */}
            <div className="particles">
                {particles.map((p, i) => (
                    <div
                        key={`p-${i}`}
                        className="particle"
                        style={{
                            '--delay': `${p.delay}s`,
                            '--x': `${p.x}%`,
                            '--y': `${p.y}%`,
                            '--size': `${p.size}px`,
                            '--duration': `${p.duration}s`,
                            '--drift': `${p.drift}px`,
                        }}
                    />
                ))}
            </div>

            {/* Orbiting dots around logo */}
            <div className="orbit-container">
                {orbs.map((o, i) => (
                    <div
                        key={`o-${i}`}
                        className="orbit-dot"
                        style={{
                            '--orbit-delay': `${o.delay}s`,
                            '--orbit-angle': `${o.angle}deg`,
                            '--orbit-radius': `${o.radius}px`,
                            '--orbit-size': `${o.size}px`,
                            '--orbit-duration': `${o.duration}s`,
                        }}
                    />
                ))}
            </div>

            {/* Pulsing rings */}
            <div className="rings-container">
                <div className="ring ring-1" />
                <div className="ring ring-2" />
                <div className="ring ring-3" />
            </div>

            {/* Logo with animated glow */}
            <div className="logo-container">
                <div className="logo-glow" />
                <div className="logo-glow-secondary" />
                <PawLogo />
            </div>

            {/* Animated brand text */}
            <div className="brand-text">
                {LETTERS.map((letter, i) => (
                    <span
                        key={letter + i}
                        className="letter"
                        style={{ animationDelay: `${0.6 + i * 0.09}s` }}
                    >
                        {letter}
                    </span>
                ))}
            </div>

            {/* Shimmer loading bar */}
            <div className="loading-bar">
                <div className="loading-progress" />
                <div className="loading-shimmer" />
            </div>
        </div>
    );
};

SplashScreen.propTypes = {
    animationState: PropTypes.string,
};
export default React.memo(SplashScreen);
