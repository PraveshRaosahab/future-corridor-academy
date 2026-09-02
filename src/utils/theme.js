/**
 * Theme Toggle — Light / Dark Mode
 *
 * The *initial* theme is applied by a small inline script in index.html,
 * which runs before first paint so there's no flash of the wrong theme.
 * This module only wires up the toggle button's behavior once the app
 * has mounted: it flips the `data-theme` attribute on <html>, persists
 * the user's explicit choice to localStorage, and keeps the button's
 * accessible state in sync.
 */

const STORAGE_KEY = 'theme';

function getStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null;
  }
}

function setStoredTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch (e) {
    // localStorage unavailable (private browsing, disabled storage, etc.)
    // The toggle will still work for the current page view.
  }
}

function getCurrentTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

function updateButtonState(button, theme) {
  const isDark = theme === 'dark';
  button.setAttribute('aria-pressed', String(isDark));
  button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

export function initThemeToggle() {
  const button = document.getElementById('theme-toggle');
  if (!button) return;

  updateButtonState(button, getCurrentTheme());

  button.addEventListener('click', () => {
    const nextTheme = getCurrentTheme() === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    setStoredTheme(nextTheme);
    updateButtonState(button, nextTheme);
  });

  // If the user hasn't made an explicit choice, keep following the
  // OS-level light/dark preference while this tab is open.
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  media.addEventListener('change', (e) => {
    if (getStoredTheme()) return;
    const theme = e.matches ? 'dark' : 'light';
    applyTheme(theme);
    updateButtonState(button, theme);
  });
}
