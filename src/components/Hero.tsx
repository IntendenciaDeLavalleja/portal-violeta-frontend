import React, { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, MapPin, Play } from 'lucide-react';
import { $language } from '../stores/language';
import { t } from '../i18n/translations';
import { fetchHeroImages } from '../lib/campingApi';

export default function Hero() {
  const lang = useStore($language);
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    let mounted = true;
    fetchHeroImages()
      .then((items) => {
        if (mounted && items.length > 0) {
          setImages(items);
        }
      })
      .catch(() => {
        if (mounted) {
          setImages([]);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="hero-short-vh relative min-h-screen overflow-hidden bg-zinc-900">
      {/* Background Images with Crossfade */}
      <AnimatePresence mode="wait">
        {images.length > 0 && (
          <motion.div
            key={currentImage}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className="absolute inset-0 bg-emerald-900/20"
          >
            <img
              src={images[currentImage]}
              alt="Camping Arequita"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />
      <div className="absolute inset-0 bg-linear-to-r from-black/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="hero-content relative z-10 min-h-screen flex items-start md:items-center pt-24 sm:pt-28 md:pt-0 pb-24 sm:pb-28 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="hero-location inline-flex max-w-full items-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-full px-3 sm:px-5 py-2 mb-6 sm:mb-8 border border-white/20"
            >
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-white/90 text-xs sm:text-sm font-medium leading-tight">
                Lavalleja, Uruguay
              </span>
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
              className="hero-title text-4xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-5 sm:mb-6"
            >
              {t('hero_title', lang).split(' ').map((word, i, arr) => {
                if (i >= arr.length - 2) {
                  return (
                    <span key={i} className="text-emerald-400">
                      {word}{' '}
                    </span>
                  );
                }
                return word + ' ';
              })}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8, ease: 'easeOut' }}
              className="hero-subtitle text-base sm:text-xl text-white/80 leading-relaxed mb-8 sm:mb-10 max-w-2xl"
            >
              {t('hero_subtitle', lang)}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="hero-cta flex flex-wrap gap-3 sm:gap-4"
            >
              <a
                href="/senti-lavalleja"
                className="group btn btn-md sm:btn-lg font-['Calistoga'] bg-linear-to-r from-emerald-600 via-emerald-400 to-emerald-600 bg-size-200 hover:bg-pos-100 text-white border-none rounded-2xl px-6 sm:px-10 shadow-2xl shadow-emerald-500/40 transition-all duration-500 text-base sm:text-lg tracking-wide"
              >
                <MapPin className="w-5 h-5 mr-1" />
                {t('hero_guide_cta', lang)}
              </a>
              <a
                href="/search"
                className="group btn btn-md sm:btn-lg bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border-white/30 hover:border-white/50 rounded-2xl px-6 sm:px-8 shadow-lg transition-all duration-300"
              >
                {t('hero_cta', lang)}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="/#services"
                className="btn btn-md sm:btn-lg btn-outline text-white border-white/30 hover:bg-white/10 hover:border-white/50 rounded-2xl px-6 sm:px-8 backdrop-blur-sm"
              >
                <Play className="w-4 h-4" />
                {t('hero_secondary_cta', lang)}
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="hero-stats grid grid-cols-3 gap-3 sm:gap-8 mt-10 sm:mt-16 w-full max-w-lg"
            >
              {[
                { value: '24/7', label: lang === 'pt' ? 'Natureza' : lang === 'en' ? 'Nature' : lang === 'zh' ? '自然' : 'Naturaleza' },
                { value: '500+', label: lang === 'pt' ? 'Hóspedes/mês' : lang === 'en' ? 'Guests/month' : lang === 'zh' ? '每月访客' : 'Huéspedes/mes' },
                { value: '18', label: lang === 'pt' ? 'Hectares' : lang === 'en' ? 'Hectares' : lang === 'zh' ? '公顷' : 'Hectáreas' },
              ].map((stat, i) => (
                <div key={i} className="text-center min-w-0">
                  <div className="flex items-center gap-1 justify-center">
                    <span className="text-xl sm:text-3xl font-bold text-white">{stat.value}</span>
                  </div>
                  <span className="text-xs sm:text-sm text-white/70 leading-tight block wrap-break-word">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex gap-2 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentImage(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentImage ? 'w-8 bg-emerald-400' : 'w-4 bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 right-8 z-20 hidden md:block"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-1.5"
        >
          <div className="w-1.5 h-3 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
