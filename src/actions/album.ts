import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { PromiseVoid } from '../interface';
import httpReq, { HttpReqCfg } from '../utils/httpRequest';
import { TAppState } from '../redux';
import { IAlbumAction } from '../redux/types/album';
import {
  setUserAlbumData,
  setIsLoading,
} from '../redux/action/album';
import {
  setErrorStatus,
} from '../redux/action/app';
import {
  IUserAlbumsResponseBody,
} from '../interface/album';
import {
  API_ROUTES,
} from '../constants';

export const getUserAlbumData = (
  userId: string,
  start: number,
  limit: number,
): ThunkAction<PromiseVoid, TAppState, {}, IAlbumAction> => async (d: Dispatch) => {
  const config: HttpReqCfg = {
    method: 'GET',
  };
  try {
    d(setIsLoading(true));
    const url = `${API_ROUTES.getAlbumByUserId}&_start=${start}&_limit=${limit}`.replace('{userId}', userId);
    const res = await httpReq<IUserAlbumsResponseBody[]>(url, config);

    d(setUserAlbumData(res));
  } catch (err) {
    d(setErrorStatus(err.status));
  } finally {
    d(setIsLoading(false));
  }
};
