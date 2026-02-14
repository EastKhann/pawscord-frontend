var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./icons-vendor-2VDeY8fW.js";
import "./ui-vendor-iPoN0WGz.js";
const ForumPanel = /* @__PURE__ */ __name(({ serverId, apiBaseUrl, onClose }) => {
  const [forums, setForums] = reactExports.useState([]);
  const [selectedForum, setSelectedForum] = reactExports.useState(null);
  const [posts, setPosts] = reactExports.useState([]);
  const [selectedPost, setSelectedPost] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const [creating, setCreating] = reactExports.useState(false);
  const [showCreatePost, setShowCreatePost] = reactExports.useState(false);
  const [newPost, setNewPost] = reactExports.useState({ title: "", content: "", tags: [] });
  const [replyContent, setReplyContent] = reactExports.useState("");
  reactExports.useEffect(() => {
    fetchForums();
  }, [serverId]);
  reactExports.useEffect(() => {
    if (selectedForum) {
      fetchPosts(selectedForum.id);
    }
  }, [selectedForum]);
  const fetchForums = /* @__PURE__ */ __name(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/servers/${serverId}/forums/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setForums(Array.isArray(data) ? data : data.forums || []);
      }
    } catch (error) {
      console.error("Forum fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, "fetchForums");
  const fetchPosts = /* @__PURE__ */ __name(async (forumId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/forums/${forumId}/posts/`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : data.posts || []);
      }
    } catch (error) {
      console.error("Posts fetch error:", error);
    }
  }, "fetchPosts");
  const handleCreateForum = /* @__PURE__ */ __name(async () => {
    const name = prompt("Forum kanalı adı:");
    if (!name) return;
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/servers/${serverId}/forums/create/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name })
      });
      if (response.ok) {
        const data = await response.json();
        setForums([...forums, data.forum]);
        toast.success("✅ Forum oluşturuldu!");
      } else {
        toast.error("❌ Forum oluşturulamadı");
      }
    } catch (error) {
      console.error("Forum creation error:", error);
      toast.error("❌ Hata oluştu");
    }
  }, "handleCreateForum");
  const handleCreatePost = /* @__PURE__ */ __name(async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      toast.error("⚠️ Başlık ve içerik gerekli");
      return;
    }
    setCreating(true);
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/forums/${selectedForum.id}/posts/create/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newPost)
      });
      if (response.ok) {
        const data = await response.json();
        setPosts([data.post, ...posts]);
        setNewPost({ title: "", content: "", tags: [] });
        setShowCreatePost(false);
        toast.success("✅ Gönderi oluşturuldu!");
      } else {
        toast.error("❌ Gönderi oluşturulamadı");
      }
    } catch (error) {
      console.error("Post creation error:", error);
      toast.error("❌ Hata oluştu");
    } finally {
      setCreating(false);
    }
  }, "handleCreatePost");
  const handleReply = /* @__PURE__ */ __name(async (postId) => {
    if (!replyContent.trim()) {
      toast.error("⚠️ Yanıt içeriği gerekli");
      return;
    }
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/forums/posts/${postId}/reply/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: replyContent })
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedPost({ ...selectedPost, replies: [...selectedPost.replies || [], data.reply] });
        setReplyContent("");
        toast.success("✅ Yanıt gönderildi!");
      } else {
        toast.error("❌ Yanıt gönderilemedi");
      }
    } catch (error) {
      console.error("Reply error:", error);
      toast.error("❌ Hata oluştu");
    }
  }, "handleReply");
  const handleVote = /* @__PURE__ */ __name(async (postId, voteType) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/forums/posts/${postId}/vote/`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ vote_type: voteType })
      });
      if (response.ok) {
        const data = await response.json();
        setPosts(posts.map((p) => p.id === postId ? { ...p, votes: data.votes } : p));
        toast.success(voteType === "up" ? "👍 Upvote!" : "👎 Downvote!");
      }
    } catch (error) {
      console.error("Vote error:", error);
    }
  }, "handleVote");
  const handleMarkSolution = /* @__PURE__ */ __name(async (postId, replyId) => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await fetch(`${apiBaseUrl}/forums/posts/${postId}/solve/${replyId}/`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (response.ok) {
        toast.success("✅ Çözüm olarak işaretlendi!");
        setSelectedPost({ ...selectedPost, solution_id: replyId });
      }
    } catch (error) {
      console.error("Mark solution error:", error);
    }
  }, "handleMarkSolution");
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "forum-panel-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "forum-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "forum-loading", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "spinner" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Yükleniyor..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "forum-panel-overlay", onClick: onClose, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "forum-panel", onClick: /* @__PURE__ */ __name((e) => e.stopPropagation(), "onClick"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "forum-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "💬 Forum" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "close-btn", onClick: onClose, children: "✕" })
    ] }),
    !selectedForum ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "forum-list", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "forum-list-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Forum Kanalları" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "create-forum-btn", onClick: handleCreateForum, children: "➕ Yeni Forum" })
      ] }),
      forums.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "forums-grid", children: forums.map((forum) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "forum-card",
          onClick: /* @__PURE__ */ __name(() => setSelectedForum(forum), "onClick"),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "forum-icon", children: "💬" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: forum.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "forum-stats", children: [
              forum.posts_count || 0,
              " gönderi • ",
              forum.members_count || 0,
              " üye"
            ] })
          ]
        },
        forum.id
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "no-forums", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "📋 Henüz forum kanalı yok" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleCreateForum, children: "İlk forumu oluştur" })
      ] })
    ] }) : !selectedPost ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "posts-view", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "posts-header", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "back-btn", onClick: /* @__PURE__ */ __name(() => setSelectedForum(null), "onClick"), children: "← Geri" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          "# ",
          selectedForum.name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "new-post-btn",
            onClick: /* @__PURE__ */ __name(() => setShowCreatePost(!showCreatePost), "onClick"),
            children: "➕ Yeni Gönderi"
          }
        )
      ] }),
      showCreatePost && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "create-post-form", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Gönderi başlığı...",
            value: newPost.title,
            onChange: /* @__PURE__ */ __name((e) => setNewPost({ ...newPost, title: e.target.value }), "onChange"),
            maxLength: 200
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            placeholder: "İçerik...",
            value: newPost.content,
            onChange: /* @__PURE__ */ __name((e) => setNewPost({ ...newPost, content: e.target.value }), "onChange"),
            rows: 6
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-actions", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "submit-btn",
              onClick: handleCreatePost,
              disabled: creating,
              children: creating ? "⏳ Gönderiliyor..." : "📤 Gönder"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "cancel-btn",
              onClick: /* @__PURE__ */ __name(() => setShowCreatePost(false), "onClick"),
              children: "İptal"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "posts-list", children: [
        posts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "post-item",
            onClick: /* @__PURE__ */ __name(() => setSelectedPost(post), "onClick"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "post-votes", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name((e) => {
                  e.stopPropagation();
                  handleVote(post.id, "up");
                }, "onClick"), children: "👍" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: post.votes || 0 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name((e) => {
                  e.stopPropagation();
                  handleVote(post.id, "down");
                }, "onClick"), children: "👎" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "post-content", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: post.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "post-meta", children: [
                  "👤 ",
                  post.author,
                  " • ⏰ ",
                  new Date(post.created_at).toLocaleDateString("tr-TR"),
                  post.is_solved && " • ✅ Çözüldü"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "post-preview", children: [
                  post.content?.substring(0, 150),
                  "..."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "post-stats", children: [
                  "💬 ",
                  post.replies_count || 0,
                  " yanıt"
                ] })
              ] })
            ]
          },
          post.id
        )),
        posts.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "no-posts", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "📭 Henüz gönderi yok" }) })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "post-detail", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "detail-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "back-btn", onClick: /* @__PURE__ */ __name(() => setSelectedPost(null), "onClick"), children: "← Geri" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "post-main", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "post-votes-vertical", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => handleVote(selectedPost.id, "up"), "onClick"), children: "👍" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: selectedPost.votes || 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => handleVote(selectedPost.id, "down"), "onClick"), children: "👎" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "post-body", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: selectedPost.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "post-meta", children: [
            "👤 ",
            selectedPost.author,
            " • ⏰ ",
            new Date(selectedPost.created_at).toLocaleString("tr-TR")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "post-text", children: selectedPost.content })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "replies-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { children: [
          "💬 Yanıtlar (",
          selectedPost.replies?.length || 0,
          ")"
        ] }),
        (selectedPost.replies || []).map((reply) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `reply-item ${reply.id === selectedPost.solution_id ? "solution" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reply-header", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "reply-author", children: [
                  "👤 ",
                  reply.author
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "reply-time", children: new Date(reply.created_at).toLocaleString("tr-TR") }),
                reply.id === selectedPost.solution_id && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "solution-badge", children: "✅ Çözüm" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "reply-content", children: reply.content }),
              !selectedPost.solution_id && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  className: "mark-solution-btn",
                  onClick: /* @__PURE__ */ __name(() => handleMarkSolution(selectedPost.id, reply.id), "onClick"),
                  children: "✅ Çözüm olarak işaretle"
                }
              )
            ]
          },
          reply.id
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "reply-form", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "textarea",
            {
              placeholder: "Yanıtınızı yazın...",
              value: replyContent,
              onChange: /* @__PURE__ */ __name((e) => setReplyContent(e.target.value), "onChange"),
              rows: 4
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "reply-submit-btn",
              onClick: /* @__PURE__ */ __name(() => handleReply(selectedPost.id), "onClick"),
              children: "📤 Yanıtla"
            }
          )
        ] })
      ] })
    ] })
  ] }) });
}, "ForumPanel");
export {
  ForumPanel as default
};
