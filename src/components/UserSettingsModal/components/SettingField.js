const SettingField = ({ label, value, masked }) => (
    <div style={{ padding: '12px 16px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 4 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: '#949ba4', textTransform: 'uppercase', marginBottom: 4 }}>{label}</div>
        <div style={{ color: '#dcddde', fontSize: 14 }}>{masked ? '••••••••' : value}</div>
    </div>
);

export default SettingField;
