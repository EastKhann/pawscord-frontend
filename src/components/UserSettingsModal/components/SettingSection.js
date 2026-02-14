const SettingSection = ({ title, children }) => (
    <div style={{ marginBottom: 24 }}>
        <h3 style={{ color: '#fff', fontSize: 16, fontWeight: 700, marginBottom: 12 }}>{title}</h3>
        {children}
    </div>
);

export default SettingSection;
