import { getRarityColor } from './useStorePage';
import useModalA11y from '../../hooks/useModalA11y';

const ItemDetailModal = ({ item, isOwned, onPurchase, onClose }) => {
  const { overlayProps, dialogProps } = useModalA11y({ onClose, isOpen: true, label: 'Item Detail' });
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }} {...overlayProps}>
      <div style={{ background: 'linear-gradient(135deg, #2c2f33 0%, #23272a 100%)', borderRadius: '20px', padding: '40px', maxWidth: '500px', width: '90%', border: `3px solid ${getRarityColor(item.rarity)}`, boxShadow: `0 0 40px ${getRarityColor(item.rarity)}60` }} onClick={(e) => e.stopPropagation()} {...dialogProps}>
        <div style={{ textAlign: 'center', fontSize: '100px', marginBottom: '20px' }}>{item.preview_url || '🎁'}</div>
        <h2 style={{ margin: '0 0 10px', fontSize: '28px', color: getRarityColor(item.rarity) }}>{item.name}</h2>
        <p style={{ margin: '0 0 20px', color: '#aaa', fontSize: '16px' }}>{item.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '12px 24px', borderRadius: '10px', cursor: 'pointer', fontWeight: 600 }}>
            Kapat
          </button>
          {!isOwned && (
            <button onClick={() => onPurchase(item)} style={{ background: 'linear-gradient(135deg, #43b581 0%, #3ca374 100%)', border: 'none', color: '#fff', padding: '12px 32px', borderRadius: '10px', cursor: 'pointer', fontWeight: 700, fontSize: '16px' }}>
              Sat{'ı'}n Al ({item.price} {'💰'})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetailModal;
