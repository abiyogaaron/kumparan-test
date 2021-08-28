export type PromiseVoid = Promise<void>;

export interface IErrorResponse {
  status: number;
}

export enum EStatusErrorCode {
  GENERAL_ERROR = 500,
  RATE_LIMITER = 429,
  NOT_FOUND = 404,
  // assumed and many others BE error code
}

export enum ELimitViewData {
  USERS = 5,
  USER_POST = 5,
  USER_ALBUM = 5,
}

// assumed FE know how many data from response BE, so we could implement SSR pagination
// cause its not recommended for counting data in FE side in real life.
export enum ECountDataAssumptions {
  USERS = 10,
  USER_POST = 10,
  USER_ALBUM = 10,
}
