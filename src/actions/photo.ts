import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { PromiseVoid } from '../interface';
import httpReq, { HttpReqCfg } from '../utils/httpRequest';
import { TAppState } from '../redux';
import { IPhotoAction } from '../redux/types/photo';
import {
  setUserAlbumPhotos,
  setIsLoading,
} from '../redux/action/photo';
import {
  setErrorStatus,
} from '../redux/action/app';
import {
  IPhotosAlbumResponseBody,
} from '../interface/photo';
import {
  API_ROUTES,
} from '../constants';

export const getUserAlbumPhotos = (
  albumId: string,
  start: number,
  limit: number,
): ThunkAction<PromiseVoid, TAppState, {}, IPhotoAction> => async (d: Dispatch) => {
  const config: HttpReqCfg = {
    method: 'GET',
  };

  try {
    d(setIsLoading(true));
    const url = `${API_ROUTES.getPhotosByAlbumid}&_start=${start}&_limit=${limit}`.replace('{albumId}', albumId);
    const res = await httpReq<IPhotosAlbumResponseBody[]>(url, config);

    d(setUserAlbumPhotos(res));
  } catch (err) {
    d(setErrorStatus(err.status));
  } finally {
    d(setIsLoading(false));
  }
};
