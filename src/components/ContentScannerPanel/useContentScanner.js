import { useState, useEffect } from 'react';
import { toast } from '../../utils/toast';

const useContentScanner = (fetchWithAuth, apiBaseUrl, messageId) => {
  const [scanResults, setScanResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const fetchResults = async () => {
    setLoading(true);
    try {
      const url = messageId
        ? `${apiBaseUrl}/messages/${messageId}/scan_results/`
        : `${apiBaseUrl}/content_scanner/results/`;
      const response = await fetchWithAuth(url);
      const data = await response.json();
      setScanResults(data.results || []);
    } catch (error) {
      toast.error('Failed to load scan results');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResults(); }, [messageId]);

  const exportResults = async () => {
    try {
      const response = await fetchWithAuth(`${apiBaseUrl}/content_scanner/export/`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filter })
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = `scan_results_${new Date().toISOString()}.csv`;
      document.body.appendChild(a); a.click(); a.remove();
      toast.success('Results exported successfully');
    } catch (error) {
      toast.error('Failed to export results');
    }
  };

  const reviewResult = async (resultId, action) => {
    try {
      await fetchWithAuth(`${apiBaseUrl}/content_scanner/results/${resultId}/review/`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      toast.success(`Content ${action}ed successfully`);
      fetchResults();
    } catch (error) {
      toast.error('Failed to review content');
    }
  };

  const filteredResults = scanResults.filter(r => filter === 'all' || r.status === filter);

  return { scanResults, filteredResults, loading, filter, setFilter, exportResults, reviewResult };
};

export default useContentScanner;
