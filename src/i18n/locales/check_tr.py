import json

with open('tr.json', encoding='utf-8') as f:
    tr = json.load(f)

def get(d, path):
    parts = path.split('.')
    v = d
    for p in parts:
        if isinstance(v, dict):
            v = v.get(p)
        else:
            return None
    return v

keys = [
    'settings.tabLabels.account', 'settings.tabLabels.privacy', 'settings.tabLabels.connections',
    'settings.tabLabels.appearance', 'settings.tabLabels.voice', 'settings.tabLabels.notifications',
    'settings.tabLabels.keybinds', 'settings.tabLabels.language', 'settings.tabLabels.activity',
    'settings.tabLabels.sessions', 'settings.tabLabels.advanced',
    'settings.sections.user', 'settings.sections.app',
]

for k in keys:
    v = get(tr, k)
    status = repr(v) if v is not None else "MISSING"
    print(k + ": " + status)
