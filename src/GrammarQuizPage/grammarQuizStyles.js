const styles = {
    scrollWrapper: {
        width: '100%',
        height: '100dvh',
        overflowY: 'auto',
        backgroundColor: 'var(--background-primary)',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minHeight: '100%',
        color: 'var(--text-primary)',
        padding: '20px',
        paddingBottom: '50px',
        boxSizing: 'border-box',
        fontFamily: "'Poppins', sans-serif"
    },
    headerArea: {
        width: '100%',
        maxWidth: '800px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
    },
    backLink: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        textDecoration: 'none',
        color: 'var(--text-secondary)',
        fontWeight: '600',
        fontSize: '0.9em',
        marginBottom: '15px',
        alignSelf: 'flex-start'
    },
    mainTitle: { fontSize: 'clamp(1.8em, 5vw, 2.5em)', marginBottom: '10px', color: '#fff' },
    subTitle: { fontSize: '1em', color: 'var(--text-muted)', textAlign: 'center' },
    columnsWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        width: '100%',
        maxWidth: '1000px',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    column: {
        flex: '1 1 280px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
    },
    levelCard: {
        backgroundColor: '#2b2d31', padding: '25px', borderRadius: '16px',
        border: '2px solid transparent', cursor: 'pointer', display: 'flex', alignItems: 'center',
        boxShadow: '0 4px 0 rgba(0,0,0,0.2)', transition: 'transform 0.1s, border-color 0.2s',
        color: '#dbdee1', textAlign: 'left', gap: '15px'
    },
    levelIcon: { fontSize: '2.5em' },
    levelName: { fontSize: '1.2em', fontWeight: '700', color: 'white' },
    levelCount: { fontSize: '0.9em', color: '#949ba4' },
    quizBox: {
        width: '100%', maxWidth: '700px', backgroundColor: '#2b2d31',
        padding: '40px', borderRadius: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        marginTop: '20px'
    },
    questionText: { fontSize: '1.5em', textAlign: 'center', lineHeight: '1.6', color: 'white', fontWeight: '600' },
    optionsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '30px' },
    optionBtn: {
        padding: '20px', fontSize: '1.1em', fontWeight: '600', borderRadius: '12px',
        border: '2px solid #404249', backgroundColor: '#313338', color: '#dbdee1',
        cursor: 'pointer', transition: 'all 0.1s', boxShadow: '0 4px 0 #1e1f22'
    },
    selectedBtn: { borderColor: '#5865f2', backgroundColor: 'rgba(88, 101, 242, 0.1)', color: '#5865f2' },
    correctBtn: { borderColor: '#23a559', backgroundColor: '#23a559', color: 'white', boxShadow: '0 4px 0 #187d41' },
    wrongBtn: { borderColor: '#da373c', backgroundColor: '#da373c', color: 'white', boxShadow: '0 4px 0 #a1282c' },
    footer: { marginTop: '30px', display: 'flex', justifyContent: 'space-between', gap: '10px' },
    checkBtn: {
        padding: '15px 30px', borderRadius: '12px', border: 'none',
        backgroundColor: '#5865f2', color: 'white', fontSize: '1em', fontWeight: 'bold',
        cursor: 'pointer', boxShadow: '0 4px 0 #4752c4', width: '100%'
    },
    knownBtn: {
        padding: '15px', borderRadius: '12px', border: '2px solid #404249',
        backgroundColor: 'transparent', color: '#949ba4', fontWeight: 'bold',
        cursor: 'pointer'
    },
    topBar: {
        width: '100%', maxWidth: '600px', display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px'
    },
    smallBackBtn: {
        background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '1em', cursor: 'pointer', fontWeight: 'bold'
    },
    progressBarBg: {
        flex: 1, height: '10px', backgroundColor: 'var(--background-tertiary)', borderRadius: '5px', overflow: 'hidden'
    },
    progressBarFill: {
        height: '100%', backgroundColor: '#5865f2', borderRadius: '5px', transition: 'width 0.5s ease'
    },
    questionSection: {
        marginBottom: '20px', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    blankSpace: {
        display: 'inline-block', borderBottom: '2px solid', padding: '0 5px', minWidth: '40px', textAlign: 'center', margin: '0 4px', color: 'var(--text-link)', fontWeight: 'bold'
    },
    interactionArea: { marginBottom: '20px' },
    textInput: {
        width: '100%', padding: '15px', fontSize: '1.1em', borderRadius: '10px',
        border: '2px solid', backgroundColor: 'var(--background-primary)', color: 'var(--text-primary)', outline: 'none',
        boxSizing: 'border-box'
    },
    actionButtonGroup: {
        display: 'flex', gap: '10px', flexWrap: 'wrap'
    },
    feedbackBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '20px',
        borderRadius: '12px',
        animation: 'slideUp 0.3s ease',
        textAlign: 'left',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
    },
    explanationContainer: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: '15px',
        borderRadius: '8px',
        marginTop: '5px',
        marginBottom: '15px',
        border: '1px solid rgba(255,255,255,0.05)'
    },
    expTitle: { color: '#fff', fontWeight: 'bold', fontSize: '1.1em', marginBottom: '5px' },
    expTranslation: { color: '#949ba4', fontSize: '0.95em', marginBottom: '10px' },
    separator: { height: '1px', backgroundColor: 'rgba(255,255,255,0.1)', margin: '10px 0' },
    expSection: { fontSize: '0.95em', color: '#dbdee1', lineHeight: '1.5', marginBottom: '8px' },
    exampleItem: {
        fontSize: '0.9em', color: '#b9bbbe', paddingLeft: '10px',
        borderLeft: '2px solid #5865f2', marginBottom: '4px', fontStyle: 'italic'
    },
    nextBtnCorrect: {
        padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#43b581',
        color: 'white', fontWeight: 'bold', cursor: 'pointer', width: '100%', fontSize: '1em'
    },
    nextBtnWrong: {
        padding: '12px', borderRadius: '8px', border: 'none', backgroundColor: '#f04747',
        color: 'white', fontWeight: 'bold', cursor: 'pointer', width: '100%', fontSize: '1em'
    },
    feedbackKnownBtn: {
        background: 'transparent',
        border: 'none',
        color: '#949ba4',
        fontSize: '0.9em',
        cursor: 'pointer',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'color 0.2s',
        opacity: 0.8
    },
    resultCard: {
        backgroundColor: 'var(--background-secondary)', padding: '40px 20px', borderRadius: '20px',
        display: 'flex', flexDirection: 'column', alignItems: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
        maxWidth: '400px', width: '100%', margin: 'auto'
    },
    resultTitle: { fontSize: '1.8em', color: '#fff', margin: '10px 0' },
    resultScore: { fontSize: '1.4em', color: '#7289da', fontWeight: 'bold', marginBottom: '20px' },
    resultMessage: { fontSize: '1.1em', color: 'var(--text-muted)', marginBottom: '30px' },
    resultBtnGroup: { width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' },
    primaryBtn: {
        width: '100%', padding: '15px', borderRadius: '10px', border: 'none',
        backgroundColor: '#5865f2', color: 'white', fontWeight: 'bold', fontSize: '1em',
        cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    secondaryBtn: {
        width: '100%', padding: '15px', borderRadius: '10px', border: '2px solid var(--background-tertiary)',
        backgroundColor: 'transparent', color: 'var(--text-secondary)', fontWeight: 'bold',
        textAlign: 'center', textDecoration: 'none', boxSizing: 'border-box', display: 'block'
    },
};

export default styles;
