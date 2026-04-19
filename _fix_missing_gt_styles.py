import re, os, glob

fixed = 0
files_fixed = []

# Patterns that indicate the line ends with a style attribute but no >
patterns = [
    r'style=\{(S|styles)\.\w+\}\s*$',
    r'style=\{_s\(\{[^}]*\}\)\}\s*$',
]

for f in glob.glob('src/**/*.js', recursive=True):
    with open(f, 'r', encoding='utf-8') as fh:
        lines = fh.readlines()
    
    changed = False
    for i in range(len(lines) - 1):
        line = lines[i]
        next_line = lines[i+1] if i+1 < len(lines) else ''
        
        matched = False
        for pat in patterns:
            if re.search(pat, line):
                matched = True
                break
        if not matched:
            continue
        
        next_stripped = next_line.strip()
        
        # If next line is /> that's a self-closing tag - valid
        if next_stripped.startswith('/>'):
            continue
        
        # If next line is another attribute - valid
        if re.match(r'^(on[A-Z]|className|aria-|id=|key=|ref=|title=|alt=|src=|href=|disabled|type=|name=|value=|checked|placeholder|tabIndex|role=|data-|loading)', next_stripped):
            continue
            
        # If next line starts with > - valid
        if next_stripped.startswith('>'):
            continue
        
        # Otherwise, this line is missing > before text content or closing tag
        lines[i] = line.rstrip() + '>\n'
        changed = True
        fixed += 1
        files_fixed.append(f'{f}:{i+1}')
    
    if changed:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.writelines(lines)

print(f'Fixed {fixed} instances')
for ff in files_fixed:
    print(f'  {ff}')
