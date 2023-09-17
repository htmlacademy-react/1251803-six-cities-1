import {createAction} from '@reduxjs/toolkit';
import { CityName } from '../types/cities';
import { Offers } from '../types/offer';
import {AuthorizationStatus} from '../const';

export const changeCity = createAction('changeCity', (newCity: CityName) => ({payload: newCity,}));

export const fillingOffersList = createAction('fillingOffersList', (offers: Offers) => ({payload: offers,}));

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setError = createAction<string | null>('data/setError');
