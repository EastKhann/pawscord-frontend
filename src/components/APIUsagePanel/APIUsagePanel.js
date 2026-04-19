import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useAPIUsage from './useAPIUsage';
import styles from './apiUsageStyles';

const APIUsagePanel = ({ serverSlug, token }) => {
    const { t } = useTranslation();
    const hookData = useAPIUsage(serverSlug, token);
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
        <div role="region" aria-label={t('apiusagepanel.title', 'APIUsagePanel')}>
            {/* APIUsagePanel content */}
        </div>
    );
};

APIUsagePanel.propTypes = {
    serverSlug: PropTypes.string,
    token: PropTypes.string,
};

export default APIUsagePanel;
