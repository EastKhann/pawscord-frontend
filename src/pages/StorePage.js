import useStorePage, { CATEGORIES, getRarityColor } from './StorePage/useStorePage';
import ItemDetailModal from './StorePage/ItemDetailModal';

const StorePage = () => {
  const s = useStorePage();

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(135deg, #1e1e1e 0%, #2c2c2c 100%)', color: '#fff' }}>
      {/* HEADER */}
      <div style={{ background: 'rgba(0,0,0,0.3)', padding: '20px 40px', borderBottom: '2px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: 700 }}>{'\uD83D\uDED2'} Pawscord Ma{'\u011F'}aza</h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ background: 'linear-gradient(135deg, #F1C40F 0%, #F39C12 100%)', padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '18px' }}>
            <span>{'\uD83D\uDCB0'}</span><span>{s.userCoins.toLocaleString()} Coins</span>
          </div>
          {s.premiumTier !== 'free' && (
            <div style={{ background: s.premiumTier === 'elite' ? 'linear-gradient(135deg, #E74C3C 0%, #C0392B 100%)' : 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)', padding: '12px 24px', borderRadius: '12px', fontWeight: 700 }}>
              {s.premiumTier === 'elite' ? '\uD83D\uDC51 Elite' : '\uD83D\uDC8E Premium'}
            </div>
          )}
        </div>
      </div>

      {/* CATEGORIES */}
      <div style={{ padding: '30px 40px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} onClick={() => s.setActiveCategory(cat.id)}
              style={{ background: s.activeCategory === cat.id ? 'linear-gradient(135deg, #5865F2 0%, #4752C4 100%)' : 'rgba(255,255,255,0.05)', border: s.activeCategory === cat.id ? '2px solid #5865F2' : '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '12px 24px', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', fontWeight: 600, transition: 'all 0.3s' }}
              onMouseEnter={(e) => { if (s.activeCategory !== cat.id) e.target.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={(e) => { if (s.activeCategory !== cat.id) e.target.style.background = 'rgba(255,255,255,0.05)'; }}
            >{cat.name}</button>
          ))}
        </div>
      </div>

      {/* ITEMS GRID */}
      <div style={{ padding: '40px' }}>
        {s.loading ? (
          <div style={{ textAlign: 'center', padding: '60px', fontSize: '20px' }}>{'\u23F3'} Y{'\u00FC'}kleniyor...</div>
        ) : s.items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', fontSize: '18px', color: '#888' }}>Bu kategoride hen{'\u00FC'}z {'\u00F6\u011F'}e yok</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {s.items.map(item => {
              const owned = s.isOwned(item.item_id);
              return (
                <div key={item.id} onClick={() => s.setSelectedItem(item)}
                  style={{ background: 'linear-gradient(135deg, #2c2f33 0%, #23272a 100%)', borderRadius: '16px', padding: '20px', border: `2px solid ${getRarityColor(item.rarity)}`, boxShadow: `0 0 20px ${getRarityColor(item.rarity)}40`, cursor: 'pointer', transition: 'transform 0.3s', position: 'relative' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-5px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {owned && <div style={{ position: 'absolute', top: '10px', right: '10px', background: '#43b581', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}>{'\u2705'} Sahip</div>}
                  {item.premium_required && <div style={{ position: 'absolute', top: '10px', left: '10px', background: item.premium_required === 'elite' ? '#E74C3C' : '#5865F2', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 700 }}>{item.premium_required === 'elite' ? '\uD83D\uDC51 Elite' : '\uD83D\uDC8E Premium'}</div>}
                  <div style={{ height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px', marginTop: item.premium_required ? '30px' : '0' }}>{item.preview_url || '\uD83C\uDF81'}</div>
                  <h3 style={{ margin: '16px 0 8px', fontSize: '20px', color: getRarityColor(item.rarity) }}>{item.name}</h3>
                  <p style={{ margin: '0 0 16px', fontSize: '14px', color: '#aaa', minHeight: '40px' }}>{item.description}</p>
                  <div style={{ fontSize: '12px', color: getRarityColor(item.rarity), fontWeight: 700, textTransform: 'uppercase', marginBottom: '12px' }}>{item.rarity}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 700, color: '#F1C40F' }}>{item.price === 0 ? '\u00DCCRETSIZ' : `${item.price} \uD83D\uDCB0`}</div>
                    {!owned && (
                      <button onClick={(e) => { e.stopPropagation(); s.handlePurchase(item); }}
                        style={{ background: 'linear-gradient(135deg, #43b581 0%, #3ca374 100%)', border: 'none', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '14px' }}
                        onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; }}
                        onMouseLeave={(e) => { e.target.style.transform = 'scale(1)'; }}
                      >Sat{'\u0131'}n Al</button>
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
