import { atom } from 'nanostores';

export type Language = 'es' | 'en' | 'pt' | 'zh';

export const $language = atom<Language>('es');

export function setLanguage(lang: Language) {
  $language.set(lang);
  if (typeof window !== 'undefined') {
    localStorage.setItem('camping-lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }
}

export function initLanguage() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('camping-lang') as Language | null;
    if (saved && ['es', 'en', 'pt', 'zh'].includes(saved)) {
      setLanguage(saved);
    }
  }
}
