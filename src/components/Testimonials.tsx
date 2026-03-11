import React, { useEffect, useState } from 'react';
import { useStore } from '@nanostores/react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { $language } from '../stores/language';
import { t } from '../i18n/translations';
import { testimonials as staticTestimonials, type Testimonial } from '../data/accommodations';
import { fetchTestimonials } from '../lib/campingApi';
import GoogleReviewsBadge from './GoogleReviewsBadge';

export default function Testimonials() {
  const lang = useStore($language);
  const testimonialsLang = lang === 'zh' ? 'es' : lang;
  const [testimonials, setTestimonials] = useState<Testimonial[]>(staticTestimonials);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalTestimonials, setTotalTestimonials] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchTestimonials(testimonialsLang, undefined, currentPage, 8)
      .then((res) => {
        if (mounted) {
          setTestimonials(res.testimonials.length > 0 ? res.testimonials : staticTestimonials);
          setTotalPages(res.pages);
          setTotalTestimonials(res.total);
        }
      })
      .catch(() => {
        if (mounted) {
          setTestimonials(staticTestimonials);
        }
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [testimonialsLang, currentPage]);

  return (
    <section id="testimonials" className="py-24 bg-base-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">
            {t('rev_title', testimonialsLang)}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-base-content mt-3 mb-4">
            {t('rev_title', testimonialsLang)}
          </h2>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
            {t('rev_subtitle', testimonialsLang)}
          </p>
        </motion.div>

        <GoogleReviewsBadge />

        <div className="mt-10 mb-6 flex items-center justify-between">
          <h3 className="text-2xl font-bold text-base-content">
            {testimonialsLang === 'en' ? 'Visitor testimonials' : testimonialsLang === 'pt' ? 'Depoimentos de visitantes' : 'Testimonios de visitantes'}
          </h3>
          <span className="text-sm text-base-content/50 font-medium">
            {totalTestimonials || testimonials.length} {t('rev_total', testimonialsLang)}
          </span>
        </div>

        <div className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}>
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="bg-base-100 rounded-2xl p-6 shadow-sm border border-base-200 hover:shadow-md transition-all duration-300 relative flex flex-col"
            >
              <Quote className="absolute top-4 right-4 w-6 h-6 text-primary/10" />

              <div className="flex items-center gap-3 mb-4">
                {testimonial.avatar && !testimonial.avatar.includes('pravatar.cc') ? (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20 shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shrink-0 ring-2 ring-primary/20">
                    {testimonial.author?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="font-semibold text-base-content text-sm truncate">{testimonial.author}</h4>
                  <p className="text-[10px] text-base-content/50 truncate">{testimonial.accommodation}</p>
                </div>
              </div>

              <span className="text-[10px] text-base-content/40 mb-3 block">
                {testimonial.date}
              </span>

              <p className="text-base-content/70 text-xs leading-relaxed line-clamp-4 italic">
                "{testimonial.message}"
              </p>
            </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1 || loading}
              className="btn btn-circle btn-outline btn-sm"
            >
              «
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`btn btn-circle btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline'}`}
                disabled={loading}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages || loading}
              className="btn btn-circle btn-outline btn-sm"
            >
              »
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
