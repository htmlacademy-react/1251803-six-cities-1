import {createReducer} from '@reduxjs/toolkit';
import {changeCity, fillingOffersList} from './action';
// import { offers } from '../mocks/offers';
import { CityName } from '../types/cities';
import { Offers } from '../types/offer';

type InitalState = {
  city: CityName;
  offers: Offers;
}

const initialState: InitalState = {
  city: 'Paris',
  offers: [],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillingOffersList, (state, action) => {
      state.offers = action.payload;
    });
});

export {reducer};
