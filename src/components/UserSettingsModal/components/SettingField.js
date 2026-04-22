import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const S = {
    txt: {
        fontSize: 11,
        fontWeight: 700,
        color: '#949ba4',
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    bg: { padding: '12px 16px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 4 },
};

const SettingField = ({ label, value, masked }) => {
    const { t } = useTranslation();
    return (
        <div aria-label={t('settings.field', 'Setting field')} style={S.bg}>
            <div style={S.txt}>{label}</div>
            <div className="text-dbd-14n">{masked ? '' : value}</div>
        </div>
    );
};

SettingField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    masked: PropTypes.object,
};
export default SettingField;
