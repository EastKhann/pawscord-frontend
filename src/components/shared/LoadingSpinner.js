// frontend/src/components/shared/LoadingSpinner.js

import { useState, memo } from 'react';
import PropTypes from 'prop-types';
import styles from './LoadingSpinner.module.css';

/**
 * 🌀 Modern loading spinner with Discord/Pawscord styling.
 * Supports small, medium, and large sizes with optional fullscreen overlay.
 * @param {Object} props
 * @param {'small'|'medium'|'large'} [props.size='medium'] - Spinner size preset
 * @param {string} [props.text='Loading...'] - Loading text displayed below spinner
 * @param {boolean} [props.fullscreen=false] - Whether to render as a fullscreen overlay
 */
const LoadingSpinner = ({ size = 'medium', text = 'Loading...', fullscreen = false }) => {
    const [error, setError] = useState(null);
    const sizes = {
        small: { spinner: 24, text: '12px' },
        medium: { spinner: 40, text: '14px' },
        large: { spinner: 60, text: '16px' },
    };

    const config = sizes[size] || sizes.medium;

    return (
        <div
            aria-label={text}
            className={fullscreen ? styles.fullscreenContainer : styles.inlineContainer}
        >
            <div
                className={styles.spinnerWrapper}
                style={{ width: config.spinner, height: config.spinner }}
            >
                <div className={styles.spinnerOuter}></div>
                <div className={styles.spinnerInner}></div>
            </div>
            {text && (
                <div className={styles.loadingText} style={{ fontSize: config.text }}>
                    {text}
                </div>
            )}
        </div>
    );
};

LoadingSpinner.propTypes = {
    size: PropTypes.oneOf(['small', 'medium', 'large']),
    text: PropTypes.string,
    fullscreen: PropTypes.bool,
};

const MemoizedLoadingSpinner = memo(LoadingSpinner);
MemoizedLoadingSpinner.displayName = 'LoadingSpinner';

export default MemoizedLoadingSpinner;
