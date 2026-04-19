import React, { useState, useEffect, useCallback } from 'react';
import { useAdminAPIContext } from '../AdminAPIContext';
import { FaPlus, FaTrash, FaSync, FaCrown, FaUser, FaSearch } from 'react-icons/fa';
import styles from '../styles';
import toast from '../../../utils/toast';
import { useTranslation } from 'react-i18next';
import css from './AdminTabs.module.css';
import logger from '../../../utils/logger';
import confirmDialog from '../../../utils/confirmDialog';

const S = {
    bg2: {
        fontFamily: 'monospace',
        backgroundColor: '#1a1a1e',
        padding: '2px 8px',
        borderRadius: '4px',
        color: '#ffd700',
        fontWeight: '600',
    },
    size: {
        ...styles.searchInput,
        maxWidth: '320px',
    },
    bg: {
        ...styles.statCard,
        marginBottom: '20px',
        background: 'linear-gradient(135deg, #5865f210, #7c3aed10)',
    },
};

const WhitelistTab = () => {
    const { fetchWithAuth, apiBaseUrl } = useAdminAPIContext();
    const { t } = useTranslation();
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addMode, setAddMode] = useState('username'); // 'username' or 'friend_code'
    const [inputValue, setInputValue] = useState('');
    const [adding, setAdding] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');

    const fetchWhitelist = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/whitelist/`);
            if (res.ok) {
                const data = await res.json();
                setEntries(data.entries || []);
            } else {
                toast.error(t('admin.panel.whitelistLoadError'));
            }
        } catch (err) {
            logger.error('Whitelist fetch error:', err);
            toast.error(t('admin.panel.whitelistLoadError'));
        }
        setLoading(false);
    }, [fetchWithAuth, apiBaseUrl]);

    useEffect(() => {
        fetchWhitelist();
    }, [fetchWhitelist]);

    const handleAdd = async () => {
        const val = inputValue.trim();
        if (!val) return;

        setAdding(true);
        try {
            const body = addMode === 'username' ? { username: val } : { friend_code: val };

            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/whitelist/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                const data = await res.json();
                toast.success(t('admin.panel.whitelistAdded', { code: data.friend_code }));
                setInputValue('');
                fetchWhitelist();
            } else {
                const err = await res.json().catch(() => ({}));
                toast.error(err.error || t('admin.panel.whitelistAddFailed'));
            }
        } catch (err) {
            logger.error('Whitelist add error:', err);
            toast.error(t('admin.panel.whitelistAddFailed'));
        }
        setAdding(false);
    };

    const handleRemove = async (friendCode) => {
        if (!(await confirmDialog(t('whitelist.removeConfirm', { code: friendCode })))) return;

        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/whitelist/${friendCode}/`, {
                method: 'DELETE',
            });

            if (res.ok) {
                toast.success(`${friendCode} ${t('admin.panel.whitelistRemoved')}`);
                fetchWhitelist();
            } else {
                const err = await res.json().catch(() => ({}));
                toast.error(err.error || t('admin.panel.whitelistRemoveFailed'));
            }
        } catch (err) {
            logger.error('Whitelist remove error:', err);
            toast.error(t('admin.panel.whitelistRemoveFailed'));
        }
    };

    const filtered = entries.filter((e) => {
        if (!searchFilter) return true;
        const q = searchFilter.toLowerCase();
        return (
            (e.friend_code || '').toLowerCase().includes(q) ||
            (e.username || '').toLowerCase().includes(q)
        );
    });

    return (
        <div>
            {/* Header */}
            <div className={css.headerRow}>
                <h2 className={css.sectionHeader}>
                    <FaCrown color="#ffd700" /> Premium Whitelist
                </h2>
                <div className={css.flexAlignGap8}>
                    <span style={styles.badge('#23a559')}>
                        {entries.length} {t('admin.panel.usersCount')}
                    </span>
                    <button
                        aria-label="Refresh whitelist"
                        onClick={fetchWhitelist}
                        style={styles.actionBtn('#5865f2')}
                        title={t('refresh')}
                    >
                        <FaSync size={11} />
                    </button>
                </div>
            </div>

            {/* Add new entry */}
            <div style={S.bg}>
                <div className={css.cardTitleMb12}>➕ Add to Whitelist</div>

                <div className={css.flexGap8Mb12}>
                    <button
                        aria-label="Add by username"
                        onClick={() => setAddMode('username')}
                        style={{
                            ...styles.actionBtn(addMode === 'username' ? '#5865f2' : '#333'),
                            padding: '8px 14px',
                        }}
                    >
                        <FaUser size={10} /> Username
                    </button>
                    <button
                        aria-label="Add by friend code"
                        onClick={() => setAddMode('friend_code')}
                        style={{
                            ...styles.actionBtn(addMode === 'friend_code' ? '#5865f2' : '#333'),
                            padding: '8px 14px',
                        }}
                    >
                        # Friend Code
                    </button>
                </div>

                <div className={css.flexGap8}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        placeholder={
                            addMode === 'username'
                                ? 'Username girin...'
                                : '7 haneli friend code girin...'
                        }
                        style={S.size}
                        aria-label="Input Value"
                    />
                    <button
                        aria-label="Add to whitelist"
                        onClick={handleAdd}
                        disabled={adding || !inputValue.trim()}
                        style={{
                            ...styles.actionBtn('#23a559'),
                            padding: '10px 18px',
                            opacity: adding || !inputValue.trim() ? 0.5 : 1,
                            cursor: adding || !inputValue.trim() ? 'not-allowed' : 'pointer',
                        }}
                    >
                        <FaPlus size={11} /> {adding ? 'Addniyor...' : 'Add'}
                    </button>
                </div>
            </div>

            {/* Search filter */}
            <div className={css.flexGap8Mb16}>
                <FaSearch color="#6b7280" size={13} />
                <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder={t('admin.panel.searchPlaceholder')}
                    className={css.siMW300}
                    aria-label="Search Filter"
                />
            </div>

            {/* Whitelist table */}
            {loading ? (
                <div className={css.loadingCenter}>
                    <FaSync className="spin" size={20} /> Yükleniyor...
                </div>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>{t('friend_code')}</th>
                            <th style={styles.th}>{t('username')}</th>
                            <th style={styles.th}>{t('status')}</th>
                            <th style={styles.th}>{t('admin.panel.operation')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={5} className={css.tdCenter}>
                                    {searchFilter
                                        ? t('admin.panel.resultsNotFound')
                                        : t('admin.panel.whitelistEmpty')}
                                </td>
                            </tr>
                        ) : (
                            filtered.map((entry, idx) => (
                                <tr key={entry.friend_code}>
                                    <td style={styles.td}>{idx + 1}</td>
                                    <td style={styles.td}>
                                        <span style={S.bg2}>{entry.friend_code}</span>
                                    </td>
                                    <td style={styles.td}>
                                        {entry.username ? (
                                            <span className={css.textWhiteMed}>
                                                {entry.username}
                                            </span>
                                        ) : (
                                            <span className={css.textItalic}>—</span>
                                        )}
                                    </td>
                                    <td style={styles.td}>
                                        <span
                                            style={styles.badge(
                                                entry.username ? '#23a559' : '#f0b132'
                                            )}
                                        >
                                            {entry.username
                                                ? `✅ ${t('common.active')}`
                                                : `⚠ ${t('common.unknown')}`}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <button
                                            aria-label="Remove from whitelist"
                                            onClick={() => handleRemove(entry.friend_code)}
                                            style={styles.actionBtn('#e74c3c')}
                                            title={t('admin.panel.removeFromWhitelist')}
                                        >
                                            <FaTrash size={10} /> Remove
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};
export default WhitelistTab;
