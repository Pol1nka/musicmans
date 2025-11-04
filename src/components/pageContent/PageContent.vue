<template>
  <div class="page-container d-flex jc-center p-48">
    <div class="page-content d-flex flex-1 flex-column gap-24">
      <div class="page-header d-flex flex-column gap-8">
        <h1>{{ title }}</h1>

        <p class="desc">
          {{ description }}
        </p>
      </div>

      <slot class="page-content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IProps } from "./types.ts";

defineProps<IProps>();
</script>

<style scoped lang="scss">
.desc {
  font-size: 18px;
  line-height: 18px;
  color: rgb(143 151 163);
}

.page-content {
  max-width: 1200px;
}
</style>
