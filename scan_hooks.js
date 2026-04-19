// Scan for React hook violations: hooks called outside component/custom-hook bodies
const fs = require('fs');
const path = require('path');

const HOOKS = ['useState', 'useEffect', 'useCallback', 'useMemo', 'useRef',
    'useTranslation', 'useSelector', 'useDispatch', 'useNavigate', 'useContext',
    'useReducer', 'useLayoutEffect', 'useImperativeHandle', 'useStore', 'useUIStore',
    'useModalStore', 'useChatStore'];

const srcDir = path.join(__dirname, 'src');
const violations = [];

function isReactComponent(name) {
    return name && /^[A-Z]/.test(name);
}
function isCustomHook(name) {
    return name && /^use[A-Z]/.test(name);
}

function scanFile(filePath) {
    const src = fs.readFileSync(filePath, 'utf8');
    const lines = src.split('\n');

    // Track: current "parent" function name at each depth
    const funcStack = []; // [{name, isAllowed}]
    let braceDepth = 0;
    let arrowFuncDepth = -1;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        if (trimmed.startsWith('//') || trimmed.startsWith('*')) continue;

        // Detect function declarations / arrow functions
        // Pattern: "const FooBar = (" or "function FooBar(" - component
        // Pattern: "const fooBar = (" or "function fooBar(" - helper
        const constArrow = line.match(/^\s*(?:export\s+(?:default\s+)?)?const\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*=\s*(?:React\.memo\()?(?:React\.forwardRef\()?[^=]*?(?:=>|\()/);
        const funcDecl = line.match(/^\s*(?:export\s+(?:default\s+)?)?(?:async\s+)?function\s+([A-Za-z_$][A-Za-z0-9_$]*)\s*\(/);

        let newFuncName = null;
        if (constArrow) newFuncName = constArrow[1];
        else if (funcDecl) newFuncName = funcDecl[1];

        if (newFuncName) {
            funcStack.push({
                name: newFuncName,
                allowed: isReactComponent(newFuncName) || isCustomHook(newFuncName),
                depth: braceDepth
            });
        }

        // Count braces to pop from stack
        const openBraces = (line.match(/\{/g) || []).length;
        const closeBraces = (line.match(/\}/g) || []).length;
        braceDepth += openBraces - closeBraces;

        // Pop functions that have ended
        while (funcStack.length > 0 && braceDepth <= funcStack[funcStack.length - 1].depth) {
            funcStack.pop();
        }

        // Check for hook calls
        for (const hook of HOOKS) {
            const hookPattern = new RegExp(`\\b${hook}\\s*\\(`);
            if (hookPattern.test(line) && !line.includes('import ') && !trimmed.startsWith('//')) {
                // Is the current context allowed?
                const currentFunc = funcStack[funcStack.length - 1];
                if (currentFunc && !currentFunc.allowed) {
                    violations.push({
                        file: filePath.replace(srcDir, '').replace(/\\/g, '/'),
                        line: i + 1,
                        func: currentFunc.name,
                        code: trimmed,
                        hook
                    });
                } else if (!currentFunc) {
                    // Module-level hook call
                    violations.push({
                        file: filePath.replace(srcDir, '').replace(/\\/g, '/'),
                        line: i + 1,
                        func: '(module level)',
                        code: trimmed,
                        hook
                    });
                }
            }
        }
    }
}

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
            walk(full);
        } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.jsx'))) {
            try { scanFile(full); } catch (e) { /* skip */ }
        }
    }
}

walk(srcDir);

if (violations.length === 0) {
    console.log('✅ No hook violations found!');
} else {
    console.log(`❌ Found ${violations.length} potential hook violations:\n`);
    violations.forEach(v => {
        console.log(`  ${v.file}:${v.line} [in "${v.func}"] → ${v.hook}()`);
        console.log(`    ${v.code}`);
    });
}
