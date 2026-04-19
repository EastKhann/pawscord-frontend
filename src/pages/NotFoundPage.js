import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                background: '#0e0f14',
                color: '#e0e0e0',
                textAlign: 'center',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
        >
            <div style={{ fontSize: '72px', marginBottom: '10px' }}>🐾</div>
            <h1 style={{ fontSize: '48px', color: '#7c6ef0', margin: '0 0 8px' }}>404</h1>
            <p style={{ fontSize: '18px', color: '#a0a0b0', marginBottom: '24px' }}>
                {t('errors.pageNotFound', 'This page could not be found.')}
            </p>
            <button
                onClick={() => navigate('/')}
                style={{
                    background: '#7c6ef0',
                    color: '#fff',
                    border: 'none',
                    padding: '12px 28px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: 'pointer',
                }}
            >
                {t('errors.goHome', 'Go Home')}
            </button>
        </div>
    );
}
