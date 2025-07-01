// src/hooks/useFilters.js
import { useState, useMemo } from 'react';
import { getAllCategories } from '../utils/categoryUtils';

export const useFilters = protocols => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [statusFilter, setStatusFilter] = useState([]);
  const [sortBy, setSortBy] = useState('name');

  const categories = useMemo(() => getAllCategories(protocols), [protocols]);

  const filteredProtocols = useMemo(() => {
    let filtered = protocols.filter(protocol => {
      // Search filter
      const matchesSearch =
        !searchTerm ||
        protocol.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        protocol.description?.toLowerCase().includes(searchTerm.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategories.length === 0 ||
        protocol.categories?.some(category => {
          const [main] = category.split('::');
          return selectedCategories.includes(main);
        });

      // Subcategory filter
      const matchesSubCategory =
        selectedSubCategories.length === 0 ||
        protocol.categories?.some(category => {
          const [, sub] = category.split('::');
          return sub && selectedSubCategories.includes(sub);
        });

      // Status filter
      const matchesStatus =
        statusFilter.length === 0 ||
        (statusFilter.includes('Live') && protocol.live) ||
        (statusFilter.includes('Coming Soon') && !protocol.live);

      return (
        matchesSearch && matchesCategory && matchesSubCategory && matchesStatus
      );
    });

    // Sort filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name?.localeCompare(b.name) || 0;
        case 'category': {
          const aCat = a.categories?.[0]?.split('::')[0] || '';
          const bCat = b.categories?.[0]?.split('::')[0] || '';
          return aCat.localeCompare(bCat);
        }
        case 'status':
          return (b.live ? 1 : 0) - (a.live ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    protocols,
    searchTerm,
    selectedCategories,
    selectedSubCategories,
    statusFilter,
    sortBy,
  ]);

  const stats = useMemo(() => {
    const total = protocols.length;
    const live = protocols.filter(p => p.live).length;
    const categoryCounts = {};

    protocols.forEach(protocol => {
      protocol.categories?.forEach(category => {
        const [main] = category.split('::');
        if (main) {
          categoryCounts[main] = (categoryCounts[main] || 0) + 1;
        }
      });
    });

    return { total, live, categories: categoryCounts };
  }, [protocols]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setStatusFilter([]);
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedCategories,
    setSelectedCategories,
    selectedSubCategories,
    setSelectedSubCategories,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    categories,
    filteredProtocols,
    stats,
    clearAllFilters,
    hasActiveFilters:
      searchTerm ||
      selectedCategories.length > 0 ||
      selectedSubCategories.length > 0 ||
      statusFilter.length > 0,
  };
};
