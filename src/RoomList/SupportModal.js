import React, { useState } from 'react';
import { FaHeart, FaCoffee, FaBitcoin, FaCopy, FaTimes } from '../utils/iconOptimization';
import { styles } from '../SidebarStyles';

const cryptoAddresses = {
    sol: 'Bk6ywhae86fp6BHmGtxabS6ncEGsFxhcnZEWJRZLVr9z',
    eth: '0xeaa14d4651a8ea7488289209b9294a1309dde37c',
    usdt: 'TGAny6VmDAWdVmTXCPrpsbLKKQQdvyvnWC',
    coffee: 'https://buymeacoffee.com/dogudoguweo'
};

const SupportModal = ({ isOpen, onClose }) => {
    const [copiedAddress, setCopiedAddress] = useState(null);

    const copyToClipboard = (text, type) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedAddress(type);
            setTimeout(() => setCopiedAddress(null), 2000);
        });
    };

    if (!isOpen) return null;

    return (
        <div style={styles.modalOverlay} onClick={onClose}>
            <div style={styles.selectionModalContent} onClick={e => e.stopPropagation()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h3 style={{ color: 'white', margin: 0 }}>Bizi Destekle <FaHeart color="#eb459e" /></h3>
                    <FaTimes style={{ cursor: 'pointer', color: '#b9bbbe' }} onClick={onClose} />
                </div>

                {/* Kahve */}
                <div style={{ backgroundColor: '#1e1f22', padding: 15, borderRadius: 8, marginBottom: 15 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                        <FaCoffee color="#FFDD00" size={24} />
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ color: 'white', fontWeight: 'bold' }}>Buy Me a Coffee</div>
                            <div style={{ fontSize: '0.8em', color: '#b9bbbe' }}>En kolay destek yöntemi</div>
                        </div>
                    </div>
                    <button onClick={() => window.open(cryptoAddresses.coffee, '_blank')} style={{ width: '100%', padding: 10, backgroundColor: '#FFDD00', border: 'none', borderRadius: 6, fontWeight: 'bold', cursor: 'pointer' }}>Kahve Ismarla ☕</button>
                </div>

                {/* Kripto */}
                <div style={{ backgroundColor: '#1e1f22', padding: 15, borderRadius: 8 }}>
                    <h4 style={{ margin: '0 0 10px 0', color: 'white', textAlign: 'left' }}><FaBitcoin color="#f7931a" /> Kripto ile Destek</h4>

                    {/* Solana */}
                    <div style={{ marginBottom: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#b9bbbe', marginBottom: 5 }}>
                            <span>Solana (SOL)</span>
                            <button onClick={() => copyToClipboard(cryptoAddresses.sol, 'sol')} style={{ cursor: 'pointer', color: '#5865f2', display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', padding: 0, fontSize: 'inherit' }}>
                                {copiedAddress === 'sol' ? 'Kopyalandı!' : <><FaCopy /> Kopyala</>}
                            </button>
                        </div>
                        <div style={{ backgroundColor: '#111214', padding: 8, borderRadius: 4, fontSize: '0.8em', color: '#dcddde', wordBreak: 'break-all' }}>{cryptoAddresses.sol}</div>
                    </div>

                    {/* Ethereum */}
                    <div style={{ marginBottom: 10 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#b9bbbe', marginBottom: 5 }}>
                            <span>Ethereum (ETH)</span>
                            <button onClick={() => copyToClipboard(cryptoAddresses.eth, 'eth')} style={{ cursor: 'pointer', color: '#5865f2', display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', padding: 0, fontSize: 'inherit' }}>
                                {copiedAddress === 'eth' ? 'Kopyalandı!' : <><FaCopy /> Kopyala</>}
                            </button>
                        </div>
                        <div style={{ backgroundColor: '#111214', padding: 8, borderRadius: 4, fontSize: '0.8em', color: '#dcddde', wordBreak: 'break-all' }}>{cryptoAddresses.eth}</div>
                    </div>

                    {/* USDT */}
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9em', color: '#b9bbbe', marginBottom: 5 }}>
                            <span>USDT (TRC20)</span>
                            <button onClick={() => copyToClipboard(cryptoAddresses.usdt, 'usdt')} style={{ cursor: 'pointer', color: '#5865f2', display: 'flex', alignItems: 'center', gap: 5, background: 'none', border: 'none', padding: 0, fontSize: 'inherit' }}>
                                {copiedAddress === 'usdt' ? 'Kopyalandı!' : <><FaCopy /> Kopyala</>}
                            </button>
                        </div>
                        <div style={{ backgroundColor: '#111214', padding: 8, borderRadius: 4, fontSize: '0.8em', color: '#dcddde', wordBreak: 'break-all' }}>{cryptoAddresses.usdt}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupportModal;
