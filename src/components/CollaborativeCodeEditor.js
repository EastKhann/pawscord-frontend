import { FaCode, FaPlay, FaSave, FaUsers, FaCopy, FaDownload } from 'react-icons/fa';
import useCodeEditor from './CollaborativeCodeEditor/useCodeEditor';
import styles from './CollaborativeCodeEditor/codeEditorStyles';

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript' }, { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' }, { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' }, { value: 'html', label: 'HTML' }, { value: 'css', label: 'CSS' },
];

const CollaborativeCodeEditor = ({ roomId, userId, username, apiBaseUrl, fetchWithAuth, websocket, onClose }) => {
  const { code, language, output, collaborators, saving, running, editorRef, saveCode, runCode, copyCode, downloadCode, changeLanguage } =
    useCodeEditor({ roomId, userId, username, apiBaseUrl, fetchWithAuth, websocket });

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <FaCode style={styles.headerIcon} />
          <h2 style={styles.title}>Code Editor</h2>
          <select value={language} onChange={e => changeLanguage(e.target.value)} style={styles.languageSelect}>
            {LANGUAGES.map(l => <option key={l.value} value={l.value}>{l.label}</option>)}
          </select>
        </div>
        <div style={styles.headerRight}>
          <div style={styles.collaborators}><FaUsers style={{ marginRight: '6px' }} /><span>{collaborators.length + 1}</span></div>
          <button onClick={copyCode} style={styles.actionButton} title="Kopyala"><FaCopy /></button>
          <button onClick={downloadCode} style={styles.actionButton} title="\u0130ndir"><FaDownload /></button>
          <button onClick={saveCode} disabled={saving} style={{ ...styles.actionButton, ...styles.saveButton }} title="Kaydet"><FaSave /></button>
          <button onClick={runCode} disabled={running} style={{ ...styles.actionButton, ...styles.runButton }} title="\u00C7al\u0131\u015Ft\u0131r"><FaPlay /></button>
        </div>
      </div>

      <div style={styles.editorContainer}><div ref={editorRef} style={styles.editor} /></div>

      {output && (
        <div style={styles.outputPanel}>
          <div style={styles.outputHeader}><span>Output</span></div>
          <pre style={styles.outputContent}>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CollaborativeCodeEditor;
