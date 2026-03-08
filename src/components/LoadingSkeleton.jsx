/**
 * LoadingSkeleton — branded loading fallback for Suspense boundaries.
 *
 * Replaces bare <div>Yükleniyor...</div> with an accessible,
 * animated skeleton that matches the Pawscord dark theme.
 */

import React from 'react';
import { useTranslation } from 'react-i18next';

const pulse = `
@keyframes pawscord-pulse {
  0%, 100% { opacity: 0.4; }
  50%      { opacity: 1; }
}
`;

const LoadingSkeleton = ({ label }) => {
    const { t } = useTranslation();
    const displayLabel = label || t('common.loading', 'Yükleniyor...');
    return (
        <>
            <style>{pulse}</style>
            <div
                role="status"
                aria-label={displayLabel}
                aria-live="polite"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '40vh',
                    gap: '1rem',
                    color: '#96989d',
                }}
            >
                <div
                    style={{
                        width: 48,
                        height: 48,
                        borderRadius: '50%',
                        background: '#5865f2',
                        animation: 'pawscord-pulse 1.4s ease-in-out infinite',
                    }}
                />
                <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{displayLabel}</span>
            </div>
        </>
    );
};

export default React.memo(LoadingSkeleton);
