import { checkHasToken, clearToken } from "@/api/helper.ts";
import router from "@/router/index.ts";
import { useUserStore } from "@/stores/user/store.ts";

const publicPaths = ["login", "register"];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAppInitialize = async (to: any, _: any, next: any) => {
  const userStore = useUserStore();
  const isPublicRoute = publicPaths.includes(to.name);
  const hasToken = checkHasToken();

  if (isPublicRoute) {
    next();
    return;
  }

  if (hasToken) {
    await userStore.getUserInfo();
    next();
  } else {
    clearToken();
    next({ name: "login" });
  }
};

export const logOut = async () => {
  clearToken();
  await router.push({ name: "login" });
};
