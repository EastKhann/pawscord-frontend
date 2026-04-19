import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useRaidProtection from './useRaidProtection';
import styles from './raidProtectionStyles';

const RaidProtectionPanel = ({ serverId, token, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const hookData = useRaidProtection(serverId, token, fetchWithAuth, apiBaseUrl);
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
        <div role="region" aria-label={t('raidprotectionpanel.title', 'RaidProtectionPanel')}>
            {/* RaidProtectionPanel content */}
        </div>
    );
};

RaidProtectionPanel.propTypes = {
    serverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    token: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};

export default RaidProtectionPanel;
