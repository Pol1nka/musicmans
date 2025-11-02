<template>
  <div class="d-flex h-100 flex-column p-24 gap-8 sidebar">
    <div class="d-flex ai-center jc-center logo-container">Тут будет логотип :)</div>

    <nav-chapter title="ОБЗОР" />

    <nav-item
      title="Обзор"
      route-name="home"
    >
      <i class="bi bi-house" />
    </nav-item>

    <nav-item
      title="Моя библиотека"
      route-name="library"
    >
      <i class="bi bi-journal-bookmark-fill" />
    </nav-item>

    <nav-item
      title="Загрузить"
      route-name="upload"
    >
      <i class="bi bi-upload" />
    </nav-item>

    <nav-chapter title="АККАУНТ" />

    <nav-item
      title="Настройки"
      route-name="settings"
    >
      <i class="bi bi-gear" />
    </nav-item>

    <nav-item
      title="Аккаунт"
      route-name="account"
    >
      <i class="bi bi-person-circle" />
    </nav-item>
  </div>
</template>

<script setup lang="ts">
import NavItem from "@/components/sideBar/NavItem.vue";
import NavChapter from "@/components/sideBar/NavChapter.vue";
import type { ISideBar } from "@/components/sideBar/types.ts";

withDefaults(defineProps<ISideBar>(), {
  width: "350px",
});
</script>
<style scoped>
.logo-container {
  width: v-bind(width);
  height: 100px;
  background: rgb(255 255 255 / 20%);
}

.sidebar {
  background-color: var(--sidebar-background);
}
</style>
