/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect, useCallback } from 'react';
import { useAdminAPIContext } from '../AdminAPIContext';
import {
    FaPlus,
    FaTrash,
    FaSync,
    FaUser,
    FaSearch,
    FaBookOpen,
    FaBitcoin,
    FaKey,
} from 'react-icons/fa';
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
        color: '#a0a8ff',
        fontWeight: '600',
    },
    bg: {
        ...styles.statCard,
        marginBottom: '20px',
        background: 'linear-gradient(135deg, #5865f210, #4338ca10)',
    },
    txt: { color: '#a0a8ff' },
};

const FEATURE_KEYS = {
    access_education: {
        labelKey: 'admin.panel.englishLearning',
        fallback: '📚 English Learning',
        color: '#5865f2',
        icon: <FaBookOpen size={10} />,
    },
    access_crypto: {
        labelKey: 'admin.panel.cryptoSignals',
        fallback: '📈 Kripto Sinyaller',
        color: '#f0b132',
        icon: <FaBitcoin size={10} />,
    },
};

const FeatureWhitelistTab = () => {
    const { fetchWithAuth, apiBaseUrl } = useAdminAPIContext();
    const { t } = useTranslation();
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addMode, setAddMode] = useState('username');
    const [inputValue, setInputValue] = useState('');
    const [accessEducation, setAccessEducation] = useState(true);
    const [accessCrypto, setAccessCrypto] = useState(false);
    const [adding, setAdding] = useState(false);
    const [searchFilter, setSearchFilter] = useState('');

    const fetchList = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/feature-whitelist/`);
            if (res.ok) {
                const data = await res.json();
                setEntries(data.entries || []);
            } else {
                toast.error(t('admin.panel.featureWhitelistLoadError'));
            }
        } catch (err) {
            logger.error('Feature whitelist fetch error:', err);
            toast.error(t('admin.panel.featureWhitelistLoadError'));
        }
        setLoading(false);
    }, [fetchWithAuth, apiBaseUrl]);

    useEffect(() => {
        fetchList();
    }, [fetchList]);

    const handleAdd = async () => {
        const val = inputValue.trim();
        if (!val) return;
        if (!accessEducation && !accessCrypto) {
            toast.error(t('admin.panel.atLeastOneFeature'));
            return;
        }

        setAdding(true);
        try {
            const body = {
                [addMode === 'username' ? 'username' : 'friend_code']: val,
                access_education: accessEducation,
                access_crypto: accessCrypto,
            };

            const res = await fetchWithAuth(`${apiBaseUrl}/api/admin/feature-whitelist/add/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                const data = await res.json();
                const feats = [
                    data.access_education && t('admin.panel.englishLearning', '📚 İng. Öğrenme'),
                    data.access_crypto && t('admin.panel.cryptoSignals', '📈 Kripto'),
                ]
                    .filter(Boolean)
                    .join(', ');
                toast.success(`${data.friend_code} ${t('common.added', 'eklendi')}: ${feats}`);
                setInputValue('');
                fetchList();
            } else {
                const err = await res.json().catch(() => ({}));
                toast.error(err.error || t('common.addFailed', 'Ekleme başarısız'));
            }
        } catch (err) {
            logger.error('Feature whitelist add error:', err);
            toast.error(t('common.addFailed', 'Ekleme başarısız'));
        }
        setAdding(false);
    };

    const handleRemove = async (friendCode, username) => {
        const label = username || friendCode;
        if (
            !(await confirmDialog(
                t('admin.panel.removeConfirm', `${label} özellik listesinden kaldırılsın mı?`)
            ))
        )
            return;

        try {
            const res = await fetchWithAuth(
                `${apiBaseUrl}/api/admin/feature-whitelist/${friendCode}/`,
                {
                    method: 'DELETE',
                }
            );

            if (res.ok) {
                toast.success(`${label} ${t('admin.panel.whitelistRemoved')}`);
                fetchList();
            } else {
                const err = await res.json().catch(() => ({}));
                toast.error(err.error || t('common.removeFailed', 'Kaldırma başarısız'));
            }
        } catch (err) {
            logger.error('Feature whitelist remove error:', err);
            toast.error(t('common.removeFailed', 'Kaldırma başarısız'));
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
                    <FaKey color="#5865f2" />{' '}
                    {t('admin.panel.featureWhitelist', 'Özellik Erişim Listesi')}
                </h2>
                <div className={css.flexAlignGap8}>
                    <span style={styles.badge('#5865f2')}>
                        {entries.length} {t('admin.panel.usersCount')}
                    </span>
                    <button
                        aria-label={t('admin.refreshLogs', 'Refresh feature whitelist')}
                        onClick={fetchList}
                        style={styles.actionBtn('#5865f2')}
                        title={t('refresh')}
                    >
                        <FaSync size={11} />
                    </button>
                </div>
            </div>

            <p className={css.featureDesc}>
                {t('featureWhitelist.desc', 'This list gives free users access to selected sections (English Learning, Crypto Signals).')}
            </p>

            {/* Add new entry */}
            <div style={S.bg}>
                <div className={css.cardTitleMb12}>
                    ➕ {t('admin.panel.addUser', 'Kullanıcı Ekle')}
                </div>

                {/* Mode toggle */}
                <div className={css.flexGap8Mb12}>
                    <button
                        aria-label={t('featureWhitelist.addByUsername', 'Add by username')}
                        onClick={() => setAddMode('username')}
                        style={{
                            ...styles.actionBtn(addMode === 'username' ? '#5865f2' : '#333'),
                            padding: '8px 14px',
                        }}
                    >
                        <FaUser size={10} /> {t('admin.panel.username', 'Kullanıcı Adı')}
                    </button>
                    <button
                        aria-label={t('featureWhitelist.addByFriendCode', 'Add by friend code')}
                        onClick={() => setAddMode('friend_code')}
                        style={{
                            ...styles.actionBtn(addMode === 'friend_code' ? '#5865f2' : '#333'),
                            padding: '8px 14px',
                        }}
                    >
                        # {t('admin.panel.friendCode', 'Arkadaş Kodu')}
                    </button>
                </div>

                {/* Input */}
                <div className={css.flexGap8Mb12}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        placeholder={
                            addMode === 'username'
                                ? t('admin.panel.enterUsername', 'Kullanıcı adı girin...')
                                : t('admin.panel.enterFriendCode', '7 haneli arkadaş kodu girin...')
                        }
                        className={css.siMW280}
                        aria-label={t('admin.inputValue', 'Input value')}
                    />
                </div>

                {/* Feature toggles */}
                <div className="flex-gap-12-mb14">
                    {Object.entries(FEATURE_KEYS).map(([key, { labelKey, fallback, color }]) => {
                        const checked = key === 'access_education' ? accessEducation : accessCrypto;
                        const setFn =
                            key === 'access_education' ? setAccessEducation : setAccessCrypto;
                        return (
                            <label
                                key={key}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    cursor: 'pointer',
                                    userSelect: 'none',
                                    background: checked ? `${color}20` : '#1a1a1e',
                                    border: `1px solid ${checked ? color : '#333'}`,
                                    borderRadius: '8px',
                                    padding: '8px 14px',
                                    transition: 'all 0.15s',
                                }}
                            >
                                <input
                                    type="checkbox"
                                    checked={checked}
                                    onChange={(e) => setFn(e.target.checked)}
                                    style={{ accentColor: color, width: '14px', height: '14px' }}
                                />
                                <span
                                    style={{
                                        color: checked ? color : '#9ca3af',
                                        fontSize: '13px',
                                        fontWeight: '500',
                                    }}
                                >
                                    {t(labelKey, fallback)}
                                </span>
                            </label>
                        );
                    })}
                </div>

                <button
                    aria-label={t('featureWhitelist.addUser', 'Add to feature whitelist')}
                    onClick={handleAdd}
                    disabled={adding || !inputValue.trim() || (!accessEducation && !accessCrypto)}
                    style={{
                        ...styles.actionBtn('#23a559'),
                        padding: '10px 20px',
                        opacity:
                            adding || !inputValue.trim() || (!accessEducation && !accessCrypto)
                                ? 0.5
                                : 1,
                        cursor:
                            adding || !inputValue.trim() || (!accessEducation && !accessCrypto)
                                ? 'not-allowed'
                                : 'pointer',
                    }}
                >
                    <FaPlus size={11} />{' '}
                    {adding ? t('common.adding', 'Ekleniyor...') : t('common.add', 'Ekle')}
                </button>
            </div>

            {/* Search */}
            <div className={css.flexGap8Mb16}>
                <FaSearch color="#6b7280" size={13} />
                <input
                    type="text"
                    value={searchFilter}
                    onChange={(e) => setSearchFilter(e.target.value)}
                    placeholder={t('admin.panel.searchPlaceholder')}
                    className={css.siMW300}
                    aria-label={t('common.search', 'Search')}
                />
            </div>

            {/* Table */}
            {loading ? (
                <div className={css.loadingCenter}>
                    <FaSync className="spin" size={20} /> {t('common.loading', 'Yükleniyor...')}
                </div>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>#</th>
                            <th style={styles.th}>{t('friend_code')}</th>
                            <th style={styles.th}>{t('user')}</th>
                            <th style={styles.th}>{t('english_learning')}</th>
                            <th style={styles.th}>{t('kripto')}</th>
                            <th style={styles.th}>{t('admin.panel.operation')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={6} className={css.tdCenter}>
                                    {searchFilter
                                        ? t('admin.panel.resultsNotFound')
                                        : t('admin.panel.featureWhitelistEmpty')}
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
                                                entry.access_education ? '#5865f2' : '#333'
                                            )}
                                        >
                                            {entry.access_education
                                                ? t('common.open', '✅ Açık')
                                                : t('common.closed', '🔒 Kapalı')}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <span
                                            style={styles.badge(
                                                entry.access_crypto ? '#f0b132' : '#333'
                                            )}
                                        >
                                            {entry.access_crypto
                                                ? t('common.open', '✅ Açık')
                                                : t('common.closed', '🔒 Kapalı')}
                                        </span>
                                    </td>
                                    <td style={styles.td}>
                                        <button
                                            aria-label={t('featureWhitelist.removeUser', 'Remove from feature whitelist')}
                                            onClick={() =>
                                                handleRemove(entry.friend_code, entry.username)
                                            }
                                            style={styles.actionBtn('#e74c3c')}
                                            title={t('admin.panel.removeFromWhitelist')}
                                        >
                                            <FaTrash size={10} /> {t('common.remove', 'Kaldır')}
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
export default FeatureWhitelistTab;
