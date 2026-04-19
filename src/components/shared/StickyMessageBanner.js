import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaBullhorn, FaTimes } from 'react-icons/fa';

const S = {
    flex2: {
        background: 'rgba(255,255,255,0.2)',
        border: 'none',
        borderRadius: '50%',
        width: '28px',
        height: '28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: 'white',
        transition: 'background 0.2s',
        marginLeft: '10px',
    },
    font2: { fontSize: '14px', fontWeight: 500 },
    font: {
        fontWeight: 'bold',
        fontSize: '12px',
        opacity: 0.8,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    opacity: { opacity: 0.9 },
    flex: { display: 'flex', alignItems: 'center', gap: '12px', flex: 1 },
};

const StickyMessageBanner = ({ message, type = 'info', onDismiss }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    if (!message) return null;

    const bgColors = {
        info: 'linear-gradient(90deg, #5865F2 0%, #4752C4 100%)',
        warning: 'linear-gradient(90deg, #f0b232 0%, #F57C00 100%)',
        error: 'linear-gradient(90deg, #f23f42 0%, #C62828 100%)',
        success: 'linear-gradient(90deg, #3BA55C 0%, #2D7D46 100%)',
    };

    return (
        <div
            style={{
                background: bgColors[type] || bgColors.info,
                color: 'white',
                padding: '10px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                animation: 'slideDown 0.3s ease-out',
                position: 'relative',
                zIndex: 99,
            }}
        >
            <style>
                {`
                    @keyframes slideDown {
                        from { transform: translateY(-100%); opacity: 0; }
                        to { transform: translateY(0); opacity: 1; }
                    }
                `}
            </style>

            <div style={S.flex}>
                <FaBullhorn size={20} style={S.opacity} />
                <div className="flex-col">
                    <span style={S.font}>{type === 'info' ? 'Duyuru' : type.toUpperCase()}</span>
                    <span style={S.font2}>{message}</span>
                </div>
            </div>

            {onDismiss && (
                <button
                    aria-label="on Dismiss"
                    onClick={onDismiss}
                    style={S.flex2}
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.background = 'rgba(255,255,255,0.3)')
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.background = 'rgba(255,255,255,0.2)')
                    }
                >
                    <FaTimes size={14} />
                </button>
            )}
        </div>
    );
};

StickyMessageBanner.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['info', 'warning', 'error', 'success']),
    onDismiss: PropTypes.func,
};
export default StickyMessageBanner;
