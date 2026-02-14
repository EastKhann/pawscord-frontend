export const CATEGORIES = [
  { id: 'face_shapes', name: 'Face', icon: '\uD83D\uDC64' },
  { id: 'skin_tones', name: 'Skin', icon: '\uD83C\uDFA8' },
  { id: 'eyes', name: 'Eyes', icon: '\uD83D\uDC41\uFE0F' },
  { id: 'eye_colors', name: 'Eye Color', icon: '\uD83D\uDD35' },
  { id: 'hairstyles', name: 'Hair', icon: '\uD83D\uDC87' },
  { id: 'hair_colors', name: 'Hair Color', icon: '\uD83C\uDF08' },
  { id: 'mouths', name: 'Mouth', icon: '\uD83D\uDC44' },
  { id: 'accessories', name: 'Accessories', icon: '\uD83D\uDC53' },
  { id: 'backgrounds', name: 'Background', icon: '\uD83D\uDDBC\uFE0F' },
  { id: 'expressions', name: 'Expression', icon: '\uD83D\uDE0A' }
];

const CATEGORY_KEY_MAP = {
  face_shapes: 'face_shape', skin_tones: 'skin_tone', hairstyles: 'hairstyle',
  mouths: 'mouth', accessories: 'accessory', backgrounds: 'background',
  expressions: 'expression', eyes: 'eyes', eye_colors: 'eye_color', hair_colors: 'hair_color'
};
export { CATEGORY_KEY_MAP };

export const styles = {
  overlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10000 },
  modal: { backgroundColor: '#2f3136', borderRadius: '12px', width: '900px', maxHeight: '90vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', alignItems: 'center', padding: '20px', borderBottom: '1px solid #40444b' },
  headerLeft: { display: 'flex', alignItems: 'center', flex: 1 },
  title: { margin: 0, color: '#fff', fontSize: '20px' },
  coinsDisplay: { display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', marginRight: '20px', background: '#40444b', padding: '6px 12px', borderRadius: '20px' },
  closeButton: { background: 'none', border: 'none', color: '#b9bbbe', cursor: 'pointer', fontSize: '20px' },
  tabs: { display: 'flex', padding: '10px 20px', gap: '10px', borderBottom: '1px solid #40444b' },
  tab: { background: '#40444b', border: 'none', color: '#b9bbbe', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' },
  activeTab: { background: '#5865f2', border: 'none', color: '#fff', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' },
  mainContent: { display: 'flex', padding: '20px', gap: '20px', overflowY: 'auto', flex: 1 },
  previewSection: { width: '250px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' },
  previewActions: { display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' },
  actionBtn: { background: '#40444b', border: 'none', color: '#fff', padding: '10px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' },
  saveBtn: { background: '#57f287', border: 'none', color: '#000', padding: '12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: 'bold' },
  customizeSection: { flex: 1 },
  categoryTabs: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '15px' },
  catBtn: { background: '#40444b', border: 'none', color: '#b9bbbe', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' },
  catActive: { background: '#5865f2', border: 'none', color: '#fff', padding: '8px 12px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' },
  catName: { display: 'none' },
  itemsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' },
  itemCard: { background: '#40444b', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', cursor: 'pointer', position: 'relative' },
  itemSelected: { border: '2px solid #5865f2', background: '#36393f' },
  itemLocked: { opacity: 0.7, cursor: 'default' },
  colorSwatch: { width: '40px', height: '40px', borderRadius: '50%', border: '2px solid #fff' },
  itemPreview: { width: '40px', height: '40px', borderRadius: '50%', background: '#5865f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' },
  itemName: { color: '#dcddde', fontSize: '11px', textAlign: 'center' },
  buyBtn: { position: 'absolute', bottom: '8px', right: '8px', background: '#faa61a', border: 'none', color: '#000', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '10px', display: 'flex', alignItems: 'center', gap: '4px' },
  presetsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px', width: '100%' },
  presetCard: { background: '#40444b', borderRadius: '10px', padding: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' },
  presetName: { color: '#fff', fontSize: '14px' },
  loadBtn: { background: '#5865f2', border: 'none', color: '#fff', padding: '6px 16px', borderRadius: '4px', cursor: 'pointer' },
  emptyText: { color: '#72767d', textAlign: 'center', gridColumn: '1 / -1', padding: '40px' }
};
