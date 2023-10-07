import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import { UserData } from '../../types/user-data';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthCheckedStatus = (state: State): boolean => {
  if (state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth) {
    return true;
  }

  return false;
};

export const getAuthorizationLoadingStatus = (state: State): boolean => state[NameSpace.User].authorizationLoadingStatus;

export const getUserData = (state: State): UserData | null => state[NameSpace.User].userData;
