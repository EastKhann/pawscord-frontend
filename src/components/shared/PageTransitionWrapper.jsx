// frontend/src/components/PageTransitionWrapper.jsx
// Lightweight route-change fade+slide animation — zero extra dependencies
// Must be rendered inside a <Router> so useLocation works.

import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './PageTransitionWrapper.css';

import PropTypes from 'prop-types';

/**
 * Wraps any children (typically <Routes>) and re-triggers the CSS keyframe
 * animation every time the pathname changes, creating a smooth page transition.
 *
 * Usage in main.jsx:
 *   <HashRouter>
 *     <SignalNotification />
 *     <PageTransitionWrapper>
 *       <Routes>…</Routes>
 *     </PageTransitionWrapper>
 *   </HashRouter>
 */
const PageTransitionWrapper = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const location = useLocation();
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Remove the animation class, force a reflow, then re-add it.
        // This restarts the CSS keyframe animation on every navigation.
        el.classList.remove('page-transition-active');
        void el.offsetWidth; // trigger reflow
        el.classList.add('page-transition-active');
    }, [location.pathname]);

    return (
        <div
            aria-label="page transition wrapper"
            ref={ref}
            className="page-transition-wrapper page-transition-active"
        >
            {children}
        </div>
    );
};

PageTransitionWrapper.propTypes = {
    children: PropTypes.node,
};

export default PageTransitionWrapper;
