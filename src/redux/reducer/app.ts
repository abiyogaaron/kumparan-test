import {
  EAppAction,
  IAppSetSidebarVisible,
  IAppState,
  IAppActions,
} from '../types/app';

const INITIAL_STATE: IAppState = {
  isSidebarVisible: true,
};

const AppReducer = (state = INITIAL_STATE, action: IAppActions): IAppState => {
  switch (action.type) {
    case EAppAction.APP_SET_IS_SIDEBAR_VISIBLE: {
      const { isSidebarVisible } = action.payload as IAppSetSidebarVisible;
      return { ...state, isSidebarVisible };
    }
    default: {
      return state;
    }
  }
};

export default AppReducer;
