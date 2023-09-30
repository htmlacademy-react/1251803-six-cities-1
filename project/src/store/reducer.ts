import {createReducer} from '@reduxjs/toolkit';
import {
  changeCity,
  fillingOffersList,
  setOffersDataLoadingStatus,
  setOfferDataLoadingStatus,
  requireAuthorization,
  setCurrentOffer,
  setNearbyOffersDataLoadingStatus,
  setNearbyOffers,
  setReviews,
  setReviewsDataLoadingStatus
} from './action';
import { CityName } from '../types/cities';
import { Offers, Offer } from '../types/offer';
import { AuthorizationStatus } from '../const';
import { Reviews } from '../types/reviews';

type InitalState = {
  city: CityName;
  offers: Offers;
  nearbyOffers: Offers;
  currentOffer: Offer | null;
  reviews: Reviews;
  isOffersDataLoading: boolean;
  isNearbyOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  isReviewsDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitalState = {
  city: 'Paris',
  offers: [],
  nearbyOffers: [],
  currentOffer: null,
  reviews: [],
  isOffersDataLoading: false,
  isNearbyOffersDataLoading: false,
  isOfferDataLoading: false,
  isReviewsDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillingOffersList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setNearbyOffersDataLoadingStatus, (state, action) => {
      state.isNearbyOffersDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(setReviewsDataLoadingStatus, (state, action) => {
      state.isReviewsDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    });
});

export {reducer};
