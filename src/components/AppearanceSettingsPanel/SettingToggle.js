import PropTypes from 'prop-types';

const SettingToggle = ({ label, desc, checked, onChange }) => {
    return (
        <div className="setting-item">
            <div className="setting-info">
                <div className="setting-label">{label}</div>
                <div className="setting-desc">{desc}</div>
            </div>
            <label className="toggle-switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    aria-label={label || 'toggle'}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
};

SettingToggle.propTypes = {
    label: PropTypes.string,
    desc: PropTypes.object,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
};
export default SettingToggle;
