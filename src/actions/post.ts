import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { PromiseVoid } from '../interface';
import httpReq, { HttpReqCfg } from '../utils/httpRequest';
import { TAppState } from '../redux';
import { IPostAction } from '../redux/types/post';
import {
  setUserPostData,
  setIsLoading,
  setModalIsLoading,
  setPostComments,
} from '../redux/action/post';
import {
  setErrorStatus,
} from '../redux/action/app';
import {
  IUserPostResponseBody,
  IPostCommentsResponseBody,
} from '../interface/post';
import {
  API_ROUTES,
} from '../constants';

export const getUserPostsData = (
  userId: string,
  start: number,
  limit: number,
): ThunkAction<PromiseVoid, TAppState, {}, IPostAction> => async (d: Dispatch) => {
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

export const getCommentsByPostId = (
  postId: string,
): ThunkAction<PromiseVoid, TAppState, {}, IPostAction> => async (d: Dispatch) => {
  const config: HttpReqCfg = {
    method: 'GET',
  };

  try {
    d(setModalIsLoading(true));
    const url = API_ROUTES.getCommentsByPostId.replace('{postId}', postId);
    const res = await httpReq<IPostCommentsResponseBody[]>(url, config);

    d(setPostComments(res));
  } catch (err) {
    d(setErrorStatus(err.status));
  } finally {
    d(setModalIsLoading(false));
  }
};
