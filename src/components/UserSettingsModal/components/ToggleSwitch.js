const ToggleSwitch = ({ value, onChange, label }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <span style={{ color: '#dcddde', fontSize: 14 }}>{label}</span>
        <button
            type="button"
            onClick={() => onChange(!value)}
            style={{
                width: 44, height: 24, borderRadius: 12, border: 'none', cursor: 'pointer',
                backgroundColor: value ? '#3ba55c' : '#72767d', position: 'relative', transition: 'all 0.2s',
            }}
        >
            <div style={{
                width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fff',
                position: 'absolute', top: 3, left: value ? 23 : 3, transition: 'left 0.2s',
            }} />
        </button>
    </div>
);

export default ToggleSwitch;
