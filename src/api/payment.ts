import { useAxios } from "@/api/useAxios.ts";

import type { AxiosInstance } from "axios";

export const paymentApi = (instance: AxiosInstance) => ({
  setNewPayment() {
    return useAxios<string>(instance).post("payments/new");
  },
});
