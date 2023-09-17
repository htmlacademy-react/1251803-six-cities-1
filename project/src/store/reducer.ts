import {createReducer} from '@reduxjs/toolkit';
import {changeCity, fillingOffersList, setOffersDataLoadingStatus, requireAuthorization, setError} from './action';
import { CityName } from '../types/cities';
import { Offers } from '../types/offer';
import {AuthorizationStatus} from '../const';

type InitalState = {
  city: CityName;
  offers: Offers;
  isOffersDataLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  error: string | null;
}

const initialState: InitalState = {
  city: 'Paris',
  offers: [],
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  error: null,
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
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
