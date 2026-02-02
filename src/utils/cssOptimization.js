// ⚡ CSS OPTIMIZATION UTILITIES
// PurgeCSS configuration and utilities

/**
 * PurgeCSS configuration for production
 */
export const purgeCSSConfig = {
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        './public/index.html',
    ],

    // CSS files to process
    css: ['./src/**/*.css'],

    // Safelist - classes that should never be removed
    safelist: {
        standard: [
            // Animation classes
            /^animate-/,
            /^transition-/,
            /^duration-/,
            /^ease-/,

            // Dark mode
            /^dark:/,

            // Hover states
            /^hover:/,
            /^focus:/,
            /^active:/,

            // Responsive
            /^sm:/,
            /^md:/,
            /^lg:/,
            /^xl:/,
            /^2xl:/,

            // Dynamic classes
            'online',
            'offline',
            'typing',
            'recording',
            'muted',
            'deafened',
            'streaming',
            'camera-on',
            'camera-off',

            // Toast notifications
            /^Toastify/,

            // React specific
            'ReactModal',
            /^Modal/,
        ],

        // Deep selectors (for third-party libraries)
        deep: [
            /^react-/,
            /^Toastify/,
            /^tippy/,
            /^emoji/,
        ],

        // Greedy (aggressive matching)
        greedy: [
            /^btn-/,
            /^modal-/,
            /^dropdown-/,
            /^tooltip-/,
        ],
    },

    // Default extractor
    defaultExtractor: (content) => {
        // Extract classes from content
        const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
        const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
        return broadMatches.concat(innerMatches);
    },

    // Custom extractors for JSX
    extractors: [
        {
            extractor: (content) => {
                // Extract className props
                const classNameMatches = content.match(/className="([^"]*)"/g) || [];
                const classes = classNameMatches.map(m =>
                    m.replace(/className="|"/g, '').split(' ')
                ).flat();

                // Extract template literals
                const templateMatches = content.match(/className={`([^`]*)`}/g) || [];
                const templateClasses = templateMatches.map(m =>
                    m.replace(/className={`|`}/g, '').split(' ')
                ).flat();

                return [...classes, ...templateClasses];
            },
            extensions: ['js', 'jsx'],
        },
    ],

    // Options
    rejected: false, // Don't output rejected selectors
    rejectedCss: false, // Don't output removed CSS
};

/**
 * Critical CSS extraction patterns
 */
export const criticalCSSPatterns = [
    // Layout
    'html',
    'body',
    '#root',
    '.app',
    '.container',
    '.wrapper',

    // Navigation
    '.header',
    '.sidebar',
    '.main',
    '.footer',

    // Above the fold
    '.hero',
    '.banner',
    '.nav',

    // Loading states
    '.loading',
    '.spinner',
    '.skeleton',

    // Typography
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'p', 'a', 'span',

    // Forms
    'button',
    'input',
    'textarea',
    'select',

    // Theme
    '.bg-dark',
    '.bg-darker',
    '.bg-darkest',
    '.text-primary',
    '.text-secondary',
];

/**
 * Remove unused CSS classes
 * @param {string} css - CSS content
 * @param {Array} usedClasses - Array of used class names
 * @returns {string} - Purged CSS
 */
export function purgeUnusedCSS(css, usedClasses) {
    const rules = css.split('}');
    const purgedRules = [];

    for (const rule of rules) {
        if (!rule.trim()) continue;

        // Check if any used class is in this rule
        const hasUsedClass = usedClasses.some(className =>
            rule.includes('.' + className)
        );

        if (hasUsedClass) {
            purgedRules.push(rule + '}');
        }
    }

    return purgedRules.join('\n');
}

/**
 * Minify CSS
 * @param {string} css - CSS content
 * @returns {string} - Minified CSS
 */
export function minifyCSS(css) {
    return css
        // Remove comments
        .replace(/\/\*[\s\S]*?\*\//g, '')
        // Remove whitespace
        .replace(/\s+/g, ' ')
        // Remove space around { } : ;
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*:\s*/g, ':')
        .replace(/\s*;\s*/g, ';')
        // Remove last semicolon in block
        .replace(/;}/g, '}')
        // Trim
        .trim();
}

/**
 * Extract critical CSS for inline
 * @param {string} css - Full CSS content
 * @returns {string} - Critical CSS only
 */
export function extractCriticalCSS(css) {
    const criticalRules = [];
    const rules = css.split('}');

    for (const rule of rules) {
        if (!rule.trim()) continue;

        // Check if rule contains critical pattern
        const isCritical = criticalCSSPatterns.some(pattern =>
            rule.includes(pattern)
        );

        if (isCritical) {
            criticalRules.push(rule + '}');
        }
    }

    return minifyCSS(criticalRules.join('\n'));
}

/**
 * Generate CSS variables for theme
 */
export function generateCSSVariables(theme) {
    const vars = Object.entries(theme)
        .map(([key, value]) => `  --${key}: ${value};`)
        .join('\n');

    return `:root {\n${vars}\n}`;
}

/**
 * Optimize CSS custom properties
 * @param {string} css - CSS content
 * @returns {string} - Optimized CSS
 */
export function optimizeCSSCustomProperties(css) {
    // Extract all custom properties
    const customProps = new Map();
    const propRegex = /--([\w-]+):\s*([^;]+);/g;
    let match;

    while ((match = propRegex.exec(css)) !== null) {
        const [, name, value] = match;
        if (!customProps.has(name)) {
            customProps.set(name, value);
        }
    }

    // Generate optimized :root block
    const rootBlock = `:root{${Array.from(customProps.entries())
        .map(([name, value]) => `--${name}:${value}`)
        .join(';')}}`;

    return rootBlock;
}

export default {
    purgeCSSConfig,
    criticalCSSPatterns,
    purgeUnusedCSS,
    minifyCSS,
    extractCriticalCSS,
    generateCSSVariables,
    optimizeCSSCustomProperties,
};
