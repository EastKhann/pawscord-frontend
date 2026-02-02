import React, { useEffect, useState } from 'react';
import { FaUserShield, FaVolumeMute, FaBan, FaBroom, FaUserEdit, FaRegSmile, FaTable, FaUndo, FaFont, FaTerminal, FaCode, FaStickyNote } from 'react-icons/fa';

export const COMMANDS = [
    { name: 'zar-at', description: '1-100 arası zar at', icon: <FaTable /> },
    { name: 'yazitura', description: 'Yazı tura at', icon: <FaUndo /> },
    { name: 'tkm', description: 'Taş Kağıt Makas oyna (@kullanici)', icon: <FaRegSmile /> },
    { name: 'xox', description: 'XOX oyunu başlat', icon: <FaTable /> },
    { name: 'sec', description: 'Seçeneklerden birini seç (/sec a b c)', icon: <FaTerminal /> },
    { name: 'cuzdan', description: 'Coin bakiyeni gör', icon: <FaUserShield /> },
    { name: 'transfer', description: 'Coin gönder (/transfer @kullanici miktar)', icon: <FaUserShield /> },
    { name: 'kanban', description: 'Kanban panosunu aç', icon: <FaTable /> },
    { name: 'kod', description: 'Python kodu çalıştır', icon: <FaCode /> },
    { name: 'resimgelismis', description: 'AI ile resim çiz', icon: <FaRegSmile /> },
    { name: 'temizle', description: 'Mesajları sil (Admin)', icon: <FaBroom />, adminOnly: true },
    { name: 'yardim', description: 'Komut listesini gör', icon: <FaTerminal /> },
    { name: 'tema', description: 'Tema Mağazasını Aç', icon: <FaTable /> },
    { name: 'duyuru', description: 'Sabit Duyuru Yap (/duyuru mesaj)', icon: <FaBroom />, adminOnly: true },
    { name: 'sablon', description: 'Hazır Şablonlar', icon: <FaStickyNote /> },
    { name: 'shrug', description: '¯\\_(ツ)_/¯ gönder', icon: <FaRegSmile /> },
];

const SlashCommandList = ({ query, onSelect, activeIndex }) => {
    const [filteredCommands, setFilteredCommands] = useState([]);

    useEffect(() => {
        if (query === null || query === undefined) return;

        const q = query.toLowerCase().replace('/', '');
        const filtered = COMMANDS.filter(cmd =>
            cmd.name.toLowerCase().startsWith(q)
        );
        setFilteredCommands(filtered);
    }, [query]);

    if (filteredCommands.length === 0) return null;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <FaTerminal style={{ marginRight: 6 }} />
                KOMUTLAR
            </div>
            <div style={styles.list}>
                {filteredCommands.map((cmd, index) => (
                    <div
                        key={cmd.name}
                        onClick={() => onSelect(cmd)}
                        style={{
                            ...styles.item,
                            backgroundColor: index === activeIndex ? '#5865f2' : 'transparent',
                        }}
                    >
                        <div style={styles.iconWrapper}>
                            {cmd.icon}
                        </div>
                        <div style={styles.textWrapper}>
                            <span style={{ fontWeight: 'bold', color: 'white' }}>/{cmd.name}</span>
                            <span style={{ fontSize: '0.85em', color: index === activeIndex ? '#eee' : '#b9bbbe', marginLeft: 8 }}>
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
        bottom: '100%', // Inputun üstünde
        left: 0,
        width: '300px',
        maxHeight: '300px',
        backgroundColor: '#2f3136',
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
        color: '#b9bbbe',
        backgroundColor: '#202225',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        letterSpacing: '0.5px'
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
        fontSize: '1.1em'
    },
    textWrapper: {
        display: 'flex',
        alignItems: 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis'
    }
};

export default SlashCommandList;


