import {createAction} from '@reduxjs/toolkit';
import { CityName } from '../types/cities';
import { Offer, Offers } from '../types/offer';
import {AuthorizationStatus, AppRoute} from '../const';
import { Reviews } from '../types/reviews';

export const changeCity = createAction('changeCity', (newCity: CityName) => ({payload: newCity,}));

export const fillingOffersList = createAction('fillingOffersList', (offers: Offers) => ({payload: offers,}));

export const setCurrentOffer = createAction<Offer>('data/setCurrentOffer');

export const setReviews = createAction<Reviews>('data/setReviews');

export const setNearbyOffers = createAction<Offers>('data/setNearbyOffers');

export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');

export const setNearbyOffersDataLoadingStatus = createAction<boolean>('data/setNearbyOffersDataLoadingStatus');

export const setOfferDataLoadingStatus = createAction<boolean>('data/setOfferDataLoadingStatus');

export const setReviewsDataLoadingStatus = createAction<boolean>('data/setReviewsDataLoadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const redirectToRoute = createAction<AppRoute>('route/redirectToRoute');
