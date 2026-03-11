import { atom } from 'nanostores';

export type Theme = 'emerald' | 'forest';

export const $theme = atom<Theme>('emerald');

export function setTheme(theme: Theme) {
  $theme.set(theme);
  if (typeof window !== 'undefined') {
    localStorage.setItem('camping-theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }
}

export function toggleTheme() {
  const current = $theme.get();
  setTheme(current === 'emerald' ? 'forest' : 'emerald');
}

export function initTheme() {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('camping-theme') as Theme | null;
    if (saved && ['emerald', 'forest'].includes(saved)) {
      setTheme(saved);
    } else {
      setTheme('emerald');
    }
  }
}
