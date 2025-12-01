import type { Ref } from "vue";
import type { RawAxiosRequestHeaders } from "axios";

export type TMaybeRef<T> = T | Ref<T>;

export type TParamsObject = Record<string, TMaybeRef<unknown>>;

export interface IOptions {
  customHeaders?: RawAxiosRequestHeaders;
  timeout?: number;
}

export interface IToken {
  token: string;
}

export interface IUserProfile {
  login: string;
  tokens: number;
  uuid: string;
}

export interface INewPayment {
  amount: number;
  return_uri: string;
}

export interface IDownloadUrl {
  download_url: string;
}

export interface IUuid {
  uuid: string;
}
