/**
 * Real traveller reviews only.
 *
 * These are other people's words, so they are stored once and shown verbatim
 * in every language — never translated, never edited, never invented.
 * The section disappears from the site entirely while this list is empty.
 *
 * Shape:
 *   {
 *     name:    'Anna R.',            // as it appears on the review
 *     country: 'Italy',              // optional
 *     rating:  5,                    // 1–5, as given
 *     date:    '2025-02',            // optional, YYYY-MM
 *     lang:    'it',                 // language the review was written in
 *     text:    'Un viaggio…',        // verbatim, unedited
 *     source:  'google',             // where it came from
 *   }
 */
module.exports = {
  /** Public link to the profile the reviews come from. */
  source: 'https://maps.app.goo.gl/8rbUargmPxPnHndn6',
  items: [],
};
