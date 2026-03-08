// Helper to convert hex color to rgba hover background
const hexToRgba = (hex, alpha) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
};

export const getHoverBg = (color) => hexToRgba(color, 0.2);

export const FEATURE_SECTIONS = [
    {
        title: '⚙️ Genel Ayarlar',
        color: '#5865f2',
        items: [
            { icon: '⚙️', label: 'Kullanıcı Ayarları', modal: 'userSettings' },
            { icon: '⌨️', label: 'Kısayol Tuşları', modal: 'keyboardShortcuts' },
            { icon: '🔍', label: 'Komut Paleti', modal: 'commandPalette' },
            { icon: '🌍', label: 'Sunucu Keşfet', modal: 'serverDiscovery' },
            { icon: '🎨', label: 'Görünüm', modal: 'appearanceSettings' },
            { icon: '🌐', label: 'Dil Seçimi', modal: 'languageSelector' },
            { icon: '📋', label: 'Değişiklik Günlüğü', modal: 'changelog' },
            { icon: '🔊', label: 'Bildirim Sesleri', modal: 'notificationSounds' },
            { icon: '⚡', label: 'Hızlı Geçiş', modal: 'quickSwitcher' },
            { icon: '🚪', label: 'Çıkış Yap', modal: 'logoutConfirm' },
        ],
    },
    {
        title: '🔐 Güvenlik & Gizlilik',
        color: '#f23f42',
        items: [
            { icon: '🔐', label: 'Giriş Geçmişi', modal: 'loginHistory' },
            { icon: '🛡️', label: 'Güvenlik Ayarları', modal: 'securitySettings' },
            { icon: '🔒', label: 'Gizlilik Ayarları', modal: 'privacySettings' },
            { icon: '🚫', label: 'Engel Listesi', modal: 'blockList' },
            { icon: '🔐', label: 'E2E Şifreleme', modal: 'e2EESettings' },
            { icon: '❌', label: 'Hesap Silme', modal: 'accountDeletion' },
        ],
    },
    {
        title: '💬 İletişim',
        color: '#3ba55d',
        items: [
            { icon: '💬', label: 'Mesaj Konuları', modal: 'threadView' },
            { icon: '⏰', label: 'Zamanlanmış Mesajlar', modal: 'scheduledMessages' },
            { icon: '⏰', label: 'Hatırlatıcılar', modal: 'reminders' },
            { icon: '📋', label: 'Forum', modal: 'forum' },
            { icon: '🎤', label: 'Sahne Kanalı', modal: 'stageChannel' },
            { icon: '📹', label: 'Görüntülü Arama', modal: 'videoCall' },
            { icon: '🎙️', label: 'Ses Ayarları', modal: 'voiceSettings' },
            { icon: '🔍', label: 'Mesaj Arama', modal: 'messageSearch' },
            { icon: '🎬', label: 'Birlikte İzle', modal: 'watchTogether' },
        ],
    },
    {
        title: '🏠 Sunucu Yönetimi',
        color: '#f0b232',
        items: [
            { icon: '🤖', label: 'Otomatik Roller', modal: 'autoRoles' },
            { icon: '🎭', label: 'Tepki Rolleri', modal: 'reactionRoles' },
            { icon: '👋', label: 'Hoş Geldin Mesajları', modal: 'welcomeMessages' },
            { icon: '📅', label: 'Etkinlik Takvimi', modal: 'eventCalendar' },
            { icon: '🎉', label: 'Çekiliş', modal: 'giveaway' },
            { icon: '🎫', label: 'Destek Sistemi', modal: 'ticketSystem' },
            { icon: '⭐', label: 'Yıldız Panosu', modal: 'starboard' },
            { icon: '💾', label: 'Sunucu Yedekleme', modal: 'serverBackup' },
            { icon: '⚖️', label: 'Ban İtirazları', modal: 'banAppeals' },
            { icon: '🤖', label: 'Özel Komutlar', modal: 'customCommands' },
            { icon: '📊', label: 'Seviye Sistemi', modal: 'levelingSystem' },
            { icon: '📺', label: 'Canlı Yayın', modal: 'liveStream' },
        ],
    },
    {
        title: '🎮 Eğlence & Sosyal',
        color: '#5865f2',
        items: [
            { icon: '🏆', label: 'Başarımlar', modal: 'achievements' },
            { icon: '🎂', label: 'Doğum Günleri', modal: 'birthdaySystem' },
            { icon: '💎', label: 'Premium', modal: 'premium' },
            { icon: '🎵', label: 'Müzik Çalar', modal: 'musicPlayer' },
            { icon: '🤖', label: 'Bot Mağazası', modal: 'botMarketplace' },
            { icon: '👤', label: 'Profil Özelleştir', modal: 'profileCustomization' },
            { icon: '🔗', label: 'Entegrasyonlar', modal: 'integrationHub' },
            { icon: '🏆', label: 'Turnuvalar', modal: 'tournaments' },
        ],
    },
    {
        title: '🔧 Gelişmiş',
        color: '#e67e22',
        items: [
            { icon: '💡', label: 'Öne Çıkanlar', modal: 'highlights' },
            { icon: '📦', label: 'Özel Embed', modal: 'customEmbed' },
            { icon: '🎵', label: 'Spotify Bağlantısı', modal: 'spotifyIntegration' },
            { icon: '📋', label: 'Sunucu Klonla', modal: 'serverClone' },
            { icon: '🎯', label: 'Haftalık Görevler', modal: 'weeklyChallenges' },
            { icon: '🤖', label: 'AI Chatbot', modal: 'aIChatbot' },
            { icon: '👨‍💻', label: 'Kod Editörü', modal: 'codeEditor' },
            { icon: '🖥️', label: 'Ekran Paylaşımı', modal: 'screenShare' },
            { icon: '📺', label: 'Canlı Yayın', modal: 'liveStreamModal' },
            { icon: '📈', label: 'Gelişmiş Analitik', modal: 'advancedAnalytics' },
            { icon: '📁', label: 'Dosya Yöneticisi', modal: 'fileManager' },
            { icon: '📊', label: 'Raporlar', modal: 'reports' },
            { icon: '🐛', label: 'Hata Raporlama', modal: 'errorReporting' },
        ],
    },
    {
        title: '🔰 Moderasyon & Yönetim',
        color: '#e74c3c',
        items: [
            { icon: '🛡️', label: 'Moderasyon Araçları', modal: 'moderatorTools' },
            { icon: '🤖', label: 'AI Moderasyon', modal: 'aIModeration' },
            { icon: '🚫', label: 'Spam Koruması', modal: 'spamDetection' },
            { icon: '📋', label: 'Denetim Kayıtları', modal: 'auditLogs' },
            { icon: '⛔', label: 'Ban Geçmişi', modal: 'banHistory' },
            { icon: '📜', label: 'Moderasyon Logları', modal: 'moderationLogs' },
            { icon: '🛡️', label: 'Baskın Koruması', modal: 'raidProtection' },
            { icon: '🚨', label: 'Güvenlik Uyarıları', modal: 'securityAlerts' },
        ],
    },
    {
        title: '💬 Mesajlaşma & Medya',
        color: '#1abc9c',
        items: [
            { icon: '🔖', label: 'Yer İmleri', modal: 'bookmarks' },
            { icon: '🎞️', label: 'GIF Seçici', modal: 'gIFPicker' },
            { icon: '📊', label: 'Anket Oluştur', modal: 'pollCreator' },
            { icon: '🎨', label: 'Çıkartmalar', modal: 'stickers' },
            { icon: '💾', label: 'Kayıtlı Mesajlar', modal: 'savedMessages' },
            { icon: '🔔', label: 'Bildirim Merkezi', modal: 'notificationsCenter' },
            { icon: '📝', label: 'Mesaj Özeti', modal: 'messageSummary' },
            { icon: '🌍', label: 'Çeviri Paneli', modal: 'translation' },
        ],
    },
    {
        title: '🏠 Sunucu Yönetimi (Genişletilmiş)',
        color: '#2ecc71',
        items: [
            { icon: '⚙️', label: 'Kanal Ayarları', modal: 'channelSettings' },
            { icon: '📨', label: 'Davet Yönetimi', modal: 'inviteModal' },
            { icon: '📋', label: 'Sunucu Şablonları', modal: 'serverTemplates' },
            { icon: '📊', label: 'Sunucu Analitiği', modal: 'serverAnalytics' },
            { icon: '👑', label: 'Rol Yöneticisi', modal: 'rolesManager' },
            { icon: '👋', label: 'Karşılama Ekranı', modal: 'welcomeScreenEditor' },
            { icon: '🏘️', label: 'Topluluk Ayarları', modal: 'communitySettings' },
            { icon: '🔗', label: 'Davet Linkleri', modal: 'inviteLinkManager' },
        ],
    },
    {
        title: '🤖 Bot & Geliştirici',
        color: '#3498db',
        items: [
            { icon: '🤖', label: 'Bot Oluşturucu', modal: 'botBuilder' },
            { icon: '🧑‍💻', label: 'Geliştirici Portalı', modal: 'botDevPortal' },
            { icon: '🔗', label: 'Webhook Yöneticisi', modal: 'webhookManager' },
            { icon: '🔑', label: 'API Anahtarları', modal: 'aPIKeys' },
            { icon: '⚡', label: 'Slash Komutları', modal: 'slashCommands' },
            { icon: '💻', label: 'Kod Çalıştırıcı', modal: 'codeRunner' },
        ],
    },
    {
        title: '👤 Profil & Sosyal',
        color: '#e91e63',
        items: [
            { icon: '👤', label: 'Profil Kartı', modal: 'profileCard' },
            { icon: '📝', label: 'Kullanıcı Notları', modal: 'userNotes' },
            { icon: '🟢', label: 'Durum Seçici', modal: 'statusPicker' },
            { icon: '👥', label: 'Ortak Arkadaşlar', modal: 'mutuals' },
            { icon: '🏅', label: 'Profil Vitrini', modal: 'profileShowcase' },
            { icon: '📱', label: 'Oturum Yöneticisi', modal: 'sessionManager' },
        ],
    },
    {
        title: '💎 Premium & Ekonomi',
        color: '#f1c40f',
        items: [
            { icon: '🪙', label: 'Coin Mağazası', modal: 'coinStore' },
            { icon: '💎', label: 'Premium Yönetimi', modal: 'premiumManagement' },
            { icon: '📋', label: 'Abonelik Yönetimi', modal: 'subscriptionManager' },
            { icon: '🎁', label: 'Premium Hediye Et', modal: 'giftPremium' },
            { icon: '🛒', label: 'Premium Mağazası', modal: 'premiumMarketplace' },
            { icon: '🎨', label: 'Tema Mağazası', modal: 'themeMarketplace' },
        ],
    },
];
