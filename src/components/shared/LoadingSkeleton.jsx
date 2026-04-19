/**
 * LoadingSkeleton — branded loading fallback for Suspense boundaries.
 *
 * Replaces bare <div>Loading...</div> with an accessible,
 * animated skeleton that matches the Pawscord dark theme.
 */

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import PropTypes from 'prop-types';

const S = {
    font: { fontSize: '0.9rem', fontWeight: 500 },
    bg: {
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: '#5865f2',
        animation: 'pawscord-pulse 1.4s ease-in-out infinite',
    },
    flex: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '40vh',
        gap: '1rem',
        color: '#96989d',
    },
};

const pulse = `
@keyframes pawscord-pulse {
  0%, 100% { opacity: 0.4; }
  50%      { opacity: 1; }
}
`;

const LoadingSkeleton = ({ label }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const displayLabel = label || t('common.loading', 'Loading...');
    return (
        <>
            <style>{pulse}</style>
            <div role="status" aria-label={displayLabel} aria-live="polite" style={S.flex}>
                <div style={S.bg} />
                <span style={S.font}>{displayLabel}</span>
            </div>
        </>
    );
};

React.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

LoadingSkeleton.propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default React.memo(LoadingSkeleton);
