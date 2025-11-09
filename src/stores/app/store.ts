import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const currentPageName = ref<string>("home");

  const setCurrentActivePage = (toName: string) => {
    currentPageName.value = toName ?? "home";
  };

  return {
    currentPageName,

    setCurrentActivePage,
  };
});
