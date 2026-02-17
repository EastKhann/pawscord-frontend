import { useState, useEffect, useRef } from 'react';
import toast from '../../utils/toast';

const FILE_EXTENSIONS = { javascript: 'js', python: 'py', typescript: 'ts', html: 'html', css: 'css', java: 'java', cpp: 'cpp' };

const useCodeEditor = ({ roomId, userId, username, apiBaseUrl, fetchWithAuth, websocket }) => {
  const [code, setCode] = useState('// Start coding...\n');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');
  const [collaborators, setCollaborators] = useState([]);
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);

  const editorRef = useRef(null);
  const monacoRef = useRef(null);
  const cursorDecorations = useRef(new Map());

  const handleRemoteCodeUpdate = (data) => {
    if (data.user_id === userId) return;
    if (window.monacoEditor) window.monacoEditor.setValue(data.code);
  };

  const handleRemoteCursorUpdate = (data) => {
    if (data.user_id === userId) return;
    const editor = window.monacoEditor;
    const monaco = monacoRef.current;
    if (!editor || !monaco) return;
    const old = cursorDecorations.current.get(data.user_id);
    if (old) editor.deltaDecorations(old, []);
    const dec = editor.deltaDecorations([], [{
      range: new monaco.Range(data.position.lineNumber, data.position.column, data.position.lineNumber, data.position.column),
      options: { className: `remote-cursor remote-cursor-${data.user_id}`, hoverMessage: { value: `**${data.username}**` } }
    }]);
    cursorDecorations.current.set(data.user_id, dec);
  };

  const handleCollaboratorJoined = (data) => setCollaborators(prev => [...prev, { id: data.user_id, username: data.username, color: data.color || '#5865f2' }]);
  const handleCollaboratorLeft = (data) => {
    setCollaborators(prev => prev.filter(c => c.id !== data.user_id));
    const dec = cursorDecorations.current.get(data.user_id);
    if (dec && window.monacoEditor) window.monacoEditor.deltaDecorations(dec, []);
    cursorDecorations.current.delete(data.user_id);
  };

  const loadSavedCode = async () => {
    try {
      const res = await fetchWithAuth(`${apiBaseUrl}/code-editor/load/?room_id=${roomId}`);
      if (res.ok) { const d = await res.json(); if (d.code) { setCode(d.code); setLanguage(d.language || 'javascript'); if (window.monacoEditor) { window.monacoEditor.setValue(d.code); window.monacoEditor.setLanguage(d.language || 'javascript'); } } }
    } catch (e) { console.error('Failed to load code:', e); }
  };

  useEffect(() => {
    const handleMessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'code_update') handleRemoteCodeUpdate(data);
      else if (data.type === 'cursor_update') handleRemoteCursorUpdate(data);
      else if (data.type === 'collaborator_joined') handleCollaboratorJoined(data);
      else if (data.type === 'collaborator_left') handleCollaboratorLeft(data);
    };
    if (websocket) {
      websocket.addEventListener('message', handleMessage);
    }
    loadSavedCode();
    return () => {
      if (websocket) {
        websocket.removeEventListener('message', handleMessage);
        websocket.close();
      }
      if (window.monacoEditor) { window.monacoEditor.dispose(); delete window.monacoEditor; }
    };
  }, []);

  const broadcastCodeChange = (newCode, changes) => {
    if (!websocket || websocket.readyState !== WebSocket.OPEN) return;
    websocket.send(JSON.stringify({ type: 'code_update', room_id: roomId, user_id: userId, username, code: newCode, changes: changes.map(c => ({ range: c.range, text: c.text })) }));
  };

  const broadcastCursorPosition = (position) => {
    if (!websocket || websocket.readyState !== WebSocket.OPEN) return;
    websocket.send(JSON.stringify({ type: 'cursor_update', room_id: roomId, user_id: userId, username, position: { lineNumber: position.lineNumber, column: position.column } }));
  };

  const saveCode = async () => {
    setSaving(true);
    try { const res = await fetchWithAuth(`${apiBaseUrl}/code-editor/save/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ room_id: roomId, code, language }) }); if (res.ok) toast.success('✅ Kod kaydedildi!'); }
    catch (e) { console.error('Save error:', e); toast.error('❌ Kaydetme başarısız'); }
    finally { setSaving(false); }
  };

  const runCode = async () => {
    setRunning(true); setOutput('Çalıştırılıyor...');
    try { const res = await fetchWithAuth(`${apiBaseUrl}/code-editor/run/`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code, language }) }); if (res.ok) { const d = await res.json(); setOutput(d.output || 'No output'); } else { const err = await res.json(); setOutput(`Error: ${err.error || 'Execution failed'}`); } }
    catch (e) { setOutput(`Error: ${e.message}`); }
    finally { setRunning(false); }
  };

  const copyCode = () => { navigator.clipboard.writeText(code); toast.success('✅ Kod kopyalandı!'); };

  const downloadCode = () => {
    const ext = FILE_EXTENSIONS[language] || 'txt';
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = `code.${ext}`; a.click();
    URL.revokeObjectURL(url);
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
    if (window.monacoEditor && monacoRef.current) monacoRef.current.editor.setModelLanguage(window.monacoEditor.getModel(), lang);
  };

  return { code, language, output, collaborators, saving, running, editorRef, saveCode, runCode, copyCode, downloadCode, changeLanguage };
};

export default useCodeEditor;
