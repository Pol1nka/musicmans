<!-- components/common/SortIcon.vue -->
<template>
  <svg
    v-if="direction"
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    :class="{ 'rotate-180': direction === 'desc' }"
  >
    <polyline points="18 15 12 9 6 15" />
  </svg>
</template>

<script setup lang="ts">
interface Props {
  direction: "asc" | "desc" | null;
}

defineProps<Props>();
</script>

<style scoped>
svg {
  transition: transform 0.2s;
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
