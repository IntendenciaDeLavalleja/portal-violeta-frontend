import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Menu, X, Sun, Moon, Globe,
  ChevronDown
} from 'lucide-react';
import logoImg from '../img/Logo.webp';
import { $language, setLanguage, initLanguage, type Language } from '../stores/language';
import { $theme, toggleTheme, initTheme } from '../stores/theme';
import { t } from '../i18n/translations';

const languages: { code: Language; label: string; flag: string }[] = [
  { code: 'es', label: 'Español', flag: '🇺🇾' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'pt', label: 'Português', flag: '🇧🇷' },
  { code: 'zh', label: '中文', flag: '🇨🇳' },
];

export default function Navbar() {
  const lang = useStore($language);
  const theme = useStore($theme);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isHome, setIsHome] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [langOpen, setLangOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initLanguage();
    initTheme();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    const checkHome = () => setIsHome(window.location.pathname === '/' || window.location.pathname === '');
    
    checkHome();
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('astro:after-navigation', checkHome);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('astro:after-navigation', checkHome);
    };
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const navLinks = [
    { href: '/', label: t('nav_home', lang) },
    { href: '/search', label: t('nav_accommodations', lang) },
    { href: '/#services', label: t('nav_services', lang) },
    { href: '/#testimonials', label: t('nav_reviews', lang) },
    { href: '/#contact', label: t('nav_contact', lang) },
  ];

  const isNavbarSolid = scrolled || !isHome;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isNavbarSolid
          ? 'bg-base-100/95 backdrop-blur-xl shadow-lg border-b border-base-200'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="/"
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors overflow-hidden ${
              isNavbarSolid ? 'bg-primary/10' : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <img 
                src={logoImg.src} 
                alt="Camping Arequita Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold text-lg leading-tight tracking-tight transition-colors ${
                isNavbarSolid ? 'text-base-content' : 'text-white'
              }`}>
                Arequita
              </span>
              <span className={`text-[10px] uppercase tracking-[0.2em] leading-none transition-colors ${
                isNavbarSolid ? 'text-primary' : 'text-white/80'
              }`}>
                Camping
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary/10 ${
                  isNavbarSolid
                    ? 'text-base-content hover:text-primary'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/senti-lavalleja"
              className="ml-2 inline-flex items-center gap-2 rounded-full px-5 py-2 text-[10px] font-black uppercase tracking-[0.15em] text-white bg-linear-to-r from-emerald-700 via-emerald-500 to-emerald-700 bg-size-200 hover:bg-pos-100 shadow-xl shadow-emerald-900/40 transition-all duration-500 border border-emerald-400/30"
            >
              <Globe className="w-3 h-3" />
              {t('nav_guide', lang)}
            </a>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className={`btn btn-sm btn-ghost btn-circle transition-colors ${
                isNavbarSolid ? '' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </motion.button>

            {/* Language Selector */}
            <div ref={langRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLangOpen(!langOpen)}
                className={`btn btn-sm btn-ghost gap-1 transition-colors ${
                  isNavbarSolid ? '' : 'text-white hover:bg-white/10'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs uppercase">{lang}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 bg-base-100 rounded-xl shadow-2xl border border-base-200 overflow-hidden min-w-40"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setLangOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-primary/10 transition-colors ${
                          lang === l.code ? 'bg-primary/5 text-primary font-semibold' : 'text-base-content'
                        }`}
                      >
                        <span className="text-lg">{l.flag}</span>
                        {l.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className={`btn btn-sm btn-ghost btn-circle transition-colors ${
                isNavbarSolid ? '' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                {theme === 'emerald' ? (
                  <motion.div
                    key="sun"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ scale: 0, rotate: 90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`btn btn-sm btn-ghost btn-circle lg:hidden transition-colors ${
                isNavbarSolid ? '' : 'text-white hover:bg-white/10'
              }`}
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>

        {/* Search Bar Expandable */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <form onSubmit={handleSearch} className="pb-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-base-content/40" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('nav_search_placeholder', lang)}
                    className="input input-bordered w-full pl-12 pr-4 h-12 rounded-2xl bg-base-100 focus:outline-none focus:ring-2 focus:ring-primary/50 text-base-content"
                  />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-base-100/98 backdrop-blur-xl border-t border-base-200 overflow-hidden"
          >
            <div className="px-4 py-6 space-y-2">
              <motion.a
                href="/senti-lavalleja"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.02 }}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs text-white bg-linear-to-r from-emerald-800 via-emerald-600 to-emerald-800 shadow-2xl border border-emerald-500/30"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-300" />
                  {t('nav_guide', lang)}
                </div>
              </motion.a>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-xl text-base-content font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
