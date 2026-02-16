// Grammar Questions - Lazy Loading by Level
// Each level is loaded on demand to reduce initial bundle (240KB → ~40KB per level)

export { LEVELS } from './levels';

const levelLoaders = {
  A1: () => import('./a1Questions').then(m => m.a1Questions),
  A2: () => import('./a2Questions').then(m => m.a2Questions),
  B1: () => import('./b1Questions').then(m => m.b1Questions),
  B2: () => import('./b2Questions').then(m => m.b2Questions),
  C1: () => import('./c1Questions').then(m => m.c1Questions),
  C2: () => import('./c2Questions').then(m => m.c2Questions),
};

// Cache loaded questions
const cache = {};

/**
 * Load questions for a specific level on demand.
 * @param {string} level - Level ID (A1, A2, B1, B2, C1, C2)
 * @returns {Promise<Array>} Array of question objects
 */
export async function loadQuestionsByLevel(level) {
  if (cache[level]) return cache[level];
  const loader = levelLoaders[level];
  if (!loader) throw new Error(`Unknown level: ${level}`);
  const questions = await loader();
  cache[level] = questions;
  return questions;
}

/**
 * Load ALL questions (backwards compatible).
 * Prefer loadQuestionsByLevel() for better performance.
 * @returns {Promise<Array>} All questions across all levels
 */
export async function loadAllQuestions() {
  const levels = Object.keys(levelLoaders);
  const results = await Promise.all(levels.map(l => loadQuestionsByLevel(l)));
  return results.flat();
}

// QUESTIONS_DB removed — all consumers migrated to loadQuestionsByLevel() / loadAllQuestions()
// This eliminates ~240KB of eager imports from the initial bundle.
