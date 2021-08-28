import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { PromiseVoid } from '../interface';
import httpReq, { HttpReqCfg } from '../utils/httpRequest';
import { TAppState } from '../redux';
import { IUsersAction } from '../redux/types/users';
import {
  setUserPostData,
  setIsLoading,
} from '../redux/action/post';
import {
  setErrorStatus,
} from '../redux/action/app';
import {
  IUserPostResponseBody,
} from '../interface/post';
import {
  API_ROUTES,
} from '../constants';

export const getUserPostsData = (
  userId: string,
  start: number,
  limit: number,
): ThunkAction<PromiseVoid, TAppState, {}, IUsersAction> => async (d: Dispatch) => {
  const config: HttpReqCfg = {
    method: 'GET',
  };
  try {
    d(setIsLoading(true));
    const url = `${API_ROUTES.getPostByUserId}&_start=${start}&_limit=${limit}`.replace('{userId}', userId);
    const res = await httpReq<IUserPostResponseBody[]>(url, config);

    d(setUserPostData(res));
  } catch (err) {
    d(setErrorStatus(err.status));
  } finally {
    d(setIsLoading(false));
  }
};
