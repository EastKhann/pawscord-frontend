// frontend/src/components/AccessibleButton.js
// ♿ Fully accessible button component

import React from 'react';

/**
 * AccessibleButton - WCAG 2.1 AA compliant button
 *
 * @param {Object} props
 * @param {Function} props.onClick - Click handler
 * @param {string} props.ariaLabel - Accessible label
 * @param {React.ReactNode} props.children - Button content
 * @param {string} props.className - CSS class
 * @param {string} props.variant - 'primary' | 'secondary' | 'danger'
 * @param {boolean} props.disabled - Disabled state
 * @param {string} props.type - 'button' | 'submit' | 'reset'
 */
const AccessibleButton = ({
    onClick,
    ariaLabel,
    children,
    className = '',
    variant = 'primary',
    disabled = false,
    type = 'button',
    ...rest
}) => {
    const baseStyles = {
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        border: 'none',
        background: 'transparent',
        padding: 0,
        margin: 0,
        font: 'inherit',
        color: 'inherit',
        outline: 'none'
    };

    const focusStyles = {
        outline: '2px solid #5865f2',
        outlineOffset: '2px'
    };

    const [isFocused, setIsFocused] = React.useState(false);

    const handleKeyDown = (e) => {
        // Space or Enter key activates button
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!disabled && onClick) {
                onClick(e);
            }
        }
    };

    return (
        <button
            type={type}
            onClick={disabled ? undefined : onClick}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            aria-label={ariaLabel}
            aria-disabled={disabled}
            disabled={disabled}
            className={className}
            style={{
                ...baseStyles,
                ...(isFocused ? focusStyles : {})
            }}
            tabIndex={disabled ? -1 : 0}
            role="button"
            {...rest}
        >
            {children}
        </button>
    );
};

export default AccessibleButton;



