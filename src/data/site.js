/**
 * The Future Corridor - Core Site & Contact Information
 * All business details are centralized here for easy maintenance.
 */

const MAP_QUERY = 'The Future Corridor,BXV/984 Dholewal Chowk Near Gurudwara Ferumaan GT Road Ludhiana Punjab 141003';
// Precise pin coordinates provided for the institute's location
const MAP_LAT = '30.8945638';
const MAP_LNG = '75.868158';

export const siteConfig = {
  name: 'The Future Corridor',
  tagline: 'Building Skills, Shaping Futures',
  subtitle: 'Professional Institute for IELTS, Spoken English & Skill-Based Teacher Training in Ludhiana',
  logo: '/images/brand/logo.png',
  phone: '8591549897',
  phoneDisplay: '+91 85915 49897',
  phoneTel: 'tel:+918591549897',

  timings: {
    display: '9:00 AM – 7:00 PM',
    days: 'Monday – Saturday'
  },

  // Get a free access key at https://web3forms.com (no signup cost, no backend needed).
  // Replace the placeholder below with your real key before publishing the site,
  // otherwise the enquiry form will not be able to send submissions.
  web3formsAccessKey: 'YOUR_WEB3FORMS_ACCESS_KEY_HERE',

  address: {
    building: 'BXV/984',
    landmark: 'Near Gurudwara Ferumaan, Dholewal Chowk',
    street: 'GT Road',
    city: 'Ludhiana',
    state: 'Punjab',
    pincode: '141003',
    fullFormatted: 'BXV/984, Dholewal Chowk, Near Gurudwara Ferumaan, GT Road, Ludhiana, Punjab — 141003',
    googleMapsSearchUrl: `https://www.google.com/maps/search/?api=1&query=${MAP_LAT},${MAP_LNG}`,
    googleMapsEmbedUrl: `https://www.google.com/maps?q=${MAP_LAT},${MAP_LNG}&output=embed`
  },

  meta: {
    title: 'The Future Corridor | IELTS, Spoken English & Teacher Training Institute in Ludhiana',
    description: 'The Future Corridor in Ludhiana offers IELTS, Spoken English, and English Grammar classes (Online & Offline) along with skill-based courses — NTT, PTT, ECCE, and Nanny training.',
    keywords: 'The Future Corridor, IELTS Ludhiana, Spoken English Ludhiana, English Grammar classes, NTT course Ludhiana, PTT course Punjab, ECCE training, Nanny course Ludhiana, Dholewal Chowk institute, Teacher Training Ludhiana',
    author: 'The Future Corridor',
    location: 'Ludhiana, Punjab, India'
  }
};