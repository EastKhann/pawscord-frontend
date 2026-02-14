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
        title: '\u2699\uFE0F Genel Ayarlar',
        color: '#7289da',
        items: [
            { icon: '\u2699\uFE0F', label: 'Kullan\u0131c\u0131 Ayarlar\u0131', modal: 'userSettings' },
            { icon: '\u2328\uFE0F', label: 'K\u0131sayol Tu\u015Flar\u0131', modal: 'keyboardShortcuts' },
            { icon: '\uD83D\uDD0D', label: 'Komut Paleti', modal: 'commandPalette' },
            { icon: '\uD83C\uDF0D', label: 'Sunucu Ke\u015Ffet', modal: 'serverDiscovery' },
            { icon: '\uD83C\uDFA8', label: 'G\u00F6r\u00FCn\u00FCm', modal: 'appearanceSettings' },
            { icon: '\uD83C\uDF10', label: 'Dil Se\u00E7imi', modal: 'languageSelector' },
            { icon: '\uD83D\uDCCB', label: 'De\u011Fi\u015Fiklik G\u00FCnl\u00FC\u011F\u00FC', modal: 'changelog' },
            { icon: '\uD83D\uDD0A', label: 'Bildirim Sesleri', modal: 'notificationSounds' },
            { icon: '\u26A1', label: 'H\u0131zl\u0131 Ge\u00E7i\u015F', modal: 'quickSwitcher' },
            { icon: '\uD83D\uDEAA', label: '\u00C7\u0131k\u0131\u015F Yap', modal: 'logoutConfirm' },
        ],
    },
    {
        title: '\uD83D\uDD10 G\u00FCvenlik & Gizlilik',
        color: '#ed4245',
        items: [
            { icon: '\uD83D\uDD10', label: 'Giri\u015F Ge\u00E7mi\u015Fi', modal: 'loginHistory' },
            { icon: '\uD83D\uDEE1\uFE0F', label: 'G\u00FCvenlik Ayarlar\u0131', modal: 'securitySettings' },
            { icon: '\uD83D\uDD12', label: 'Gizlilik Ayarlar\u0131', modal: 'privacySettings' },
            { icon: '\uD83D\uDEAB', label: 'Engel Listesi', modal: 'blockList' },
            { icon: '\uD83D\uDD10', label: 'E2E \u015Eifreleme', modal: 'e2EESettings' },
            { icon: '\u274C', label: 'Hesap Silme', modal: 'accountDeletion' },
        ],
    },
    {
        title: '\uD83D\uDCAC \u0130leti\u015Fim',
        color: '#3ba55d',
        items: [
            { icon: '\uD83D\uDCAC', label: 'Mesaj Konular\u0131', modal: 'threadView' },
            { icon: '\u23F0', label: 'Zamanlanm\u0131\u015F Mesajlar', modal: 'scheduledMessages' },
            { icon: '\u23F0', label: 'Hat\u0131rlat\u0131c\u0131lar', modal: 'reminders' },
            { icon: '\uD83D\uDCCB', label: 'Forum', modal: 'forum' },
            { icon: '\uD83C\uDFA4', label: 'Sahne Kanal\u0131', modal: 'stageChannel' },
            { icon: '\uD83D\uDCF9', label: 'G\u00F6r\u00FCnt\u00FCl\u00FC Arama', modal: 'videoCall' },
            { icon: '\uD83C\uDF99\uFE0F', label: 'Ses Ayarlar\u0131', modal: 'voiceSettings' },
            { icon: '\uD83D\uDD0D', label: 'Mesaj Arama', modal: 'messageSearch' },
            { icon: '\uD83C\uDFAC', label: 'Birlikte \u0130zle', modal: 'watchTogether' },
        ],
    },
    {
        title: '\uD83C\uDFE0 Sunucu Y\u00F6netimi',
        color: '#faa61a',
        items: [
            { icon: '\uD83E\uDD16', label: 'Otomatik Roller', modal: 'autoRoles' },
            { icon: '\uD83C\uDFAD', label: 'Tepki Rolleri', modal: 'reactionRoles' },
            { icon: '\uD83D\uDC4B', label: 'Ho\u015F Geldin Mesajlar\u0131', modal: 'welcomeMessages' },
            { icon: '\uD83D\uDCC5', label: 'Etkinlik Takvimi', modal: 'eventCalendar' },
            { icon: '\uD83C\uDF89', label: '\u00C7ekili\u015F', modal: 'giveaway' },
            { icon: '\uD83C\uDFAB', label: 'Destek Sistemi', modal: 'ticketSystem' },
            { icon: '\u2B50', label: 'Y\u0131ld\u0131z Panosu', modal: 'starboard' },
            { icon: '\uD83D\uDCBE', label: 'Sunucu Yedekleme', modal: 'serverBackup' },
            { icon: '\u2696\uFE0F', label: 'Ban \u0130tirazlar\u0131', modal: 'banAppeals' },
            { icon: '\uD83E\uDD16', label: '\u00D6zel Komutlar', modal: 'customCommands' },
            { icon: '\uD83D\uDCCA', label: 'Seviye Sistemi', modal: 'levelingSystem' },
            { icon: '\uD83D\uDCFA', label: 'Canl\u0131 Yay\u0131n', modal: 'liveStream' },
        ],
    },
    {
        title: '\uD83C\uDFAE E\u011Flence & Sosyal',
        color: '#9b59b6',
        items: [
            { icon: '\uD83C\uDFC6', label: 'Ba\u015Far\u0131mlar', modal: 'achievements' },
            { icon: '\uD83C\uDF82', label: 'Do\u011Fum G\u00FCnleri', modal: 'birthdaySystem' },
            { icon: '\uD83D\uDC8E', label: 'Premium', modal: 'premium' },
            { icon: '\uD83C\uDFB5', label: 'M\u00FCzik \u00C7alar', modal: 'musicPlayer' },
            { icon: '\uD83E\uDD16', label: 'Bot Ma\u011Fazas\u0131', modal: 'botMarketplace' },
            { icon: '\uD83D\uDC64', label: 'Profil \u00D6zelle\u015Ftir', modal: 'profileCustomization' },
            { icon: '\uD83D\uDD17', label: 'Entegrasyonlar', modal: 'integrationHub' },
            { icon: '\uD83C\uDFC6', label: 'Turnuvalar', modal: 'tournaments' },
        ],
    },
    {
        title: '\uD83D\uDD27 Geli\u015Fmi\u015F',
        color: '#e67e22',
        items: [
            { icon: '\uD83D\uDCA1', label: '\u00D6ne \u00C7\u0131kanlar', modal: 'highlights' },
            { icon: '\uD83D\uDCE6', label: '\u00D6zel Embed', modal: 'customEmbed' },
            { icon: '\uD83C\uDFB5', label: 'Spotify Ba\u011Flant\u0131s\u0131', modal: 'spotifyIntegration' },
            { icon: '\uD83D\uDCCB', label: 'Sunucu Klonla', modal: 'serverClone' },
            { icon: '\uD83C\uDFAF', label: 'Haftal\u0131k G\u00F6revler', modal: 'weeklyChallenges' },
            { icon: '\uD83E\uDD16', label: 'AI Chatbot', modal: 'aIChatbot' },
            { icon: '\uD83D\uDC68\u200D\uD83D\uDCBB', label: 'Kod Edit\u00F6r\u00FC', modal: 'codeEditor' },
            { icon: '\uD83D\uDDA5\uFE0F', label: 'Ekran Payla\u015F\u0131m\u0131', modal: 'screenShare' },
            { icon: '\uD83D\uDCFA', label: 'Canl\u0131 Yay\u0131n', modal: 'liveStreamModal' },
            { icon: '\uD83D\uDCC8', label: 'Geli\u015Fmi\u015F Analitik', modal: 'advancedAnalytics' },
            { icon: '\uD83D\uDCC1', label: 'Dosya Y\u00F6neticisi', modal: 'fileManager' },
            { icon: '\uD83D\uDCCA', label: 'Raporlar', modal: 'reports' },
            { icon: '\uD83D\uDC1B', label: 'Hata Raporlama', modal: 'errorReporting' },
        ],
    },
    {
        title: '\uD83D\uDD30 Moderasyon & Y\u00F6netim',
        color: '#e74c3c',
        items: [
            { icon: '\uD83D\uDEE1\uFE0F', label: 'Moderasyon Ara\u00E7lar\u0131', modal: 'moderatorTools' },
            { icon: '\uD83E\uDD16', label: 'AI Moderasyon', modal: 'aIModeration' },
            { icon: '\uD83D\uDEAB', label: 'Spam Korumas\u0131', modal: 'spamDetection' },
            { icon: '\uD83D\uDCCB', label: 'Denetim Kay\u0131tlar\u0131', modal: 'auditLogs' },
            { icon: '\u26D4', label: 'Ban Ge\u00E7mi\u015Fi', modal: 'banHistory' },
            { icon: '\uD83D\uDCDC', label: 'Moderasyon Loglar\u0131', modal: 'moderationLogs' },
            { icon: '\uD83D\uDEE1\uFE0F', label: 'Bask\u0131n Korumas\u0131', modal: 'raidProtection' },
            { icon: '\uD83D\uDEA8', label: 'G\u00FCvenlik Uyar\u0131lar\u0131', modal: 'securityAlerts' },
        ],
    },
    {
        title: '\uD83D\uDCAC Mesajla\u015Fma & Medya',
        color: '#1abc9c',
        items: [
            { icon: '\uD83D\uDD16', label: 'Yer \u0130mleri', modal: 'bookmarks' },
            { icon: '\uD83C\uDF9E\uFE0F', label: 'GIF Se\u00E7ici', modal: 'gIFPicker' },
            { icon: '\uD83D\uDCCA', label: 'Anket Olu\u015Ftur', modal: 'pollCreator' },
            { icon: '\uD83C\uDFA8', label: '\u00C7\u0131kartmalar', modal: 'stickers' },
            { icon: '\uD83D\uDCBE', label: 'Kay\u0131tl\u0131 Mesajlar', modal: 'savedMessages' },
            { icon: '\uD83D\uDD14', label: 'Bildirim Merkezi', modal: 'notificationsCenter' },
            { icon: '\uD83D\uDCDD', label: 'Mesaj \u00D6zeti', modal: 'messageSummary' },
            { icon: '\uD83C\uDF0D', label: '\u00C7eviri Paneli', modal: 'translation' },
        ],
    },
    {
        title: '\uD83C\uDFE0 Sunucu Y\u00F6netimi (Geni\u015Fletilmi\u015F)',
        color: '#2ecc71',
        items: [
            { icon: '\u2699\uFE0F', label: 'Kanal Ayarlar\u0131', modal: 'channelSettings' },
            { icon: '\uD83D\uDCE8', label: 'Davet Y\u00F6netimi', modal: 'inviteModal' },
            { icon: '\uD83D\uDCCB', label: 'Sunucu \u015Eablonlar\u0131', modal: 'serverTemplates' },
            { icon: '\uD83D\uDCCA', label: 'Sunucu Analiti\u011Fi', modal: 'serverAnalytics' },
            { icon: '\uD83D\uDC51', label: 'Rol Y\u00F6neticisi', modal: 'rolesManager' },
            { icon: '\uD83D\uDC4B', label: 'Kar\u015F\u0131lama Ekran\u0131', modal: 'welcomeScreenEditor' },
            { icon: '\uD83C\uDFD8\uFE0F', label: 'Topluluk Ayarlar\u0131', modal: 'communitySettings' },
            { icon: '\uD83D\uDD17', label: 'Davet Linkleri', modal: 'inviteLinkManager' },
        ],
    },
    {
        title: '\uD83E\uDD16 Bot & Geli\u015Ftirici',
        color: '#3498db',
        items: [
            { icon: '\uD83E\uDD16', label: 'Bot Olu\u015Fturucu', modal: 'botBuilder' },
            { icon: '\uD83E\uDDD1\u200D\uD83D\uDCBB', label: 'Geli\u015Ftirici Portal\u0131', modal: 'botDevPortal' },
            { icon: '\uD83D\uDD17', label: 'Webhook Y\u00F6neticisi', modal: 'webhookManager' },
            { icon: '\uD83D\uDD11', label: 'API Anahtarlar\u0131', modal: 'aPIKeys' },
            { icon: '\u26A1', label: 'Slash Komutlar\u0131', modal: 'slashCommands' },
            { icon: '\uD83D\uDCBB', label: 'Kod \u00C7al\u0131\u015Ft\u0131r\u0131c\u0131', modal: 'codeRunner' },
        ],
    },
    {
        title: '\uD83D\uDC64 Profil & Sosyal',
        color: '#e91e63',
        items: [
            { icon: '\uD83D\uDC64', label: 'Profil Kart\u0131', modal: 'profileCard' },
            { icon: '\uD83D\uDCDD', label: 'Kullan\u0131c\u0131 Notlar\u0131', modal: 'userNotes' },
            { icon: '\uD83D\uDFE2', label: 'Durum Se\u00E7ici', modal: 'statusPicker' },
            { icon: '\uD83D\uDC65', label: 'Ortak Arkada\u015Flar', modal: 'mutuals' },
            { icon: '\uD83C\uDFC5', label: 'Profil Vitrini', modal: 'profileShowcase' },
            { icon: '\uD83D\uDCF1', label: 'Oturum Y\u00F6neticisi', modal: 'sessionManager' },
        ],
    },
    {
        title: '\uD83D\uDC8E Premium & Ekonomi',
        color: '#f1c40f',
        items: [
            { icon: '\uD83E\uDE99', label: 'Coin Ma\u011Fazas\u0131', modal: 'coinStore' },
            { icon: '\uD83D\uDC8E', label: 'Premium Y\u00F6netimi', modal: 'premiumManagement' },
            { icon: '\uD83D\uDCCB', label: 'Abonelik Y\u00F6netimi', modal: 'subscriptionManager' },
            { icon: '\uD83C\uDF81', label: 'Premium Hediye Et', modal: 'giftPremium' },
            { icon: '\uD83D\uDED2', label: 'Premium Ma\u011Fazas\u0131', modal: 'premiumMarketplace' },
            { icon: '\uD83C\uDFA8', label: 'Tema Ma\u011Fazas\u0131', modal: 'themeMarketplace' },
        ],
    },
];
