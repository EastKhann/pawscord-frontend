import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useAutoResponders from './useAutoResponders';
import styles from './autoRespondersStyles';

const AutoRespondersPanel = ({ serverSlug, token, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const hookData = useAutoResponders(serverSlug, token, fetchWithAuth, apiBaseUrl);
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
        <div role="region" aria-label={t('autoresponderspanel.title', 'AutoRespondersPanel')}>
            {/* AutoRespondersPanel content */}
        </div>
    );
};

AutoRespondersPanel.propTypes = {
    serverSlug: PropTypes.string,
    token: PropTypes.string,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};

export default AutoRespondersPanel;
