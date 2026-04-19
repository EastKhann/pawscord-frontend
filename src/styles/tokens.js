const _s = (o) => o;
/**
 * JS-accessible design tokens — mirrors CSS custom properties in designTokens.css
 * Use these in inline styles instead of hardcoded hex values.
 *
 * Usage:
 *   import { colors, bg, text, spacing } from '../styles/tokens';
 *   style={_s({ color: colors.primary, background: bg.primary })}>
 */

export const colors = {
    // Brand
    primary: 'var(--color-primary, #5865f2)',
    primaryHover: 'var(--color-primary-hover, #4752c4)',

    // Success / Green
    success: 'var(--color-success, #23a559)',
    successMuted: 'var(--color-success-muted, #3ba55d)',
    spotify: 'var(--color-spotify, #1db954)',

    // Danger / Red
    danger: 'var(--color-danger, #f23f42)',
    dangerDark: 'var(--color-danger-dark, #da373c)',

    // Warning / Yellow
    warning: 'var(--color-warning, #f0b232)',
    warningBright: 'var(--color-warning-bright, #fbbf24)',
    gold: 'var(--color-warning-gold, #ffd700)',

    // Info / Blue
    info: 'var(--color-info, #3b82f6)',
    infoLight: 'var(--color-info-light, #00b0f4)',
    steam: 'var(--color-info-light, #66c0f4)',

    // Pink
    pink: 'var(--color-pink, #eb459e)',

    // Special
    neonGreen: 'var(--color-neon-green, #00ff88)',
    orange: 'var(--color-orange, #e67e22)',
    white: '#ffffff',
};

export const bg = {
    deepest: 'var(--bg-deepest, #090c1a)',
    deep: 'var(--bg-deep, #0b0e1b)',
    primary: 'var(--bg-primary, #0b0e1b)',
    secondary: 'var(--bg-secondary, #0e1222)',
    card: 'var(--bg-card, #121928)',
    elevated: 'var(--bg-elevated, #121928)',
    input: 'var(--bg-input, #182135)',
    hover: 'var(--bg-hover, #182135)',
    dark: 'var(--bg-dark, #16203a)',
    slate: 'var(--bg-slate, #162240)',
    navy: 'var(--bg-navy, #060919)',
    modifier: 'var(--bg-modifier, #0e1222)',
    modifierHover: 'var(--bg-modifier-hover, rgba(79, 84, 92, 0.16))',
    modifierActive: 'var(--bg-modifier-active, rgba(79, 84, 92, 0.24))',
    whiteSubtle: 'var(--bg-white-subtle, rgba(255, 255, 255, 0.03))',
    whiteFaint: 'var(--bg-white-faint, rgba(255, 255, 255, 0.05))',
    whiteThin: 'var(--bg-white-thin, rgba(255, 255, 255, 0.08))',
    whiteLight: 'var(--bg-white-light, rgba(255, 255, 255, 0.1))',
    blackOverlay: 'var(--bg-black-overlay, rgba(0, 0, 0, 0.85))',
    blackHeavy: 'var(--bg-black-heavy, rgba(0, 0, 0, 0.5))',
};

export const text = {
    white: 'var(--text-white, #ffffff)',
    primary: 'var(--text-primary, #dbdee1)',
    secondary: 'var(--text-secondary, #b5bac1)',
    normal: 'var(--text-normal, #b5bac1)',
    muted: 'var(--text-muted, #949ba4)',
    faint: 'var(--text-faint, #6b7280)',
    disabled: 'var(--text-disabled, #4e5058)',
    link: 'var(--text-link, #00b0f4)',
};

export const status = {
    online: 'var(--status-online, #23a559)',
    idle: 'var(--status-idle, #f0b232)',
    dnd: 'var(--status-dnd, #f23f42)',
    offline: 'var(--status-offline, #80848e)',
    streaming: 'var(--status-streaming, #6441a5)',
};

export const border = {
    default: 'var(--border-default, rgba(255, 255, 255, 0.06))',
    subtle: 'var(--border-subtle, rgba(255, 255, 255, 0.05))',
    light: 'var(--border-light, rgba(255, 255, 255, 0.1))',
};

export const spacing = {
    xs: 'var(--space-xs, 4px)',
    sm: 'var(--space-sm, 8px)',
    md: 'var(--space-md, 12px)',
    lg: 'var(--space-lg, 16px)',
    xl: 'var(--space-xl, 20px)',
    xxl: 'var(--space-2xl, 24px)',
};

export const radius = {
    sm: 'var(--radius-sm, 4px)',
    md: 'var(--radius-md, 6px)',
    base: 'var(--radius-base, 8px)',
    lg: 'var(--radius-lg, 10px)',
    xl: 'var(--radius-xl, 12px)',
    full: 'var(--radius-full, 50%)',
    pill: 'var(--radius-pill, 9999px)',
};

export const shadow = {
    sm: 'var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.1))',
    md: 'var(--shadow-md, 0 4px 15px rgba(0, 0, 0, 0.3))',
    lg: 'var(--shadow-lg, 0 8px 32px rgba(0, 0, 0, 0.5))',
    glow: 'var(--shadow-glow, 0 0 20px rgba(88, 101, 242, 0.5))',
    modal: 'var(--shadow-modal)',
    elevated: 'var(--shadow-elevated, 0 8px 24px rgba(0, 0, 0, 0.4))',
};

export const transition = {
    fast: 'var(--transition-fast, all 0.15s ease)',
    normal: 'var(--transition-normal, all 0.2s ease)',
    slow: 'var(--transition-slow, all 0.3s ease)',
};
