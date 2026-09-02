/**
 * Enquiry Form Component
 * Collects Name, Email, Phone, Course Interest & Experience,
 * and submits directly to Web3Forms (https://web3forms.com) — no backend required.
 */

import { siteConfig } from '../data/site.js';
import { academyData } from '../data/academy.js';

function renderCourseOptions() {
  return academyData.courseGroups
    .map(group => `
      <optgroup label="${group.title}">
        ${group.courses.map(course => `<option value="${course.name}">${course.name}</option>`).join('')}
      </optgroup>
    `)
    .join('') + `<option value="Not Sure Yet">Not Sure Yet — Please Advise</option>`;
}

export function renderEnquiryForm() {
  return `
    <div class="enquiry-form-card reveal reveal-delay-1">
      <h3 class="enquiry-form__title">Send Us an Enquiry</h3>
      <p class="enquiry-form__subtitle">
        Fill in your details and our counseling team will get back to you shortly.
      </p>

      <form id="enquiry-form" class="enquiry-form" novalidate>
        <!-- Web3Forms configuration -->
        <input type="hidden" name="access_key" value="${siteConfig.web3formsAccessKey}" />
        <input type="hidden" name="subject" value="New Course Enquiry — ${siteConfig.name}" />
        <input type="hidden" name="from_name" value="${siteConfig.name} Website" />
        <!-- Honeypot spam trap: must stay empty, hidden from real visitors -->
        <input type="checkbox" name="botcheck" class="enquiry-form__honeypot" tabindex="-1" autocomplete="off" />

        <div class="enquiry-form__row">
          <div class="enquiry-form__field">
            <label for="ef-name">Full Name <span class="enquiry-form__required">*</span></label>
            <input type="text" id="ef-name" name="name" placeholder="Your full name" required autocomplete="name" />
          </div>
          <div class="enquiry-form__field">
            <label for="ef-phone">Phone Number <span class="enquiry-form__required">*</span></label>
            <input type="tel" id="ef-phone" name="phone" placeholder="e.g. 98765 43210" required autocomplete="tel" pattern="[0-9+\\-\\s]{7,15}" />
          </div>
        </div>

        <div class="enquiry-form__field">
          <label for="ef-email">Email Address <span class="enquiry-form__required">*</span></label>
          <input type="email" id="ef-email" name="email" placeholder="you@example.com" required autocomplete="email" />
        </div>

        <div class="enquiry-form__row">
          <div class="enquiry-form__field">
            <label for="ef-course">Course Interested In <span class="enquiry-form__required">*</span></label>
            <div class="enquiry-form__select-wrap">
              <select id="ef-course" class="enquiry-form__select" name="course_interested" required>
                <option value="" disabled selected>Select a course</option>
                ${renderCourseOptions()}
              </select>
            </div>
          </div>
          <div class="enquiry-form__field">
            <label for="ef-mode">Preferred Mode</label>
            <div class="enquiry-form__select-wrap">
              <select id="ef-mode" class="enquiry-form__select" name="preferred_mode">
                <option value="No Preference">No Preference</option>
                <option value="Online">Online</option>
                <option value="Offline">Offline (In-Person)</option>
              </select>
            </div>
          </div>
        </div>

        <div class="enquiry-form__field">
          <label for="ef-experience">Experience / Educational Background</label>
          <textarea id="ef-experience" name="experience" rows="3" placeholder="e.g. 12th Pass, B.A. Graduate, 1 year of prior teaching experience..."></textarea>
        </div>

        <div class="enquiry-form__field">
          <label for="ef-message">Message (Optional)</label>
          <textarea id="ef-message" name="message" rows="2" placeholder="Any specific questions for us?"></textarea>
        </div>

        <button type="submit" class="btn btn--academy btn--lg btn--full enquiry-form__submit">
          <span class="enquiry-form__submit-label">Submit Enquiry</span>
        </button>

        <p id="enquiry-form-status" class="enquiry-form__status" role="status" aria-live="polite"></p>
      </form>
    </div>
  `;
}

export function initEnquiryForm() {
  const form = document.getElementById('enquiry-form');
  if (!form) return;

  const statusEl = document.getElementById('enquiry-form-status');
  const submitBtn = form.querySelector('.enquiry-form__submit');
  const submitLabel = form.querySelector('.enquiry-form__submit-label');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (siteConfig.web3formsAccessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
      statusEl.textContent = 'Form is not fully set up yet — please call us directly at ' + siteConfig.phoneDisplay + '.';
      statusEl.className = 'enquiry-form__status is-error';
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    submitBtn.disabled = true;
    submitLabel.textContent = 'Sending...';
    statusEl.textContent = '';
    statusEl.className = 'enquiry-form__status';

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();

      if (result.success) {
        statusEl.textContent = "Thank you! Your enquiry has been sent — we'll contact you shortly.";
        statusEl.className = 'enquiry-form__status is-success';
        form.reset();
      } else {
        throw new Error(result.message || 'Submission failed');
      }
    } catch (err) {
      statusEl.textContent = 'Something went wrong. Please try again, or call us at ' + siteConfig.phoneDisplay + '.';
      statusEl.className = 'enquiry-form__status is-error';
    } finally {
      submitBtn.disabled = false;
      submitLabel.textContent = 'Submit Enquiry';
    }
  });
}
