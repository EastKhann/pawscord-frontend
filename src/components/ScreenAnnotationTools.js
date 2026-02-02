// frontend/src/components/ScreenAnnotationTools.js - FEATURE #19
import React, { useState } from 'react';
import { FaPencilAlt, FaEraser, FaCircle, FaSquare, FaFont, FaPalette } from 'react-icons/fa';

const ScreenAnnotationTools = ({ onToolChange, onColorChange }) => {
    const [activeTool, setActiveTool] = useState('pen');
    const [color, setColor] = useState('#ff0000');

    const tools = [
        { id: 'pen', name: 'Kalem', icon: FaPencilAlt },
        { id: 'eraser', name: 'Silgi', icon: FaEraser },
        { id: 'circle', name: 'Daire', icon: FaCircle },
        { id: 'square', name: 'Kare', icon: FaSquare },
        { id: 'text', name: 'Metin', icon: FaFont }
    ];

    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', '#000000'];

    const handleToolClick = (toolId) => {
        setActiveTool(toolId);
        onToolChange(toolId);
    };

    const handleColorClick = (newColor) => {
        setColor(newColor);
        onColorChange(newColor);
    };

    return (
        <div style={styles.container}>
            <div style={styles.tools}>
                {tools.map(tool => {
                    const Icon = tool.icon;
                    return (
                        <button
                            key={tool.id}
                            onClick={() => handleToolClick(tool.id)}
                            style={{
                                ...styles.toolButton,
                                ...(activeTool === tool.id ? styles.toolButtonActive : {})
                            }}
                            title={tool.name}
                        >
                            <Icon />
                        </button>
                    );
                })}
            </div>
            <div style={styles.colorPicker}>
                <FaPalette style={styles.paletteIcon} />
                <div style={styles.colors}>
                    {colors.map(c => (
                        <button
                            key={c}
                            onClick={() => handleColorClick(c)}
                            style={{
                                ...styles.colorButton,
                                backgroundColor: c,
                                ...(color === c ? styles.colorButtonActive : {})
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', gap: '16px', padding: '12px', backgroundColor: '#2b2d31', borderRadius: '8px', alignItems: 'center' },
    tools: { display: 'flex', gap: '8px' },
    toolButton: { padding: '10px', backgroundColor: '#1e1f22', border: '2px solid transparent', borderRadius: '6px', color: '#b9bbbe', cursor: 'pointer', fontSize: '16px', transition: 'all 0.2s' },
    toolButtonActive: { backgroundColor: '#5865f2', borderColor: '#5865f2', color: '#fff' },
    colorPicker: { display: 'flex', alignItems: 'center', gap: '8px' },
    paletteIcon: { color: '#72767d', fontSize: '16px' },
    colors: { display: 'flex', gap: '6px' },
    colorButton: { width: '28px', height: '28px', border: '2px solid transparent', borderRadius: '50%', cursor: 'pointer', transition: 'transform 0.2s' },
    colorButtonActive: { transform: 'scale(1.2)', borderColor: '#fff' }
};

export default ScreenAnnotationTools;



