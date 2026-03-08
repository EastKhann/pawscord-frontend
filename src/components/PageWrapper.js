// frontend/src/components/PageWrapper.js
import { Capacitor } from '@capacitor/core';

const PageWrapper = ({ children }) => {
    const isNative = Capacitor.isNativePlatform();

    return (
        <div style={{
            width: '100%',
            height: '100dvh',
            boxSizing: 'border-box',

            // 🔥 1. TEKNİK BOŞLUK: Sadece APK ise çentik payı bırak
            paddingTop: isNative ? 'max(35px, env(safe-area-inset-top))' : '0px',

            backgroundColor: '#0d0e10',

            // 🔥 2. SCROLL BURADA OLACAK: İçindeki sayfalar scroll etmeyecek
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {children}
        </div>
    );
};

export default PageWrapper;

