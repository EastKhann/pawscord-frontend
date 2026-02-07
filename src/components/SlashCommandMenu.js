// frontend/src/components/SlashCommandMenu.js
// 🔥 FEATURE 7: Slash command autocomplete menu
// Shows available slash commands when user types /

import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { FaRobot, FaImage, FaMusic, FaDice, FaPoll, FaCalendar, FaClock, FaCode, FaGlobe, FaBroom, FaShieldAlt, FaGamepad, FaCalculator, FaQuoteLeft, FaBell, FaGift } from 'react-icons/fa';

const COMMANDS = [
    { name: 'giphy', desc: 'GIF ara ve gönder', icon: FaImage, category: 'Eğlence', usage: '/giphy <arama>' },
    { name: 'poll', desc: 'Oylama oluştur', icon: FaPoll, category: 'Araçlar', usage: '/poll <soru>' },
    { name: 'remind', desc: 'Hatırlatıcı kur', icon: FaClock, category: 'Araçlar', usage: '/remind <süre> <mesaj>' },
    { name: 'code', desc: 'Kod bloğu oluştur', icon: FaCode, category: 'Araçlar', usage: '/code <dil>' },
    { name: 'translate', desc: 'Mesaj çevir', icon: FaGlobe, category: 'Araçlar', usage: '/translate <dil> <mesaj>' },
    { name: 'ai', desc: 'AI\'ya soru sor', icon: FaRobot, category: 'AI', usage: '/ai <soru>' },
    { name: 'dice', desc: 'Zar at', icon: FaDice, category: 'Eğlence', usage: '/dice [sayı]' },
    { name: 'coinflip', desc: 'Yazı-tura at', icon: FaDice, category: 'Eğlence', usage: '/coinflip' },
    { name: 'music', desc: 'Müzik çal', icon: FaMusic, category: 'Medya', usage: '/music <url>' },
    { name: 'event', desc: 'Etkinlik oluştur', icon: FaCalendar, category: 'Sunucu', usage: '/event <isim> <tarih>' },
    { name: 'clear', desc: 'Mesajları temizle (mod)', icon: FaBroom, category: 'Moderasyon', usage: '/clear <sayı>' },
    { name: 'ban', desc: 'Kullanıcıyı yasakla (mod)', icon: FaShieldAlt, category: 'Moderasyon', usage: '/ban <kullanıcı>' },
    { name: 'timeout', desc: 'Kullanıcıyı sustur (mod)', icon: FaShieldAlt, category: 'Moderasyon', usage: '/timeout <kullanıcı> <süre>' },
    { name: 'game', desc: 'Mini oyun başlat', icon: FaGamepad, category: 'Eğlence', usage: '/game <oyun>' },
    { name: 'calc', desc: 'Hesap makinesi', icon: FaCalculator, category: 'Araçlar', usage: '/calc <ifade>' },
    { name: 'quote', desc: 'Rastgele söz', icon: FaQuoteLeft, category: 'Eğlence', usage: '/quote' },
    { name: 'announce', desc: 'Duyuru yap', icon: FaBell, category: 'Sunucu', usage: '/announce <mesaj>' },
    { name: 'giveaway', desc: 'Çekiliş başlat', icon: FaGift, category: 'Sunucu', usage: '/giveaway <ödül> <süre>' },
    { name: 'spoiler', desc: 'Spoiler mesaj gönder', icon: FaShieldAlt, category: 'Araçlar', usage: '/spoiler <mesaj>' },
    { name: 'shrug', desc: '¯\\_(ツ)_/¯', icon: FaQuoteLeft, category: 'Eğlence', usage: '/shrug' },
    { name: 'tableflip', desc: '(╯°□°)╯︵ ┻━┻', icon: FaQuoteLeft, category: 'Eğlence', usage: '/tableflip' },
    { name: 'unflip', desc: '┬─┬ ノ( ゜-゜ノ)', icon: FaQuoteLeft, category: 'Eğlence', usage: '/unflip' },
];

