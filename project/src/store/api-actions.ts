import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import { Offers } from '../types/offer.js';
import {APIRoute} from '../const';
// import { fillingOffersList } from './action.js';
import {createAction} from '@reduxjs/toolkit';

export const fillingOffersList = createAction('fillingOffersList', (offers: Offers) => ({payload: offers,}));

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(fillingOffersList(data));
  },
);
