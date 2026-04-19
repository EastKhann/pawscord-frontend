/* eslint-disable jsx-a11y/label-has-associated-control */
// frontend/src/components/UserWarningsPanel/AddWarningModal.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaTimes, FaPlus } from 'react-icons/fa';
import styles from './styles';
import useModalA11y from '../../hooks/useModalA11y';

import { useTranslation } from 'react-i18next';
const INITIAL_WARNING = {
    user_id: '',
    reason: '',
    severity: 'medium',
    expires_in_days: 30,
    auto_ban_on: 3,
};

const AddWarningModal = ({ users, onAdd, onClose }) => {
    const { t } = useTranslation();
    const { overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Add Warning' });
    const [newWarning, setNewWarning] = useState(INITIAL_WARNING);

    const handleAdd = async () => {
        const success = await onAdd(newWarning);
        if (success) onClose();
    };

    return (
        <div style={styles.modalOverlay} {...overlayProps}>
            <div style={styles.modal} {...dialogProps}>
                <div style={styles.modalHeader}>
                    <h3 style={styles.modalTitle}>Uyarı Ekle</h3>
                    <button onClick={onClose} style={styles.modalClose}>
                        <FaTimes />
                    </button>
                </div>
                <div style={styles.modalContent}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Kullanıcı</label>
                        <select
                            value={newWarning.user_id}
                            onChange={(e) =>
                                setNewWarning({ ...newWarning, user_id: e.target.value })
                            }
                            style={styles.select}
                        >
                            <option value="">Kullanıcı seç...</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Sebep</label>
                        <textarea
                            value={newWarning.reason}
                            onChange={(e) =>
                                setNewWarning({ ...newWarning, reason: e.target.value })
                            }
                            placeholder="Bu uyarı neden veriliyor?"
                            style={styles.textarea}
                            rows="3"
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Ciddiyeti</label>
                        <select
                            value={newWarning.severity}
                            onChange={(e) =>
                                setNewWarning({ ...newWarning, severity: e.target.value })
                            }
                            style={styles.select}
                        >
                            <option value="low">🟢 Low</option>
                            <option value="medium">🟡 Medium</option>
                            <option value="high">🔴 High</option>
                        </select>
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Expires In (Days)</label>
                        <input
                            type="number"
                            value={newWarning.expires_in_days}
                            onChange={(e) =>
                                setNewWarning({
                                    ...newWarning,
                                    expires_in_days: parseInt(e.target.value),
                                })
                            }
                            style={styles.input}
                            min="1"
                            max="365"
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Auto-ban Threshold</label>
                        <input
                            type="number"
                            value={newWarning.auto_ban_on}
                            onChange={(e) =>
                                setNewWarning({
                                    ...newWarning,
                                    auto_ban_on: parseInt(e.target.value),
                                })
                            }
                            style={styles.input}
                            min="2"
                            max="10"
                        />
                        <div style={styles.hint}>
                            User will be auto-banned after reaching {newWarning.auto_ban_on} active
                            warnings
                        </div>
                    </div>
                </div>
                <div style={styles.modalActions}>
                    <button onClick={onClose} style={styles.cancelBtn}>
                        {t('common.cancel')}
                    </button>
                    <button onClick={handleAdd} style={styles.submitBtn}>
                        <FaPlus /> Uyardı Ekle
                    </button>
                </div>
            </div>
        </div>
    );
};

AddWarningModal.propTypes = {
    users: PropTypes.array,
    onAdd: PropTypes.func,
    onClose: PropTypes.func,
};
export default React.memo(AddWarningModal);
