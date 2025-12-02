<template>
  <div class="profile-info-block ai-center d-flex p-24 gap-16">
    <!--    иконка-->
    <div class="icon-block d-flex ai-center jc-center">
      <i class="bi bi-currency-exchange icon"></i>
    </div>
    <!--Подробности-->
    <div class="d-flex flex-column gap-10 flex-1">
      <p class="payment-title">{{ payment.description }}</p>

      <p class="info-desc">{{ createdDate }}</p>
    </div>

    <!--  Стоимость и статус   -->
    <div class="d-flex flex-column gap-10 ai-end">
      <p class="payment-title">{{ payment.amount / 100 }} {{ ACTUAL_CURRENCY }}</p>

      <genre-tag
        class="payment-status"
        :text-genre="payment.payment_status"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import GenreTag from "@/components/homePage/sampleCards/GenreTag.vue";

import { computed } from "vue";
import { formatDate } from "@/utils/helpers.ts";
import { ACTUAL_CURRENCY } from "@/stores/app/constants.ts";

import type { IPaymentRowProps } from "./types.ts";

const props = defineProps<IPaymentRowProps>();

const createdDate = computed(() => formatDate(props.payment.created_at));
</script>

<style scoped lang="scss">
.profile-info-block {
  border: 1px solid rgb(52 60 85);
  border-radius: 16px;
  background-color: var(--search-color);
  transition: all 0.15s ease-in-out;

  &:hover {
    border: 1px solid var(--accent-color);
  }
}

.icon-block {
  width: 48px;
  height: 48px;
  border-radius: 16px;
  background-color: var(--accent-light);
}

.icon {
  z-index: 123;
  font-size: 24px;
  color: var(--accent-color);
}

.info-title {
  margin: 0;

  font-size: 24px;
  font-weight: 600;
  line-height: 20px;
  color: white;
}

.payment-title {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
}

.info-desc {
  margin: 0;
  font-size: 14px;
  color: var(--light-text);
}

.payment-status {
  color: var(--accent-color) !important;
  background-color: var(--accent-light) !important;
}
</style>
