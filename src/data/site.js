/**
 * Brand-level constants. Everything the client might want to change one day
 * (phone number, socials, domain) lives here and nowhere else.
 */
const WHATSAPP_NUMBER = '22241860533'; // +222 41 86 05 33

module.exports = {
  name: 'Travel and Trips in Mauritania',
  shortName: 'Travel & Trips',
  domain: 'https://travelandtripsinmauritania.com',
  email: 'travelandtripsinmauritania7@gmail.com',
  phoneDisplay: '+222 41 86 05 33',
  whatsapp: WHATSAPP_NUMBER,
  wa: (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
  maps: 'https://maps.app.goo.gl/8rbUargmPxPnHndn6',
  facebook: 'https://www.facebook.com/share/199kd24vvK/',
  instagram: 'https://www.instagram.com/travel_and_trips_in_mauritnia?igsh=NzRreGxucTZhOWRn',
  city: 'Nouakchott',
  country: 'Mauritania',
  founded: '2016',

  languages: [
    { code: 'en', label: 'English', short: 'EN', dir: '', locale: 'en_GB' },
    { code: 'fr', label: 'Français', short: 'FR', dir: 'fr/', locale: 'fr_FR' },
    { code: 'it', label: 'Italiano', short: 'IT', dir: 'it/', locale: 'it_IT' },
  ],

  // page key -> output file name (shared by every language)
  pages: {
    home: 'index.html',
    experiences: 'experiences.html',
    destinations: 'destinations.html',
    gallery: 'gallery.html',
    about: 'about.html',
    guide: 'travel-guide.html',
    contact: 'contact.html',
  },
};
