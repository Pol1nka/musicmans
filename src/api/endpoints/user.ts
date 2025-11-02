import { useAxios } from "@/api/useAxios.ts";

import type { AxiosInstance } from "axios";
import type { IUserProfile } from "@/api/types.ts";

export const userApi = (instance: AxiosInstance) => ({
  getUserProfile() {
    return useAxios<IUserProfile>(instance).post("profile/me");
  },
});
