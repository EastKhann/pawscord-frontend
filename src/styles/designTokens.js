// frontend/src/styles/designTokens.js
// =============================================
// PAWSCORD Design Token System
// Generated from codebase analysis (2026-03-01)
//
// This file provides a single source of truth for all
// visual design values used across the app. Replace
// magic numbers in components with these tokens.
// =============================================

export const tokens = {
    // ─── COLOR PALETTE ──────────────────────────────────
    // Extracted from 8,000+ color references across 138 CSS files
    colors: {
        // Brand / Primary
        primary: '#5865f2',  // 1020 refs — Pawscord brand blue
        primaryHover: '#4752c4',  //   59 refs
        primaryLight: '#5865f2',  //   61 refs — legacy blurple
        primarySoft: '#5e81f4',  //   19 refs

        // Accent / Purple variant (heavily used)
        accent: '#5865f2',  //  235 refs — blurple accent
        accentAlt: '#4752c4',  //   82 refs — blurple hover
        accentGradient: '#4752c4',  //   35 refs — gradient endpoint
        accentBlue: '#5865f2',  //   62 refs — blurple

        // Success / Green
        success: '#23a559',  //  317 refs — primary green
        successAlt: '#23a559',  //  194 refs — brighter green
        successBright: '#23a559',  //   27 refs — neon green
        successMuted: '#3ba55d',  //   28 refs
        successDark: '#2ecc71',  //   16 refs
        successModern: '#10b981',  //   75 refs — emerald
        spotify: '#1db954',  //   34 refs

        // Danger / Red
        danger: '#f23f42',  //  158 refs — danger red
        dangerAlt: '#f23f42',  //  185 refs — legacy red
        dangerBright: '#f23f42',  //   76 refs — tailwind red-500
        dangerDark: '#da373c',  //  112 refs
        dangerLegacy: '#e74c3c',  //   98 refs
        dangerMaterial: '#f44336',  //   33 refs
        dangerDeep: '#dc2626',  //   18 refs
        dangerIos: '#f23f42',  //   53 refs

        // Warning / Yellow-Orange
        warning: '#f0b232',  //  175 refs — warning yellow
        warningAlt: '#f0b232',  //   78 refs
        warningBright: '#fbbf24',  //   44 refs
        warningAmber: '#f59e0b',  //   66 refs
        warningGold: '#ffd700',  //   55 refs
        warningMaterial: '#ffc107',  //   26 refs

        // Info / Blue
        info: '#3b82f6',  //   44 refs — tailwind blue-500
        infoLight: '#00b0f4',  //   -- text link blue
        infoCyan: '#22d3ee',  //   21 refs
        infoTeal: '#00bcd4',  //   22 refs
        infoClassic: '#3498db',  //   23 refs
        infoMaterial: '#2196f3',  //   17 refs
        infoSky: '#00a8fc',  //   16 refs

        // Pink / Fuchsia
        pink: '#eb459e',  //   17 refs — accent pink
        pinkModern: '#ec4899',  //   20 refs
        pinkLegacy: '#5865f2',  //   52 refs — purple-pink

        // Special
        neonGreen: '#00ff88',  //   32 refs
        orange: '#e67e22',  //   18 refs

        // ─── BACKGROUND SHADES ─────────────────────────
        // Dark → Light ordering
        bgDeepest: '#111113',  //   17 refs — absolute deep
        bgDeep: '#111214',  //   19 refs
        bgDarkest: '#1a1a1e',  //   16 refs
        bgDarker: '#0d0e10',  //   95 refs — Discord tertiary
        bgTertiary: '#0d0e10',  //  169 refs — tertiary background
        bgPrimary: '#0d0e10',  //  292 refs — main app background
        bgPrimaryAlt: '#0d0e10',  //   16 refs
        bgSecondary: '#111214',  //  270 refs — sidebar/panels
        bgSecondaryAlt: '#111214',  //  230 refs — legacy secondary
        bgSecondaryDark: '#2a2a2e',  //   38 refs
        bgNavy: '#0d0e10',  //   68 refs — Discord tertiary
        bgModifier: '#111214',  //  214 refs — legacy modifier
        bgCard: '#17191c',  //   60 refs — card surfaces
        bgElevated: '#17191c',  //   81 refs — legacy chat bg
        bgInput: '#1e2024',  //  264 refs — input fields
        bgHover: '#1e2024',  //   46 refs
        bgInputAlt: '#1e2024',  //   17 refs
        bgDark: '#1f2023',  //   18 refs
        bgSlate: '#1f2937',  //   19 refs — tailwind slate

        // Transparent modifiers
        bgModifierHover: 'rgba(79, 84, 92, 0.16)',
        bgModifierActive: 'rgba(79, 84, 92, 0.24)',
        bgWhiteSubtle: 'rgba(255, 255, 255, 0.03)',  //  80 refs
        bgWhiteFaint: 'rgba(255, 255, 255, 0.05)',  // 224 refs
        bgWhiteThin: 'rgba(255, 255, 255, 0.08)',  //  68 refs
        bgWhiteLight: 'rgba(255, 255, 255, 0.1)',   // 362 refs — MOST used rgba
        bgWhiteMedium: 'rgba(255, 255, 255, 0.2)',   //  87 refs
        bgBlackLight: 'rgba(0, 0, 0, 0.2)',         //  91 refs
        bgBlackMedium: 'rgba(0, 0, 0, 0.3)',         // 143 refs
        bgBlackHeavy: 'rgba(0, 0, 0, 0.5)',         //  81 refs
        bgBlackOverlay: 'rgba(0, 0, 0, 0.85)',        // 125 refs

        // ─── TEXT SHADES ────────────────────────────────
        textWhite: '#ffffff',  //  473 refs
        textPrimary: '#dbdee1',  //  346 refs — default body text
        textSecondary: '#b5bac1',  //  587 refs — secondary text (2nd most used!)
        textNormal: '#b5bac1',  //   85 refs — modern normal
        textNormalAlt: '#dbdee1',  //   78 refs
        textInteractive: '#949ba4',  //  205 refs — interactive default
        textMuted: '#949ba4',  //  338 refs — muted text
        textMutedAlt: '#949ba4',  //  183 refs — modern muted
        textFaint: '#6b7280',  //  114 refs — tailwind gray-500
        textFaintAlt: '#949ba4',  //   53 refs
        textDisabled: '#4e5058',  //   65 refs — disabled state
        textSubtle: '#4e5058',  //   31 refs
        textGray: '#9ca3af',  //   26 refs — tailwind gray-400
        textLight: '#a0aec0',  //   26 refs
        textLightBg: '#f2f3f5',  //   33 refs — light theme text
        textLightAlt: '#dbdee1',  //  106 refs
        textLightNeutral: '#e5e7eb',  //   20 refs

        // Text link
        textLink: '#00b0f4',

        // ─── STATUS INDICATORS ──────────────────────────
        statusOnline: '#23a559',
        statusIdle: '#f0b232',
        statusDnd: '#f23f42',
        statusOffline: '#80848e',  //   17 refs
        statusStreaming: '#6441a5',

        // ─── BORDER COLORS ─────────────────────────────
        borderDefault: 'rgba(255, 255, 255, 0.06)',
        borderSubtle: 'rgba(255, 255, 255, 0.05)',
        borderLight: 'rgba(255, 255, 255, 0.1)',
        borderMedium: 'rgba(255, 255, 255, 0.15)',

        // Focus rings
        focusPrimary: 'rgba(88, 101, 242, 0.3)',    //  49 refs
        focusAccent: 'rgba(88, 101, 242, 0.3)',    // 110 refs
        focusAccentLight: 'rgba(88, 101, 242, 0.2)',    // 100 refs
        focusAccentFaint: 'rgba(88, 101, 242, 0.1)',    //  49 refs
        focusDanger: 'rgba(239, 68, 68, 0.2)',     //  44 refs
    },

    // ─── SPACING ──────────────────────────────────────
    spacing: {
        '0': '0px',
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
        '3xl': '32px',
        '4xl': '40px',
        '5xl': '48px',
        '6xl': '64px',
    },

    // ─── BORDER RADIUS ───────────────────────────────
    // Top values: 8px(455), 12px(276), 50%(274), 10px(180), 4px(178), 6px(151), 16px(97), 20px(82)
    borderRadius: {
        none: '0px',
        xs: '3px',
        sm: '4px',     // 178 refs
        md: '6px',     // 151 refs
        base: '8px',     // 455 refs — MOST common
        lg: '10px',    // 180 refs
        xl: '12px',    // 276 refs
        '2xl': '16px',    //  97 refs
        '3xl': '20px',    //  82 refs
        full: '50%',     // 274 refs — circles/avatars
        pill: '9999px',
    },

    // ─── FONT SIZE ────────────────────────────────────
    // Top values: 14px(469), 13px(237), 12px(191), 16px(167), 18px(135), 20px(124), 24px(103)
    fontSize: {
        '2xs': '10px',
        xs: '11px',   //  67 refs
        sm: '12px',   // 191 refs
        md: '13px',   // 237 refs
        base: '14px',   // 469 refs — MOST common
        lg: '15px',   //  82 refs
        xl: '16px',   // 167 refs
        '2xl': '18px',   // 135 refs
        '3xl': '20px',   // 124 refs
        '4xl': '24px',   // 103 refs
        '5xl': '28px',   //  39 refs
        '6xl': '32px',
        title: '36px',
        hero: '48px',
    },

    // ─── FONT WEIGHT ──────────────────────────────────
    fontWeight: {
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
    },

    // ─── FONT FAMILY ──────────────────────────────────
    fontFamily: {
        sans: "'gg sans', 'Inter', 'Noto Sans', -apple-system, BlinkMacSystemFont, sans-serif",
        mono: "'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace",
    },

    // ─── LINE HEIGHT ──────────────────────────────────
    lineHeight: {
        tight: 1.1,
        snug: 1.25,
        normal: 1.375,
        relaxed: 1.5,
        loose: 1.75,
    },

    // ─── BOX SHADOW ───────────────────────────────────
    // Extracted from actual usage patterns
    shadow: {
        none: 'none',
        xs: '0 1px 2px rgba(0, 0, 0, 0.1)',
        sm: '0 2px 8px rgba(0, 0, 0, 0.1)',                //  10 refs
        md: '0 4px 15px rgba(0, 0, 0, 0.3)',
        lg: '0 8px 32px rgba(0, 0, 0, 0.5)',               //   8 refs
        xl: '0 20px 60px rgba(0, 0, 0, 0.5)',              //  31 refs — MOST common
        glow: '0 0 20px rgba(88, 101, 242, 0.5)',            //  14 refs
        glowSm: '0 4px 15px rgba(88, 101, 242, 0.3)',      //   7 refs
        glowMd: '0 6px 20px rgba(88, 101, 242, 0.4)',      //   7 refs
        glowLg: '0 8px 24px rgba(88, 101, 242, 0.3)',      //   5 refs
        glowPrimary: '0 4px 12px rgba(88, 101, 242, 0.4)',  //   4 refs
        focus: '0 0 0 3px rgba(88, 101, 242, 0.2)',       //   6 refs
        focusThin: '0 0 0 3px rgba(88, 101, 242, 0.1)',      //   8 refs
        modal: '0 0 0 1px rgba(32, 34, 37, 0.6), 0 2px 10px 0 rgba(0, 0, 0, 0.2)',
        elevated: '0 8px 24px rgba(0, 0, 0, 0.4)',           //   4 refs
    },

    // ─── TRANSITIONS ──────────────────────────────────
    // Top: all 0.2s (262), all 0.3s ease (142), all 0.3s (127)
    transitions: {
        fast: 'all 0.15s ease',
        normal: 'all 0.2s ease',     // ~300 refs total
        slow: 'all 0.3s ease',     // ~270 refs total
        slower: 'all 0.5s ease',
        bgFast: 'background-color 0.2s ease',
    },

    // transition durations as raw numbers (ms) for JS animation libs
    duration: {
        fast: 150,
        normal: 200,
        slow: 300,
        slower: 500,
    },

    // ─── Z-INDEX ──────────────────────────────────────
    // Discovered z-index chaos: 1, 10, 100, 999, 1000, 9999, 10000, 999999
    // Normalized layering system:
    zIndex: {
        base: 1,
        above: 10,
        dropdown: 100,
        sticky: 500,
        overlay: 999,
        modal: 1000,
        modalOverlay: 999,
        popover: 1100,
        toast: 2000,
        tooltip: 9999,
        topmost: 10000,
        // Legacy compat (some components use 999999 🤦)
        legacy: 999999,
    },

    // ─── BREAKPOINTS ──────────────────────────────────
    breakpoints: {
        xs: '320px',
        sm: '480px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        xxl: '1440px',
    },

    // ─── LAYOUT ───────────────────────────────────────
    layout: {
        sidebarWidth: '312px',
        serverListWidth: '72px',
        memberListWidth: '240px',
        headerHeight: '48px',
        inputMinHeight: '44px',
        maxContentWidth: '1200px',
        avatarSm: '24px',
        avatarMd: '32px',
        avatarLg: '40px',
        avatarXl: '80px',
        avatarXxl: '128px',
    },

    // ─── EFFECTS ──────────────────────────────────────
    effects: {
        backdropBlur: 'blur(10px)',
        backdropBlurLg: 'blur(20px)',
        bgGradientSubtle: 'radial-gradient(circle at 50% 10%, rgba(88, 101, 242, 0.05) 0%, transparent 40%)',
    },
};

