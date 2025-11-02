import axios from "axios";
import { BASE_TIMEOUT } from "./constants.ts";
import { authApi } from "@/api/endpoints/auth.ts";
import { userApi } from "@/api/endpoints/user.ts";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: BASE_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

export const externalApi = {
  setAuthHeader(authToken: string, type = "Bearer") {
    if (!authToken) {
      delete instance.defaults.headers.common["Authorization"];
      return;
    }

    instance.defaults.headers.common["Authorization"] = `${type} ${authToken}`;
  },

  ...authApi(instance),
  ...userApi(instance),
};
