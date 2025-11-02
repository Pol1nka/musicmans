import { useAxios } from "@/api/useAxios.ts";

import type { AxiosInstance } from "axios";
import type { IToken } from "@/api/types.ts";

export const authApi = (instance: AxiosInstance) => ({
  getUserAuth() {
    return useAxios<IToken>(instance).post("auth/sign-in");
  },
  getUserRegister() {
    return useAxios<IToken>(instance).post("auth/sign-up");
  },
});
