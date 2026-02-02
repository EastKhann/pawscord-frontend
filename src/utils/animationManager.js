// frontend/src/utils/animationManager.js

/**
 * 🎬 Animation Manager
 * Performant animations with FLIP, RAF, and GPU acceleration
 */

class AnimationManager {
    constructor(options = {}) {
        this.animations = new Map();
        this.rafId = null;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.defaultDuration = options.defaultDuration || 300;
        this.defaultEasing = options.defaultEasing || 'ease-out';

        this.easings = {
            linear: t => t,
            easeIn: t => t * t,
            easeOut: t => t * (2 - t),
            easeInOut: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
            easeInCubic: t => t * t * t,
            easeOutCubic: t => (--t) * t * t + 1,
            easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
            easeInQuart: t => t * t * t * t,
            easeOutQuart: t => 1 - (--t) * t * t * t,
            easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
            easeInQuint: t => t * t * t * t * t,
            easeOutQuint: t => 1 + (--t) * t * t * t * t,
            easeInOutQuint: t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t,
            elastic: t => {
                const p = 0.3;
                return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
            },
            bounce: t => {
                if (t < 1 / 2.75) {
                    return 7.5625 * t * t;
                } else if (t < 2 / 2.75) {
                    return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
                } else if (t < 2.5 / 2.75) {
                    return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
                } else {
                    return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
                }
            }
        };

        this.init();
    }

    /**
     * Initialize
     */
    init() {
        // Listen for reduced motion preference changes
        window.matchMedia('(prefers-reduced-motion: reduce)')
            .addEventListener('change', (e) => {
                this.prefersReducedMotion = e.matches;
                if (e.matches) {
                    this.cancelAll();
                }
            });
    }

    /**
     * Animate element with FLIP technique
     * First, Last, Invert, Play
     */
    flip(element, callback, options = {}) {
        if (this.prefersReducedMotion) {
            callback();
            return Promise.resolve();
        }

        const { duration = this.defaultDuration } = options;

        // First: Get initial position
        const first = element.getBoundingClientRect();

        // Invoke callback (changes DOM)
        callback();

        // Last: Get final position
        const last = element.getBoundingClientRect();

        // Invert: Calculate difference
        const deltaX = first.left - last.left;
        const deltaY = first.top - last.top;
        const deltaW = first.width / last.width;
        const deltaH = first.height / last.height;

        // Play: Animate from inverted to normal
        return this.animate(element, {
            transform: [
                `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`,
                'translate(0, 0) scale(1, 1)'
            ]
        }, { duration, easing: 'easeOutCubic' });
    }

    /**
     * Animate element properties
     */
    animate(element, properties, options = {}) {
        if (this.prefersReducedMotion && !options.force) {
            // Skip animation, apply final state
            Object.keys(properties).forEach(prop => {
                const value = Array.isArray(properties[prop])
                    ? properties[prop][properties[prop].length - 1]
                    : properties[prop];
                element.style[prop] = value;
            });
            return Promise.resolve();
        }

        const {
            duration = this.defaultDuration,
            easing = this.defaultEasing,
            delay = 0,
            onProgress,
            onComplete
        } = options;

        const id = `${Date.now()}-${Math.random()}`;
        const startTime = performance.now() + delay;

        return new Promise((resolve) => {
            const tick = (currentTime) => {
                if (currentTime < startTime) {
                    this.rafId = requestAnimationFrame(tick);
                    return;
                }

                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easedProgress = typeof easing === 'function'
                    ? easing(progress)
                    : this.easings[easing]
                        ? this.easings[easing](progress)
                        : progress;

                // Apply properties
                Object.keys(properties).forEach(prop => {
                    const value = properties[prop];

                    if (Array.isArray(value)) {
                        // Interpolate between values
                        const from = this.parseValue(value[0]);
                        const to = this.parseValue(value[1]);
                        const current = this.interpolate(from, to, easedProgress);
                        element.style[prop] = this.formatValue(current, from.unit);
                    } else {
                        element.style[prop] = value;
                    }
                });

                if (onProgress) {
                    onProgress(easedProgress);
                }

                if (progress < 1) {
                    this.rafId = requestAnimationFrame(tick);
                } else {
                    this.animations.delete(id);
                    if (onComplete) onComplete();
                    resolve();
                }
            };

            this.animations.set(id, { cancel: () => cancelAnimationFrame(this.rafId) });
            this.rafId = requestAnimationFrame(tick);
        });
    }

    /**
     * Parse CSS value
     */
    parseValue(value) {
        const match = String(value).match(/^([-\d.]+)([a-z%]*)$/i);
        if (!match) return { value: 0, unit: '' };

        return {
            value: parseFloat(match[1]),
            unit: match[2] || ''
        };
    }

    /**
     * Interpolate between values
     */
    interpolate(from, to, progress) {
        return {
            value: from.value + (to.value - from.value) * progress,
            unit: to.unit || from.unit
        };
    }

