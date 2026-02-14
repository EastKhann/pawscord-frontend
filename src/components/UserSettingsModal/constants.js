import { FaUser, FaShieldAlt, FaPalette, FaMicrophone, FaBell, FaKeyboard, FaGlobe, FaDesktop, FaCog, FaGamepad, FaLink } from 'react-icons/fa';

const TABS = [
    { id: 'account', label: 'Hesab\u0131m', icon: FaUser, section: 'KULLANICI AYARLARI' },
    { id: 'privacy', label: 'Gizlilik & G\u00FCvenlik', icon: FaShieldAlt, section: 'KULLANICI AYARLARI' },
    { id: 'connections', label: 'Ba\u011Flant\u0131lar', icon: FaLink, section: 'KULLANICI AYARLARI' },
    { id: 'appearance', label: 'G\u00F6r\u00FCn\u00FCm', icon: FaPalette, section: 'UYGULAMA AYARLARI' },
    { id: 'voice', label: 'Ses & Video', icon: FaMicrophone, section: 'UYGULAMA AYARLARI' },
    { id: 'notifications', label: 'Bildirimler', icon: FaBell, section: 'UYGULAMA AYARLARI' },
    { id: 'keybinds', label: 'K\u0131sayol Tu\u015Flar\u0131', icon: FaKeyboard, section: 'UYGULAMA AYARLARI' },
    { id: 'language', label: 'Dil', icon: FaGlobe, section: 'UYGULAMA AYARLARI' },
    { id: 'activity', label: 'Aktivite Durumu', icon: FaGamepad, section: 'UYGULAMA AYARLARI' },
    { id: 'devices', label: 'Oturumlar', icon: FaDesktop, section: 'UYGULAMA AYARLARI' },
    { id: 'advanced', label: 'Geli\u015Fmi\u015F', icon: FaCog, section: 'UYGULAMA AYARLARI' },
];

export default TABS;
