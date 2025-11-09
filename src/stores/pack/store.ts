import { computed, ref, watch } from "vue";
import { defineStore } from "pinia";

import type { ISampleTile } from "@/stores/samples/types.ts";
import type { IPack } from "@/stores/pack/types.ts";
import { externalApi } from "@/api/api.ts";

export const usePackStore = defineStore("pack", () => {
  const author = ref<string>("");
  const createdAt = ref<string>("");
  const updatedAt = ref<string>("");
  const description = ref<string>("");
  const genre = ref<string>("");
  const packId = ref<string>("");
  const name = ref<string>("");
  //samples
  const samplesInPack = ref<ISampleTile[]>([]);

  //filters
  const sortField = ref<keyof ISampleTile>("title");
  const sortDirection = ref<"asc" | "desc">("asc");

  const { data, fetching: getCurrentPack } = externalApi.getCurrentPack(packId.value);

  const setPackData = (packData: IPack) => {
    author.value = packData.pack.author ?? "";
    createdAt.value = packData.pack.created_at ?? "";
    updatedAt.value = packData.pack.updated_at ?? "";
    description.value = packData.pack.description ?? "";
    genre.value = packData.pack.genre ?? "";
    packId.value = packData.pack.id ?? "";
    name.value = packData.pack.name ?? "";
    samplesInPack.value = packData.samples ?? [];
  };
  watch(data, (newValue) => {
    if (newValue) {
      setPackData(newValue);
    }
  });

  const sortedSamples = computed<ISampleTile[]>(() => {
    const sorted = [...samplesInPack.value].sort((a, b) => {
      const field = sortField.value;
      let aValue: string | number = a[field] as string | number;
      let bValue: string | number = b[field] as string | number;

      // Специальная обработка для разных типов
      if (field === "duration") {
        // duration уже в секундах, просто используем как число
        aValue = Number(a.duration);
        bValue = Number(b.duration);
      }

      if (field === "size" || field === "id" || field === "pack_id") {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      // Сортировка строк (author, title, genre, description)
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection.value === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Сортировка чисел (duration, size, id, pack_id)
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection.value === "asc" ? aValue - bValue : bValue - aValue;
      }

      return 0;
    });

    return sorted;
  });

  const totalDurationPack = computed(() =>
    (sortedSamples.value ?? []).reduce((sum, sample) => sum + sample.duration, 0),
  );

  return {
    author,
    createdAt,
    updatedAt,
    description,
    genre,
    packId,
    name,
    samplesInPack,
    sortField,
    sortDirection,

    sortedSamples,
    totalDurationPack,

    getCurrentPack,
    setPackData,
  };
});
