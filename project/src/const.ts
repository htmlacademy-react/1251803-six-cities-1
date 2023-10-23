import { CitiesNames } from './types/cities';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',
  NotFound = '/*',
  NotFoundPage = '/not-found',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum Pages {
  Main = 'cities',
  Favorites = 'favorites'
}

export const Cities: CitiesNames = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export const SortOptions = [
  'Popular',
  'Price: low to high',
  'Price: high to low',
  'Top rated first'
];

export enum SortOptionsEnum {
  Popular = 'Popular',
  PriceLowToHigh = 'Price: low to high',
  PriceHighToLow = 'Price: high to low',
  TopRatedFirst = 'Top rated first',
}

export enum APIRoute {
  Offers = '/hotels',
  Login = '/login',
  Logout = '/logout',
  Reviews = '/comments',
  Favorite = '/favorite',
}

export enum NameSpace {
  Data = 'DATA',
  User = 'USER',
  City = 'CITY',
  Favorite = 'FAVORITE',
}

export const ImageDimensions = {
  bigImg: {
    width: 260,
    height: 200,
  },
  smallImg: {
    width: 150,
    height: 100,
  },
};

export const CharacterRange = {
  min: 50,
  max: 300,
};

export const URL_MARKER_DEFAULT = '/img/pin.svg';

export const URL_MARKER_CURRENT = '/img/pin-active.svg';

