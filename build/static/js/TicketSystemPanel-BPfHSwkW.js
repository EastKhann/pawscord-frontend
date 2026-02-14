var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { y } from "./ui-vendor-iPoN0WGz.js";
import { d as confirmDialog, g as getApiBase } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
const useTicketSystem = /* @__PURE__ */ __name((serverId) => {
  const apiBaseUrl = getApiBase();
  const authHeader = /* @__PURE__ */ __name(() => ({
    "Authorization": `Bearer ${localStorage.getItem("access_token")}`
  }), "authHeader");
  const [tickets, setTickets] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [config, setConfig] = reactExports.useState({
    enabled: false,
    category_id: "",
    support_role_id: "",
    max_tickets_per_user: 3,
    auto_close_after: 48,
    transcript_channel_id: "",
    welcome_message: "Merhaba! Destek ekibimiz en kısa sürede size yardımcı olacak."
  });
  const [categories, setCategories] = reactExports.useState([]);
  const [roles, setRoles] = reactExports.useState([]);
  const [channels, setChannels] = reactExports.useState([]);
  const [selectedTicket, setSelectedTicket] = reactExports.useState(null);
  const [newMessage, setNewMessage] = reactExports.useState("");
  const fetchConfig = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/server/${serverId}/config/`, {
        headers: authHeader()
      });
      if (response.ok) setConfig(await response.json());
    } catch (error) {
      console.error("Error fetching config:", error);
    }
  }, "fetchConfig");
  const fetchTickets = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/server/${serverId}/`, {
        headers: authHeader()
      });
      if (response.ok) setTickets(await response.json());
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchTickets");
  const fetchCategories = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/categories/`, {
        headers: authHeader()
      });
      if (response.ok) setCategories(await response.json());
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, "fetchCategories");
  const fetchRoles = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, {
        headers: authHeader()
      });
      if (response.ok) setRoles(await response.json());
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  }, "fetchRoles");
  const fetchChannels = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
        headers: authHeader()
      });
      if (response.ok) {
        const data = await response.json();
        setChannels(data.filter((ch) => ch.type === "text"));
      }
    } catch (error) {
      console.error("Error fetching channels:", error);
    }
  }, "fetchChannels");
  reactExports.useEffect(() => {
    fetchConfig();
    fetchTickets();
    fetchCategories();
    fetchRoles();
    fetchChannels();
  }, [serverId]);
  const updateConfig = /* @__PURE__ */ __name(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/server/${serverId}/config/update/`, {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(config)
      });
      if (response.ok) y.success("✅ Ayarlar güncellendi");
      else y.error("❌ Ayarlar güncellenemedi");
    } catch (error) {
      console.error("Error updating config:", error);
      y.error("❌ Bağlantı hatası");
    }
  }, "updateConfig");
  const closeTicket = /* @__PURE__ */ __name(async (ticketId) => {
    if (!await confirmDialog("Ticket'ı kapatmak istediğinize emin misiniz?")) return;
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/close/`, {
        method: "POST",
        headers: authHeader()
      });
      if (response.ok) {
        y.success("✅ Ticket kapatıldı");
        fetchTickets();
        if (selectedTicket?.id === ticketId) setSelectedTicket(null);
      } else {
        y.error("❌ Ticket kapatılamadı");
      }
    } catch (error) {
      console.error("Error closing ticket:", error);
      y.error("❌ Bağlantı hatası");
    }
  }, "closeTicket");
  const assignTicket = /* @__PURE__ */ __name(async (ticketId, userId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/assign/`, {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId })
      });
      if (response.ok) {
        y.success("✅ Ticket atandı");
        fetchTickets();
      } else y.error("❌ Ticket atanamadı");
    } catch (error) {
      console.error("Error assigning ticket:", error);
      y.error("❌ Bağlantı hatası");
    }
  }, "assignTicket");
  const setPriority = /* @__PURE__ */ __name(async (ticketId, priority) => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/priority/`, {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify({ priority })
      });
      if (response.ok) {
        y.success("✅ Öncelik güncellendi");
        fetchTickets();
      } else y.error("❌ Öncelik güncellenemedi");
    } catch (error) {
      console.error("Error setting priority:", error);
      y.error("❌ Bağlantı hatası");
    }
  }, "setPriority");
  const sendMessage = /* @__PURE__ */ __name(async () => {
    if (!newMessage.trim()) return;
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${selectedTicket.id}/reply/`, {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage })
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedTicket({
          ...selectedTicket,
          messages: [...selectedTicket.messages || [], data.message]
        });
        setNewMessage("");
        y.success("✅ Mesaj gönderildi");
      } else {
        y.error("❌ Mesaj gönderilemedi");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      y.error("❌ Bağlantı hatası");
    }
  }, "sendMessage");
  const exportTranscript = /* @__PURE__ */ __name(async (ticketId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/transcript/`, {
        headers: authHeader()
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ticket-${ticketId}-transcript.txt`;
        a.click();
        y.success("✅ Transcript indirildi");
      } else {
        y.error("❌ Transcript indirilemedi");
      }
    } catch (error) {
      console.error("Error exporting transcript:", error);
      y.error("❌ Bağlantı hatası");
    }
  }, "exportTranscript");
  const getStatusBadge = /* @__PURE__ */ __name((status) => {
    const badges = {
      open: { text: "Açık", color: "#10b981" },
      assigned: { text: "Atandı", color: "#f59e0b" },
      closed: { text: "Kapalı", color: "#6b7280" }
    };
    return badges[status] || badges.open;
  }, "getStatusBadge");
  const getPriorityBadge = /* @__PURE__ */ __name((priority) => {
    const badges = {
      low: { text: "Düşük", color: "#10b981" },
      medium: { text: "Orta", color: "#f59e0b" },
      high: { text: "Yüksek", color: "#ef4444" },
      urgent: { text: "Acil", color: "#dc2626" }
    };
    return badges[priority] || badges.medium;
  }, "getPriorityBadge");
  const formatDate = /* @__PURE__ */ __name((dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("tr-TR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  }, "formatDate");
  return {
    tickets,
    loading,
    config,
    setConfig,
    categories,
    roles,
    channels,
    selectedTicket,
    setSelectedTicket,
    newMessage,
    setNewMessage,
    updateConfig,
    closeTicket,
    assignTicket,
    setPriority,
    sendMessage,
    exportTranscript,
    getStatusBadge,
    getPriorityBadge,
    formatDate
  };
}, "useTicketSystem");
const TicketConfig = /* @__PURE__ */ __name(({ config, setConfig, categories, roles, channels, updateConfig }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticket-config-section", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
    "⚙️",
    " Sistem Ayarları"
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-grid", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "config-item", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "toggle-label", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "checkbox",
          checked: config.enabled,
          onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, enabled: e.target.checked }), "onChange")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-switch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "toggle-text", children: "Ticket Sistemi Aktif" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Ticket Kategorisi" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: config.category_id,
          onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, category_id: e.target.value }), "onChange"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Kategori Seçin" }),
            categories.map((cat) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: cat.id, children: cat.name }, cat.id))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Destek Rolü" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: config.support_role_id,
          onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, support_role_id: e.target.value }), "onChange"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Rol Seçin" }),
            roles.map((role) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: role.id, children: role.name }, role.id))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Kullanıcı Başına Max Ticket" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          min: "1",
          max: "10",
          value: config.max_tickets_per_user,
          onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, max_tickets_per_user: parseInt(e.target.value) }), "onChange")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Otomatik Kapanma (Saat)" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          min: "1",
          max: "168",
          value: config.auto_close_after,
          onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, auto_close_after: parseInt(e.target.value) }), "onChange")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Transcript Kanalı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          value: config.transcript_channel_id,
          onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, transcript_channel_id: e.target.value }), "onChange"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Kanal Seçin (Opsiyonel)" }),
            channels.map((channel) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: channel.id, children: [
              "# ",
              channel.name
            ] }, channel.id))
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "config-item full-width", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { children: "Hoş Geldin Mesajı" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: config.welcome_message,
          onChange: /* @__PURE__ */ __name((e) => setConfig({ ...config, welcome_message: e.target.value }), "onChange"),
          rows: "3"
        }
      )
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "save-config-btn", onClick: updateConfig, children: [
    "💾",
    " Ayarları Kaydet"
  ] })
] }), "TicketConfig");
const TicketDetail = /* @__PURE__ */ __name(({ ticket, onClose, newMessage, setNewMessage, sendMessage, exportTranscript, closeTicket, formatDate }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ticket-detail-modal", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticket-detail-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-header", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ticket-id-large", children: [
        "#",
        ticket.id
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: ticket.subject || "Destek Talebi" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-body", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "messages-container", children: ticket.messages?.map((msg, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "message-item", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "message-author", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "author-name", children: msg.author }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "message-time", children: formatDate(msg.created_at) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "message-content", children: msg.content })
    ] }, index)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "message-input-container", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Mesajınızı yazın...",
          value: newMessage,
          onChange: /* @__PURE__ */ __name((e) => setNewMessage(e.target.value), "onChange"),
          onKeyPress: /* @__PURE__ */ __name((e) => e.key === "Enter" && sendMessage(), "onKeyPress")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "send-btn", onClick: sendMessage, children: [
        "📤",
        " Gönder"
      ] })
    ] })
  ] }),
  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "detail-footer", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "export-btn", onClick: /* @__PURE__ */ __name(() => exportTranscript(ticket.id), "onClick"), children: [
      "📄",
      " Transcript İndir"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "close-ticket-btn-large", onClick: /* @__PURE__ */ __name(() => closeTicket(ticket.id), "onClick"), children: [
      "✓",
      " Ticket'ı Kapat"
    ] })
  ] })
] }) }), "TicketDetail");
const TicketSystemPanel = /* @__PURE__ */ __name(({ serverId, onClose }) => {
  const t = useTicketSystem(serverId);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ticket-panel-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticket-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticket-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { children: [
        "🎫",
        " Destek Sistemi"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "×" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticket-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TicketConfig,
        {
          config: t.config,
          setConfig: t.setConfig,
          categories: t.categories,
          roles: t.roles,
          channels: t.channels,
          updateConfig: t.updateConfig
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tickets-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          "📋",
          " Aktif Ticket",
          "’",
          "lar"
        ] }),
        t.loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "Ticket",
            "’",
            "lar yükleniyor..."
          ] })
        ] }) : t.tickets.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "empty-state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "empty-icon", children: "🎫" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Henüz ticket yok" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "empty-hint", children: "Kullanıcılar ticket oluşturduğunda burada görünecek" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tickets-grid", children: t.tickets.map((ticket) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticket-card", onClick: /* @__PURE__ */ __name(() => t.setSelectedTicket(ticket), "onClick"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticket-card-header", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticket-info", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ticket-id", children: [
                "#",
                ticket.id
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: ticket.subject || "Destek Talebi" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticket-badges", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-badge", style: { background: t.getStatusBadge(ticket.status).color }, children: t.getStatusBadge(ticket.status).text }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "priority-badge", style: { background: t.getPriorityBadge(ticket.priority).color }, children: t.getPriorityBadge(ticket.priority).text })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticket-meta", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "meta-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "meta-label", children: "Oluşturan:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "meta-value", children: ticket.creator_username })
            ] }),
            ticket.assigned_to && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "meta-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "meta-label", children: "Atanan:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "meta-value", children: ticket.assigned_to_username })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "meta-item", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "meta-label", children: "Oluşturulma:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "meta-value", children: t.formatDate(ticket.created_at) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ticket-actions-quick", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "priority-btn", onClick: /* @__PURE__ */ __name((e) => {
              e.stopPropagation();
              const priorities = ["low", "medium", "high", "urgent"];
              const currentIndex = priorities.indexOf(ticket.priority);
              t.setPriority(ticket.id, priorities[(currentIndex + 1) % priorities.length]);
            }, "onClick"), children: [
              "🏷️",
              " Öncelik"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "close-ticket-btn", onClick: /* @__PURE__ */ __name((e) => {
              e.stopPropagation();
              t.closeTicket(ticket.id);
            }, "onClick"), children: [
              "✓",
              " Kapat"
            ] })
          ] })
        ] }, ticket.id)) })
      ] })
    ] }),
    t.selectedTicket && /* @__PURE__ */ jsxRuntimeExports.jsx(
      TicketDetail,
      {
        ticket: t.selectedTicket,
        onClose: /* @__PURE__ */ __name(() => t.setSelectedTicket(null), "onClose"),
        newMessage: t.newMessage,
        setNewMessage: t.setNewMessage,
        sendMessage: t.sendMessage,
        exportTranscript: t.exportTranscript,
        closeTicket: t.closeTicket,
        formatDate: t.formatDate
      }
    )
  ] }) });
}, "TicketSystemPanel");
export {
  TicketSystemPanel as default
};
