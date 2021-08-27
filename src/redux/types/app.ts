export enum EAppAction {
  APP_SET_IS_SIDEBAR_VISIBLE = 'APP_SET_IS_SIDEBAR_VISIBLE'
}

export interface IAppSetSidebarVisible {
  isSidebarVisible: boolean;
}

export type TAppPayload =
  | IAppSetSidebarVisible;

export interface IAppActions {
  type: EAppAction;
  payload: TAppPayload;
}

export interface IAppState {
  isSidebarVisible: boolean;
}
