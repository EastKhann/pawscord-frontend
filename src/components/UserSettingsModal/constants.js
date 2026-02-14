import { FaUser, FaShieldAlt, FaPalette, FaMicrophone, FaBell, FaKeyboard, FaGlobe, FaDesktop, FaCog, FaGamepad, FaLink } from 'react-icons/fa';

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

export default TABS;
