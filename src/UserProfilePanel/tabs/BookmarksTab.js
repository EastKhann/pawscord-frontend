import React from 'react';
import PropTypes from 'prop-types';
import profileStyles from '../styles';

// -- extracted inline style constants --
const _st1 = {
    padding: '48px',
    textAlign: 'center',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '12px',
};
const _st2 = { fontSize: '64px', marginBottom: '16px' };
const _st3 = { color: '#fff', margin: '0 0 8px 0' };
const _st4 = { color: '#b5bac1', margin: 0 };
const _st5 = { display: 'flex', flexDirection: 'column', gap: '12px' };
const _st6 = {
    padding: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '8px',
    borderLeft: '4px solid #ffd700',
};
const _st7 = { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' };
const _st8 = { width: '32px', height: '32px', borderRadius: '50%' };
const _st9 = { flex: 1 };
const _st10 = { color: '#b5bac1', fontSize: '12px' };
const _st11 = { color: '#dbdee1', margin: 0, fontSize: '14px' };

const BookmarksTab = ({ bookmarks: rawBM }) => {
    const bookmarks = rawBM || [];
    const styles = profileStyles;
    const [error, setError] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(false);

    return (
        <div aria-label="bookmarks tab" style={styles.card}>
            <h3 style={styles.sectionTitle}>🔖 Bookmarks</h3>

            {bookmarks.length === 0 ? (
                <div style={_st1}>
                    <div style={_st2}>🔖</div>
                    <h4 style={_st3}>Henüz yer imi yok</h4>
                    <p style={_st4}>Bookmark messages to add them here</p>
                </div>
            ) : (
                <div style={_st5}>
                    {bookmarks.map((bookmark, idx) => (
                        <div key={`item-${idx}`} style={_st6}>
                            <div style={_st7}>
                                <img
                                    src={
                                        bookmark.author_avatar ||
                                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"%3E%3Crect fill="%235865f2" width="32" height="32" rx="16"/%3E%3Ctext x="16" y="16" font-size="14" text-anchor="middle" dy=".35em" fill="white" font-family="Arial"%3E👤%3C/text%3E%3C/svg%3E'
                                    }
                                    alt={bookmark.author_name}
                                    style={_st8}
                                />
                                <div style={_st9}>
                                    <h4 style={styles.settingRowTitle}>{bookmark.author_name}</h4>
                                    <span style={_st10}>
                                        {bookmark.channel_name} •{' '}
                                        {new Date(bookmark.timestamp).toLocaleString('tr-TR')}
                                    </span>
                                </div>
                            </div>
                            <p style={_st11}>{bookmark.content}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

BookmarksTab.propTypes = {
    bookmarks: PropTypes.array,
};
export default BookmarksTab;
