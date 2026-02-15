// frontend/src/utils/accessibility.js
// ♿ ACCESSIBILITY (a11y) UTILITIES
// Comprehensive accessibility helpers for PAWSCORD

import React from 'react';

/**
 * ♿ Accessibility Utilities
 * 
 * Features:
 * - Keyboard navigation helpers
 * - ARIA attribute generators
 * - Focus management
 * - Screen reader announcements
 * - Color contrast utilities
 * - Reduced motion detection
 */

// =============================================================================
// 🔊 LIVE ANNOUNCEMENTS (Screen Reader)
// =============================================================================

/**
 * Announce a message to screen readers
 * @param {string} message - The message to announce
 * @param {'polite'|'assertive'} priority - Announcement priority
 */
export const announce = (message, priority = 'polite') => {
    const container = getOrCreateAnnouncementContainer();

    // Clear previous announcements
    container.textContent = '';

    // Set aria-live based on priority
    container.setAttribute('aria-live', priority);

    // Use setTimeout to ensure the DOM update triggers announcement
    setTimeout(() => {
        container.textContent = message;
    }, 100);

    // Clear after announcement
    setTimeout(() => {
        container.textContent = '';
    }, 3000);
};

/**
 * Get or create the announcement container for screen readers
 */
const getOrCreateAnnouncementContainer = () => {
    const containerId = 'pawscord-aria-announcer';
    let container = document.getElementById(containerId);

    if (!container) {
        container = document.createElement('div');
        container.id = containerId;
        container.setAttribute('role', 'status');
        container.setAttribute('aria-live', 'polite');
        container.setAttribute('aria-atomic', 'true');

        // Visually hidden but accessible to screen readers
        Object.assign(container.style, {
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: '0',
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            border: '0',
        });

        document.body.appendChild(container);
    }

    return container;
};

// =============================================================================
// ⌨️ KEYBOARD NAVIGATION
// =============================================================================

/**
 * Key codes for common keyboard interactions
 */
export const Keys = {
    ENTER: 'Enter',
    SPACE: ' ',
    ESCAPE: 'Escape',
    TAB: 'Tab',
    ARROW_UP: 'ArrowUp',
    ARROW_DOWN: 'ArrowDown',
    ARROW_LEFT: 'ArrowLeft',
    ARROW_RIGHT: 'ArrowRight',
    HOME: 'Home',
    END: 'End',
    PAGE_UP: 'PageUp',
    PAGE_DOWN: 'PageDown',
};

/**
 * Handle keyboard navigation for a list of items
 * @param {KeyboardEvent} event - The keyboard event
 * @param {number} currentIndex - Current focused item index
 * @param {number} itemCount - Total number of items
 * @param {Object} options - Configuration options
 */
export const handleListKeyDown = (event, currentIndex, itemCount, options = {}) => {
    const {
        onSelect = () => { },
        onFocusChange = () => { },
        onEscape = () => { },
        wrap = true,
        horizontal = false,
    } = options;

    const nextKey = horizontal ? Keys.ARROW_RIGHT : Keys.ARROW_DOWN;
    const prevKey = horizontal ? Keys.ARROW_LEFT : Keys.ARROW_UP;

    let newIndex = currentIndex;
    let handled = true;

    switch (event.key) {
        case nextKey:
            newIndex = currentIndex + 1;
            if (newIndex >= itemCount) {
                newIndex = wrap ? 0 : itemCount - 1;
            }
            break;

        case prevKey:
            newIndex = currentIndex - 1;
            if (newIndex < 0) {
                newIndex = wrap ? itemCount - 1 : 0;
            }
            break;

        case Keys.HOME:
            newIndex = 0;
            break;

        case Keys.END:
            newIndex = itemCount - 1;
            break;

        case Keys.ENTER:
        case Keys.SPACE:
            event.preventDefault();
            onSelect(currentIndex);
            return;

        case Keys.ESCAPE:
            onEscape();
            return;

        default:
            handled = false;
    }

    if (handled && newIndex !== currentIndex) {
        event.preventDefault();
        onFocusChange(newIndex);
    }
};

/**
 * Create roving tabindex handler for a group of elements
 * @param {HTMLElement[]} elements - Array of focusable elements
 * @param {Object} options - Configuration options
 */
