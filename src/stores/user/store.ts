import { ref } from "vue";
import { defineStore } from "pinia";
import type { IUserData } from "@/stores/user/types.ts";
import { externalApi } from "@/api/api.ts";

export const useUserStore = defineStore("user", () => {
  const login = ref<string>("");
  const uuid = ref<string>("");
  const subscribeStatus = ref<boolean>(false);

  const { data, isSuccess, fetching } = externalApi.getUserProfile();

  const setUserData = (userData: IUserData) => {
    login.value = userData.login;
    uuid.value = userData.uuid;
    subscribeStatus.value = userData.subscribe_status;
  };

  const getUserInfo = async () => {
    await fetching();
    if (isSuccess.value && data.value) {
      setUserData(data.value);
    }
  };

  return {
    login,
    uuid,
    subscribeStatus,

    setUserData,
    getUserInfo,
  };
});
