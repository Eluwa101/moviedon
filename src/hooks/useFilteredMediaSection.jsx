import { useState, useEffect, useCallback } from 'react';

export const useFilteredMediaSection = (filters) => {
  const [selectedKey, setSelectedKey] = useState(filters[0].key);
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const filter = filters.find((f) => f.key === selectedKey);
    const load = async () => {
      setLoading(true);
      try {
        const data = await filter.fetchFn(currentPage);
        if (!cancelled) setItems(data);
      } catch {
        // silent
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [filters, selectedKey, currentPage]);

  const selectFilter = useCallback((key) => {
    setSelectedKey(key);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((direction) => {
    setCurrentPage((prev) => (direction === 'next' ? prev + 1 : Math.max(prev - 1, 1)));
  }, []);

  return { items, currentPage, loading, selectedKey, selectFilter, handlePageChange };
};
