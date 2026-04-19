// frontend/src/StickerPicker.js
// 10/10 � Full-featured sticker picker with search, categories, recents, hover preview

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

import { useTranslation } from 'react-i18next';
import logger from '../utils/logger';

const RECENT_KEY = 'pawscord_recent_stickers';
const MAX_RECENT = 20;

/* -- helpers ------------------------------------------------ */
const loadRecent = () => {
    try {
        return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]');
    } catch {
        return [];
    }
};
const saveRecent = (sticker) => {
    const list = loadRecent().filter((s) => s.id !== sticker.id);
    list.unshift(sticker);
    localStorage.setItem(RECENT_KEY, JSON.stringify(list.slice(0, MAX_RECENT)));
};

/* -- component ---------------------------------------------- */
const StickerPicker = ({ categoryId, onSelect, onClose, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const [stickers, setStickers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [tab, setTab] = useState('all'); // all | recent | category names
    const [preview, setPreview] = useState(null);
    const containerRef = useRef(null);

    /* fetch stickers */
    useEffect(() => {
        if (!categoryId) return;
        setLoading(true);
        fetchWithAuth(`${apiBaseUrl}/servers/${categoryId}/stickers/`)
            .then((res) => res.json())
            .then((data) => setStickers(Array.isArray(data) ? data : []))
            .catch((err) => logger.error('Sticker fetch error:', err))
            .finally(() => setLoading(false));
    }, [categoryId, apiBaseUrl, fetchWithAuth]);

    /* close on outside click */
    useEffect(() => {
        const handler = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) onClose?.();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [onClose]);

    /* derived: categories extracted from sticker data */
    const categories = useMemo(() => {
        const cats = new Set();
        stickers.forEach((s) => {
            if (s.category) cats.add(s.category);
        });
        return ['all', 'recent', ...Array.from(cats)];
    }, [stickers]);

    /* filtered stickers */
    const visible = useMemo(() => {
        let list = tab === 'recent' ? loadRecent() : stickers;
        if (tab !== 'all' && tab !== 'recent') list = list.filter((s) => s.category === tab);
        if (search.trim()) {
            const q = search.toLowerCase();
            list = list.filter(
                (s) =>
                    (s.name || '').toLowerCase().includes(q) ||
                    (s.tags || '').toLowerCase().includes(q)
            );
        }
        return list;
    }, [stickers, tab, search]);

    const handleSelect = useCallback(
        (sticker) => {
            saveRecent(sticker);
            onSelect?.(sticker.image);
        },
        [onSelect]
    );

    return (
        <div ref={containerRef} style={styles.container}>
            {/* -- header -- */}
            <div style={styles.header}>
                <span style={styles.headerTitle}>{t('sticker.title')}</span>
                <button style={styles.closeBtn} onClick={onClose} aria-label={t('common.close')}>
                    �
                </button>
            </div>

            {/* -- search -- */}
            <div style={styles.searchWrap}>
                <input
                    style={styles.searchInput}
                    type="text"
                    placeholder={t('sticker.search')}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {/* -- category tabs -- */}
            <div style={styles.tabs}>
                {categories.map((cat) => (
                    <button
                        key={cat}
                        style={{ ...styles.tabBtn, ...(tab === cat ? styles.tabBtnActive : {}) }}
                        onClick={() => setTab(cat)}
                    >
                        {cat === 'all'
                            ? `? ${t('sticker.all')}`
                            : cat === 'recent'
                              ? `?? ${t('sticker.recent')}`
                              : cat}
                    </button>
                ))}
            </div>

            {/* -- grid -- */}
            <div style={styles.grid}>
                {loading ? (
                    <div style={styles.loadingWrap}>
                        <div style={styles.spinner} />
                        <span style={styles.loadingText}>{t('sticker.loading')}</span>
                    </div>
                ) : visible.length > 0 ? (
                    visible.map((sticker) => (
                        <div
                            key={sticker.id}
                            style={styles.stickerWrap}
                            onMouseEnter={() => setPreview(sticker)}
                            onMouseLeave={() => setPreview(null)}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleSelect(sticker)}
                            title={sticker.name || ''}
                            onKeyDown={(e) =>
                                (e.key === 'Enter' || e.key === ' ') && e.currentTarget.click()
                            }
                        >
                            <img
                                src={sticker.image}
                                alt={sticker.name || 'sticker'}
                                style={styles.stickerImg}
                                loading="lazy"
                            />
                        </div>
                    ))
                ) : (
                    <div style={styles.emptyWrap}>
                        <span style={styles.emptyIcon}>??</span>
                        <p style={styles.emptyText}>
                            {search
                                ? t('sticker.noSearchResults')
                                : tab === 'recent'
                                  ? t('sticker.noRecent')
                                  : t('sticker.notAvailable')}
                        </p>
                    </div>
                )}
            </div>

            {/* -- hover preview -- */}
            {preview && (
                <div style={styles.preview}>
                    <img src={preview.image} alt={preview.name} style={styles.previewImg} />
                    <span style={styles.previewName}>{preview.name}</span>
                </div>
            )}
        </div>
    );
};

/* -- styles ------------------------------------------------- */
const styles = {
    container: {
        position: 'absolute',
        bottom: 60,
        right: 10,
        width: 340,
        height: 380,
        backgroundColor: '#111214',
        borderRadius: 8,
        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
        zIndex: 100,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 14px',
        borderBottom: '1px solid #1e2024',
    },
    headerTitle: { fontWeight: 700, color: '#fff', fontSize: '0.95em' },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: '#949ba4',
        fontSize: '1.4em',
        cursor: 'pointer',
        lineHeight: 1,
    },
    searchWrap: { padding: '8px 14px 4px' },
    searchInput: {
        width: '100%',
        padding: '7px 10px',
        borderRadius: 4,
        border: '1px solid #2a2d33',
        backgroundColor: '#1e2024',
        color: '#ddd',
        fontSize: '0.85em',
        outline: 'none',
        boxSizing: 'border-box',
    },
    tabs: {
        display: 'flex',
        gap: 4,
        padding: '6px 14px',
        overflowX: 'auto',
        borderBottom: '1px solid #1e2024',
        flexShrink: 0,
    },
    tabBtn: {
        flexShrink: 0,
        padding: '4px 10px',
        borderRadius: 4,
        border: 'none',
        backgroundColor: 'transparent',
        color: '#949ba4',
        cursor: 'pointer',
        fontSize: '0.78em',
        whiteSpace: 'nowrap',
        transition: 'all 0.15s',
    },
    tabBtnActive: { backgroundColor: '#5865f2', color: '#fff' },
    grid: {
        flex: 1,
        padding: 10,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 8,
        overflowY: 'auto',
        alignContent: 'start',
    },
    stickerWrap: {
        aspectRatio: '1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        cursor: 'pointer',
        backgroundColor: '#1e2024',
        transition: 'transform 0.12s, background 0.12s',
    },
    stickerImg: { width: '80%', height: '80%', objectFit: 'contain' },
    loadingWrap: {
        gridColumn: '1/-1',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },
    spinner: {
        width: 28,
        height: 28,
        border: '3px solid #2a2d33',
        borderTopColor: '#5865f2',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
    },
    loadingText: { color: '#949ba4', fontSize: '0.85em', marginTop: 10 },
    emptyWrap: {
        gridColumn: '1/-1',
        textAlign: 'center',
        padding: '30px 10px',
    },
    emptyIcon: { fontSize: '2.4em', display: 'block', marginBottom: 8, opacity: 0.5 },
    emptyText: { color: '#949ba4', fontSize: '0.85em', margin: 0 },
    preview: {
        position: 'absolute',
        bottom: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#1e2024',
        borderRadius: 8,
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
        pointerEvents: 'none',
    },
    previewImg: { width: 56, height: 56, objectFit: 'contain' },
    previewName: { color: '#ddd', fontSize: '0.9em', fontWeight: 600 },
};

StickerPicker.propTypes = {
    categoryId: PropTypes.string,
    onSelect: PropTypes.func,
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};
export default React.memo(StickerPicker);
