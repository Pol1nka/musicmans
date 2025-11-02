import { ref } from "vue";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", () => {
  const currentPageName = ref<string>("home");

  return {
    currentPageName,
  };
});
