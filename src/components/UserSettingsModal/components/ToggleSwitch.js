import PropTypes from 'prop-types';

const S = {
    flex: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
    },
};

const ToggleSwitch = ({ value, onChange, label }) => {
    const { t } = useTranslation();
    return (
        <div aria-label={t('settings.toggleSwitch', 'Toggle switch')} style={S.flex}>
            <span className="text-dbd-14n">{label}</span>
            <button
                type="button"
                onClick={() => onChange(!value)}
                style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: value ? '#3ba55c' : '#949ba4',
                    position: 'relative',
                    transition: 'all 0.2s',
                }}
            >
                <div
                    style={{
                        width: 18,
                        height: 18,
                        borderRadius: '50%',
                        backgroundColor: '#fff',
                        position: 'absolute',
                        top: 3,
                        left: value ? 23 : 3,
                        transition: 'left 0.2s',
                    }}
                />
            </button>
        </div>
    );
};

ToggleSwitch.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    label: PropTypes.string,
};
export default ToggleSwitch;
