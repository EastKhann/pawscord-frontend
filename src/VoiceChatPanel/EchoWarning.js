// frontend/src/VoiceChatPanel/EchoWarning.js
// ⚠️ Echo detection warning banner

import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

// -- extracted inline style constants --
const _st1 = {
    position: 'absolute',
    bottom: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    background:
        'linear-gradient(135deg, rgba(250, 166, 26, 0.95) 0%, rgba(237, 66, 69, 0.95) 100%)',
    color: '#fff',
    padding: '16px 24px',
    borderRadius: '12px',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 8px 32px rgba(250, 166, 26, 0.6)',
    animation: 'pulse 2s infinite',
    maxWidth: '90%',
};
const _st2 = { fontSize: '24px', animation: 'pulse 1.5s infinite' };
const _st3 = { flex: 1 };
const _st4 = { fontWeight: 'bold', marginBottom: '4px', fontSize: '15px' };
const _st5 = { fontSize: '13px', opacity: 0.9 };
const _st6 = {
    background: 'rgba(255, 255, 255, 0.2)',
    border: 'none',
    borderRadius: '6px',
    color: '#fff',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: 'bold',
};

const EchoWarning = React.memo(({ onDismiss }) => {
    const { t } = useTranslation();
    return (
        <div style={_st1}>
            <div style={_st2}>⚠️</div>
            <div style={_st3}>
                <div style={_st4}>{t('voice.echoDetected', 'Echo Tespit Edildi!')}</div>
                <div style={_st5}>
                    {t(
                        'voice.echoDescription',
                        t('echoWarning.message','Using headphones is recommended. Using speakers may cause echo.')
                    )}
                </div>
            </div>
            <button aria-label={t('common.close', 'Kapat')} onClick={onDismiss} style={_st6}>
                {t('common.close', 'Kapat')}
            </button>
        </div>
    );
});

EchoWarning.displayName = 'EchoWarning';

EchoWarning.propTypes = {
    onDismiss: PropTypes.func,
};
export default EchoWarning;
