import {
  EPostAction,
  ISetPostIsLoading,
  ISetPostUserData,
  IPostState,
  IPostAction,
} from '../types/post';

const INITIAL_STATE: IPostState = {
  userPosts: [],
  isLoading: false,
};

const PostReducer = (state = INITIAL_STATE, action: IPostAction): IPostState => {
  switch (action.type) {
    case EPostAction.POST_SET_IS_LOADING: {
      const { isLoading } = action.payload as ISetPostIsLoading;
      return { ...state, isLoading };
    }
    case EPostAction.POST_SET_USER_POST: {
      const { userPosts } = action.payload as ISetPostUserData;
      return { ...state, userPosts };
    }
    case EPostAction.POST_RESET_STATE: {
      return INITIAL_STATE;
    }
    default: {
      return state;
    }
  }
};

export default PostReducer;
