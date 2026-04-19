import React, { Suspense } from 'react';
import { BATCH11_MODALS } from './batch11Config';

import PropTypes from 'prop-types';

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
                const modalProps = getProps
                    ? { ...getProps({ ...props, closeModal }), onClose: () => closeModal(key) }
                    : {};
                if (noSuspense) return <C key={key} {...modalProps} />;
                return (
                    <Suspense
                        key={key}
                        fallback={
                            <div role="region" aria-label="App Modals Batch11">
                                {fb || 'Loading...'}
                            </div>
                        }
                    >
                        <C {...modalProps} />
                    </Suspense>
                );
            })}
        </>
    );
};

React.propTypes = {};

AppModalsBatch11.propTypes = {
    props: PropTypes.array,
};

export default React.memo(AppModalsBatch11);
