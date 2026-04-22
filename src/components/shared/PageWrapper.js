import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types'; // frontend/src/components/PageWrapper.js
import { Capacitor } from '@capacitor/core';

const PageWrapper = ({ children }) => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const isNative = Capacitor.isNativePlatform();

    return (
        <div
            aria-label={t('common.pageWrapper', 'Page content')}
            style={{
                width: '100%',
                height: '100dvh',
                boxSizing: 'border-box',

                // 🔥 1. TEKNİK BOŞLUK: Sadece APK ise çentik payı bırak
                paddingTop: isNative ? 'max(35px, env(safe-area-inset-top))' : '0px',

                backgroundColor: '#0d0e10',

                // 🔥 2. SCROLL BURADA OLACAK: Internalindeki pagelar scroll etmeyecek
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {children}
        </div>
    );
};

PageWrapper.propTypes = {
    children: PropTypes.node.isRequired,
};
export default PageWrapper;
