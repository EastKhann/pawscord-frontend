import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useProfileCustomization from './useProfileCustomization';
import styles from './profileCustomizationStyles';

const ProfileCustomization = ({ userId, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const hookData = useProfileCustomization(userId, fetchWithAuth, apiBaseUrl);
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
        <div role="region" aria-label={t('profilecustomization.title', 'ProfileCustomization')}>
            {/* ProfileCustomization content */}
        </div>
    );
};

ProfileCustomization.propTypes = {
    userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};

export default ProfileCustomization;
