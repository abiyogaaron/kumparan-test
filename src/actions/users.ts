import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { PromiseVoid } from '../interface';
import httpReq, { HttpReqCfg } from '../utils/httpRequest';
import { TAppState } from '../redux';
import {
  IUsersAction,
  TUsersData,
} from '../redux/types/users';
import {
  setUsersData,
  setIsLoading,
} from '../redux/action/users';
import {
  setErrorStatus,
} from '../redux/action/app';
import {
  IUsersResponseBody,
} from '../interface/users';
import {
  API_ROUTES,
} from '../constants';

export const getUsersData = (start: number, limit: number): ThunkAction<PromiseVoid, TAppState, {}, IUsersAction> => async (d: Dispatch) => {
  const config: HttpReqCfg = {
    method: 'GET',
  };

  try {
    d(setIsLoading(true));
    const url = `${API_ROUTES.getUsers}?_start=${start}&_limit=${limit}`;
    const res = await httpReq<IUsersResponseBody[]>(url, config);
    const parsedUsersData = parseUsersData(res);

    d(setUsersData(parsedUsersData));
  } catch (err) {
    d(setErrorStatus(err.status));
  } finally {
    d(setIsLoading(false));
  }
};

export const parseUsersData = (users: IUsersResponseBody[]) => users.map((item) => {
  const user: TUsersData = {
    id: item.id,
    name: item.name,
    username: item.username,
    email: item.email,
    address: item.address,
    phone: item.phone,
  };
  return user;
});
