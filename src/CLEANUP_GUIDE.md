# 🧹 PAWSCORD `frontend/src/` Root Cleanup Guide

> Generated: 2026-03-01
> Total loose files at root: **57** (49 `.js` + 1 `.jsx` + 6 `.css` + 1 `index.css`)

---

## ✅ COMPLETED ACTIONS

| Action | File | Details |
|--------|------|---------|
| ✅ Renamed | `stores/useUIStore.js` → `useUIStore.js.bak` | `.ts` version (353 lines) is canonical; `.js` (365 lines) was a duplicate without types |

---

## 🔒 MUST STAY AT ROOT (Entry Points & Config)

These files are structural — bundlers/frameworks expect them here.

| File | Lines | Why |
|------|-------|-----|
| `main.jsx` | 384 | React entry point — `ReactDOM.createRoot()`, routing, lazy imports |
| `App.js` | 703 | Main app orchestrator — imported by `main.jsx` |
| `App.css` | — | Global app styles — imported by `App.js` |
| `index.css` | — | Global base styles — imported by `main.jsx` and `App.js` |
| `reportWebVitals.js` | 15 | CRA standard perf metrics — typically stays at root |
| `serviceWorker.js` | 111 | PWA service worker registration — entry-level concern |

> **Note:** `App/lazyImports.js` and `utils/lazyPanelLoader.js` are import aggregators
> already in proper folders — no action needed.

---

## 📦 COMPONENTS WITH EXISTING FOLDERS (Move INTO folder as `index.js`)

These files are orchestrators whose sub-modules already live in a matching folder.
The migration is: `src/Foo.js` → `src/Foo/index.js`, then update imports
from `'./Foo'` (no change needed — bundler resolves `Foo/index.js` automatically).

| Root File | Lines | Existing Folder | CSS at Root? | Action |
|-----------|-------|-----------------|-------------|--------|
| `AdvancedModerationPanel.js` | 176 | `AdvancedModerationPanel/` | `AdvancedModerationPanel.css` | Move `.js` + `.css` into folder |
| `ChatUserList.js` | 170 | `ChatUserList/` | — | Move into folder as `index.js` |
| `CryptoDashboard.js` | 345 | `CryptoDashboard/` | — | Move into folder as `index.js` |
| `CryptoSignals.js` | 279 | `CryptoSignals/` | — | Move into folder as `index.js` |
| `EnglishLearningPage.js` | 98 | `EnglishLearningPage/` | — | Move into folder as `index.js` |
| `FriendsTab.js` | 73 | `FriendsTab/` | — | Move into folder as `index.js` |
| `GrammarQuizPage.js` | 18 | `GrammarQuizPage/` | — | Move into folder as `index.js` |
| `Message.js` | 413 | `Message/` | — | Move into folder as `index.js` |
| `RoomList.js` | 380 | `RoomList/` | — | Move into folder as `index.js` |
| `UserProfileModal.js` | 411 | `UserProfileModal/` | — | Move into folder as `index.js` |
| `UserProfilePanel.js` | 136 | `UserProfilePanel/` | `UserProfilePanel.css` | Move `.js` + `.css` into folder |
| `VoiceChatPanel.js` | 377 | `VoiceChatPanel/` | — | Move into folder as `index.js` |
| `VoiceUserList.js` | 130 | `VoiceUserList/` | — | Move into folder as `index.js` |

**Why safe:** Imports like `import Foo from './Foo'` resolve to `./Foo/index.js` automatically.
No import rewrites needed for these 13 files.

---

## 🗂️ CONTEXTS (Move → `contexts/`)

| Root File | Lines | Type | Notes |
|-----------|-------|------|-------|
| `AuthContext.js` | 186 | Context + Provider | Auth state, token management, JWT decode |
| `GlobalWebSocketContext.js` | 46 | Context + Provider | Global WS data forwarding (no own socket) |
| `VoiceContext.js` | 560 | Context + Provider | Has `VoiceContext/` subfolder with 12+ hooks — move main file into that folder as `index.js` (listed above already) |

**Migration:** Move `AuthContext.js` → `contexts/AuthContext.js` and `GlobalWebSocketContext.js` → `contexts/GlobalWebSocketContext.js`.
Then update imports: `'./AuthContext'` → `'./contexts/AuthContext'` (project-wide).
`VoiceContext.js` should become `VoiceContext/index.js` (covered above).

---

## 📄 PAGES (Move → `pages/`)

These are full-page route targets lazy-loaded from `main.jsx`.

