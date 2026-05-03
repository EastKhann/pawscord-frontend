import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
    FaUserShield,
    FaVolumeMute,
    FaBan,
    FaBroom,
    FaUserEdit,
    FaRegSmile,
    FaTable,
    FaUndo,
    FaFont,
    FaTerminal,
    FaCode,
    FaStickyNote,
} from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const S = {
    txt: { fontWeight: 'bold', color: 'white' },
};

export const COMMANDS = [
    { name: 'zar-at', description: 'Roll dice between 1-100', icon: <FaTable /> },
    { name: 'yazitura', description: 'Flip a coin', icon: <FaUndo /> },
    { name: 'tkm', description: 'Play Rock Paper Scissors (@user)', icon: <FaRegSmile /> },
    { name: 'xox', description: 'Start Tic-Tac-Toe game', icon: <FaTable /> },
    { name: 'sec', description: 'Choose from options (/choose a b c)', icon: <FaTerminal /> },
    { name: 'cuzdan', description: 'View your coin balance', icon: <FaUserShield /> },
    {
        name: 'transfer',
        description: 'Send coins (/transfer @user amount)',
        icon: <FaUserShield />,
    },
    { name: 'kanban', description: 'Open Kanban board', icon: <FaTable /> },
    { name: 'kod', description: 'Run Python code', icon: <FaCode /> },
    { name: 'imagegelismis', description: 'Generate image with AI', icon: <FaRegSmile /> },
    { name: 'temizle', description: 'Delete messages (Admin)', icon: <FaBroom />, adminOnly: true },
    { name: 'yardim', description: 'View command list', icon: <FaTerminal /> },
    { name: 'tema', description: 'Open Theme Store', icon: <FaTable /> },
    {
        name: 'duyuru',
        description: 'Sabit Duyuru Yap (/duyuru message)',
        icon: <FaBroom />,
        adminOnly: true,
    },
    { name: 'sablon', description: 'Ready-made Templates', icon: <FaStickyNote /> },
    { name: 'shrug', description: 'Send �\\_(?)_/�', icon: <FaRegSmile /> },
];

const SlashCommandList = ({ query, onSelect, activeIndex }) => {
    const { t } = useTranslation();
    const [filteredCommands, setFilteredCommands] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (query === null || query === undefined) return;

        const q = query.toLowerCase().replace('/', '');
        const filtered = COMMANDS.filter((cmd) => cmd.name.toLowerCase().startsWith(q));
        setFilteredCommands(filtered);
    }, [query]);

    if (filteredCommands.length === 0) return null;

    return (
        <div aria-label={t('chat.slashCommandList', 'Slash commands')} style={styles.container}>
            <div style={styles.header}>
                <FaTerminal className="mr-6" />
                KOMUTLAR
            </div>
            <div style={styles.list}>
                {filteredCommands.map((cmd, index) => (
                    <div
                        key={cmd.name}
                        role="button"
                        tabIndex={0}
                        onClick={() => onSelect(cmd)}
                        style={{
                            ...styles.item,
                            backgroundColor: index === activeIndex ? '#5865f2' : 'transparent',
                        }}
                        onKeyDown={(e) =>
                            (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                        }
                    >
                        <div style={styles.iconWrapper}>{cmd.icon}</div>
                        <div style={styles.textWrapper}>
                            <span style={S.txt}>/{cmd.name}</span>
                            <span
                                style={{
                                    fontSize: '0.85em',
                                    color: index === activeIndex ? '#eee' : '#b5bac1',
                                    marginLeft: 8,
                                }}
                            >
                                {cmd.description}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        position: 'absolute',
        bottom: '100%', // Inputun �st�nde
        left: 0,
        width: '300px',
        maxHeight: '300px',
        backgroundColor: '#111214',
        borderRadius: '8px',
        boxShadow: '0 -4px 15px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '10px',
        overflow: 'hidden',
        zIndex: 1000,
        border: '1px solid rgba(255,255,255,0.05)',
    },
    header: {
        padding: '8px 12px',
        fontSize: '0.75em',
        fontWeight: 'bold',
        color: '#b5bac1',
        backgroundColor: '#0d0e10',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        letterSpacing: '0.5px',
    },
    list: {
        overflowY: 'auto',
        padding: '0',
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 12px',
        cursor: 'pointer',
        transition: 'background-color 0.1s',
    },
    iconWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',
        marginRight: '10px',
        color: 'white',
        fontSize: '1.1em',
    },
    textWrapper: {
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
};

SlashCommandList.propTypes = {
    query: PropTypes.string,
    onSelect: PropTypes.func,
    activeIndex: PropTypes.bool,
};
export default SlashCommandList;
