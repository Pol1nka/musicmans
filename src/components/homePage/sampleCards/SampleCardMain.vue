<template>
  <div class="sample-card d-flex p-16 flex-column gap-16">
    <div
      class="waveform-container"
      @click="handleCardClick"
    >
      <!-- Затемнение и кнопка при наведении -->
      <div class="waveform-overlay">
        <button class="play-button">
          <play-icon v-if="!isCurrentTrackPlaying" />

          <pause-icon v-else />
        </button>
      </div>

      <div
        v-for="(height, index) in waveformData"
        :key="index"
        class="waveform-bar"
        :class="{ 'waveform-bar-playing': isCurrentTrackPlaying }"
        :style="{ height: `${height}%` }"
      />
    </div>

    <!--    блок с текстом карточки-->
    <div class="d-flex flex-column gap-12">
      <div class="d-flex flex-column">
        <h3 class="track-title">{{ sample.title }}</h3>

        <p class="track-artist">{{ sample.author }}</p>
      </div>
      <!--блок с длительностью и размером-->
      <div class="track-meta d-flex ai-center jc-between">
        <span>{{ sample.duration }}</span>

        <span> {{ sample.size }} size </span>
      </div>
    </div>

    <!--    блок с тегами (жанром в нашем случае)-->
    <div class="card-tags d-flex gap-8">
      <genre-tag :text-genre="sample.genre" />
    </div>

    <!--    действия-->
    <div class="d-flex ai-center jc-end">
      <button
        class="submit-btn outline"
        @click="handleDownload"
      >
        <download-icon />
        Скачать
      </button>
    </div>

    <!-- спиннер -->
    <div
      v-if="isCurrentTrackLoading"
      class="loading-overlay"
    >
      <div class="spinner"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import GenreTag from "@/components/homePage/sampleCards/GenreTag.vue";
import DownloadIcon from "@/assets/icons/DownloadIcon.vue";
import PlayIcon from "@/assets/icons/PlayIcon.vue";
import PauseIcon from "@/assets/icons/PauseIcon.vue";

import { computed } from "vue";
import { useAudioPlayer } from "@/composables/audioPlayer/audioPlayer.ts";

import type { IEmits, IProps } from "./types.ts";

const props = defineProps<IProps>();
const emit = defineEmits<IEmits>();

const { isTrackPlaying, isTrackCurrent, isLoading, playTrack, togglePlay } = useAudioPlayer();

// Computed
const waveformData = computed(() => {
  return Array.from({ length: 40 }, () => Math.random() * 100);
});

const isCurrentTrackPlaying = computed(() => {
  return isTrackPlaying(props.sample.id);
});

const isCurrentTrackLoading = computed(() => {
  return isTrackCurrent(props.sample.id) && isLoading.value;
});

// Methods
const handleCardClick = async () => {
  // Если этот трек уже загружен - просто toggle
  if (isTrackCurrent(props.sample.id)) {
    await togglePlay();
  } else {
    // Иначе загружаем и играем новый трек
    await playTrack(props.sample);
  }
};

const handleDownload = () => {
  emit("download");
};
</script>

<style scoped lang="scss">
.waveform-overlay {
  position: absolute;
  z-index: 2;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  opacity: 0;
  background: rgb(0 0 0 / 40%);

  transition: opacity 0.3s ease;
}

.waveform-container {
  cursor: pointer;

  position: relative;

  overflow: hidden;
  display: flex;
  gap: 0.25rem;
  align-items: flex-end;
  justify-content: center;

  height: 80px;
  padding: 1.5rem;
  border-radius: 0.75rem;

  background: rgb(51 65 85 / 50%);

  transition: background 0.3s ease;
}

.sample-card {
  position: relative;

  box-sizing: border-box;
  width: 100%;
  min-width: 241px;
  border: 1px solid #334155;
  border-radius: 12px;

  background: transparent;

  transition: all 0.2s ease;

  &:hover {
    border: 1px solid var(--accent-color);
  }

  &:hover .waveform-container {
    background: rgb(51 65 85 / 70%);
  }

  &:hover .waveform-overlay {
    opacity: 1;
  }
}

.play-button {
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 86px;
  height: 44px;
  border: 2px solid var(--accent-color);
  border-radius: 9999px;

  color: white;

  background: transparent;
  outline: none;

  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
    color: #0f172a;
    background: var(--accent-color);
  }

  &:active {
    transform: scale(0.95);
  }
}

.waveform-bar {
  width: 0.25rem;
  border-radius: 9999px;

  opacity: 0.8;
  background: var(--accent-color);

  transition: all 0.3s ease;
}

.track-title {
  font-size: 16px;
  font-weight: 600;
  color: white;
}

.track-artist {
  font-size: 14px;
  color: rgb(143 151 163);
}

.track-meta {
  font-size: 12px;
  color: rgb(143 151 163);
}

.card-tags {
  flex-wrap: wrap;
}

.waveform-bar-playing {
  animation: pulse 0.5s ease-in-out infinite alternate;
}

@keyframes pulse {
  from {
    opacity: 0.6;
  }

  to {
    opacity: 1;
  }
}

.submit-btn {
  height: 40px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;

  font-size: 14px;
  font-weight: 500;
  line-height: 22.5px;
  letter-spacing: normal;

  outline: none;

  transition: all 0.05s linear;

  &:active {
    opacity: 0.8;
  }

  &.outline {
    border: 1px solid var(--accent-color);
    color: var(--accent-color);
    background-color: transparent;
    transition: all 0.1s linear;

    &:hover {
      opacity: 0.8;
    }
  }
}

.loading-overlay {
  position: absolute;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 1rem;

  background: rgb(0 0 0 / 50%);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid var(--accent-light);
  border-top-color: var(--accent-color);
  border-radius: 50%;

  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
