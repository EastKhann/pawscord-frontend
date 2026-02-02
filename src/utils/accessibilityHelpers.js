// frontend/src/utils/accessibilityHelpers.js

/**
 * ♿ Accessibility Utilities
 * A11y helpers for better accessibility
 */

class AccessibilityManager {
    constructor(options = {}) {
        this.announcer = null;
        this.focusTrapStack = [];
        this.init();
    }

    /**
     * Initialize
     */
    init() {
        // Create live region announcer
        this.createAnnouncer();

        // Keyboard navigation helpers
        this.initKeyboardHelpers();

        // Focus visible polyfill
        this.initFocusVisible();
    }

    /**
     * Create live region for screen readers
     */
    createAnnouncer() {
        this.announcer = document.createElement('div');
        this.announcer.setAttribute('aria-live', 'polite');
        this.announcer.setAttribute('aria-atomic', 'true');
        this.announcer.setAttribute('role', 'status');
        this.announcer.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
        document.body.appendChild(this.announcer);
    }

    /**
     * Announce message to screen readers
     */
    announce(message, priority = 'polite') {
        if (!this.announcer) return;

        this.announcer.setAttribute('aria-live', priority);
        this.announcer.textContent = '';

        // Use timeout to ensure announcement
        setTimeout(() => {
            this.announcer.textContent = message;
        }, 100);

        if (import.meta.env.MODE === 'development') {
            console.log(`♿ [A11y] Announced: ${message} (${priority})`);
        }
    }

