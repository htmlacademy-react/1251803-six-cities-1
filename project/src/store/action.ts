import {createAction} from '@reduxjs/toolkit';
import { CityName } from '../types/cities';
import { Offer, Offers } from '../types/offer';
import {AuthorizationStatus, AppRoute} from '../const';

export const changeCity = createAction('changeCity', (newCity: CityName) => ({payload: newCity,}));

export const fillingOffersList = createAction('fillingOffersList', (offers: Offers) => ({payload: offers,}));

export const setCurrentOffer = createAction<Offer>('data/setCurrentOffer');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setOfferDataLoadingStatus = createAction<boolean>('data/setOfferDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('route/redirectToRoute');
