/**
 * Hero Section Component
 * Academy-focused hero for The Future Corridor institute
 */

import { siteConfig } from '../data/site.js';

export function renderHero() {
  return `
    <section class="hero" id="hero">
      <!-- Decorative 3D layer (Three.js). Populated lazily by initHero3D();
           stays empty/invisible on reduced-motion, small screens, or if WebGL
           is unavailable, so the hero always looks complete without it. -->
      <div class="hero__3d" id="hero-3d" aria-hidden="true"></div>

      <div class="container hero__container">
        <!-- Main Headline -->
        <div class="hero__header">
          <img src="${siteConfig.logo}" alt="${siteConfig.name} Logo" class="hero__logo animate-scale-in" width="120" height="120" />
          <span class="eyebrow eyebrow--gold animate-fade-up">Institute of Learning, Ludhiana</span>
          <h1 class="hero__title animate-fade-up stagger-1">
            ${siteConfig.name}
          </h1>
          <span class="hero__tagline animate-fade-up stagger-2">
            ${siteConfig.tagline}
          </span>
          <p class="hero__lead animate-fade-up stagger-3">
            An accredited institute in Ludhiana offering IELTS, Spoken English, and English Grammar classes alongside skill-based teacher training courses — NTT, PTT, ECCE, and Nanny — available Online and Offline.
          </p>

          <div class="hero__meta animate-fade-up stagger-4">
            <span class="hero__meta-item">🕘 ${siteConfig.timings.display}</span>
            <span class="hero__meta-item">📞 ${siteConfig.phoneDisplay}</span>
            <span class="hero__meta-item">📍 ${siteConfig.address.city}, ${siteConfig.address.state}</span>
          </div>

          <!-- Action Buttons -->
          <div class="hero__actions animate-fade-up stagger-4">
            <a href="#courses-preview" class="btn btn--academy btn--lg">
              Explore Courses
            </a>
            <a href="#contact" class="btn btn--secondary btn--lg">
              Enquire Now
            </a>
          </div>
        </div>

        <!-- Visual Showcase: Student Success Gallery -->
        <div class="hero__split hero__split--triple animate-scale-in stagger-5">
          <div class="split-card split-card--academy">
            <div class="split-card__media">
              <img 
                src="/images/hero/student-nanny.jpg" 
                alt="Graduate holding Nanny course certificate at The Next Corridor" 
                class="split-card__img"
                loading="eager"
                fetchpriority="high"
                width="600"
                height="605"
              />
              <div class="split-card__badge">
                <!--<span class="badge badge--academy">Nanny Course</span>-->
              </div>
            </div>
          </div>

          <div class="split-card split-card--academy">
            <div class="split-card__media">
              <img 
                src="/images/hero/student-certificates.jpg" 
                alt="Graduate holding multiple course certificates from The Next Corridor" 
                class="split-card__img"
                loading="eager"
                width="600"
                height="872"
              />
              <div class="split-card__badge">
                <!--<span class="badge badge--academy">Certified Graduates</span>-->
              </div>
            </div>
          </div>

          <div class="split-card split-card--academy">
            <div class="split-card__media">
              <img 
                src="/images/hero/student-ptt.jpg" 
                alt="Graduate holding PTT course certificate at The Next Corridor" 
                class="split-card__img"
                loading="eager"
                width="600"
                height="587"
              />
              <div class="split-card__badge">
                <!--<span class="badge badge--academy">PTT Course</span>-->
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}
