var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { r as reactExports, j as jsxRuntimeExports } from "./react-core-BiY6fgAJ.js";
import { c9 as FaProjectDiagram, a as FaTimes, an as FaPlus, bs as FaFolder, bc as FaFile, u as FaUsers, z as FaClock, aB as FaHistory } from "./icons-vendor-2VDeY8fW.js";
import { t as toast } from "./index-DGqPEDt8.js";
import "./media-vendor-BRMiuG2Y.js";
import "./router-vendor-DrLUSS4j.js";
import "./state-vendor-BeEHnF_A.js";
import "./crypto-vendor-NANfm9jb.js";
import "./ui-vendor-iPoN0WGz.js";
const ProjectCollaborationPanel = /* @__PURE__ */ __name(({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
  const [projects, setProjects] = reactExports.useState([]);
  const [selectedProject, setSelectedProject] = reactExports.useState(null);
  const [documents, setDocuments] = reactExports.useState([]);
  const [selectedDoc, setSelectedDoc] = reactExports.useState(null);
  const [view, setView] = reactExports.useState("projects");
  const [loading, setLoading] = reactExports.useState(false);
  const [projectName, setProjectName] = reactExports.useState("");
  const [projectDesc, setProjectDesc] = reactExports.useState("");
  const [docTitle, setDocTitle] = reactExports.useState("");
  const [docContent, setDocContent] = reactExports.useState("");
  reactExports.useEffect(() => {
    fetchProjects();
  }, []);
  const fetchProjects = /* @__PURE__ */ __name(async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/projects/?server_id=${serverId}`);
      const data = await res.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  }, "fetchProjects");
  const fetchProject = /* @__PURE__ */ __name(async (projectId) => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/projects/${projectId}/`);
      const data = await res.json();
      setSelectedProject(data.project);
      setDocuments(data.documents || []);
      setView("project-detail");
    } catch (error) {
      toast.error("Failed to load project");
    }
  }, "fetchProject");
  const createProject = /* @__PURE__ */ __name(async () => {
    if (!projectName.trim()) {
      toast.error("Project name required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/projects/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: projectName,
          description: projectDesc,
          server_id: serverId
        })
      });
      const data = await res.json();
      if (data.project) {
        toast.success("Project created!");
        setProjectName("");
        setProjectDesc("");
        setView("projects");
        fetchProjects();
      }
    } catch (error) {
      toast.error("Failed to create project");
    } finally {
      setLoading(false);
    }
  }, "createProject");
  const createDocument = /* @__PURE__ */ __name(async () => {
    if (!docTitle.trim()) {
      toast.error("Document title required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/documents/create/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: docTitle,
          content: docContent,
          project_id: selectedProject?.id
        })
      });
      const data = await res.json();
      if (data.document) {
        toast.success("Document created!");
        setDocTitle("");
        setDocContent("");
        fetchProject(selectedProject.id);
      }
    } catch (error) {
      toast.error("Failed to create document");
    } finally {
      setLoading(false);
    }
  }, "createDocument");
  const fetchDocument = /* @__PURE__ */ __name(async (docId) => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/documents/${docId}/`);
      const data = await res.json();
      setSelectedDoc(data.document);
      setView("document");
    } catch (error) {
      toast.error("Failed to load document");
    }
  }, "fetchDocument");
  const saveDocument = /* @__PURE__ */ __name(async () => {
    if (!selectedDoc) return;
    try {
      await fetchWithAuth(`${apiBaseUrl}/documents/${selectedDoc.id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: selectedDoc.content })
      });
      toast.success("Document saved!");
    } catch (error) {
      toast.error("Failed to save document");
    }
  }, "saveDocument");
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.overlay, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.modal, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.header, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.headerLeft, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FaProjectDiagram, { style: { marginRight: "10px", color: "#5865f2" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { style: styles.title, children: "Project Collaboration" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onClose, style: styles.closeButton, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FaTimes, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.breadcrumbs, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: /* @__PURE__ */ __name(() => {
            setView("projects");
            setSelectedProject(null);
          }, "onClick"),
          style: styles.breadcrumb,
          children: "Projects"
        }
      ),
      selectedProject && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.breadcrumbSep, children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => setView("project-detail"), "onClick"),
            style: styles.breadcrumb,
            children: selectedProject.name
          }
        )
      ] }),
      selectedDoc && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.breadcrumbSep, children: "/" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.breadcrumbActive, children: selectedDoc.title })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.content, children: [
      view === "projects" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: /* @__PURE__ */ __name(() => setView("create"), "onClick"),
            style: styles.createProjectBtn,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
              " New Project"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.projectsGrid, children: [
          projects.map((project) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              style: styles.projectCard,
              onClick: /* @__PURE__ */ __name(() => fetchProject(project.id), "onClick"),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FaFolder, { style: styles.projectIcon }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.projectName, children: project.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.projectDesc, children: project.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.projectStats, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FaFile, {}),
                    " ",
                    project.stats?.documents || 0
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(FaUsers, {}),
                    " ",
                    project.member_count
                  ] })
                ] })
              ]
            },
            project.id
          )),
          projects.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.emptyText, children: "No projects yet. Create one!" })
        ] })
      ] }),
      view === "create" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.createForm, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.formTitle, children: "Create New Project" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Project Name",
            value: projectName,
            onChange: /* @__PURE__ */ __name((e) => setProjectName(e.target.value), "onChange"),
            style: styles.input
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            placeholder: "Description (optional)",
            value: projectDesc,
            onChange: /* @__PURE__ */ __name((e) => setProjectDesc(e.target.value), "onChange"),
            style: styles.textarea
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formActions, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setView("projects"), "onClick"), style: styles.cancelBtn, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: createProject, style: styles.submitBtn, disabled: loading, children: loading ? "Creating..." : "Create Project" })
        ] })
      ] }),
      view === "project-detail" && selectedProject && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.projectDetail, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.projectHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.projectTitle, children: selectedProject.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.projectDescription, children: selectedProject.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: /* @__PURE__ */ __name(() => setView("create-doc"), "onClick"), style: styles.newDocBtn, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FaPlus, {}),
            " New Document"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.documentsSection, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles.sectionTitle, children: "Documents" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.documentsList, children: [
            documents.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                style: styles.documentCard,
                onClick: /* @__PURE__ */ __name(() => fetchDocument(doc.id), "onClick"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FaFile, { style: styles.docIcon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.docInfo, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles.docTitle, children: doc.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { style: styles.docMeta, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(FaClock, {}),
                      " ",
                      new Date(doc.updated_at).toLocaleDateString(),
                      " · ",
                      doc.last_edited_by
                    ] })
                  ] })
                ]
              },
              doc.id
            )),
            documents.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { style: styles.emptyText, children: "No documents yet" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.membersSection, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { style: styles.sectionTitle, children: "Team Members" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: styles.membersList, children: selectedProject.members?.map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.memberBadge, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.memberAvatar, children: member.username.charAt(0).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: member.username }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: styles.memberRole, children: member.role })
          ] }, member.id)) })
        ] })
      ] }),
      view === "create-doc" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.createForm, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { style: styles.formTitle, children: "Create New Document" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            placeholder: "Document Title",
            value: docTitle,
            onChange: /* @__PURE__ */ __name((e) => setDocTitle(e.target.value), "onChange"),
            style: styles.input
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            placeholder: "Start writing...",
            value: docContent,
            onChange: /* @__PURE__ */ __name((e) => setDocContent(e.target.value), "onChange"),
            style: { ...styles.textarea, minHeight: "200px" }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.formActions, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: /* @__PURE__ */ __name(() => setView("project-detail"), "onClick"), style: styles.cancelBtn, children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: createDocument, style: styles.submitBtn, disabled: loading, children: loading ? "Creating..." : "Create Document" })
        ] })
      ] }),
      view === "document" && selectedDoc && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.documentEditor, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.editorHeader, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "text",
              value: selectedDoc.title,
              onChange: /* @__PURE__ */ __name((e) => setSelectedDoc({ ...selectedDoc, title: e.target.value }), "onChange"),
              style: styles.docTitleInput
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.editorActions, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: saveDocument, style: styles.saveBtn, children: "Save" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { style: styles.historyBtn, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FaHistory, {}),
              " History"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: selectedDoc.content,
            onChange: /* @__PURE__ */ __name((e) => setSelectedDoc({ ...selectedDoc, content: e.target.value }), "onChange"),
            style: styles.editor,
            placeholder: "Start writing your document..."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: styles.editorFooter, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Version ",
            selectedDoc.version
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "Last edited by ",
            selectedDoc.last_edited_by
          ] })
        ] })
      ] })
    ] })
  ] }) });
}, "ProjectCollaborationPanel");
const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1e4
  },
  modal: {
    backgroundColor: "#2f3136",
    borderRadius: "12px",
    width: "800px",
    maxHeight: "85vh",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px",
    borderBottom: "1px solid #40444b"
  },
  headerLeft: { display: "flex", alignItems: "center" },
  title: { margin: 0, color: "#fff", fontSize: "20px" },
  closeButton: { background: "none", border: "none", color: "#b9bbbe", cursor: "pointer", fontSize: "20px" },
  breadcrumbs: { display: "flex", alignItems: "center", padding: "10px 20px", gap: "8px", background: "#36393f" },
  breadcrumb: { background: "none", border: "none", color: "#5865f2", cursor: "pointer", fontSize: "14px" },
  breadcrumbSep: { color: "#72767d" },
  breadcrumbActive: { color: "#dcddde", fontSize: "14px" },
  content: { padding: "20px", overflowY: "auto", flex: 1 },
  createProjectBtn: {
    background: "#5865f2",
    border: "none",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "20px"
  },
  projectsGrid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "15px" },
  projectCard: {
    background: "#40444b",
    borderRadius: "10px",
    padding: "20px",
    cursor: "pointer",
    transition: "transform 0.2s",
    ":hover": { transform: "translateY(-2px)" }
  },
  projectIcon: { color: "#faa61a", fontSize: "30px", marginBottom: "10px" },
  projectName: { color: "#fff", margin: "0 0 8px", fontSize: "16px" },
  projectDesc: { color: "#b9bbbe", fontSize: "13px", marginBottom: "15px" },
  projectStats: { display: "flex", gap: "15px", color: "#72767d", fontSize: "12px" },
  emptyText: { color: "#72767d", textAlign: "center", padding: "40px", gridColumn: "1 / -1" },
  createForm: { maxWidth: "500px", margin: "0 auto" },
  formTitle: { color: "#fff", marginBottom: "20px" },
  input: { width: "100%", background: "#40444b", border: "none", color: "#fff", padding: "12px", borderRadius: "6px", marginBottom: "15px" },
  textarea: { width: "100%", background: "#40444b", border: "none", color: "#fff", padding: "12px", borderRadius: "6px", marginBottom: "15px", minHeight: "100px", resize: "vertical" },
  formActions: { display: "flex", justifyContent: "flex-end", gap: "10px" },
  cancelBtn: { background: "#40444b", border: "none", color: "#fff", padding: "10px 20px", borderRadius: "6px", cursor: "pointer" },
  submitBtn: { background: "#5865f2", border: "none", color: "#fff", padding: "10px 20px", borderRadius: "6px", cursor: "pointer" },
  projectDetail: { display: "flex", flexDirection: "column", gap: "25px" },
  projectHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  projectTitle: { color: "#fff", margin: "0 0 5px", fontSize: "24px" },
  projectDescription: { color: "#b9bbbe", margin: 0 },
  newDocBtn: { background: "#57f287", border: "none", color: "#000", padding: "10px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
  documentsSection: {},
  sectionTitle: { color: "#b9bbbe", fontSize: "12px", fontWeight: "600", textTransform: "uppercase", marginBottom: "10px" },
  documentsList: { display: "flex", flexDirection: "column", gap: "8px" },
  documentCard: { display: "flex", alignItems: "center", gap: "12px", background: "#40444b", padding: "12px 15px", borderRadius: "8px", cursor: "pointer" },
  docIcon: { color: "#5865f2", fontSize: "20px" },
  docInfo: { flex: 1 },
  docTitle: { color: "#fff", margin: 0, fontSize: "14px" },
  docMeta: { color: "#72767d", fontSize: "12px", display: "flex", alignItems: "center", gap: "5px" },
  membersSection: {},
  membersList: { display: "flex", flexWrap: "wrap", gap: "10px" },
  memberBadge: { display: "flex", alignItems: "center", gap: "8px", background: "#40444b", padding: "8px 12px", borderRadius: "20px" },
  memberAvatar: { width: "24px", height: "24px", borderRadius: "50%", background: "#5865f2", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "12px" },
  memberRole: { color: "#72767d", fontSize: "11px", background: "#36393f", padding: "2px 6px", borderRadius: "4px" },
  documentEditor: { display: "flex", flexDirection: "column", height: "calc(85vh - 180px)" },
  editorHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" },
  docTitleInput: { background: "transparent", border: "none", color: "#fff", fontSize: "24px", fontWeight: "bold", flex: 1 },
  editorActions: { display: "flex", gap: "10px" },
  saveBtn: { background: "#57f287", border: "none", color: "#000", padding: "8px 16px", borderRadius: "6px", cursor: "pointer" },
  historyBtn: { background: "#40444b", border: "none", color: "#fff", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
  editor: { flex: 1, background: "#40444b", border: "none", color: "#dcddde", padding: "20px", borderRadius: "8px", fontSize: "14px", lineHeight: "1.6", resize: "none" },
  editorFooter: { display: "flex", justifyContent: "space-between", padding: "10px 0", color: "#72767d", fontSize: "12px" }
};
export {
  ProjectCollaborationPanel as default
};
