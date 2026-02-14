var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
function ToastDemo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "toast-demo-container", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toast-demo-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "🎉 Toast Notification Demo" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Modern bildirim sistemi - Alert'in yerine kullanılıyor" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toast-demo-grid", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toast-demo-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "✅ Success Toast" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Başarılı işlemler için kullan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "demo-btn success",
            onClick: /* @__PURE__ */ __name(() => toast.success("İşlem başarıyla tamamlandı!"), "onClick"),
            children: "Success Toast Göster"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "code-example", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "toast.success('Mesaj');" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toast-demo-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "❌ Error Toast" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Hata mesajları için kullan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "demo-btn error",
            onClick: /* @__PURE__ */ __name(() => toast.error("Bir hata oluştu! Lütfen tekrar deneyin."), "onClick"),
            children: "Error Toast Göster"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "code-example", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "toast.error('Hata mesajı');" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toast-demo-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "⚠️ Warning Toast" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Uyarı mesajları için kullan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "demo-btn warning",
            onClick: /* @__PURE__ */ __name(() => toast.warning("Dikkat! Bu işlem geri alınamaz."), "onClick"),
            children: "Warning Toast Göster"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "code-example", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "toast.warning('Uyarı');" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toast-demo-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "ℹ️ Info Toast" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Bilgi mesajları için kullan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "demo-btn info",
            onClick: /* @__PURE__ */ __name(() => toast.info("Davet linki panoya kopyalandı!"), "onClick"),
            children: "Info Toast Göster"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "code-example", children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "toast.info('Bilgi');" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toast-demo-advanced", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🚀 İleri Düzey Örnekler" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "advanced-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "demo-btn-large",
            onClick: /* @__PURE__ */ __name(() => {
              toast.success("1. Toast");
              setTimeout(() => toast.info("2. Toast"), 500);
              setTimeout(() => toast.warning("3. Toast"), 1e3);
              setTimeout(() => toast.error("4. Toast"), 1500);
            }, "onClick"),
            children: "Çoklu Toast (4 adet)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "Birden fazla toast aynı anda gösterilebilir" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "advanced-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "demo-btn-large",
            onClick: /* @__PURE__ */ __name(() => toast.success("Bu toast 10 saniye kalacak!", 1e4), "onClick"),
            children: "Uzun Süreli Toast (10 saniye)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "toast.success('Mesaj', 10000);" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "advanced-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "demo-btn-large",
            onClick: /* @__PURE__ */ __name(() => toast.success("Çok uzun bir mesaj buraya yazılabilir. Toast otomatik olarak genişler ve tüm mesajı gösterir. Maksimum genişlik 500px olarak ayarlanmış durumda.", 5e3), "onClick"),
            children: "Uzun Mesajlı Toast"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "Uzun mesajlar otomatik wrap edilir" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toast-usage-guide", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "📚 Kullanım Kılavuzu" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "guide-step", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "1️⃣ Import Et" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: "import toast from '../utils/toast';" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "guide-step", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "2️⃣ Kullan" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: `// Basit kullanım
toast.success('İşlem başarılı!');
toast.error('Hata oluştu!');
toast.warning('Dikkat!');
toast.info('Bilgi mesajı');

// Özel süre (milisaniye)
toast.success('5 saniye kalacak', 5000);

// API response örneği
fetch('/api/data')
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      toast.success('Veri kaydedildi!');
    } else {
      toast.error(data.error);
    }
  })
  .catch(err => {
    toast.error('Bağlantı hatası: ' + err.message);
  });` }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "guide-step", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "3️⃣ Alert'i Değiştir" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("code", { children: `// ❌ ÖNCE (eski, çirkin)
alert('✅ Sunucu oluşturuldu!');
alert('❌ Hata: ' + error.message);

// ✅ SONRA (yeni, modern)
toast.success('Sunucu oluşturuldu!');
toast.error('Hata: ' + error.message);` }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "toast-features", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "✨ Özellikler" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "✅ ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Modern Tasarım:" }),
          " Smooth animasyonlar ve gradient renkler"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "✅ ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "4 Farklı Tip:" }),
          " Success, Error, Warning, Info"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "✅ ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Emoji İkonlar:" }),
          " Her tip için özel emoji"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "✅ ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Otomatik Kapanma:" }),
          " Varsayılan 3 saniye"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "✅ ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Manuel Kapatma:" }),
          " X butonuyla anında kapat"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "✅ ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Stack Yapı:" }),
          " Birden fazla toast üst üste"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "✅ ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Responsive:" }),
          " Mobilde de mükemmel görünür"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { children: [
          "✅ ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Kolay Kullanım:" }),
          " Tek satır kod"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "comparison-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "📊 Alert vs Toast Karşılaştırması" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Özellik" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Alert (Eski)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Toast (Yeni)" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("tbody", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "Görünüm" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "❌ Çirkin popup" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "✅ Modern bildirim" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "Animasyon" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "❌ Yok" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "✅ Smooth slide-in/out" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "Renk" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "❌ Gri/Beyaz (sistem)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "✅ 4 farklı renk tipi" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "Sayfa Engeli" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "❌ Sayfayı bloklar" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "✅ Arka planda çalışmaya devam" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "Çoklu Mesaj" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "❌ Tek seferde 1 tane" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "✅ Aynı anda birden fazla" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "Otomatik Kapanma" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "❌ Manuel kapatma gerekli" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "✅ Otomatik kaybolur" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "Mobil Uyum" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "❌ Kötü" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: "✅ Mükemmel responsive" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "live-test-area", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "🧪 Canlı Test Alanı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Kendi mesajını yaz ve test et!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "test-form", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            id: "customMessage",
            placeholder: "Mesajını buraya yaz...",
            defaultValue: "Merhaba Pawscord! 🐾"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "customType", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "success", children: "Success" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "error", children: "Error" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "warning", children: "Warning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "info", children: "Info" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "demo-btn-test",
            onClick: /* @__PURE__ */ __name(() => {
              const msg = document.getElementById("customMessage").value;
              const type = document.getElementById("customType").value;
              toast[type](msg);
            }, "onClick"),
            children: "Toast Göster 🚀"
          }
        )
      ] })
    ] })
  ] }) });
}
__name(ToastDemo, "ToastDemo");
export {
  ToastDemo as default
};
