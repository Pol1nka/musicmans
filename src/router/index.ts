import { createRouter, createWebHistory } from "vue-router";
import { routesConfig } from "./routesConfig.ts";
import { isAppInitialize } from "@/router/hooks.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routesConfig,
});

const beforeEachHooks = [isAppInitialize];

beforeEachHooks.forEach((hook) => {
  router.beforeEach(hook);
});

export default router;
