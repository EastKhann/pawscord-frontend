const styles = {
  container: { display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#1e1e1e' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: '#2d2d30', borderBottom: '1px solid #3e3e42' },
  headerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
  headerIcon: { color: '#5865f2', fontSize: '20px' },
  title: { margin: 0, fontSize: '16px', fontWeight: '600', color: '#cccccc' },
  languageSelect: { backgroundColor: '#3c3c3c', border: '1px solid #3e3e42', borderRadius: '4px', color: '#cccccc', padding: '6px 12px', fontSize: '13px', cursor: 'pointer' },
  headerRight: { display: 'flex', alignItems: 'center', gap: '8px' },
  collaborators: { display: 'flex', alignItems: 'center', backgroundColor: '#3c3c3c', padding: '6px 12px', borderRadius: '4px', fontSize: '13px', color: '#cccccc' },
  actionButton: { backgroundColor: '#3c3c3c', border: 'none', borderRadius: '4px', color: '#cccccc', padding: '8px 12px', fontSize: '14px', cursor: 'pointer', transition: 'background-color 0.2s' },
  saveButton: { backgroundColor: '#5865f2', color: '#fff' },
  runButton: { backgroundColor: '#3ba55d', color: '#fff' },
  editorContainer: { flex: 1, position: 'relative', overflow: 'hidden' },
  editor: { width: '100%', height: '100%' },
  outputPanel: { height: '200px', backgroundColor: '#1e1e1e', borderTop: '1px solid #3e3e42', display: 'flex', flexDirection: 'column' },
  outputHeader: { padding: '8px 16px', backgroundColor: '#2d2d30', borderBottom: '1px solid #3e3e42', fontSize: '13px', fontWeight: '600', color: '#cccccc' },
  outputContent: { flex: 1, margin: 0, padding: '12px 16px', color: '#d4d4d4', fontSize: '13px', fontFamily: 'Consolas, Monaco, "Courier New", monospace', overflowY: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' },
};

export default styles;
