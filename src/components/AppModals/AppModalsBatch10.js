import React, { Suspense } from 'react';
import { BATCH10_MODALS } from './batch10Config';

import PropTypes from 'prop-types';

/**
 * AppModalsBatch10 — BATCH 10: 50 Essential Features
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
                    <Suspense
                        key={key}
                        fallback={
                            <div role="region" aria-label="App Modals Batch10">
                                {fb || 'Loading...'}
                            </div>
                        }
                    >
                        <C onClose={() => closeModal(key)} {...(getProps ? getProps(props) : {})} />
                    </Suspense>
                );
            })}
        </>
    );
};

React.propTypes = {};

AppModalsBatch10.propTypes = {
    props: PropTypes.array,
};

export default React.memo(AppModalsBatch10);
