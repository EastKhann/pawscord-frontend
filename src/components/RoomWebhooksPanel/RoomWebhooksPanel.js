import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useRoomWebhooks from './useRoomWebhooks';
import styles from './roomWebhooksStyles';

const RoomWebhooksPanel = ({ channelId, token, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const hookData = useRoomWebhooks(channelId, token, fetchWithAuth, apiBaseUrl);
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

    return (
        <div role="region" aria-label={t('roomwebhookspanel.title', 'RoomWebhooksPanel')}>
            {/* RoomWebhooksPanel content */}
        </div>
    );
};

RoomWebhooksPanel.propTypes = {
    channelId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    token: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};

export default RoomWebhooksPanel;
