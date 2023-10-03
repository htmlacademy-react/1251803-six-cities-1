import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OffersData} from '../../types/state';
import {
  fetchOffersAction,
  fetchOfferAction,
  fetchReviewsAction,
  fetchNearbyOffersAction,
  sendCommentAction
} from '../api-actions';

const initialState: OffersData = {
  offers: [],
  nearbyOffers: [],
  currentOffer: null,
  reviews: [],
  isOffersDataLoading: false,
  isNearbyOffersDataLoading: false,
  isOfferDataLoading: false,
  isReviewsDataLoading: false,
  hasError: false,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.currentOffer = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isReviewsDataLoading = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewsDataLoading = false;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isNearbyOffersDataLoading = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isNearbyOffersDataLoading = false;
      });
  }
});
