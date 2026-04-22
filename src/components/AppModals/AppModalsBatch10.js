import React, { Suspense } from 'react';
import { BATCH10_MODALS } from './batch10Config';

import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

/**
 * AppModalsBatch10 — BATCH 10: 50 Essential Features
 * Data-driven modal renderer using batch10Config.
 */
const AppModalsBatch10 = (props) => {
    const { modals, closeModal } = props;

    const { t } = useTranslation();
    return (
        <>
            {BATCH10_MODALS.map(({ key, C, fb, cond, props: getProps }) => {
                if (!modals[key]) return null;
                if (cond && !cond(props)) return null;
                return (
                    <Suspense
                        key={key}
                        fallback={
                            <div role="region" aria-label={t('appModals.batch10', 'App modals batch 10')}>
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
