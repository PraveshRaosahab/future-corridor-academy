/**
 * Course Categories Component
 * Interactive side-by-side panels introducing Language Courses & Skill Based Courses
 */

import { academyData } from '../data/academy.js';

export function renderCourseCategories() {
  const [languageGroup, skillGroup] = academyData.courseGroups;

  return `
    <section class="dual-choice" id="dual-choice">
      <div class="container">
        <div class="section-header section-header--center reveal">
          <span class="eyebrow eyebrow--gold">What We Offer</span>
          <h2 class="heading-2">Two Learning Tracks, One Institute</h2>
          <p class="section-header__desc">
            Sharpen your English communication for exams and careers, or build a professional foundation in teaching and childcare.
          </p>
        </div>

        <div class="grid grid--2col">
          <!-- 1. Language Courses Panel -->
          <div class="dual-card dual-card--academy reveal reveal-delay-1">
            <div class="dual-card__banner">
              <img 
                src="/images/hero/hero_academy.jpg" 
                alt="Language Courses at The Next Corridor" 
                class="dual-card__img"
                loading="lazy"
                width="600"
                height="300"
              />
              <div class="dual-card__overlay">
                <span class="badge badge--academy" style="background: rgba(255,255,255,0.95);">
                  Online & Offline
                </span>
              </div>
            </div>

            <div class="dual-card__body">
              <h3 class="dual-card__title">${languageGroup.title}</h3>
              <p class="dual-card__desc">
                ${languageGroup.description}
              </p>

              <div class="dual-card__features">
                ${languageGroup.courses.map(c => `<span class="badge badge--academy">${c.code}</span>`).join('')}
              </div>

              <div class="dual-card__footer">
                <a href="#courses-language" class="btn btn--academy btn--full">
                  Explore Language Courses
                </a>
              </div>
            </div>
          </div>

          <!-- 2. Skill Based Courses Panel -->
          <div class="dual-card dual-card--academy reveal reveal-delay-2">
            <div class="dual-card__banner">
              <img 
                src="/images/hero/hero_academy.jpg" 
                alt="Skill Based Teacher Training Courses at The Next Corridor" 
                class="dual-card__img"
                loading="lazy"
                width="600"
                height="300"
              />
              <div class="dual-card__overlay">
                <span class="badge badge--academy" style="background: rgba(255,255,255,0.95);">
                  Certification Courses
                </span>
              </div>
            </div>

            <div class="dual-card__body">
              <h3 class="dual-card__title">${skillGroup.title}</h3>
              <p class="dual-card__desc">
                ${skillGroup.description}
              </p>

              <div class="dual-card__features">
                ${skillGroup.courses.map(c => `<span class="badge badge--academy">${c.code}</span>`).join('')}
              </div>

              <div class="dual-card__footer">
                <a href="#courses-skill-based" class="btn btn--academy btn--full">
                  Explore Skill Based Courses
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  `;
}
