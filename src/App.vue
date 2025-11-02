<script setup lang="ts">
import SideBar from "@/components/sideBar/SideBar.vue";
</script>

<template>
  <side-bar class="h-100 mh-100" />

  <router-view class="h-100 w-100 mh-100 p-48" />
</template>
