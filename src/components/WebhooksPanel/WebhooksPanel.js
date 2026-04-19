/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const WebhooksPanel = ({ serverId, token, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
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
        <div role="region" aria-label={t('webhookspanel.title', 'WebhooksPanel')}>
            {/* WebhooksPanel content */}
        </div>
    );
};

WebhooksPanel.propTypes = {
    serverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    token: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};

export default WebhooksPanel;
