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
