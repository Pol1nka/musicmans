<template>
  <div class="payments-block d-flex flex-column p-24 gap-16">
    <div class="d-flex flex-column gap-8">
      <p class="info-title">История платежей</p>

      <p class="info-desc">Все ваши транзакции и покупки токенов</p>
    </div>

    <div class="d-flex flex-column gap-10">
      <payment-row
        v-for="paymentPart in userPayments"
        :key="paymentPart.id"
        :payment="paymentPart"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import PaymentRow from "@/components/profilePage/PaymentRow.vue";
import { useUserStore } from "@/stores/user/store.ts";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { userPayments } = storeToRefs(userStore);
</script>

<style scoped lang="scss">
.payments-block {
  border: 1px solid rgb(38 45 54);
  border-radius: 16px;
  background-color: var(--search-color);
}

.info-title {
  margin: 0;

  font-size: 24px;
  font-weight: 600;
  line-height: 20px;
  color: white;
}

.info-desc {
  margin: 0;
  font-size: 14px;
  color: var(--light-text);
}
</style>
