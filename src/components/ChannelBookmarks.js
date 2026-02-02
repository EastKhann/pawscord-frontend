// frontend/src/components/ChannelBookmarks.js
import React, { useState } from 'react';
import { FaStar, FaTimes } from 'react-icons/fa';

const ChannelBookmarks = ({ channels, onChannelSelect, onRemoveBookmark }) => {
    const [bookmarkedChannels, setBookmarkedChannels] = useState(
        JSON.parse(localStorage.getItem('bookmarkedChannels') || '[]')
    );

    const toggleBookmark = (channelId) => {
        const newBookmarks = bookmarkedChannels.includes(channelId)
            ? bookmarkedChannels.filter(id => id !== channelId)
            : [...bookmarkedChannels, channelId];

        setBookmarkedChannels(newBookmarks);
        localStorage.setItem('bookmarkedChannels', JSON.stringify(newBookmarks));
    };

    const bookmarked = channels.filter(ch => bookmarkedChannels.includes(ch.id));

    if (bookmarked.length === 0) return null;

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <FaStar style={styles.headerIcon} />
                <span>Favoriler</span>
            </div>
            <div style={styles.list}>
                {bookmarked.map(channel => (
                    <div
                        key={channel.id}
                        style={styles.item}
                        onClick={() => onChannelSelect(channel)}
                    >
                        <span style={styles.channelName}>#{channel.name}</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(channel.id);
                            }}
                            style={styles.removeButton}
                        >
                            <FaTimes />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        marginBottom: '16px',
        borderBottom: '1px solid #1e1f22',
        paddingBottom: '8px'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#f0b132',
        fontSize: '12px',
        fontWeight: '600',
        textTransform: 'uppercase',
        padding: '8px 12px',
        marginBottom: '4px'
    },
    headerIcon: {
        fontSize: '10px'
    },
    list: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px'
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.15s',
        ':hover': {
            backgroundColor: '#35373c'
        }
    },
    channelName: {
        color: '#b9bbbe',
        fontSize: '14px'
    },
    removeButton: {
        background: 'none',
        border: 'none',
        color: '#72767d',
        cursor: 'pointer',
        padding: '4px',
        fontSize: '12px',
        opacity: 0,
        transition: 'opacity 0.15s'
    }
};

export default ChannelBookmarks;



