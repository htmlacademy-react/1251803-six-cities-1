import {createAction} from '@reduxjs/toolkit';
import { CityName } from '../types/cities';

export const changeCity = createAction('changeCity', (newCity: CityName) => ({payload: newCity,}));

export const fillingOffersList = createAction('fillingOffersList');