export const createRovingTabIndex = (elements, options = {}) => {
    const { wrap = true, horizontal = false, onFocus = () => { } } = options;
    let currentIndex = 0;

    // Initialize tabindex
    elements.forEach((el, i) => {
        el.setAttribute('tabindex', i === 0 ? '0' : '-1');
    });

    const focusElement = (index) => {
        // Remove focus from current
        elements[currentIndex]?.setAttribute('tabindex', '-1');

        // Set focus to new
        currentIndex = index;
        const element = elements[currentIndex];
        if (element) {
            element.setAttribute('tabindex', '0');
            element.focus();
            onFocus(index, element);
        }
    };

    const handleKeyDown = (event) => {
        const nextKey = horizontal ? Keys.ARROW_RIGHT : Keys.ARROW_DOWN;
        const prevKey = horizontal ? Keys.ARROW_LEFT : Keys.ARROW_UP;

        let newIndex = currentIndex;

        switch (event.key) {
            case nextKey:
                newIndex = currentIndex + 1;
                if (newIndex >= elements.length) {
                    newIndex = wrap ? 0 : elements.length - 1;
                }
                break;

            case prevKey:
                newIndex = currentIndex - 1;
                if (newIndex < 0) {
                    newIndex = wrap ? elements.length - 1 : 0;
                }
                break;

            case Keys.HOME:
                newIndex = 0;
                break;

            case Keys.END:
                newIndex = elements.length - 1;
                break;

            default:
                return;
        }

        if (newIndex !== currentIndex) {
            event.preventDefault();
            focusElement(newIndex);
        }
    };

    // Attach event listeners
    elements.forEach((el) => {
        el.addEventListener('keydown', handleKeyDown);
    });

    return {
        focusFirst: () => focusElement(0),
        focusLast: () => focusElement(elements.length - 1),
        focusIndex: focusElement,
        getCurrentIndex: () => currentIndex,
        destroy: () => {
            elements.forEach((el) => {
                el.removeEventListener('keydown', handleKeyDown);
            });
        },
    };
};

// =============================================================================
// 🎯 FOCUS MANAGEMENT
// =============================================================================

/**
 * Trap focus within a container (for modals, dialogs)
 * @param {HTMLElement} container - The container to trap focus in
 * @param {Object} options - Configuration options
 */
export const createFocusTrap = (container, options = {}) => {
    const { initialFocus = null, onEscape = null } = options;

    const focusableSelector = [
        'a[href]',
        'button:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        'textarea:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    let previouslyFocused = document.activeElement;

    const getFocusableElements = () => {
        return Array.from(container.querySelectorAll(focusableSelector))
            .filter(el => el.offsetParent !== null); // Only visible elements
    };

    const handleKeyDown = (event) => {
        if (event.key === Keys.ESCAPE && onEscape) {
            onEscape();
            return;
        }

        if (event.key !== Keys.TAB) return;

        const focusableElements = getFocusableElements();
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
            // Shift + Tab: Go backwards
            if (document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab: Go forwards
            if (document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    };

    const activate = () => {
        container.addEventListener('keydown', handleKeyDown);

        // Focus initial element or first focusable
        if (initialFocus) {
            initialFocus.focus();
        } else {
            const focusableElements = getFocusableElements();
            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            }
        }
    };

    const deactivate = () => {
        container.removeEventListener('keydown', handleKeyDown);

        // Return focus to previously focused element
        if (previouslyFocused && previouslyFocused.focus) {
            previouslyFocused.focus();
        }
    };

    return { activate, deactivate };
};

/**
 * Skip link functionality for keyboard navigation
 * @param {string} targetId - The ID of the main content to skip to
 */
export const createSkipLink = (targetId) => {
    const skipLink = document.createElement('a');
    skipLink.href = `${targetId}`;
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Ana içeriğe geç';

    Object.assign(skipLink.style, {
        position: 'absolute',
        top: '-40px',
        left: '0',
        padding: '8px 16px',
        backgroundColor: '#5865f2',
        color: '#fff',
        zIndex: '10000',
        textDecoration: 'none',
        transition: 'top 0.3s',
    });

    skipLink.addEventListener('focus', () => {
        skipLink.style.top = '0';
    });

    skipLink.addEventListener('blur', () => {
        skipLink.style.top = '-40px';
    });

    document.body.insertBefore(skipLink, document.body.firstChild);

    return skipLink;
};

// =============================================================================
// 🏷️ ARIA HELPERS
// =============================================================================

/**
 * Generate ARIA props for a button
 * @param {Object} options - Configuration options
 */
export const getButtonAriaProps = (options = {}) => {
    const {
        label,
        description,
        expanded,
        pressed,
        disabled,
        hasPopup,
        controls,
    } = options;

    const props = {};

    if (label) props['aria-label'] = label;
    if (description) props['aria-describedby'] = description;
    if (expanded !== undefined) props['aria-expanded'] = expanded;
    if (pressed !== undefined) props['aria-pressed'] = pressed;
    if (disabled) props['aria-disabled'] = disabled;
    if (hasPopup) props['aria-haspopup'] = hasPopup;
    if (controls) props['aria-controls'] = controls;

    return props;
};

/**
 * Generate ARIA props for a menu
 * @param {Object} options - Configuration options
 */
export const getMenuAriaProps = (options = {}) => {
    const { label, orientation = 'vertical', activeDescendant } = options;

    return {
        role: 'menu',
        'aria-label': label,
        'aria-orientation': orientation,
        ...(activeDescendant && { 'aria-activedescendant': activeDescendant }),
    };
};

/**
 * Generate ARIA props for a menu item
 * @param {Object} options - Configuration options
 */
export const getMenuItemAriaProps = (options = {}) => {
    const { selected, disabled, hasSubmenu } = options;

    return {
        role: 'menuitem',
        ...(selected !== undefined && { 'aria-selected': selected }),
        ...(disabled && { 'aria-disabled': disabled }),
        ...(hasSubmenu && { 'aria-haspopup': 'menu' }),
    };
};

/**
 * Generate ARIA props for a dialog/modal
 * @param {Object} options - Configuration options
 */
export const getDialogAriaProps = (options = {}) => {
    const { labelledBy, describedBy, modal = true } = options;

    return {
        role: 'dialog',
        'aria-modal': modal,
        ...(labelledBy && { 'aria-labelledby': labelledBy }),
        ...(describedBy && { 'aria-describedby': describedBy }),
    };
};

/**
 * Generate ARIA props for a tab
 * @param {Object} options - Configuration options
 */
export const getTabAriaProps = (options = {}) => {
    const { id, panelId, selected, disabled } = options;

    return {
        role: 'tab',
        id,
        'aria-controls': panelId,
        'aria-selected': selected,
        ...(disabled && { 'aria-disabled': disabled }),
        tabIndex: selected ? 0 : -1,
    };
};

/**
 * Generate ARIA props for a tab panel
 * @param {Object} options - Configuration options
 */
export const getTabPanelAriaProps = (options = {}) => {
    const { id, tabId, hidden } = options;

    return {
        role: 'tabpanel',
        id,
        'aria-labelledby': tabId,
        hidden,
        tabIndex: 0,
    };
};

// =============================================================================
// 🎨 COLOR & CONTRAST
// =============================================================================

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if user prefers dark color scheme
 */
export const prefersDarkScheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Check if user prefers high contrast
 */
export const prefersHighContrast = () => {
    return window.matchMedia('(prefers-contrast: more)').matches;
};

/**
 * Calculate relative luminance of a color
 * @param {number} r - Red (0-255)
 * @param {number} g - Green (0-255)
 * @param {number} b - Blue (0-255)
 */
export const getLuminance = (r, g, b) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/**
 * Calculate contrast ratio between two colors
 * @param {string} color1 - First color in hex format
 * @param {string} color2 - Second color in hex format
 */
export const getContrastRatio = (color1, color2) => {
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
        } : null;
    };

    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    if (!rgb1 || !rgb2) return null;

    const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);

    return (lighter + 0.05) / (darker + 0.05);
};

