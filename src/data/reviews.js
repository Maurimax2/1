/**
 * Real Google reviews, transcribed from the client's screenshots.
 *
 * These are other people's words, so they are stored once and shown verbatim
 * in every language — never translated, never edited, never invented.
 *
 * `text` is exactly what the review card shows. Where Google truncates a long
 * review behind "more", `truncated: true` renders an ellipsis and a link to
 * the full review rather than us inventing the missing sentences.
 *
 * `rating: null` means the star rating is deliberately not displayed. See
 * Cheikh oumar Hadrami below: the wording is unmistakably positive but the
 * stars were left at 1, so showing any number would misstate what he chose.
 * The honest fix is for him to correct it on Google, not for us to overwrite it.
 */
module.exports = {
  /** Public profile the reviews come from. */
  source: 'https://maps.app.goo.gl/8rbUargmPxPnHndn6',

  /** Aggregate exactly as Google displays it. */
  aggregate: { rating: '4.1', count: 19, label: 'Tour agency' },

  items: [
    {
      name: 'Irina Bykova',
      avatar: 'irina-bykova',
      meta: '1 review',
      rating: 5,
      date: '2 months ago',
      lang: 'en',
      text: 'We had an unforgettable trip to Mauritania with our guide Mohammed and his team. From the very beginning, everything was well organized: transfers,',
      truncated: true,
      photos: 4,
    },
    {
      name: 'George Christof',
      initial: 'G',
      color: '#d93025',
      meta: 'Local Guide · 23 reviews',
      localGuide: true,
      rating: 5,
      date: '8 months ago',
      lang: 'en',
      text: "Mohamed is an excellent guide. His service is excellent and he is providing security throughout the whole trip. What I didn't expect was that by the time I arrived,",
      truncated: true,
      photos: 3,
    },
    {
      name: 'Maria Tarnowski',
      initial: 'M',
      color: '#7b1fa2',
      meta: 'Local Guide · 14 reviews',
      localGuide: true,
      rating: 5,
      date: '3 months ago',
      lang: 'en',
      text: 'I had a great experience with them! They showed me the most amazing places in the country! Absolutely loved everything! I would highly recommend to book with them!',
      photos: 1,
    },
    {
      name: 'Izmer Hamdan',
      avatar: 'izmer-hamdan',
      meta: '2 reviews',
      rating: 5,
      date: 'a year ago',
      lang: 'en',
      text: 'Me with Ryo Bukhari (just 2 person) come from Malaysia and have traveled in October 2024, very many unforgettable experiences with Mouhamd (tour guide) riding the',
      truncated: true,
      photos: 14,
    },
    {
      name: 'Abenezer Worku',
      avatar: 'abenezer-worku',
      meta: 'Local Guide · 9 reviews',
      localGuide: true,
      rating: 5,
      date: 'Edited 3 months ago',
      lang: 'en',
      text: 'Mohammed is best and good guide, i highly recommend him.',
      photos: 11,
    },
    {
      name: 'Yves Lecavalier',
      initial: 'Y',
      color: '#e8710a',
      meta: '4 reviews',
      rating: 5,
      date: '8 months ago',
      lang: 'en',
      text: 'Great experience doing a tour with them!',
    },
    {
      name: 'Cheikh oumar Hadrami',
      avatar: 'cheikh-oumar-hadrami',
      meta: '1 review',
      rating: null, // left at 1 star by mistake — see the note at the top of this file
      date: 'a year ago',
      lang: 'en',
      text: 'it was my high pleasure to deal with you , I have words to describe my feelings , I have noticed a private dealing , everything was, aesthetic , stupendous and organized , you go extra mile to blow away and satisfied your clients go ahead',
    },
    {
      name: 'Patience Marcus',
      initial: 'P',
      color: '#188038',
      meta: '1 review',
      rating: 4,
      date: 'a year ago',
      lang: 'en',
      text: 'Mauritania is  best place to take a trip. Loving it',
      reply: 'Thanks alot for everything',
    },
  ],
};
