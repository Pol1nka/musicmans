<template>
  <div class="d-flex ai-center chapter-container text-left">
    <span class="label-md">
      {{ title }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { INavChapter } from "@/components/sideBar/types.ts";

defineProps<INavChapter>();
</script>

<style scoped lang="scss">
.chapter-container {
  padding: 10px 0;
  color: #63676b;
}
</style>
