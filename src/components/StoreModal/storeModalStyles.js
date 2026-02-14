const styles = {
    overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999999 },
    modal: { backgroundColor: '#1e1e1e', borderRadius: '8px', width: '95%', maxWidth: '1200px', maxHeight: '90vh', display: 'flex', flexDirection: 'column', color: '#fff' },
    header: { padding: '20px', borderBottom: '1px solid #444', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '12px' },
    headerRight: { display: 'flex', alignItems: 'center', gap: '16px' },
    balance: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#2c2f33', padding: '8px 16px', borderRadius: '20px', fontSize: '16px', fontWeight: '600' },
    closeBtn: { background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer', padding: '8px' },
    categories: { display: 'flex', gap: '8px', padding: '16px 20px', borderBottom: '1px solid #444', overflowX: 'auto' },
    categoryBtn: { background: 'none', border: 'none', color: '#99aab5', padding: '10px 16px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap', transition: 'all 0.2s' },
    activeCategoryBtn: { backgroundColor: '#5865f2', color: '#fff' },
    content: { padding: '20px', overflowY: 'auto', flex: 1 },
    loading: { textAlign: 'center', padding: '40px', color: '#99aab5' },
    section: { marginBottom: '32px' },
    sectionTitle: { fontSize: '18px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' },
    itemsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' },
    itemCard: { backgroundColor: '#2c2f33', borderRadius: '8px', padding: '12px', cursor: 'pointer', transition: 'transform 0.2s', position: 'relative', overflow: 'hidden' },
    itemImage: { width: '100%', height: '150px', objectFit: 'cover', borderRadius: '6px', marginBottom: '8px' },
    itemPlaceholder: { width: '100%', height: '150px', backgroundColor: '#202225', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' },
    itemInfo: { display: 'flex', flexDirection: 'column', gap: '8px' },
    itemName: { fontSize: '14px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
    itemPrice: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '16px', fontWeight: 'bold' },
    limitedBadge: { position: 'absolute', top: '12px', right: '12px', backgroundColor: '#f04747', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' },
    empty: { textAlign: 'center', padding: '40px', color: '#99aab5' },
    detailOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000000 },
    detailModal: { backgroundColor: '#2c2f33', borderRadius: '12px', padding: '32px', maxWidth: '500px', width: '90%', position: 'relative', textAlign: 'center' },
    detailClose: { position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff', fontSize: '24px', cursor: 'pointer' },
    detailImage: { width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' },
    detailPlaceholder: { width: '100%', height: '300px', backgroundColor: '#202225', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' },
    detailName: { fontSize: '28px', fontWeight: 'bold', marginBottom: '12px' },
    detailRarity: { display: 'inline-block', padding: '6px 12px', backgroundColor: '#202225', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', marginBottom: '16px' },
    detailDescription: { fontSize: '14px', color: '#dcddde', lineHeight: '1.6', marginBottom: '24px' },
    detailPrice: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '24px', color: '#faa61a' },
    purchaseBtn: { width: '100%', padding: '14px', backgroundColor: '#43b581', border: 'none', borderRadius: '6px', color: '#fff', fontSize: '16px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' },
    purchaseBtnDisabled: { backgroundColor: '#555', cursor: 'not-allowed' }
};

export default styles;

export const CATEGORIES = [
    { id: 'all', name: 'All Items', icon: 'FaShoppingCart' },
    { id: 'cosmetics', name: 'Cosmetics', icon: 'FaPalette' },
    { id: 'badges', name: 'Badges', icon: 'FaMedal' },
    { id: 'boosters', name: 'Boosters', icon: 'FaFire' },
    { id: 'special', name: 'Special', icon: 'FaCrown' }
];

export const getRarityColor = (rarity) => {
    const colors = { common: '#b0b0b0', uncommon: '#1eff00', rare: '#0070dd', epic: '#a335ee', legendary: '#ff8000' };
    return colors[rarity] || colors.common;
};
