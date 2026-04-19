import React from 'react';
import PropTypes from 'prop-types';
import { FaPlug, FaCheck, FaLink } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const AvailableIntegrations = ({ integrations, icons, colors, getCategoryIcon, onConnect }) => {
    const { t } = useTranslation();

    const categories = [...new Set(integrations.map((i) => i.category))];

    if (integrations.length === 0) {
        return (
            <div aria-label="available integrations" className="empty-state">
                <FaPlug />
                <p>{t('tüm_entegrasyonlar_zaten_bağlı')}</p>
            </div>
        );
    }

    return (
        <div className="available-list">
            {categories.map((category) => (
                <div key={category} className="category-section">
                    <h3 className="category-title">
                        {getCategoryIcon(category)}
                        {category === 'development' && t('ui.gelistirme')}
                        {category === 'entertainment' && t('ui.eglence')}
                        {category === 'streaming' && t('admin.panel.broadcast')}
                        {category === 'productivity' && t('ui.uretkenlik')}
                        {category === 'content' && 'Content'}
                        {category === 'social' && 'Sosyal'}
                    </h3>
                    <div className="integrations-grid">
                        {integrations
                            .filter((i) => i.category === category)
                            .map((integration) => {
                                const Icon = icons[integration.id] || FaPlug;
                                const color = colors[integration.id] || '#666';

                                return (
                                    <div
                                        key={integration.id}
                                        className="integration-card available"
                                    >
                                        <div
                                            className="integration-icon"
                                            style={{ background: color }}
                                        >
                                            <Icon />
                                        </div>
                                        <div className="integration-details">
                                            <h4>{integration.name}</h4>
                                            <p>{integration.description}</p>
                                            <ul className="features">
                                                {integration.features?.slice(0, 3).map((f, i) => (
                                                    <li key={`item-${i}`}>
                                                        <FaCheck /> {f}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <button
                                            className="connect-btn"
                                            onClick={() => onConnect(integration.id)}
                                        >
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

AvailableIntegrations.propTypes = {
    integrations: PropTypes.array,
    icons: PropTypes.array,
    colors: PropTypes.array,
    getCategoryIcon: PropTypes.func,
    onConnect: PropTypes.func,
};
export default AvailableIntegrations;
