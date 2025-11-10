<template>
  <page-content
    title="Купить токены"
    description="Выберите подходящий пакет токенов для доступа к премиум семплам и эксклюзивному контенту"
    class="jc-center"
  >
    <div class="d-flex gap-24 jc-between">
      <plan-block :plan="PLANS_TEMPLATE.INITIAL">
        <i class="bi bi-star icon" />
      </plan-block>

      <plan-block :plan="PLANS_TEMPLATE.MEDIUM">
        <i class="bi bi-lightning-charge icon" />
      </plan-block>

      <plan-block :plan="PLANS_TEMPLATE.MAXIMUM">
        <i class="bi bi-capslock icon" />
      </plan-block>
    </div>

    <div class="d-flex jc-center w-100">
      <payment-block />
    </div>
  </page-content>
</template>

<script setup lang="ts">
import PageContent from "@/components/pageContent/PageContent.vue";
import PlanBlock from "@/components/payment/PlanBlock.vue";

import { PLANS_TEMPLATE } from "@/stores/payment/constants.ts";
import PaymentBlock from "@/components/payment/PaymentBlock.vue";
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
}
</style>
