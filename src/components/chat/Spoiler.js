/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
// frontend/src/components/Spoiler.js
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const Spoiler = ({ children }) => {
    const { t } = useTranslation();
    const [revealed, setRevealed] = useState(false);

    return (
        <span
            aria-label="spoiler"
            role="button"
            tabIndex={0}
            onClick={(e) => {
                e.stopPropagation();
                setRevealed(true);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.stopPropagation();
                    setRevealed(true);
                }
            }}
            style={{
                backgroundColor: revealed ? 'rgba(255,255,255,0.1)' : '#0d0e10',
                color: revealed ? 'inherit' : 'transparent',
                borderRadius: '3px',
                padding: '0 2px',
                cursor: revealed ? 'default' : 'pointer',
                userSelect: revealed ? 'auto' : 'none',
                transition: 'all 0.2s',
                // Blurlu efekt or siyah kutu
                filter: revealed ? 'none' : 'blur(4px)',
            }}
            title={revealed ? '' : t('ui.clickToReveal')}
        >
            {children}
        </span>
    );
};

Spoiler.propTypes = {
    children: PropTypes.array,
};
export default Spoiler;
