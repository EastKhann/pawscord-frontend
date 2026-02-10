// frontend/src/components/UserSettingsModal.js
// 🔥 FEATURE 10: Unified User Settings Modal
// Discord-style settings with sidebar navigation - Account, Privacy, Appearance, Voice, Notifications, Keybinds

import React, { useState, useEffect, useCallback, memo } from 'react';
import { FaUser, FaShieldAlt, FaPalette, FaMicrophone, FaBell, FaKeyboard, FaGlobe, FaSignOutAlt, FaTimes, FaLock, FaDesktop, FaCog, FaVolumeUp, FaGamepad, FaLink, FaHistory, FaTrash, FaToggleOn, FaToggleOff, FaChevronRight, FaCheck, FaCamera, FaSteam, FaSpotify, FaInstagram, FaTwitter, FaXbox, FaPlaystation, FaGithub } from 'react-icons/fa';
import toast from '../utils/toast';

const TABS = [
    { id: 'account', label: 'Hesabım', icon: FaUser, section: 'KULLANICI AYARLARI' },
    { id: 'privacy', label: 'Gizlilik & Güvenlik', icon: FaShieldAlt, section: 'KULLANICI AYARLARI' },
    { id: 'connections', label: 'Bağlantılar', icon: FaLink, section: 'KULLANICI AYARLARI' },
    { id: 'appearance', label: 'Görünüm', icon: FaPalette, section: 'UYGULAMA AYARLARI' },
    { id: 'voice', label: 'Ses & Video', icon: FaMicrophone, section: 'UYGULAMA AYARLARI' },
    { id: 'notifications', label: 'Bildirimler', icon: FaBell, section: 'UYGULAMA AYARLARI' },
    { id: 'keybinds', label: 'Kısayol Tuşları', icon: FaKeyboard, section: 'UYGULAMA AYARLARI' },
    { id: 'language', label: 'Dil', icon: FaGlobe, section: 'UYGULAMA AYARLARI' },
    { id: 'activity', label: 'Aktivite Durumu', icon: FaGamepad, section: 'UYGULAMA AYARLARI' },
    { id: 'devices', label: 'Oturumlar', icon: FaDesktop, section: 'UYGULAMA AYARLARI' },
    { id: 'advanced', label: 'Gelişmiş', icon: FaCog, section: 'UYGULAMA AYARLARI' },
];

const ToggleSwitch = ({ value, onChange, label }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <span style={{ color: '#dcddde', fontSize: 14 }}>{label}</span>
        <button
            type="button"
            onClick={() => onChange(!value)}
            style={{
                width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                backgroundColor: value ? '#3ba55c' : '#72767d', position: 'relative', transition: 'all 0.2s',
            }}
        >
            <div style={{
                width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fff',
                position: 'absolute', top: 3, left: value ? 23 : 3, transition: 'left 0.2s',
            }} />
        </button>
    </div>
);

const SettingSection = ({ title, children }) => (
    <div style={{ marginBottom: 24 }}>
        <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{title}</h3>
        {children}
    </div>
);

