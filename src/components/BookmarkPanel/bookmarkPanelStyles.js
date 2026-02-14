export const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999999
  },
  modal: {
    backgroundColor: '#1e1e1e',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '800px',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    color: '#fff'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    borderBottom: '1px solid #333'
  },
  closeBtn: {
    cursor: 'pointer',
    fontSize: '24px',
    color: '#888',
    transition: 'color 0.2s'
  },
  toolbar: {
    display: 'flex',
    gap: '10px',
    padding: '15px 20px',
    borderBottom: '1px solid #333'
  },
  searchBox: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: '#2c2f33',
    padding: '10px 15px',
    borderRadius: '8px'
  },
  searchInput: {
    flex: 1,
    background: 'none',
    border: 'none',
    color: '#fff',
    outline: 'none',
    fontSize: '14px'
  },
  newTagBtn: {
    backgroundColor: '#5865f2',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.2s'
  },
  tagsContainer: {
    display: 'flex',
    gap: '10px',
    padding: '15px 20px',
    overflowX: 'auto',
    borderBottom: '1px solid #333'
  },
  tagChip: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 16px',
    borderRadius: '16px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#fff',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s'
  },
  bookmarksList: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px'
  },
  bookmarkItem: {
    display: 'flex',
    gap: '15px',
    padding: '15px',
    backgroundColor: '#2c2f33',
    borderRadius: '8px',
    marginBottom: '10px',
    transition: 'background-color 0.2s'
  },
  bookmarkContent: { flex: 1 },
  bookmarkMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  bookmarkText: {
    color: '#dcddde',
    marginBottom: '10px',
    cursor: 'pointer',
    lineHeight: '1.5'
  },
  bookmarkTags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  miniTag: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '12px',
    color: '#fff',
    fontWeight: '500'
  },
  tagSelect: {
    backgroundColor: '#1e1e1e',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: '4px',
    padding: '4px 8px',
    fontSize: '12px',
    cursor: 'pointer'
  },
  deleteBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ed4245',
    cursor: 'pointer',
    fontSize: '18px',
    padding: '10px',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#888'
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    color: '#888'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999999
  },
  newTagModal: {
    backgroundColor: '#2c2f33',
    padding: '30px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '400px',
    color: '#fff'
  },
  input: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#1e1e1e',
    border: '1px solid #444',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '14px',
    marginTop: '15px',
    outline: 'none'
  },
  colorPicker: {
    width: '60px',
    height: '40px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: '#5865f2',
    color: '#fff',
    border: 'none',
    padding: '12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: '#4e5058',
    color: '#fff',
    border: 'none',
    padding: '12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600'
  }
};
