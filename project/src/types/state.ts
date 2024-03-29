import {store} from '../store/index';
import {AuthorizationStatus} from '../const';
import { Offers, Offer } from './offer';
import { Reviews } from './reviews';
import { CityName } from './cities';
import { UserData } from './user-data';

export type OffersData = {
  offers: Offers;
  nearbyOffers: Offers;
  currentOffer: Offer | null;
  reviews: Reviews;
  isOffersDataLoading: boolean;
  isNearbyOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  isReviewsDataLoading: boolean;
  hasError: boolean;
};

export type FavoriteData = {
  favoriteOffers: Offers;
  isFavoriteOffersLoading: boolean;
};

export type CitiesProcess = {
  city: CityName;
};

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  authorizationLoadingStatus: boolean;
  userData: UserData | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
