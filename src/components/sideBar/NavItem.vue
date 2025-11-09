<template>
  <div
    class="d-flex nav-item ai-center gap-16"
    :class="{ active: isActiveTab }"
    @click="goToNeedPage"
  >
    <div class="nav-icon">
      <slot />
    </div>

    <span class="title-md">{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";

import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/stores/app/store.ts";

import type { INavItem } from "@/components/sideBar/types.ts";

const props = defineProps<INavItem>();

const appStore = useAppStore();
const { currentPageName } = storeToRefs(appStore);

const goToNeedPage = (): void => {
  router.push({ name: props.routeName });
  currentPageName.value = props.routeName;
};

const isActiveTab = computed<boolean>(() => currentPageName.value === props.routeName);
</script>

<style scoped lang="scss">
.nav-item {
  padding: 15px 25px;
  border-radius: 15px;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    cursor: pointer;
    color: var(--dark-text);
    background: var(--primary-text);
  }

  &.active {
    cursor: pointer;
    color: var(--dark-text);
    background: var(--primary-text);
  }
}

.nav-icon {
  font-size: 24px;
}
</style>
