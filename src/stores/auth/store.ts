import { ref } from "vue";
import router from "@/router";
import { defineStore } from "pinia";
import { externalApi } from "@/api/api.ts";
import { checkHasToken, clearToken, setUserToken } from "@/api/helper.ts";

export const useAuthStore = defineStore("auth", () => {
  const login = ref<string>("");
  const password = ref<string>("");

  const initializeApp = (token: string) => {
    setUserToken(token);
    externalApi.setAuthHeader(token);
  };

  const registerUser = async () => {
    console.log("registerUser");

    const { data, isSuccess, fetching } = externalApi.getUserRegister();
    try {
      await fetching({
        username: login.value,
        password: password.value,
      });
      if (isSuccess.value) {
        initializeApp(data.value?.token ?? "");
        await goToMainPage();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const loginUser = async () => {
    console.log("loginUser");

    const { data: userAuth, isSuccess: isAuth, fetching: getAuth } = externalApi.getUserAuth();
    try {
      await getAuth({
        username: login.value,
        password: password.value,
      });
      if (isAuth.value) {
        initializeApp(userAuth.value?.token ?? "");
        await goToMainPage();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const goToMainPage = async () => {
    if (checkHasToken()) {
      await router.push({ name: "home" });
    }
  };

  const reset = (): void => {
    login.value = "";
    password.value = "";
  };

  const leaveAccount = () => {
    reset();
    clearToken();
    window.location.reload();
  };

  return {
    login,
    password,

    loginUser,
    registerUser,
    reset,
    initializeApp,
    leaveAccount,
  };
});
