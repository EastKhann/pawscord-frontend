import { useState } from 'react';
import PropTypes from 'prop-types';

const MiniButton = ({ icon, active, danger, onClick, title }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    return (
        <button
            onClick={onClick}
            title={title}
            style={{
                background: active
                    ? 'rgba(88, 101, 242, 0.8)'
                    : danger
                      ? 'rgba(237, 66, 69, 0.8)'
                      : 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                borderRadius: '8px',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.2s ease',
            }}
            aria-label={title}
        >
            {icon}
        </button>
    );
};

MiniButton.propTypes = {
    icon: PropTypes.node,
    active: PropTypes.bool,
    danger: PropTypes.object,
    onClick: PropTypes.func,
    title: PropTypes.string,
};
export default MiniButton;
