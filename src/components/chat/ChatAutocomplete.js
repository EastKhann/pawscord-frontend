// frontend/src/components/ChatAutocomplete.js
// 🔥 FEATURES 1-3: @Mention, #Channel, :Emoji autocomplete popup
// Shows popup above textarea when user types @, #, or :

import { useState, useEffect, useRef, useCallback, memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaHashtag, FaVolumeUp, FaSmile, FaAt, FaGlobe, FaBullhorn } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

// Common emoji list for :emoji autocomplete
const COMMON_EMOJIS = [
    { name: 'grinning', emoji: '😀' },
    { name: 'joy', emoji: '😂' },
    { name: 'heart_eyes', emoji: '😍' },
    { name: 'thinking', emoji: '🤔' },
    { name: 'thumbsup', emoji: '👍' },
    { name: 'thumbsdown', emoji: '👎' },
    { name: 'fire', emoji: '🔥' },
    { name: 'heart', emoji: '❤️' },
    { name: 'star', emoji: '⭐' },
    { name: 'check', emoji: '✅' },
    { name: 'x', emoji: '❌' },
    { name: 'warning', emoji: '⚠️' },
    { name: 'rocket', emoji: '🚀' },
    { name: 'tada', emoji: '🎉' },
    { name: 'wave', emoji: '👋' },
    { name: 'clap', emoji: '👏' },
    { name: 'pray', emoji: '🙏' },
    { name: 'muscle', emoji: '💪' },
    { name: 'eyes', emoji: '👀' },
    { name: 'cry', emoji: '😢' },
    { name: 'angry', emoji: '😡' },
    { name: 'cool', emoji: '😎' },
    { name: 'wink', emoji: '😉' },
    { name: 'tongue', emoji: '😛' },
    { name: 'sleeping', emoji: '😴' },
    { name: 'skull', emoji: '💀' },
    { name: 'ghost', emoji: '👻' },
    { name: 'alien', emoji: '👽' },
    { name: 'robot', emoji: '🤖' },
    { name: 'poop', emoji: '💩' },
    { name: 'ok_hand', emoji: '👌' },
    { name: 'peace', emoji: '✌️' },
    { name: 'raised_hand', emoji: '✋' },
    { name: 'sparkles', emoji: '✨' },
    { name: 'boom', emoji: '💥' },
    { name: 'zap', emoji: '⚡' },
    { name: 'sun', emoji: '☀️' },
    { name: 'moon', emoji: '🌙' },
    { name: 'rainbow', emoji: '🌈' },
    { name: 'cloud', emoji: '☁️' },
    { name: 'umbrella', emoji: '☂️' },
    { name: 'snowflake', emoji: '❄️' },
    { name: 'cat', emoji: '🐱' },
    { name: 'dog', emoji: '🐶' },
    { name: 'bear', emoji: '🐻' },
    { name: 'panda', emoji: '🐼' },
    { name: 'fox', emoji: '🦊' },
    { name: 'lion', emoji: '🦁' },
    { name: 'pizza', emoji: '🍕' },
    { name: 'burger', emoji: '🍔' },
    { name: 'coffee', emoji: '☕' },
    { name: 'beer', emoji: '🍺' },
    { name: 'cake', emoji: '🎂' },
    { name: 'gift', emoji: '🎁' },
    { name: 'trophy', emoji: '🏆' },
    { name: 'medal', emoji: '🏅' },
    { name: 'crown', emoji: '👑' },
    { name: 'gem', emoji: '💎' },
    { name: 'money', emoji: '💰' },
    { name: 'bulb', emoji: '💡' },
    { name: 'book', emoji: '📚' },
    { name: 'pencil', emoji: '✏️' },
    { name: 'pin', emoji: '📌' },
    { name: 'lock', emoji: '🔒' },
    { name: 'key', emoji: '🔑' },
    { name: 'bell', emoji: '🔔' },
    { name: 'megaphone', emoji: '📢' },
    { name: 'loudspeaker', emoji: '📣' },
    { name: 'mute', emoji: '🔇' },
    { name: 'music', emoji: '🎵' },
    { name: 'microphone', emoji: '🎤' },
    { name: 'headphones', emoji: '🎧' },
    { name: 'camera', emoji: '📷' },
    { name: 'video', emoji: '📹' },
    { name: 'tv', emoji: '📺' },
    { name: 'computer', emoji: '💻' },
    { name: 'phone', emoji: '📱' },
    { name: 'email', emoji: '📧' },
    { name: 'link', emoji: '🔗' },
    { name: 'gear', emoji: '⚙️' },
    { name: 'wrench', emoji: '🔧' },
    { name: 'hammer', emoji: '🔨' },
    { name: 'shield', emoji: '🛡️' },
    { name: 'sword', emoji: '⚔️' },
    { name: 'flag', emoji: '🏁' },
    { name: 'checkered_flag', emoji: '🏁' },
    { name: 'party', emoji: '🥳' },
    { name: 'confused', emoji: '😕' },
    { name: 'nervous', emoji: '😬' },
    { name: 'scream', emoji: '😱' },
    { name: 'sob', emoji: '😭' },
    { name: 'sweat', emoji: '😅' },
    { name: 'blush', emoji: '😊' },
    { name: 'smirk', emoji: '😏' },
    { name: 'unamused', emoji: '😒' },
    { name: 'relieved', emoji: '😌' },
    { name: 'dizzy', emoji: '😵' },
    { name: 'mask', emoji: '😷' },
    { name: 'nerd', emoji: '🤓' },
    { name: 'monocle', emoji: '🧐' },
    { name: 'shush', emoji: '🤫' },
    { name: 'salute', emoji: '🫡' },
    { name: 'rolling_eyes', emoji: '🙄' },
    { name: 'pleading', emoji: '🥺' },
    { name: 'hug', emoji: '🤗' },
];

