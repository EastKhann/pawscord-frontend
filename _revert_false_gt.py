import re, glob

fixed = 0
for f in glob.glob('src/**/*.js', recursive=True):
    with open(f, 'r', encoding='utf-8') as fh:
        lines = fh.readlines()
    
    changed = False
    for i in range(len(lines) - 1):
        line = lines[i]
        next_line = lines[i+1].strip()
        m = re.search(r'(style=\{(?:styles|S|_st\d+|_s\()[^}]*\}[)]*)(>)\s*$', line)
        if not m:
            continue
        if next_line.startswith(('autoFocus','maxLength','min=','max=','step=','readOnly','required','multiple','accept','pattern','autoComplete','spellCheck','rows','cols')):
            # Remove the wrongly added >
            lines[i] = line[:line.rstrip().rfind('>')] + '\n'
            changed = True
            fixed += 1
    
    if changed:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.writelines(lines)

print(f'Reverted {fixed} false positive > additions')
