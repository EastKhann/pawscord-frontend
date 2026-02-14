import { useState, useEffect, useCallback } from 'react';
import { API_BASE_URL } from '../../utils/apiEndpoints';

const useBotMarketplace = () => {
    const [bots, setBots] = useState([]);
    const [featuredBots, setFeaturedBots] = useState([]);
    const [trendingBots, setTrendingBots] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('popular');
    const [selectedBot, setSelectedBot] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const API_URL = API_BASE_URL;

    const loadBots = useCallback(async () => {
        try {
            const params = new URLSearchParams({
                page,
                sort: sortBy,
                limit: 20
            });
            if (selectedCategory) params.append('category', selectedCategory);
            if (searchQuery) params.append('search', searchQuery);

            const response = await fetch(`${API_URL}/bots/?${params}`);
            if (response.ok) {
                const data = await response.json();
                setBots(data.bots || []);
                setTotalPages(data.pages || 1);
            }
        } catch (e) {
            console.error('Failed to load bots:', e);
        }
    }, [API_URL, page, sortBy, selectedCategory, searchQuery]);

    const loadInitialData = useCallback(async () => {
        setLoading(true);
        try {
            const [categoriesRes, featuredRes, trendingRes] = await Promise.all([
                fetch(`${API_URL}/bots/categories/`),
                fetch(`${API_URL}/bots/featured/`),
                fetch(`${API_URL}/bots/trending/`)
            ]);

            if (categoriesRes.ok) {
                const data = await categoriesRes.json();
                setCategories(data.categories || []);
            }
            if (featuredRes.ok) {
                const data = await featuredRes.json();
                setFeaturedBots(data.bots || []);
            }
            if (trendingRes.ok) {
                const data = await trendingRes.json();
                setTrendingBots(data.bots || []);
            }
        } catch (e) {
            console.error('Failed to load initial data:', e);
        }
        setLoading(false);
    }, [API_URL]);

    const loadBotDetail = async (bot) => {
        try {
            const response = await fetch(`${API_URL}/bots/${bot.id}/`);
            if (response.ok) {
                const data = await response.json();
                setSelectedBot(data);
            }
        } catch (e) {
            console.error('Failed to load bot detail:', e);
        }
    };

    useEffect(() => { loadInitialData(); }, [loadInitialData]);
    useEffect(() => { loadBots(); }, [loadBots]);

    return {
        bots, featuredBots, trendingBots, categories, loading,
        selectedCategory, setSelectedCategory,
        searchQuery, setSearchQuery,
        sortBy, setSortBy,
        selectedBot, setSelectedBot,
        page, setPage, totalPages,
        loadBotDetail
    };
};

export default useBotMarketplace;
