// frontend/src/components/OfflineBanner.js
import React from 'react';
import FaWifi from 'react-icons/fa/FaWifi';
import FaExclamationTriangle from 'react-icons/fa/FaExclamationTriangle';
import { useOfflineMode } from '../utils/offlineMode';

/**
 * 📵 Offline Banner Component
 * İnternet bağlantısı kesildiğinde gösterilen banner
 */
const OfflineBanner = () => {
    const { isOnline, pendingActionsCount } = useOfflineMode();

    if (isOnline) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(90deg, #ed4245 0%, #f04747 100%)',
            color: '#fff',
            padding: '12px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            zIndex: 9999,
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            animation: 'slideDown 0.3s ease-out'
        }}>
            <FaExclamationTriangle style={{ fontSize: '18px' }} />
            <span style={{ fontWeight: 'bold' }}>
                İnternet bağlantısı yok - Offline moddasınız
            </span>
            {pendingActionsCount > 0 && (
                <span style={{
                    background: 'rgba(0,0,0,0.2)',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '12px'
                }}>
                    {pendingActionsCount} işlem beklemede
                </span>
            )}
            <FaWifi style={{ fontSize: '18px', opacity: 0.5 }} />
        </div>
    );
};

export default React.memo(OfflineBanner);


