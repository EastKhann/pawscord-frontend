/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useModalA11y from '../../hooks/useModalA11y';
import styles from './liveStreamStyles';

const LiveStreamModal = ({ isOpen, onClose, channelId, serverId }) => {
    const { t } = useTranslation();
    const { dialogProps } = useModalA11y({ onClose, label: 'Live Stream' });
    if (loading) {
        return (
            <div role="status" aria-label={t('common.loading')}>
                …
            </div>
        );
    }
    if (error) {
        return <div role="alert">{error}</div>;
    }

    return <div {...dialogProps}>{/* LiveStreamModal content */}</div>;
};

LiveStreamModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    channelId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    serverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default LiveStreamModal;
