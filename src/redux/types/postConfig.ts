export interface IPostForm {
  post_title: string;
  post_body: string;
  post_userId: string;
}

export enum EPostConfigAction {
  POST_CONFIG_SET_LOADING = 'POST_CONFIG_SET_LOADING',
  POST_CONFIG_SET_FORM = 'POST_CONFIG_SET_FORM',
  POST_CONFIG_SET_ERRORS = 'POST_CONFIG_SET_ERRORS',
  POST_CONFIG_SET_FORM_DEFAULT = 'POST_CONFIG_SET_FORM_DEFAULT',
  POST_CONFIG_RESET_STATE = 'POST_CONFIG_RESET_STATE',
}

export interface IPostConfigSetLoadingAction {
  isLoading: boolean;
}

export interface IPostConfigSetFormAction {
  form: IPostForm;
}

export interface IPostConfigSetFormDefaultAction {
  formDefault: IPostForm;
}

export interface IPostConfigSetErrorsAction {
  errors: { [key: string]: string };
}

export type TPostConfigAction =
  | IPostConfigSetLoadingAction
  | IPostConfigSetFormAction
  | IPostConfigSetErrorsAction
  | IPostConfigSetFormDefaultAction;

export interface IPostConfigAction {
  type: EPostConfigAction;
  payload: TPostConfigAction;
}

export interface IPostConfigState {
  isLoading: boolean;
  form: IPostForm;
  formDefault: IPostForm;
  errors: { [key: string]: string };
}
