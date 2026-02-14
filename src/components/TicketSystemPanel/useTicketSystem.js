import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getApiBase } from '../../utils/apiEndpoints';
import confirmDialog from '../../utils/confirmDialog';

const useTicketSystem = (serverId) => {
  const apiBaseUrl = getApiBase();
  const authHeader = () => ({
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`
  });

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [config, setConfig] = useState({
    enabled: false,
    category_id: '',
    support_role_id: '',
    max_tickets_per_user: 3,
    auto_close_after: 48,
    transcript_channel_id: '',
    welcome_message: 'Merhaba! Destek ekibimiz en kısa sürede size yardımcı olacak.'
  });
  const [categories, setCategories] = useState([]);
  const [roles, setRoles] = useState([]);
  const [channels, setChannels] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const fetchConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/server/${serverId}/config/`, {
        headers: authHeader()
      });
      if (response.ok) setConfig(await response.json());
    } catch (error) {
      console.error('Error fetching config:', error);
    }
  };

  const fetchTickets = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/server/${serverId}/`, {
        headers: authHeader()
      });
      if (response.ok) setTickets(await response.json());
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/categories/`, {
        headers: authHeader()
      });
      if (response.ok) setCategories(await response.json());
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/roles/server/${serverId}/`, {
        headers: authHeader()
      });
      if (response.ok) setRoles(await response.json());
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const fetchChannels = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/channels/server/${serverId}/`, {
        headers: authHeader()
      });
      if (response.ok) {
        const data = await response.json();
        setChannels(data.filter(ch => ch.type === 'text'));
      }
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  useEffect(() => {
    fetchConfig();
    fetchTickets();
    fetchCategories();
    fetchRoles();
    fetchChannels();
  }, [serverId]);

  const updateConfig = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/server/${serverId}/config/update/`, {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });
      if (response.ok) toast.success('✅ Ayarlar güncellendi');
      else toast.error('❌ Ayarlar güncellenemedi');
    } catch (error) {
      console.error('Error updating config:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const closeTicket = async (ticketId) => {
    if (!await confirmDialog('Ticket\'ı kapatmak istediğinize emin misiniz?')) return;
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/close/`, {
        method: 'POST',
        headers: authHeader()
      });
      if (response.ok) {
        toast.success('✅ Ticket kapatıldı');
        fetchTickets();
        if (selectedTicket?.id === ticketId) setSelectedTicket(null);
      } else {
        toast.error('❌ Ticket kapatılamadı');
      }
    } catch (error) {
      console.error('Error closing ticket:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const assignTicket = async (ticketId, userId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/assign/`, {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId })
      });
      if (response.ok) { toast.success('✅ Ticket atandı'); fetchTickets(); }
      else toast.error('❌ Ticket atanamadı');
    } catch (error) {
      console.error('Error assigning ticket:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const setPriority = async (ticketId, priority) => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/priority/`, {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority })
      });
      if (response.ok) { toast.success('✅ Öncelik güncellendi'); fetchTickets(); }
      else toast.error('❌ Öncelik güncellenemedi');
    } catch (error) {
      console.error('Error setting priority:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${selectedTicket.id}/reply/`, {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: newMessage })
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedTicket({
          ...selectedTicket,
          messages: [...(selectedTicket.messages || []), data.message]
        });
        setNewMessage('');
        toast.success('✅ Mesaj gönderildi');
      } else {
        toast.error('❌ Mesaj gönderilemedi');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const exportTranscript = async (ticketId) => {
    try {
      const response = await fetch(`${apiBaseUrl}/tickets/${ticketId}/transcript/`, {
        headers: authHeader()
      });
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ticket-${ticketId}-transcript.txt`;
        a.click();
        toast.success('✅ Transcript indirildi');
      } else {
        toast.error('❌ Transcript indirilemedi');
      }
    } catch (error) {
      console.error('Error exporting transcript:', error);
      toast.error('❌ Bağlantı hatası');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      open: { text: 'Açık', color: '#10b981' },
      assigned: { text: 'Atandı', color: '#f59e0b' },
      closed: { text: 'Kapalı', color: '#6b7280' }
    };
    return badges[status] || badges.open;
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      low: { text: 'Düşük', color: '#10b981' },
      medium: { text: 'Orta', color: '#f59e0b' },
      high: { text: 'Yüksek', color: '#ef4444' },
      urgent: { text: 'Acil', color: '#dc2626' }
    };
    return badges[priority] || badges.medium;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  return {
    tickets, loading, config, setConfig, categories, roles, channels,
    selectedTicket, setSelectedTicket, newMessage, setNewMessage,
    updateConfig, closeTicket, assignTicket, setPriority,
    sendMessage, exportTranscript,
    getStatusBadge, getPriorityBadge, formatDate
  };
};

export default useTicketSystem;
