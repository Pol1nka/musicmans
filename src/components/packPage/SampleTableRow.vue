<template>
  <div
    class="table-row d-flex ai-center"
    :class="{ 'row-playing': isCurrentTrack(sample.id) }"
    @click="handleRowClick(sample)"
  >
    <!-- Pack (обложка) -->
    <div class="col col-pack">
      <div class="pack-cover">
        <div class="pack-placeholder">
          <music-icon />
        </div>
      </div>
    </div>

    <!-- Filename -->
    <div class="col col-filename">
      <div class="filename-content d-flex ai-center gap-8">
        <button
          class="play-btn-small"
          @click.stop="toggleTrack(sample)"
        >
          <play-icon v-if="!isTrackPlaying(sample.id)" />

          <pause-icon v-else />
        </button>

        <span class="filename-text">{{ sample.title }}</span>
      </div>
    </div>

    <!-- Genre -->
    <div class="col col-genre">
      <genre-tag :text-genre="sample.genre" />
    </div>

    <!-- Waveform -->
    <div class="col col-waveform">
      <div class="waveform-mini">
        <div
          v-for="(height, index) in waveformData"
          :key="index"
          class="wave-bar"
          :class="{ 'wave-bar-playing': isTrackPlaying(sample.id) }"
          :style="{ height: `${height}%` }"
        />
      </div>
    </div>

    <!-- Time -->
    <div class="col col-time">
      {{ formatDuration(sample.duration) }}
    </div>

    <!-- Author -->
    <div class="col col-author">
      <span class="author-text">{{ sample.author }}</span>
    </div>

    <!-- Actions -->
    <div class="col col-actions d-flex ai-center gap-8">
      <button
        v-if="!sample.download_url"
        class="icon-btn"
        @click.stop="handleBuySample"
      >
        <i class="bi bi-cart-plus" />
      </button>

      <button
        v-else-if="sample.download_url"
        class="icon-btn"
        @click.stop="handleDownload"
      >
        <download-icon />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import GenreTag from "@/components/homePage/sampleCards/GenreTag.vue";
import MusicIcon from "@/assets/icons/MusicIcon.vue";
import DownloadIcon from "@/assets/icons/DownloadIcon.vue";
import PlayIcon from "@/assets/icons/PlayIcon.vue";
import PauseIcon from "@/assets/icons/PauseIcon.vue";

import { computed } from "vue";
import { useAudioPlayer } from "@/composables/audioPlayer/audioPlayer.ts";
import { usePaymentStore } from "@/stores/payment/store.ts";

import type { ISampleTile } from "@/stores/samples/types.ts";
import { usePackStore } from "@/stores/pack/store.ts";

interface IProps {
  sample: ISampleTile;
}

const props = defineProps<IProps>();

const {
  isTrackPlaying,
  playTrack,
  togglePlay,
  isTrackCurrent: isCurrentTrack,
  downloadTrack,
} = useAudioPlayer();

const paymentStore = usePaymentStore();

const packStore = usePackStore();
const { getCurrentPack } = packStore;

const waveformData = computed(() => {
  const seed = Number(props.sample.id);
  const random = (s: number) => {
    const x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };

  return Array.from({ length: 25 }, (_, i) => random(seed + i) * 100);
});

const handleRowClick = async (sample: ISampleTile) => {
  if (isCurrentTrack(sample.id)) {
    await togglePlay();
  } else {
    await playTrack(sample);
  }
};

const toggleTrack = async (sample: ISampleTile) => {
  if (isCurrentTrack(sample.id)) {
    await togglePlay();
  } else {
    await playTrack(sample);
  }
};

const handleDownload = async () => {
  if (props.sample) await downloadTrack(props.sample);
};

const handleBuySample = async () => {
  if (props.sample) await paymentStore.buyCurrentSample(props.sample.id);
  await getCurrentPack();
};

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};
</script>

<style scoped lang="scss">
.table-row {
  cursor: pointer;

  display: flex;
  gap: 16px;
  align-items: center;

  padding: 12px 16px;
  border-bottom: 1px solid rgb(51 65 85 / 30%);

  transition: all 0.2s;

  &:hover {
    background: rgb(51 65 85 / 30%);
  }

  &.row-playing {
    border-left: 3px solid var(--accent-color);
    background: rgb(163 230 53 / 10%);
  }
}

