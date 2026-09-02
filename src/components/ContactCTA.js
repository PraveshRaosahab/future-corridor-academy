/**
 * Contact CTA Component
 * High-impact contact section: direct tel: calling, embedded Google Map,
 * clean address, and a Web3Forms-powered enquiry form.
 */

import { siteConfig } from '../data/site.js';
import { renderEnquiryForm } from './EnquiryForm.js';

export function renderContactCTA() {
  return `
    <section class="contact-cta" id="contact">
      <div class="container">
        <div class="contact-cta__header reveal">
          <span class="eyebrow eyebrow--gold" style="color: var(--color-gold-400);">Get In Touch</span>
          <h2 class="heading-2" style="color: var(--color-white); margin-top: var(--space-3xs); margin-bottom: var(--space-2xs);">
            Ready to Connect with ${siteConfig.name}?
          </h2>
          <p style="color: var(--color-text-inverse-muted); max-width: 600px; margin-inline: auto;">
            Speak directly with our counseling team, or send us your details below and we'll reach out to you.
          </p>
        </div>

        <div class="contact-cta__grid">
          <!-- Left: Contact Info & Map -->
          <div class="contact-cta__box reveal">
            <!-- Direct Clickable Phone Link -->
            <div>
              <a href="${siteConfig.phoneTel}" class="contact-cta__phone-link" aria-label="Call ${siteConfig.phoneDisplay}">
                📞 ${siteConfig.phoneDisplay}
              </a>
            </div>

            <!-- Physical Address Card -->
            <div class="contact-cta__address">
              <p style="font-size: var(--text-base); color: var(--color-white); font-weight: var(--weight-medium); margin-bottom: var(--space-3xs);">
                📍 Institute Location:
              </p>
              <p style="color: rgba(255, 255, 255, 0.85); line-height: var(--leading-normal); margin-bottom: var(--space-3xs);">
                ${siteConfig.address.fullFormatted}
              </p>
              <p style="color: rgba(255, 255, 255, 0.85); line-height: var(--leading-normal);">
                🕘 Timings: ${siteConfig.timings.display} (${siteConfig.timings.days})
              </p>
            </div>

            <!-- Primary CTA Buttons -->
            <div class="contact-cta__actions">
              <a href="${siteConfig.phoneTel}" class="btn btn--gold btn--lg">
                Call Now
              </a>
              <a
                href="${siteConfig.address.googleMapsSearchUrl}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn--secondary btn--lg"
                style="color: #FFFFFF; border-color: rgba(255,255,255,0.4);"
              >
                Get Directions &rarr;
              </a>
            </div>

            <!-- Embedded Map -->
            <div class="contact-cta__map reveal">
              <iframe
                src="${siteConfig.address.googleMapsEmbedUrl}"
                width="100%"
                height="320"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="${siteConfig.name} Location Map"
              ></iframe>
            </div>
          </div>

          <!-- Right: Enquiry Form -->
          ${renderEnquiryForm()}
        </div>
      </div>
    </section>
  `;
}
