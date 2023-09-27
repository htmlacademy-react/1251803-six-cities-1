import {createReducer} from '@reduxjs/toolkit';
import {changeCity, fillingOffersList, setOffersDataLoadingStatus, setOfferDataLoadingStatus, requireAuthorization, setCurrentOffer} from './action';
import { CityName } from '../types/cities';
import { Offers, Offer } from '../types/offer';
import {AuthorizationStatus} from '../const';

type InitalState = {
  city: CityName;
  offers: Offers;
  currentOffer: Offer | null;
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitalState = {
  city: 'Paris',
  offers: [],
  currentOffer: null,
  isOffersDataLoading: false,
  isOfferDataLoading: false,
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
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setOfferDataLoadingStatus, (state, action) => {
      state.isOfferDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setCurrentOffer, (state, action) => {
      state.currentOffer = action.payload;
    });
});

export {reducer};
