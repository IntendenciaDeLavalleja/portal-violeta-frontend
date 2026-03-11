import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { $language } from '../stores/language';
import { t } from '../i18n/translations';
import type { AccommodationType } from '../data/accommodations';
import type { Accommodation } from '../data/accommodations';
import { fetchServices } from '../lib/campingApi';
import AccommodationCard from './AccommodationCard';

interface Props {
  initialQuery?: string;
}

export default function SearchPage({ initialQuery = '' }: Props) {
  const lang = useStore($language);
  const [query, setQuery] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState<AccommodationType | 'all'>('all');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high'>('price-low');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [services, setServices] = useState<Accommodation[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchServices(lang)
      .then((apiServices) => {
        if (!mounted) return;
        setServices(apiServices);
      })
      .catch(() => {
        if (mounted) {
          setServices([]);
        }
      });

    return () => {
      mounted = false;
    };
  }, [lang]);

  const types: { value: AccommodationType | 'all'; label: string }[] = [
    { value: 'all', label: t('acc_all_types', lang) },
    { value: 'cabin', label: t('acc_cabins', lang) },
    { value: 'motorhome', label: t('acc_motorhome', lang) },
    { value: 'camping', label: t('acc_camping', lang) },
  ];

  const filtered = useMemo(() => {
    let results = [...services];

    // Text search
    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          a.description.toLowerCase().includes(q) ||
          a.type.toLowerCase().includes(q)
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      results = results.filter((a) => a.type === typeFilter);
    }

    // Price range
    results = results.filter((a) => a.price >= priceRange[0] && a.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
    }

    return results;
  }, [query, typeFilter, sortBy, priceRange, lang, services]);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-base-content mb-4">
            {t('search_title', lang)}
          </h1>
          {initialQuery && (
            <p className="text-base-content/60 text-lg">
              {t('search_results_for', lang)}: <span className="font-semibold text-primary">"{initialQuery}"</span>
            </p>
          )}
        </motion.div>

        {/* Search + Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-base-100 rounded-3xl shadow-lg border border-base-200 p-4 mb-8"
        >
          {/* Search Input */}
          <div className="flex gap-3 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('nav_search_placeholder', lang)}
                className="input input-bordered w-full pl-12 rounded-2xl h-12 bg-base-200/50 focus:ring-2 focus:ring-primary/30"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-circle btn-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`btn btn-lg rounded-2xl gap-2 ${filtersOpen ? 'btn-primary' : 'btn-ghost'}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="hidden sm:inline">{t('acc_filters', lang)}</span>
            </motion.button>
          </div>

          {/* Expandable Filters */}
          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-base-200 grid sm:grid-cols-3 gap-4">
                  {/* Type Filter */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium text-sm">{t('acc_type', lang)}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {types.map((type) => (
                        <button
                          key={type.value}
                          onClick={() => setTypeFilter(type.value)}
                          className={`btn btn-sm rounded-xl ${
                            typeFilter === type.value
                              ? 'btn-primary'
                              : 'btn-ghost bg-base-200'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium text-sm">{t('acc_sort_by', lang)}</span>
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                      className="select select-bordered w-full rounded-xl select-sm h-10"
                    >
                      <option value="price-low">{t('acc_sort_price_low', lang)}</option>
                      <option value="price-high">{t('acc_sort_price_high', lang)}</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label className="label">
                      <span className="label-text font-medium text-sm">
                        {t('acc_price_range', lang)}: ${priceRange[0]} - ${priceRange[1]}
                      </span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="range range-primary range-sm"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-6 flex items-center justify-between"
        >
          <p className="text-base-content/60">
            <span className="font-bold text-base-content text-lg">{filtered.length}</span>{' '}
            {t('acc_results', lang)}
          </p>
        </motion.div>

        {/* Results Grid */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((acc, i) => (
              <AccommodationCard key={acc.id} accommodation={acc} index={i} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🏕️</div>
            <h3 className="text-2xl font-bold text-base-content mb-2">
              {t('acc_no_results', lang)}
            </h3>
            <p className="text-base-content/50">
              {lang === 'es'
                ? 'Intenta con otros filtros o términos de búsqueda'
                : lang === 'en'
                ? 'Try different filters or search terms'
                : lang === 'pt'
                ? 'Tente com outros filtros ou termos de busca'
                : '请尝试其他筛选条件或搜索词'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
