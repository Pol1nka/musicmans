import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { externalApi } from "@/api/api.ts";
import { useAudioPlayer } from "@/composables/audioPlayer/audioPlayer.ts";

import type { ISampleTile } from "@/stores/samples/types.ts";
import { useSearchFilter } from "@/composables/searchFilters/searchFilter.ts";

export const useSamplesStore = defineStore("samples", () => {
  const { setPlaylist } = useAudioPlayer();

  const tracks = [
    {
      author: "А также автор с очень длинной фамилией",
      created_at: "А также автор с очень длинной фамилией",
      description: "desc",
      download_url: "http://localhost:5173/samples/testWAV.wav",
      duration: 5,
      genre: "rock",
      id: "1",
      pack_id: "1",
      size: 2049,
      title: "Супер длинный текст названия",
      updated_at: "",
    },
    {
      author: "star",
      created_at: "123",
      description: "desc",
      download_url: "http://localhost:5173/samples/testWAV2.wav",
      duration: 11,
      genre: "pop",
      id: "2",
      pack_id: "1",
      size: 123,
      title: "simple",
      updated_at: "",
    },
    {
      author: "ya2",
      created_at: "123",
      description: "desc",
      download_url: "http://localhost:5173/samples/testWAV2.wav",
      duration: 11,
      genre: "jazz",
      id: "3",
      pack_id: "1",
      size: 123,
      title: "simple",
      updated_at: "",
    },
    {
      author: "yaaa3",
      created_at: "123",
      description: "desc",
      download_url: "http://localhost:5173/samples/testWAV2.wav",
      duration: 11,
      genre: "hiphop",
      id: "4",
      pack_id: "1",
      size: 123,
      title: "simple",
      updated_at: "",
    },
  ];
  setPlaylist(tracks);

  //filters
  const genreFilter = ref<string>("");
  //samples
  const samples = ref<ISampleTile[]>([...tracks]);

  const { filters, filteredSamples, resetSearchFilters } = useSearchFilter(samples.value);

  const { data, fetching: getSamples } = externalApi.getAllSamples();

  watch(data, (newValue) => {
    if (newValue) {
      samples.value = newValue ?? tracks;
      setPlaylist(tracks);
    }

    setPlaylist(tracks);
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
