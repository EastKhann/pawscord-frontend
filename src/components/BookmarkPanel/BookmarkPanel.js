import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import useBookmarks from './useBookmarks';
import styles from './bookmarkPanelStyles';

const BookmarkPanel = ({ fetchWithAuth, apiBaseUrl }) => {
    const { t } = useTranslation();
    const hookData = useBookmarks(fetchWithAuth, apiBaseUrl);
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
        <div role="region" aria-label={t('bookmarkpanel.title', 'BookmarkPanel')}>
            {/* BookmarkPanel content */}
        </div>
    );
};

BookmarkPanel.propTypes = {
    fetchWithAuth: PropTypes.func,
    apiBaseUrl: PropTypes.string,
};

export default BookmarkPanel;
