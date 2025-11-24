import { ref, watch } from "vue";
import { defineStore } from "pinia";

export const useAlertsStore = defineStore("alerts", () => {
  const message = ref<string>("");
  const timeoutId = ref<number>(0);
  const statusCode = ref<number>(0);

  watch(message, (newValue) => {
    if (newValue) destroyAlert();
  });

  const $reset = () => {
    clearTimeout(timeoutId.value);
    timeoutId.value = 0;
    message.value = "";
  };

  const destroyAlert = () => {
    timeoutId.value = setTimeout($reset, 3500);
  };

  return {
    message,
    statusCode,

    $reset,
  };
});