    /**
     * Format value with unit
     */
    formatValue(parsed, defaultUnit = '') {
        return `${parsed.value}${parsed.unit || defaultUnit}`;
    }

    /**
     * Fade in
     */
    fadeIn(element, options = {}) {
        element.style.opacity = '0';
        return this.animate(element, {
            opacity: ['0', '1']
        }, options);
    }

    /**
     * Fade out
     */
    fadeOut(element, options = {}) {
        return this.animate(element, {
            opacity: ['1', '0']
        }, options);
    }

    /**
     * Slide in
     */
    slideIn(element, direction = 'down', options = {}) {
        const transforms = {
            up: ['translateY(20px)', 'translateY(0)'],
            down: ['translateY(-20px)', 'translateY(0)'],
            left: ['translateX(20px)', 'translateX(0)'],
            right: ['translateX(-20px)', 'translateX(0)']
        };

        element.style.opacity = '0';
        return this.animate(element, {
            opacity: ['0', '1'],
            transform: transforms[direction]
        }, options);
    }

    /**
     * Scale in
     */
    scaleIn(element, options = {}) {
        element.style.opacity = '0';
        return this.animate(element, {
            opacity: ['0', '1'],
            transform: ['scale(0.8)', 'scale(1)']
        }, options);
    }

    /**
     * Bounce
     */
    bounce(element, options = {}) {
        return this.animate(element, {
            transform: [
                'translateY(0)',
                'translateY(-20px)',
                'translateY(0)',
                'translateY(-10px)',
                'translateY(0)'
            ]
        }, { ...options, easing: 'bounce' });
    }

    /**
     * Shake
     */
    shake(element, options = {}) {
        const { intensity = 10 } = options;
        return this.animate(element, {
            transform: [
                'translateX(0)',
                `translateX(-${intensity}px)`,
                `translateX(${intensity}px)`,
                `translateX(-${intensity}px)`,
                `translateX(${intensity}px)`,
                'translateX(0)'
            ]
        }, { ...options, duration: 400 });
    }

    /**
     * Pulse
     */
    pulse(element, options = {}) {
        return this.animate(element, {
            transform: ['scale(1)', 'scale(1.05)', 'scale(1)']
        }, { ...options, duration: 600 });
    }

    /**
     * Stagger animations
     */
    stagger(elements, animationFn, options = {}) {
        const { staggerDelay = 50 } = options;

        return Promise.all(
            Array.from(elements).map((element, index) => {
                return animationFn(element, {
                    ...options,
                    delay: index * staggerDelay
                });
            })
        );
    }

    /**
     * Sequence animations
     */
    sequence(animations) {
        return animations.reduce((promise, anim) => {
            return promise.then(() => anim());
        }, Promise.resolve());
    }

    /**
     * Cancel animation
     */
    cancel(id) {
        const animation = this.animations.get(id);
        if (animation) {
            animation.cancel();
            this.animations.delete(id);
        }
    }

    /**
     * Cancel all animations
     */
    cancelAll() {
        this.animations.forEach(animation => animation.cancel());
        this.animations.clear();
    }

    /**
     * Check if element is in viewport
     */
    isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= -offset &&
            rect.left >= -offset &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) + offset
        );
    }

    /**
     * Animate on scroll into view
     */
    animateOnScroll(element, animationFn, options = {}) {
        const { offset = 100, once = true } = options;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animationFn(entry.target, options);
                    if (once) {
                        observer.unobserve(entry.target);
                    }
                }
            });
        }, {
            rootMargin: `${offset}px`
        });

        observer.observe(element);

        return () => observer.unobserve(element);
    }
}

// Global instance
export const animationManager = new AnimationManager();

/**
 * React Hook - Animate on mount
 */
export const useAnimateOnMount = (animationType = 'fadeIn', options = {}) => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (ref.current) {
            animationManager[animationType](ref.current, options);
        }
    }, [animationType, options]);

    return ref;
};

/**
 * React Hook - FLIP animation
 */
export const useFLIP = (deps = []) => {
    const ref = React.useRef(null);

    const animate = React.useCallback((callback) => {
        if (ref.current) {
            return animationManager.flip(ref.current, callback);
        }
        return Promise.resolve();
    }, deps);

    return [ref, animate];
};

/**
 * React Hook - Animate on scroll
 */
export const useAnimateOnScroll = (animationType = 'fadeIn', options = {}) => {
    const ref = React.useRef(null);

    React.useEffect(() => {
        if (ref.current) {
            return animationManager.animateOnScroll(
                ref.current,
                (el) => animationManager[animationType](el, options),
                options
            );
        }
    }, [animationType, options]);

    return ref;
};

/**
 * Utility: Add GPU acceleration
 */
export const enableGPU = (element) => {
    element.style.transform = 'translateZ(0)';
    element.style.willChange = 'transform, opacity';
};

/**
 * Utility: Remove GPU acceleration
 */
export const disableGPU = (element) => {
    element.style.willChange = 'auto';
};

export default AnimationManager;