const ChatAutocomplete = ({
    message,
    cursorPosition,
    users = [],
    channels = [],
    onSelect,
    textareaRef,
}) => {
    const { t } = useTranslation();
    const [type, setType] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // 'mention' | 'channel' | 'emoji' | null
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const popupRef = useRef(null);

    // Detect trigger character and extract query
    useEffect(() => {
        if (!message || cursorPosition <= 0) {
            setType(null);
            return;
        }

        const textBeforeCursor = message.substring(0, cursorPosition);

        // Find the last trigger character before cursor
        // Must be at start of word (preceded by space, newline, or start of string)
        const mentionMatch = textBeforeCursor.match(/(?:^|\s)@(\w{0,20})$/);
        const channelMatch = textBeforeCursor.match(/(?:^|\s)#(\w{0,20})$/);
        const emojiMatch = textBeforeCursor.match(/(?:^|\s):(\w{1,20})$/);

        if (mentionMatch) {
            setType('mention');
            setQuery(mentionMatch[1].toLowerCase());
        } else if (channelMatch) {
            setType('channel');
            setQuery(channelMatch[1].toLowerCase());
        } else if (emojiMatch && emojiMatch[1].length >= 2) {
            setType('emoji');
            setQuery(emojiMatch[1].toLowerCase());
        } else {
            setType(null);
        }
        setSelectedIndex(0);
    }, [message, cursorPosition]);

    // Filter results based on type and query
    useEffect(() => {
        if (!type) {
            setResults([]);
            return;
        }

        let filtered = [];
        if (type === 'mention') {
            // Add @everyone and @here as special options
            const specialMentions = [
                { username: 'everyone', display_name: 'Everyone', special: true, icon: 'globe' },
                { username: 'here', display_name: 'Online Users', special: true, icon: 'at' },
            ];
            const allOptions = [...specialMentions, ...users];
            filtered = allOptions
                .filter((u) => {
                    const name = (u.username || '').toLowerCase();
                    const display = (u.display_name || u.nickname || '').toLowerCase();
                    return name.includes(query) || display.includes(query);
                })
                .slice(0, 10);
        } else if (type === 'channel') {
            filtered = channels
                .filter((c) => {
                    const name = (c.name || c.slug || '').toLowerCase();
                    return name.includes(query);
                })
                .slice(0, 10);
        } else if (type === 'emoji') {
            filtered = COMMON_EMOJIS.filter((e) => e.name.includes(query)).slice(0, 10);
        }

        setResults(filtered);
    }, [type, query, users, channels]);

    // Handle keyboard navigation
    const handleKeyDown = useCallback(
        (e) => {
            if (!type || results.length === 0) return false;

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev + 1) % results.length);
                return true;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
                return true;
            }
            if (e.key === 'Enter' || e.key === 'Tab') {
                e.preventDefault();
                handleSelect(results[selectedIndex]);
                return true;
            }
            if (e.key === 'Escape') {
                setType(null);
                return true;
            }
            return false;
        },
        [type, results, selectedIndex]
    );

    // Expose handleKeyDown to parent
    useEffect(() => {
        if (!textareaRef?.current) return;
        const textarea = textareaRef.current;

        const handler = (e) => {
            if (type && results.length > 0) {
                if (
                    ['ArrowDown', 'ArrowUp', 'Tab'].includes(e.key) ||
                    (e.key === 'Enter' && type)
                ) {
                    const handled = handleKeyDown(e);
                    if (handled) e.stopPropagation();
                }
                if (e.key === 'Escape') {
                    setType(null);
                    e.stopPropagation();
                }
            }
        };

        textarea.addEventListener('keydown', handler, true); // capture phase
        return () => textarea.removeEventListener('keydown', handler, true);
    }, [textareaRef, type, results, handleKeyDown]);

    // Handle selection
    const handleSelect = useCallback(
        (item) => {
            if (!item || !textareaRef?.current) return;

            const textarea = textareaRef.current;
            const textBeforeCursor = message.substring(0, cursorPosition);
            const textAfterCursor = message.substring(cursorPosition);

            let replacement = '';
            let triggerRegex;

            if (type === 'mention') {
                triggerRegex = /(?:^|\s)@\w{0,20}$/;
                replacement = `@${item.username} `;
            } else if (type === 'channel') {
                triggerRegex = /(?:^|\s)#\w{0,20}$/;
                replacement = `#${item.name || item.slug} `;
            } else if (type === 'emoji') {
                triggerRegex = /(?:^|\s):\w{1,20}$/;
                replacement = item.emoji + ' ';
            }

            // Find where the trigger starts
            const match = textBeforeCursor.match(triggerRegex);
            if (match) {
                const triggerStart =
                    match.index + (match[0].startsWith(' ') || match[0].startsWith('\n') ? 1 : 0);
                const newText = message.substring(0, triggerStart) + replacement + textAfterCursor;
                const newCursorPos = triggerStart + replacement.length;

                onSelect(newText, newCursorPos);
            }

            setType(null);
            setResults([]);
        },
        [type, message, cursorPosition, onSelect, textareaRef]
    );

    // Scroll selected item into view
    useEffect(() => {
        if (popupRef.current) {
            const items = popupRef.current.querySelectorAll('[data-autocomplete-item]');
            if (items[selectedIndex]) {
                items[selectedIndex].scrollIntoView({ block: 'nearest' });
            }
        }
    }, [selectedIndex]);

    if (!type || results.length === 0) return null;

    const getIcon = (type, item) => {
        if (type === 'mention') {
            if (item.special) {
                return item.icon === 'globe' ? (
                    <FaGlobe className="icon-primary" />
                ) : (
                    <FaAt className="icon-warning" />
                );
            }
            return <FaUser className="icon-chat" />;
        }
        if (type === 'channel') {
            const ct = item.channel_type;
            if (ct === 'voice') return <FaVolumeUp className="icon-chat" />;
            if (ct === 'announcement') return <FaBullhorn className="icon-chat" />;
            return <FaHashtag className="icon-chat" />;
        }
        if (type === 'emoji') {
            return <span className="fs-18">{item.emoji}</span>;
        }
        return null;
    };

    const getLabel = (type, item) => {
        if (type === 'mention') {
            return (
                <div aria-label="chat autocomplete" className="flex-align-8">
                    {item.avatar ? (
                        <img src={item.avatar} alt="" className="w-20h-20-round" />
                    ) : (
                        getIcon(type, item)
                    )}
                    <span style={S.txt}>{item.display_name || item.nickname || item.username}</span>
                    {(item.display_name || item.nickname) && (
                        <span style={S.txt2}>@{item.username}</span>
                    )}
                    {item.special && (
                        <span style={S.specialBadge}>
                            {item.username === 'everyone'
                                ? 'Herkesi etiketle'
                                : t('ui.online_that_islari_etiketle')}
                        </span>
                    )}
                </div>
            );
        }
        if (type === 'channel') {
            return (
                <div className="flex-align-8">
                    {getIcon(type, item)}
                    <span className="text-white">{item.name || item.slug}</span>
                    {item.category_name && <span style={S.txt3}>• {item.category_name}</span>}
                </div>
            );
        }
        if (type === 'emoji') {
            return (
                <div className="flex-align-8">
                    <span className="fs-20">{item.emoji}</span>
                    <span className="text-dbd-only">:{item.name}:</span>
                </div>
            );
        }
        return null;
    };

    return (
        <div ref={popupRef} style={S.popup}>
            <div style={S.header}>
                {type === 'mention' && (
                    <>
                        <FaAt className="icon-primary" /> <span>Users</span>
                    </>
                )}
                {type === 'channel' && (
                    <>
                        <FaHashtag className="icon-primary" /> <span>Kanallar</span>
                    </>
                )}
                {type === 'emoji' && (
                    <>
                        <FaSmile className="icon-primary" /> <span>Emoji</span>
                    </>
                )}
            </div>
            {results.map((item, i) => (
                <div
                    key={item.username || item.slug || item.name || i}
                    data-autocomplete-item
                    style={{
                        ...S.item,
                        backgroundColor:
                            i === selectedIndex ? 'rgba(88,101,242,0.2)' : 'transparent',
                    }}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelect(item)}
                    onMouseEnter={() => setSelectedIndex(i)}
                    onKeyDown={(e) =>
                        (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                    }
                >
                    {getLabel(type, item)}
                </div>
            ))}
        </div>
    );
};

