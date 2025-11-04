<template>
  <page-content
    title="Откройте Удивительные Семплы"
    description="Профессиональные музыкальные семплы для продюсеров и создателей"
  >
    <search-panel />

    <div class="cards-container">
      <sample-card-main
        v-for="sample in filteredSamples"
        :key="sample.id"
        :sample
      />
    </div>
  </page-content>
</template>
<script setup lang="ts">
import SearchPanel from "@/components/homePage/searchBar/SearchPanel.vue";
import { useSamplesStore } from "@/stores/samples/store.ts";
import { onBeforeMount } from "vue";
import PageContent from "@/components/pageContent/PageContent.vue";
import { storeToRefs } from "pinia";
import SampleCardMain from "@/components/homePage/sampleCards/SampleCardMain.vue";

const samplesStore = useSamplesStore();
const { filteredSamples } = storeToRefs(samplesStore);
const { getSamples } = samplesStore;

onBeforeMount(async () => {
  await getSamples();
});
</script>

<style scoped lang="scss">
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
