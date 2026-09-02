/**
 * Brand Introduction Component
 * Introduces The Future Corridor's mission of building language and teaching skills
 */

import { siteConfig } from '../data/site.js';

export function renderBrandIntro() {
  return `
    <section class="brand-intro" id="about">
      <div class="container">
        <div class="brand-intro__grid">
          <!-- Text Content -->
          <div class="reveal">
            <span class="eyebrow eyebrow--gold">About The Institute</span>
            <h2 class="heading-2" style="margin-top: var(--space-3xs); margin-bottom: var(--space-xs);">
              Shaping Tomorrow's Educators & Communicators
            </h2>
            <p class="text-body-large" style="margin-bottom: var(--space-sm);">
              ${siteConfig.name} is a dedicated language and teacher training institute located in Ludhiana, Punjab.
            </p>
            <p class="text-body" style="margin-bottom: var(--space-md);">
              We help students build strong English communication skills through IELTS, Spoken English, and Grammar courses, while also offering accredited skill-based training for aspiring teachers and childcare professionals — NTT, PTT, ECCE, and Nanny courses — with both Online and Offline class options.
            </p>

            <div style="padding: var(--space-sm); background-color: var(--color-surface); border-left: 3px solid var(--color-gold-500); border-radius: 0 var(--radius-sm) var(--radius-sm) 0; margin-bottom: var(--space-md);">
              <div class="text-caption" style="text-transform: uppercase; font-weight: var(--weight-bold); color: var(--color-text-primary); margin-bottom: 2px;">
                Central Location in Ludhiana
              </div>
              <div class="text-body-small">
                ${siteConfig.address.fullFormatted}
              </div>
              <div class="text-body-small" style="margin-top: var(--space-3xs);">
                🕘 Open ${siteConfig.timings.display}
              </div>
            </div>

            <div class="flex gap-xs flex-wrap">
              <a href="#contact" class="btn btn--primary">
                Contact Our Institute
              </a>
              <a href="${siteConfig.address.googleMapsSearchUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary">
                Find on Map &rarr;
              </a>
            </div>
          </div>

          <!-- Trust & Value Pillars -->
          <div class="brand-intro__pillars reveal reveal-delay-1">
            <div class="pillar-item">
              <div class="pillar-icon card--feature-icon-academy">
                🗣️
              </div>
              <div>
                <h4 style="font-family: var(--font-sans); font-size: var(--text-md); margin-bottom: var(--space-3xs);">
                  IELTS & Spoken English Training
                </h4>
                <p class="text-body-small">
                  Structured classes in IELTS, Spoken English, and English Grammar to build fluency and exam readiness.
                </p>
              </div>
            </div>

            <div class="pillar-item">
              <div class="pillar-icon card--feature-icon-academy">
                🎓
              </div>
              <div>
                <h4 style="font-family: var(--font-sans); font-size: var(--text-md); margin-bottom: var(--space-3xs);">
                  Accredited Educator Training
                </h4>
                <p class="text-body-small">
                  Structured curriculum covering Nursery Teacher Training (NTT), Primary Teacher Training (PTT), Early Childhood Care Education (ECCE), and Nanny courses.
                </p>
              </div>
            </div>

            <div class="pillar-item">
              <div class="pillar-icon card--feature-icon-gold">
                💻
              </div>
              <div>
                <h4 style="font-family: var(--font-sans); font-size: var(--text-md); margin-bottom: var(--space-3xs);">
                  Online & Offline Flexibility
                </h4>
                <p class="text-body-small">
                  Every course is available in both online and in-person classroom formats to suit your schedule.
                </p>
              </div>
            </div>

            <div class="pillar-item">
              <div class="pillar-icon card--feature-icon-gold">
                📍
              </div>
              <div>
                <h4 style="font-family: var(--font-sans); font-size: var(--text-md); margin-bottom: var(--space-3xs);">
                  Easily Accessible Campus
                </h4>
                <p class="text-body-small">
                  Situated near Gurudwara Feruman at Dholewal Chowk on GT Road, ensuring smooth connectivity across Ludhiana.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
