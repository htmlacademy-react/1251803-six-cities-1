import { NameSpace } from '../../const';
import { Offers } from '../../types/offer';
import { State } from '../../types/state';

export const getFavoriteOffers = (state: State): Offers => state[NameSpace.Favorite].favoriteOffers;
export const getFavoriteOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Favorite].isFavoriteOffersLoading;
