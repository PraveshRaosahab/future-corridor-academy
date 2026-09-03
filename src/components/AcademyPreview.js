/**
 * Academy Preview Component
 * Presents Language Courses and Skill Based Courses with clean cards and editable placeholder metadata
 */

import { academyData } from '../data/academy.js';

function renderCourseCard(course, idx) {
  return `
    <div class="course-card reveal reveal-delay-${(idx % 4) + 1}">
      <div class="course-card__badge">
        <span class="badge badge--academy">${course.code}</span>
      </div>
      <h3 class="course-card__title">${course.name}</h3>
      <p class="course-card__desc">${course.summary}</p>

      <div class="course-card__meta">
        <span class="placeholder-tag">${course.duration}</span>
        <span class="badge badge--neutral">${course.mode}</span>
      </div>

      <a href="#contact" class="btn btn--outline-academy btn--sm btn--full" style="margin-top: auto;">
        Course Enquiry &rarr;
      </a>
    </div>
  `;
}

export function renderAcademyPreview() {
  return `
    <section class="academy-preview" id="academy-preview">
      <div class="container" id="courses-preview">
        <div class="section-header section-header--center reveal">
          <span class="eyebrow eyebrow--academy">Our Courses</span>
          <h2 class="heading-2">${academyData.headline}</h2>
          <p class="section-header__desc">
            ${academyData.subheadline}
          </p>
        </div>

        ${academyData.courseGroups.map(group => `
          <div id="courses-${group.id}" style="margin-bottom: var(--space-xl); scroll-margin-top: 90px;">
            <div class="section-header" style="margin-bottom: var(--space-md);">
              <h3 class="heading-3">${group.title}</h3>
              <p class="section-header__desc" style="margin: 0;">${group.description}</p>
            </div>
            <div class="grid ${group.courses.length === 3 ? 'grid--3col' : 'grid--4col'}">
              ${group.courses.map((course, idx) => renderCourseCard(course, idx)).join('')}
            </div>
          </div>
        `).join('')}

        
      </div>
    </section>
  `;
}
