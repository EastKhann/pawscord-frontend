// frontend/src/components/EmojiCategories.js - FEATURE #16
import React, { useState } from 'react';
import { FaSmile, FaHeart, FaUtensils, FaFutbol, FaPlane, FaClock } from 'react-icons/fa';

const EmojiCategories = ({ onEmojiSelect }) => {
    const [activeCategory, setActiveCategory] = useState('smileys');

    const categories = {
        smileys: { label: 'Yüzler', icon: FaSmile, emojis: ['😀','😃','😄','😁','😅','😂','🤣','😊','😇','🙂','🙃','😉','😌','😍','🥰','😘'] },
        hearts: { label: 'Kalpler', icon: FaHeart, emojis: ['❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❤️‍🔥','❤️‍🩹','💕','💞'] },
        food: { label: 'Yiyecek', icon: FaUtensils, emojis: ['🍕','🍔','🍟','🌭','🍿','🧂','🥓','🥚','🍳','🧇','🥞','🧈','🍞','🥐'] },
        sports: { label: 'Spor', icon: FaFutbol, emojis: ['⚽','🏀','🏈','⚾','🥎','🎾','🏐','🏉','🥏','🎱','🪀','🏓','🏸','🏒'] },
        travel: { label: 'Seyahat', icon: FaPlane, emojis: ['✈️','🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🛻','🚚','🚛'] },
        recent: { label: 'Son Kullanılan', icon: FaClock, emojis: [] }
    };

    return (
        <div style={styles.container}>
            <div style={styles.tabs}>
                {Object.entries(categories).map(([key, cat]) => {
                    const Icon = cat.icon;
                    return (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key)}
                            style={{
                                ...styles.tab,
                                ...(activeCategory === key ? styles.tabActive : {})
                            }}
                            title={cat.label}
                        >
                            <Icon />
                        </button>
                    );
                })}
            </div>
            <div style={styles.emojiGrid}>
                {categories[activeCategory].emojis.map((emoji, i) => (
                    <button
                        key={i}
                        onClick={() => onEmojiSelect(emoji)}
                        style={styles.emojiButton}
                    >
                        {emoji}
                    </button>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { backgroundColor: '#2b2d31', borderRadius: '8px', padding: '8px', width: '320px' },
    tabs: { display: 'flex', gap: '4px', marginBottom: '8px', borderBottom: '1px solid #1e1f22', paddingBottom: '8px' },
    tab: { padding: '8px', backgroundColor: 'transparent', border: 'none', color: '#72767d', cursor: 'pointer', borderRadius: '4px', fontSize: '18px' },
    tabActive: { backgroundColor: '#5865f2', color: '#fff' },
    emojiGrid: { display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '4px', maxHeight: '200px', overflowY: 'auto' },
    emojiButton: { background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', padding: '6px', borderRadius: '4px' }
};

export default EmojiCategories;



