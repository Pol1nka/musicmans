<template>
  <div class="auth-container d-flex flex-column gap-24">
    <div class="auth-header d-flex flex-column gap-8">
      <h2>{{ title }}</h2>

      <p class="auth-desc dark-text">{{ description }}</p>
    </div>

    <div class="auth-form d-flex flex-column gap-24">
      <div class="d-flex flex-column gap-10">
        <ui-input
          id="login-auth"
          v-model="login"
          name="login"
          type="text"
          placeholder="Введите имя пользователя"
        >
          <person-icon class="left-icon" />
        </ui-input>
      </div>

      <div class="d-flex flex-column gap-10">
        <ui-input
          id="password-auth"
          v-model="password"
          name="password"
          type="password"
          placeholder="Введите пароль"
        >
          <lock-icon class="left-icon" />
        </ui-input>
      </div>
    </div>

    <button
      class="submit-btn filled"
      @click="authMethod"
    >
      {{ btnTextByAuthType }}
    </button>

    <div class="d-flex gap-8 jc-center mt-3">
      <span class="link-text select-none">{{ linkTextByAuthType }}</span>

      <router-link
        class="link"
        :to="{ name: `${linkPathName}` }"
        @click="reset()"
      >
        {{ linkByAuthType }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import PersonIcon from "@/assets/icons/PersonIcon.vue";
import LockIcon from "@/assets/icons/LockIcon.vue";
import UiInput from "@/ui/input/ui-input.vue";

import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores";
import { AUTH_TYPES } from "./constants.ts";

import type { IProps } from "./types.ts";

const props = defineProps<IProps>();

const authStore = useAuthStore();
const { login, password } = storeToRefs(authStore);
const { loginUser, registerUser, reset } = authStore;

const isRegister = computed(() => props.type === AUTH_TYPES.REGISTER);

const btnTextByAuthType = computed(() =>
  isRegister.value ? "Создать аккаунт →" : "Войти в аккаунт →",
);

const linkTextByAuthType = computed(() =>
  isRegister.value ? "Уже есть аккаунт?" : "Нет аккаунта?",
);

const linkByAuthType = computed(() => (isRegister.value ? "Войти" : "Зарегистрироваться"));

const linkPathName = computed(() => (isRegister.value ? "login" : "register"));

const authMethod = computed(() => (isRegister.value ? registerUser : loginUser));
</script>

<style scoped lang="scss">
.auth-header {
  margin-bottom: 8px;
}

.auth-container {
  box-sizing: border-box;
  min-width: 450px;
  padding: 40px;
  border-radius: 24px;

  background-color: rgb(38 49 64);
}

.auth-desc {
  font-size: 15px;
  color: var(--light-text);
}

.left-icon {
  cursor: pointer;

  position: absolute;
  left: 0;

  box-sizing: unset;
  width: 22px;
  height: 22px;
  padding: 18px 12px;

  color: var(--light-text);
}

.submit-btn {
  height: 56px;
  border: none;
  border-radius: 10px;

  font-size: 16px;
  font-weight: 600;
  line-height: 22.5px;
  letter-spacing: normal;

  outline: none;

  transition: all 0.05s linear;

  &:active {
    opacity: 0.8;
  }

  &.filled {
    color: var(--dark-text);
    background-color: var(--accent-color);
  }
}

.link-text {
  color: var(--light-text);

  &:hover {
    color: white;
  }
}

.link {
  border-bottom: 1px solid transparent;
  color: var(--accent-color);
  text-decoration: none;

  &:hover {
    border-bottom: 1px solid var(--accent-color);
  }
}
</style>
