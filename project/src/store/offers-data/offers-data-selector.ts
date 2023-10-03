import {NameSpace} from '../../const';
import { Offer, Offers } from '../../types/offer';
import { Reviews } from '../../types/reviews';
import {State} from '../../types/state';

export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;

export const getCurrentOffer = (state: State): Offer | null => state[NameSpace.Data].currentOffer;
export const getCurrentOfferDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOfferDataLoading;

export const getNearbyOffers = (state: State): Offers => state[NameSpace.Data].nearbyOffers;
export const getNearbyOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isNearbyOffersDataLoading;

export const getReviews = (state: State): Reviews => state[NameSpace.Data].reviews;
export const getReviewsDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isReviewsDataLoading;

export const getErrorStatus = (state: State): boolean => state[NameSpace.Data].hasError;