| Root File | Lines | Description | Notes |
|-----------|-------|-------------|-------|
| `LoginPage.js` | 433 | Login/Register form | Major page |
| `InvitePage.js` | 429 | Server invite accept page | Lazy-loaded in `main.jsx` |
| `VerifyEmailPage.js` | 179 | Email verification page | ⚠️ DUPLICATE: also exists at `pages/VerifyEmailPage.js` (180 lines) — reconcile! |
| `AuthCallback.js` | 204 | OAuth callback handler | + `AuthCallback.css` |
| `SpotifyCallback.js` | 107 | Spotify OAuth callback | |
| `EnglishHub.js` | 168 | English learning hub | Lazy-loaded in `main.jsx` |
| `EnglishVoicePractice.js` | 193 | Voice practice page | Lazy-loaded in `main.jsx` |
| `PronunciationPage.js` | 242 | Pronunciation practice | Lazy-loaded in `main.jsx` |
| `AnalyticsDashboard.js` | 392 | Server analytics page | Component-like but renders as full page |
| `WelcomeScreen.js` | 314 | Home/welcome screen | Shown when no server selected |
| `SplashScreen.js` | 89 | App loading splash | + `SplashScreen.css` |
| `EconomySystemPanel.js` | 503 | Economy system page | + `EconomySystemPanel.css` — panel but large enough to be a page |

**Migration:** Move each into `pages/`, update lazy imports in `main.jsx`:
```js
// Before:
const InvitePage = lazyWithRetry(() => import('./InvitePage'));
// After:
const InvitePage = lazyWithRetry(() => import('./pages/InvitePage'));
```

---

## 🧩 COMPONENTS (Move → `components/`)

Small-to-medium UI components that belong in the components directory.

### Modals

| Root File | Lines | Description |
|-----------|-------|-------------|
| `CinemaModal.js` | 224 | Watch-together / Cinema modal |
| `CryptoChartModal.js` | 87 | TradingView chart modal |
| `ForwardMessageModal.js` | 207 | Forward message to room/DM |
| `ImageModal.js` | 45 | Image lightbox via portal |
| `SummaryModal.js` | 145 | AI chat summary modal |

### Chat Components

| Root File | Lines | Description |
|-----------|-------|-------------|
| `MessageEditForm.js` | 151 | Inline message editor |
| `PinnedMessages.js` | 43 | Pinned messages overlay |
| `ReactionPicker.js` | 65 | Emoji reaction picker |
| `ReplyPreview.js` | 56 | Reply-to preview bar |
| `LinkPreview.js` | 255 | YouTube/Spotify/link embed preview |
| `GifPicker.js` | 217 | GIF search & picker |
| `StickerPicker.js` | 48 | Server sticker picker |

### Voice Components

| Root File | Lines | Description |
|-----------|-------|-------------|
| `FloatingVoiceIsland.js` | 404 | Draggable/resizable floating voice UI |
| `UserVideoContainer.js` | 398 | Video stream container + PiP |
| `VoiceAudioController.js` | 245 | Remote audio playback + volume control |

---

## 🔧 UTILITIES / SERVICES (Move → `services/` or `utils/`)

| Root File | Lines | Description | Target |
|-----------|-------|-------------|--------|
| `api.js` | 102 | Authenticated API wrapper (post/get) | `services/api.js` |
| `SpatialAudioEngine.js` | 328 | Web Audio API 3D spatial engine (class) | `services/SpatialAudioEngine.js` |
| `SidebarStyles.js` | 456 | JS style objects for sidebar | `styles/SidebarStyles.js` |

---

## 🎨 ORPHAN CSS FILES

These CSS files sit at root and should move with their parent component.

| CSS File | Belongs With | Target |
|----------|-------------|--------|
| `AdvancedModerationPanel.css` | `AdvancedModerationPanel.js` | `AdvancedModerationPanel/` |
| `AuthCallback.css` | `AuthCallback.js` | `pages/` |
| `EconomySystemPanel.css` | `EconomySystemPanel.js` | `pages/` or `components/` |
| `SplashScreen.css` | `SplashScreen.js` | `pages/` or `components/` |
| `UserProfilePanel.css` | `UserProfilePanel.js` | `UserProfilePanel/` |

---

## ⚠️ KNOWN ISSUES TO RESOLVE FIRST

### 1. Duplicate `VerifyEmailPage.js`
- `src/VerifyEmailPage.js` (179 lines) — imported by `main.jsx`
- `src/pages/VerifyEmailPage.js` (180 lines) — different version (uses `apiBaseUrl` prop)
- **Action:** Compare both, keep the one `main.jsx` uses, delete the other.

### 2. `stores/useUIStore.js` vs `.ts`
- **DONE** ✅ — Renamed `.js` → `.js.bak`. The `.ts` version with proper types is canonical.
- Tests import without extension, so they'll resolve to `.ts` automatically.
- If build breaks, restore `.js.bak` → `.js`.

---

