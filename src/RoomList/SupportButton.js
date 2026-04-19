// frontend/src/RoomList/SupportButton.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { FaHeart } from '../utils/iconOptimization';

// -- extracted inline style constants --
const _st1 = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '12px 16px',
    background: 'linear-gradient(135deg, rgba(235,69,158,0.10) 0%, rgba(88,101,242,0.10) 100%)',
    border: '1px solid rgba(235,69,158,0.25)',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
    position: 'relative',
    overflow: 'hidden',
};
const _glowLine = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #eb459e, #5865f2, #eb459e)',
    backgroundSize: '200% 100%',
    animation: 'supportGlowLine 3s linear infinite',
};
const _iconWrap = {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(235,69,158,0.2), rgba(88,101,242,0.2))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
};
const _st3 = { display: 'flex', flexDirection: 'column', gap: '2px', flex: 1, minWidth: 0 };
const _st4 = { fontSize: '0.88em', fontWeight: 600, color: '#dbdee1', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' };
const _st5sub = { fontSize: '0.72em', color: '#949ba4' };
const _badge = {
    fontSize: '0.65em',
    fontWeight: 700,
    color: '#eb459e',
    background: 'rgba(235,69,158,0.12)',
    border: '1px solid rgba(235,69,158,0.25)',
    borderRadius: '4px',
    padding: '1px 5px',
    letterSpacing: '0.04em',
    flexShrink: 0,
};

const SupportButton = ({ onClick }) => {
    const { t } = useTranslation();
    return (
        <div
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            role="button"
            tabIndex={0}
            aria-label={t('support.title')}
            data-testid="support-button"
            style={_st1}
            onMouseEnter={(e) => {
                e.currentTarget.style.background =
                    'linear-gradient(135deg, rgba(235,69,158,0.18) 0%, rgba(88,101,242,0.18) 100%)';
                e.currentTarget.style.borderColor = 'rgba(235,69,158,0.5)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(235,69,158,0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.background =
                    'linear-gradient(135deg, rgba(235,69,158,0.10) 0%, rgba(88,101,242,0.10) 100%)';
                e.currentTarget.style.borderColor = 'rgba(235,69,158,0.25)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
            }}
            title={t('support.title')}
        >
            <style>{`@keyframes supportGlowLine { 0%{background-position:0% 0%} 100%{background-position:200% 0%} }`}</style>
            <div style={_glowLine} />
            <div style={_iconWrap}>
                <FaHeart color="#eb459e" size={16} />
            </div>
            <div style={_st3}>
                <div style={_st4}>{t('support.title')}</div>
                <div style={_st5sub}>☕ Buy Me a Coffee</div>
            </div>
            <div style={_badge}>♥</div>
        </div>
    );
};

SupportButton.propTypes = {
    onClick: PropTypes.func,
};
export default React.memo(SupportButton);
