export enum AppRoute {
  Root = '/',
  Login = 'login',
  Favorites = 'favorites',
  Room = 'offer/:id',
  NotFound = '*',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}
