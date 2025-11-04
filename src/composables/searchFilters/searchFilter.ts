import { computed, ref } from "vue";

import type { ISampleTile } from "@/stores/samples/types.ts";

interface FilterOptions {
  genre?: string;
  searchQuery?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const useSearchFilter = (samples: ISampleTile[]) => {
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
    return samples.filter((sample) => {
      return (
        matchesText(sample, filters.value.searchQuery || "") &&
        matchesGenre(sample, filters.value.genre || "")
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
