<template>
  <div class="d-flex h-100 flex-column p-24 gap-8 sidebar">
    <div
      class="d-flex ai-center jc-center logo-container"
      @click="goToMainPage"
    >
      <logo-component />
    </div>

    <nav-chapter title="ОБЗОР" />

    <nav-item
      title="Обзор"
      route-name="home"
    >
      <i class="bi bi-house" />
    </nav-item>

    <nav-item
      title="Паки звуков"
      route-name="packs"
    >
      <i class="bi bi-box" />
    </nav-item>

    <!--    <nav-item-->
    <!--      title="Моя библиотека"-->
    <!--      route-name="library"-->
    <!--    >-->
    <!--      <i class="bi bi-journal-bookmark-fill" />-->
    <!--    </nav-item>-->

    <nav-item
      title="Загрузить"
      route-name="upload"
    >
      <i class="bi bi-upload" />
    </nav-item>

    <nav-item
      title="Мои звуки"
      route-name="purchased"
    >
      <i class="bi bi-music-note-beamed"></i>
    </nav-item>

    <nav-chapter title="ТОКЕНЫ" />

    <nav-item
      title="Токены"
      route-name="plans"
    >
      <i class="bi bi-currency-exchange" />
    </nav-item>

    <nav-chapter title="АККАУНТ" />

    <nav-item
      title="Аккаунт"
      route-name="profile"
    >
      <i class="bi bi-person-circle" />
    </nav-item>
  </div>
</template>

<script setup lang="ts">
import NavItem from "@/components/sideBar/NavItem.vue";
import NavChapter from "@/components/sideBar/NavChapter.vue";
import logoComponent from "@/assets/icons/logoStartIcon.vue";

import router from "@/router";

import type { ISideBar } from "@/components/sideBar/types.ts";

withDefaults(defineProps<ISideBar>(), {
  width: "350px",
});

const goToMainPage = async () => {
  await router.push({ name: "home" });
};
</script>
<style scoped>
.logo-container {
  cursor: pointer;
  width: v-bind(width);
  height: 100px;
  color: white;

  svg {
    fill: var(--accent-color);
  }
}

.sidebar {
  background-color: var(--sidebar-background);
}

@media screen and (width <= 1100px) {
  .logo-container {
    width: 250px;
  }
}
</style>
