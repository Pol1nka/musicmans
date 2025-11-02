import { unref } from "vue";

import type { TParamsObject } from "./types.ts";

export const unwrapRefParams = (params?: TParamsObject): Record<string, unknown> =>
  params
    ? Object.fromEntries(Object.entries(params).map(([key, value]) => [key, unref(value)]))
    : {};

export const setUserToken = (token: string): void => {
  if (!token) return;
  localStorage.setItem("token", JSON.stringify(token));
  console.log("токен установлен в хранилище");
};

export const checkHasToken = (): boolean => {
  return !!localStorage.getItem("token");
};

export const clearToken = (): void => {
  localStorage.removeItem("token");
};
