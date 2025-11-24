<template>
  <div
    class="profile-info-block d-flex flex-column ai-center p-24 gap-24"
    :class="{ active: isSelected }"
    @click="setPlan(plan)"
  >
    <div class="icon-block d-flex ai-center jc-center">
      <slot class="icon" />
    </div>

    <div class="d-flex flex-column ai-center gap-8">
      <p class="info-title">{{ plan.title }}</p>

      <p class="price-title">{{ totalAmount }}</p>
    </div>

    <p class="info-desc">{{ plan.tokens }} токенов</p>

    <div class="d-flex ai-center jc-end w-100">
      <button
        class="submit-btn filled"
        :class="{ active: isSelected }"
      >
        {{ btnText }}
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { IProps } from "./types.ts";
import { computed } from "vue";
import { usePaymentStore } from "@/stores/payment/store.ts";
import { storeToRefs } from "pinia";
import { formatRubles } from "@/utils/helpers.ts";

const props = defineProps<IProps>();

const paymentStore = usePaymentStore();
const { currentSelectedPlan } = storeToRefs(paymentStore);
const { setPlan } = paymentStore;

const isSelected = computed(() => props.plan.title === currentSelectedPlan.value.title);

const btnText = computed(() => (isSelected.value ? "Выбрано" : "Выбрать"));

const totalAmount = computed(() => formatRubles(props.plan.amount));
</script>

<style scoped lang="scss">
.profile-info-block {
  cursor: pointer;

  min-width: 400px;
  max-width: 500px;
  border: 1px solid rgb(38 45 54);
  border-radius: 16px;

  background-color: var(--search-color);

  &.active {
    border: 1px solid var(--accent-color);
  }
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

.info-desc {
  margin: 0;
  font-size: 18px;
  line-height: 20px;
  color: var(--light-text);
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
    background-color: var(--accent-light);

    &.active {
      background-color: var(--accent-color);
    }

    &:hover {
      color: white;
      background-color: var(--accent-light);
    }
  }
}

@media (width <=1700px) {
  .profile-info-block {
    min-width: 330px;
    max-width: 500px;
    border: 1px solid rgb(38 45 54);
    border-radius: 16px;

    background-color: var(--search-color);

    &.active {
      border: 1px solid var(--accent-color);
    }
  }
}

@media (width <=1500px) {
  .profile-info-block {
    min-width: 300px;
    max-width: 500px;
    border: 1px solid rgb(38 45 54);
    border-radius: 16px;

    background-color: var(--search-color);

    &.active {
      border: 1px solid var(--accent-color);
    }
  }
}

@media (width <=1350px) {
  .profile-info-block {
    min-width: 250px;
    max-width: 500px;
    border: 1px solid rgb(38 45 54);
    border-radius: 16px;

    background-color: var(--search-color);

    &.active {
      border: 1px solid var(--accent-color);
    }
  }
}
</style>
