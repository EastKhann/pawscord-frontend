// frontend/src/hooks/useModalA11y.js
// Reusable hook: focus trap + Escape close + aria props for modals
import { useEffect, useRef, useCallback } from 'react';

/**
 * useModalA11y - Provides focus trap, Escape-to-close, and ARIA props for modal dialogs.
 *
 * @param {Object} options
 * @param {Function} options.onClose - Called when Escape is pressed or overlay clicked
 * @param {boolean} [options.isOpen=true] - Whether the modal is currently open
 * @param {string} [options.label] - Accessible label for the dialog
 * @returns {{ modalRef, overlayProps, dialogProps }}
 */
export default function useModalA11y({ onClose, isOpen = true, label = '' }) {
    const modalRef = useRef(null);
    const previousFocusRef = useRef(null);

    // Trap focus inside modal
    useEffect(() => {
        if (!isOpen) return;

        previousFocusRef.current = document.activeElement;

        const el = modalRef.current;
        if (!el) return;

        // Auto-focus first focusable element
        const timer = setTimeout(() => {
            const focusable = el.querySelectorAll(
                'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );
            if (focusable.length > 0) {
                focusable[0].focus();
            } else {
                el.setAttribute('tabindex', '-1');
                el.focus();
            }
        }, 50);

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                onClose?.();
                return;
            }

            if (e.key === 'Tab') {
                const focusable = el.querySelectorAll(
                    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
                );
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
            }
        };

        document.addEventListener('keydown', handleKeyDown, true);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('keydown', handleKeyDown, true);
            // Return focus to previously focused element
            if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
                previousFocusRef.current.focus();
            }
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = useCallback((e) => {
        if (e.target === e.currentTarget) {
            onClose?.();
        }
    }, [onClose]);

    const overlayProps = {
        role: 'presentation',
        onClick: handleOverlayClick,
    };

    const dialogProps = {
        ref: modalRef,
        role: 'dialog',
        'aria-modal': true,
        ...(label ? { 'aria-label': label } : {}),
        onClick: (e) => e.stopPropagation(),
    };

    return { modalRef, overlayProps, dialogProps };
}
