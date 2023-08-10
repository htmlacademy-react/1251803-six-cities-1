import {Offers} from '../types/offer';

export const offers: Offers = [
  {
    id: 0,
    name: 'Beautiful & luxurious studio at great location',
    imgs: [
      {
        src: 'img/apartment-01.jpg',
        alt: 'room'
      },
      {
        src: 'img/room.jpg',
        alt: 'room'
      },
      {
        src: 'img/apartment-02.jpg',
        alt: 'room'
      },
      {
        src: 'img/apartment-03.jpg',
        alt: 'room'
      },
    ],
    isPremium: true,
    isMark: false,
    price: 120,
    rating: 80,
    type: 'Apartment',
    bedroomsCount: 3,
    adultsCount: 4,
    location: 'Amsterdam',
    features: [
      'Wi-Fi',
      'Washing machine'
    ],
  },
  {
    id: 1,
    name: 'Wood and stone place',
    imgs: [
      {
        src: 'img/room.jpg',
        alt: 'room'
      },
      {
        src: 'img/apartment-01.jpg',
        alt: 'room'
      },
      {
        src: 'img/apartment-02.jpg',
        alt: 'room'
      },
      {
        src: 'img/apartment-03.jpg',
        alt: 'room'
      },
    ],
    isPremium: false,
    isMark: true,
    price: 80,
    rating: 80,
    type: 'Private room',
    bedroomsCount: 1,
    adultsCount: 2,
    location: 'Amsterdam',
    features: [
      'Wi-Fi',
      'Washing machine'
    ],
  },
  {
    id: 2,
    name: 'Canal View Prinsengracht',
    imgs: [
      {
        src: 'img/apartment-02.jpg',
        alt: 'room'
      },
      {
        src: 'img/room.jpg',
        alt: 'room'
      },
      {
        src: 'img/apartment-01.jpg',
        alt: 'room'
      },
      {
        src: 'img/apartment-03.jpg',
        alt: 'room'
      },
    ],
    isPremium: false,
    isMark: false,
    price: 132,
    rating: 80,
    type: 'Apartment',
    bedroomsCount: 3,
    adultsCount: 4,
    location: 'Amsterdam',
    features: [
      'Wi-Fi',
      'Washing machine'
    ],
  },
  {
    id: 3,
    name: 'Nice, cozy, warm big bed apartment',
    imgs: [
      {
        src: 'img/apartment-03.jpg',
        alt: 'room'
      },
      {
        src: 'img/room.jpg',
        alt: 'room'
      },
      {
        src: 'img/apartment-01.jpg',
        alt: 'room'
      },
      {
        src: 'img/apartment-02.jpg',
        alt: 'room'
      },
    ],
    isPremium: true,
    isMark: true,
    price: 180,
    rating: 100,
    type: 'Apartment',
    bedroomsCount: 3,
    adultsCount: 4,
    location: 'Cologne',
    features: [
      'Wi-Fi',
      'Washing machine'
    ],
  },
];
