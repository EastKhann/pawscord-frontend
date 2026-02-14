const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["static/js/GifPicker-DRHla4ZE.js","static/js/react-core-BiY6fgAJ.js"])))=>i.map(i=>d[i]);
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { _ as __vitePreload } from "./media-vendor-BRMiuG2Y.js";
import { a as React, r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast, k as useMeasurePerformance, f as useChatStore, l as useDebounce } from "./index-DGqPEDt8.js";
import { $ as FaEyeSlash, a0 as FaEye, b3 as FaAt, aF as FaHashtag, n as FaSmile, ax as FaGlobe, C as FaUser, G as FaVolumeUp, b4 as FaBullhorn, av as FaFileAlt, a as FaTimes, an as FaPlus, b5 as FaPaperclip, aw as FaImage, q as FaCode, z as FaClock, E as FaMicrophone, aZ as FaPaperPlane } from "./icons-vendor-2VDeY8fW.js";
import MessageTemplateModal from "./MessageTemplateModal-CnWeDgQg.js";
import { S as ScheduledMessageModal } from "./ScheduledMessageModal-DTCh0hbW.js";
import { p as purify } from "./purify.es-BRhsgAzF.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const styles$1 = {
  container: {
    width: "350px",
    height: "400px",
    backgroundColor: "#2f3136",
    borderRadius: "8px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  searchBar: {
    padding: "12px",
    borderBottom: "1px solid #202225"
  },
  searchInput: {
    width: "100%",
    padding: "8px 12px",
    backgroundColor: "#202225",
    border: "none",
    borderRadius: "4px",
    color: "#dcddde",
    fontSize: "14px",
    outline: "none"
  },
  categories: {
    display: "flex",
    gap: "4px",
    padding: "8px",
    borderBottom: "1px solid #202225",
    overflowX: "auto",
    scrollbarWidth: "thin"
  },
  categoryButton: {
    padding: "6px 12px",
    background: "none",
    border: "none",
    color: "#b9bbbe",
    fontSize: "13px",
    cursor: "pointer",
    borderRadius: "4px",
    whiteSpace: "nowrap",
    transition: "background 0.2s"
  },
  activeCategoryButton: {
    backgroundColor: "#404249",
    color: "#fff"
  },
  emojiGrid: {
    flex: 1,
    display: "grid",
    gridTemplateColumns: "repeat(8, 1fr)",
    gap: "4px",
    padding: "12px",
    overflowY: "auto",
    alignContent: "start"
  },
  emojiButton: {
    background: "none",
    border: "none",
    fontSize: "28px",
    cursor: "pointer",
    padding: "8px",
    borderRadius: "4px",
    transition: "background 0.2s, transform 0.1s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    aspectRatio: "1"
  },
  favHighlight: {
    background: "rgba(250, 176, 5, 0.08)",
    boxShadow: "inset 0 0 0 1px rgba(250, 176, 5, 0.25)"
  },
  emptyState: {
    gridColumn: "1 / -1",
    textAlign: "center",
    color: "#72767d",
    fontSize: "14px",
    padding: "24px 0"
  },
  contextMenu: {
    position: "fixed",
    zIndex: 9999,
    backgroundColor: "#18191c",
    border: "1px solid #2f3136",
    borderRadius: "6px",
    padding: "4px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.4)"
  },
  contextMenuItem: {
    display: "block",
    width: "100%",
    padding: "8px 16px",
    background: "none",
    border: "none",
    color: "#dcddde",
    fontSize: "13px",
    cursor: "pointer",
    borderRadius: "4px",
    whiteSpace: "nowrap",
    textAlign: "left"
  }
};
const RECENTS_KEY = "pawscord_recent_emojis";
const FAVS_KEY = "pawscord_favorite_emojis";
const MAX_RECENTS = 24;
const getRecents = /* @__PURE__ */ __name(() => {
  try {
    return JSON.parse(localStorage.getItem(RECENTS_KEY)) || [];
  } catch {
    return [];
  }
}, "getRecents");
const addRecent = /* @__PURE__ */ __name((emoji) => {
  const arr = getRecents().filter((e) => e !== emoji);
  arr.unshift(emoji);
  localStorage.setItem(RECENTS_KEY, JSON.stringify(arr.slice(0, MAX_RECENTS)));
}, "addRecent");
const getFavorites = /* @__PURE__ */ __name(() => {
  try {
    return JSON.parse(localStorage.getItem(FAVS_KEY)) || [];
  } catch {
    return [];
  }
}, "getFavorites");
const toggleFavorite = /* @__PURE__ */ __name((emoji) => {
  const arr = getFavorites();
  const idx = arr.indexOf(emoji);
  if (idx >= 0) arr.splice(idx, 1);
  else arr.push(emoji);
  localStorage.setItem(FAVS_KEY, JSON.stringify(arr));
  return [...arr];
}, "toggleFavorite");
const EMOJI_CATEGORIES = {
  "Trending 🔥": [],
  // 🆕 Will be populated from API
  "Yüzler": ["😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂", "🙂", "🙃", "😉", "😊", "😇", "🥰", "😍", "🤩", "😘", "😗", "😚", "😙", "🥲", "😋", "😛", "😜", "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐", "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬", "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒", "🤕", "🤢", "🤮", "🤧", "🥵", "🥶", "😶‍🌫️", "🥴", "😵", "🤯", "🤠", "🥳", "🥸", "😎", "🤓", "🧐"],
  "Kalpler": ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟"],
  "El İşaretleri": ["👋", "🤚", "🖐️", "✋", "🖖", "👌", "🤌", "🤏", "✌️", "🤞", "🤟", "🤘", "🤙", "👈", "👉", "👆", "🖕", "👇", "☝️", "👍", "👎", "✊", "👊", "🤛", "🤜", "👏", "🙌", "👐", "🤲", "🤝", "🙏"],
  "Hayvanlar": ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗", "🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞", "🐜", "🦟", "🦗", "🕷️", "🦂", "🐢", "🐍", "🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋", "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🦧", "🐘", "🦛", "🦏", "🐪", "🐫", "🦒", "🦘", "🐃", "🐂", "🐄", "🐎", "🐖", "🐏", "🐑", "🦙", "🐐", "🦌", "🐕", "🐩", "🦮", "🐕‍🦺", "🐈", "🐈‍⬛", "🐓", "🦃", "🦚", "🦜", "🦢", "🦩", "🕊️", "🐇", "🦝", "🦨", "🦡", "🦦", "🦥", "🐁", "🐀", "🐿️", "🦔"],
  "Yiyecek": ["🍏", "🍎", "🍐", "🍊", "🍋", "🍌", "🍉", "🍇", "🍓", "🫐", "🍈", "🍒", "🍑", "🥭", "🍍", "🥥", "🥝", "🍅", "🍆", "🥑", "🥦", "🥬", "🥒", "🌶️", "🫑", "🌽", "🥕", "🫒", "🧄", "🧅", "🥔", "🍠", "🥐", "🥯", "🍞", "🥖", "🥨", "🧀", "🥚", "🍳", "🧈", "🥞", "🧇", "🥓", "🥩", "🍗", "🍖", "🌭", "🍔", "🍟", "🍕", "🫓", "🥪", "🥙", "🧆", "🌮", "🌯", "🫔", "🥗", "🥘", "🫕", "🥫", "🍝", "🍜", "🍲", "🍛", "🍣", "🍱", "🥟", "🦪", "🍤", "🍙", "🍚", "🍘", "🍥", "🥠", "🥮", "🍢", "🍡", "🍧", "🍨", "🍦", "🥧", "🧁", "🍰", "🎂", "🍮", "🍭", "🍬", "🍫", "🍿", "🍩", "🍪", "🌰", "🥜", "🍯", "🥛", "🍼", "🫖", "☕", "🍵", "🧃", "🥤", "🧋", "🍶", "🍺", "🍻", "🥂", "🍷", "🥃", "🍸", "🍹", "🧉", "🍾", "🧊", "🥄", "🍴", "🍽️", "🥣", "🥡", "🥢", "🧂"],
  "Aktiviteler": ["⚽", "🏀", "🏈", "⚾", "🥎", "🎾", "🏐", "🏉", "🥏", "🎱", "🪀", "🏓", "🏸", "🏒", "🏑", "🥍", "🏏", "🪃", "🥅", "⛳", "🪁", "🏹", "🎣", "🤿", "🥊", "🥋", "🎽", "🛹", "🛼", "🛷", "⛸️", "🥌", "🎿", "⛷️", "🏂", "🪂", "🏋️", "🤼", "🤸", "🤺", "⛹️", "🤾", "🏌️", "🏇", "🧘", "🏊", "🏄", "🚣", "🧗", "🚵", "🚴", "🏆", "🥇", "🥈", "🥉", "🏅", "🎖️", "🏵️", "🎗️", "🎫", "🎟️", "🎪", "🤹", "🎭", "🩰", "🎨", "🎬", "🎤", "🎧", "🎼", "🎹", "🥁", "🪘", "🎷", "🎺", "🪗", "🎸", "🪕", "🎻", "🎲", "♟️", "🎯", "🎳", "🎮", "🎰", "🧩"],
  "Seyahat": ["🚗", "🚕", "🚙", "🚌", "🚎", "🏎️", "🚓", "🚑", "🚒", "🚐", "🛻", "🚚", "🚛", "🚜", "🦯", "🦽", "🦼", "🛴", "🚲", "🛵", "🏍️", "🛺", "🚨", "🚔", "🚍", "🚘", "🚖", "🚡", "🚠", "🚟", "🚃", "🚋", "🚞", "🚝", "🚄", "🚅", "🚈", "🚂", "🚆", "🚇", "🚊", "🚉", "✈️", "🛫", "🛬", "🛩️", "💺", "🛰️", "🚀", "🛸", "🚁", "🛶", "⛵", "🚤", "🛥️", "🛳️", "⛴️", "🚢", "⚓", "⛽", "🚧", "🚦", "🚥", "🚏", "🗺️", "🗿", "🗽", "🗼", "🏰", "🏯", "🏟️", "🎡", "🎢", "🎠", "⛲", "⛱️", "🏖️", "🏝️", "🏜️", "🌋", "⛰️", "🏔️", "🗻", "🏕️", "⛺", "🛖", "🏠", "🏡", "🏘️", "🏚️", "🏗️", "🏭", "🏢", "🏬", "🏣", "🏤", "🏥", "🏦", "🏨", "🏪", "🏫", "🏩", "💒", "🏛️", "⛪", "🕌", "🕍", "🛕", "🕋"],
  "Objeler": ["⌚", "📱", "📲", "💻", "⌨️", "🖥️", "🖨️", "🖱️", "🖲️", "🕹️", "🗜️", "💾", "💿", "📀", "📼", "📷", "📸", "📹", "🎥", "📽️", "🎞️", "📞", "☎️", "📟", "📠", "📺", "📻", "🎙️", "🎚️", "🎛️", "🧭", "⏱️", "⏲️", "⏰", "🕰️", "⌛", "⏳", "📡", "🔋", "🔌", "💡", "🔦", "🕯️", "🪔", "🧯", "🛢️", "💸", "💵", "💴", "💶", "💷", "🪙", "💰", "💳", "💎", "⚖️", "🪜", "🧰", "🪛", "🔧", "🔨", "⚒️", "🛠️", "⛏️", "🪚", "🔩", "⚙️", "🪤", "🧱", "⛓️", "🧲", "🔫", "💣", "🧨", "🪓", "🔪", "🗡️", "⚔️", "🛡️", "🚬", "⚰️", "🪦", "⚱️", "🏺", "🔮", "📿", "🧿", "💈", "⚗️", "🔭", "🔬", "🕳️", "🩹", "🩺", "💊", "💉", "🩸", "🧬", "🦠", "🧫", "🧪", "🌡️", "🧹", "🪠", "🧺", "🧻", "🚽", "🚰", "🚿", "🛁", "🛀", "🧼", "🪒", "🧽", "🪣", "🧴", "🛎️", "🔑", "🗝️", "🚪", "🪑", "🛋️", "🛏️", "🛌", "🧸", "🪆", "🖼️", "🪞", "🪟", "🛍️", "🛒", "🎁", "🎈", "🎏", "🎀", "🪄", "🪅", "🎊", "🎉", "🎎", "🏮", "🎐", "🧧", "✉️", "📩", "📨", "📧", "💌", "📥", "📤", "📦", "🏷️", "🪧", "📪", "📫", "📬", "📭", "📮", "📯", "📜", "📃", "📄", "📑", "🧾", "📊", "📈", "📉", "🗒️", "🗓️", "📆", "📅", "🗑️", "📇", "🗃️", "🗳️", "🗄️", "📋", "📁", "📂", "🗂️", "🗞️", "📰", "📓", "📔", "📒", "📕", "📗", "📘", "📙", "📚", "📖", "🔖", "🧷", "🔗", "📎", "🖇️", "📐", "📏", "🧮", "📌", "📍", "✂️", "🖊️", "🖋️", "✒️", "🖌️", "🖍️", "📝", "✏️", "🔍", "🔎", "🔏", "🔐", "🔒", "🔓"],
  "Semboller": ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "☮️", "✝️", "☪️", "🕉️", "☸️", "✡️", "🔯", "🕎", "☯️", "☦️", "🛐", "⛎", "♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓", "🆔", "⚛️", "🉑", "☢️", "☣️", "📴", "📳", "🈶", "🈚", "🈸", "🈺", "🈷️", "✴️", "🆚", "💮", "🉐", "㊙️", "㊗️", "🈴", "🈵", "🈹", "🈲", "🅰️", "🅱️", "🆎", "🆑", "🅾️", "🆘", "❌", "⭕", "🛑", "⛔", "📛", "🚫", "💯", "💢", "♨️", "🚷", "🚯", "🚳", "🚱", "🔞", "📵", "🚭", "❗", "❕", "❓", "❔", "‼️", "⁉️", "🔅", "🔆", "〽️", "⚠️", "🚸", "🔱", "⚜️", "🔰", "♻️", "✅", "🈯", "💹", "❇️", "✳️", "❎", "🌐", "💠", "Ⓜ️", "🌀", "💤", "🏧", "🚾", "♿", "🅿️", "🛗", "🈳", "🈂️", "🛂", "🛃", "🛄", "🛅", "🚹", "🚺", "🚼", "⚧️", "🚻", "🚮", "🎦", "📶", "🈁", "🔣", "ℹ️", "🔤", "🔡", "🔠", "🆖", "🆗", "🆙", "🆒", "🆕", "🆓", "0️⃣", "1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣", "🔟", "🔢", "#️⃣", "*️⃣", "⏏️", "▶️", "⏸️", "⏯️", "⏹️", "⏺️", "⏭️", "⏮️", "⏩", "⏪", "⏫", "⏬", "◀️", "🔼", "🔽", "➡️", "⬅️", "⬆️", "⬇️", "↗️", "↘️", "↙️", "↖️", "↕️", "↔️", "↪️", "↩️", "⤴️", "⤵️", "🔀", "🔁", "🔂", "🔄", "🔃", "🎵", "🎶", "➕", "➖", "➗", "✖️", "🟰", "♾️", "💲", "💱", "™️", "©️", "®️", "〰️", "➰", "➿", "🔚", "🔙", "🔛", "🔝", "🔜", "✔️", "☑️", "🔘", "🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤", "🔺", "🔻", "🔸", "🔹", "🔶", "🔷", "🔳", "🔲", "▪️", "▫️", "◾", "◽", "◼️", "◻️", "🟥", "🟧", "🟨", "🟩", "🟦", "🟪", "⬛", "⬜", "🟫", "🔈", "🔇", "🔉", "🔊", "🔔", "🔕", "📣", "📢", "👁️‍🗨️", "💬", "💭", "🗯️", "♠️", "♣️", "♥️", "♦️", "🃏", "🎴", "🀄", "🕐", "🕑", "🕒", "🕓", "🕔", "🕕", "🕖", "🕗", "🕘", "🕙", "🕚", "🕛", "🕜", "🕝", "🕞", "🕟", "🕠", "🕡", "🕢", "🕣", "🕤", "🕥", "🕦", "🕧"],
  "Bayraklar": ["🏁", "🚩", "🎌", "🏴", "🏳️", "🏳️‍🌈", "🏳️‍⚧️", "🏴‍☠️", "🇦🇨", "🇦🇩", "🇦🇪", "🇦🇫", "🇦🇬", "🇦🇮", "🇦🇱", "🇦🇲", "🇦🇴", "🇦🇶", "🇦🇷", "🇦🇸", "🇦🇹", "🇦🇺", "🇦🇼", "🇦🇽", "🇦🇿", "🇧🇦", "🇧🇧", "🇧🇩", "🇧🇪", "🇧🇫", "🇧🇬", "🇧🇭", "🇧🇮", "🇧🇯", "🇧🇱", "🇧🇲", "🇧🇳", "🇧🇴", "🇧🇶", "🇧🇷", "🇧🇸", "🇧🇹", "🇧🇻", "🇧🇼", "🇧🇾", "🇧🇿", "🇨🇦", "🇨🇨", "🇨🇩", "🇨🇫", "🇨🇬", "🇨🇭", "🇨🇮", "🇨🇰", "🇨🇱", "🇨🇲", "🇨🇳", "🇨🇴", "🇨🇵", "🇨🇷", "🇨🇺", "🇨🇻", "🇨🇼", "🇨🇽", "🇨🇾", "🇨🇿", "🇩🇪", "🇩🇬", "🇩🇯", "🇩🇰", "🇩🇲", "🇩🇴", "🇩🇿", "🇪🇦", "🇪🇨", "🇪🇪", "🇪🇬", "🇪🇭", "🇪🇷", "🇪🇸", "🇪🇹", "🇪🇺", "🇫🇮", "🇫🇯", "🇫🇰", "🇫🇲", "🇫🇴", "🇫🇷", "🇬🇦", "🇬🇧", "🇬🇩", "🇬🇪", "🇬🇫", "🇬🇬", "🇬🇭", "🇬🇮", "🇬🇱", "🇬🇲", "🇬🇳", "🇬🇵", "🇬🇶", "🇬🇷", "🇬🇸", "🇬🇹", "🇬🇺", "🇬🇼", "🇬🇾", "🇭🇰", "🇭🇲", "🇭🇳", "🇭🇷", "🇭🇹", "🇭🇺", "🇮🇨", "🇮🇩", "🇮🇪", "🇮🇱", "🇮🇲", "🇮🇳", "🇮🇴", "🇮🇶", "🇮🇷", "🇮🇸", "🇮🇹", "🇯🇪", "🇯🇲", "🇯🇴", "🇯🇵", "🇰🇪", "🇰🇬", "🇰🇭", "🇰🇮", "🇰🇲", "🇰🇳", "🇰🇵", "🇰🇷", "🇰🇼", "🇰🇾", "🇰🇿", "🇱🇦", "🇱🇧", "🇱🇨", "🇱🇮", "🇱🇰", "🇱🇷", "🇱🇸", "🇱🇹", "🇱🇺", "🇱🇻", "🇱🇾", "🇲🇦", "🇲🇨", "🇲🇩", "🇲🇪", "🇲🇫", "🇲🇬", "🇲🇭", "🇲🇰", "🇲🇱", "🇲🇲", "🇲🇳", "🇲🇴", "🇲🇵", "🇲🇶", "🇲🇷", "🇲🇸", "🇲🇹", "🇲🇺", "🇲🇻", "🇲🇼", "🇲🇽", "🇲🇾", "🇲🇿", "🇳🇦", "🇳🇨", "🇳🇪", "🇳🇫", "🇳🇬", "🇳🇮", "🇳🇱", "🇳🇴", "🇳🇵", "🇳🇷", "🇳🇺", "🇳🇿", "🇴🇲", "🇵🇦", "🇵🇪", "🇵🇫", "🇵🇬", "🇵🇭", "🇵🇰", "🇵🇱", "🇵🇲", "🇵🇳", "🇵🇷", "🇵🇸", "🇵🇹", "🇵🇼", "🇵🇾", "🇶🇦", "🇷🇪", "🇷🇴", "🇷🇸", "🇷🇺", "🇷🇼", "🇸🇦", "🇸🇧", "🇸🇨", "🇸🇩", "🇸🇪", "🇸🇬", "🇸🇭", "🇸🇮", "🇸🇯", "🇸🇰", "🇸🇱", "🇸🇲", "🇸🇳", "🇸🇴", "🇸🇷", "🇸🇸", "🇸🇹", "🇸🇻", "🇸🇽", "🇸🇾", "🇸🇿", "🇹🇦", "🇹🇨", "🇹🇩", "🇹🇫", "🇹🇬", "🇹🇭", "🇹🇯", "🇹🇰", "🇹🇱", "🇹🇲", "🇹🇳", "🇹🇴", "🇹🇷", "🇹🇹", "🇹🇻", "🇹🇼", "🇹🇿", "🇺🇦", "🇺🇬", "🇺🇲", "🇺🇳", "🇺🇸", "🇺🇾", "🇺🇿", "🇻🇦", "🇻🇨", "🇻🇪", "🇻🇬", "🇻🇮", "🇻🇳", "🇻🇺", "🇼🇫", "🇼🇸", "🇽🇰", "🇾🇪", "🇾🇹", "🇿🇦", "🇿🇲", "🇿🇼", "🏴󐁧󐁢󐁥󐁮󐁧󐁿", "🏴󐁧󐁢󐁳󐁣󐁴󐁿", "🏴󐁧󐁢󐁷󐁬󐁳󐁿"]
};
const EmojiPicker = /* @__PURE__ */ __name(({ onSelect }) => {
  const [activeCategory, setActiveCategory] = reactExports.useState("Son Kullanılan ⏱️");
  const [searchTerm, setSearchTerm] = reactExports.useState("");
  const [trendingEmojis, setTrendingEmojis] = reactExports.useState([]);
  const [recentEmojis, setRecentEmojis] = reactExports.useState(getRecents());
  const [favoriteEmojis, setFavoriteEmojis] = reactExports.useState(getFavorites());
  const [contextMenu, setContextMenu] = reactExports.useState(null);
  reactExports.useEffect(() => {
    const fetchTrendingEmojis = /* @__PURE__ */ __name(async () => {
      try {
        const response = await fetch("/api/emoji/trending/");
        if (response.ok) {
          const data = await response.json();
          const emojis = data.map((item) => item.emoji);
          setTrendingEmojis(emojis);
          EMOJI_CATEGORIES["Trending 🔥"] = emojis;
        }
      } catch (error) {
        const fallbackTrending = ["🔥", "❤️", "😂", "👍", "🎉", "💯", "✨", "😍", "🚀", "💪"];
        setTrendingEmojis(fallbackTrending);
        EMOJI_CATEGORIES["Trending 🔥"] = fallbackTrending;
      }
    }, "fetchTrendingEmojis");
    fetchTrendingEmojis();
  }, []);
  reactExports.useEffect(() => {
    const close = /* @__PURE__ */ __name(() => setContextMenu(null), "close");
    if (contextMenu) window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [contextMenu]);
  const handleSelect = reactExports.useCallback((emoji) => {
    addRecent(emoji);
    setRecentEmojis(getRecents());
    onSelect(emoji);
  }, [onSelect]);
  const handleContextMenu = reactExports.useCallback((e, emoji) => {
    e.preventDefault();
    setContextMenu({ emoji, x: e.clientX, y: e.clientY });
  }, []);
  const handleToggleFav = reactExports.useCallback((emoji) => {
    const newFavs = toggleFavorite(emoji);
    setFavoriteEmojis(newFavs);
    setContextMenu(null);
  }, []);
  const allCategories = {
    ...recentEmojis.length > 0 ? { "Son Kullanılan ⏱️": recentEmojis } : {},
    ...favoriteEmojis.length > 0 ? { "Favoriler ⭐": favoriteEmojis } : {},
    ...EMOJI_CATEGORIES
  };
  const effectiveCategory = allCategories[activeCategory] ? activeCategory : Object.keys(allCategories)[0];
  const filteredEmojis = searchTerm ? Object.values(EMOJI_CATEGORIES).flat().filter((emoji) => emoji.includes(searchTerm)) : allCategories[effectiveCategory] || [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.searchBar, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type: "text",
        placeholder: "Emoji ara...",
        value: searchTerm,
        onChange: /* @__PURE__ */ __name((e) => setSearchTerm(e.target.value), "onChange"),
        style: styles$1.searchInput
      }
    ) }),
    !searchTerm && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.categories, children: Object.keys(allCategories).map((category) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => setActiveCategory(category), "onClick"),
        style: {
          ...styles$1.categoryButton,
          ...effectiveCategory === category && styles$1.activeCategoryButton
        },
        children: category
      },
      category
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles$1.emojiGrid, children: [
      filteredEmojis.map((emoji, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => handleSelect(emoji), "onClick"),
          onContextMenu: /* @__PURE__ */ __name((e) => handleContextMenu(e, emoji), "onContextMenu"),
          style: {
            ...styles$1.emojiButton,
            ...favoriteEmojis.includes(emoji) && effectiveCategory !== "Favoriler ⭐" ? styles$1.favHighlight : {}
          },
          title: favoriteEmojis.includes(emoji) ? `${emoji} ⭐` : emoji,
          children: emoji
        },
        `${emoji}-${index}`
      )),
      filteredEmojis.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles$1.emptyState, children: searchTerm ? "🔍 Sonuç bulunamadı" : activeCategory === "Son Kullanılan ⏱️" ? "⏱️ Henüz emoji kullanılmadı" : "⭐ Sağ tıklayarak favori ekle" })
    ] }),
    contextMenu && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { ...styles$1.contextMenu, top: contextMenu.y - 50, left: contextMenu.x - 100 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { style: styles$1.contextMenuItem, onClick: /* @__PURE__ */ __name(() => handleToggleFav(contextMenu.emoji), "onClick"), children: favoriteEmojis.includes(contextMenu.emoji) ? "💔 Favorilerden Çıkar" : "⭐ Favorilere Ekle" }) })
  ] });
}, "EmojiPicker");
const EmojiPicker$1 = React.memo(EmojiPicker);
const parseMarkdown = /* @__PURE__ */ __name((text) => {
  if (!text) return "";
  let html = text.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre style="background:#1e1f22;padding:8px 12px;border-radius:6px;overflow-x:auto;font-size:13px;margin:4px 0"><code>$2</code></pre>').replace(/`([^`]+)`/g, '<code style="background:#1e1f22;padding:2px 6px;border-radius:4px;font-size:13px">$1</code>').replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>").replace(/__(.+?)__/g, "<u>$1</u>").replace(/~~(.+?)~~/g, "<s>$1</s>").replace(/\|\|(.+?)\|\|/g, `<span style="background:#1e1f22;color:#1e1f22;padding:0 4px;border-radius:3px;cursor:pointer" onclick="this.style.color='#dcddde'">$1</span>`).replace(/^### (.+)$/gm, '<h3 style="margin:4px 0;font-size:1em">$1</h3>').replace(/^## (.+)$/gm, '<h2 style="margin:4px 0;font-size:1.15em">$1</h2>').replace(/^# (.+)$/gm, '<h1 style="margin:4px 0;font-size:1.3em">$1</h1>').replace(/^> (.+)$/gm, '<div style="border-left:3px solid #5865f2;padding-left:10px;color:#b5bac1;margin:4px 0">$1</div>').replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" style="color:#00b0f4;text-decoration:none">$1</a>').replace(/^[-*] (.+)$/gm, '<div style="padding-left:12px">• $1</div>').replace(/\n/g, "<br/>");
  return html;
}, "parseMarkdown");
const MarkdownPreviewToggle = /* @__PURE__ */ __name(({ text, show, onToggle }) => {
  const html = reactExports.useMemo(() => parseMarkdown(text), [text]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S$1.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: onToggle,
        style: { ...S$1.toggleBtn, ...show ? S$1.toggleBtnActive : {} },
        title: show ? "Önizlemeyi kapat" : "Markdown önizleme",
        children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaEyeSlash, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaEye, {})
      }
    ),
    show && text && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S$1.preview, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: S$1.previewLabel, children: "Önizleme" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          style: S$1.previewContent,
          dangerouslySetInnerHTML: { __html: purify.sanitize(html) }
        }
      )
    ] })
  ] });
}, "MarkdownPreviewToggle");
const S$1 = {
  container: { position: "relative" },
  toggleBtn: {
    background: "none",
    border: "none",
    color: "#949ba4",
    cursor: "pointer",
    fontSize: 14,
    padding: 4,
    display: "flex",
    alignItems: "center",
    transition: "color 0.15s"
  },
  toggleBtnActive: { color: "#5865f2" },
  preview: {
    position: "absolute",
    bottom: "100%",
    left: 0,
    right: 0,
    marginBottom: 8,
    backgroundColor: "#2b2d31",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    overflow: "hidden",
    boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
    maxHeight: 200,
    overflowY: "auto",
    animation: "mdPreviewIn 0.15s ease-out"
  },
  previewLabel: {
    fontSize: 10,
    fontWeight: 700,
    color: "#949ba4",
    letterSpacing: "0.05em",
    padding: "6px 12px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    backgroundColor: "rgba(0,0,0,0.1)"
  },
  previewContent: {
    padding: "10px 12px",
    color: "#dcddde",
    fontSize: 14,
    lineHeight: 1.5,
    wordBreak: "break-word"
  }
};
if (typeof document !== "undefined") {
  const id = "md-preview-css";
  if (!document.getElementById(id)) {
    const s = document.createElement("style");
    s.id = id;
    s.textContent = `@keyframes mdPreviewIn { from { opacity:0; transform: translateY(8px); } to { opacity:1; transform: translateY(0); } }`;
    document.head.appendChild(s);
  }
}
const MarkdownPreviewToggle$1 = reactExports.memo(MarkdownPreviewToggle);
const COMMON_EMOJIS = [
  { name: "grinning", emoji: "😀" },
  { name: "joy", emoji: "😂" },
  { name: "heart_eyes", emoji: "😍" },
  { name: "thinking", emoji: "🤔" },
  { name: "thumbsup", emoji: "👍" },
  { name: "thumbsdown", emoji: "👎" },
  { name: "fire", emoji: "🔥" },
  { name: "heart", emoji: "❤️" },
  { name: "star", emoji: "⭐" },
  { name: "check", emoji: "✅" },
  { name: "x", emoji: "❌" },
  { name: "warning", emoji: "⚠️" },
  { name: "rocket", emoji: "🚀" },
  { name: "tada", emoji: "🎉" },
  { name: "wave", emoji: "👋" },
  { name: "clap", emoji: "👏" },
  { name: "pray", emoji: "🙏" },
  { name: "muscle", emoji: "💪" },
  { name: "eyes", emoji: "👀" },
  { name: "cry", emoji: "😢" },
  { name: "angry", emoji: "😡" },
  { name: "cool", emoji: "😎" },
  { name: "wink", emoji: "😉" },
  { name: "tongue", emoji: "😛" },
  { name: "sleeping", emoji: "😴" },
  { name: "skull", emoji: "💀" },
  { name: "ghost", emoji: "👻" },
  { name: "alien", emoji: "👽" },
  { name: "robot", emoji: "🤖" },
  { name: "poop", emoji: "💩" },
  { name: "ok_hand", emoji: "👌" },
  { name: "peace", emoji: "✌️" },
  { name: "raised_hand", emoji: "✋" },
  { name: "sparkles", emoji: "✨" },
  { name: "boom", emoji: "💥" },
  { name: "zap", emoji: "⚡" },
  { name: "sun", emoji: "☀️" },
  { name: "moon", emoji: "🌙" },
  { name: "rainbow", emoji: "🌈" },
  { name: "cloud", emoji: "☁️" },
  { name: "umbrella", emoji: "☂️" },
  { name: "snowflake", emoji: "❄️" },
  { name: "cat", emoji: "🐱" },
  { name: "dog", emoji: "🐶" },
  { name: "bear", emoji: "🐻" },
  { name: "panda", emoji: "🐼" },
  { name: "fox", emoji: "🦊" },
  { name: "lion", emoji: "🦁" },
  { name: "pizza", emoji: "🍕" },
  { name: "burger", emoji: "🍔" },
  { name: "coffee", emoji: "☕" },
  { name: "beer", emoji: "🍺" },
  { name: "cake", emoji: "🎂" },
  { name: "gift", emoji: "🎁" },
  { name: "trophy", emoji: "🏆" },
  { name: "medal", emoji: "🏅" },
  { name: "crown", emoji: "👑" },
  { name: "gem", emoji: "💎" },
  { name: "money", emoji: "💰" },
  { name: "bulb", emoji: "💡" },
  { name: "book", emoji: "📚" },
  { name: "pencil", emoji: "✏️" },
  { name: "pin", emoji: "📌" },
  { name: "lock", emoji: "🔒" },
  { name: "key", emoji: "🔑" },
  { name: "bell", emoji: "🔔" },
  { name: "megaphone", emoji: "📢" },
  { name: "loudspeaker", emoji: "📣" },
  { name: "mute", emoji: "🔇" },
  { name: "music", emoji: "🎵" },
  { name: "microphone", emoji: "🎤" },
  { name: "headphones", emoji: "🎧" },
  { name: "camera", emoji: "📷" },
  { name: "video", emoji: "📹" },
  { name: "tv", emoji: "📺" },
  { name: "computer", emoji: "💻" },
  { name: "phone", emoji: "📱" },
  { name: "email", emoji: "📧" },
  { name: "link", emoji: "🔗" },
  { name: "gear", emoji: "⚙️" },
  { name: "wrench", emoji: "🔧" },
  { name: "hammer", emoji: "🔨" },
  { name: "shield", emoji: "🛡️" },
  { name: "sword", emoji: "⚔️" },
  { name: "flag", emoji: "🏁" },
  { name: "checkered_flag", emoji: "🏁" },
  { name: "party", emoji: "🥳" },
  { name: "confused", emoji: "😕" },
  { name: "nervous", emoji: "😬" },
  { name: "scream", emoji: "😱" },
  { name: "sob", emoji: "😭" },
  { name: "sweat", emoji: "😅" },
  { name: "blush", emoji: "😊" },
  { name: "smirk", emoji: "😏" },
  { name: "unamused", emoji: "😒" },
  { name: "relieved", emoji: "😌" },
  { name: "dizzy", emoji: "😵" },
  { name: "mask", emoji: "😷" },
  { name: "nerd", emoji: "🤓" },
  { name: "monocle", emoji: "🧐" },
  { name: "shush", emoji: "🤫" },
  { name: "salute", emoji: "🫡" },
  { name: "rolling_eyes", emoji: "🙄" },
  { name: "pleading", emoji: "🥺" },
  { name: "hug", emoji: "🤗" }
];
const ChatAutocomplete = /* @__PURE__ */ __name(({
  message,
  cursorPosition,
  users = [],
  channels = [],
  onSelect,
  textareaRef
}) => {
  const [type, setType] = reactExports.useState(null);
  const [query, setQuery] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [selectedIndex, setSelectedIndex] = reactExports.useState(0);
  const popupRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!message || cursorPosition <= 0) {
      setType(null);
      return;
    }
    const textBeforeCursor = message.substring(0, cursorPosition);
    const mentionMatch = textBeforeCursor.match(/(?:^|\s)@(\w{0,20})$/);
    const channelMatch = textBeforeCursor.match(/(?:^|\s)#(\w{0,20})$/);
    const emojiMatch = textBeforeCursor.match(/(?:^|\s):(\w{1,20})$/);
    if (mentionMatch) {
      setType("mention");
      setQuery(mentionMatch[1].toLowerCase());
    } else if (channelMatch) {
      setType("channel");
      setQuery(channelMatch[1].toLowerCase());
    } else if (emojiMatch && emojiMatch[1].length >= 2) {
      setType("emoji");
      setQuery(emojiMatch[1].toLowerCase());
    } else {
      setType(null);
    }
    setSelectedIndex(0);
  }, [message, cursorPosition]);
  reactExports.useEffect(() => {
    if (!type) {
      setResults([]);
      return;
    }
    let filtered = [];
    if (type === "mention") {
      const specialMentions = [
        { username: "everyone", display_name: "Everyone", special: true, icon: "globe" },
        { username: "here", display_name: "Online Users", special: true, icon: "at" }
      ];
      const allOptions = [...specialMentions, ...users];
      filtered = allOptions.filter((u) => {
        const name = (u.username || "").toLowerCase();
        const display = (u.display_name || u.nickname || "").toLowerCase();
        return name.includes(query) || display.includes(query);
      }).slice(0, 10);
    } else if (type === "channel") {
      filtered = channels.filter((c) => {
        const name = (c.name || c.slug || "").toLowerCase();
        return name.includes(query);
      }).slice(0, 10);
    } else if (type === "emoji") {
      filtered = COMMON_EMOJIS.filter((e) => e.name.includes(query)).slice(0, 10);
    }
    setResults(filtered);
  }, [type, query, users, channels]);
  const handleKeyDown = reactExports.useCallback((e) => {
    if (!type || results.length === 0) return false;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
      return true;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % results.length);
      return true;
    }
    if (e.key === "Enter" || e.key === "Tab") {
      e.preventDefault();
      handleSelect(results[selectedIndex]);
      return true;
    }
    if (e.key === "Escape") {
      setType(null);
      return true;
    }
    return false;
  }, [type, results, selectedIndex]);
  reactExports.useEffect(() => {
    if (!textareaRef?.current) return;
    const textarea = textareaRef.current;
    const handler = /* @__PURE__ */ __name((e) => {
      if (type && results.length > 0) {
        if (["ArrowDown", "ArrowUp", "Tab"].includes(e.key) || e.key === "Enter" && type) {
          const handled = handleKeyDown(e);
          if (handled) e.stopPropagation();
        }
        if (e.key === "Escape") {
          setType(null);
          e.stopPropagation();
        }
      }
    }, "handler");
    textarea.addEventListener("keydown", handler, true);
    return () => textarea.removeEventListener("keydown", handler, true);
  }, [textareaRef, type, results, handleKeyDown]);
  const handleSelect = reactExports.useCallback((item) => {
    if (!item || !textareaRef?.current) return;
    textareaRef.current;
    const textBeforeCursor = message.substring(0, cursorPosition);
    const textAfterCursor = message.substring(cursorPosition);
    let replacement = "";
    let triggerRegex;
    if (type === "mention") {
      triggerRegex = /(?:^|\s)@\w{0,20}$/;
      replacement = `@${item.username} `;
    } else if (type === "channel") {
      triggerRegex = /(?:^|\s)#\w{0,20}$/;
      replacement = `#${item.name || item.slug} `;
    } else if (type === "emoji") {
      triggerRegex = /(?:^|\s):\w{1,20}$/;
      replacement = item.emoji + " ";
    }
    const match = textBeforeCursor.match(triggerRegex);
    if (match) {
      const triggerStart = match.index + (match[0].startsWith(" ") || match[0].startsWith("\n") ? 1 : 0);
      const newText = message.substring(0, triggerStart) + replacement + textAfterCursor;
      const newCursorPos = triggerStart + replacement.length;
      onSelect(newText, newCursorPos);
    }
    setType(null);
    setResults([]);
  }, [type, message, cursorPosition, onSelect, textareaRef]);
  reactExports.useEffect(() => {
    if (popupRef.current) {
      const items = popupRef.current.querySelectorAll("[data-autocomplete-item]");
      if (items[selectedIndex]) {
        items[selectedIndex].scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);
  if (!type || results.length === 0) return null;
  const getIcon = /* @__PURE__ */ __name((type2, item) => {
    if (type2 === "mention") {
      if (item.special) {
        return item.icon === "globe" ? /* @__PURE__ */ jsxRuntimeExports.jsx(FaGlobe, { style: { color: "#5865f2" } }) : /* @__PURE__ */ jsxRuntimeExports.jsx(FaAt, { style: { color: "#faa61a" } });
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FaUser, { style: { color: "#b9bbbe" } });
    }
    if (type2 === "channel") {
      const ct = item.channel_type;
      if (ct === "voice") return /* @__PURE__ */ jsxRuntimeExports.jsx(FaVolumeUp, { style: { color: "#b9bbbe" } });
      if (ct === "announcement") return /* @__PURE__ */ jsxRuntimeExports.jsx(FaBullhorn, { style: { color: "#b9bbbe" } });
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, { style: { color: "#b9bbbe" } });
    }
    if (type2 === "emoji") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 18 }, children: item.emoji });
    }
    return null;
  }, "getIcon");
  const getLabel = /* @__PURE__ */ __name((type2, item) => {
    if (type2 === "mention") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
        item.avatar ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: item.avatar, alt: "", style: { width: 20, height: 20, borderRadius: "50%" } }) : getIcon(type2, item),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff", fontWeight: 500 }, children: item.display_name || item.nickname || item.username }),
        (item.display_name || item.nickname) && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#72767d", fontSize: 12 }, children: [
          "@",
          item.username
        ] }),
        item.special && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: S.specialBadge, children: item.username === "everyone" ? "Herkesi etiketle" : "Online olanları etiketle" })
      ] });
    }
    if (type2 === "channel") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
        getIcon(type2, item),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "#fff" }, children: item.name || item.slug }),
        item.category_name && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#72767d", fontSize: 11 }, children: [
          "• ",
          item.category_name
        ] })
      ] });
    }
    if (type2 === "emoji") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", alignItems: "center", gap: 8 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { fontSize: 20 }, children: item.emoji }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: { color: "#dcddde" }, children: [
          ":",
          item.name,
          ":"
        ] })
      ] });
    }
    return null;
  }, "getLabel");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: popupRef, style: S.popup, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: S.header, children: [
      type === "mention" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaAt, { style: { color: "#5865f2" } }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kullanıcılar" })
      ] }),
      type === "channel" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaHashtag, { style: { color: "#5865f2" } }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kanallar" })
      ] }),
      type === "emoji" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaSmile, { style: { color: "#5865f2" } }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Emoji" })
      ] })
    ] }),
    results.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-autocomplete-item": true,
        style: {
          ...S.item,
          backgroundColor: i === selectedIndex ? "rgba(88,101,242,0.2)" : "transparent"
        },
        onClick: /* @__PURE__ */ __name(() => handleSelect(item), "onClick"),
        onMouseEnter: /* @__PURE__ */ __name(() => setSelectedIndex(i), "onMouseEnter"),
        children: getLabel(type, item)
      },
      item.username || item.slug || item.name || i
    ))
  ] });
}, "ChatAutocomplete");
const S = {
  popup: {
    position: "absolute",
    bottom: "100%",
    left: 0,
    right: 0,
    maxHeight: 300,
    overflowY: "auto",
    backgroundColor: "#2b2d31",
    borderRadius: "8px 8px 0 0",
    boxShadow: "0 -4px 16px rgba(0,0,0,0.4)",
    zIndex: 100,
    padding: "4px 0",
    marginBottom: 4
  },
  header: {
    padding: "8px 12px",
    fontSize: 11,
    fontWeight: 700,
    color: "#949ba4",
    textTransform: "uppercase",
    letterSpacing: "0.04em",
    display: "flex",
    alignItems: "center",
    gap: 6,
    borderBottom: "1px solid rgba(255,255,255,0.06)"
  },
  item: {
    padding: "8px 12px",
    cursor: "pointer",
    transition: "background 0.1s",
    borderRadius: 4,
    margin: "0 4px"
  },
  specialBadge: {
    fontSize: 10,
    color: "#949ba4",
    backgroundColor: "rgba(255,255,255,0.06)",
    padding: "2px 6px",
    borderRadius: 4,
    marginLeft: "auto"
  }
};
const ChatAutocomplete$1 = reactExports.memo(ChatAutocomplete);
const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#383a40",
    borderRadius: "8px",
    padding: isMobile ? "6px" : "8px",
    margin: isMobile ? "8px" : "16px"
  },
  replyPreview: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    backgroundColor: "rgba(88, 101, 242, 0.1)",
    borderLeft: "3px solid #5865f2",
    borderRadius: "4px",
    marginBottom: "8px",
    fontSize: "0.9em"
  },
  replyContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  editPreview: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 12px",
    backgroundColor: "rgba(250, 166, 26, 0.1)",
    borderLeft: "3px solid #faa61a",
    borderRadius: "4px",
    marginBottom: "8px",
    fontSize: "0.9em"
  },
  cancelButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: "16px",
    padding: "4px 8px",
    transition: "color 0.2s"
  },
  inputWrapper: {
    display: "flex",
    alignItems: "flex-end",
    gap: "4px"
  },
  leftActions: {
    display: "flex",
    gap: "2px",
    marginBottom: "4px",
    flexShrink: 0
  },
  rightActions: {
    display: "flex",
    gap: "2px",
    marginBottom: "4px",
    flexShrink: 0,
    flexWrap: "wrap"
  },
  actionButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: isMobile ? "16px" : "20px",
    padding: isMobile ? "6px" : "8px",
    borderRadius: "4px",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: isMobile ? "32px" : "36px",
    minHeight: isMobile ? "32px" : "36px"
  },
  sendButton: {
    background: "#5865f2",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "18px",
    padding: "10px 12px",
    borderRadius: "4px",
    transition: "background 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  textarea: {
    flex: 1,
    background: "#40444b",
    border: "none",
    outline: "none",
    color: "#dcddde",
    fontSize: isMobile ? "14px" : "15px",
    padding: isMobile ? "8px 10px" : "11px",
    borderRadius: "8px",
    resize: "none",
    fontFamily: "inherit",
    lineHeight: "1.375",
    maxHeight: "200px",
    overflowY: "auto",
    minWidth: 0
  },
  pickerWrapper: {
    position: "absolute",
    bottom: "100%",
    right: 0,
    marginBottom: "8px",
    zIndex: 1e3,
    boxShadow: "0 8px 16px rgba(0,0,0,0.24)",
    borderRadius: "8px"
  },
  mobileMenu: {
    position: "absolute",
    bottom: "110%",
    left: 0,
    backgroundColor: "#2b2d31",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "8px",
    padding: "8px",
    minWidth: "200px",
    boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
    zIndex: 1e3,
    display: "flex",
    flexDirection: "column",
    gap: "4px"
  },
  mobileMenuItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    backgroundColor: "transparent",
    border: "none",
    borderRadius: "4px",
    color: "#dcddde",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background 0.2s",
    textAlign: "left",
    width: "100%",
    whiteSpace: "nowrap"
  },
  draftSaved: {
    position: "absolute",
    top: "-30px",
    right: "10px",
    fontSize: "0.75em",
    color: "#43b581",
    backgroundColor: "rgba(67, 181, 129, 0.1)",
    padding: "4px 8px",
    borderRadius: "4px",
    border: "1px solid #43b581",
    animation: "fadeIn 0.3s ease-in-out"
  },
  // 🎤 Voice Recording Styles
  micButton: {
    background: "none",
    border: "none",
    color: "#b9bbbe",
    cursor: "pointer",
    fontSize: isMobile ? "18px" : "20px",
    padding: isMobile ? "6px" : "8px",
    borderRadius: "50%",
    transition: "all 0.2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    minWidth: isMobile ? "36px" : "40px",
    minHeight: isMobile ? "36px" : "40px"
  },
  recordingContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    position: "relative",
    flex: 1,
    backgroundColor: "rgba(237, 66, 69, 0.06)",
    borderRadius: "12px",
    padding: "10px 16px",
    border: "1px solid rgba(237, 66, 69, 0.25)",
    transition: "all 0.3s ease",
    overflow: "hidden"
  },
  waveformBg: {
    position: "absolute",
    left: "80px",
    right: "120px",
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "3px",
    height: "24px",
    pointerEvents: "none",
    zIndex: 0
  },
  recLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    zIndex: 1
  },
  recordingDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#ed4245"
  },
  recordingTime: {
    fontSize: "15px",
    color: "#ed4245",
    fontWeight: "700",
    fontVariantNumeric: "tabular-nums",
    minWidth: "44px",
    letterSpacing: "0.5px"
  },
  slideToLock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "4px",
    marginLeft: "auto",
    zIndex: 1,
    cursor: "default"
  },
  slideMicCircle: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.15s ease",
    fontSize: "14px"
  },
  slideTrack: {
    width: "4px",
    height: "22px",
    borderRadius: "2px",
    backgroundColor: "rgba(114, 118, 125, 0.25)",
    overflow: "hidden",
    position: "relative"
  },
  slideTrackFill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    borderRadius: "2px",
    transition: "height 0.05s linear"
  },
  slideLabel: {
    fontSize: "10px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    transition: "color 0.15s ease",
    whiteSpace: "nowrap"
  },
  lockedActions: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginLeft: "auto",
    zIndex: 1
  },
  lockedBadge: {
    fontSize: "12px",
    color: "#43b581",
    backgroundColor: "rgba(67, 181, 129, 0.15)",
    padding: "4px 10px",
    borderRadius: "12px",
    fontWeight: "700",
    border: "1px solid rgba(67,181,129,0.3)"
  },
  cancelRecButton: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "7px 14px",
    backgroundColor: "rgba(237, 66, 69, 0.12)",
    color: "#ed4245",
    border: "1px solid rgba(237, 66, 69, 0.3)",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.15s"
  },
  sendVoiceButton: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "7px 14px",
    backgroundColor: "#5865f2",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    transition: "all 0.15s",
    boxShadow: "0 2px 8px rgba(88,101,242,0.3)"
  },
  // 🆕 Pending Files Styles
  pendingFilesContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    padding: "8px",
    marginBottom: "8px"
  },
  pendingFilesHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
    fontSize: "12px",
    color: "#b9bbbe"
  },
  clearAllButton: {
    background: "none",
    border: "none",
    color: "#ed4245",
    cursor: "pointer",
    fontSize: "11px",
    padding: "4px 8px",
    borderRadius: "4px",
    transition: "background 0.2s"
  },
  pendingFilesList: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    maxHeight: "200px",
    overflowY: "auto"
  },
  pendingFileItem: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#40444b",
    borderRadius: "8px",
    padding: "8px",
    width: "100px",
    gap: "4px"
  },
  filePreviewImage: {
    width: "80px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "4px"
  },
  filePreviewVideo: {
    width: "80px",
    height: "60px",
    objectFit: "cover",
    borderRadius: "4px"
  },
  filePreviewIcon: {
    width: "80px",
    height: "60px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2b2d31",
    borderRadius: "4px",
    color: "#b9bbbe"
  },
  fileInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2px"
  },
  fileName: {
    fontSize: "10px",
    color: "#dcddde",
    textAlign: "center",
    wordBreak: "break-all"
  },
  fileSize: {
    fontSize: "9px",
    color: "#72767d"
  },
  removeFileButton: {
    position: "absolute",
    top: "-4px",
    right: "-4px",
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    backgroundColor: "#ed4245",
    border: "none",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    transition: "transform 0.2s"
  },
  // 🆕 Drag & Drop Overlay Styles
  dragOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(88, 101, 242, 0.9)",
    zIndex: 1e3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "8px",
    pointerEvents: "none"
  },
  dragContent: {
    textAlign: "center",
    color: "white",
    padding: "20px"
  }
};
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.4; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(5px); }
        to { opacity: 1; transform: translateY(0); }
    }
    
    /* 🎤 Recording container glow */
    .rec-container-glow {
        animation: recGlow 2s ease-in-out infinite;
    }
    @keyframes recGlow {
        0%, 100% { box-shadow: 0 0 0 0 rgba(237, 66, 69, 0); border-color: rgba(237, 66, 69, 0.25); }
        50% { box-shadow: 0 0 16px 2px rgba(237, 66, 69, 0.12); border-color: rgba(237, 66, 69, 0.45); }
    }

    /* 🎤 Recording pulse dot */
    .rec-pulse {
        animation: recPulse 1s ease-in-out infinite;
    }
    @keyframes recPulse {
        0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(237, 66, 69, 0.6); }
        50% { transform: scale(1.2); box-shadow: 0 0 0 8px rgba(237, 66, 69, 0); }
        100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(237, 66, 69, 0); }
    }
    
    /* 🎤 Waveform bars */
    .rec-waveform {
        display: flex !important;
    }
    .rec-wave-bar {
        width: 3px;
        border-radius: 2px;
        background: linear-gradient(180deg, #ed4245 0%, #f04747 50%, #ed4245 100%);
        animation: waveBar 0.8s ease-in-out infinite alternate;
    }
    @keyframes waveBar {
        0% { height: 4px; opacity: 0.3; }
        50% { height: 18px; opacity: 0.7; }
        100% { height: 6px; opacity: 0.4; }
    }
    
    /* 🎤 Mic button hover/active states */
    .mic-button:hover {
        color: #ed4245 !important;
        background: rgba(237, 66, 69, 0.1) !important;
    }
    .mic-button:active {
        transform: scale(1.15);
        color: #ed4245 !important;
        background: rgba(237, 66, 69, 0.2) !important;
    }
    
    textarea::-webkit-scrollbar {
        width: 8px;
    }
    
    textarea::-webkit-scrollbar-thumb {
        background: #202225;
        border-radius: 4px;
    }
    
    textarea::-webkit-scrollbar-thumb:hover {
        background: #18191c;
    }
    
    .action-button:hover {
        color: #dcddde;
        background-color: rgba(79, 84, 92, 0.4);
    }
`;
document.head.appendChild(styleSheet);
const LOCK_THRESHOLD = 80;
const useVoiceRecording = /* @__PURE__ */ __name((onFileUpload) => {
  const [isRecording, setIsRecording] = reactExports.useState(false);
  const [isRecordingLocked, setIsRecordingLocked] = reactExports.useState(false);
  const [recordingTime, setRecordingTime] = reactExports.useState(0);
  const [slideProgress, setSlideProgress] = reactExports.useState(0);
  const mediaRecorderRef = reactExports.useRef(null);
  const recordingTimerRef = reactExports.useRef(null);
  const micButtonRef = reactExports.useRef(null);
  const isRecordingRef = reactExports.useRef(false);
  const isRecordingLockedRef = reactExports.useRef(false);
  const touchStartYRef = reactExports.useRef(0);
  reactExports.useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);
  reactExports.useEffect(() => {
    isRecordingLockedRef.current = isRecordingLocked;
  }, [isRecordingLocked]);
  reactExports.useEffect(() => {
    if (!isRecording || isRecordingLocked) return;
    const handleDocMouseMove = /* @__PURE__ */ __name((e) => {
      if (!isRecordingRef.current || isRecordingLockedRef.current) return;
      const startY = touchStartYRef.current;
      const deltaY = startY - e.clientY;
      const progress = Math.min(Math.max(deltaY / LOCK_THRESHOLD, 0), 1);
      setSlideProgress(progress);
      if (deltaY > LOCK_THRESHOLD) {
        setIsRecordingLocked(true);
        setSlideProgress(1);
      }
    }, "handleDocMouseMove");
    const handleDocMouseUp = /* @__PURE__ */ __name(() => {
      if (!isRecordingRef.current) return;
      if (!isRecordingLockedRef.current) {
        stopRecording();
      }
    }, "handleDocMouseUp");
    const handleDocTouchMove = /* @__PURE__ */ __name((e) => {
      if (!isRecordingRef.current || isRecordingLockedRef.current) return;
      const currentY = e.touches[0].clientY;
      const startY = touchStartYRef.current;
      const deltaY = startY - currentY;
      const progress = Math.min(Math.max(deltaY / LOCK_THRESHOLD, 0), 1);
      setSlideProgress(progress);
      if (deltaY > LOCK_THRESHOLD) {
        setIsRecordingLocked(true);
        setSlideProgress(1);
      }
    }, "handleDocTouchMove");
    const handleDocTouchEnd = /* @__PURE__ */ __name(() => {
      if (!isRecordingRef.current) return;
      if (!isRecordingLockedRef.current) {
        stopRecording();
      }
    }, "handleDocTouchEnd");
    document.addEventListener("mousemove", handleDocMouseMove);
    document.addEventListener("mouseup", handleDocMouseUp);
    document.addEventListener("touchmove", handleDocTouchMove, { passive: false });
    document.addEventListener("touchend", handleDocTouchEnd);
    return () => {
      document.removeEventListener("mousemove", handleDocMouseMove);
      document.removeEventListener("mouseup", handleDocMouseUp);
      document.removeEventListener("touchmove", handleDocTouchMove);
      document.removeEventListener("touchend", handleDocTouchEnd);
    };
  }, [isRecording, isRecordingLocked]);
  const startRecording = /* @__PURE__ */ __name(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        const file = new File([blob], `voice-${Date.now()}.webm`, { type: "audio/webm" });
        if (onFileUpload) {
          onFileUpload(file);
        }
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      recordingTimerRef.current = setInterval(() => {
        setRecordingTime((t) => t + 1);
      }, 1e3);
    } catch (err) {
      console.error("Mikrofon erişim hatası:", err);
      toast.error("❌ Mikrofona erişim reddedildi!");
    }
  }, "startRecording");
  const stopRecording = /* @__PURE__ */ __name(() => {
    if (mediaRecorderRef.current && isRecordingRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsRecordingLocked(false);
      clearInterval(recordingTimerRef.current);
    }
  }, "stopRecording");
  const cancelRecording = /* @__PURE__ */ __name(() => {
    if (mediaRecorderRef.current && isRecordingRef.current) {
      const stream = mediaRecorderRef.current.stream;
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
      stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      setIsRecordingLocked(false);
      clearInterval(recordingTimerRef.current);
    }
  }, "cancelRecording");
  const handleMicMouseDown = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    touchStartYRef.current = e.clientY;
    setSlideProgress(0);
    startRecording();
  }, "handleMicMouseDown");
  const handleMicTouchStart = /* @__PURE__ */ __name((e) => {
    e.preventDefault();
    const startY = e.touches[0].clientY;
    touchStartYRef.current = startY;
    setSlideProgress(0);
    startRecording();
  }, "handleMicTouchStart");
  const formatTime = /* @__PURE__ */ __name((seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }, "formatTime");
  return {
    isRecording,
    isRecordingLocked,
    recordingTime,
    slideProgress,
    micButtonRef,
    handleMicMouseDown,
    handleMicTouchStart,
    stopRecording,
    cancelRecording,
    formatTime
  };
}, "useVoiceRecording");
const useDragDrop = /* @__PURE__ */ __name((onFilesDropped) => {
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const dragCounter = reactExports.useRef(0);
  const handleDragEnter = reactExports.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    setIsDragging(true);
  }, []);
  const handleDragOver = reactExports.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  const handleDragLeave = reactExports.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);
  const handleDrop = reactExports.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragging(false);
    const files = Array.from(e.dataTransfer?.files || []);
    if (files.length > 0 && onFilesDropped) {
      onFilesDropped(files);
    }
  }, [onFilesDropped]);
  const dragHandlers = {
    onDragEnter: handleDragEnter,
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop
  };
  return { isDragging, dragHandlers };
}, "useDragDrop");
async function compressImage(file, options = {}) {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.85,
    convertToWebP = true,
    maintainAspectRatio = true
  } = options;
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          let { width, height } = img;
          if (maintainAspectRatio) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            if (ratio < 1) {
              width *= ratio;
              height *= ratio;
            }
          } else {
            width = Math.min(width, maxWidth);
            height = Math.min(height, maxHeight);
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = "high";
          ctx.drawImage(img, 0, 0, width, height);
          const mimeType = convertToWebP ? "image/webp" : file.type;
          canvas.toBlob((blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Failed to compress image"));
            }
          }, mimeType, quality);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error("Failed to load image"));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsDataURL(file);
  });
}
__name(compressImage, "compressImage");
async function compressChatImage(file) {
  return compressImage(file, {
    maxWidth: 1920,
    maxHeight: 1080,
    quality: 0.85,
    convertToWebP: true,
    maintainAspectRatio: true
  });
}
__name(compressChatImage, "compressChatImage");
const PendingFilesPreview = /* @__PURE__ */ __name(({ pendingFiles, setPendingFiles, removePendingFile }) => {
  if (pendingFiles.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.pendingFilesContainer, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.pendingFilesHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "📎 ",
        pendingFiles.length,
        " dosya bekliyor"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => setPendingFiles([]), "onClick"),
          style: styles.clearAllButton,
          title: "Tümünü temizle",
          children: "Tümünü Kaldır"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.pendingFilesList, children: pendingFiles.map((file) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.pendingFileItem, children: [
      file.previewUrl && file.type.startsWith("image/") ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: file.previewUrl, alt: file.name, style: styles.filePreviewImage }) : file.previewUrl && file.type.startsWith("video/") ? /* @__PURE__ */ jsxRuntimeExports.jsx("video", { src: file.previewUrl, style: styles.filePreviewVideo, muted: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.filePreviewIcon, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, { size: 24 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.fileInfo, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.fileName, children: file.name.length > 20 ? file.name.substring(0, 17) + "..." : file.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.fileSize, children: [
          (file.size / 1024).toFixed(1),
          " KB"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => removePendingFile(file.id), "onClick"),
          style: styles.removeFileButton,
          title: "Dosyayı kaldır",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {})
        }
      )
    ] }, file.id)) })
  ] });
}, "PendingFilesPreview");
const PendingFilesPreview$1 = React.memo(PendingFilesPreview);
const InputMenu = /* @__PURE__ */ __name(({
  showMobileMenu,
  setShowMobileMenu,
  setShowEmojiPicker,
  setShowGifPicker,
  setShowTemplates,
  setShowScheduled,
  onShowCodeSnippet,
  disabled,
  message,
  setPendingFiles,
  showEmojiPicker,
  showGifPicker
}) => {
  const fileInputRef = reactExports.useRef(null);
  const handleFileChange = reactExports.useCallback((e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const processedFiles = files.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: file.type.startsWith("image/") || file.type.startsWith("video/") ? URL.createObjectURL(file) : null
    }));
    setPendingFiles((prev) => [...prev, ...processedFiles]);
    e.target.value = "";
  }, [setPendingFiles]);
  const menuAction = /* @__PURE__ */ __name((action) => {
    action();
    setShowMobileMenu(false);
  }, "menuAction");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.leftActions, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: /* @__PURE__ */ __name(() => setShowMobileMenu(!showMobileMenu), "onClick"),
        style: {
          ...styles.actionButton,
          backgroundColor: showMobileMenu ? "rgba(88, 101, 242, 0.2)" : "transparent",
          color: showMobileMenu ? "#5865f2" : "#b9bbbe"
        },
        title: "Seçenekler",
        disabled,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {})
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        multiple: true,
        style: { display: "none" },
        onChange: handleFileChange,
        accept: "image/*,video/*,audio/*,.pdf,.txt,.doc,.docx"
      }
    ),
    showMobileMenu && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.mobileMenu, className: "mobile-menu-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => menuAction(() => fileInputRef.current?.click()), "onClick"),
          style: styles.mobileMenuItem,
          className: "mobile-menu-item",
          disabled,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaperclip, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Dosya Ekle" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => menuAction(() => {
            setShowEmojiPicker(!showEmojiPicker);
            setShowGifPicker(false);
          }), "onClick"),
          style: styles.mobileMenuItem,
          className: "mobile-menu-item",
          disabled,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaSmile, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Emoji Ekle" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => menuAction(() => {
            setShowGifPicker(!showGifPicker);
            setShowEmojiPicker(false);
          }), "onClick"),
          style: styles.mobileMenuItem,
          className: "mobile-menu-item",
          disabled,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaImage, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "GIF Ekle" })
          ]
        }
      ),
      onShowCodeSnippet && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => menuAction(onShowCodeSnippet), "onClick"),
          style: styles.mobileMenuItem,
          className: "mobile-menu-item",
          disabled,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaCode, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Kod Snippet" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => menuAction(() => setShowTemplates(true)), "onClick"),
          style: styles.mobileMenuItem,
          className: "mobile-menu-item",
          disabled,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaFileAlt, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Ş",
              "ablon (Ctrl+T)"
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => menuAction(() => setShowScheduled(true)), "onClick"),
          style: styles.mobileMenuItem,
          className: "mobile-menu-item",
          disabled: disabled || !message.trim(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Zamanla" })
          ]
        }
      )
    ] })
  ] }) });
}, "InputMenu");
const InputMenu$1 = React.memo(InputMenu);
const VoiceRecordingUI = /* @__PURE__ */ __name(({
  isRecording,
  isRecordingLocked,
  recordingTime,
  slideProgress,
  micButtonRef,
  handleMicMouseDown,
  handleMicTouchStart,
  stopRecording,
  cancelRecording,
  formatTime,
  handleSubmit,
  disabled,
  hasContent,
  pendingFilesCount
}) => {
  if (!hasContent && !isRecording && pendingFilesCount === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        ref: micButtonRef,
        onMouseDown: handleMicMouseDown,
        onTouchStart: handleMicTouchStart,
        style: styles.micButton,
        className: "mic-button action-button",
        title: "Basılı tut — yukarı kaydır kilitle",
        disabled,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, {})
      }
    );
  }
  if (isRecording) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.recordingContainer, className: "rec-container-glow", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.waveformBg, className: "rec-waveform", children: [...Array(12)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rec-wave-bar", style: {
        animationDelay: `${i * 0.08}s`,
        opacity: 0.4 + Math.random() * 0.6
      } }, i)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.recLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.recordingDot, className: "rec-pulse" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.recordingTime, children: formatTime(recordingTime) })
      ] }),
      !isRecordingLocked ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.slideToLock, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          ...styles.slideMicCircle,
          backgroundColor: slideProgress > 0.7 ? "#43b581" : `rgba(237, 66, 69, ${0.6 + slideProgress * 0.4})`,
          transform: `scale(${1 + slideProgress * 0.3}) translateY(${-slideProgress * 20}px)`,
          boxShadow: slideProgress > 0.5 ? "0 0 12px rgba(67,181,129,0.5)" : "0 0 8px rgba(237,66,69,0.3)"
        }, children: slideProgress > 0.7 ? "🔒" : /* @__PURE__ */ jsxRuntimeExports.jsx(FaMicrophone, { style: { color: "white", fontSize: "14px" } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.slideTrack, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: {
          ...styles.slideTrackFill,
          height: `${slideProgress * 100}%`,
          backgroundColor: slideProgress > 0.7 ? "#43b581" : "#ed4245"
        } }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: {
          ...styles.slideLabel,
          color: slideProgress > 0.7 ? "#43b581" : "#72767d"
        }, children: slideProgress > 0.7 ? "Bırak → Kilitle" : "↑ Kilitle" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.lockedActions, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.lockedBadge, children: [
          "🔒",
          " Kilitlendi"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: cancelRecording, style: styles.cancelRecButton, title: "İptal", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}),
          " ",
          "İ",
          "ptal"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: stopRecording, style: styles.sendVoiceButton, title: "Gönder", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaperPlane, {}),
          " G",
          "ö",
          "nder"
        ] })
      ] })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      onClick: handleSubmit,
      style: styles.sendButton,
      title: "Gönder (Enter)",
      disabled,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaperPlane, {})
    }
  );
}, "VoiceRecordingUI");
const VoiceRecordingUI$1 = React.memo(VoiceRecordingUI);
const useMessageDraft = /* @__PURE__ */ __name((activeChat, fetchWithAuth, apiBaseUrl, message, setMessage) => {
  const [draftSaved, setDraftSaved] = reactExports.useState(false);
  const draftTimerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!activeChat || !fetchWithAuth || !apiBaseUrl) return;
    if (activeChat.type !== "room" && activeChat.type !== "dm") return;
    const loadDraft = /* @__PURE__ */ __name(async () => {
      try {
        const chatKey = activeChat.type === "room" ? `room_${activeChat.id}` : `dm_${activeChat.id}`;
        const response = await fetchWithAuth(`${apiBaseUrl}/api/drafts/${chatKey}/`);
        if (response.ok) {
          const data = await response.json();
          if (data.content) {
            setMessage(data.content);
            setDraftSaved(true);
          }
        }
      } catch (error) {
      }
    }, "loadDraft");
    loadDraft();
  }, [activeChat, fetchWithAuth, apiBaseUrl, setMessage]);
  reactExports.useEffect(() => {
    if (!activeChat || !fetchWithAuth || !apiBaseUrl) return;
    if (activeChat.type !== "room" && activeChat.type !== "dm") return;
    if (!message.trim()) return;
    if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    draftTimerRef.current = setTimeout(async () => {
      try {
        const chatKey = activeChat.type === "room" ? `room_${activeChat.id}` : `dm_${activeChat.id}`;
        await fetchWithAuth(`${apiBaseUrl}/api/drafts/save/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_key: chatKey, content: message })
        });
        setDraftSaved(true);
        setTimeout(() => setDraftSaved(false), 1e3);
      } catch (error) {
      }
    }, 2e3);
    return () => {
      if (draftTimerRef.current) clearTimeout(draftTimerRef.current);
    };
  }, [message, activeChat, fetchWithAuth, apiBaseUrl]);
  const clearDraft = /* @__PURE__ */ __name(() => {
    if (activeChat && fetchWithAuth && apiBaseUrl && (activeChat.type === "room" || activeChat.type === "dm")) {
      const chatKey = activeChat.type === "room" ? `room_${activeChat.id}` : `dm_${activeChat.id}`;
      fetchWithAuth(`${apiBaseUrl}/api/drafts/${chatKey}/`, { method: "DELETE" }).catch(console.error);
    }
  }, "clearDraft");
  return { draftSaved, clearDraft };
}, "useMessageDraft");
const GifPicker = reactExports.lazy(() => __vitePreload(() => import("./GifPicker-DRHla4ZE.js"), true ? __vite__mapDeps([0,1]) : void 0));
const MessageInput = /* @__PURE__ */ __name(({
  onSendMessage,
  onFileUpload,
  onShowCodeSnippet = null,
  placeholder = "Mesaj yaz...",
  editingMessage = null,
  onCancelEdit = null,
  replyingTo = null,
  onCancelReply = null,
  disabled = false,
  activeChat = null,
  fetchWithAuth = null,
  apiBaseUrl = "",
  pendingFilesFromDrop = [],
  onClearPendingFiles = null
}) => {
  useMeasurePerformance();
  const [message, setMessage] = reactExports.useState("");
  const [showEmojiPicker, setShowEmojiPicker] = reactExports.useState(false);
  const [showGifPicker, setShowGifPicker] = reactExports.useState(false);
  const [showTemplates, setShowTemplates] = reactExports.useState(false);
  const [showScheduled, setShowScheduled] = reactExports.useState(false);
  const [showMarkdownPreview, setShowMarkdownPreview] = reactExports.useState(false);
  const [showMobileMenu, setShowMobileMenu] = reactExports.useState(false);
  const [pendingFiles, setPendingFiles] = reactExports.useState([]);
  const [cursorPos, setCursorPos] = reactExports.useState(0);
  const {
    isRecording,
    isRecordingLocked,
    recordingTime,
    slideProgress,
    micButtonRef,
    handleMicMouseDown,
    handleMicTouchStart,
    stopRecording,
    cancelRecording,
    formatTime
  } = useVoiceRecording(onFileUpload);
  const { isDragging, dragHandlers } = useDragDrop((files) => {
    const processedFiles = files.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: file.type.startsWith("image/") || file.type.startsWith("video/") ? URL.createObjectURL(file) : null
    }));
    setPendingFiles((prev) => [...prev, ...processedFiles]);
  });
  const onlineUsers = useChatStore((state) => state.onlineUsers);
  useDebounce(message, 500);
  const textareaRef = reactExports.useRef(null);
  const { draftSaved, clearDraft } = useMessageDraft(activeChat, fetchWithAuth, apiBaseUrl, message, setMessage);
  reactExports.useEffect(() => {
    if (window.Capacitor) {
      const el = textareaRef.current;
      const handleFocus = /* @__PURE__ */ __name(() => {
        document.body.style.position = "fixed";
        document.body.style.width = "100%";
      }, "handleFocus");
      const handleBlur = /* @__PURE__ */ __name(() => {
        document.body.style.position = "";
        document.body.style.width = "";
      }, "handleBlur");
      el?.addEventListener("focus", handleFocus);
      el?.addEventListener("blur", handleBlur);
      return () => {
        el?.removeEventListener("focus", handleFocus);
        el?.removeEventListener("blur", handleBlur);
      };
    }
  }, []);
  reactExports.useEffect(() => {
    if (editingMessage) {
      setMessage(editingMessage.content || "");
      textareaRef.current?.focus();
    }
  }, [editingMessage]);
  reactExports.useEffect(() => {
    const handleClickOutside = /* @__PURE__ */ __name((e) => {
      if (showMobileMenu && !e.target.closest(".mobile-menu-container") && !e.target.closest("button")) setShowMobileMenu(false);
    }, "handleClickOutside");
    if (showMobileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [showMobileMenu]);
  reactExports.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + "px";
      if (window.Capacitor && textareaRef.current === document.activeElement)
        setTimeout(() => textareaRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 100);
    }
  }, [message]);
  reactExports.useEffect(() => {
    setPendingFiles([]);
  }, [activeChat?.id, activeChat?.type]);
  reactExports.useEffect(() => {
    if (pendingFilesFromDrop?.length > 0) {
      if (onClearPendingFiles) onClearPendingFiles();
      setPendingFiles((prev) => [...prev, ...pendingFilesFromDrop]);
    }
  }, [pendingFilesFromDrop, onClearPendingFiles]);
  const sendPendingFiles = reactExports.useCallback(async (filesToSend) => {
    if (!filesToSend?.length) return;
    for (const pf of filesToSend) {
      const file = pf.file;
      if (file.type.startsWith("image/")) {
        try {
          const compressed = await compressChatImage(file);
          const compressedFile = new File([compressed], file.name, { type: "image/webp" });
          if (onFileUpload) await onFileUpload(compressedFile);
        } catch {
          if (onFileUpload) await onFileUpload(file);
        }
      } else {
        if (onFileUpload) await onFileUpload(file);
      }
      if (pf.previewUrl) URL.revokeObjectURL(pf.previewUrl);
    }
    if (filesToSend.length > 1) toast.success(`$([char]0x2705) ${filesToSend.length} dosya y$([char]0x00FC)kleniyor...`);
  }, [onFileUpload]);
  const handleSubmit = reactExports.useCallback(async (e) => {
    e?.preventDefault();
    const trimmed = message.trim();
    if (pendingFiles.length > 0) {
      const toSend = [...pendingFiles];
      setPendingFiles([]);
      await sendPendingFiles(toSend);
    }
    if (!trimmed && pendingFiles.length === 0) return;
    if (disabled) return;
    if (trimmed) {
      onSendMessage(trimmed);
      setMessage("");
    }
    clearDraft();
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }, [message, disabled, onSendMessage, pendingFiles, sendPendingFiles, clearDraft]);
  const handleKeyDown = reactExports.useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
    if (e.key === "ArrowUp" && !message.trim() && !editingMessage) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("pawscord:editLastMessage"));
    }
    if (e.ctrlKey && e.key === "t") {
      e.preventDefault();
      setShowTemplates(true);
    }
    if (e.key === "Escape") {
      if (editingMessage && onCancelEdit) onCancelEdit();
      if (replyingTo && onCancelReply) onCancelReply();
    }
  }, [editingMessage, onCancelEdit, replyingTo, onCancelReply, handleSubmit, message]);
  const handleEmojiSelect = reactExports.useCallback((emoji) => {
    const ta = textareaRef.current;
    const s = ta.selectionStart;
    const end = ta.selectionEnd;
    setMessage(message.substring(0, s) + emoji + message.substring(end));
    setTimeout(() => {
      ta.selectionStart = ta.selectionEnd = s + emoji.length;
      ta.focus();
    }, 0);
    setShowEmojiPicker(false);
  }, [message]);
  const handleGifSelect = reactExports.useCallback((gifUrl) => {
    onSendMessage(`[GIF:${gifUrl}]`);
    setShowGifPicker(false);
  }, [onSendMessage]);
  const removePendingFile = reactExports.useCallback((fileId) => {
    setPendingFiles((prev) => {
      const f = prev.find((x) => x.id === fileId);
      if (f?.previewUrl) URL.revokeObjectURL(f.previewUrl);
      return prev.filter((x) => x.id !== fileId);
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.container, ...dragHandlers, children: [
    isDragging && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.dragOverlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.dragContent, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FaPaperclip, { style: { fontSize: "48px" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Dosyalar$([char]0x0131) buraya b$([char]0x0131)rak" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "$([char]0x00C7)oklu dosya y$([char]0x00FC)klemesi destekleniyor" })
    ] }) }),
    replyingTo && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.replyPreview, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.replyContent, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
          "@",
          replyingTo.author
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          replyingTo.content?.substring(0, 50),
          "..."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onCancelReply, style: styles.cancelButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    editingMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.editPreview, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "📝",
        " Mesaj d$([char]0x00FC)zenleniyor"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onCancelEdit, style: styles.cancelButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    draftSaved && !editingMessage && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.draftSaved, children: [
      "✅",
      " Taslak kaydedildi"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PendingFilesPreview$1, { pendingFiles, setPendingFiles, removePendingFile }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.inputWrapper, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputMenu$1,
        {
          showMobileMenu,
          setShowMobileMenu,
          setShowEmojiPicker,
          setShowGifPicker,
          setShowTemplates,
          setShowScheduled,
          onShowCodeSnippet,
          disabled,
          message,
          setPendingFiles,
          showEmojiPicker,
          showGifPicker
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MarkdownPreviewToggle$1,
        {
          text: message,
          isPreviewMode: showMarkdownPreview,
          onToggle: /* @__PURE__ */ __name(() => setShowMarkdownPreview((prev) => !prev), "onToggle")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        ChatAutocomplete$1,
        {
          message,
          cursorPosition: cursorPos,
          users: onlineUsers || [],
          channels: activeChat?.rooms || [],
          textareaRef,
          onSelect: /* @__PURE__ */ __name((newText, newCursorPos) => {
            setMessage(newText);
            setCursorPos(newCursorPos);
            setTimeout(() => {
              if (textareaRef.current) {
                textareaRef.current.selectionStart = newCursorPos;
                textareaRef.current.selectionEnd = newCursorPos;
                textareaRef.current.focus();
              }
            }, 0);
          }, "onSelect")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          ref: textareaRef,
          value: message,
          onChange: /* @__PURE__ */ __name((e) => {
            setMessage(e.target.value);
            setCursorPos(e.target.selectionStart);
          }, "onChange"),
          onKeyDown: handleKeyDown,
          onSelect: /* @__PURE__ */ __name((e) => setCursorPos(e.target.selectionStart), "onSelect"),
          onKeyUp: /* @__PURE__ */ __name((e) => setCursorPos(e.target.selectionStart), "onKeyUp"),
          onPaste: /* @__PURE__ */ __name((e) => {
            const items = e.clipboardData?.items;
            if (!items) return;
            const imageItems = Array.from(items).filter((i) => i.type.startsWith("image/"));
            if (imageItems.length > 0) {
              e.preventDefault();
              imageItems.forEach((item) => {
                const file = item.getAsFile();
                if (file) setPendingFiles((prev) => [...prev, { file, previewUrl: URL.createObjectURL(file), name: file.name || "pasted-image.png", size: file.size, type: file.type }]);
              });
              toast.success(`$([char]0xD83D)$([char]0xDCCB) G$([char]0x00F6)rsel yap$([char]0x0131)$([char]0x015F)t$([char]0x0131)r$([char]0x0131)ld$([char]0x0131)!`);
            }
          }, "onPaste"),
          placeholder,
          style: styles.textarea,
          disabled,
          rows: 1
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.rightActions, children: [
        showEmojiPicker && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.pickerWrapper, children: /* @__PURE__ */ jsxRuntimeExports.jsx(EmojiPicker$1, { onSelect: handleEmojiSelect }) }),
        showGifPicker && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.pickerWrapper, children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { padding: "20px", textAlign: "center", color: "#b9bbbe" }, children: "GIF y$([char]0x00FC)kleniyor..." }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          GifPicker,
          {
            onSelect: handleGifSelect,
            onClose: /* @__PURE__ */ __name(() => setShowGifPicker(false), "onClose"),
            localGifListUrl: `${apiBaseUrl || window.location.origin + "/api"}/gifs/list_local/`,
            absoluteHostUrl: window.location.origin,
            fetchWithAuth
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          VoiceRecordingUI$1,
          {
            isRecording,
            isRecordingLocked,
            recordingTime,
            slideProgress,
            micButtonRef,
            handleMicMouseDown,
            handleMicTouchStart,
            stopRecording,
            cancelRecording,
            formatTime,
            handleSubmit,
            disabled,
            hasContent: !!message.trim(),
            pendingFilesCount: pendingFiles.length
          }
        )
      ] })
    ] }),
    showTemplates && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MessageTemplateModal,
      {
        onClose: /* @__PURE__ */ __name(() => setShowTemplates(false), "onClose"),
        onSelect: /* @__PURE__ */ __name((t) => {
          setMessage(t);
          setShowTemplates(false);
        }, "onSelect")
      }
    ),
    showScheduled && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScheduledMessageModal,
      {
        message,
        room: activeChat,
        onClose: /* @__PURE__ */ __name(() => setShowScheduled(false), "onClose"),
        onSchedule: /* @__PURE__ */ __name(() => {
          setShowScheduled(false);
          setMessage("");
        }, "onSchedule")
      }
    )
  ] });
}, "MessageInput");
const MessageInput_default = React.memo(MessageInput, (prevProps, nextProps) => {
  return prevProps.disabled === nextProps.disabled && prevProps.placeholder === nextProps.placeholder && prevProps.editingMessage?.id === nextProps.editingMessage?.id && prevProps.replyingTo?.id === nextProps.replyingTo?.id && prevProps.activeChat?.id === nextProps.activeChat?.id;
});
export {
  MessageInput_default as default
};
