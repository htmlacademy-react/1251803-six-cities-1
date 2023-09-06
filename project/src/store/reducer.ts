import {createReducer} from '@reduxjs/toolkit';
import {changeCity, fillingOffersList} from './action';
import { offers } from '../mocks/offers';

const initialState = {
  city: 'Paris',
  offers: offers,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(fillingOffersList, (state) => {
      state.offers = offers;
    });
});

export {reducer};
