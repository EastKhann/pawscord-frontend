import pathlib, re, json

raw = pathlib.Path('eslint_errors_triage.json').read_bytes()
if raw[:2] in (b'\xff\xfe', b'\xfe\xff'): text = raw.decode('utf-16')
else: text = raw.decode('utf-8','replace')
results = json.loads(text[text.find('['):])

problem_files = []
for r in results:
    fp = r['filePath']
    rel = fp.replace('\\\\','/')
    if rel.endswith('.ts') or rel.endswith('.d.ts'): continue
    for m in r['messages']:
        if m['severity']==2 and m.get('ruleId') is None and 'Parsing error' in m.get('message',''):
            problem_files.append(fp)
            break

print('Files to scan:', len(problem_files))

fixed_count = 0
for fp in problem_files:
    p = pathlib.Path(fp)
    content = p.read_text(encoding='utf-8')
    lines = content.split('\n')
    changed = False
    new_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.rstrip()
        ends_attr = (stripped.endswith('"') or stripped.endswith("'") or
                     (stripped.endswith('}') and '=>' not in stripped[-5:]))
        if ends_attr:
            j = i + 1
            while j < len(lines) and not lines[j].strip():
                j += 1
            if j < len(lines) and lines[j].strip().startswith('</'):
                new_lines.append(stripped + '>')
                changed = True
                i += 1
                continue
        new_lines.append(line)
        i += 1
    
    if changed:
        p.write_text('\n'.join(new_lines), encoding='utf-8')
        print(f'  Fixed: {pathlib.Path(fp).name}')
        fixed_count += 1

print(f'Total files fixed: {fixed_count}')
