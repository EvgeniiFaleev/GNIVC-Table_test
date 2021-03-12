import {Reducer} from 'redux';
import * as types from './types';
import {UsersActionTypes} from './actions';
import {IUserInfo} from "@api/index";

interface IUserState {
  page: number,
  currentUsers: Array<IUserInfo> | null,
  userInfo: number | null,
  limit: number,
  pages: number,
  total: number
}

const initialState : IUserState = {
  page: 1,
  currentUsers: null,
  userInfo: null,
  limit: 20,
  pages: 1,
  total: 1
};

export const reducer: Reducer<IUserState, UsersActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };
    case types.SET_CURRENT_USERS:
      return {
        ...state,
        currentUsers: action.payload,
      };
    case types.SET_PAGINATION_INFO:
      return {
        ...state, ...action.payload,
      };
    case types.SET_USER_INFO:
      return {
        ...state,userInfo: action.payload,
      };
    default:
      return state;
  }
};
