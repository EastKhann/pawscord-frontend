import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles';
import useModalA11y from '../../../hooks/useModalA11y';
import { useTranslation } from 'react-i18next';
import css from '../tabs/AdminTabs.module.css';

// -- dynamic style helpers (pass 2) --

const S = {
    txt: { color: '#e74c3c', fontSize: '12px' },
    flex: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 20,
    },
};

const _st1183 = {
    backgroundColor: '#f23f42',
    color: '#fff',
    padding: '10px 16px',
    borderRadius: '6px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '14px',
};

const DeleteConfirmModal = ({ deleteConfirm, handleServerDelete, setDeleteConfirm }) => {
    const { t } = useTranslation();

    const onClose = useCallback(() => setDeleteConfirm(null), [setDeleteConfirm]);
    const { modalRef, overlayProps, dialogProps } = useModalA11y({
        onClose,
        label: 'Delete Confirmation',
    });
    return (
        <div aria-label={t('admin.deleteConfirmModal', 'Delete confirmation')} style={S.flex} {...overlayProps}>
            <div className={css.modalCard420} {...dialogProps}>
                <h3 className={css.dangerH3}>{t('delete_confirmation')}</h3>
                <p className={css.mutedText}>
                    <strong className="text-white">"{deleteConfirm.name}"</strong> are you sure you
                    want to delete?
                    <br />
                    <span style={S.txt}>{t('bu_işlem_geri alınamaz')}</span>
                </p>
                <div className="flex-gap-8-mt16">
                    <button
                        style={_st1183}
                        onClick={() => {
                            if (deleteConfirm.type === 'server')
                                handleServerDelete(deleteConfirm.id, deleteConfirm.name);
                        }}
                    >
                        🗑️ Delete
                    </button>
                    <button style={styles.actionBtnGrayLg} onClick={() => setDeleteConfirm(null)}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

DeleteConfirmModal.propTypes = {
    deleteConfirm: PropTypes.object,
    handleServerDelete: PropTypes.func,
    setDeleteConfirm: PropTypes.func,
};
export default DeleteConfirmModal;
