<template>
  <div
    class="d-flex nav-item ai-center gap-16"
    @click="leaveAccount"
  >
    <div class="nav-icon">
      <slot />
    </div>

    <span class="title-md">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores";

interface IProps {
  title: string;
}

defineProps<IProps>();

const authStore = useAuthStore();
const { leaveAccount } = authStore;
</script>

<style scoped lang="scss">
.nav-item {
  padding: 15px 25px;
  border-radius: 15px;
  color: #ff7b99ff;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    cursor: pointer;
    color: var(--dark-text);
    background: #ff7b99;
  }

  &.active {
    cursor: pointer;
    color: var(--dark-text);
    background: #ffa9be;
  }
}

.nav-icon {
  font-size: 24px;
}
</style>
