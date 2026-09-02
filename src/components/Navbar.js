/**
 * Navbar Component
 * Sticky navigation with desktop links, CTA button, and accessible mobile drawer
 */

import { siteConfig } from '../data/site.js';
import { navigationData } from '../data/navigation.js';

export function renderNavbar() {
  return `
    <nav class="navbar" id="main-navbar" aria-label="Main Navigation">
      <div class="container navbar__inner">
        <!-- Brand -->
        <a href="#hero" class="navbar__brand" aria-label="${siteConfig.name} Home">
          <img src="${siteConfig.logo}" alt="${siteConfig.name} Logo" class="navbar__logo" width="44" height="44" />
          <span class="navbar__brand-text">
            <span class="navbar__brand-name">${siteConfig.name}</span>
            <span class="navbar__brand-tagline">${navigationData.tagline}</span>
          </span>
        </a>

        <!-- Desktop Navigation Links -->
        <div class="navbar__nav" role="menubar">
          <a href="#hero" class="navbar__link is-active" role="menuitem">Home</a>
          <a href="#courses-preview" class="navbar__link" role="menuitem">Courses</a>
          <a href="#about" class="navbar__link" role="menuitem">About</a>
          <a href="#contact" class="navbar__link" role="menuitem">Contact</a>
        </div>

        <!-- Right-hand Controls: Desktop CTAs, Theme Toggle, Mobile Hamburger -->
        <div class="navbar__right">
          <!-- Desktop Action CTA -->
          <div class="navbar__actions">
            <a href="${siteConfig.phoneTel}" class="btn btn--secondary btn--sm" aria-label="Call ${siteConfig.phoneDisplay}">
              📞 ${siteConfig.phone}
            </a>
            <a href="#contact" class="btn btn--primary btn--sm">
              Enquire Now
            </a>
          </div>

          <!-- Theme Toggle (Light / Dark) -->
          <button
            class="theme-toggle"
            id="theme-toggle"
            type="button"
            aria-pressed="false"
            aria-label="Switch to dark mode"
          >
            <svg class="theme-toggle__sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path>
            </svg>
            <svg class="theme-toggle__moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>

          <!-- Mobile Hamburger Toggle -->
          <button 
            class="navbar__toggle" 
            id="navbar-toggle" 
            aria-expanded="false" 
            aria-controls="mobile-drawer"
            aria-label="Toggle navigation menu"
          >
            <span class="navbar__toggle-bar"></span>
            <span class="navbar__toggle-bar"></span>
            <span class="navbar__toggle-bar"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
        <div class="mobile-drawer__links">
          <a href="#hero" class="mobile-drawer__link mobile-link">Home</a>
          <a href="#courses-preview" class="mobile-drawer__link mobile-link">Courses</a>
          <a href="#about" class="mobile-drawer__link mobile-link">About the Institute</a>
          <a href="#contact" class="mobile-drawer__link mobile-link">Contact & Location</a>
        </div>

        <div class="mobile-drawer__contact">
          <a href="${siteConfig.phoneTel}" class="btn btn--primary btn--full">
            📞 Call ${siteConfig.phoneDisplay}
          </a>
          <a href="#contact" class="btn btn--gold btn--full mobile-link">
            Enquire Now
          </a>
          <p class="text-caption text-center" style="margin-top: var(--space-2xs);">
            ${siteConfig.address.building}, ${siteConfig.address.landmark}, ${siteConfig.address.city}
          </p>
        </div>
      </div>
    </nav>
  `;
}

export function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  const toggleBtn = document.getElementById('navbar-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const navLinks = document.querySelectorAll('.navbar__link');

  // Sticky navbar shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar?.classList.add('navbar--scrolled');
    } else {
      navbar?.classList.remove('navbar--scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
      toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
      drawer.classList.toggle('is-open', !isExpanded);
      drawer.setAttribute('aria-hidden', String(isExpanded));
      document.body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Close drawer when clicking any link
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        toggleBtn.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('is-open');
        drawer.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
  }

  // Active section indicator based on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY + 100;
    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { passive: true });
}
