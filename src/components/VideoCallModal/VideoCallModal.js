import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useVideoCall from './useVideoCall';
import useModalA11y from '../../hooks/useModalA11y';
import styles from './videoCallStyles';

const VideoCallModal = ({ isOpen, onClose, channelId, serverId, token }) => {
    const { t } = useTranslation();
    const hookData = useVideoCall(isOpen, onClose, channelId, serverId, token);
    const { dialogProps } = useModalA11y({ onClose, label: 'Video Call' });
    const { loading = false, error = null } = hookData || {};
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

    return <div {...dialogProps}>{/* VideoCallModal content */}</div>;
};

VideoCallModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    channelId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    serverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    token: PropTypes.string,
};

export default VideoCallModal;
