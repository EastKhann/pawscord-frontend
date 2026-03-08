import useStorePage, { CATEGORIES, getRarityColor } from './StorePage/useStorePage';
import ItemDetailModal from './StorePage/ItemDetailModal';

const StorePage = () => {
  const s = useStorePage();

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'radial-gradient(ellipse at 10% 10%, rgba(88,101,242,0.12) 0%, transparent 55%), radial-gradient(ellipse at 90% 90%, rgba(124,58,237,0.08) 0%, transparent 50%), #0b0d10', color: '#fff' }}>
      {/* HEADER */}
      <div style={{ background: 'rgba(30,31,35,0.88)', backdropFilter: 'blur(48px) saturate(180%)', WebkitBackdropFilter: 'blur(48px) saturate(180%)', padding: '20px 40px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 800, background: 'linear-gradient(135deg, #ffffff 20%, #b8b9c7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{'🛒'} Pawscord Ma{'ğ'}aza</h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ background: 'linear-gradient(135deg, #F1C40F 0%, #F39C12 100%)', padding: '12px 24px', borderRadius: '13px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '18px', boxShadow: '0 4px 0 #c8960e, 0 8px 24px rgba(241,196,15,0.35)' }}>
            <span>{'💰'}</span><span>{s.userCoins.toLocaleString()} Coins</span>
          </div>
          {s.premiumTier !== 'free' && (
            <div style={{ background: s.premiumTier === 'elite' ? 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)' : 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)', padding: '12px 24px', borderRadius: '13px', fontWeight: 700, boxShadow: s.premiumTier === 'elite' ? '0 4px 0 #922722, 0 8px 20px rgba(231,76,60,0.35)' : '0 4px 0 #3b45c7, 0 8px 20px rgba(88,101,242,0.35)' }}>
              {s.premiumTier === 'elite' ? '👑 Elite' : '💎 Premium'}
            </div>
          )}
        </div>
      </div>

      {/* CATEGORIES */}
      <div style={{ padding: '30px 40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => s.setActiveCategory(cat.id)}
              style={{ background: s.activeCategory === cat.id ? 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)' : 'rgba(255,255,255,0.05)', border: s.activeCategory === cat.id ? '1px solid #5865F2' : '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '12px 24px', borderRadius: '13px', cursor: 'pointer', fontSize: '16px', fontWeight: 600, transition: 'all 0.2s', boxShadow: s.activeCategory === cat.id ? '0 4px 0 #3b45c7, 0 8px 20px rgba(88,101,242,0.30)' : 'none' }}
              onMouseEnter={(e) => { if (s.activeCategory !== cat.id) e.target.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={(e) => { if (s.activeCategory !== cat.id) e.target.style.background = 'rgba(255,255,255,0.05)'; }}
            >{cat.name}</button>
          ))}
        </div>
      </div>

      {/* ITEMS GRID */}
      <div style={{ padding: '40px' }}>
        {s.loading ? (
          <div style={{ textAlign: 'center', padding: '60px', fontSize: '20px' }}>{'⏳'} Y{'ü'}kleniyor...</div>
        ) : s.items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', fontSize: '18px', color: '#888' }}>Bu kategoride hen{'ü'}z {'öğ'}e yok</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {s.items.map(item => {
              const owned = s.isOwned(item.item_id);
              return (
                <div key={item.id} onClick={() => s.setSelectedItem(item)}
                  style={{ background: 'rgba(30,31,35,0.88)', backdropFilter: 'blur(48px) saturate(180%)', WebkitBackdropFilter: 'blur(48px) saturate(180%)', borderRadius: '22px', padding: '20px', border: `1px solid ${getRarityColor(item.rarity)}30`, boxShadow: `0 0 0 1px rgba(255,255,255,0.05), 0 0 24px ${getRarityColor(item.rarity)}20, 0 8px 32px rgba(0,0,0,0.4)`, cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', position: 'relative' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {owned && <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#23a559', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}>{'✅'} Sahip</div>}
                  {item.premium_required && <div style={{ position: 'absolute', top: '10px', left: '10px', background: item.premium_required === 'elite' ? '#E74C3C' : '#5865F2', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}>{item.premium_required === 'elite' ? '👑 Elite' : '💎 Premium'}</div>}
                  <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px', marginTop: item.premium_required ? '30px' : '0' }}>{item.preview_url || '🎁'}</div>
                  <h3 style={{ margin: '16px 0 8px', fontSize: '20px', color: getRarityColor(item.rarity) }}>{item.name}</h3>
                  <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#aaa', minHeight: '40px' }}>{item.description}</p>
                  <div style={{ fontSize: '12px', color: getRarityColor(item.rarity), fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>{item.rarity}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#F1C40F' }}>{item.price === 0 ? 'ÜCRETSIZ' : `${item.price} 💰`}</div>
                    {!owned && (
                      <button onClick={(e) => { e.stopPropagation(); s.handlePurchase(item); }}
                        style={{ background: 'linear-gradient(135deg, #23a559 0%, #1d8f4a 100%)', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '13px', fontWeight: 700, cursor: 'pointer', fontSize: '14px', boxShadow: '0 4px 0 #177a3e, 0 8px 20px rgba(35,165,89,0.35)', transition: 'all 0.15s' }}
                        onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                      >Sat{'ı'}n Al</button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {s.selectedItem && <ItemDetailModal item={s.selectedItem} isOwned={s.isOwned(s.selectedItem.item_id)} onPurchase={s.handlePurchase} onClose={() => s.setSelectedItem(null)} />}
    </div>
  );
};

export default StorePage;
