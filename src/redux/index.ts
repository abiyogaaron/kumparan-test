import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import logger from 'redux-logger';

import { IAppActions } from './types/app';
import { IUsersAction } from './types/users';
import { IPostAction } from './types/post';
import { IAlbumAction } from './types/album';
import { IPhotoAction } from './types/photo';

import AppReducer from './reducer/app';
import UserReducer from './reducer/users';
import PostReducer from './reducer/post';
import AlbumReducer from './reducer/album';
import PhotoReducer from './reducer/photo';

const rootReducer = combineReducers({
  app: AppReducer,
  users: UserReducer,
  post: PostReducer,
  album: AlbumReducer,
  photo: PhotoReducer,
});

export type TAppState = ReturnType<typeof rootReducer>;
type TAppActions =
  | IAppActions
  | IUsersAction
  | IPostAction
  | IAlbumAction
  | IPhotoAction;

let composeEnhancer = compose;
if (process.env.NODE_ENV !== 'production') {
  composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const store = createStore(
  rootReducer,
  composeEnhancer(
    applyMiddleware(thunk as ThunkMiddleware<TAppState, TAppActions>, logger),
  ),
);

export default store;
