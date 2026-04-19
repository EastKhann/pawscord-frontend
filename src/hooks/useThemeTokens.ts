// frontend/src/hooks/useThemeTokens.ts
// React hook for accessing the design token system

import { useMemo } from 'react';
import { tokens } from '../styles/designTokens';

type Tokens = typeof tokens;

/**
 * useThemeTokens — Returns the full design token object.
 *
 * Can be extended later to support light/dark/custom themes
 * by reading a theme context and merging overrides.
 *
 * Usage:
 *   const { colors, spacing, fontSize } = useThemeTokens();
 */
export const useThemeTokens = (): Tokens => {
    return useMemo(() => tokens, []);
};

/** Shortcut to grab just the color palette. */
export const useColor = () => {
    return useMemo(() => tokens.colors, []);
};

/** Shortcut to grab spacing scale. */
export const useSpacing = () => {
    return useMemo(() => tokens.spacing, []);
};

export default useThemeTokens;
