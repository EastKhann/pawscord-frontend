import React from 'react';
import { useUIStore } from '../stores/useUIStore';
import { FEATURE_SECTIONS, getHoverBg } from './FeatureHubModal/featureSections';
import useModalA11y from '../hooks/useModalA11y';
import styles from './FeatureHubModal/styles';

const FeatureHubModal = () => {
    const { openModal, closeModal } = useUIStore();
    const onClose = () => closeModal('featureHub');
    const { overlayProps, dialogProps } = useModalA11y({ onClose, isOpen: true, label: 'Feature Hub' });

    const handleSelect = (modal) => {
        openModal(modal);
        closeModal('featureHub');
    };

    return (
        <div style={styles.overlay} {...overlayProps}>
            <div style={styles.container} {...dialogProps}>
                <div style={styles.header}>
                    <h2 style={styles.title}>{'🚀'} Tüm Özellikler</h2>
                    <button onClick={() => closeModal('featureHub')} style={styles.closeBtn}>{'✕'}</button>
                </div>

                {FEATURE_SECTIONS.map((section, sIdx) => (
                    <div key={sIdx} style={sIdx < FEATURE_SECTIONS.length - 1 ? styles.section : undefined}>
                        <h3 style={styles.sectionTitle(section.color)}>{section.title}</h3>
                        <div style={styles.grid}>
                            {section.items.map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSelect(item.modal)}
                                    style={styles.button}
                                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = getHoverBg(section.color); e.currentTarget.style.borderColor = section.color; }}
                                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                                >
                                    <span style={styles.buttonIcon}>{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeatureHubModal;
