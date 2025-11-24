import { computed, type Ref, ref } from "vue";

import type { ISampleTile } from "@/stores/samples/types.ts";
import type { PurchasedTrack } from "@/api/payment.ts";

interface FilterOptions {
  genre?: string;
  searchQuery?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const usePurchasedSearchFilter = (samples: Ref<PurchasedTrack[]>) => {
  const filters = ref<FilterOptions>({
    searchQuery: "",
    genre: "",
  });

  const matchesText = (sample: ISampleTile, query: string) => {
    if (!query.trim()) return true;
    const lowerQuery = query.toLowerCase();
    return [sample.title, sample.author, sample.description].some((field) =>
      field?.toLowerCase().includes(lowerQuery),
    );
  };

  const matchesGenre = (sample: ISampleTile, genre: string) => {
    if (!genre) return true;
    return sample.genre?.toLowerCase() === genre.toLowerCase();
  };

  const filteredSamples = computed(() => {
    if (!samples.value) return [];
    return samples.value.filter((sample) => {
      return (
        matchesText(sample.sample, filters.value.searchQuery || "") &&
        matchesGenre(sample.sample, filters.value.genre || "")
      );
    });
  });

  const resetSearchFilters = () => {
    filters.value.searchQuery = "";
    filters.value.genre = "";
  };

  return {
    filters,
    filteredSamples,

    resetSearchFilters,
  };
};
