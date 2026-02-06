import React, { useState, useEffect } from 'react';
import './RoleTemplatesPanel.css';
import { FaLayerGroup, FaSave, FaPlus, FaTrash } from 'react-icons/fa';

function RoleTemplatesPanel({ apiBaseUrl, fetchWithAuth }) {
  const [templates, setTemplates] = useState([]);
  const [templateName, setTemplateName] = useState('');
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const defaultTemplates = [
    {
      name: 'Basic Server',
      roles: [
        { name: 'Admin', color: '#f04747', permissions: ['all'] },
        { name: 'Moderator', color: '#faa61a', permissions: ['moderate'] },
        { name: 'Member', color: '#43b581', permissions: ['read', 'write'] }
      ]
    },
    {
      name: 'Gaming Server',
      roles: [
        { name: 'Owner', color: '#f04747', permissions: ['all'] },
        { name: 'Admin', color: '#faa61a', permissions: ['admin'] },
        { name: 'VIP', color: '#5865f2', permissions: ['vip'] },
        { name: 'Streamer', color: '#9b59b6', permissions: ['stream'] },
        { name: 'Player', color: '#43b581', permissions: ['read', 'write'] }
      ]
    },
    {
      name: 'Study Group',
      roles: [
        { name: 'Professor', color: '#f04747', permissions: ['all'] },
        { name: 'TA', color: '#faa61a', permissions: ['moderate'] },
        { name: 'Student', color: '#5865f2', permissions: ['read', 'write'] },
        { name: 'Viewer', color: '#72767d', permissions: ['read'] }
      ]
    },
    {
      name: 'Business Server',
      roles: [
        { name: 'CEO', color: '#f04747', permissions: ['all'] },
        { name: 'Manager', color: '#faa61a', permissions: ['admin'] },
        { name: 'Employee', color: '#43b581', permissions: ['read', 'write'] },
        { name: 'Contractor', color: '#5865f2', permissions: ['limited'] },
        { name: 'Guest', color: '#72767d', permissions: ['read'] }
      ]
    }
  ];

  useEffect(() => {
    setTemplates(defaultTemplates);
  }, []);

  const createFromTemplate = async (template) => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/roles/template/create/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ template: template.name, roles: template.roles })
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`✅ Created ${data.created_count || 0} roles from template!`);
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to create template'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 YENİ: Custom template kaydetme
  const handleSaveCustomTemplate = async () => {
    if (!templateName.trim()) return;

    setLoading(true);
    setMessage('');
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/roles/template/save/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: templateName,
          roles: selectedRoles.length > 0 ? selectedRoles : [
            { name: 'Admin', color: '#f04747', permissions: ['all'] },
            { name: 'Member', color: '#43b581', permissions: ['read', 'write'] }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`✅ Template "${templateName}" saved!`);
        setTemplateName('');
        // Yeni template'i listeye ekle
        setTemplates(prev => [...prev, { name: templateName, roles: data.roles || [] }]);
      } else {
        const data = await response.json();
        setMessage(`❌ ${data.error || 'Failed to save template'}`);
      }
    } catch (err) {
      setMessage('❌ Network error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="role-templates-panel">
      <div className="templates-header">
        <h2><FaLayerGroup /> Role Templates</h2>
        <p>Quick-setup role configurations for your server</p>
      </div>

      {message && <div className="templates-message">{message}</div>}

      <div className="templates-grid">
        {templates.map((template, index) => (
          <div key={index} className="template-card">
            <div className="template-header">
              <h3>{template.name}</h3>
              <div className="role-count">{template.roles.length} roles</div>
            </div>

            <div className="template-roles">
              {template.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="role-preview">
                  <div
                    className="role-color"
                    style={{ backgroundColor: role.color }}
                  ></div>
                  <span className="role-name">{role.name}</span>
                  <div className="role-permissions">
                    {role.permissions.slice(0, 2).map((perm, i) => (
                      <span key={i} className="permission-tag">{perm}</span>
                    ))}
                    {role.permissions.length > 2 && (
                      <span className="permission-tag">+{role.permissions.length - 2}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="apply-template-btn"
              onClick={() => createFromTemplate(template)}
              disabled={loading}
            >
              <FaPlus /> Apply Template
            </button>
          </div>
        ))}
      </div>

      <div className="custom-template-section">
        <h3>🎨 Create Custom Template</h3>
        <div className="custom-form">
          <input
            type="text"
            placeholder="Template name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="template-name-input"
          />
          <button
            className="create-custom-btn"
            onClick={handleSaveCustomTemplate}
            disabled={!templateName.trim() || loading}
          >
            <FaSave /> Save as Template
          </button>
        </div>
      </div>

      <div className="info-section">
        <h4>ℹ️ About Role Templates</h4>
        <ul>
          <li>Templates provide pre-configured role hierarchies</li>
          <li>Roles include colors, names, and permission presets</li>
          <li>Customize roles after applying a template</li>
          <li>Templates help you set up servers in seconds</li>
          <li>Create custom templates based on your needs</li>
        </ul>
      </div>
    </div>
  );
}

export default RoleTemplatesPanel;
