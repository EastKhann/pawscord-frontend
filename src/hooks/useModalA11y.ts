// frontend/src/hooks/useModalA11y.ts
// Reusable hook: focus trap + Escape close + aria props for modals

import { useEffect, useRef, useCallback, RefObject } from 'react';

interface UseModalA11yOptions {
    onClose?: () => void;
    isOpen?: boolean;
    label?: string;
}

interface OverlayProps {
    role: string;
    onClick: (e: React.MouseEvent) => void;
}

interface DialogProps {
    ref: RefObject<HTMLElement | null>;
    role: string;
    'aria-modal': boolean;
    'aria-label'?: string;
    onClick: (e: React.MouseEvent) => void;
}

interface UseModalA11yReturn {
    modalRef: RefObject<HTMLElement | null>;
    overlayProps: OverlayProps;
    dialogProps: DialogProps;
}

/**
 * useModalA11y - Provides focus trap, Escape-to-close, and ARIA props for modal dialogs.
 *
 * @param options.onClose - Called when Escape is pressed or overlay clicked
 * @param options.isOpen - Whether the modal is currently open
 * @param options.label - Accessible label for the dialog
 */
export default function useModalA11y({
    onClose,
    isOpen = true,
    label = '',
}: UseModalA11yOptions): UseModalA11yReturn {
    const modalRef = useRef<HTMLElement | null>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!isOpen) return;

        previousFocusRef.current = document.activeElement as HTMLElement | null;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.stopPropagation();
                onClose?.();
                return;
            }
            const el = modalRef.current;
            if (e.key === 'Tab' && el) {
                const FOCUSABLE =
                    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
                const focusable = el.querySelectorAll<HTMLElement>(FOCUSABLE);
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

        // Focus management (only if ref is attached)
        const el = modalRef.current;
        const FOCUSABLE =
            'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const timer = setTimeout(() => {
            if (el) {
                const focusable = el.querySelectorAll<HTMLElement>(FOCUSABLE);
                if (focusable.length > 0) {
                    focusable[0].focus();
                } else {
                    el.setAttribute('tabindex', '-1');
                    el.focus();
                }
            }
        }, 50);

        return () => {
            clearTimeout(timer);
            document.removeEventListener('keydown', handleKeyDown, true);
            if (previousFocusRef.current && typeof previousFocusRef.current.focus === 'function') {
                previousFocusRef.current.focus();
            }
        };
    }, [isOpen, onClose]);

    const handleOverlayClick = useCallback(
        (e: React.MouseEvent) => {
            if (e.target === e.currentTarget) {
                onClose?.();
            }
        },
        [onClose]
    );

    const overlayProps: OverlayProps = {
        role: 'presentation',
        onClick: handleOverlayClick,
    };

    const dialogProps: DialogProps = {
        ref: modalRef,
        role: 'dialog',
        'aria-modal': true,
        ...(label ? { 'aria-label': label } : {}),
        onClick: (e: React.MouseEvent) => e.stopPropagation(),
    };

    return { modalRef, overlayProps, dialogProps };
}
