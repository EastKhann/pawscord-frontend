import { useState, useEffect, useCallback, memo } from 'react';
import { FaTimes, FaProjectDiagram, FaPlus, FaFile, FaFolder, FaUsers, FaEdit, FaClock, FaComment, FaDownload, FaHistory } from 'react-icons/fa';
import { toast } from '../utils/toast';

const ProjectCollaborationPanel = ({ fetchWithAuth, apiBaseUrl, onClose, serverId }) => {
    const [projects, setProjects] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [view, setView] = useState('projects'); // projects, project-detail, document, create
    const [loading, setLoading] = useState(false);

    // Create project state
    const [projectName, setProjectName] = useState('');
    const [projectDesc, setProjectDesc] = useState('');

    // Create document state
    const [docTitle, setDocTitle] = useState('');
    const [docContent, setDocContent] = useState('');

    // useCallback handlers
    const handleGoToProjects = useCallback(() => { setView('projects'); setSelectedProject(null); }, []);
    const handleGoToProjectDetail = useCallback(() => setView('project-detail'), []);
    const handleGoToCreate = useCallback(() => setView('create'), []);
    const handleGoToCreateDoc = useCallback(() => setView('create-doc'), []);
    const handleCancelToProjects = useCallback(() => setView('projects'), []);
    const handleCancelToProjectDetail = useCallback(() => setView('project-detail'), []);
    const handleProjectNameChange = useCallback((e) => setProjectName(e.target.value), []);
    const handleProjectDescChange = useCallback((e) => setProjectDesc(e.target.value), []);
    const handleDocTitleChange = useCallback((e) => setDocTitle(e.target.value), []);
    const handleDocContentChange = useCallback((e) => setDocContent(e.target.value), []);
    const handleDocEditorTitleChange = useCallback((e) => setSelectedDoc(prev => ({ ...prev, title: e.target.value })), []);
    const handleDocEditorContentChange = useCallback((e) => setSelectedDoc(prev => ({ ...prev, content: e.target.value })), []);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/projects/?server_id=${serverId}`);
            const data = await res.json();
            setProjects(data.projects || []);
        } catch (error) {
            console.error('Failed to fetch projects:', error);
        }
    };

    const fetchProject = async (projectId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/projects/${projectId}/`);
            const data = await res.json();
            setSelectedProject(data.project);
            setDocuments(data.documents || []);
            setView('project-detail');
        } catch (error) {
            toast.error('Failed to load project');
        }
    };

    const createProject = async () => {
        if (!projectName.trim()) {
            toast.error('Project name required');
            return;
        }

        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/projects/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: projectName,
                    description: projectDesc,
                    server_id: serverId
                })
            });
            const data = await res.json();
            if (data.project) {
                toast.success('Project created!');
                setProjectName('');
                setProjectDesc('');
                setView('projects');
                fetchProjects();
            }
        } catch (error) {
            toast.error('Failed to create project');
        } finally {
            setLoading(false);
        }
    };

    const createDocument = async () => {
        if (!docTitle.trim()) {
            toast.error('Document title required');
            return;
        }

        setLoading(true);
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/documents/create/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: docTitle,
                    content: docContent,
                    project_id: selectedProject?.id
                })
            });
            const data = await res.json();
            if (data.document) {
                toast.success('Document created!');
                setDocTitle('');
                setDocContent('');
                fetchProject(selectedProject.id);
            }
        } catch (error) {
            toast.error('Failed to create document');
        } finally {
            setLoading(false);
        }
    };

    const fetchDocument = async (docId) => {
        try {
            const res = await fetchWithAuth(`${apiBaseUrl}/documents/${docId}/`);
            const data = await res.json();
            setSelectedDoc(data.document);
            setView('document');
        } catch (error) {
            toast.error('Failed to load document');
        }
    };

    const saveDocument = async () => {
        if (!selectedDoc) return;

        try {
            await fetchWithAuth(`${apiBaseUrl}/documents/${selectedDoc.id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: selectedDoc.content })
            });
            toast.success('Document saved!');
        } catch (error) {
            toast.error('Failed to save document');
        }
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <div style={styles.header}>
                    <div style={styles.headerLeft}>
                        <FaProjectDiagram style={{ marginRight: '10px', color: '#5865f2' }} />
                        <h2 style={styles.title}>Project Collaboration</h2>
                    </div>
                    <button onClick={onClose} style={styles.closeButton}><FaTimes /></button>
                </div>

                <div style={styles.breadcrumbs}>
                    <button
                        onClick={handleGoToProjects}
                        style={styles.breadcrumb}
                    >
                        Projects
                    </button>
                    {selectedProject && (
                        <>
                            <span style={styles.breadcrumbSep}>/</span>
                            <button
                                onClick={handleGoToProjectDetail}
                                style={styles.breadcrumb}
                            >
                                {selectedProject.name}
                            </button>
                        </>
                    )}
                    {selectedDoc && (
                        <>
                            <span style={styles.breadcrumbSep}>/</span>
                            <span style={styles.breadcrumbActive}>{selectedDoc.title}</span>
                        </>
                    )}
                </div>

                <div style={styles.content}>
                    {view === 'projects' && (
                        <>
                            <button
                                onClick={handleGoToCreate}
                                style={styles.createProjectBtn}
                            >
                                <FaPlus /> New Project
                            </button>

                            <div style={styles.projectsGrid}>
                                {projects.map(project => (
                                    <div
                                        key={project.id}
                                        style={styles.projectCard}
                                        onClick={() => fetchProject(project.id)}
                                    >
                                        <FaFolder style={styles.projectIcon} />
                                        <h3 style={styles.projectName}>{project.name}</h3>
                                        <p style={styles.projectDesc}>{project.description}</p>
                                        <div style={styles.projectStats}>
                                            <span><FaFile /> {project.stats?.documents || 0}</span>
                                            <span><FaUsers /> {project.member_count}</span>
                                        </div>
                                    </div>
                                ))}
                                {projects.length === 0 && (
                                    <p style={styles.emptyText}>No projects yet. Create one!</p>
                                )}
                            </div>
                        </>
                    )}

                    {view === 'create' && (
                        <div style={styles.createForm}>
                            <h3 style={styles.formTitle}>Create New Project</h3>
                            <input
                                type="text"
                                placeholder="Project Name"
                                value={projectName}
                                onChange={handleProjectNameChange}
                                style={styles.input}
                            />
                            <textarea
                                placeholder="Description (optional)"
                                value={projectDesc}
                                onChange={handleProjectDescChange}
                                style={styles.textarea}
                            />
                            <div style={styles.formActions}>
                                <button onClick={handleCancelToProjects} style={styles.cancelBtn}>
                                    Cancel
                                </button>
                                <button onClick={createProject} style={styles.submitBtn} disabled={loading}>
                                    {loading ? 'Creating...' : 'Create Project'}
                                </button>
                            </div>
                        </div>
                    )}

                    {view === 'project-detail' && selectedProject && (
                        <div style={styles.projectDetail}>
                            <div style={styles.projectHeader}>
                                <div>
                                    <h3 style={styles.projectTitle}>{selectedProject.name}</h3>
                                    <p style={styles.projectDescription}>{selectedProject.description}</p>
                                </div>
                                <button onClick={handleGoToCreateDoc} style={styles.newDocBtn}>
                                    <FaPlus /> New Document
                                </button>
                            </div>

                            <div style={styles.documentsSection}>
                                <h4 style={styles.sectionTitle}>Documents</h4>
                                <div style={styles.documentsList}>
                                    {documents.map(doc => (
                                        <div
                                            key={doc.id}
                                            style={styles.documentCard}
                                            onClick={() => fetchDocument(doc.id)}
                                        >
                                            <FaFile style={styles.docIcon} />
                                            <div style={styles.docInfo}>
                                                <h4 style={styles.docTitle}>{doc.title}</h4>
                                                <span style={styles.docMeta}>
                                                    <FaClock /> {new Date(doc.updated_at).toLocaleDateString()}
                                                    {' · '}{doc.last_edited_by}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                    {documents.length === 0 && (
                                        <p style={styles.emptyText}>No documents yet</p>
                                    )}
                                </div>
                            </div>

                            <div style={styles.membersSection}>
                                <h4 style={styles.sectionTitle}>Team Members</h4>
                                <div style={styles.membersList}>
                                    {selectedProject.members?.map(member => (
                                        <div key={member.id} style={styles.memberBadge}>
                                            <span style={styles.memberAvatar}>
                                                {member.username.charAt(0).toUpperCase()}
                                            </span>
                                            <span>{member.username}</span>
                                            <span style={styles.memberRole}>{member.role}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {view === 'create-doc' && (
                        <div style={styles.createForm}>
                            <h3 style={styles.formTitle}>Create New Document</h3>
                            <input
                                type="text"
                                placeholder="Document Title"
                                value={docTitle}
                                onChange={handleDocTitleChange}
                                style={styles.input}
                            />
                            <textarea
                                placeholder="Start writing..."
                                value={docContent}
                                onChange={handleDocContentChange}
                                style={{ ...styles.textarea, minHeight: '200px' }}
                            />
                            <div style={styles.formActions}>
                                <button onClick={handleCancelToProjectDetail} style={styles.cancelBtn}>
                                    Cancel
                                </button>
                                <button onClick={createDocument} style={styles.submitBtn} disabled={loading}>
                                    {loading ? 'Creating...' : 'Create Document'}
                                </button>
                            </div>
                        </div>
                    )}

                    {view === 'document' && selectedDoc && (
                        <div style={styles.documentEditor}>
                            <div style={styles.editorHeader}>
                                <input
                                    type="text"
                                    value={selectedDoc.title}
                                    onChange={handleDocEditorTitleChange}
                                    style={styles.docTitleInput}
                                />
                                <div style={styles.editorActions}>
                                    <button onClick={saveDocument} style={styles.saveBtn}>
                                        Save
                                    </button>
                                    <button style={styles.historyBtn}>
                                        <FaHistory /> History
                                    </button>
                                </div>
                            </div>
                            <textarea
                                value={selectedDoc.content}
                                onChange={handleDocEditorContentChange}
                                style={styles.editor}
                                placeholder="Start writing your document..."
                            />
                            <div style={styles.editorFooter}>
                                <span>Version {selectedDoc.version}</span>
                                <span>Last edited by {selectedDoc.last_edited_by}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex',
        justifyContent: 'center', alignItems: 'center', zIndex: 10000
    },
    modal: {
        backgroundColor: '#2f3136', borderRadius: '12px', width: '800px',
        maxHeight: '85vh', overflow: 'hidden', display: 'flex', flexDirection: 'column'
    },
    header: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px', borderBottom: '1px solid #40444b'
    },
    headerLeft: { display: 'flex', alignItems: 'center' },
    title: { margin: 0, color: '#fff', fontSize: '20px' },
    closeButton: { background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer', fontSize: '20px' },
    breadcrumbs: { display: 'flex', alignItems: 'center', padding: '10px 20px', gap: '8px', background: '#36393f' },
    breadcrumb: { background: 'none', border: 'none', color: '#5865f2', cursor: 'pointer', fontSize: '14px' },
    breadcrumbSep: { color: '#72767d' },
    breadcrumbActive: { color: '#dcddde', fontSize: '14px' },
    content: { padding: '20px', overflowY: 'auto', flex: 1 },
    createProjectBtn: {
        background: '#5865f2', border: 'none', color: '#fff', padding: '10px 20px',
        borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center',
        gap: '8px', marginBottom: '20px'
    },
    projectsGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px' },
    projectCard: {
        background: '#40444b', borderRadius: '10px', padding: '20px', cursor: 'pointer',
        transition: 'transform 0.2s', ':hover': { transform: 'translateY(-2px)' }
    },
    projectIcon: { color: '#faa61a', fontSize: '30px', marginBottom: '10px' },
    projectName: { color: '#fff', margin: '0 0 8px', fontSize: '16px' },
    projectDesc: { color: '#b9bbbe', fontSize: '13px', marginBottom: '15px' },
    projectStats: { display: 'flex', gap: '15px', color: '#72767d', fontSize: '12px' },
    emptyText: { color: '#72767d', textAlign: 'center', padding: '40px', gridColumn: '1 / -1' },
    createForm: { maxWidth: '500px', margin: '0 auto' },
    formTitle: { color: '#fff', marginBottom: '20px' },
    input: { width: '100%', background: '#40444b', border: 'none', color: '#fff', padding: '12px', borderRadius: '6px', marginBottom: '15px' },
    textarea: { width: '100%', background: '#40444b', border: 'none', color: '#fff', padding: '12px', borderRadius: '6px', marginBottom: '15px', minHeight: '100px', resize: 'vertical' },
    formActions: { display: 'flex', justifyContent: 'flex-end', gap: '10px' },
    cancelBtn: { background: '#40444b', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' },
    submitBtn: { background: '#5865f2', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' },
    projectDetail: { display: 'flex', flexDirection: 'column', gap: '25px' },
    projectHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
    projectTitle: { color: '#fff', margin: '0 0 5px', fontSize: '24px' },
    projectDescription: { color: '#b9bbbe', margin: 0 },
    newDocBtn: { background: '#57f287', border: 'none', color: '#000', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' },
    documentsSection: {},
    sectionTitle: { color: '#b9bbbe', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '10px' },
    documentsList: { display: 'flex', flexDirection: 'column', gap: '8px' },
    documentCard: { display: 'flex', alignItems: 'center', gap: '12px', background: '#40444b', padding: '12px 15px', borderRadius: '8px', cursor: 'pointer' },
    docIcon: { color: '#5865f2', fontSize: '20px' },
    docInfo: { flex: 1 },
    docTitle: { color: '#fff', margin: 0, fontSize: '14px' },
    docMeta: { color: '#72767d', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' },
    membersSection: {},
    membersList: { display: 'flex', flexWrap: 'wrap', gap: '10px' },
    memberBadge: { display: 'flex', alignItems: 'center', gap: '8px', background: '#40444b', padding: '8px 12px', borderRadius: '20px' },
    memberAvatar: { width: '24px', height: '24px', borderRadius: '50%', background: '#5865f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px' },
    memberRole: { color: '#72767d', fontSize: '11px', background: '#36393f', padding: '2px 6px', borderRadius: '4px' },
    documentEditor: { display: 'flex', flexDirection: 'column', height: 'calc(85vh - 180px)' },
    editorHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' },
    docTitleInput: { background: 'transparent', border: 'none', color: '#fff', fontSize: '24px', fontWeight: 'bold', flex: 1 },
    editorActions: { display: 'flex', gap: '10px' },
    saveBtn: { background: '#57f287', border: 'none', color: '#000', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
    historyBtn: { background: '#40444b', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' },
    editor: { flex: 1, background: '#40444b', border: 'none', color: '#dcddde', padding: '20px', borderRadius: '8px', fontSize: '14px', lineHeight: '1.6', resize: 'none' },
    editorFooter: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', color: '#72767d', fontSize: '12px' }
};

export default memo(ProjectCollaborationPanel);
