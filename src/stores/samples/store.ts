import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { externalApi } from "@/api/api.ts";

import type { ISampleTile } from "types.ts";

export const useSamplesStore = defineStore("samples", () => {
  //filters
  const genreFilter = ref<string>("");
  //samples
  const samples = ref<ISampleTile[]>([]);

  const { data, fetching: getSamples } = externalApi.getAllSamples();

  watch(data, (newValue) => {
    if (newValue) {
      samples.value = newValue ?? [];
    }
  });

  const $resetFilters = () => {
    genreFilter.value = "";
  };

  return {
    genreFilter,
    samples,

    getSamples,
    $resetFilters,
  };
});
