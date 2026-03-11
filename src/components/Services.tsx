import React from 'react';
import { useStore } from '@nanostores/react';
import { motion } from 'framer-motion';
import {
  Waves, Umbrella, Baby, Zap,
  TreePine, Flame, Wifi, Car
} from 'lucide-react';
import { $language } from '../stores/language';
import { t } from '../i18n/translations';

// Asset Imports
import poolOpenImg from '../img/servicios/Piscina.webp';
import poolCoveredImg from '../img/servicios/Piscina-Techada.webp';
import kidsImg from '../img/servicios/Infantiles.webp';
import electricityImg from '../img/servicios/Electricidad.webp';
import parksImg from '../img/servicios/Paseos.webp';
import bbqImg from '../img/servicios/Parrilleros.webp';
import wifiImg from '../img/servicios/Wifi.webp';
import parkingImg from '../img/servicios/Estacionamiento.webp';

const services = [
  { key: 'pool_open', icon: Waves, color: 'from-blue-500 to-cyan-400', image: poolOpenImg },
  { key: 'pool_covered', icon: Umbrella, color: 'from-indigo-500 to-blue-400', image: poolCoveredImg },
  { key: 'playground', icon: Baby, color: 'from-orange-500 to-amber-400', image: kidsImg },
  { key: 'electricity', icon: Zap, color: 'from-yellow-500 to-orange-400', image: electricityImg },
  { key: 'parks', icon: TreePine, color: 'from-emerald-500 to-green-400', image: parksImg },
  { key: 'bbq', icon: Flame, color: 'from-red-500 to-orange-400', image: bbqImg },
  { key: 'wifi', icon: Wifi, color: 'from-purple-500 to-violet-400', image: wifiImg },
  { key: 'parking', icon: Car, color: 'from-slate-500 to-gray-400', image: parkingImg },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export default function Services() {
  const lang = useStore($language);

  return (
    <section id="services" className="py-24 bg-base-200/50">
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
            {t('svc_title', lang)}
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-base-content mt-3 mb-4">
            {t('svc_title', lang)}
          </h2>
          <p className="text-base-content/60 text-lg max-w-2xl mx-auto">
            {t('svc_subtitle', lang)}
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => {
            const Icon = service.icon;
            const titleKey = `svc_${service.key}` as any;
            const descKey = `svc_${service.key}_desc` as any;

            return (
              <motion.div
                key={service.key}
                variants={itemVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative bg-base-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-base-200"
              >
                {/* Background Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={typeof service.image === 'string' ? service.image : service.image.src}
                    alt={t(titleKey, lang)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-bold text-base-content text-lg mb-2 group-hover:text-primary transition-colors">
                    {t(titleKey, lang)}
                  </h3>
                  <p className="text-sm text-base-content/60 leading-relaxed">
                    {t(descKey, lang)}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
