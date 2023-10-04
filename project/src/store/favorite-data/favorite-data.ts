import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FavoriteData} from '../../types/state';
import {
  changeFavoriteStatus,
  fetchFavoriteOffersAction,
} from '../api-actions';
import { Offer } from '../../types/offer';

const initialState: FavoriteData = {
  favoriteOffers: [],
  isFavoriteOffersLoading: false,
};

export const favoriteData = createSlice({
  name: NameSpace.Favorite,
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isFavoriteOffersLoading = false;
      })
      .addCase(changeFavoriteStatus.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          if (!state.favoriteOffers.includes(action.payload)) {
            state.favoriteOffers.push(action.payload);
          }
        } else {
          state.favoriteOffers.filter((offer: Offer) => offer.id !== action.payload.id);
        }
      });
  }
});
