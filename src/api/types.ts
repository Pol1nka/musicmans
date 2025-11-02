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
  subscribe_status: true;
  uuid: string;
}
