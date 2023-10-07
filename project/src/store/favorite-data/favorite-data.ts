import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FavoriteData} from '../../types/state';
import {
  changeFavoriteStatus,
  fetchFavoriteOffersAction,
} from '../api-actions';

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
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isFavoriteOffersLoading = false;
      })
      .addCase(changeFavoriteStatus.pending, (state) => {
        state.isFavoriteOffersLoading = true;
      })
      .addCase(changeFavoriteStatus.fulfilled, (state) => {
        state.isFavoriteOffersLoading = false;
      });
  }
});
