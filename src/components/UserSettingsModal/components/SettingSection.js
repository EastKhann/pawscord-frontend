import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const S = {
    txt: { color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 12 },
    mar: { marginBottom: 24 },
};

const SettingSection = ({ title, children }) => {
    const { t } = useTranslation();
    return (
        <div aria-label={t('settings.section', 'Setting section')} style={S.mar}>
            <h3 style={S.txt}>{title}</h3>
            {children}
        </div>
    );
};

SettingSection.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node,
};
export default SettingSection;