    /**
     * Initialize keyboard helpers
     */
    initKeyboardHelpers() {
        // Skip to main content
        this.createSkipLink();

        // Escape key handler for modals
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.focusTrapStack.length > 0) {
                const trap = this.focusTrapStack[this.focusTrapStack.length - 1];
                if (trap.onEscape) trap.onEscape();
            }
        });
    }

    /**
     * Create skip to main content link
     */
    createSkipLink() {
        const skip = document.createElement('a');
        skip.href = '#main-content';
        skip.className = 'skip-link';
        skip.textContent = 'Skip to main content';
        skip.style.cssText = `
      position: absolute;
      left: -10000px;
      top: auto;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;

        skip.addEventListener('focus', () => {
            skip.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        background: #000;
        color: #fff;
        padding: 10px;
        z-index: 10000;
        width: auto;
        height: auto;
      `;
        });

        skip.addEventListener('blur', () => {
            skip.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      `;
        });

        document.body.insertBefore(skip, document.body.firstChild);
    }

    /**
     * Focus visible polyfill
     */
    initFocusVisible() {
        let hadKeyboardEvent = true;

        const addFocusVisibleClass = (el) => {
            if (hadKeyboardEvent) {
                el.classList.add('focus-visible');
            }
        };

        const removeFocusVisibleClass = (el) => {
            el.classList.remove('focus-visible');
        };

        document.addEventListener('keydown', () => {
            hadKeyboardEvent = true;
        }, true);

        document.addEventListener('mousedown', () => {
            hadKeyboardEvent = false;
        }, true);

        document.addEventListener('focus', (e) => {
            addFocusVisibleClass(e.target);
        }, true);

        document.addEventListener('blur', (e) => {
            removeFocusVisibleClass(e.target);
        }, true);
    }

    /**
     * Trap focus within element
     */
    trapFocus(element, options = {}) {
        const { onEscape, returnFocus = true } = options;

        const previouslyFocused = document.activeElement;

        const focusableElements = element.querySelectorAll(
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        const handleTabKey = (e) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable?.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable?.focus();
                    e.preventDefault();
                }
            }
        };

        element.addEventListener('keydown', handleTabKey);

        // Focus first element
        firstFocusable?.focus();

        const trap = {
            element,
            onEscape,
            release: () => {
                element.removeEventListener('keydown', handleTabKey);

                if (returnFocus && previouslyFocused) {
                    previouslyFocused.focus();
                }

                const index = this.focusTrapStack.indexOf(trap);
                if (index > -1) {
                    this.focusTrapStack.splice(index, 1);
                }
            }
        };

        this.focusTrapStack.push(trap);

        return trap.release;
    }

    /**
     * Set aria-label
     */
    setAriaLabel(element, label) {
        element.setAttribute('aria-label', label);
    }

    /**
     * Set aria-describedby
     */
    setAriaDescribedBy(element, id) {
        element.setAttribute('aria-describedby', id);
    }

    /**
     * Toggle aria-expanded
     */
    toggleAriaExpanded(element) {
        const expanded = element.getAttribute('aria-expanded') === 'true';
        element.setAttribute('aria-expanded', !expanded);
    }

    /**
     * Set aria-hidden
     */
    setAriaHidden(element, hidden) {
        element.setAttribute('aria-hidden', hidden);

        // Also set inert if available
        if ('inert' in element) {
            element.inert = hidden;
        }
    }

    /**
     * Make element keyboard accessible
     */
    makeKeyboardAccessible(element, onClick) {
        element.setAttribute('tabindex', '0');
        element.setAttribute('role', 'button');

        element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e);
            }
        });
    }

    /**
     * Get color contrast ratio
     */
    getContrastRatio(color1, color2) {
        const getLuminance = (color) => {
            const rgb = this.hexToRgb(color);
            const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(v => {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * r + 0.7152 * g + 0.0722 * b;
        };

        const l1 = getLuminance(color1);
        const l2 = getLuminance(color2);
        const lighter = Math.max(l1, l2);
        const darker = Math.min(l1, l2);

        return (lighter + 0.05) / (darker + 0.05);
    }

    /**
     * Check WCAG compliance
     */
    checkWCAGCompliance(color1, color2, level = 'AA', size = 'normal') {
        const ratio = this.getContrastRatio(color1, color2);

        const requirements = {
            'AA': { normal: 4.5, large: 3 },
            'AAA': { normal: 7, large: 4.5 }
        };

        const required = requirements[level][size];
        return {
            ratio: ratio.toFixed(2),
            passes: ratio >= required,
            required,
            level,
            size
        };
    }

    /**
     * Hex to RGB
     */
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    /**
     * Generate unique ID
     */
    generateId(prefix = 'a11y') {
        return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
    }
}

// Global instance
export const a11y = new AccessibilityManager();

/**
 * React Hook - Announcer
 */
export const useAnnouncer = () => {
    const announce = React.useCallback((message, priority = 'polite') => {
        a11y.announce(message, priority);
    }, []);

    return announce;
};

/**
 * React Hook - Focus Trap
 */
export const useFocusTrap = (ref, active = true, options = {}) => {
    React.useEffect(() => {
        if (active && ref.current) {
            return a11y.trapFocus(ref.current, options);
        }
    }, [ref, active, options]);
};

/**
 * React Hook - Keyboard Navigation
 */
export const useKeyboardNav = (keys, handler) => {
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if (keys.includes(e.key)) {
                handler(e);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [keys, handler]);
};

/**
 * ARIA Props Helper
 */
export const ariaProps = {
    button: (label, expanded) => ({
        role: 'button',
        'aria-label': label,
        'aria-expanded': expanded,
        tabIndex: 0
    }),

    dialog: (labelId, describedById) => ({
        role: 'dialog',
        'aria-modal': true,
        'aria-labelledby': labelId,
        'aria-describedby': describedById
    }),

    menu: (label) => ({
        role: 'menu',
        'aria-label': label
    }),

    menuItem: () => ({
        role: 'menuitem',
        tabIndex: -1
    }),

    tab: (selected, controls) => ({
        role: 'tab',
        'aria-selected': selected,
        'aria-controls': controls,
        tabIndex: selected ? 0 : -1
    }),

    tabPanel: (labelledBy, hidden) => ({
        role: 'tabpanel',
        'aria-labelledby': labelledBy,
        'aria-hidden': hidden,
        tabIndex: 0
    })
};

export default AccessibilityManager;


