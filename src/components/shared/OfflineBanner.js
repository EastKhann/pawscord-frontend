// frontend/src/components/shared/OfflineBanner.js
// Shown when the device loses network connectivity. Works on web and Android (via @capacitor/network).
import { useTranslation } from 'react-i18next';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';

const OfflineBanner = () => {
    const { isOnline } = useNetworkStatus();
    const { t } = useTranslation();

    if (isOnline) return null;

    return (
        <div
            role="alert"
            aria-live="assertive"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 99999,
                background: '#ed4245',
                color: '#fff',
                textAlign: 'center',
                padding: '8px 16px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.01em',
                boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}
        >
            {t('offline.banner', '⚠️ İnternet bağlantısı yok — yeniden bağlanılıyor...')}
        </div>
    );
};

export default OfflineBanner;
