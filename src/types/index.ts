// frontend/src/types/index.ts
// Barrel export for all type definitions

export type * from './api';
export type * from './websocket';
export type * from './store';

// Disambiguate VoiceState (defined in both ./api and ./store): expose the
// store version as the canonical one for state-management consumers; the API
// shape is available via direct import from './api'.
export type { VoiceState } from './store';
