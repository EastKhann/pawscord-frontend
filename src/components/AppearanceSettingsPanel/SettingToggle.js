const SettingToggle = ({ label, desc, checked, onChange }) => (
  <div className="setting-item">
    <div className="setting-info">
      <div className="setting-label">{label}</div>
      <div className="setting-desc">{desc}</div>
    </div>
    <label className="toggle-switch">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider"></span>
    </label>
  </div>
);

export default SettingToggle;
