import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { externalApi } from "@/api/api.ts";

import type { IPacks } from "@/stores/packs/types.ts";
import { usePacksFilter } from "@/composables/searchFilters/packsFilters.ts";

export const usePacksStore = defineStore("packs", () => {
  // packs
  const packs = ref<IPacks[]>([]);

  const { filters, filteredPacks, resetSearchFilters } = usePacksFilter(packs);

  const { data, fetching: getAllPacks } = externalApi.getAllPacks();

  watch(data, (newValue) => {
    if (newValue) {
      packs.value = newValue ?? [];
    }
  });

  const $resetFilters = () => {
    resetSearchFilters();
  };

  return {
    packs,
    filters,
    filteredPacks,

    getAllPacks,
    $resetFilters,
  };
});
