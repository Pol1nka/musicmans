<!-- pages/AlbumPage.vue -->
<template>
  <page-content
    title="Информация об альбоме"
    description=" "
  >
    <purchased-samples-table />
  </page-content>
</template>

<script setup lang="ts">
import PageContent from "@/components/pageContent/PageContent.vue";
import PurchasedSamplesTable from "@/components/purchased/purchasedSamplesTable.vue";

import { onMounted } from "vue";
import { usePurchasedSamplesStore } from "@/stores/purchasedSamples/store.ts";

const purchasedStore = usePurchasedSamplesStore();
const { getPurchasedSamples } = purchasedStore;

onMounted(async () => {
  await getPurchasedSamples();
});
</script>

<style scoped lang="scss">
.album-header {
  padding: 24px 0;
  border-radius: 12px;
  background: rgb(30 41 59 / 50%);
}

.album-cover {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 200px;
  height: 200px;
  border-radius: 12px;

  background: rgb(51 65 85 / 50%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.cover-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  color: rgb(143 151 163);

  svg {
    width: 50px;
    height: 50px;
  }
}

.album-info {
  flex: 1;
}

.album-title {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: white;
}

.album-artist {
  margin: 0;
  font-size: 18px;
  color: rgb(143 151 163);
}

.album-meta {
  font-size: 14px;
  color: rgb(143 151 163);
}

.play-all-btn {
  cursor: pointer;

  display: flex;
  gap: 8px;
  align-items: center;

  width: fit-content;
  padding: 12px 24px;
  border: none;
  border-radius: 24px;

  font-size: 16px;
  font-weight: 500;
  color: #0f172a;

  background: var(--accent-color);

  transition: all 0.1s;

  &:hover {
    transform: scale(1.01);
    opacity: 0.9;
  }

  svg {
    fill: none;
  }
}
</style>
