import PropTypes from 'prop-types';

const S = {
    txt: { color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 12 },
    mar: { marginBottom: 24 },
};

const SettingSection = ({ title, children }) => {
    return (
        <div aria-label="setting section" style={S.mar}>
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
