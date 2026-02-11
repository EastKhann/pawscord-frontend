// frontend/src/components/LoginHistory.js
// 🔥 FEATURE 48: Login history page
// Shows recent login attempts with device, location, time

import { useState, memo, useCallback } from 'react';
import { FaDesktop, FaMobile, FaTablet, FaGlobe, FaShieldAlt, FaExclamationTriangle, FaCheck, FaTimes, FaChrome, FaFirefox, FaEdge, FaSafari } from 'react-icons/fa';

const DEVICE_ICONS = {
    desktop: FaDesktop,
    mobile: FaMobile,
    tablet: FaTablet,
    unknown: FaGlobe,
};

const BROWSER_ICONS = {
    chrome: FaChrome,
    firefox: FaFirefox,
    edge: FaEdge,
    safari: FaSafari,
};

const LoginHistory = ({ logins = [], onRevokeSession, onRevokeAll }) => {
    const [expanded, setExpanded] = useState(null);

    const handleRevoke = useCallback((sessionId) => {
        onRevokeSession?.(sessionId);
    }, [onRevokeSession]);

    return (
        <div style={S.container}>
            <div style={S.header}>
                <FaShieldAlt style={{ fontSize: 18, color: '#5865f2' }} />
                <div style={{ flex: 1 }}>
                    <h3 style={S.title}>Giriş Geçmişi</h3>
                    <span style={S.subtitle}>Son 30 gündeki giriş aktiviteleri</span>
                </div>
                {logins.length > 1 && (
                    <button type="button" style={S.revokeAllBtn} onClick={onRevokeAll}>
                        Tüm Oturumları Kapat
                    </button>
                )}
            </div>

            <div style={S.list}>
                {logins.map((login, i) => {
                    const DeviceIcon = DEVICE_ICONS[login.device] || DEVICE_ICONS.unknown;
                    const BrowserIcon = BROWSER_ICONS[login.browser?.toLowerCase()] || FaGlobe;
                    const isSuccess = login.success !== false;
                    const isCurrent = login.current === true;
                    const isExpanded = expanded === i;

                    return (
                        <div
                            key={login.id || i}
                            style={{
                                ...S.loginItem,
                                borderLeftColor: isSuccess ? (isCurrent ? '#57f287' : '#5865f2') : '#ed4245',
                            }}
                        >
                            <div
                                style={S.loginMain}
                                onClick={() => setExpanded(isExpanded ? null : i)}
                            >
                                <div style={{
                                    ...S.deviceIcon,
                                    backgroundColor: isSuccess ? 'rgba(88,101,242,0.1)' : 'rgba(237,66,69,0.1)',
                                }}>
                                    <DeviceIcon style={{
                                        fontSize: 18,
                                        color: isSuccess ? '#5865f2' : '#ed4245',
                                    }} />
                                </div>

                                <div style={S.loginInfo}>
                                    <div style={S.loginTitle}>
                                        <span style={S.deviceName}>
                                            {login.os || 'Bilinmeyen İşletim Sistemi'}
                                        </span>
                                        {isCurrent && (
                                            <span style={S.currentBadge}>Şu anki oturum</span>
                                        )}
                                        {!isSuccess && (
                                            <FaExclamationTriangle style={{ fontSize: 12, color: '#ed4245' }} />
                                        )}
                                    </div>
                                    <div style={S.loginMeta}>
                                        <BrowserIcon style={{ fontSize: 10 }} />
                                        <span>{login.browser || 'Bilinmeyen tarayıcı'}</span>
                                        <span>•</span>
                                        <span>{login.ip || '?.?.?.?'}</span>
                                        <span>•</span>
                                        <span>{login.location || 'Bilinmeyen konum'}</span>
                                    </div>
                                    <span style={S.loginTime}>
                                        {login.timestamp ? new Date(login.timestamp).toLocaleString('tr-TR') : 'Bilinmiyor'}
                                    </span>
                                </div>

                                <div style={S.statusIcon}>
                                    {isSuccess ? (
                                        <FaCheck style={{ color: '#57f287', fontSize: 14 }} />
                                    ) : (
                                        <FaTimes style={{ color: '#ed4245', fontSize: 14 }} />
                                    )}
                                </div>
                            </div>

                            {isExpanded && (
                                <div style={S.details}>
                                    <div style={S.detailRow}>
                                        <span style={S.detailLabel}>IP Adresi</span>
                                        <span style={S.detailValue}>{login.ip || 'Bilinmiyor'}</span>
                                    </div>
                                    <div style={S.detailRow}>
                                        <span style={S.detailLabel}>Konum</span>
                                        <span style={S.detailValue}>{login.location || 'Bilinmiyor'}</span>
                                    </div>
                                    <div style={S.detailRow}>
                                        <span style={S.detailLabel}>Tarayıcı</span>
                                        <span style={S.detailValue}>{login.browser || 'Bilinmiyor'} {login.browserVersion || ''}</span>
                                    </div>
                                    <div style={S.detailRow}>
                                        <span style={S.detailLabel}>Durum</span>
                                        <span style={{
                                            ...S.detailValue,
                                            color: isSuccess ? '#57f287' : '#ed4245',
                                        }}>
                                            {isSuccess ? 'Başarılı' : 'Başarısız'}
                                        </span>
                                    </div>
                                    {!isCurrent && isSuccess && (
                                        <button
                                            type="button"
                                            style={S.revokeBtn}
                                            onClick={() => handleRevoke(login.id)}
                                        >
                                            Oturumu Kapat
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}

                {logins.length === 0 && (
                    <div style={S.empty}>
                        <FaShieldAlt style={{ fontSize: 24, color: '#4e5058' }} />
                        <span>Giriş geçmişi bulunamadı</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const S = {
    container: { padding: 16 },
    header: {
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20,
    },
    title: { fontSize: 16, fontWeight: 700, color: '#f2f3f5', margin: 0 },
    subtitle: { fontSize: 12, color: '#b5bac1', display: 'block' },
    revokeAllBtn: {
        padding: '6px 14px', borderRadius: 4,
        border: 'none', backgroundColor: '#ed4245',
        color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer',
    },
    list: { display: 'flex', flexDirection: 'column', gap: 6 },
    loginItem: {
        backgroundColor: '#2b2d31', borderRadius: 8,
        borderLeft: '3px solid', overflow: 'hidden',
    },
    loginMain: {
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '12px 14px', cursor: 'pointer',
    },
    deviceIcon: {
        width: 40, height: 40, borderRadius: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
    },
    loginInfo: { flex: 1, minWidth: 0 },
    loginTitle: {
        display: 'flex', alignItems: 'center', gap: 6,
    },
    deviceName: {
        fontSize: 14, fontWeight: 600, color: '#f2f3f5',
    },
    currentBadge: {
        fontSize: 10, fontWeight: 600, color: '#57f287',
        backgroundColor: 'rgba(87,242,135,0.1)',
        padding: '1px 6px', borderRadius: 4,
    },
    loginMeta: {
        display: 'flex', alignItems: 'center', gap: 4,
        fontSize: 12, color: '#4e5058', marginTop: 2,
    },
    loginTime: {
        fontSize: 11, color: '#4e5058', marginTop: 2, display: 'block',
    },
    statusIcon: {
        width: 28, height: 28, borderRadius: '50%',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
    },
    details: {
        padding: '0 14px 14px', borderTop: '1px solid rgba(255,255,255,0.04)',
        display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 12,
    },
    detailRow: {
        display: 'flex', justifyContent: 'space-between',
    },
    detailLabel: { fontSize: 13, color: '#b5bac1' },
    detailValue: { fontSize: 13, color: '#dcddde', fontWeight: 500 },
    revokeBtn: {
        marginTop: 8, padding: '6px 14px', borderRadius: 4,
        border: 'none', backgroundColor: 'rgba(237,66,69,0.1)',
        color: '#ed4245', fontSize: 13, fontWeight: 500, cursor: 'pointer',
        alignSelf: 'flex-start',
    },
    empty: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 8, padding: 40, color: '#4e5058', fontSize: 14,
    },
};

export default memo(LoginHistory);
