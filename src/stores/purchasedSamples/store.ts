import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { externalApi } from "@/api/api.ts";
import { usePurchasedSearchFilter } from "@/stores/purchasedSamples/helper.ts";

import type { PurchasedTrack } from "@/api/payment.ts";

export const usePurchasedSamplesStore = defineStore("PurchasedSamples", () => {
  //filters
  const genreFilter = ref<string>("");
  //purchasedSamples
  const purchasedSamples = ref<PurchasedTrack[]>([]);

  const {
    filters,
    filteredSamples: filteredPurchasedSamples,
    resetSearchFilters,
  } = usePurchasedSearchFilter(purchasedSamples);

  const { data, fetching: getPurchasedSamples } = externalApi.getPurchasedSamples();

  watch(data, (newValue) => {
    if (newValue) {
      purchasedSamples.value = newValue ?? [];
      console.log(purchasedSamples.value);
    }
  });

  const $resetFilters = () => {
    resetSearchFilters();
  };

  return {
    genreFilter,
    purchasedSamples,
    filters,
    filteredPurchasedSamples,

    getPurchasedSamples,
    $resetFilters,
  };
});
