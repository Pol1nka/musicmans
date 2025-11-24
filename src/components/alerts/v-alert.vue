<template>
  <transition name="alert">
    <div
      v-if="message"
      class="alert-wrapper"
    >
      <div
        class="alert d-flex ai-center gap-10 p-16"
        :class="alertClass"
      >
        <exclamation-circle-icon v-if="showIcon" />

        <span class="paragraph-sm flex-1">
          {{ message }}
        </span>

        <button
          class="close-alert button-tight"
          @click="$reset"
        >
          ОК
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from "vue";
import ExclamationCircleIcon from "@/assets/icons/ExclamationCircleIcon.vue";
import { storeToRefs } from "pinia";
import { useAlertsStore } from "@/stores/alerts/store.ts";

const alertStore = useAlertsStore();
const { message, statusCode } = storeToRefs(alertStore);
const { $reset } = alertStore;

// Определяем класс алерта на основе statusCode
const alertClass = computed(() => {
  const code = statusCode.value;

  // Успешные ответы (200-299)
  if (code >= 200 && code < 300) {
    return "alert-success";
  }

  // Ошибки клиента (400-499)
  if (code >= 400 && code < 500) {
    return "alert-error";
  }

  // Ошибки сервера (500+)
  if (code >= 500) {
    return "alert-error";
  }

  // По умолчанию error (для случаев, когда статус не установлен)
  return "alert-error";
});

// Показываем иконку для ошибок
const showIcon = computed(() => {
  const code = statusCode.value;
  return code >= 400 || code === 0;
});
</script>

<style scoped lang="scss">
.alert-wrapper {
  position: fixed;
  z-index: 9999;
  right: 20px;
  bottom: 20px;

  box-sizing: border-box;
  min-width: 300px;
  max-width: 400px;
}

.alert {
  box-sizing: border-box;
  border-radius: 20px;
  color: var(--primary-text);
  box-shadow: 0 4px 12px rgb(0 0 0 / 30%);
}

.alert-success {
  color: var(--dark-text);
  background-color: var(--accent-color);
}

.alert-error {
  background-color: var(--error);
}

.close-alert {
  cursor: pointer;

  padding: 8px 12px 10px;
  border: none;
  border-radius: 40px;

  color: var(--primary-text);

  background-color: rgb(255 255 255 / 20%);

  transition: background-color 0.2s;

  &:hover {
    background-color: rgb(255 255 255 / 30%);
  }
}

.alert-enter-active,
.alert-leave-active {
  transition: all 0.3s ease-in-out;
}

.alert-enter-from,
.alert-leave-to {
  transform: translateX(400px);
  opacity: 0;
}

.alert-enter-to,
.alert-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
