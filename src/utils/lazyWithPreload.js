// ⚡ OPTIMIZATION: Enhanced lazy loading with preload capability
// Allows preloading of components before they're needed

import { lazy } from 'react';

/**
 * Enhanced React.lazy with preload support
 * @param {Function} factory - Dynamic import function
 * @returns {Object} - Component with preload method
 */
export function lazyWithPreload(factory) {
    let LoadedComponent = null;
    let factoryPromise = null;

    const LazyComponent = lazy(() => {
        if (!factoryPromise) {
            factoryPromise = factory().then(module => {
                LoadedComponent = module;
                return module;
            });
        }
        return factoryPromise;
    });

    // Add preload method to component
    LazyComponent.preload = () => {
        if (!factoryPromise) {
            factoryPromise = factory().then(module => {
                LoadedComponent = module;
                return module;
            });
        }
        return factoryPromise;
    };

    // Add check method to see if already loaded
    LazyComponent.isLoaded = () => LoadedComponent !== null;

    return LazyComponent;
}

/**
 * Preload multiple components at once
 * @param {Array} components - Array of components with preload method
 */
export function preloadComponents(components) {
    return Promise.all(
        components.map(component =>
            component.preload ? component.preload() : Promise.resolve()
        )
    );
}

/**
 * Preload components on hover (for better UX)
 * @param {Function} preloadFn - Function that returns a promise
 * @returns {Object} - onMouseEnter and onTouchStart handlers
 */
export function usePreloadOnHover(preloadFn) {
    let preloadTimer = null;

    const handleMouseEnter = () => {
        // Delay preload slightly to avoid unnecessary loads
        preloadTimer = setTimeout(() => {
            preloadFn();
        }, 50);
    };

    const handleMouseLeave = () => {
        if (preloadTimer) {
            clearTimeout(preloadTimer);
        }
    };

    return {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
        onTouchStart: preloadFn, // Immediate on touch devices
    };
}

// Example usage:
/*
const MyComponent = lazyWithPreload(() => import('./MyComponent'));

// Later, preload before user navigates
MyComponent.preload();

// Or use hover preloading
function NavButton() {
  const preloadHandlers = usePreloadOnHover(() => MyComponent.preload());
  return <button {...preloadHandlers}>Open Modal</button>;
}
*/
