import {createReducer} from '@reduxjs/toolkit';
import {changeCity, fillingOffersList, setOffersDataLoadingStatus} from './action';
import { CityName } from '../types/cities';
import { Offers } from '../types/offer';

type InitalState = {
  city: CityName;
  offers: Offers;
  isOffersDataLoading: boolean;
}

const initialState: InitalState = {
  city: 'Paris',
  offers: [],
  isOffersDataLoading: false,
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
    });
});

export {reducer};
