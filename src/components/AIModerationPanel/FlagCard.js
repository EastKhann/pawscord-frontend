import { FaExclamationTriangle, FaBan, FaEye } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const S = {
    txt: { fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '8px' },
};

const FlagCard = ({ flag, styles, onAction }) => {
    const { t } = useTranslation();
    return (
        <div aria-label={t('aiModeration.flagCard', 'Flag card')} style={styles.flagCard}>
            <div style={styles.flagHeader}>
                <div>
                    <span style={styles.flagType(flag.type)}>
                        <FaExclamationTriangle /> {flag.type.toUpperCase()}
                    </span>
                    <div style={S.txt}>
                        {flag.user} • {flag.timestamp}
                    </div>
                </div>
                <div
                    style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: flag.confidence > 80 ? '#da373c' : '#f0b732',
                    }}
                >
                    {flag.confidence}%
                </div>
            </div>
            <div style={styles.flagMessage}>{flag.message}</div>
            <div style={styles.flagActions}>
                <button
                    onClick={() => onAction(flag.id, 'delete')}
                    style={styles.actionBtn('delete')}
                >
                    <FaBan />
                    {t('delete')}
                </button>
                <button
                    onClick={() => onAction(flag.id, 'timeout')}
                    style={styles.actionBtn('timeout')}
                >
                    {t('timeout_user')}
                </button>
                <button
                    onClick={() => onAction(flag.id, 'dismiss')}
                    style={styles.actionBtn('dismiss')}
                >
                    <FaEye />
                    {t('dismiss')}
                </button>
            </div>
        </div>
    );
};

FlagCard.propTypes = {
    flag: PropTypes.object,
    styles: PropTypes.array,
    onAction: PropTypes.func,
};
export default FlagCard;
