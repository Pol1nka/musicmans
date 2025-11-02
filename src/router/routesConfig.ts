import HomePage from "@/pages/HomePage.vue";
import RegisterPage from "@/pages/auth/RegisterPage.vue";
import LoginPage from "@/pages/login/LoginPage.vue";

import type { RouteRecordRaw } from "vue-router";

export const routesConfig: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomePage,
    beforeEnter: async () => {},
  },
  {
    path: "/register",
    name: "register",
    component: RegisterPage,
    beforeEnter: async () => {},
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
    beforeEnter: async () => {},
  },
];
