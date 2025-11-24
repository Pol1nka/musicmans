import { computed, type Ref, ref } from "vue";

import type { IPacks } from "@/stores/packs/types.ts";

interface FilterOptions {
  genre?: string;
  searchQuery?: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export const usePacksFilter = (packs: Ref<IPacks[]>) => {
  const filters = ref<FilterOptions>({
    searchQuery: "",
    genre: "",
  });

  const matchesText = (pack: IPacks, query: string) => {
    if (!query.trim()) return true;
    const lowerQuery = query.toLowerCase();
    return [pack.name, pack.author, pack.description].some((field) =>
      field?.toLowerCase().includes(lowerQuery),
    );
  };

  const matchesGenre = (pack: IPacks, genre: string) => {
    if (!genre) return true;
    return pack.genre?.toLowerCase() === genre.toLowerCase();
  };

  const filteredPacks = computed(() => {
    console.log(packs.value);
    return packs.value.filter((pack) => {
      return (
        matchesText(pack, filters.value.searchQuery || "") &&
        matchesGenre(pack, filters.value.genre || "")
      );
    });
  });

  const resetSearchFilters = () => {
    filters.value.searchQuery = "";
    filters.value.genre = "";
  };

  return {
    filters,
    filteredPacks,

    resetSearchFilters,
  };
};
