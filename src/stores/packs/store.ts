import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { externalApi } from "@/api/api.ts";

import type { IPacks } from "@/stores/packs/types.ts";
import { usePacksFilter } from "@/composables/searchFilters/packsFilters.ts";

export const usePacksStore = defineStore("packs", () => {
  const packsTemplate = [
    {
      author: "Начинающий",
      created_at: "123.123.123",
      description: "Какое очень крутое описание отличнейшего описания описания альбома на века",
      genre: "pop",
      id: "1",
      name: "Альбом на века (мировой)",
      updated_at: "123.123.123",
    },
    {
      author: "DJ trash",
      created_at: "123.123.123",
      description: "Какое очень крутое описание отличнейшего описания описания альбома на века",
      genre: "rock",
      id: "3",
      name: "Сборник лучшего",
      updated_at: "123.123.123",
    },
    {
      author: "xxxxxxxx",
      created_at: "123.123.123",
      description: "Какое очень крутое описание отличнейшего описания описания альбома на века",
      genre: "pop",
      id: "4",
      name: "Проходной чисто",
      updated_at: "123.123.123",
    },
    {
      author: "Самый лучший исполнитель",
      created_at: "123.123.123",
      description: "Какое очень крутое описание отличнейшего описания описания альбома на века",
      genre: "pop",
      id: "5",
      name: "Звуки пук",
      updated_at: "123.123.123",
    },
  ];

  // packs
  const packs = ref<IPacks[]>([...packsTemplate]);

  const { filters, filteredPacks, resetSearchFilters } = usePacksFilter(packs.value);

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
