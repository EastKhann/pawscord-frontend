// frontend/src/components/ConnectionStatusBanner.jsx
// 🔌 WebSocket Connection Status Banner
// Shows a top-bar notification when the WebSocket connection is lost/reconnecting

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useConnectionStatus } from '../hooks/useConnectionStatus';
import './ConnectionStatusBanner.css';

/**
 * ConnectionStatusBanner
 *
 * Renders a fixed top banner when the WebSocket drops:
 *   • "Reconnecting..." (yellow) while trying to recover
 *   • "Connection lost" (red) after too many failed attempts
 *   • Brief "Connected" flash (green) when it comes back
 *
 * Auto-hides once reconnected (after a 2 s success flash).
 */
export function ConnectionStatusBanner() {
    const { isConnected, isReconnecting, reconnectAttempts, lastDisconnectedAt } = useConnectionStatus();
    const { t } = useTranslation();

    const [showSuccessFlash, setShowSuccessFlash] = useState(false);
    const [visible, setVisible] = useState(false);
    const [hasEverDisconnected, setHasEverDisconnected] = useState(false);

    // When reconnecting starts → show banner
    useEffect(() => {
        if (isReconnecting) {
            setHasEverDisconnected(true);
            setVisible(true);
            setShowSuccessFlash(false);
        }
    }, [isReconnecting]);

    // When connection is restored → flash green then hide
    useEffect(() => {
        if (isConnected && hasEverDisconnected && !isReconnecting) {
            setShowSuccessFlash(true);
            const timer = setTimeout(() => {
                setShowSuccessFlash(false);
                setVisible(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isConnected, hasEverDisconnected, isReconnecting]);

    const isFailed = isReconnecting && reconnectAttempts >= 5;

    const bannerClass = [
        'connection-banner',
        visible ? 'visible' : 'hidden',
        showSuccessFlash ? 'connected' : isFailed ? 'failed' : 'reconnecting',
    ].join(' ');

    if (!visible) return null;

    if (showSuccessFlash) {
        return (
            <div className={bannerClass} role="status" aria-live="polite">
                <span className="banner-icon">✓</span>
                <span className="banner-text">{t('connection.restored', 'Bağlantı yeniden kuruldu')}</span>
            </div>
        );
    }

    return (
        <div className={bannerClass} role="alert" aria-live="assertive">
            {!isFailed && <span className="banner-spinner" aria-hidden="true" />}
            {isFailed && <span className="banner-icon">⚠</span>}
            <span className="banner-text">
                {isFailed
                    ? t('connection.lostRetrying', 'Bağlantı kesildi. Yeniden bağlanmaya çalışılıyor...')
                    : t('connection.reconnecting', 'Yeniden bağlanıyor...')}
            </span>
            {reconnectAttempts > 0 && (
                <span className="banner-attempts">({reconnectAttempts}. {t('connection.attempt', 'deneme')})</span>
            )}
        </div>
    );
}

export default ConnectionStatusBanner;
