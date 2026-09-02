/**
 * The Future Corridor — Application Entry Point (Phase 3)
 * Assembles the Premium Homepage / Landing Experience
 */

import { siteConfig } from './data/site.js';
import { renderNavbar, initNavbar } from './components/Navbar.js';
import { renderHero } from './components/Hero.js';
import { renderCourseCategories } from './components/CourseCategories.js';
import { renderBrandIntro } from './components/BrandIntro.js';
import { renderAcademyPreview } from './components/AcademyPreview.js';
import { renderContactCTA } from './components/ContactCTA.js';
import { initEnquiryForm } from './components/EnquiryForm.js';
import { renderFooter } from './components/Footer.js';
import { initScrollAnimations } from './utils/scroll-animations.js';
import { initCursorBook } from './utils/cursor-book.js';
import { initThemeToggle } from './utils/theme.js';

console.log(`[The Future Corridor] Initializing ${siteConfig.name} Landing Experience...`);

const headerEl = document.getElementById('site-header');
const mainEl = document.getElementById('main-content');
const footerEl = document.getElementById('site-footer');

function initApp() {
  if (!headerEl || !mainEl || !footerEl) {
    console.error('Core mounting elements not found.');
    return;
  }

  // 1. Render Header / Navigation
  headerEl.innerHTML = renderNavbar();
  initNavbar();
  initThemeToggle();

  // 2. Render Homepage Sections
  mainEl.innerHTML = `
    ${renderHero()}
    ${renderCourseCategories()}
    ${renderBrandIntro()}
    ${renderAcademyPreview()}
    ${renderContactCTA()}
  `;

  // 3. Render Footer
  footerEl.innerHTML = renderFooter();

  // 4. Initialize Intersection Observer Scroll Animations
  initScrollAnimations();

  // 5. Initialize the animated book cursor
  initCursorBook();

  // 5b. Wire up the enquiry form submission (Web3Forms)
  initEnquiryForm();

  // 6. Smooth scrolling enhancement for local anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const navOffset = 70;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
