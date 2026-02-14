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
    { value: 'voice', label: '\uD83C\uDFA4 Sesli Etkinlik' },
    { value: 'stage', label: '\uD83C\uDF99\uFE0F Sahne Etkinli\u011Fi' },
    { value: 'game', label: '\uD83C\uDFAE Oyun Gecesi' },
    { value: 'watch', label: '\uD83D\uDCFA \u0130zleme Partisi' },
    { value: 'tournament', label: '\uD83C\uDFC6 Turnuva' },
    { value: 'meetup', label: '\uD83D\uDC65 Bulu\u015Fma' },
    { value: 'external', label: '\uD83C\uDF10 Harici Etkinlik' },
    { value: 'other', label: '\uD83D\uDCCC Di\u011Fer' },
];
