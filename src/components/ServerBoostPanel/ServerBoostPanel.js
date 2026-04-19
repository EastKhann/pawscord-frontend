import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useServerBoost from './useServerBoost';
import styles from './serverBoostStyles';

const ServerBoostPanel = ({ serverId, token, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const hookData = useServerBoost(serverId, token, fetchWithAuth, apiBaseUrl);
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
        <div role="region" aria-label={t('serverboostpanel.title', 'ServerBoostPanel')}>
            {/* ServerBoostPanel content */}
        </div>
    );
};

ServerBoostPanel.propTypes = {
    serverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    token: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};

export default ServerBoostPanel;
