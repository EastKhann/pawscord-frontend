// frontend/src/components/WhiteboardModal.js

import { useRef, useState, useEffect } from 'react';
import { FaTimes, FaEraser, FaPen, FaTrash } from 'react-icons/fa';

const WhiteboardModal = ({ roomSlug, onClose, wsProtocol, apiHost }) => {
    const canvasRef = useRef(null);
    const ws = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [color, setColor] = useState('#000000');
    const [lineWidth, setLineWidth] = useState(3);

    // WebSocket Bağlantısı
    useEffect(() => {
        const url = `${wsProtocol}://${apiHost}/ws/whiteboard/${roomSlug}/`;
        ws.current = new WebSocket(url);

        ws.current.onmessage = (event) => {
            const { x, y, type, color: remoteColor, width: remoteWidth, prevX, prevY } = JSON.parse(event.data);
            const ctx = canvasRef.current.getContext('2d');

            if (type === 'draw') {
                ctx.beginPath();
                ctx.moveTo(prevX, prevY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = remoteColor;
                ctx.lineWidth = remoteWidth;
                ctx.lineCap = 'round';
                ctx.stroke();
            } else if (type === 'clear') {
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        };

        return () => ws.current.close();
    }, [roomSlug, wsProtocol, apiHost]);

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Canvas Boyutlandırma
    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 800;
        canvas.height = 600;
        // Arka planı beyaz yap (kaydederken şeffaf olmasın diye)
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setIsDrawing(true);
        canvasRef.current.lastX = offsetX;
        canvasRef.current.lastY = offsetY;
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        const ctx = canvasRef.current.getContext('2d');

        // Çiz
        ctx.beginPath();
        ctx.moveTo(canvasRef.current.lastX, canvasRef.current.lastY);
        ctx.lineTo(offsetX, offsetY);
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Gönder
        if (ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                type: 'draw',
                x: offsetX,
                y: offsetY,
                prevX: canvasRef.current.lastX,
                prevY: canvasRef.current.lastY,
                color,
                width: lineWidth
            }));
        }

        canvasRef.current.lastX = offsetX;
        canvasRef.current.lastY = offsetY;
    };

    const stopDrawing = () => {
        setIsDrawing(false);
    };

    const clearBoard = () => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        ws.current.send(JSON.stringify({ type: 'clear' }));
    };

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={e => e.stopPropagation()}>
                <div style={styles.header}>
                    <h3>🎨 Ortak Çizim Tahtası</h3>
                    <button onClick={onClose} style={styles.closeBtn}><FaTimes /></button>
                </div>

                <div style={styles.toolbar}>
                    <input type="color" value={color} onChange={e => setColor(e.target.value)} style={styles.colorPicker} />
                    <input type="range" min="1" max="20" value={lineWidth} onChange={e => setLineWidth(e.target.value)} />
                    <button onClick={() => setColor('#ffffff')} style={styles.toolBtn}><FaEraser /></button>
                    <button onClick={() => setColor('#000000')} style={styles.toolBtn}><FaPen /></button>
                    <button onClick={clearBoard} style={{ ...styles.toolBtn, color: 'red' }}><FaTrash /></button>
                </div>

                <div style={styles.canvasContainer}>
                    <canvas
                        ref={canvasRef}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        style={styles.canvas}
                    />
                </div>
            </div>
        </div>
    );
};

const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center' },
    modal: { backgroundColor: '#2b2d31', borderRadius: '12px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' },
    header: { display: 'flex', justifyContent: 'space-between', color: 'white', padding: '0 10px' },
    closeBtn: { background: 'none', border: 'none', color: 'white', fontSize: '1.5em', cursor: 'pointer' },
    toolbar: { display: 'flex', gap: '10px', alignItems: 'center', backgroundColor: '#1e1f22', padding: '10px', borderRadius: '8px' },
    canvasContainer: { border: '1px solid #1e1f22', borderRadius: '4px', overflow: 'hidden', backgroundColor: 'white' },
    canvas: { cursor: 'crosshair', touchAction: 'none' },
    toolBtn: { background: 'none', border: 'none', color: '#ccc', fontSize: '1.2em', cursor: 'pointer' },
    colorPicker: { border: 'none', width: '30px', height: '30px', cursor: 'pointer', padding: 0 }
};

export default WhiteboardModal;

