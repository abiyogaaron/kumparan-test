import {
  IPostAction,
  EPostAction,
} from '../types/post';
import {
  IUserPostResponseBody,
} from '../../interface/post';

export const setIsLoading = (isLoading: boolean): IPostAction => ({
  type: EPostAction.POST_SET_IS_LOADING,
  payload: {
    isLoading,
  },
});

export const setUserPostData = (userPosts: IUserPostResponseBody[]): IPostAction => ({
  type: EPostAction.POST_SET_USER_POST,
  payload: {
    userPosts,
  },
});

export const resetState = () => ({
  type: EPostAction.POST_RESET_STATE,
});
