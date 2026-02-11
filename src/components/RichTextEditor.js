// frontend/src/components/RichTextEditor.js

import { useEffect, useImperativeHandle, forwardRef, useCallback, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import SlashCommandList, { COMMANDS } from './SlashCommandList';
import './RichTextEditor.css';

const RichTextEditor = forwardRef(({ onSend, onChange, placeholder, initialValue = '', onFileUpload }, ref) => {
    const isSendingRef = useRef(false);
    const [slashQuery, setSlashQuery] = useState(null);
    const [slashIndex, setSlashIndex] = useState(0);

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: placeholder || 'Bir mesaj yaz...',
            }),
        ],
        content: initialValue,
        editorProps: {
            handlePaste: (view, event, slice) => {
                // 🔥 PASTE EVENT - Clipboard'dan dosya/resim yapıştırma
                const items = event.clipboardData?.items;
                if (items && onFileUpload) {
                    for (let i = 0; i < items.length; i++) {
                        const item = items[i];

                        // Eğer bir dosya/görsel ise
                        if (item.kind === 'file') {
                            event.preventDefault();
                            const file = item.getAsFile();
                            if (file) {
                                onFileUpload(file);
                            }
                            return true; // Event'i handle ettik
                        }
                    }
                }
                return false; // Normal paste işlemi devam etsin
            },
            handleKeyDown: (view, event) => {
                // Slash menu navigation
                if (slashQuery !== null) {
                    if (event.key === 'ArrowUp') {
                        event.preventDefault();
                        setSlashIndex(prev => Math.max(0, prev - 1));
                        return true;
                    }
                    if (event.key === 'ArrowDown') {
                        event.preventDefault();
                        setSlashIndex(prev => prev + 1);
                        return true;
                    }
                    if (event.key === 'Enter') {
                        event.preventDefault();
                        const q = slashQuery.toLowerCase().replace('/', '');
                        const filtered = COMMANDS.filter(cmd => cmd.name.toLowerCase().startsWith(q));

                        if (filtered.length > 0) {
                            const actualIndex = Math.max(0, Math.min(slashIndex, filtered.length - 1));
                            const cmd = filtered[actualIndex];

                            editor.commands.setContent(`/${cmd.name} `);
                            editor.commands.focus('end');
                            setSlashQuery(null);
                        }
                        return true;
                    }
                    if (event.key === 'Escape') {
                        event.preventDefault();
                        setSlashQuery(null);
                        return true;
                    }
                }

                if (event.key === 'Enter' && !event.shiftKey) {
                    // ... existing enter logic ...
                    event.preventDefault();
                    if (slashQuery !== null) {
                        // If menu was open but we didn't handle it above (e.g. logic missing), 
                        // we shouldn't send message yet if it looks like a incomplete command.
                        // But actually we want 'Enter' to select from menu if open. 
                        // So the block above should handle it.
                        return true;
                    }

                    const text = view.state.doc.textContent;
                    if (text.trim().length > 0) {
                        isSendingRef.current = true;
                        onSend(text);
                        editor.commands.clearContent();
                        onChange?.('');
                        setTimeout(() => { isSendingRef.current = false; }, 100);
                    }
                    return true;
                }
                return false;
            },
        },
    });

    // Yazı değişimini dinle
    useEffect(() => {
        if (!editor) return;
        const handler = () => {
            if (isSendingRef.current) return;
            const text = editor.getText().trim();

            // Slash Command Detection
            if (text.startsWith('/')) {
                // Check if we are still typing the command (no spaces yet, or maybe allow arguments? 
                // Creating a simplified slash menu that only appears for the command name)
                if (!text.includes(' ')) {
                    setSlashQuery(text);
                    setSlashIndex(0); // Reset index on type
                } else {
                    setSlashQuery(null);
                }
            } else {
                if (slashQuery !== null) setSlashQuery(null);
            }

            onChange?.(text);
        };
        editor.on('update', handler);
        return () => editor.off('update', handler);
    }, [editor, onChange]);

    // 🔥 DÜZELTME: Dışarıdan gelen boşaltma emrini (initialValue='') uygula
    useEffect(() => {
        if (!editor) return;
        const currentContent = editor.getText();

        // Eğer dışarıdan gelen değer boşsa ve editör doluysa -> TEMİZLE
        if (initialValue === '' && currentContent !== '') {
            editor.commands.clearContent();
        }
        // Eğer editör boşsa ve dışarıdan dolu geliyorsa (Draft yükleme) -> DOLDUR
        else if (initialValue !== '' && currentContent === '') {
            editor.commands.setContent(initialValue);
        }
    }, [editor, initialValue]);

    const focusEditor = useCallback(() => {
        if (editor) editor.chain().focus().run();
    }, [editor]);

    // Dışarıya açılan metodlar
    useImperativeHandle(ref, () => ({
        send: () => {
            if (!editor) return;
            const text = editor.getText().trim();
            if (!text) return;
            isSendingRef.current = true;
            onSend(text);
            editor.commands.clearContent();
            onChange?.('');
            setTimeout(() => { isSendingRef.current = false; }, 100);
        },
        clear: () => editor?.commands.clearContent(),
        hasContent: () => !!editor?.getText().trim(),
        appendText: (val) => {
            if (!editor || !val) return;
            editor.chain().focus().insertContent(val).run();
        },
    }), [editor, onSend, onChange]);

    if (!editor) return null;

    return (
        <div className="rich-editor-wrapper" onClick={focusEditor} role="textbox" aria-label="Mesaj editörü">
            <EditorContent editor={editor} className="tiptap-editor" />

            {slashQuery !== null && (
                <SlashCommandList
                    query={slashQuery}
                    activeIndex={slashIndex}
                    onSelect={(cmd) => {
                        if (!editor) return;
                        // Replace the entire content with the command name + space
                        editor.commands.setContent(`/${cmd.name} `);
                        editor.commands.focus('end');
                        setSlashQuery(null);
                    }}
                />
            )}
        </div>
    );
});

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;

