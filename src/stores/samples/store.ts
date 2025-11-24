import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { externalApi } from "@/api/api.ts";
import { useAudioPlayer } from "@/composables/audioPlayer/audioPlayer.ts";

import type { ISampleTile } from "@/stores/samples/types.ts";
import { useSearchFilter } from "@/composables/searchFilters/searchFilter.ts";

export const useSamplesStore = defineStore("samples", () => {
  const { setPlaylist } = useAudioPlayer();

  //filters
  const genreFilter = ref<string>("");
  //samples
  const samples = ref<ISampleTile[]>([]);

  const { filters, filteredSamples, resetSearchFilters } = useSearchFilter(samples);

  const { data, fetching: getSamples } = externalApi.getAllSamples();

  watch(data, (newValue) => {
    if (newValue) {
      samples.value = newValue ?? [];
      console.log(samples.value);
      setPlaylist(samples.value);
    }

    setPlaylist(samples.value);
  });

  const $resetFilters = () => {
    resetSearchFilters();
  };

  return {
    genreFilter,
    samples,
    filters,
    filteredSamples,

    getSamples,
    $resetFilters,
  };
});
