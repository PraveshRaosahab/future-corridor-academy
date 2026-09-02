/**
 * Cursor Book Animation
 * A small book icon that follows the mouse pointer with a gentle floating motion,
 * and "flips open" when hovering interactive elements or clicking.
 * Skips entirely on touch devices and respects prefers-reduced-motion.
 */

export function initCursorBook() {
  // Skip on touch / coarse-pointer devices (no real cursor to track)
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) return;

  // Respect reduced motion preference — skip the animated follower
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  // Build the cursor element
  const cursor = document.createElement('div');
  cursor.className = 'cursor-book';
  cursor.setAttribute('aria-hidden', 'true');
  cursor.innerHTML = `
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="cursor-book__svg">
      <g class="cursor-book__pages">
        <path class="cursor-book__page cursor-book__page--left" d="M32 14 C24 9, 12 8, 6 11 L6 47 C12 44, 24 45, 32 50 Z" />
        <path class="cursor-book__page cursor-book__page--right" d="M32 14 C40 9, 52 8, 58 11 L58 47 C52 44, 40 45, 32 50 Z" />
      </g>
      <path class="cursor-book__spine" d="M32 14 L32 50" />
    </svg>
  `;
  document.body.appendChild(cursor);
  document.body.classList.add('has-cursor-book');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX;
  let curY = mouseY;
  let raf = null;

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!cursor.classList.contains('is-active')) {
      cursor.classList.add('is-active');
    }
  }

  function animate() {
    // Smooth trailing follow
    curX += (mouseX - curX) * 0.18;
    curY += (mouseY - curY) * 0.18;
    cursor.style.transform = `translate3d(${curX - 16}px, ${curY - 14}px, 0)`;
    raf = requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('mouseleave', () => cursor.classList.remove('is-active'));
  window.addEventListener('mouseenter', () => cursor.classList.add('is-active'));

  // "Flip open" state on interactive elements
  const interactiveSelector = 'a, button, .btn, .course-card, .dual-card, input, textarea, select, [role="button"]';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest && e.target.closest(interactiveSelector)) {
      cursor.classList.add('is-hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest && e.target.closest(interactiveSelector)) {
      cursor.classList.remove('is-hover');
    }
  });

  // Little "page turn" pulse on click
  document.addEventListener('mousedown', () => cursor.classList.add('is-clicking'));
  document.addEventListener('mouseup', () => cursor.classList.remove('is-clicking'));

  raf = requestAnimationFrame(animate);

  // Clean up if the page is torn down (SPA safety, not strictly required here)
  window.addEventListener('beforeunload', () => {
    if (raf) cancelAnimationFrame(raf);
  });
}
