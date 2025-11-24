import { ref } from "vue";
import { AxiosError } from "axios";
import { unwrapRefParams } from "./helper.ts";

import type { AxiosInstance, Method } from "axios";
import type { IOptions, TParamsObject } from "./types.ts";

export const useAxios = <T>(instance: AxiosInstance, options?: IOptions) => {
  const data = ref<T | null>(null);
  const isLoading = ref<boolean>(false);
  const isSuccess = ref<boolean>(false);
  const isError = ref<boolean>(false);
  const errorMessage = ref<string>("");

  const createFetch = (url: string, method: Uppercase<Method>, params?: TParamsObject) => {
    const methodAxios = ref<Method>(method);

    const fetching = async (body?: Partial<unknown>): Promise<void> => {
      isLoading.value = true;

      isSuccess.value = false;
      isError.value = false;
      errorMessage.value = "";
      try {
        const response = await instance(url, {
          method: methodAxios.value,
          ...(options?.customHeaders && { headers: options.customHeaders }),
          ...(body && { data: body }),
          ...(params && { params: unwrapRefParams(params) }),
          ...(options?.timeout && { timeout: options.timeout }),
        });
        data.value = response.data;
        isSuccess.value = true;
      } catch (error) {
        isError.value = true;
        if (error instanceof AxiosError) {
          // ошибка axios
          errorMessage.value = error.message;
          console.error("Произошла ошибка Axios:", error);
        } else if (error instanceof Error) {
          // стандартная ошибка
          errorMessage.value = error.message;
          console.error("Произошла ошибка:", error);
        } else {
          // непредвиденная ошибка
          errorMessage.value = "Произошла непредвиденная ошибка";
          console.error("Произошла непредвиденная ошибка:", error);
        }
      } finally {
        isLoading.value = false;
      }
    };

    return {
      data,
      isSuccess,
      isLoading,
      isError,
      errorMessage,
      fetching,
    };
  };

  const getFetch = (url: string, params?: TParamsObject) => createFetch(url, "GET", params);
  const postFetch = (url: string, params?: TParamsObject) => createFetch(url, "POST", params);
  const patchFetch = (url: string, params?: TParamsObject) => createFetch(url, "PATCH", params);
  const putFetch = (url: string, params?: TParamsObject) => createFetch(url, "PUT", params);
  const deleteFetch = (url: string, params?: TParamsObject) => createFetch(url, "DELETE", params);

  return {
    get: getFetch,
    post: postFetch,
    patch: patchFetch,
    put: putFetch,
    delete: deleteFetch,
  };
};
