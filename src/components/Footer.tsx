import React from 'react';
import { useStore } from '@nanostores/react';
import { motion } from 'framer-motion';
import {
  TreePine, MapPin, Phone, Mail,
  Instagram, Facebook, Youtube,
  Heart
} from 'lucide-react';
import { $language } from '../stores/language';
import { t } from '../i18n/translations';

export default function Footer() {
  const lang = useStore($language);

  const links = [
    { href: '/', label: t('nav_home', lang) },
    { href: '/search', label: t('nav_accommodations', lang) },
    { href: '/#services', label: t('nav_services', lang) },
    { href: '/#testimonials', label: t('nav_reviews', lang) },
    { href: '/#contact', label: t('nav_contact', lang) },
  ];

  return (
    <footer className="bg-neutral text-neutral-content">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <TreePine className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="font-bold text-lg">Arequita</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-primary">Camping</div>
              </div>
            </div>
            <p className="text-sm text-neutral-content/60 leading-relaxed">
              {t('footer_desc', lang)}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Youtube, href: '#' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-neutral-content/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold text-lg mb-4">{t('footer_links', lang)}</h4>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-content/60 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-lg mb-4">{t('footer_contact', lang)}</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-neutral-content/60">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                Ruta 8, Km 140, Lavalleja, Uruguay
              </li>
              <li className="flex items-center gap-3 text-sm text-neutral-content/60">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                +598 4442 1234
              </li>
              <li className="flex items-center gap-3 text-sm text-neutral-content/60">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                info@campingarequita.uy
              </li>
            </ul>
          </motion.div>

          {/* Map / CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-lg mb-4">
              {lang === 'es' ? 'Ubicación' : lang === 'en' ? 'Location' : lang === 'pt' ? 'Localização' : '位置'}
            </h4>
            <div className="rounded-2xl overflow-hidden h-40 bg-neutral-content/10">
              <iframe
                title="Camping Arequita Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26138.073721870174!2d-55.28!3d-34.31!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDE4JzM2LjAiUyA1NcKwMTYnNDguMCJX!5e0!3m2!1ses!2suy!4v1600000000000"
                className="w-full h-full border-0 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-neutral-content/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-content/40">
            &copy; {new Date().getFullYear()} Camping Arequita. {t('footer_rights', lang)}
          </p>
          <p className="text-sm text-neutral-content/40 flex items-center gap-1">
            {t('footer_managed', lang)}
            <Heart className="w-3 h-3 text-red-500 fill-red-500 mx-1" />
          </p>
        </div>
      </div>
    </footer>
  );
}
