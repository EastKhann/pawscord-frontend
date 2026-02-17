// frontend/src/VoiceChatPanel/EchoWarning.js
// ⚠️ Echo detection warning banner

import React from 'react';

const EchoWarning = React.memo(({ onDismiss }) => (
    <div style={{
        position: 'absolute',
        bottom: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(135deg, rgba(250, 166, 26, 0.95) 0%, rgba(237, 66, 69, 0.95) 100%)',
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
    }}>
        <div style={{ fontSize: '24px', animation: 'pulse 1.5s infinite' }}>⚠️</div>
        <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', fontSize: '15px' }}>Echo Tespit Edildi!</div>
            <div style={{ fontSize: '13px', opacity: 0.9 }}>Kulaklık kullanmanız önerilir. Hoparlör kullanımı echo'ya neden olur.</div>
        </div>
        <button
            onClick={onDismiss}
            style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '6px',
                color: '#fff',
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: 'bold',
            }}
        >
            Kapat
        </button>
    </div>
));

EchoWarning.displayName = 'EchoWarning';

export default EchoWarning;
