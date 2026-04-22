/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaRobot, FaPlus, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import useAutoResponders, { MATCH_TYPES } from '../AutoRespondersPanel/useAutoResponders';
import styles from '../AutoRespondersPanel/autoRespondersStyles';
import { useTranslation } from 'react-i18next';

const S = {
    txt: { color: '#949ba4', fontSize: '24px' },
};

const AutoRespondersPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const { t } = useTranslation();
    const [error, setError] = useState(null);
    const {
        responders,
        loading,
        showCreate,
        setShowCreate,
        newResponder,
        setNewResponder,
        createResponder,
        toggleResponder,
        deleteResponder,
    } = useAutoResponders({ fetchWithAuth, apiBaseUrl, serverId });

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaRobot className="icon-primary-mr10" />
                        <h2 style={styles.title}>{t('autoResponder.title')}</h2>
                    </div>
                    <button aria-label={t('common.close')} onClick={onClose} style={styles.closeButton}>
                        <FaTimes />
                    </button>
                </div>

                <div style={styles.toolbar}>
                    <div style={styles.count}>
                        {responders.length} {t('autoResponder.countLabel')}
                    </div>
                    <button
                        aria-label={t('autoResponder.createNew')}
                        onClick={() => setShowCreate(!showCreate)}
                        style={styles.createButton}
                    >
                        <FaPlus className="mr-6" />
                        {t('autoResponder.createNew')}
                    </button>
                </div>

                {showCreate && (
                    <div style={styles.createForm}>
                        <div style={styles.formRow}>
                            <label style={styles.label}>{t('autoResponder.trigger')}</label>
                            <input
                                type="text"
                                value={newResponder.trigger}
                                onChange={(e) =>
                                    setNewResponder({ ...newResponder, trigger: e.target.value })
                                }
                                placeholder={t('autoResponder.triggerPlaceholder')}
                                style={styles.input}
                            />
                        </div>
                        <div style={styles.formRow}>
                            <label style={styles.label}>{t('autoResponder.response')}</label>
                            <textarea
                                value={newResponder.response}
                                onChange={(e) =>
                                    setNewResponder({ ...newResponder, response: e.target.value })
                                }
                                placeholder={t('autoResponder.responsePlaceholder')}
                                style={styles.textarea}
                                rows={3}
                            />
                        </div>
                        <div style={styles.formRow}>
                            <label style={styles.label}>{t('autoResponder.matchType')}</label>
                            <select
                                value={newResponder.match_type}
                                onChange={(e) =>
                                    setNewResponder({ ...newResponder, match_type: e.target.value })
                                }
                                style={styles.select}
                            >
                                {MATCH_TYPES.map((mt) => (
                                    <option key={mt.value} value={mt.value}>
                                        {mt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <label style={styles.checkbox}>
                            <input
                                type="checkbox"
                                checked={newResponder.case_sensitive}
                                onChange={(e) =>
                                    setNewResponder({
                                        ...newResponder,
                                        case_sensitive: e.target.checked,
                                    })
                                }
                            />
                            <span style={styles.checkboxLabel}>
                                {t('autoResponder.caseSensitive')}
                            </span>
                        </label>
                        <button
                            aria-label={t('autoResponder.createResponder')}
                            onClick={createResponder}
                            style={styles.submitButton}
                        >
                            {t('autoResponder.createResponder')}
                        </button>
                    </div>
                )}

                <div style={styles.content}>
                    {loading ? (
                        <div style={styles.loading}>{t('common.loading')}</div>
                    ) : responders.length === 0 ? (
                        <div style={styles.empty}>{t('autoResponder.noResponders')}</div>
                    ) : (
                        <div style={styles.respondersList}>
                            {responders.map((resp, idx) => (
                                <div key={`item-${idx}`} style={styles.responderCard}>
                                    <div style={styles.responderInfo}>
                                        <div style={styles.trigger}>
                                            {t('autoResponder.trigger')}:{' '}
                                            <span style={styles.triggerValue}>{resp.trigger}</span>
                                        </div>
                                        <div style={styles.response}>{resp.response}</div>
                                        <div style={styles.meta}>
                                            {
                                                MATCH_TYPES.find(
                                                    (mt) => mt.value === resp.match_type
                                                )?.label
                                            }
                                            {resp.case_sensitive &&
                                                ` • ${t('autoResponder.caseSensitive')}`}
                                            {` • ${t('autoResponder.uses')}: ` +
                                                (resp.usage_count || 0)}
                                        </div>
                                    </div>
                                    <div style={styles.actions}>
                                        <button
                                            aria-label={t('common.toggle')}
                                            onClick={() => toggleResponder(resp.id, !resp.enabled)}
                                            style={styles.toggleButton}
                                            title={
                                                resp.enabled
                                                    ? t('common.disable')
                                                    : t('common.enable')
                                            }
                                        >
                                            {resp.enabled ? (
                                                <FaToggleOn className="icon-success" />
                                            ) : (
                                                <FaToggleOff style={S.txt} />
                                            )}
                                        </button>
                                        <button
                                            aria-label={t('autoResponder.delete', 'Delete auto-responder')}
                                            onClick={() => deleteResponder(resp.id)}
                                            style={styles.deleteButton}
                                            title="Sil"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

AutoRespondersPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
    onClose: PropTypes.func,
    serverId: PropTypes.string,
};
export default AutoRespondersPanel;
