/**
 * Footer Component
 * Clean, premium site footer with brand overview, navigation links, and real contact information
 */

import { siteConfig } from '../data/site.js';

export function renderFooter() {
  const year = new Date().getFullYear();

  return `
    <footer class="footer" role="contentinfo">
      <div class="container">
        <div class="footer__grid">
          <!-- Column 1: Brand -->
          <div>
            <div class="footer__brand-title">${siteConfig.name}</div>
            <div class="footer__tagline">${siteConfig.tagline}</div>
            <p style="font-size: var(--text-sm); color: rgba(255, 255, 255, 0.7); line-height: 1.6; max-width: 380px;">
              A premier institute in Ludhiana offering IELTS, Spoken English, and English Grammar classes alongside professional Educator Training (NTT, PTT, ECCE, and Nanny courses) — Online and Offline.
            </p>
          </div>

          <!-- Column 2: Quick Links -->
          <div>
            <h4 style="font-family: var(--font-sans); font-size: var(--text-base); color: var(--color-white); margin-bottom: var(--space-sm);">
              Navigation
            </h4>
            <div class="footer__nav">
              <a href="#hero" class="footer__link">Home</a>
              <a href="#courses-preview" class="footer__link">Courses</a>
              <a href="#about" class="footer__link">About</a>
              <a href="#contact" class="footer__link">Contact</a>
            </div>
          </div>

          <!-- Column 3: Contact & Address -->
          <div>
            <h4 style="font-family: var(--font-sans); font-size: var(--text-base); color: var(--color-white); margin-bottom: var(--space-sm);">
              Contact & Location
            </h4>
            <div style="display: flex; flex-direction: column; gap: var(--space-xs); font-size: var(--text-sm); color: rgba(255, 255, 255, 0.8);">
              <div>
                <strong>Phone:</strong><br />
                <a href="${siteConfig.phoneTel}" style="color: var(--color-gold-400); text-decoration: none; font-weight: 600;">
                  ${siteConfig.phoneDisplay}
                </a>
              </div>
              <div>
                <strong>Address:</strong><br />
                <span>${siteConfig.address.fullFormatted}</span>
              </div>
              <div>
                <a href="${siteConfig.address.googleMapsSearchUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--color-gold-400); text-decoration: underline; font-size: var(--text-xs);">
                  Open in Google Maps &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Footer Bottom Bar -->
        <div class="footer__bottom">
          <div>
            &copy; ${year} ${siteConfig.name}. All rights reserved.
          </div>
          <div>
            Ludhiana, Punjab — 141003
          </div>
        </div>
      </div>
    </footer>
  `;
}