/**
 * Check if contrast ratio meets WCAG standards
 * @param {string} foreground - Foreground color in hex
 * @param {string} background - Background color in hex
 * @param {'AA'|'AAA'} level - WCAG conformance level
 * @param {'normal'|'large'} textSize - Text size category
 */
export const meetsContrastRequirements = (foreground, background, level = 'AA', textSize = 'normal') => {
    const ratio = getContrastRatio(foreground, background);
    if (ratio === null) return null;

    const requirements = {
        AA: { normal: 4.5, large: 3 },
        AAA: { normal: 7, large: 4.5 },
    };

    return ratio >= requirements[level][textSize];
};

// =============================================================================
// 🔧 UTILITY HOOKS
// =============================================================================

/**
 * React hook for reduced motion preference
 */
export const useReducedMotion = () => {
    const [prefersReduced, setPrefersReduced] = React.useState(prefersReducedMotion);

    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        const handler = (e) => setPrefersReduced(e.matches);

        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return prefersReduced;
};

/**
 * React hook for focus management
 */
export const useFocusReturn = () => {
    const returnFocusRef = React.useRef(null);

    React.useEffect(() => {
        returnFocusRef.current = document.activeElement;

        return () => {
            if (returnFocusRef.current && returnFocusRef.current.focus) {
                returnFocusRef.current.focus();
            }
        };
    }, []);

    return returnFocusRef;
};

/**
 * React hook for keyboard shortcuts
 */
export const useKeyboardShortcut = (key, callback, options = {}) => {
    const { ctrl = false, shift = false, alt = false, preventDefault = true } = options;

    React.useEffect(() => {
        const handler = (event) => {
            if (
                event.key === key &&
                event.ctrlKey === ctrl &&
                event.shiftKey === shift &&
                event.altKey === alt
            ) {
                if (preventDefault) {
                    event.preventDefault();
                }
                callback(event);
            }
        };

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [key, ctrl, shift, alt, callback, preventDefault]);
};

export default {
    announce,
    Keys,
    handleListKeyDown,
    createRovingTabIndex,
    createFocusTrap,
    createSkipLink,
    getButtonAriaProps,
    getMenuAriaProps,
    getMenuItemAriaProps,
    getDialogAriaProps,
    getTabAriaProps,
    getTabPanelAriaProps,
    prefersReducedMotion,
    prefersDarkScheme,
    prefersHighContrast,
    getLuminance,
    getContrastRatio,
    meetsContrastRequirements,
    useReducedMotion,
    useFocusReturn,
    useKeyboardShortcut,
};
