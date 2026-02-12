import React from 'react';
import { useUIStore } from '../stores/useUIStore';

const FeatureHubModal = () => {
    const { openModal, closeModal } = useUIStore();

    return (
        <div style={{

            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,

            backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 9999,

            display: 'flex', justifyContent: 'center', alignItems: 'center',

            backdropFilter: 'blur(8px)'

        }} onClick={(e) => { if (e.target === e.currentTarget) closeModal('featureHub'); }}>

            <div style={{

                backgroundColor: '#2f3136', borderRadius: '16px', width: '90%', maxWidth: '900px',

                maxHeight: '85vh', overflow: 'auto', padding: '32px',

                boxShadow: '0 20px 60px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)'

            }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>

                    <h2 style={{ margin: 0, fontSize: '1.5em', color: '#fff' }}>🚀 Tüm Özellikler</h2>

                    <button onClick={() => closeModal('featureHub')} style={{ background: 'none', border: 'none', color: '#b9bbbe', fontSize: '1.5em', cursor: 'pointer' }}>✕</button>

                </div>


                {/* ⚙️ CORE UX */}

                <div style={{ marginBottom: '20px' }}>

                    <h3 style={{ color: '#7289da', fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>⚙️ Genel Ayarlar</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>

                        {[

                            { icon: '⚙️', label: 'Kullanıcı Ayarları', action: () => openModal('userSettings') },

                            { icon: '⌨️', label: 'Kısayol Tuşları', action: () => openModal('keyboardShortcuts') },

                            { icon: '🔍', label: 'Komut Paleti', action: () => openModal('commandPalette') },

                            { icon: '🌍', label: 'Sunucu Keşfet', action: () => openModal('serverDiscovery') },

                            { icon: '🎨', label: 'Görünüm', action: () => openModal('appearanceSettings') },

                            { icon: '🌐', label: 'Dil Seçimi', action: () => openModal('languageSelector') },

                            { icon: '📋', label: 'Değişiklik Günlüğü', action: () => openModal('changelog') },

                            { icon: '🔊', label: 'Bildirim Sesleri', action: () => openModal('notificationSounds') },

                            { icon: '⚡', label: 'Hızlı Geçiş', action: () => openModal('quickSwitcher') },

                            { icon: '🚪', label: 'Çıkış Yap', action: () => openModal('logoutConfirm') },

                        ].map((item, i) => (

                            <button key={i} onClick={() => { item.action(); closeModal('featureHub'); }}

                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#dcddde', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}

                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(88,101,242,0.2)'; e.currentTarget.style.borderColor = '#5865f2'; }}

                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}

                            >

                                <span style={{ fontSize: '16px' }}>{item.icon}</span>

                                <span>{item.label}</span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* 🔐 SECURITY */}

                <div style={{ marginBottom: '20px' }}>

                    <h3 style={{ color: '#ed4245', fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>🔐 Güvenlik & Gizlilik</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>

                        {[

                            { icon: '🔐', label: 'Giriş Geçmişi', action: () => openModal('loginHistory') },

                            { icon: '🛡️', label: 'Güvenlik Ayarları', action: () => openModal('securitySettings') },

                            { icon: '🔒', label: 'Gizlilik Ayarları', action: () => openModal('privacySettings') },

                            { icon: '🚫', label: 'Engel Listesi', action: () => openModal('blockList') },

                            { icon: '🔐', label: 'E2E Şifreleme', action: () => openModal('e2EESettings') },

                            { icon: '❌', label: 'Hesap Silme', action: () => openModal('accountDeletion') },

                        ].map((item, i) => (

                            <button key={i} onClick={() => { item.action(); closeModal('featureHub'); }}

                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#dcddde', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}

                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(237,66,69,0.2)'; e.currentTarget.style.borderColor = '#ed4245'; }}

                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}

                            >

                                <span style={{ fontSize: '16px' }}>{item.icon}</span>

                                <span>{item.label}</span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* 💬 COMMUNICATION */}

                <div style={{ marginBottom: '20px' }}>

                    <h3 style={{ color: '#3ba55d', fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>💬 İletişim</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>

                        {[

                            { icon: '💬', label: 'Mesaj Konuları', action: () => openModal('threadView') },

                            { icon: '⏰', label: 'Zamanlanmış Mesajlar', action: () => openModal('scheduledMessages') },

                            { icon: '⏰', label: 'Hatırlatıcılar', action: () => openModal('reminders') },

                            { icon: '📋', label: 'Forum', action: () => openModal('forum') },

                            { icon: '🎤', label: 'Sahne Kanalı', action: () => openModal('stageChannel') },

                            { icon: '📹', label: 'Görüntülü Arama', action: () => openModal('videoCall') },

                            { icon: '🎙️', label: 'Ses Ayarları', action: () => openModal('voiceSettings') },

                            { icon: '🔍', label: 'Mesaj Arama', action: () => openModal('messageSearch') },

                            { icon: '🎬', label: 'Birlikte İzle', action: () => openModal('watchTogether') },

                        ].map((item, i) => (

                            <button key={i} onClick={() => { item.action(); closeModal('featureHub'); }}

                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#dcddde', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}

                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(59,165,93,0.2)'; e.currentTarget.style.borderColor = '#3ba55d'; }}

                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}

                            >

                                <span style={{ fontSize: '16px' }}>{item.icon}</span>

                                <span>{item.label}</span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* 🏠 SERVER MANAGEMENT */}

                <div style={{ marginBottom: '20px' }}>

                    <h3 style={{ color: '#faa61a', fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>🏠 Sunucu Yönetimi</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>

                        {[

                            { icon: '🤖', label: 'Otomatik Roller', action: () => openModal('autoRoles') },

                            { icon: '🎭', label: 'Tepki Rolleri', action: () => openModal('reactionRoles') },

                            { icon: '👋', label: 'Hoş Geldin Mesajları', action: () => openModal('welcomeMessages') },

                            { icon: '📅', label: 'Etkinlik Takvimi', action: () => openModal('eventCalendar') },

                            { icon: '🎉', label: 'Çekiliş', action: () => openModal('giveaway') },

                            { icon: '🎫', label: 'Destek Sistemi', action: () => openModal('ticketSystem') },

                            { icon: '⭐', label: 'Yıldız Panosu', action: () => openModal('starboard') },

                            { icon: '💾', label: 'Sunucu Yedekleme', action: () => openModal('serverBackup') },

                            { icon: '⚖️', label: 'Ban İtirazları', action: () => openModal('banAppeals') },

                            { icon: '🤖', label: 'Özel Komutlar', action: () => openModal('customCommands') },

                            { icon: '📊', label: 'Seviye Sistemi', action: () => openModal('levelingSystem') },

                            { icon: '📺', label: 'Canlı Yayın', action: () => openModal('liveStream') },

                        ].map((item, i) => (

                            <button key={i} onClick={() => { item.action(); closeModal('featureHub'); }}

                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#dcddde', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}

                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(250,166,26,0.2)'; e.currentTarget.style.borderColor = '#faa61a'; }}

                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}

                            >

                                <span style={{ fontSize: '16px' }}>{item.icon}</span>

                                <span>{item.label}</span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* 🎮 ENGAGEMENT */}

                <div style={{ marginBottom: '20px' }}>

                    <h3 style={{ color: '#9b59b6', fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>🎮 Eğlence & Sosyal</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>

                        {[

                            { icon: '🏆', label: 'Başarımlar', action: () => openModal('achievements') },

                            { icon: '🎂', label: 'Doğum Günleri', action: () => openModal('birthdaySystem') },

                            { icon: '💎', label: 'Premium', action: () => openModal('premium') },

                            { icon: '🎵', label: 'Müzik Çalar', action: () => openModal('musicPlayer') },

                            { icon: '🤖', label: 'Bot Mağazası', action: () => openModal('botMarketplace') },

                            { icon: '👤', label: 'Profil Özelleştir', action: () => openModal('profileCustomization') },

                            { icon: '🔗', label: 'Entegrasyonlar', action: () => openModal('integrationHub') },

                            { icon: '🏆', label: 'Turnuvalar', action: () => openModal('tournaments') },

                        ].map((item, i) => (

                            <button key={i} onClick={() => { item.action(); closeModal('featureHub'); }}

                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#dcddde', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}

                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(155,89,182,0.2)'; e.currentTarget.style.borderColor = '#9b59b6'; }}

                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}

                            >

                                <span style={{ fontSize: '16px' }}>{item.icon}</span>

                                <span>{item.label}</span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* 🔧 ADVANCED */}

                <div style={{ marginBottom: '20px' }}>

                    <h3 style={{ color: '#e67e22', fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>🔧 Gelişmiş</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>

                        {[

                            { icon: '💡', label: 'Öne Çıkanlar', action: () => openModal('highlights') },

                            { icon: '📦', label: 'Özel Embed', action: () => openModal('customEmbed') },

                            { icon: '🎵', label: 'Spotify Bağlantısı', action: () => openModal('spotifyIntegration') },

                            { icon: '📋', label: 'Sunucu Klonla', action: () => openModal('serverClone') },

                            { icon: '🎯', label: 'Haftalık Görevler', action: () => openModal('weeklyChallenges') },

                            { icon: '🤖', label: 'AI Chatbot', action: () => openModal('aIChatbot') },

                            { icon: '👨‍💻', label: 'Kod Editörü', action: () => openModal('codeEditor') },

                            { icon: '🖥️', label: 'Ekran Paylaşımı', action: () => openModal('screenShare') },

                            { icon: '📺', label: 'Canlı Yayın', action: () => openModal('liveStreamModal') },

                            { icon: '📈', label: 'Gelişmiş Analitik', action: () => openModal('advancedAnalytics') },

                            { icon: '📁', label: 'Dosya Yöneticisi', action: () => openModal('fileManager') },

                            { icon: '📊', label: 'Raporlar', action: () => openModal('reports') },

                            { icon: '🐛', label: 'Hata Raporlama', action: () => openModal('errorReporting') },

                        ].map((item, i) => (

                            <button key={i} onClick={() => { item.action(); closeModal('featureHub'); }}

                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#dcddde', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}

                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(230,126,34,0.2)'; e.currentTarget.style.borderColor = '#e67e22'; }}

                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}

                            >

                                <span style={{ fontSize: '16px' }}>{item.icon}</span>

                                <span>{item.label}</span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* 🔰 MODERATION - BATCH 11 */}

                <div style={{ marginBottom: '20px' }}>

                    <h3 style={{ color: '#e74c3c', fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>🔰 Moderasyon & Yönetim</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>

                        {[

                            { icon: '🛡️', label: 'Moderasyon Araçları', action: () => openModal('moderatorTools') },

                            { icon: '🤖', label: 'AI Moderasyon', action: () => openModal('aIModeration') },

                            { icon: '🚫', label: 'Spam Koruması', action: () => openModal('spamDetection') },

                            { icon: '📋', label: 'Denetim Kayıtları', action: () => openModal('auditLogs') },

                            { icon: '⛔', label: 'Ban Geçmişi', action: () => openModal('banHistory') },

                            { icon: '📜', label: 'Moderasyon Logları', action: () => openModal('moderationLogs') },

                            { icon: '🛡️', label: 'Baskın Koruması', action: () => openModal('raidProtection') },

                            { icon: '🚨', label: 'Güvenlik Uyarıları', action: () => openModal('securityAlerts') },

                        ].map((item, i) => (

                            <button key={i} onClick={() => { item.action(); closeModal('featureHub'); }}

                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#dcddde', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}

                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(231,76,60,0.2)'; e.currentTarget.style.borderColor = '#e74c3c'; }}

                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}

                            >

                                <span style={{ fontSize: '16px' }}>{item.icon}</span>

                                <span>{item.label}</span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* 💬 MESSAGING - BATCH 11 */}

                <div style={{ marginBottom: '20px' }}>

                    <h3 style={{ color: '#1abc9c', fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>💬 Mesajlaşma & Medya</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>

                        {[

                            { icon: '🔖', label: 'Yer İmleri', action: () => openModal('bookmarks') },

                            { icon: '🎞️', label: 'GIF Seçici', action: () => openModal('gIFPicker') },

                            { icon: '📊', label: 'Anket Oluştur', action: () => openModal('pollCreator') },

                            { icon: '🎨', label: 'Çıkartmalar', action: () => openModal('stickers') },

                            { icon: '💾', label: 'Kayıtlı Mesajlar', action: () => openModal('savedMessages') },

                            { icon: '🔔', label: 'Bildirim Merkezi', action: () => openModal('notificationsCenter') },

                            { icon: '📝', label: 'Mesaj Özeti', action: () => openModal('messageSummary') },

                            { icon: '🌍', label: 'Çeviri Paneli', action: () => openModal('translation') },

                        ].map((item, i) => (

                            <button key={i} onClick={() => { item.action(); closeModal('featureHub'); }}

                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#dcddde', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}

                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(26,188,156,0.2)'; e.currentTarget.style.borderColor = '#1abc9c'; }}

                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}

                            >

                                <span style={{ fontSize: '16px' }}>{item.icon}</span>

                                <span>{item.label}</span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* 🏠 SERVER EXTENDED - BATCH 11 */}

                <div style={{ marginBottom: '20px' }}>

                    <h3 style={{ color: '#2ecc71', fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>🏠 Sunucu Yönetimi (Genişletilmiş)</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>

                        {[

                            { icon: '⚙️', label: 'Kanal Ayarları', action: () => openModal('channelSettings') },

                            { icon: '📨', label: 'Davet Yönetimi', action: () => openModal('inviteModal') },

                            { icon: '📋', label: 'Sunucu Şablonları', action: () => openModal('serverTemplates') },

                            { icon: '📊', label: 'Sunucu Analitiği', action: () => openModal('serverAnalytics') },

                            { icon: '👑', label: 'Rol Yöneticisi', action: () => openModal('rolesManager') },

                            { icon: '👋', label: 'Karşılama Ekranı', action: () => openModal('welcomeScreenEditor') },

                            { icon: '🏘️', label: 'Topluluk Ayarları', action: () => openModal('communitySettings') },

                            { icon: '🔗', label: 'Davet Linkleri', action: () => openModal('inviteLinkManager') },

                        ].map((item, i) => (

                            <button key={i} onClick={() => { item.action(); closeModal('featureHub'); }}

                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#dcddde', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}

                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(46,204,113,0.2)'; e.currentTarget.style.borderColor = '#2ecc71'; }}

                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}

                            >

                                <span style={{ fontSize: '16px' }}>{item.icon}</span>

                                <span>{item.label}</span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* 🤖 BOT & DEVELOPER - BATCH 11 */}

                <div style={{ marginBottom: '20px' }}>

                    <h3 style={{ color: '#3498db', fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>🤖 Bot & Geliştirici</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>

                        {[

                            { icon: '🤖', label: 'Bot Oluşturucu', action: () => openModal('botBuilder') },

                            { icon: '🧑‍💻', label: 'Geliştirici Portalı', action: () => openModal('botDevPortal') },

                            { icon: '🔗', label: 'Webhook Yöneticisi', action: () => openModal('webhookManager') },

                            { icon: '🔑', label: 'API Anahtarları', action: () => openModal('aPIKeys') },

                            { icon: '⚡', label: 'Slash Komutları', action: () => openModal('slashCommands') },

                            { icon: '💻', label: 'Kod Çalıştırıcı', action: () => openModal('codeRunner') },

                        ].map((item, i) => (

                            <button key={i} onClick={() => { item.action(); closeModal('featureHub'); }}

                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#dcddde', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}

                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(52,152,219,0.2)'; e.currentTarget.style.borderColor = '#3498db'; }}

                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}

                            >

                                <span style={{ fontSize: '16px' }}>{item.icon}</span>

                                <span>{item.label}</span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* 👤 PROFILE & SOCIAL - BATCH 11 */}

                <div style={{ marginBottom: '20px' }}>

                    <h3 style={{ color: '#e91e63', fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>👤 Profil & Sosyal</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>

                        {[

                            { icon: '👤', label: 'Profil Kartı', action: () => openModal('profileCard') },

                            { icon: '📝', label: 'Kullanıcı Notları', action: () => openModal('userNotes') },

                            { icon: '🟢', label: 'Durum Seçici', action: () => openModal('statusPicker') },

                            { icon: '👥', label: 'Ortak Arkadaşlar', action: () => openModal('mutuals') },

                            { icon: '🏅', label: 'Profil Vitrini', action: () => openModal('profileShowcase') },

                            { icon: '📱', label: 'Oturum Yöneticisi', action: () => openModal('sessionManager') },

                        ].map((item, i) => (

                            <button key={i} onClick={() => { item.action(); closeModal('featureHub'); }}

                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#dcddde', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}

                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(233,30,99,0.2)'; e.currentTarget.style.borderColor = '#e91e63'; }}

                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}

                            >

                                <span style={{ fontSize: '16px' }}>{item.icon}</span>

                                <span>{item.label}</span>

                            </button>

                        ))}

                    </div>

                </div>


                {/* 💎 PREMIUM & ECONOMY - BATCH 11 */}

                <div>

                    <h3 style={{ color: '#f1c40f', fontSize: '0.85em', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>💎 Premium & Ekonomi</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>

                        {[

                            { icon: '🪙', label: 'Coin Mağazası', action: () => openModal('coinStore') },

                            { icon: '💎', label: 'Premium Yönetimi', action: () => openModal('premiumManagement') },

                            { icon: '📋', label: 'Abonelik Yönetimi', action: () => openModal('subscriptionManager') },

                            { icon: '🎁', label: 'Premium Hediye Et', action: () => openModal('giftPremium') },

                            { icon: '🛒', label: 'Premium Mağaza', action: () => openModal('premiumMarketplace') },

                            { icon: '🎨', label: 'Tema Mağazası', action: () => openModal('themeMarketplace') },

                        ].map((item, i) => (

                            <button key={i} onClick={() => { item.action(); closeModal('featureHub'); }}

                                style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', color: '#dcddde', cursor: 'pointer', fontSize: '13px', transition: 'all 0.2s', textAlign: 'left' }}

                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(241,196,15,0.2)'; e.currentTarget.style.borderColor = '#f1c40f'; }}

                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}

                            >

                                <span style={{ fontSize: '16px' }}>{item.icon}</span>

                                <span>{item.label}</span>

                            </button>

                        ))}

                    </div>

                </div>

            </div>

        </div>

    );
};

export default FeatureHubModal;
