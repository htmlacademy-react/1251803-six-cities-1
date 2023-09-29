import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import { Offers, Offer } from '../types/offer';
import {APIRoute, AuthorizationStatus, AppRoute} from '../const';
import {
  fillingOffersList,
  setOffersDataLoadingStatus,
  setOfferDataLoadingStatus,
  requireAuthorization,
  redirectToRoute,
  setCurrentOffer,
  setNearbyOffers,
  setNearbyOffersDataLoadingStatus,
  setReviewsDataLoadingStatus,
  setReviews
} from './action';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import {saveToken, dropToken} from '../services/token';
import { Reviews } from '../types/reviews';
import { SendComment } from '../types/send-comment';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setOffersDataLoadingStatus(true));
    const {data} = await api.get<Offers>(APIRoute.Offers);
    dispatch(fillingOffersList(data));
    dispatch(setOffersDataLoadingStatus(false));
  },
);

export const fetchOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (hotelId, {dispatch, extra: api}) => {
    dispatch(setOfferDataLoadingStatus(true));
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${hotelId}`);
    dispatch(setCurrentOffer(data));
    dispatch(setOfferDataLoadingStatus(false));
  },
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchReviews',
  async (hotelId, {dispatch, extra: api}) => {
    dispatch(setReviewsDataLoadingStatus(true));
    const {data} = await api.get<Reviews>(`${APIRoute.Reviews}/${hotelId}`);
    dispatch(setReviews(data));
    dispatch(setReviewsDataLoadingStatus(false));
  },
);

export const fetchNearbyOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (hotelId, {dispatch, extra: api}) => {
    dispatch(setNearbyOffersDataLoadingStatus(true));
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${hotelId}/nearby`);
    dispatch(setNearbyOffers(data));
    dispatch(setNearbyOffersDataLoadingStatus(false));
  },
);

export const sendCommentAction = createAsyncThunk<void, SendComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/sendComment',
  async ({hotelId, rating, comment}, {dispatch, extra: api}) => {
    const {data} = await api.post<Reviews>(`${APIRoute.Reviews}/${hotelId}`, {rating, comment});
    dispatch(setReviews(data));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(redirectToRoute(AppRoute.Root));
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
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
  },
);
