import { useState, useEffect, useCallback } from 'react';

export const useMediaSection = (fetchFn) => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchFn(currentPage);
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
  }, [fetchFn, currentPage]);

  const handlePageChange = useCallback((direction) => {
    setCurrentPage((prev) => (direction === 'next' ? prev + 1 : Math.max(prev - 1, 1)));
  }, []);

  return { items, currentPage, loading, handlePageChange };
};
