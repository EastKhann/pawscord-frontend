// frontend/src/utils/animationHelpers.js

/**
 * 🎬 Animation Performance Helpers
 * requestAnimationFrame utilities ve performance optimizations
 */

/**
 * Smooth scroll to element
 */
export const smoothScrollTo = (element, duration = 300, offset = 0) => {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function (easeInOutCubic)
        const easing = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * easing);

        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    };

    requestAnimationFrame(animation);
};

/**
 * Throttle with requestAnimationFrame
 */
export const rafThrottle = (callback) => {
    let requestId = null;

    return (...args) => {
        if (requestId !== null) return;

        requestId = requestAnimationFrame(() => {
            callback(...args);
            requestId = null;
        });
    };
};

/**
 * Debounce with requestAnimationFrame
 */
export const rafDebounce = (callback) => {
    let requestId = null;

    return (...args) => {
        if (requestId !== null) {
            cancelAnimationFrame(requestId);
        }

        requestId = requestAnimationFrame(() => {
            callback(...args);
            requestId = null;
        });
    };
};

/**
 * FPS Counter
 */
export class FPSCounter {
    constructor() {
        this.fps = 60;
        this.frames = [];
        this.lastFrameTime = performance.now();
    }

    tick() {
        const now = performance.now();
        const delta = now - this.lastFrameTime;
        this.lastFrameTime = now;

        this.frames.push(delta);
        if (this.frames.length > 60) {
            this.frames.shift();
        }

        const avg = this.frames.reduce((a, b) => a + b, 0) / this.frames.length;
        this.fps = Math.round(1000 / avg);

        return this.fps;
    }

    getFPS() {
        return this.fps;
    }
}

/**
 * Animation Timeline
 */
export class AnimationTimeline {
    constructor() {
        this.animations = [];
        this.isRunning = false;
        this.startTime = null;
        this.currentTime = 0;
    }

    add(animation) {
        this.animations.push({
            ...animation,
            startTime: animation.delay || 0,
            duration: animation.duration || 1000
        });
        return this;
    }

    play() {
        this.isRunning = true;
        this.startTime = performance.now();
        this.tick();
        return this;
    }

    pause() {
        this.isRunning = false;
        return this;
    }

    reset() {
        this.currentTime = 0;
        this.startTime = null;
        this.animations.forEach(anim => anim.onReset?.());
        return this;
    }

    tick() {
        if (!this.isRunning) return;

        const now = performance.now();
        this.currentTime = now - this.startTime;

        this.animations.forEach(anim => {
            const animTime = this.currentTime - anim.startTime;

            if (animTime < 0) return; // Not started yet
            if (animTime > anim.duration) {
                anim.onComplete?.();
                return;
            }

            const progress = animTime / anim.duration;
            const easedProgress = anim.easing ? anim.easing(progress) : progress;

            anim.onUpdate?.(easedProgress);
        });

        requestAnimationFrame(() => this.tick());
    }
}

/**
 * Easing functions
 */
export const Easing = {
    linear: t => t,
    easeInQuad: t => t * t,
    easeOutQuad: t => t * (2 - t),
    easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
    easeInCubic: t => t * t * t,
    easeOutCubic: t => (--t) * t * t + 1,
    easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
    easeInQuart: t => t * t * t * t,
    easeOutQuart: t => 1 - (--t) * t * t * t,
    easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t,
    easeInElastic: t => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
    },
    easeOutBounce: t => {
        const n1 = 7.5625;
        const d1 = 2.75;
        if (t < 1 / d1) return n1 * t * t;
        if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
        if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
        return n1 * (t -= 2.625 / d1) * t + 0.984375;
    }
};

/**
 * Spring animation
 */
export const spring = (target, config = {}) => {
    const {
        stiffness = 100,
        damping = 10,
        mass = 1,
        velocity = 0
    } = config;

    let current = 0;
    let currentVelocity = velocity;

    const update = (dt) => {
        const force = -stiffness * (current - target);
        const dampingForce = -damping * currentVelocity;
        const acceleration = (force + dampingForce) / mass;

        currentVelocity += acceleration * dt;
        current += currentVelocity * dt;

        return current;
    };

    return { update, getValue: () => current };
};

/**
 * Parallax scroll effect
 */
export const createParallaxEffect = (element, speed = 0.5) => {
    const updatePosition = rafThrottle(() => {
        const scrollY = window.pageYOffset;
        const offset = scrollY * speed;
        element.style.transform = `translateY(${offset}px)`;
    });

    window.addEventListener('scroll', updatePosition);

    return () => {
        window.removeEventListener('scroll', updatePosition);
    };
};

/**
 * Fade in/out animation
 */
export const fadeIn = (element, duration = 300) => {
    element.style.opacity = '0';
    element.style.display = 'block';

    const startTime = performance.now();

    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        element.style.opacity = progress.toString();

        if (progress < 1) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
};

export const fadeOut = (element, duration = 300, onComplete) => {
    const startTime = performance.now();

    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        element.style.opacity = (1 - progress).toString();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
            onComplete?.();
        }
    };

    requestAnimationFrame(animate);
};

/**
 * Slide animation
 */
export const slideDown = (element, duration = 300) => {
    element.style.overflow = 'hidden';
    element.style.height = '0';
    element.style.display = 'block';

    const targetHeight = element.scrollHeight;
    const startTime = performance.now();

    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = Easing.easeOutCubic(progress);

        element.style.height = `${targetHeight * easedProgress}px`;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.style.height = '';
            element.style.overflow = '';
        }
    };

    requestAnimationFrame(animate);
};

/**
 * Performance monitor for animations
 */
export const monitorAnimationPerformance = (callback) => {
    let frameCount = 0;
    let lastTime = performance.now();
    let fps = 60;

    const tick = () => {
        frameCount++;
        const now = performance.now();

        if (now >= lastTime + 1000) {
            fps = Math.round((frameCount * 1000) / (now - lastTime));
            frameCount = 0;
            lastTime = now;

            if (fps < 30) {
                console.warn(`⚠️ [Animation] Low FPS detected: ${fps}`);
            }

            callback?.(fps);
        }

        requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
};

export default {
    smoothScrollTo,
    rafThrottle,
    rafDebounce,
    FPSCounter,
    AnimationTimeline,
    Easing,
    spring,
    createParallaxEffect,
    fadeIn,
    fadeOut,
    slideDown,
    monitorAnimationPerformance
};


