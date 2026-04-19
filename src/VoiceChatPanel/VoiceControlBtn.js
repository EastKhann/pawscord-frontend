import { useState } from 'react';
import PropTypes from 'prop-types';

// -- extracted inline style constants --

const VoiceControlBtn = ({
    icon,
    active,
    danger,
    special,
    subtle,
    small,
    isLeave,
    onClick,
    title,
    label,
}) => {
    const [hovered, setHovered] = useState(false);

    const getBackground = () => {
        if (isLeave)
            return hovered
                ? 'linear-gradient(135deg, #da373c 0%, #a12d2f 100%)'
                : 'linear-gradient(135deg, #f23f42 0%, #c03537 100%)';
        if (danger && active) return hovered ? 'rgba(240, 71, 71, 0.5)' : 'rgba(240, 71, 71, 0.35)';
        if (danger) return hovered ? 'rgba(240, 71, 71, 0.25)' : 'rgba(240, 71, 71, 0.12)';
        if (special)
            return hovered
                ? 'linear-gradient(135deg, #4752c4 0%, #3c46a5 100%)'
                : 'linear-gradient(135deg, #5865f2 0%, #4752c4 100%)';
        if (active) return hovered ? 'rgba(67, 181, 129, 0.35)' : 'rgba(67, 181, 129, 0.2)';
        if (subtle) return hovered ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.06)';
        return hovered ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.08)';
    };

    const getBorder = () => {
        if (isLeave) return '1px solid rgba(255,255,255,0.1)';
        if (danger && active) return '1px solid rgba(240, 71, 71, 0.5)';
        if (active) return '1px solid rgba(67, 181, 129, 0.4)';
        if (special) return '1px solid rgba(88, 101, 242, 0.4)';
        return '1px solid rgba(255,255,255,0.06)';
    };

    const size = isLeave ? 52 : small ? 42 : 50;

    return (
        <button
            onClick={onClick}
            title={title}
            aria-label={title || label}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: getBackground(),
                border: getBorder(),
                borderRadius: isLeave ? '50%' : '14px',
                width: `${size}px`,
                height: `${size}px`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: small ? '18px' : '22px',
                color: '#fff',
                transition: 'all 0.15s ease',
                boxShadow: isLeave
                    ? hovered
                        ? '0 6px 24px rgba(237,66,69,0.5)'
                        : '0 4px 16px rgba(237,66,69,0.35)'
                    : hovered
                      ? '0 4px 16px rgba(0,0,0,0.3)'
                      : '0 2px 8px rgba(0,0,0,0.15)',
                transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
                position: 'relative',
                padding: 0,
            }}
        >
            <span style={{ lineHeight: 1 }}>{icon}</span>
            {label && (
                <span
                    style={{
                        fontSize: '10px',
                        fontWeight: '700',
                        marginTop: '1px',
                        color: danger ? '#f23f42' : 'rgba(255,255,255,0.8)',
                        fontVariantNumeric: 'tabular-nums',
                    }}
                >
                    {label}
                </span>
            )}
        </button>
    );
};

VoiceControlBtn.propTypes = {
    icon: PropTypes.node,
    active: PropTypes.bool,
    danger: PropTypes.object,
    special: PropTypes.object,
    subtle: PropTypes.object,
    small: PropTypes.object,
    isLeave: PropTypes.bool,
    onClick: PropTypes.func,
    title: PropTypes.string,
    label: PropTypes.string,
};
export default VoiceControlBtn;
