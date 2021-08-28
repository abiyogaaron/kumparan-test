import { IUserPostResponseBody } from '../../interface/post';

export enum EPostAction {
  POST_SET_IS_LOADING = 'POST_SET_IS_LOADING',
  POST_SET_USER_POST = 'POST_SET_USER_POST',
  POST_RESET_STATE = 'POST_RESET_STATE',
}

export interface ISetPostIsLoading {
  isLoading: boolean;
}

export interface ISetPostUserData {
  userPosts: IUserPostResponseBody[];
}

export type TPostAction =
  | ISetPostIsLoading
  | ISetPostUserData;

export interface IPostAction {
  type: EPostAction;
  payload: TPostAction;
}

export interface IPostState {
  userPosts: IUserPostResponseBody[];
  isLoading: boolean;
}
