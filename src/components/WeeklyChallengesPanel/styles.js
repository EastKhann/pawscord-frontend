// WeeklyChallengesPanel/styles.js
const styles = {
    container: { backgroundColor: '#36393f', borderRadius: '8px', padding: '20px', color: '#dcddde' },
    loading: {
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', gap: '16px', padding: '60px', color: '#b9bbbe'
    },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
    headerLeft: { display: 'flex', alignItems: 'center', gap: '16px' },
    title: { margin: 0, fontSize: '18px', fontWeight: '600', color: '#fff' },
    subtitle: { margin: '4px 0 0', fontSize: '13px', color: '#72767d' },
    timer: {
        display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
        backgroundColor: '#2f3136', borderRadius: '4px', fontSize: '13px', color: '#b9bbbe'
    },
    statsGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '20px' },
    statCard: {
        display: 'flex', alignItems: 'center', gap: '12px',
        padding: '16px', backgroundColor: '#2f3136', borderRadius: '8px'
    },
    statInfo: { display: 'flex', flexDirection: 'column' },
    statValue: { fontSize: '20px', fontWeight: '700', color: '#fff' },
    statLabel: { fontSize: '11px', color: '#72767d', textTransform: 'uppercase' },
    tabs: {
        display: 'flex', gap: '8px', marginBottom: '16px',
        borderBottom: '1px solid #40444b', paddingBottom: '12px'
    },
    tab: {
        display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
        backgroundColor: 'transparent', border: 'none', borderRadius: '4px',
        color: '#72767d', fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s'
    },
    tabActive: { backgroundColor: '#5865f2', color: '#fff' },
    challengesList: { display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' },
    challengeCard: {
        display: 'flex', alignItems: 'center', gap: '16px', padding: '16px',
        backgroundColor: '#2f3136', borderRadius: '8px', transition: 'transform 0.2s'
    },
    challengeIcon: {
        width: '48px', height: '48px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#202225', borderRadius: '12px', fontSize: '20px'
    },
    challengeContent: { flex: 1 },
    challengeHeader: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' },
    challengeTitle: { margin: 0, fontSize: '15px', fontWeight: '600', color: '#fff' },
    difficultyStars: { display: 'flex', gap: '2px' },
    challengeDescription: { margin: '0 0 8px', fontSize: '13px', color: '#b9bbbe' },
    progressContainer: { display: 'flex', alignItems: 'center', gap: '8px' },
    progressBar: {
        flex: 1, height: '6px', backgroundColor: '#202225', borderRadius: '3px', overflow: 'hidden'
    },
    progressFill: { height: '100%', backgroundColor: '#5865f2', borderRadius: '3px', transition: 'width 0.3s' },
    progressText: { fontSize: '12px', color: '#72767d', minWidth: '45px', textAlign: 'right' },
    challengeReward: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' },
    pointsBadge: {
        display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px',
        backgroundColor: 'rgba(250, 166, 26, 0.2)', borderRadius: '12px',
        fontSize: '12px', color: '#faa61a', fontWeight: '600'
    },
    rewardBadge: {
        display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px',
        backgroundColor: 'rgba(88, 101, 242, 0.2)', borderRadius: '12px',
        fontSize: '11px', color: '#dcddde'
    },
    rewardsSection: { marginBottom: '20px' },
    rewardsSectionTitle: {
        display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 12px',
        fontSize: '14px', fontWeight: '600', color: '#fff'
    },
    rewardsList: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
    earnedReward: {
        display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px',
        backgroundColor: '#2f3136', borderRadius: '16px', fontSize: '13px', color: '#dcddde'
    },
    summaryCard: {
        padding: '20px',
        background: 'linear-gradient(135deg, rgba(88, 101, 242, 0.3) 0%, rgba(114, 137, 218, 0.3) 100%)',
        borderRadius: '12px', border: '1px solid rgba(88, 101, 242, 0.5)'
    },
    summaryHeader: {
        display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px',
        fontSize: '14px', fontWeight: '600', color: '#fff'
    },
    summaryStats: { display: 'flex', justifyContent: 'space-around', marginBottom: '16px' },
    summaryItem: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
    summaryValue: { fontSize: '24px', fontWeight: '700', color: '#fff' },
    summaryLabel: { fontSize: '11px', color: '#b9bbbe', textTransform: 'uppercase' },
    totalProgressBar: {
        height: '8px', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: '4px', overflow: 'hidden'
    },
    totalProgressFill: { height: '100%', backgroundColor: '#43b581', borderRadius: '4px', transition: 'width 0.3s' }
};

export default styles;
