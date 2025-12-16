import { ref } from "vue";
import { AxiosError } from "axios";
import { storeToRefs } from "pinia";
import { unwrapRefParams } from "./helper.ts";
import { useAlertsStore } from "@/stores/alerts/store.ts";

import type { AxiosInstance, Method } from "axios";
import type { IOptions, TParamsObject } from "./types.ts";

type TArgumentUrl = string | (() => string);

export const useAxios = <T>(instance: AxiosInstance, options?: IOptions) => {
  const alertStore = useAlertsStore();
  const { message, statusCode } = storeToRefs(alertStore);

  const data = ref<T | null>(null);
  const isLoading = ref<boolean>(false);
  const isSuccess = ref<boolean>(false);
  const isError = ref<boolean>(false);
  const errorMessage = ref<string>("");

  const createFetch = (url: TArgumentUrl, method: Uppercase<Method>, params?: TParamsObject) => {
    const methodAxios = ref<Method>(method);

    const fetching = async (body?: Partial<unknown>): Promise<void> => {
      isLoading.value = true;

      isSuccess.value = false;
      isError.value = false;
      errorMessage.value = "";
      try {
        const resolvedUrl = typeof url === "function" ? url() : url;
        const response = await instance(resolvedUrl, {
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
          if (!message.value) {
            message.value = error.response?.data?.message ?? error.response?.data?.error;
            statusCode.value = error.status ?? 500;
          }
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

  const getFetch = (url: TArgumentUrl, params?: TParamsObject) => createFetch(url, "GET", params);
  const postFetch = (url: TArgumentUrl, params?: TParamsObject) => createFetch(url, "POST", params);
  const patchFetch = (url: TArgumentUrl, params?: TParamsObject) =>
    createFetch(url, "PATCH", params);
  const putFetch = (url: TArgumentUrl, params?: TParamsObject) => createFetch(url, "PUT", params);
  const deleteFetch = (url: TArgumentUrl, params?: TParamsObject) =>
    createFetch(url, "DELETE", params);

  return {
    get: getFetch,
    post: postFetch,
    patch: patchFetch,
    put: putFetch,
    delete: deleteFetch,
  };
};
