import React, { Suspense } from 'react';
import { BATCH11_MODALS } from './batch11Config';

/**
 * AppModalsBatch11 — Data-driven renderer for 51 modals
 * Config lives in batch11Config.js
 */
const AppModalsBatch11 = (props) => {
    const { modals, closeModal } = props;
    return (
        <>
            {BATCH11_MODALS.map(({ key, C, fb, cond, props: getProps, noSuspense }) => {
                if (!modals[key]) return null;
                if (cond && !cond(props)) return null;
                const modalProps = getProps ? { ...getProps({ ...props, closeModal }), onClose: () => closeModal(key) } : {};
                if (noSuspense) return <C key={key} {...modalProps} />;
                return (
                    <Suspense key={key} fallback={<div>{fb || 'Yükleniyor...'}</div>}>
                        <C {...modalProps} />
                    </Suspense>
                );
            })}
        </>
    );
};

export default AppModalsBatch11;
