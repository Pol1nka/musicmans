import HomePage from "@/pages/HomePage.vue";
import RegisterPage from "@/pages/auth/RegisterPage.vue";
import LoginPage from "@/pages/login/LoginPage.vue";
import PackPage from "@/pages/pack/PackPage.vue";
import AllPacksPage from "@/pages/allPacks/AllPacksPage.vue";
import ProfilePage from "@/pages/profile/ProfilePage.vue";
import BuyTokenPage from "@/pages/payment/BuyTokenPage.vue";
import PurchasedSamplesPage from "@/pages/purchased/PurchasedSamplesPage.vue";

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
  {
    path: "/packs",
    name: "packs",
    component: AllPacksPage,
    beforeEnter: async () => {},
  },
  {
    path: "/pack/:id",
    name: "pack",
    component: PackPage,
    beforeEnter: async () => {},
  },
  {
    path: "/profile",
    name: "profile",
    component: ProfilePage,
    beforeEnter: async () => {},
  },
  {
    path: "/plans",
    name: "plans",
    component: BuyTokenPage,
    beforeEnter: async () => {},
  },
  {
    path: "/purchased",
    name: "purchased",
    component: PurchasedSamplesPage,
    beforeEnter: async () => {},
  },
];