## 📋 MIGRATION PLAN (Recommended Order)

### Phase 1: Zero-Risk Moves (no import changes needed)
Move 13 orchestrator files into their existing folders as `index.js`:
```
AdvancedModerationPanel.js → AdvancedModerationPanel/index.js
ChatUserList.js            → ChatUserList/index.js
CryptoDashboard.js         → CryptoDashboard/index.js
CryptoSignals.js           → CryptoSignals/index.js
EnglishLearningPage.js     → EnglishLearningPage/index.js
FriendsTab.js              → FriendsTab/index.js
GrammarQuizPage.js         → GrammarQuizPage/index.js
Message.js                 → Message/index.js
RoomList.js                → RoomList/index.js
UserProfileModal.js        → UserProfileModal/index.js
UserProfilePanel.js        → UserProfilePanel/index.js
VoiceChatPanel.js          → VoiceChatPanel/index.js
VoiceUserList.js           → VoiceUserList/index.js
```
Also move associated CSS files into the same folders.
**No import rewrites needed** — `import X from './X'` resolves `X/index.js`.

### Phase 2: Context Moves (few import rewrites)
```
AuthContext.js           → contexts/AuthContext.js
GlobalWebSocketContext.js → contexts/GlobalWebSocketContext.js
VoiceContext.js          → VoiceContext/index.js  (Phase 1)
```
Run: `grep -r "from.*'./AuthContext'" src/` to find all imports to update.

### Phase 3: Page Moves (update lazy imports in main.jsx + App.js)
```
LoginPage.js           → pages/LoginPage.js
InvitePage.js          → pages/InvitePage.js
AuthCallback.js        → pages/AuthCallback.js
SpotifyCallback.js     → pages/SpotifyCallback.js
EnglishHub.js          → pages/EnglishHub.js
EnglishVoicePractice.js → pages/EnglishVoicePractice.js
PronunciationPage.js   → pages/PronunciationPage.js
AnalyticsDashboard.js  → pages/AnalyticsDashboard.js
WelcomeScreen.js       → pages/WelcomeScreen.js
SplashScreen.js        → pages/SplashScreen.js
EconomySystemPanel.js  → pages/EconomySystemPanel.js
VerifyEmailPage.js     → DELETE (duplicate of pages/VerifyEmailPage.js — verify first)
```
Most are lazy-loaded, so update the `import()` paths in `main.jsx`.

### Phase 4: Component Moves (update imports across codebase)
```
CinemaModal.js         → components/CinemaModal.js
CryptoChartModal.js    → components/CryptoChartModal.js
ForwardMessageModal.js → components/ForwardMessageModal.js
ImageModal.js          → components/ImageModal.js
SummaryModal.js        → components/SummaryModal.js
MessageEditForm.js     → components/MessageEditForm.js (or Message/)
PinnedMessages.js      → components/PinnedMessages.js
ReactionPicker.js      → components/ReactionPicker.js
ReplyPreview.js        → components/ReplyPreview.js
LinkPreview.js         → components/LinkPreview.js
GifPicker.js           → components/GifPicker.js
StickerPicker.js       → components/StickerPicker.js
FloatingVoiceIsland.js → components/FloatingVoiceIsland.js
UserVideoContainer.js  → components/UserVideoContainer.js
VoiceAudioController.js → components/VoiceAudioController.js
```

### Phase 5: Utilities & Styles
```
api.js                 → services/api.js
SpatialAudioEngine.js  → services/SpatialAudioEngine.js
SidebarStyles.js       → styles/SidebarStyles.js
```

---

## 🔍 IMPORT UPDATE CHEAT SHEET

After each move, find and update imports:
```powershell
# Example: find all imports of AuthContext
grep -rn "from.*['\"]\.\/AuthContext['\"]" frontend/src/ --include="*.js" --include="*.jsx" --include="*.ts" --include="*.tsx"
```

For Vite/bundler, after Phase 1 moves (into existing folders), **zero** import changes are needed.
For Phases 2-5, each file typically has 2-10 importers to update.

---

## 📊 SUMMARY

| Category | Count | Risk |
|----------|-------|------|
| Must stay at root | 6 | — |
| Move into existing folder (Phase 1) | 13 + 2 CSS | ✅ Zero risk |
| Move to `contexts/` (Phase 2) | 2 | 🟡 Low (few importers) |
| Move to `pages/` (Phase 3) | 12 + 3 CSS | 🟡 Low (mostly lazy-loaded) |
| Move to `components/` (Phase 4) | 15 | 🟠 Medium (many importers) |
| Move to `services/`/`styles/` (Phase 5) | 3 | 🟡 Low |
| **Total files to relocate** | **51** | |
| Already resolved (useUIStore.js.bak) | 1 | ✅ Done |
