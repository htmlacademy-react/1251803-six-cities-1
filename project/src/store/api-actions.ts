import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { APIRoute, AppRoute } from '../const';
import { redirectToRoute } from './action';
import { saveToken, dropToken } from '../services/token';

import { AppDispatch, State } from '../types/state';
import { Offers, Offer } from '../types/offer';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { Reviews } from '../types/reviews';
import { SendComment } from '../types/send-comment';
import { FavoriteStatusType } from '../types/favorite-status-type';

export const fetchFavoriteOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorite/fetchFavoriteOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Favorite);
    return data;
  },
);

export const changeFavoriteStatus = createAsyncThunk<Offer, FavoriteStatusType, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorite/changeFavoriteStatus',
  async ({hotelId, status}, {dispatch, extra: api}) => {
    const {data} = await api.post<Offer>(`${APIRoute.Favorite}/${hotelId}/${status}`);
    dispatch(fetchOffersAction());
    dispatch(fetchFavoriteOffersAction());
    return data;
  },
);

export const fetchOffersAction = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOfferAction = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (hotelId, {extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${hotelId}`);
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Reviews, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (hotelId, {extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Reviews}/${hotelId}`);
    return data;
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<Offers, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (hotelId, {extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${hotelId}/nearby`);
    return data;
  },
);

export const sendCommentAction = createAsyncThunk<Reviews, SendComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/sendComment',
  async ({hotelId, rating, comment}, {extra: api}) => {
    const {data} = await api.post<Reviews>(`${APIRoute.Reviews}/${hotelId}`, {rating, comment});
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(fetchOffersAction());
  },
);
