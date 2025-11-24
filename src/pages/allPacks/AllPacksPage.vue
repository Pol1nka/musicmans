<template>
  <page-content
    title="Популярные паки"
    description="Профессиональные музыкальные семплы для продюсеров и создателей"
  >
    <search-packs-panel />

    <div
      v-if="filteredPacks.length"
      class="cards-container"
    >
      <pack-card
        v-for="pack in filteredPacks"
        :key="pack.id"
        :pack
      />
    </div>

    <div
      v-else
      class="empty-payment d-flex flex-column jc-center ai-center p-24"
    >
      <i class="bi bi-clipboard2" />

      <span class="empty-text"> Список паков пуст </span>
    </div>
  </page-content>
</template>

<script setup lang="ts">
import SearchPacksPanel from "@/components/allPacksPage/SearchPacksPanel.vue";
import PageContent from "@/components/pageContent/PageContent.vue";
import PackCard from "@/components/allPacksPage/PackCard.vue";

import { onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { usePacksStore } from "@/stores/packs/store.ts";

const packsStore = usePacksStore();
const { filteredPacks } = storeToRefs(packsStore);
const { getAllPacks } = packsStore;

onBeforeMount(async () => {
  await getAllPacks();
});
</script>

<style scoped lang="scss">
.empty-payment {
  font-size: 64px;
  color: white;
}

.empty-text {
  font-size: 24px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(241px, 1fr));
  gap: 16px;
  width: 100%;
}

@media (width >= 1450px) {
  .cards-container {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (width >= 1200px) and (width <= 1450px) {
  .cards-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (width >= 895px) and (width <= 1200px) {
  .cards-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (width <= 895px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style>
