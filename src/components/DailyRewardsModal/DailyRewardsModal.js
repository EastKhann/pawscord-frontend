import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useDailyRewards from './useDailyRewards';
import styles from './dailyRewardsStyles';
import useModalA11y from '../../hooks/useModalA11y';

const DailyRewardsModal = ({ isOpen, onClose, fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const { dialogProps } = useModalA11y({ onClose, label: 'Daily Rewards' });
    const hookData = useDailyRewards({ fetchWithAuth, apiBaseUrl });
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

    return <div {...dialogProps}>{/* DailyRewardsModal content */}</div>;
};

DailyRewardsModal.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};

export default DailyRewardsModal;
