import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {offersData} from './offers-data/offers-data';
import {userProcess} from './user-process/user-process';
import {citiesProcess} from './cties-process/cities-process';
import { favoriteData } from './favorite-data/favorite-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.City]: citiesProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Favorite]: favoriteData.reducer,
});
