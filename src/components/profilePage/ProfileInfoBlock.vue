<template>
  <div class="profile-info-block d-flex flex-column p-24 gap-24">
    <div class="icon-block d-flex ai-center jc-center">
      <slot
        class="icon"
        name="icon"
      />
    </div>

    <div class="d-flex flex-column gap-8">
      <p class="info-title">{{ title }}</p>

      <p class="info-desc">{{ description }}</p>
    </div>

    <p class="info-title">{{ mainInfoContent }}</p>

    <slot name="action" />
  </div>
</template>
<script setup lang="ts">
import type { IProps } from "./types.ts";

defineProps<IProps>();
</script>

<style scoped lang="scss">
.profile-info-block {
  min-width: 330px;
  max-width: 350px;
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

.icon {
  z-index: 123;
  color: var(--accent-light);
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
