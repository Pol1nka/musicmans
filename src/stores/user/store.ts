import { ref } from "vue";
import { defineStore } from "pinia";
import { externalApi } from "@/api/api.ts";

import type { IUserData, IUserPayment } from "@/stores/user/types.ts";

export const useUserStore = defineStore("user", () => {
  const login = ref<string>("");
  const uuid = ref<string>("");
  const tokens = ref<number>(0);

  const userPayments = ref<IUserPayment[]>([]);

  const { data, isSuccess, fetching } = externalApi.getUserProfile();
  const {
    data: payments,
    isSuccess: isPayments,
    fetching: getPayments,
  } = externalApi.getUserPaymentsHistory();

  const setUserData = (userData: IUserData) => {
    login.value = userData.login;
    uuid.value = userData.uuid;
    tokens.value = userData.tokens;
  };

  const getUserInfo = async () => {
    await fetching();
    if (isSuccess.value && data.value) {
      setUserData(data.value);
    }
  };

  const getUserPayments = async () => {
    await getPayments();
    if (isPayments.value) {
      userPayments.value = payments.value ?? [];
    }
  };

  return {
    login,
    uuid,
    tokens,
    userPayments,

    setUserData,
    getUserInfo,
    getUserPayments,
  };
});
