import {createAction} from '@reduxjs/toolkit';
import { CityName } from '../types/cities';
import { Offers } from '../types/offer';

export const changeCity = createAction('changeCity', (newCity: CityName) => ({payload: newCity,}));

export const fillingOffersList = createAction('fillingOffersList', (offers: Offers) => ({payload: offers,}));

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