const SlashCommandMenu = ({ message, cursorPosition, onSelect, textareaRef }) => {
    const [visible, setVisible] = useState(false);
    const [query, setQuery] = useState('');
    const [filtered, setFiltered] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const menuRef = useRef(null);

    // Detect slash at start of message
    useEffect(() => {
        if (!message) { setVisible(false); return; }
        const textBefore = message.substring(0, cursorPosition);
        const match = textBefore.match(/^\/(\w{0,20})$/);
        if (match) {
            setVisible(true);
            setQuery(match[1].toLowerCase());
            setSelectedIndex(0);
        } else {
            setVisible(false);
        }
    }, [message, cursorPosition]);

    // Filter commands
    useEffect(() => {
        if (!visible) { setFiltered([]); return; }
        const results = COMMANDS.filter(c =>
            c.name.includes(query) || c.desc.toLowerCase().includes(query)
        ).slice(0, 10);
        setFiltered(results);
    }, [visible, query]);

    // Keyboard navigation
    useEffect(() => {
        if (!visible || filtered.length === 0 || !textareaRef?.current) return;
        const textarea = textareaRef.current;

        const handler = (e) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault(); e.stopPropagation();
                setSelectedIndex(p => (p + 1) % filtered.length);
            } else if (e.key === 'ArrowUp') {
                e.preventDefault(); e.stopPropagation();
                setSelectedIndex(p => (p - 1 + filtered.length) % filtered.length);
            } else if (e.key === 'Tab' || (e.key === 'Enter' && visible)) {
                e.preventDefault(); e.stopPropagation();
                handleSelect(filtered[selectedIndex]);
            } else if (e.key === 'Escape') {
                e.stopPropagation();
                setVisible(false);
            }
        };

        textarea.addEventListener('keydown', handler, true);
        return () => textarea.removeEventListener('keydown', handler, true);
    }, [visible, filtered, selectedIndex, textareaRef]);

    const handleSelect = useCallback((cmd) => {
        if (!cmd) return;
        // Some commands insert text, others just set the prefix
        const simpleCommands = {
            shrug: '¯\\_(ツ)_/¯',
            tableflip: '(╯°□°)╯︵ ┻━┻',
            unflip: '┬─┬ ノ( ゜-゜ノ)',
        };

        if (simpleCommands[cmd.name]) {
            onSelect(simpleCommands[cmd.name], simpleCommands[cmd.name].length);
        } else {
            const text = `/${cmd.name} `;
            onSelect(text, text.length);
        }
        setVisible(false);
    }, [onSelect]);

    // Scroll selected into view
    useEffect(() => {
        if (menuRef.current) {
            const items = menuRef.current.querySelectorAll('[data-cmd-item]');
            if (items[selectedIndex]) items[selectedIndex].scrollIntoView({ block: 'nearest' });
        }
    }, [selectedIndex]);

    if (!visible || filtered.length === 0) return null;

    // Group by category
    const grouped = {};
    filtered.forEach(cmd => {
        if (!grouped[cmd.category]) grouped[cmd.category] = [];
        grouped[cmd.category].push(cmd);
    });

    return (
        <div ref={menuRef} style={S.popup}>
            {Object.entries(grouped).map(([cat, cmds]) => (
                <div key={cat}>
                    <div style={S.catHeader}>{cat}</div>
                    {cmds.map((cmd) => {
                        const globalIdx = filtered.indexOf(cmd);
                        const Icon = cmd.icon;
                        return (
                            <div
                                key={cmd.name}
                                data-cmd-item
                                style={{
                                    ...S.item,
                                    backgroundColor: globalIdx === selectedIndex ? 'rgba(88,101,242,0.2)' : 'transparent',
                                }}
                                onClick={() => handleSelect(cmd)}
                                onMouseEnter={() => setSelectedIndex(globalIdx)}
                            >
                                <div style={S.iconWrap}><Icon /></div>
                                <div style={S.cmdInfo}>
                                    <div style={S.cmdName}>/{cmd.name}</div>
                                    <div style={S.cmdDesc}>{cmd.desc}</div>
                                </div>
                                <div style={S.usage}>{cmd.usage}</div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

const S = {
    popup: {
        position: 'absolute', bottom: '100%', left: 0, right: 0,
        maxHeight: 350, overflowY: 'auto',
        backgroundColor: '#2b2d31', borderRadius: '8px 8px 0 0',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.4)', zIndex: 101,
        padding: '4px 0', marginBottom: 4,
    },
    catHeader: {
        padding: '8px 14px 4px', fontSize: 11, fontWeight: 700,
        color: '#949ba4', textTransform: 'uppercase', letterSpacing: '0.04em',
    },
    item: {
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 12px', cursor: 'pointer', margin: '0 4px', borderRadius: 4,
        transition: 'background 0.1s',
    },
    iconWrap: {
        width: 32, height: 32, borderRadius: 8,
        backgroundColor: 'rgba(88,101,242,0.15)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', color: '#5865f2', fontSize: 14,
        flexShrink: 0,
    },
    cmdInfo: { flex: 1, minWidth: 0 },
    cmdName: { color: '#fff', fontWeight: 600, fontSize: 14 },
    cmdDesc: { color: '#949ba4', fontSize: 12, marginTop: 1 },
    usage: {
        color: '#72767d', fontSize: 11, flexShrink: 0,
        backgroundColor: 'rgba(255,255,255,0.04)', padding: '3px 8px',
        borderRadius: 4, fontFamily: 'monospace',
    },
};

export default memo(SlashCommandMenu);
