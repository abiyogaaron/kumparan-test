import {
  EAppAction,
  IAppActions,
} from '../types/app';

export const setSidebarVisible = (isSidebarVisible: boolean): IAppActions => ({
  type: EAppAction.APP_SET_IS_SIDEBAR_VISIBLE,
  payload: {
    isSidebarVisible,
  },
});
