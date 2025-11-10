<template>
  <div class="profile-info-block d-flex flex-column ai-center p-48 gap-24">
    <div class="d-flex flex-column ai-center gap-8">
      <p class="payment-title">Подтвердите покупку</p>

      <p class="info-desc">Вы выбрали пакет "{{ title }}"</p>
    </div>

    <div class="d-flex flex-column ai-center gap-16 flex-1 w-100">
      <div class="content d-flex jc-between flex-1 w-100 info-desc">
        <span>Токены</span>

        <span class="info-title">{{ tokens }}</span>
      </div>

      <div class="d-flex jc-between flex-1 w-100 info-desc">
        <p>Цена</p>

        <p class="info-title">{{ totalAmount }}</p>
      </div>
    </div>

    <div class="amount d-flex flex-column ai-center gap-16 flex-1 w-100">
      <div class="amount-text d-flex jc-between flex-1 w-100 info-desc">
        <p style="color: white">Итого</p>

        <p class="amount-title">{{ totalAmount }}</p>
      </div>
    </div>

    <div class="d-flex ai-center jc-end w-100">
      <button
        class="submit-btn filled"
        @click="setNewPayment()"
      >
        <i class="bi bi-credit-card" />
        Перейти к оплате
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { usePaymentStore } from "@/stores/payment/store.ts";
import { storeToRefs } from "pinia";
import { formatRubles } from "@/utils/helpers.ts";

const paymentStore = usePaymentStore();
const { amount, tokens, title } = storeToRefs(paymentStore);
const { setNewPayment } = paymentStore;

const totalAmount = computed(() => formatRubles(amount.value));
</script>

<style scoped lang="scss">
.profile-info-block {
  min-width: 600px;
  max-width: 800px;
  border: 1px solid rgb(38 45 54);
  border-radius: 16px;

  background-color: var(--search-color);
}

.icon-block {
  width: 65px;
  height: 65px;
  border-radius: 16px;
  background: linear-gradient(
    90deg,
    rgb(42 123 155 / 100%) 0%,
    rgb(87 199 133 / 100%) 100%,
    rgb(237 221 83 / 100%) 100%
  );
}

.content {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.icon {
  z-index: 123;
  color: var(--accent-light);
}

.price-title {
  margin: 0;

  font-size: 36px;
  font-weight: 700;
  line-height: 40px;
  color: white;
}

.info-title {
  margin: 0;

  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: white;
}

.amount-title {
  margin: 0;

  font-size: 20px;
  font-weight: 600;
  line-height: 28px;
  color: var(--accent-color);
}

.payment-title {
  margin: 0;

  font-size: 24px;
  font-weight: 600;
  line-height: 28px;
  color: white;
}

.info-desc {
  margin: 0;
  font-size: 18px;
  line-height: 20px;
  color: var(--light-text);
}

.submit-btn {
  flex: 1;

  height: 56px;
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

.amount {
  border-top: 1px solid rgb(141 151 165 / 25%);
}

.amount-text {
  margin-top: 10px;
}
</style>
