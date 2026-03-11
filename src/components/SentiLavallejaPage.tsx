import React from 'react';
import { useStore } from '@nanostores/react';
import { $language } from '../stores/language';
import { t } from '../i18n/translations';
import headerImage from '../img/senti-lavalleja/Header.webp';
import picoImage from '../img/senti-lavalleja/Pico.webp';
import kayacImage from '../img/senti-lavalleja/Kayac.webp';
import bosqueImage from '../img/senti-lavalleja/Bosque.webp';
import parcelasImage from '../img/senti-lavalleja/Parcelas.webp';
import cabanasImage from '../img/senti-lavalleja/Cabanas.webp';
import piscinaImage from '../img/senti-lavalleja/Piscina.webp';
import motorhomeImage from '../img/senti-lavalleja/Motorhome.webp';

export default function SentiLavallejaPage() {
  const lang = useStore($language);

  return (
    <main className="bg-[#040d0a] text-white">
      {/* Hero Section */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 py-24 md:px-12">
        <img
          src={typeof headerImage === 'string' ? headerImage : headerImage.src}
          alt={t('sl_alt_hero', lang)}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-[#040d0a]"></div>

        <div className="relative z-10 mx-auto w-full max-w-6xl">
          <div className="max-w-3xl animate-fade-in-up">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.4em] text-emerald-400">{t('sl_hero_badge', lang)}</p>
            <h1 className="font-['Calistoga'] text-6xl leading-[1.1] text-white sm:text-7xl md:text-9xl tracking-tight">
              <span className="block text-emerald-400 drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)]">{t('sl_hero_title_1', lang)}</span>
              <span className="block -mt-2 md:-mt-6">{t('sl_hero_title_2', lang)}</span>
            </h1>
            <p className="mt-8 text-xl font-medium text-emerald-50/90 md:text-2xl italic border-l-4 border-emerald-500 pl-6">{t('sl_hero_tagline', lang)}</p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-100 md:text-lg">
              {t('sl_hero_p1', lang)}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="/search" className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-base font-semibold text-white transition duration-300 hover:bg-emerald-400">{t('sl_hero_cta_book', lang)}</a>
              <a href="#experiencias" className="inline-flex items-center justify-center rounded-full border border-zinc-200/70 bg-black/20 px-8 py-3 text-base font-semibold text-zinc-100 backdrop-blur-sm transition duration-300 hover:bg-black/35">{t('sl_hero_cta_explore', lang)}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Experience 1 */}
      <section id="experiencias" className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-2 md:items-center md:px-12">
        <div className="order-2 md:order-1">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-400">{t('sl_exp1_badge', lang)}</p>
          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">{t('sl_exp1_title', lang)}</h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-300 md:text-lg">
            {t('sl_exp1_p1', lang)}
          </p>
          <p className="mt-4 text-base leading-relaxed text-zinc-300 md:text-lg">
            {t('sl_exp1_p2', lang)}
          </p>
          <ul className="mt-6 space-y-3 text-zinc-200">
            <li><span className="text-emerald-400 mr-2">✓</span>{t('sl_exp1_li1', lang)}</li>
            <li><span className="text-emerald-400 mr-2">✓</span>{t('sl_exp1_li2', lang)}</li>
            <li><span className="text-emerald-400 mr-2">✓</span>{t('sl_exp1_li3', lang)}</li>
            <li><span className="text-emerald-400 mr-2">✓</span>{t('sl_exp1_li4', lang)}</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/search" className="inline-flex rounded-full bg-emerald-500 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition duration-300 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20">{t('sl_exp1_cta', lang)}</a>
            <a
              href="https://manantialesserranos.uy/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-cyan-300/60 bg-cyan-500/10 px-8 py-3 text-sm font-bold uppercase tracking-wide text-cyan-100 transition duration-300 hover:bg-cyan-400 hover:text-white shadow-lg shadow-cyan-500/20"
            >
              Portal del Geoparque
            </a>
          </div>
        </div>
        <div className="order-1 overflow-hidden rounded-4xl shadow-2xl shadow-black/60 md:order-2">
          <img
            src={typeof picoImage === 'string' ? picoImage : picoImage.src}
            alt={t('sl_alt_hiking', lang)}
            className="aspect-square w-full object-cover transition duration-700 hover:scale-110"
            loading="lazy"
          />
        </div>
      </section>

      {/* Experience 2 */}
      <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:px-12">
        <div className="overflow-hidden rounded-4xl shadow-2xl shadow-black/60">
          <img
            src={typeof kayacImage === 'string' ? kayacImage : kayacImage.src}
            alt={t('sl_alt_river', lang)}
            className="aspect-square w-full object-cover transition duration-700 hover:scale-110"
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-sky-400">{t('sl_exp2_badge', lang)}</p>
          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">{t('sl_exp2_title', lang)}</h2>
          <p className="mt-6 text-base leading-relaxed text-zinc-300 md:text-lg">
            {t('sl_exp2_p1', lang)}
          </p>
          <ul className="mt-6 space-y-3 text-zinc-200">
            <li><span className="text-sky-400 mr-2">✓</span>{t('sl_exp2_li1', lang)}</li>
            <li><span className="text-sky-400 mr-2">✓</span>{t('sl_exp2_li2', lang)}</li>
            <li><span className="text-sky-400 mr-2">✓</span>{t('sl_exp2_li3', lang)}</li>
            <li><span className="text-sky-400 mr-2">✓</span>{t('sl_exp2_li4', lang)}</li>
          </ul>
          <a href="/search" className="mt-8 inline-flex rounded-full border-2 border-sky-400/50 px-8 py-3 text-sm font-bold uppercase tracking-wide text-sky-100 transition duration-300 hover:bg-sky-400 hover:text-white shadow-lg shadow-sky-500/10">{t('sl_exp2_cta', lang)}</a>
        </div>
      </section>

      {/* Experience 3 */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20 md:px-12">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-amber-400">{t('sl_exp3_badge', lang)}</p>
          <h2 className="mt-3 text-4xl font-bold text-white md:text-5xl">{t('sl_exp3_title', lang)}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">{t('sl_exp3_p1', lang)}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <article className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#0a1a14]/40 p-1 shadow-2xl backdrop-blur-sm transition duration-300 hover:bg-[#0a1a14]/60">
            <div className="overflow-hidden rounded-2xl">
              <img src={typeof parcelasImage === 'string' ? parcelasImage : parcelasImage.src} alt={t('sl_alt_camping', lang)} className="aspect-video w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-emerald-100">{t('sl_exp3_card1', lang)}</h3>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#0a1a14]/40 p-1 shadow-2xl backdrop-blur-sm transition duration-300 hover:bg-[#0a1a14]/60">
            <div className="overflow-hidden rounded-2xl">
              <img src={typeof cabanasImage === 'string' ? cabanasImage : cabanasImage.src} alt={t('sl_alt_cabin', lang)} className="aspect-video w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-emerald-100">{t('sl_exp3_card2', lang)}</h3>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#0a1a14]/40 p-1 shadow-2xl backdrop-blur-sm transition duration-300 hover:bg-[#0a1a14]/60">
            <div className="overflow-hidden rounded-2xl">
              <img src={typeof piscinaImage === 'string' ? piscinaImage : piscinaImage.src} alt={t('sl_alt_pool', lang)} className="aspect-video w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-emerald-100">{t('sl_exp3_card3', lang)}</h3>
            </div>
          </article>

          <article className="group relative overflow-hidden rounded-3xl border border-white/5 bg-[#0a1a14]/40 p-1 shadow-2xl backdrop-blur-sm transition duration-300 hover:bg-[#0a1a14]/60">
            <div className="overflow-hidden rounded-2xl">
              <img src={typeof motorhomeImage === 'string' ? motorhomeImage : motorhomeImage.src} alt={t('sl_alt_motorhome', lang)} className="aspect-video w-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-emerald-100">{t('sl_exp3_card4', lang)}</h3>
            </div>
          </article>
        </div>
      </section>

      {/* Experience 4 */}
      <section className="relative mx-auto w-full max-w-7xl overflow-hidden px-0 py-8 md:rounded-[3rem]">
        <img
          src={typeof bosqueImage === 'string' ? bosqueImage : bosqueImage.src}
          alt={t('sl_alt_forest', lang)}
          className="h-105 w-full object-cover transition duration-1000 hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-emerald-300">{t('sl_exp4_badge', lang)}</p>
            <h2 className="mt-4 font-['Calistoga'] text-4xl text-white md:text-8xl tracking-tight leading-none">{t('sl_exp4_title', lang)}</h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-100 md:text-2xl font-light italic">
              {t('sl_exp4_p1', lang)}
            </p>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="mx-auto w-full max-w-7xl px-6 py-28 md:px-12 text-center">
        <div className="rounded-[3rem] border border-white/10 bg-linear-to-br from-[#0a1110] via-[#040d0a] to-[#0a1110] px-8 py-16 shadow-2xl md:px-20 md:py-24">
          <h2 className="font-['Calistoga'] text-5xl text-white md:text-8xl leading-[1.1] tracking-tight">
            {t('sl_footer_title_1', lang)}<br/>
            <span className="text-emerald-400">{t('sl_footer_title_2', lang)}</span>
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-zinc-300 md:text-xl">
            {t('sl_footer_p1', lang)}
          </p>
          <p className="mx-auto mt-4 text-sm font-medium uppercase tracking-widest text-emerald-400">
            {t('sl_footer_location', lang)}
          </p>
          <div className="mt-12">
            <a href="/search" className="inline-flex rounded-full bg-emerald-500 px-12 py-5 text-xl font-bold text-white transition duration-300 hover:bg-emerald-400 hover:scale-105 hover:shadow-emerald-500/50 shadow-xl">
              {t('sl_footer_cta', lang)}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
