/* eslint-disable no-undef */
import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import styles from './styles';

const EmojiPicker = ({ onSelect, onClose }) => {
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
        <div role="region" aria-label={t('emojipicker.title', 'EmojiPicker')}>
            {/* EmojiPicker content */}
        </div>
    );
};

EmojiPicker.propTypes = {
    onSelect: PropTypes.func,
    onClose: PropTypes.func,
};

export default EmojiPicker;
