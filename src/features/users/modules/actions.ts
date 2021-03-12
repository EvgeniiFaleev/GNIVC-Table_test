import {Action} from 'redux';
import {ThunkType} from '@store/root-reducer';
import * as types from './types';
import {IMetaInfo, IUserInfo, usersAPI} from "@api/index";


interface ISetCurrentUsersAction extends Action<typeof types.SET_CURRENT_USERS> {
  payload: Array<IUserInfo>
}

export const setCurrentUsers = (payload: Array<IUserInfo>): ISetCurrentUsersAction => ({
  type: types.SET_CURRENT_USERS,
  payload,

});


interface ISetCurrentPageAction extends Action<typeof types.SET_CURRENT_PAGE> {
  payload: number
}

export const setCurrentPage = (payload: number): ISetCurrentPageAction => ({
  type: types.SET_CURRENT_PAGE,
  payload
});

interface ISetUserInfoAction extends Action<typeof types.SET_USER_INFO> {
  payload: number | null
}

export const setUserInfo = (payload: number | null): ISetUserInfoAction => ({
  type: types.SET_USER_INFO,
  payload
});

interface ISetPaginationInfoAction extends Action<typeof types.SET_PAGINATION_INFO> {
  payload: IMetaInfo['pagination']
}

export const setPaginationInfo = (payload: IMetaInfo['pagination']): ISetPaginationInfoAction => ({
  type: types.SET_PAGINATION_INFO,
  payload
});


export const getUsers = (page: number): ThunkType => async (dispatch) => {
  const res = await usersAPI.getUsers(page);
  if (!res) return;
  const sortedUsersById = [...res.data].sort((a, b) => a.id - b.id);
  dispatch(setCurrentUsers(sortedUsersById));
  dispatch(setPaginationInfo(res.meta.pagination))
};
export const getUserPostsInfo = (id: number): ThunkType => async (dispatch) => {
  const res = await usersAPI.getUserPosts(id);
  if (!res) return;
  dispatch(setUserInfo(res.meta.pagination.total))
}

export type UsersActionTypes =
    | ISetCurrentPageAction
    | ISetCurrentUsersAction
    | ISetUserInfoAction
    | ISetPaginationInfoAction
