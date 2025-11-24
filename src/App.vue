<template>
  <side-bar
    class="h-100 mh-100"
    width="300px"
  />

  <router-view class="h-100 w-100 mh-100" />

  <global-audio-player-main />

  <v-alert />
</template>

<script setup lang="ts">
import SideBar from "@/components/sideBar/SideBar.vue";
import GlobalAudioPlayerMain from "@/components/globalPlayer/GlobalAudioPlayerMain.vue";
import VAlert from "@/components/alerts/v-alert.vue";
</script>
