import {NameSpace} from '../../const';
import { CityName } from '../../types/cities';
import {State} from '../../types/state';

export const getCity = (state: State): CityName => state[NameSpace.City].city;
