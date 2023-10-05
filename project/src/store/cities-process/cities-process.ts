import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { CitiesProcess } from '../../types/state';
import { CityName } from '../../types/cities';

const initialState: CitiesProcess = {
  city: 'Paris',
};

export const citiesProcess = createSlice({
  name: NameSpace.City,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<CityName>) => {
      state.city = action.payload;
    },
  },
});

export const {changeCity} = citiesProcess.actions;
