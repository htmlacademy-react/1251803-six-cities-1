import {Reviews} from '../types/reviews';

export const reviews: Reviews = [
  {
    'id': 1,
    'user': {
      'id': 11,
      'isPro': false,
      'name': 'Jack',
      'avatarUrl': 'https://12.react.pages.academy/static/avatar/2.jpg'
    },
    'rating': 4,
    'comment': 'The room was spacious and clean. The pool looked nothing like the photos and desparately needs a clean. The sauna and spa were closed for lunar new year holiday.',
    'date': '2023-07-12T07:05:42.921Z'
  },
  {
    'id': 2,
    'user': {
      'id': 18,
      'isPro': true,
      'name': 'Sophie',
      'avatarUrl': 'https://12.react.pages.academy/static/avatar/9.jpg'
    },
    'rating': 3,
    'comment': 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
    'date': '2023-07-12T07:05:42.921Z'
  }
];
