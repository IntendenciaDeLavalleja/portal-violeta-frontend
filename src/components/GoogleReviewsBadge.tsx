import React from 'react';
import { motion } from 'framer-motion';
import { Star, ExternalLink } from 'lucide-react';
import { useStore } from '@nanostores/react';
import { $language } from '../stores/language';

const GOOGLE_REVIEWS_URL = 'https://www.google.com.uy/travel/hotels/entity/ChoIgYGJy9nv-76vARoNL2cvMTFiN2hsZ21yMRAB/reviews';

export default function GoogleReviewsBadge() {
  const lang = useStore($language);

  const linkLabel =
    lang === 'en'
      ? 'View reviews on Google'
      : lang === 'pt'
      ? 'Ver avaliações no Google'
      : lang === 'zh'
      ? '在 Google 查看评价'
      : 'Ver reseñas en Google';

  const ratingLabel =
    lang === 'en'
      ? '4.3/5 on Google'
      : lang === 'pt'
      ? '4.3/5 no Google'
      : lang === 'zh'
      ? 'Google 评分 4.3/5'
      : '4.3/5 en Google';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.5 }}
      className="bg-base-200/50 rounded-2xl px-6 py-5 border border-base-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div className="flex items-center gap-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${star <= 4 ? 'text-amber-400 fill-amber-400' : 'text-base-300 fill-base-300'}`}
            />
          ))}
        </div>
        <span className="text-lg font-bold text-base-content">{ratingLabel}</span>
      </div>

      <a
        href={GOOGLE_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-outline btn-sm gap-2"
      >
        {linkLabel}
        <ExternalLink className="w-4 h-4" />
      </a>
    </motion.div>
  );
}
