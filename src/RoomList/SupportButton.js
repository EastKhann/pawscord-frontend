// frontend/src/RoomList/SupportButton.js
import React from 'react';
import { FaHeart } from '../utils/iconOptimization';

const SupportButton = ({ onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                backgroundColor: '#1e1f22', padding: '10px 14px', margin: '0 8px 8px 8px',
                borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: '1px solid transparent',
                background: 'linear-gradient(135deg, rgba(235, 69, 158, 0.06) 0%, rgba(88, 101, 242, 0.06) 100%)',
                overflow: 'hidden', flexShrink: 0, minHeight: '44px',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(235, 69, 158, 0.12) 0%, rgba(88, 101, 242, 0.12) 100%)';
                e.currentTarget.style.borderColor = '#eb459e';
                e.currentTarget.style.transform = 'scale(1.01)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background = 'linear-gradient(135deg, rgba(235, 69, 158, 0.06) 0%, rgba(88, 101, 242, 0.06) 100%)';
                e.currentTarget.style.borderColor = 'transparent';
                e.currentTarget.style.transform = 'scale(1)';
            }}
            title="Geliştiriciye Destek Ol"
        >
            <FaHeart style={{ color: '#eb459e', fontSize: '18px', flexShrink: 0, animation: 'heartPulse 2s ease-in-out infinite' }} />
            <div style={{ flex: 1, textAlign: 'left', overflow: 'hidden' }}>
                <div style={{ color: 'white', fontWeight: '600', fontSize: '13px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    Developer'ı Destekle
                </div>
            </div>
            <div style={{
                background: 'linear-gradient(135deg, rgba(235, 69, 158, 0.2) 0%, rgba(88, 101, 242, 0.2) 100%)',
                padding: '4px 8px', borderRadius: '10px', fontSize: '12px', color: '#eb459e', fontWeight: 'bold', flexShrink: 0
            }}>
                ☕
            </div>
        </div>
    );
};

export default React.memo(SupportButton);
