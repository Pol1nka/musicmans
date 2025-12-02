<template>
  <page-content
    title="Профиль"
    description="Управляйте своим аккаунтом и просматривайте историю платежей"
  >
    <div class="d-flex gap-24 jc-between">
      <profile-info-block
        title="Имя пользователя"
        description="Ваш логин в системе"
        :main-info-content="login"
      >
        <template #icon>
          <i class="bi bi-person icon" />
        </template>
      </profile-info-block>

      <profile-info-block
        title="Баланс токенов"
        description="Доступные токены для покупок"
        :main-info-content="countTokens"
      >
        <template #icon>
          <i class="bi bi-currency-exchange icon"></i>
        </template>

        <template #action>
          <div class="d-flex ai-center jc-end">
            <button
              class="submit-btn filled"
              @click="goToBuyTokens"
            >
              Купить токены →
            </button>
          </div>
        </template>
      </profile-info-block>

      <profile-info-block
        title="Вывод средств"
        description="Доступные средства для вывода"
        main-info-content="0"
      >
        <template #icon>
          <i class="bi bi-coin icon"></i>
        </template>

        <template #action>
          <div class="d-flex ai-center jc-end">
            <button
              class="submit-btn outline"
              @click="goToBuyTokens"
            >
              Вывести средства
            </button>
          </div>
        </template>
      </profile-info-block>
    </div>

    <payments-history-container />
  </page-content>
</template>

<script setup lang="ts">
import PageContent from "@/components/pageContent/PageContent.vue";
import ProfileInfoBlock from "@/components/profilePage/ProfileInfoBlock.vue";
import PaymentsHistoryContainer from "@/components/profilePage/PaymentsHistoryContainer.vue";

import { computed, onBeforeMount } from "vue";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user/store.ts";
import { pluralizeWithCount } from "@/utils/helpers.ts";

const userStore = useUserStore();
const { tokens, login } = storeToRefs(userStore);
const { getUserPayments } = userStore;

const countTokens = computed<string>(() =>
  pluralizeWithCount(tokens.value, ["токен", "токена", "токенов"]),
);

const goToBuyTokens = async () => {
  await router.push({ name: "plans" });
};

onBeforeMount(async () => {
  await getUserPayments();
});
</script>

<style scoped lang="scss">
.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(241px, 1fr));
  gap: 16px;
  width: 100%;
}

.icon {
  z-index: 123;
  font-size: 32px;
  color: var(--accent-color);
}

.submit-btn {
  flex: 1;

  height: 40px;
  border: none;
  border-radius: 10px;

  font-size: 16px;
  font-weight: 600;
  line-height: 22.5px;
  letter-spacing: normal;

  outline: none;

  transition: all 0.1s linear;

  &:active {
    opacity: 0.8;
  }

  &.filled {
    color: var(--dark-text);
    background-color: var(--accent-color);

    &:hover {
      color: white;
      background-color: var(--accent-light);
    }
  }

  &.outline {
    border: 1px solid var(--accent-color);
    color: var(--accent-color);
    background-color: transparent;
    transition: all 0.1s linear;

    &:hover {
      color: white;
      background: var(--accent-light);
    }
  }
}
</style>