/* Колонки - ТОЧНО такие же как в header */
.col {
  display: flex;
  align-items: center;

  &.col-pack {
    flex: 0 0 60px;
  }

  &.col-filename {
    overflow: hidden; /* Для ellipsis */
    flex: 1 1 auto; /* Сжимается динамически! */
    min-width: 150px;
  }

  &.col-genre {
    flex: 0 1 auto; /* Размер по контенту, может сжаться */
    min-width: 80px;
  }

  &.col-waveform {
    flex: 0 1 120px;
    min-width: 100px;
  }

  &.col-time {
    flex: 0 0 50px;
    color: rgb(143 151 163);
  }

  &.col-author {
    overflow: hidden;
    flex: 0 1 120px; /* Может сжаться */
    min-width: 80px;
  }

  &.col-actions {
    flex: 0 0 60px;
    gap: 8px;
    justify-content: flex-end;
  }
}

/* Pack cover */
.pack-cover {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 44px;
  height: 44px;
  border-radius: 6px;

  background: rgb(51 65 85 / 50%);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.pack-placeholder {
  color: rgb(143 151 163);
}

/* Filename с ellipsis */
.filename-content {
  overflow: hidden;
  width: 100%;
  min-width: 0; /* КРИТИЧЕСКИ ВАЖНО для работы ellipsis внутри flex */
}

.filename-text {
  overflow: hidden;
  flex: 1;

  font-size: 14px;
  font-weight: 500;
  color: white;
  text-overflow: ellipsis;

  /* Ellipsis */
  white-space: nowrap;
}

/* Author с ellipsis */
.author-text {
  overflow: hidden;

  width: 100%;

  font-size: 13px;
  color: rgb(143 151 163);
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Waveform */
.waveform-mini {
  display: flex;
  gap: 1px;
  align-items: flex-end;

  width: 100%;
  height: 32px;
}

.wave-bar {
  flex: 1;

  min-width: 1px; /* Минимум 1px чтобы могли сжиматься */
  border-radius: 2px;

  background: rgb(143 151 163 / 50%);

  transition: all 0.3s;

  &.wave-bar-playing {
    background: var(--accent-color);
    animation: pulse 0.5s ease-in-out infinite alternate;
  }
}

/* Play button */
.play-btn-small {
  cursor: pointer;

  display: flex;
  flex-shrink: 0; /* Не сжимается */
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;

  color: white;

  background: transparent;

  transition: all 0.2s;

  &:hover {
    color: var(--accent-color);
    background: rgb(163 230 53 / 15%);
  }
}

/* Icon buttons */
.icon-btn {
  cursor: pointer;

  display: flex;
  flex-shrink: 0; /* Не сжимается */
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;

  color: rgb(143 151 163);

  background: transparent;

  transition: all 0.2s;

  &:hover {
    color: white;
    background: rgb(255 255 255 / 10%);
  }
}

@keyframes pulse {
  from {
    opacity: 0.6;
  }

  to {
    opacity: 1;
  }
}

/* Адаптивность */

@media (width <= 1400px) {
  .col-filename {
    max-width: 320px;
  }
}

@media (width <= 1300px) {
  .col-filename {
    max-width: 350px;
  }

  .col-waveform {
    display: none !important;
  }
}

@media (width <= 1250px) {
  .col-filename {
    max-width: 300px;
  }
}

@media (width <= 1180px) {
  .col-filename {
    max-width: 250px;
  }
}

@media (width <= 1100px) {
  .col-filename {
    max-width: 280px;
  }

  .col-pack {
    display: none;
  }
}

@media (width <= 1000px) {
  .col-filename {
    max-width: 300px;
  }

  .col-author {
    display: none;
  }
}

@media (width <= 950px) {
  .col-filename {
    max-width: 200px;
  }
}

@media (width <= 850px) {
  .col-genre {
    display: none;
  }

  .col-filename {
    max-width: 250px;
  }
}

@media (width <= 768px) {
  .col-genre {
    display: none !important;
  }
}

@media (width <= 600px) {
  .col-time {
    display: none !important;
  }

  .col-filename {
    min-width: 120px;
  }

  .table-row {
    gap: 12px;
  }
}
</style>
