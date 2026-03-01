// frontend/src/components/BookmarkButton.js
import { useState, useCallback, memo } from 'react';
import { FaBookmark, FaRegBookmark, FaStar, FaRegStar, FaClock } from 'react-icons/fa';

/**
 * Toggle button for bookmarking a message.
 * @param {Object} props
 * @param {string|number} props.messageId - ID of the message to bookmark
 * @param {boolean} [props.isBookmarked=false] - Initial bookmark state
 * @param {Function} props.fetchWithAuth - Authenticated fetch wrapper
 * @param {string} props.apiBaseUrl - API base URL
 * @param {(bookmarked: boolean) => void} [props.onUpdate] - Callback when bookmark state changes
 */
export const BookmarkButton = memo(({ messageId, isBookmarked = false, fetchWithAuth, apiBaseUrl, onUpdate }) => {
    const [bookmarked, setBookmarked] = useState(isBookmarked);
    const [loading, setLoading] = useState(false);

    const handleToggle = useCallback(async (e) => {
        e.stopPropagation();
        if (loading) return;

        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/messages/bookmark/toggle/`, {
                method: 'POST',
                body: JSON.stringify({ message_id: messageId })
            });

            if (res.ok) {
                const data = await res.json();
                setBookmarked(data.bookmarked);
                if (onUpdate) onUpdate(data.bookmarked);
            }
        } catch (error) {
            console.error('Bookmark error:', error);
        } finally {
            setLoading(false);
        }
    }, [loading, messageId, fetchWithAuth, apiBaseUrl, onUpdate]);

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            style={{
                background: 'none',
                border: 'none',
                color: bookmarked ? '#faa61a' : '#b9bbbe',
                cursor: loading ? 'wait' : 'pointer',
                fontSize: '1em',
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                opacity: loading ? 0.5 : 1
            }}
            title={bookmarked ? 'Bookmark kaldır' : 'Bookmark ekle'}
        >
            {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
        </button>
    );
});
BookmarkButton.displayName = 'BookmarkButton';

/**
 * Toggle button for starring a message.
 * @param {Object} props
 * @param {string|number} props.messageId - ID of the message to star
 * @param {boolean} [props.isStarred=false] - Initial starred state
 * @param {Function} props.fetchWithAuth - Authenticated fetch wrapper
 * @param {string} props.apiBaseUrl - API base URL
 * @param {(starred: boolean) => void} [props.onUpdate] - Callback when star state changes
 */
export const StarButton = memo(({ messageId, isStarred = false, fetchWithAuth, apiBaseUrl, onUpdate }) => {
    const [starred, setStarred] = useState(isStarred);
    const [loading, setLoading] = useState(false);

    const handleToggle = useCallback(async (e) => {
        e.stopPropagation();
        if (loading) return;

        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/messages/star/toggle/`, {
                method: 'POST',
                body: JSON.stringify({ message_id: messageId })
            });

            if (res.ok) {
                const data = await res.json();
                setStarred(data.starred);
                if (onUpdate) onUpdate(data.starred);
            }
        } catch (error) {
            console.error('Star error:', error);
        } finally {
            setLoading(false);
        }
    }, [loading, messageId, fetchWithAuth, apiBaseUrl, onUpdate]);

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            style={{
                background: 'none',
                border: 'none',
                color: starred ? '#ffd700' : '#b9bbbe',
                cursor: loading ? 'wait' : 'pointer',
                fontSize: '1em',
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                opacity: loading ? 0.5 : 1
            }}
            title={starred ? 'Yıldız kaldır' : 'Yıldız ekle'}
        >
            {starred ? <FaStar /> : <FaRegStar />}
        </button>
    );
});
StarButton.displayName = 'StarButton';

/**
 * Toggle button for marking a message as "read later".
 * @param {Object} props
 * @param {string|number} props.messageId - ID of the message
 * @param {boolean} [props.isReadLater=false] - Initial read-later state
 * @param {Function} props.fetchWithAuth - Authenticated fetch wrapper
 * @param {string} props.apiBaseUrl - API base URL
 * @param {(readLater: boolean) => void} [props.onUpdate] - Callback when read-later state changes
 */
export const ReadLaterButton = memo(({ messageId, isReadLater = false, fetchWithAuth, apiBaseUrl, onUpdate }) => {
    const [readLater, setReadLater] = useState(isReadLater);
    const [loading, setLoading] = useState(false);

    const handleToggle = useCallback(async (e) => {
        e.stopPropagation();
        if (loading) return;

        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/messages/readlater/toggle/`, {
                method: 'POST',
                body: JSON.stringify({ message_id: messageId })
            });

            if (res.ok) {
                const data = await res.json();
                setReadLater(data.read_later);
                if (onUpdate) onUpdate(data.read_later);
            }
        } catch (error) {
            console.error('Read later error:', error);
        } finally {
            setLoading(false);
        }
    }, [loading, messageId, fetchWithAuth, apiBaseUrl, onUpdate]);

    return (
        <button
            onClick={handleToggle}
            disabled={loading}
            style={{
                background: 'none',
                border: 'none',
                color: readLater ? '#3ba55d' : '#b9bbbe',
                cursor: loading ? 'wait' : 'pointer',
                fontSize: '1em',
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                opacity: loading ? 0.5 : 1
            }}
            title={readLater ? 'Sonra oku listesinden çıkar' : 'Sonra oku listesine ekle'}
        >
            <FaClock />
        </button>
    );
});
ReadLaterButton.displayName = 'ReadLaterButton';


