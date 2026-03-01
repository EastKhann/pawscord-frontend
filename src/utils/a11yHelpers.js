// frontend/src/utils/a11yHelpers.js
// ♿ Lightweight A11y Helpers — reusable accessibility utilities

/**
 * Announce a message to screen readers via a live region.
 * Creates or reuses a visually-hidden aria-live element.
 * @param {string} message - Text to announce
 * @param {'polite'|'assertive'} priority - Urgency level
 */
export function announceToScreenReader(message, priority = 'polite') {
    let container = document.getElementById('a11y-live-region');
    if (!container) {
        container = document.createElement('div');
        container.id = 'a11y-live-region';
        container.setAttribute('aria-live', priority);
        container.setAttribute('aria-atomic', 'true');
        container.setAttribute('role', 'status');
        Object.assign(container.style, {
            position: 'absolute',
            left: '-10000px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
        });
        document.body.appendChild(container);
    }
    // Update priority if changed
    container.setAttribute('aria-live', priority);
    // Clear then set (browsers need a DOM mutation to re-announce)
    container.textContent = '';
    setTimeout(() => {
        container.textContent = message;
    }, 50);
    // Auto-clear after 5 s
    setTimeout(() => {
        if (container) container.textContent = '';
    }, 5000);
}

/**
 * Trap keyboard focus inside a container element.
 * Returns a cleanup function to release the trap.
 * @param {React.RefObject|HTMLElement} containerRef - Ref or DOM element
 * @returns {() => void} release — call to remove the trap
 */
export function trapFocus(containerRef) {
    const el = containerRef?.current ?? containerRef;
    if (!el) return () => { };

    const FOCUSABLE = 'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const previouslyFocused = document.activeElement;

    const handleKeyDown = (e) => {
        if (e.key !== 'Tab') return;
        const focusable = [...el.querySelectorAll(FOCUSABLE)];
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === first) {
                last.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === last) {
                first.focus();
                e.preventDefault();
            }
        }
    };

    el.addEventListener('keydown', handleKeyDown);
    // Focus first focusable child
    const first = el.querySelector(FOCUSABLE);
    if (first) first.focus();

    return () => {
        el.removeEventListener('keydown', handleKeyDown);
        if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
            previouslyFocused.focus();
        }
    };
}

/**
 * Generate a human-readable aria-label from a context string.
 * E.g. getAriaLabel('send-message') → "Send message"
 * @param {string} context - kebab-case, camelCase, or snake_case identifier
 * @param {string} [extra] - Optional extra descriptor appended
 * @returns {string}
 */
export function getAriaLabel(context, extra) {
    if (!context) return '';
    // Convert kebab / snake / camel to space-separated words
    const label = context
        .replace(/[-_]/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .trim();
    return extra ? `${label} ${extra}` : label;
}
