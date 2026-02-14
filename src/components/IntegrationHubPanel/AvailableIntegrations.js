import React from 'react';
import { FaPlug, FaCheck, FaLink } from 'react-icons/fa';

const AvailableIntegrations = ({ integrations, icons, colors, getCategoryIcon, onConnect }) => {
    const categories = [...new Set(integrations.map(i => i.category))];

    if (integrations.length === 0) {
        return (
            <div className="empty-state">
                <FaPlug />
                <p>Tüm entegrasyonlar zaten bağlı</p>
            </div>
        );
    }

    return (
        <div className="available-list">
            {categories.map(category => (
                <div key={category} className="category-section">
                    <h3 className="category-title">
                        {getCategoryIcon(category)}
                        {category === 'development' && 'Geliştirme'}
                        {category === 'entertainment' && 'Eğlence'}
                        {category === 'streaming' && 'Yayın'}
                        {category === 'productivity' && 'Üretkenlik'}
                        {category === 'content' && 'İçerik'}
                        {category === 'social' && 'Sosyal'}
                    </h3>
                    <div className="integrations-grid">
                        {integrations.filter(i => i.category === category).map(integration => {
                            const Icon = icons[integration.id] || FaPlug;
                            const color = colors[integration.id] || '#666';

                            return (
                                <div key={integration.id} className="integration-card available">
                                    <div className="integration-icon" style={{ background: color }}>
                                        <Icon />
                                    </div>
                                    <div className="integration-details">
                                        <h4>{integration.name}</h4>
                                        <p>{integration.description}</p>
                                        <ul className="features">
                                            {integration.features?.slice(0, 3).map((f, i) => (
                                                <li key={i}><FaCheck /> {f}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button className="connect-btn" onClick={() => onConnect(integration.id)}>
                                        <FaLink /> Bağla
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AvailableIntegrations;
