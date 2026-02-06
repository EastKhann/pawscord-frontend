# 🐾 Pawscord Frontend

**Version:** 1.1.205 | **Framework:** React 19 + Vite 7 | **Platforms:** Web, Windows, Android, iOS

## 🚀 Quick Start

```bash
npm install        # Bağımlılıkları kur
npm run dev        # Dev server (localhost:5173)
npm run build      # Production build
```

## 📦 Build Commands

| Komut | Açıklama |
|-------|----------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production build → `build/` |
| `npm run electron:dev` | Electron dev mode |
| `npm run electron:build` | Windows EXE → `dist/` |
| `npx cap sync android` | Capacitor Android sync |

## 🏗️ Mimari

```
src/
├── App.js              # Router (20+ route)
├── ChatRoom.js         # Ana chat component
├── components/         # 509 UI component
├── pages/              # 6 sayfa
├── contexts/           # React Context (Auth, WebRTC, WebSocket)
├── stores/             # Zustand (chat, ui, user, voice)
├── hooks/              # 27 custom hook
├── services/           # API, WebSocket, apiService
└── utils/              # 80+ utility modül
```

## 🔧 Environment

Backend API URL otomatik algılanır:
- Dev: `http://localhost:8888`
- Production: `https://pawscord.com`