const AccountTab = ({ user, onAvatarChange }) => (
    <div>
        <SettingSection title="Profil">
            <div style={{ backgroundColor: '#1e1f22', borderRadius: 8, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ position: 'relative' }}>
                        <img src={user?.avatar || '/default-avatar.png'} alt="" style={{ width: 80, height: 80, borderRadius: '50%', border: '4px solid #2b2d31' }} />
                        <button
                            type="button"
                            onClick={onAvatarChange}
                            style={{
                                position: 'absolute', bottom: 0, right: 0, width: 28, height: 28,
                                borderRadius: '50%', backgroundColor: '#5865f2', border: '3px solid #1e1f22',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                cursor: 'pointer', color: '#fff', fontSize: 11,
                            }}
                        >
                            <FaCamera />
                        </button>
                    </div>
                    <div>
                        <div style={{ color: '#fff', fontWeight: 700, fontSize: 18 }}>{user?.display_name || user?.username}</div>
                        <div style={{ color: '#949ba4', fontSize: 14 }}>@{user?.username}</div>
                    </div>
                </div>
                <div style={{ marginTop: 16, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <SettingField label="KULLANICI ADI" value={user?.username} />
                    <SettingField label="E-POSTA" value={user?.email || 'Ayarlanmamış'} masked />
                    <SettingField label="TELEFON" value={user?.phone || 'Eklenmemiş'} />
                </div>
            </div>
        </SettingSection>
        <SettingSection title="Parola">
            <button type="button" style={S.actionBtn}>Parolayı Değiştir</button>
        </SettingSection>
        <SettingSection title="Hesap Silme">
            <button type="button" style={{ ...S.actionBtn, backgroundColor: 'rgba(218,55,60,0.1)', color: '#da373c', borderColor: '#da373c' }}>
                <FaTrash /> Hesabı Sil
            </button>
        </SettingSection>
    </div>
);

const SettingField = ({ label, value, masked }) => (
    <div style={{ padding: '12px 16px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#949ba4', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
        <div style={{ color: '#dcddde', fontSize: 14 }}>{masked ? '••••••••' : value}</div>
    </div>
);

const AppearanceTab = () => {
    const [theme, setTheme] = useState('dark');
    const [fontSize, setFontSize] = useState(16);
    const [compact, setCompact] = useState(false);

    return (
        <div>
            <SettingSection title="Tema">
                <div style={{ display: 'flex', gap: 12 }}>
                    {['dark', 'light', 'amoled'].map(t => (
                        <button key={t} type="button" onClick={() => setTheme(t)} style={{
                            ...S.themeBtn,
                            borderColor: theme === t ? '#5865f2' : 'rgba(255,255,255,0.1)',
                            backgroundColor: t === 'dark' ? '#36393f' : t === 'light' ? '#fff' : '#000',
                        }}>
                            <span style={{ color: t === 'light' ? '#000' : '#fff', fontSize: 12, fontWeight: 600 }}>
                                {t === 'dark' ? 'Koyu' : t === 'light' ? 'Açık' : 'AMOLED'}
                            </span>
                            {theme === t && <FaCheck style={{ color: '#5865f2', position: 'absolute', top: 4, right: 4, fontSize: 10 }} />}
                        </button>
                    ))}
                </div>
            </SettingSection>
            <SettingSection title="Yazı Boyutu">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span style={{ color: '#949ba4', fontSize: 12 }}>12px</span>
                    <input type="range" min={12} max={24} value={fontSize} onChange={e => setFontSize(+e.target.value)} style={{ flex: 1, accentColor: '#5865f2' }} />
                    <span style={{ color: '#949ba4', fontSize: 12 }}>24px</span>
                    <span style={{ color: '#fff', fontSize: 14, fontWeight: 600, minWidth: 40 }}>{fontSize}px</span>
                </div>
            </SettingSection>
            <ToggleSwitch label="Kompakt Mod" value={compact} onChange={setCompact} />
        </div>
    );
};

const NotificationsTab = () => {
    const [desktop, setDesktop] = useState(true);
    const [sound, setSound] = useState(true);
    const [mentions, setMentions] = useState(true);
    const [dms, setDms] = useState(true);
    const [everyone, setEveryone] = useState(false);

    return (
        <div>
            <SettingSection title="Bildirim Ayarları">
                <ToggleSwitch label="Masaüstü Bildirimleri" value={desktop} onChange={setDesktop} />
                <ToggleSwitch label="Bildirim Sesleri" value={sound} onChange={setSound} />
                <ToggleSwitch label="Mention Bildirimleri" value={mentions} onChange={setMentions} />
                <ToggleSwitch label="DM Bildirimleri" value={dms} onChange={setDms} />
                <ToggleSwitch label="@everyone / @here Bildirimleri" value={everyone} onChange={setEveryone} />
            </SettingSection>
        </div>
    );
};

const VoiceTab = () => {
    const [inputDevice, setInputDevice] = useState('default');
    const [outputDevice, setOutputDevice] = useState('default');
    const [inputVolume, setInputVolume] = useState(100);
    const [outputVolume, setOutputVolume] = useState(100);
    const [noiseSuppression, setNoiseSuppression] = useState(true);
    const [echoCancellation, setEchoCancellation] = useState(true);

    return (
        <div>
            <SettingSection title="Ses Giriş">
                <div style={S.volumeRow}>
                    <FaMicrophone style={{ color: '#949ba4' }} />
                    <input type="range" min={0} max={200} value={inputVolume} onChange={e => setInputVolume(+e.target.value)} style={{ flex: 1, accentColor: '#5865f2' }} />
                    <span style={{ color: '#fff', minWidth: 40, textAlign: 'right' }}>{inputVolume}%</span>
                </div>
            </SettingSection>
            <SettingSection title="Ses Çıkış">
                <div style={S.volumeRow}>
                    <FaVolumeUp style={{ color: '#949ba4' }} />
                    <input type="range" min={0} max={200} value={outputVolume} onChange={e => setOutputVolume(+e.target.value)} style={{ flex: 1, accentColor: '#5865f2' }} />
                    <span style={{ color: '#fff', minWidth: 40, textAlign: 'right' }}>{outputVolume}%</span>
                </div>
            </SettingSection>
            <SettingSection title="Gelişmiş">
                <ToggleSwitch label="Gürültü Bastırma" value={noiseSuppression} onChange={setNoiseSuppression} />
                <ToggleSwitch label="Yankı Önleme" value={echoCancellation} onChange={setEchoCancellation} />
            </SettingSection>
        </div>
    );
};

const PrivacyTab = () => {
    const [dmFromServer, setDmFromServer] = useState(true);
    const [friendRequests, setFriendRequests] = useState(true);
    const [showActivity, setShowActivity] = useState(true);
    const [readReceipts, setReadReceipts] = useState(true);

    return (
        <div>
            <SettingSection title="DM & Arkadaş">
                <ToggleSwitch label="Sunucu üyelerinden DM al" value={dmFromServer} onChange={setDmFromServer} />
                <ToggleSwitch label="Herkesten arkadaşlık isteği al" value={friendRequests} onChange={setFriendRequests} />
            </SettingSection>
            <SettingSection title="Gizlilik">
                <ToggleSwitch label="Aktivite durumunu göster" value={showActivity} onChange={setShowActivity} />
                <ToggleSwitch label="Okundu bilgisi gönder" value={readReceipts} onChange={setReadReceipts} />
            </SettingSection>
            <SettingSection title="Veri">
                <button type="button" style={S.actionBtn}>Verilerimi İndir (GDPR)</button>
            </SettingSection>
        </div>
    );
};

const KeybindsTab = () => {
    const shortcuts = [
        { keys: 'Ctrl + K', desc: 'Hızlı Geçiş' },
        { keys: 'Ctrl + Shift + M', desc: 'Mikrofon Aç/Kapa' },
        { keys: 'Ctrl + Shift + D', desc: 'Kulaklık Aç/Kapa' },
        { keys: 'Ctrl + Enter', desc: 'Mesaj Gönder' },
        { keys: 'Shift + Enter', desc: 'Yeni Satır' },
        { keys: '↑ (boş input)', desc: 'Son Mesajı Düzenle' },
        { keys: 'Escape', desc: 'Düzenleme/Yanıt İptal' },
        { keys: 'Ctrl + T', desc: 'Şablonlar' },
        { keys: 'Ctrl + B', desc: 'Kalın Metin' },
        { keys: 'Ctrl + I', desc: 'İtalik Metin' },
        { keys: 'Ctrl + U', desc: 'Altı Çizili' },
    ];

    return (
        <div>
            <SettingSection title="Klavye Kısayolları">
                {shortcuts.map((s, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                        <span style={{ color: '#dcddde', fontSize: 14 }}>{s.desc}</span>
                        <kbd style={S.kbd}>{s.keys}</kbd>
                    </div>
                ))}
            </SettingSection>
        </div>
    );
};

const ConnectionsTab = () => {
    const connections = [
        { id: 'steam', name: 'Steam', icon: FaSteam, color: '#171a21', connected: false },
        { id: 'spotify', name: 'Spotify', icon: FaSpotify, color: '#1DB954', connected: false },
        { id: 'instagram', name: 'Instagram', icon: FaInstagram, color: '#E4405F', connected: false },
        { id: 'twitter', name: 'X (Twitter)', icon: FaTwitter, color: '#1DA1F2', connected: false },
        { id: 'xbox', name: 'Xbox', icon: FaXbox, color: '#107C10', connected: false },
        { id: 'playstation', name: 'PlayStation', icon: FaPlaystation, color: '#003791', connected: false },
        { id: 'github', name: 'GitHub', icon: FaGithub, color: '#333', connected: false },
    ];

    const [connectedIds, setConnectedIds] = useState(() => {
        try { return JSON.parse(localStorage.getItem('pawscord_connections') || '[]'); } catch { return []; }
    });

    const toggleConnection = (id) => {
        setConnectedIds(prev => {
            const next = prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id];
            localStorage.setItem('pawscord_connections', JSON.stringify(next));
            return next;
        });
    };

    return (
        <div>
            <SettingSection title="Bağlı Hesaplar">
                <p style={{ color: '#949ba4', fontSize: 13, marginBottom: 16 }}>
                    Profilinde gösterilecek bağlı hesaplarını yönet.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {connections.map(c => {
                        const isConnected = connectedIds.includes(c.id);
                        const Icon = c.icon;
                        return (
                            <div key={c.id} style={{
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '12px 16px', backgroundColor: '#1e1f22', borderRadius: 8,
                                border: isConnected ? `1px solid ${c.color}44` : '1px solid transparent',
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                    <Icon style={{ fontSize: 24, color: isConnected ? c.color : '#949ba4' }} />
                                    <div>
                                        <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                                        <div style={{ color: isConnected ? '#3ba55c' : '#949ba4', fontSize: 12 }}>
                                            {isConnected ? '✓ Bağlı' : 'Bağlı değil'}
                                        </div>
                                    </div>
                                </div>
                                <button type="button" onClick={() => toggleConnection(c.id)} style={{
                                    padding: '6px 16px', borderRadius: 4, border: 'none', cursor: 'pointer',
                                    fontSize: 13, fontWeight: 600,
                                    backgroundColor: isConnected ? 'rgba(218,55,60,0.15)' : 'rgba(88,101,242,0.15)',
                                    color: isConnected ? '#da373c' : '#5865f2',
                                }}>
                                    {isConnected ? 'Kaldır' : 'Bağla'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </SettingSection>
        </div>
    );
};

const LanguageTab = () => {
    const [language, setLanguage] = useState(() => localStorage.getItem('pawscord_language') || 'tr');
    const languages = [
        { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
        { code: 'en', label: 'English', flag: '🇬🇧' },
        { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
        { code: 'fr', label: 'Français', flag: '🇫🇷' },
        { code: 'es', label: 'Español', flag: '🇪🇸' },
        { code: 'ja', label: '日本語', flag: '🇯🇵' },
        { code: 'ko', label: '한국어', flag: '🇰🇷' },
        { code: 'ru', label: 'Русский', flag: '🇷🇺' },
        { code: 'ar', label: 'العربية', flag: '🇸🇦' },
        { code: 'zh', label: '中文', flag: '🇨🇳' },
    ];

    const selectLanguage = (code) => {
        setLanguage(code);
        localStorage.setItem('pawscord_language', code);
    };

    return (
        <div>
            <SettingSection title="Uygulama Dili">
                <p style={{ color: '#949ba4', fontSize: 13, marginBottom: 16 }}>
                    Pawscord arayüzünün dilini seç.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {languages.map(lang => (
                        <button key={lang.code} type="button" onClick={() => selectLanguage(lang.code)} style={{
                            display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                            padding: '10px 16px', border: 'none', borderRadius: 4, cursor: 'pointer',
                            backgroundColor: language === lang.code ? 'rgba(88,101,242,0.15)' : 'transparent',
                            textAlign: 'left', transition: 'background 0.15s',
                        }}>
                            <span style={{ fontSize: 20 }}>{lang.flag}</span>
                            <span style={{ color: language === lang.code ? '#5865f2' : '#dcddde', fontSize: 14, fontWeight: language === lang.code ? 600 : 400 }}>
                                {lang.label}
                            </span>
                            {language === lang.code && <FaCheck style={{ marginLeft: 'auto', color: '#5865f2', fontSize: 12 }} />}
                        </button>
                    ))}
                </div>
            </SettingSection>
        </div>
    );
};

const ActivityTab = () => {
    const [showActivity, setShowActivity] = useState(() => localStorage.getItem('pawscord_show_activity') !== 'false');
    const [showGame, setShowGame] = useState(() => localStorage.getItem('pawscord_show_game') !== 'false');
    const [showSpotify, setShowSpotify] = useState(() => localStorage.getItem('pawscord_show_spotify') !== 'false');
    const [showStatus, setShowStatus] = useState(() => localStorage.getItem('pawscord_show_status') !== 'false');

    const toggle = (key, setter) => (val) => {
        setter(val);
        localStorage.setItem(key, val.toString());
    };

    return (
        <div>
            <SettingSection title="Aktivite Gizliliği">
                <p style={{ color: '#949ba4', fontSize: 13, marginBottom: 12 }}>
                    Diğer kullanıcıların ne gördüğünü kontrol et.
                </p>
                <ToggleSwitch label="Aktivite durumunu göster" value={showActivity} onChange={toggle('pawscord_show_activity', setShowActivity)} />
                <ToggleSwitch label="Oynadığım oyunu göster" value={showGame} onChange={toggle('pawscord_show_game', setShowGame)} />
                <ToggleSwitch label="Spotify dinlediğimi göster" value={showSpotify} onChange={toggle('pawscord_show_spotify', setShowSpotify)} />
                <ToggleSwitch label="Özel durum mesajını göster" value={showStatus} onChange={toggle('pawscord_show_status', setShowStatus)} />
            </SettingSection>
            <SettingSection title="Oyun Algılama">
                <div style={{ padding: 16, backgroundColor: '#1e1f22', borderRadius: 8 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                        <FaGamepad style={{ color: '#5865f2', fontSize: 24 }} />
                        <div>
                            <div style={{ color: '#fff', fontSize: 14, fontWeight: 600 }}>Otomatik Algılama</div>
                            <div style={{ color: '#949ba4', fontSize: 12 }}>Çalışan uygulamalar otomatik algılanır (Electron/APK)</div>
                        </div>
                    </div>
                    <ToggleSwitch label="Oyun algılamayı etkinleştir" value={showGame} onChange={toggle('pawscord_show_game', setShowGame)} />
                </div>
            </SettingSection>
        </div>
    );
};

const DevicesTab = () => {
    const [sessions] = useState([
        {
            id: 1, device: '💻 Windows PC', browser: 'Chrome 132', ip: '88.238.xx.xxx',
            location: 'İstanbul, Türkiye', lastActive: 'Şu an aktif', current: true,
        },
        {
            id: 2, device: '📱 Android', browser: 'Chrome Mobile 144', ip: '88.238.xx.xxx',
            location: 'İstanbul, Türkiye', lastActive: '2 saat önce', current: false,
        },
    ]);

    return (
        <div>
            <SettingSection title="Aktif Oturumlar">
                <p style={{ color: '#949ba4', fontSize: 13, marginBottom: 16 }}>
                    Hesabınızın giriş yaptığı cihazlar.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {sessions.map(s => (
                        <div key={s.id} style={{
                            padding: '14px 16px', backgroundColor: '#1e1f22', borderRadius: 8,
                            border: s.current ? '1px solid rgba(59,165,92,0.3)' : '1px solid transparent',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <div>
                                    <div style={{ color: '#fff', fontSize: 15, fontWeight: 600, marginBottom: 4 }}>
                                        {s.device} {s.current && <span style={{ color: '#3ba55c', fontSize: 11, fontWeight: 400 }}>● Şu anki oturum</span>}
                                    </div>
                                    <div style={{ color: '#949ba4', fontSize: 13 }}>{s.browser}</div>
                                    <div style={{ color: '#949ba4', fontSize: 12, marginTop: 4 }}>
                                        {s.location} • {s.ip} • {s.lastActive}
                                    </div>
                                </div>
                                {!s.current && (
                                    <button type="button" style={{
                                        padding: '6px 12px', borderRadius: 4, border: 'none', cursor: 'pointer',
                                        backgroundColor: 'rgba(218,55,60,0.15)', color: '#da373c', fontSize: 12, fontWeight: 600,
                                    }}>
                                        Sonlandır
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </SettingSection>
            <SettingSection title="">
                <button type="button" style={{
                    ...S.actionBtn, backgroundColor: 'rgba(218,55,60,0.1)', color: '#da373c', borderColor: '#da373c',
                }}>
                    <FaDesktop style={{ fontSize: 14 }} /> Diğer Tüm Oturumları Sonlandır
                </button>
            </SettingSection>
        </div>
    );
};

const AdvancedTab = () => {
    const [devMode, setDevMode] = useState(() => localStorage.getItem('pawscord_dev_mode') === 'true');
    const [hwAccel, setHwAccel] = useState(() => localStorage.getItem('pawscord_hw_accel') !== 'false');
    const [reducedMotion, setReducedMotion] = useState(() => localStorage.getItem('pawscord_reduced_motion') === 'true');

    const toggle = (key, setter) => (val) => {
        setter(val);
        localStorage.setItem(key, val.toString());
    };

    return (
        <div>
            <SettingSection title="Geliştirici Modu">
                <p style={{ color: '#949ba4', fontSize: 13, marginBottom: 8 }}>
                    ID'leri kopyalama ve hata ayıklama araçlarına erişim sağlar.
                </p>
                <ToggleSwitch label="Geliştirici modunu etkinleştir" value={devMode} onChange={toggle('pawscord_dev_mode', setDevMode)} />
            </SettingSection>
            <SettingSection title="Performans">
                <ToggleSwitch label="Donanım hızlandırma" value={hwAccel} onChange={toggle('pawscord_hw_accel', setHwAccel)} />
                <ToggleSwitch label="Azaltılmış hareket (animasyonları kapat)" value={reducedMotion} onChange={toggle('pawscord_reduced_motion', setReducedMotion)} />
            </SettingSection>
            <SettingSection title="Önbellek">
                <div style={{ display: 'flex', gap: 8 }}>
                    <button type="button" onClick={() => {
                        if (window.caches) {
                            window.caches.keys().then(names => names.forEach(n => window.caches.delete(n)));
                        }
                        localStorage.removeItem('pawscord_msg_cache');
                        toast.info('Önbellek temizlendi!');
                    }} style={S.actionBtn}>
                        <FaTrash style={{ fontSize: 12 }} /> Önbelleği Temizle
                    </button>
                </div>
            </SettingSection>
            <SettingSection title="Hata Ayıklama">
                <div style={{ padding: 12, backgroundColor: '#1e1f22', borderRadius: 8, fontFamily: 'monospace', fontSize: 12, color: '#949ba4' }}>
                    <div>App Version: {window.__PAWSCORD_VERSION__ || '2.0.0'}</div>
                    <div>Build: {document.querySelector('script[src*="index-"]')?.src?.match(/index-(\w+)/)?.[1] || 'dev'}</div>
                    <div>Platform: {navigator.userAgent.includes('Electron') ? 'Desktop' : navigator.userAgent.includes('Android') ? 'Android' : 'Web'}</div>
                    <div>Service Worker: {navigator.serviceWorker?.controller ? 'Active' : 'Inactive'}</div>
                    <div>Memory: {navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'N/A'}</div>
                </div>
            </SettingSection>
        </div>
    );
};

const UserSettingsModal = ({ onClose, user }) => {
    const [activeTab, setActiveTab] = useState('account');

    // ESC to close
    useEffect(() => {
        const handler = (e) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [onClose]);

    const renderContent = () => {
        switch (activeTab) {
            case 'account': return <AccountTab user={user} />;
            case 'privacy': return <PrivacyTab />;
            case 'connections': return <ConnectionsTab />;
            case 'appearance': return <AppearanceTab />;
            case 'voice': return <VoiceTab />;
            case 'notifications': return <NotificationsTab />;
            case 'keybinds': return <KeybindsTab />;
            case 'language': return <LanguageTab />;
            case 'activity': return <ActivityTab />;
            case 'devices': return <DevicesTab />;
            case 'advanced': return <AdvancedTab />;
            default: return <AccountTab user={user} />;
        }
    };

    // Group tabs by section
    const sections = {};
    TABS.forEach(tab => {
        if (!sections[tab.section]) sections[tab.section] = [];
        sections[tab.section].push(tab);
    });

    return (
        <div style={S.overlay} onClick={onClose}>
            <div style={S.modal} onClick={e => e.stopPropagation()}>
                {/* Sidebar */}
                <div style={S.sidebar}>
                    <div style={S.sidebarScroll}>
                        {Object.entries(sections).map(([section, tabs]) => (
                            <div key={section}>
                                <div style={S.sectionLabel}>{section}</div>
                                {tabs.map(tab => {
                                    const Icon = tab.icon;
                                    const isActive = activeTab === tab.id;
                                    return (
                                        <button
                                            key={tab.id}
                                            type="button"
                                            style={{
                                                ...S.tabBtn,
                                                backgroundColor: isActive ? 'rgba(88,101,242,0.2)' : 'transparent',
                                                color: isActive ? '#fff' : '#949ba4',
                                            }}
                                            onClick={() => setActiveTab(tab.id)}
                                            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; }}
                                            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.backgroundColor = 'transparent'; }}
                                        >
                                            <Icon style={{ fontSize: 14, flexShrink: 0 }} />
                                            <span>{tab.label}</span>
                                        </button>
                                    );
                                })}
                                <div style={S.divider} />
                            </div>
                        ))}
                        <button type="button" style={{ ...S.tabBtn, color: '#da373c' }} onClick={onClose}>
                            <FaSignOutAlt style={{ fontSize: 14 }} />
                            <span>Çıkış Yap</span>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div style={S.content}>
                    <div style={S.contentHeader}>
                        <h2 style={{ color: '#fff', fontSize: 20, fontWeight: 700, margin: 0 }}>
                            {TABS.find(t => t.id === activeTab)?.label || 'Ayarlar'}
                        </h2>
                        <button type="button" style={S.closeBtn} onClick={onClose}>
                            <FaTimes />
                            <span style={{ fontSize: 11, color: '#949ba4' }}>ESC</span>
                        </button>
                    </div>
                    <div style={S.contentBody}>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

const S = {
    overlay: {
        position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5000,
    },
    modal: {
        display: 'flex', width: '95vw', maxWidth: 900, height: '85vh',
        backgroundColor: '#313338', borderRadius: 12, overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
    },
    sidebar: {
        width: 220, backgroundColor: '#2b2d31', flexShrink: 0,
        display: 'flex', flexDirection: 'column',
    },
    sidebarScroll: {
        flex: 1, overflowY: 'auto', padding: '12px 8px',
    },
    sectionLabel: {
        fontSize: 11, fontWeight: 700, color: '#949ba4', padding: '8px 10px 4px',
        letterSpacing: '0.04em',
    },
    tabBtn: {
        width: '100%', display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 10px', border: 'none', borderRadius: 4,
        cursor: 'pointer', fontSize: 14, fontWeight: 500,
        textAlign: 'left', transition: 'all 0.1s',
        background: 'transparent',
    },
    divider: {
        height: 1, backgroundColor: 'rgba(255,255,255,0.06)', margin: '8px 10px',
    },
    content: {
        flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden',
    },
    contentHeader: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    closeBtn: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
        background: 'none', border: '2px solid #949ba4', color: '#949ba4',
        width: 36, height: 36, borderRadius: '50%', cursor: 'pointer',
        justifyContent: 'center', fontSize: 14, transition: 'all 0.15s',
    },
    contentBody: {
        flex: 1, overflowY: 'auto', padding: '20px 24px',
    },
    actionBtn: {
        padding: '8px 16px', backgroundColor: 'rgba(88,101,242,0.1)',
        border: '1px solid rgba(88,101,242,0.3)', borderRadius: 4,
        color: '#5865f2', cursor: 'pointer', fontSize: 14, fontWeight: 500,
        display: 'flex', alignItems: 'center', gap: 8,
    },
    themeBtn: {
        width: 100, height: 70, borderRadius: 8, border: '2px solid',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', transition: 'border-color 0.15s',
    },
    kbd: {
        padding: '3px 8px', backgroundColor: '#1e1f22', borderRadius: 4,
        color: '#dcddde', fontSize: 12, fontFamily: 'monospace',
        border: '1px solid rgba(255,255,255,0.08)',
    },
    volumeRow: {
        display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0',
    },
};

export default memo(UserSettingsModal);
