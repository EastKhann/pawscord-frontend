import React, { Suspense } from 'react';
import { BATCH10_MODALS } from './batch10Config';

/**
 * AppModalsBatch10 \u2014 BATCH 10: 50 Essential Features
 * Data-driven modal renderer using batch10Config.
 */
const AppModalsBatch10 = (props) => {
    const { modals, closeModal } = props;

    return (
        <>
            {BATCH10_MODALS.map(({ key, C, fb, cond, props: getProps }) => {
                if (!modals[key]) return null;
                if (cond && !cond(props)) return null;
                return (
                    <Suspense key={key} fallback={<div>{fb || 'Y\u00FCkleniyor...'}</div>}>
                        <C
                            onClose={() => closeModal(key)}
                            {...(getProps ? getProps(props) : {})}
                        />
                    </Suspense>
                );
            })}
        </>
    );
};

export default AppModalsBatch10;
