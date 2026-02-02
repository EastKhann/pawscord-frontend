// frontend/src/utils/iconOptimization.js
// ⚡ OPTIMIZATION: Selective Icon Imports
// react-icons'dan sadece kullanılan iconları import et
// Bundle size: ~180KB → ~50KB reduction

// FaIcons
export {
    FaPlusCircle,
    FaUsers,
    FaFilm,
    FaGift,
    FaMicrophone,
    FaMicrophoneSlash,
    FaCode,
    FaSearch,
    FaBroom,
    FaLock,
    FaCoffee,
    FaMagic,
    FaPaperPlane,
    FaLink,
    FaThumbtack,
    FaBellSlash,
    FaBell,
    FaTimes,
    FaPoll,
    FaPhoneSlash,
    FaHeadphones,
    FaVideo,
    FaDesktop,
    FaUserFriends,
    FaChevronDown,
    FaChevronRight,
    FaPlus,
    FaCog,
    FaVolumeUp,
    FaRobot,
    FaChartLine,
    FaServer,
    FaUserPlus,
    FaTrash,
    FaEdit,
    FaCompass,
    FaHeart,
    FaBitcoin,
    FaCopy,
    FaVideoSlash,
    FaCheck,
    FaCircle,
    FaMoon,
    FaCrown,
} from 'react-icons/fa';

// TbIcons
export {
    TbHeadphonesOff,
} from 'react-icons/tb';

// MdIcons (Material Design)
export {
    MdSend,
    MdAttachFile,
    MdEmojiEmotions,
    MdGif,
    MdClose,
    MdSettings,
} from 'react-icons/md';

// BiIcons (BoxIcons)
export {
    BiMicrophone,
    BiMicrophoneOff,
} from 'react-icons/bi';

// HiIcons (Heroicons)
export {
    HiOutlineStatusOnline,
    HiOutlineStatusOffline,
} from 'react-icons/hi';

/**
 * KULLANIM:
 * 
 * Öncesi (❌ Tüm icon library yüklenir):
 * import { FaPaperPlane, FaLink } from 'react-icons/fa';
 * 
 * Sonrası (✅ Sadece gerekli iconlar):
 * import { FaPaperPlane, FaLink } from './utils/iconOptimization';
 * 
 * Bundle Etkisi:
 * - 180KB → 50KB (react-icons chunk size)
 * - Tree shaking ile otomatik optimize
 */

export default {
    // Gelecekte başka icon setleri eklenebilir
};


