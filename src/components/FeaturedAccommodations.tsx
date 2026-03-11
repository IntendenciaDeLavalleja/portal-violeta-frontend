import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { $language } from '../stores/language';
import { t } from '../i18n/translations';
import type { Accommodation } from '../data/accommodations';
import { fetchFeaturedServices } from '../lib/campingApi';
import AccommodationCard from './AccommodationCard';

export default function FeaturedAccommodations() {
  const lang = useStore($language);
  const [featured, setFeatured] = useState<Accommodation[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchFeaturedServices(lang)
      .then((items) => {
        if (mounted) {
          setFeatured(items);
        }
      })
      .catch(() => {
        if (mounted) {
          setFeatured([]);
        }
      });

    return () => {
      mounted = false;
    };
  }, [lang]);

  return (
    <section className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            {t('acc_title', lang)}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-base-content mt-3 mb-4">
            {t('acc_title', lang)}
          </h2>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
            {t('acc_subtitle', lang)}
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((acc, i) => (
            <AccommodationCard key={acc.id} accommodation={acc} index={i} />
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="/search"
            className="group btn btn-outline btn-primary btn-lg rounded-2xl px-8"
          >
            {t('acc_view_all', lang)}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
