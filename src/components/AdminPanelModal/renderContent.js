import React from 'react';

// Extracted from AdminPanelModal.js
    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return renderDashboard();
            case 'users': return renderUsers();
            case 'servers': return renderServers();
            case 'logs': return renderLogs();
            case 'moderation': return renderModeration();
            case 'database': return renderDatabase();
            case 'system': return renderSystemHealth();
            case 'security': return renderSecurity();
            case 'broadcast': return renderBroadcast();
            case 'tools': return renderTools();
            case 'quickActions': return renderQuickActions();
            default: return renderDashboard();
        }
    };