// ─── CONVENIENCE EXPORTS ────────────────────────────
export const {
    colors,
    spacing,
    borderRadius,
    fontSize,
    fontWeight,
    fontFamily,
    lineHeight,
    shadow,
    transitions,
    duration,
    zIndex,
    breakpoints,
    layout,
    effects,
} = tokens;

// ─── HELPER: media query builder ────────────────────
export const media = {
    xs: `@media (max-width: ${tokens.breakpoints.xs})`,
    sm: `@media (max-width: ${tokens.breakpoints.sm})`,
    md: `@media (max-width: ${tokens.breakpoints.md})`,
    lg: `@media (max-width: ${tokens.breakpoints.lg})`,
    xl: `@media (max-width: ${tokens.breakpoints.xl})`,
    xxl: `@media (max-width: ${tokens.breakpoints.xxl})`,
    // min-width variants
    minSm: `@media (min-width: ${tokens.breakpoints.sm})`,
    minMd: `@media (min-width: ${tokens.breakpoints.md})`,
    minLg: `@media (min-width: ${tokens.breakpoints.lg})`,
    minXl: `@media (min-width: ${tokens.breakpoints.xl})`,
};

// ─── HELPER: builds a CSS color with custom alpha ───
export const alpha = (hexColor, opacity) => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export default tokens;