const S = {
    popup: {
        position: 'absolute',
        bottom: '100%',
        left: 0,
        right: 0,
        maxHeight: 300,
        overflowY: 'auto',
        backgroundColor: '#17191c',
        borderRadius: '8px 8px 0 0',
        boxShadow: '0 -4px 16px rgba(0,0,0,0.4)',
        zIndex: 100,
        padding: '4px 0',
        marginBottom: 4,
    },
    header: {
        padding: '8px 12px',
        fontSize: 11,
        fontWeight: 700,
        color: '#949ba4',
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        borderBottom: '1px solid rgba(255,255,255,0.06)',
    },
    item: {
        padding: '8px 12px',
        cursor: 'pointer',
        transition: 'background 0.1s',
        borderRadius: 4,
        margin: '0 4px',
    },
    specialBadge: {
        fontSize: 10,
        color: '#949ba4',
        backgroundColor: 'rgba(255,255,255,0.06)',
        padding: '2px 6px',
        borderRadius: 4,
        marginLeft: 'auto',
    },
    txt3: { color: '#949ba4', fontSize: 11 },
    txt2: { color: '#949ba4', fontSize: 12 },
    txt: { color: '#fff', fontWeight: 500 },
};

ChatAutocomplete.propTypes = {
    message: PropTypes.string,
    cursorPosition: PropTypes.object,
    users: PropTypes.array,
    channels: PropTypes.array,
    onSelect: PropTypes.func,
    textareaRef: PropTypes.string,
};
export default memo(ChatAutocomplete);
