// frontend/src/hooks/useThemeTokens.js
// React hook for accessing the design token system
// =============================================
import { useMemo } from 'react';
import { tokens } from '../styles/designTokens';

/**
 * useThemeTokens — Returns the full design token object.
 *
 * Can be extended later to support light/dark/custom themes
 * by reading a theme context and merging overrides.
 *
 * Usage:
 *   const { colors, spacing, fontSize } = useThemeTokens();
 *   <div style={{ color: colors.primary, padding: spacing.md }}>
 *
 * @returns {typeof tokens}
 */
export const useThemeTokens = () => {
    // Memoized so consumers don't re-render on every parent render.
    // When theme-switching is added, this will depend on a context value.
    return useMemo(() => tokens, []);
};

/**
 * useColor — Shortcut to grab just the color palette.
 *
 * Usage:
 *   const c = useColor();
 *   <span style={{ color: c.textMuted }}>muted</span>
 */
export const useColor = () => {
    return useMemo(() => tokens.colors, []);
};

/**
 * useSpacing — Shortcut to grab spacing scale.
 */
export const useSpacing = () => {
    return useMemo(() => tokens.spacing, []);
};

export default useThemeTokens;
