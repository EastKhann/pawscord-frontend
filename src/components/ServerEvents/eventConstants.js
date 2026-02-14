import { FaCalendarAlt, FaMicrophone, FaExternalLinkAlt, FaGamepad, FaTv, FaTrophy, FaUsers } from 'react-icons/fa';

export const EVENT_ICONS = {
    voice: <FaMicrophone />,
    stage: <FaMicrophone />,
    external: <FaExternalLinkAlt />,
    game: <FaGamepad />,
    watch: <FaTv />,
    tournament: <FaTrophy />,
    meetup: <FaUsers />,
    other: <FaCalendarAlt />,
};

export const EVENT_COLORS = {
    voice: '#5e81f4',
    stage: '#9146ff',
    external: '#43b581',
    game: '#faa61a',
    watch: '#f04747',
    tournament: '#ffc107',
    meetup: '#7289da',
    other: '#99aab5',
};

export const EVENT_TYPES = [
    { value: 'voice', label: '🎤 Sesli Etkinlik' },
    { value: 'stage', label: '🎙️ Sahne Etkinliği' },
    { value: 'game', label: '🎮 Oyun Gecesi' },
    { value: 'watch', label: '📺 İzleme Partisi' },
    { value: 'tournament', label: '🏆 Turnuva' },
    { value: 'meetup', label: '👥 Buluşma' },
    { value: 'external', label: '🌐 Harici Etkinlik' },
    { value: 'other', label: '📌 Diğer' },
];
