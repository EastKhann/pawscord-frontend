import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useWatchParty from './useWatchParty';
import styles from './styles';

const WatchPartyEnhanced = ({ channelId, serverId, token, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const hookData = useWatchParty(channelId, serverId, token, fetchWithAuth, apiBaseUrl);
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
        <div role="region" aria-label={t('watchpartyenhanced.title', 'WatchPartyEnhanced')}>
            {/* WatchPartyEnhanced content */}
        </div>
    );
};

WatchPartyEnhanced.propTypes = {
    channelId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    serverId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    token: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};

export default WatchPartyEnhanced;
