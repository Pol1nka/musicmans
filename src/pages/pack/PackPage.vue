<!-- pages/AlbumPage.vue -->
<template>
  <page-content
    title="Информация об альбоме"
    description=" "
  >
    <!-- Информация об альбоме -->
    <div class="album-header d-flex gap-24 mb-32">
      <div class="album-cover">
        <div class="cover-placeholder">
          <music-icon />
        </div>
      </div>

      <div class="album-info d-flex flex-column gap-12">
        <h1 class="album-title">{{ name }}</h1>

        <p class="album-artist">{{ author }}</p>

        <div class="album-meta d-flex gap-16">
          <span>{{ packStore.sortedSamples.length }} tracks</span>

          <span>{{ formatAllDuration }}</span>
        </div>

        <button
          class="play-all-btn"
          @click="playAll"
        >
          <play-icon />
          Воспроизвести все
        </button>
      </div>
    </div>

    <p class="album-artist">
      {{ description }}
    </p>

    <samples-table />
  </page-content>
</template>

<script setup lang="ts">
import PageContent from "@/components/pageContent/PageContent.vue";
import PlayIcon from "@/assets/icons/PlayIcon.vue";
import SamplesTable from "@/components/packPage/SamplesTable.vue";
import MusicIcon from "@/assets/icons/MusicIcon.vue";

import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { usePackStore } from "@/stores/pack/store.ts";
import { useAudioPlayer } from "@/composables/audioPlayer/audioPlayer";
import { formatTime } from "@/composables/audioPlayer/helplers.ts";

const route = useRoute();
const { playTrack, setPlaylist } = useAudioPlayer();

const packStore = usePackStore();
const { packId, name, author, description } = storeToRefs(packStore);
const { getCurrentPack, setPackData } = packStore;

const formatAllDuration = computed(() => formatTime(packStore.totalDurationPack));

const playAll = async () => {
  if (packStore.sortedSamples.length > 0) {
    setPlaylist(packStore.sortedSamples);
    await playTrack(packStore.sortedSamples[0]);
  }
};

// Загрузка данных
onMounted(async () => {
  const albumId = route.params.id;
  packId.value = albumId as string;
  await getCurrentPack();

  // Временные данные для примера
  setPackData({
    pack: {
      author: "Songstarters",
      created_at: "123",
      description: "Collection of soul samples",
      genre: "pop",
      id: "1",
      name: "Soul Loops & Samples",
      updated_at: "123",
    },
    samples: [
      {
        author: "Songstarters",
        created_at: "123",
        description: "desc",
        download_url: "http://localhost:5173/samples/testWAV2.wav",
        duration: 1,
        genre: "pop",
        id: "3",
        pack_id: "1",
        size: 123,
        title: "SLS_SS2_70_songstarter_resampled_soul_truc_C#min.wav",
        updated_at: "",
      },
      {
        author: "Songstarters",
        created_at: "123",
        description: "desc",
        download_url: "http://localhost:5173/samples/testWAV2.wav",
        duration: 100,
        genre: "jazz",
        id: "4",
        pack_id: "1",
        size: 123,
        title: "SLS_SS2_74_songstarter_resampled_gospel_glory_F#min.wav",
        updated_at: "",
      },
      {
        author: "Songstarters",
        created_at: "123",
        description: "desc",
        download_url: "http://localhost:5173/samples/testWAV2.wav",
        duration: 1,
        genre: "pop",
        id: "5",
        pack_id: "1",
        size: 123,
        title: "SLS_SS2_70_songstarter_resampled_soul_truc_C#min.wav",
        updated_at: "",
      },
    ],
  });
  // Устанавливаем плейлист
  setPlaylist(packStore.sortedSamples);
});
</script>

<style scoped lang="scss">
.album-header {
  padding: 24px 0;
  border-radius: 12px;
  background: rgb(30 41 59 / 50%);
}

.album-cover {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 200px;
  height: 200px;
  border-radius: 12px;

  background: rgb(51 65 85 / 50%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.cover-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  color: rgb(143 151 163);

  svg {
    width: 50px;
    height: 50px;
  }
}

.album-info {
  flex: 1;
}

.album-title {
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  color: white;
}

.album-artist {
  margin: 0;
  font-size: 18px;
  color: rgb(143 151 163);
}

.album-meta {
  font-size: 14px;
  color: rgb(143 151 163);
}

.play-all-btn {
  cursor: pointer;

  display: flex;
  gap: 8px;
  align-items: center;

  width: fit-content;
  padding: 12px 24px;
  border: none;
  border-radius: 24px;

  font-size: 16px;
  font-weight: 500;
  color: #0f172a;

  background: var(--accent-color);

  transition: all 0.1s;

  &:hover {
    transform: scale(1.01);
    opacity: 0.9;
  }

  svg {
    fill: none;
  }
}
</style>
