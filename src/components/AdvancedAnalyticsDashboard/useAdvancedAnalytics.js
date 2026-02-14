import { useState, useEffect } from 'react';
import { FaArrowUp, FaArrowDown, FaMinus } from 'react-icons/fa';
import toast from '../../utils/toast';

const DEFAULT_OVERVIEW = {
  total_members: 0, active_members: 0, messages_count: 0,
  voice_minutes: 0, member_growth: 0, message_growth: 0
};

export const formatNumber = (num) => {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
};

export const getGrowthIndicator = (value) => {
  if (value > 0) return { icon: FaArrowUp, color: '#23a559', text: `+${value}%` };
  if (value < 0) return { icon: FaArrowDown, color: '#da373c', text: `${value}%` };
  return { icon: FaMinus, color: '#72767d', text: '0%' };
};

export const renderSimpleChart = (data, color = '#5865f2', height = 60) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.value));
  const width = 100 / data.length;
  return (
    <div className="simple-chart" style={{ height }}>
      {data.map((item, idx) => (
        <div key={idx} className="chart-bar" style={{ width: `${width}%`, height: `${(item.value / max) * 100}%`, background: color }} title={`${item.label}: ${item.value}`} />
      ))}
    </div>
  );
};

const useAdvancedAnalytics = (serverId, apiBaseUrl) => {
  const [timeRange, setTimeRange] = useState('7d');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [overview, setOverview] = useState(DEFAULT_OVERVIEW);
  const [memberActivity, setMemberActivity] = useState([]);
  const [messageActivity, setMessageActivity] = useState([]);
  const [topChannels, setTopChannels] = useState([]);
  const [topMembers, setTopMembers] = useState([]);
  const [geoData, setGeoData] = useState([]);
  const [reactionStats, setReactionStats] = useState([]);
  const [linkClicks, setLinkClicks] = useState([]);
  const [peakHours, setPeakHours] = useState([]);

  const fetchAllAnalytics = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      const headers = { 'Authorization': `Bearer ${token}` };
      const base = `${apiBaseUrl}/analytics/${serverId}`;
      const endpoints = ['overview', 'member-activity', 'message-activity', 'top-channels', 'top-members', 'geo', 'reactions', 'link-clicks', 'peak-hours'];
      const results = await Promise.all(endpoints.map(ep => fetch(`${base}/${ep}/?range=${timeRange}`, { headers })));
      const [oRes, mRes, msgRes, chRes, memRes, gRes, rRes, lRes, pRes] = results;
      if (oRes.ok) setOverview(await oRes.json());
      if (mRes.ok) setMemberActivity((await mRes.json()).data || []);
      if (msgRes.ok) setMessageActivity((await msgRes.json()).data || []);
      if (chRes.ok) setTopChannels((await chRes.json()).channels || []);
      if (memRes.ok) setTopMembers((await memRes.json()).members || []);
      if (gRes.ok) setGeoData((await gRes.json()).data || []);
      if (rRes.ok) setReactionStats((await rRes.json()).reactions || []);
      if (lRes.ok) setLinkClicks((await lRes.json()).links || []);
      if (pRes.ok) setPeakHours((await pRes.json()).hours || []);
    } catch (error) {
      console.error('Fetch analytics error:', error);
      toast.error('❌ Analitik verileri yüklenemedi');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAllAnalytics(); }, [serverId, timeRange]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllAnalytics();
    setRefreshing(false);
    toast.success('🔄 Veriler güncellendi');
  };

  const handleExport = () => {
    const exportData = {
      exported_at: new Date().toISOString(), time_range: timeRange,
      overview, memberActivity, messageActivity, topChannels, topMembers, geoData, reactionStats
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `analytics_${serverId}_${timeRange}.json`; a.click();
    URL.revokeObjectURL(url);
    toast.success('📥 Analitik verileri indirildi');
  };

  return {
    timeRange, setTimeRange, loading, refreshing,
    overview, memberActivity, messageActivity, topChannels, topMembers,
    geoData, reactionStats, linkClicks, peakHours,
    handleRefresh, handleExport,
  };
};

export default useAdvancedAnalytics;
