import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles';
import useModalA11y from '../../../hooks/useModalA11y';
import { useTranslation } from 'react-i18next';
import css from '../tabs/AdminTabs.module.css';

const S = {
    txt: { color: '#9ca3af', lineHeight: '1.6' },
};

const ActionConfirmationModal = ({
    actionModal,
    handleUserAction,
    setActionModal,
    setSelectedUser,
}) => {
    const { t } = useTranslation();

    const onClose = useCallback(() => setActionModal(null), [setActionModal]);
    const { modalRef, overlayProps, dialogProps } = useModalA11y({ onClose, label: 'Eylem Onayı' });
    return (
        <div aria-label="Eylem onayı modalı" className={css.absoOverlay8} {...overlayProps}>
            <div className={css.modalCard420} {...dialogProps}>
                <h3
                    style={{
                        color: actionModal.type === 'delete' ? '#dc2626' : '#f0b132',
                        marginTop: 0,
                    }}
                >
                    {actionModal.type === 'delete'
                        ? t('ui.useryi_delete')
                        : actionModal.type === 'ban'
                          ? t('ui.useryi_ban')
                          : `⚠️ ${t('adminActions.actionConfirm')}`}
                </h3>
                <p style={S.txt}>
                    <strong className="text-white">{actionModal.user?.username}</strong>
                    {actionModal.type === 'delete'
                        ? ` ${t('adminActions.deleteConfirmMsg')}`
                        : actionModal.type === 'ban'
                          ? ` ${t('adminActions.banConfirmMsg')}`
                          : ` ${t('adminActions.generalConfirmMsg')}`}
                </p>
                <div className="flex-gap-8-mt16">
                    <button
                        style={styles.actionBtn(
                            actionModal.type === 'delete' ? '#dc2626' : '#e74c3c'
                        )}
                        onClick={() => {
                            handleUserAction(actionModal.type, actionModal.user?.id);
                            setSelectedUser(null);
                        }}
                    >
                        {actionModal.type === 'delete'
                            ? t('ui.kalici_olarak_delete')
                            : t('adminActions.confirm')}
                    </button>
                    <button
                        style={styles.actionBtn('#6b7280')}
                        onClick={() => setActionModal(null)}
                    >
                        {t('common.cancel')}
                    </button>
                </div>
            </div>
        </div>
    );
};

ActionConfirmationModal.propTypes = {
    actionModal: PropTypes.object,
    handleUserAction: PropTypes.func,
    setActionModal: PropTypes.func,
    setSelectedUser: PropTypes.func,
};
export default ActionConfirmationModal;
