<template>
  <div
    v-if="currentTrack"
    class="global-player d-flex jc-between ai-center gap-64"
  >
    <!--    левая часть просто с инфо о треке-->
    <div class="info-player d-flex gap-24">
      <!--      типа заглушка для обложки-->
      <div class="track-cover">
        <!-- Waveform mini или обложка -->
        <div class="mini-waveform">
          <div
            v-for="i in 15"
            :key="i"
            class="mini-bar"
            :style="{ height: `${Math.random() * 90}%` }"
          />
        </div>
      </div>

      <div class="track-meta-info d-flex flex-column jc-center">
        <h4 class="track-name">{{ currentTrack.title }}</h4>

        <p class="artist-name">{{ currentTrack.author }}</p>
      </div>
    </div>

    <!--    центральная часть блок управления-->
    <div class="d-flex flex-1 gap-64">
      <!--      кнопки управления-->
      <div class="d-flex ai-center gap-10">
        <button
          class="control-btn"
          :disabled="!hasPrevTrack"
          @click="handlePrev"
        >
          <previous-track-icon />
        </button>

        <!--        кнопка вкл/выкл-->
        <button
          class="play-button"
          :disabled="isLoading"
          @click="togglePlay"
        >
          <play-icon v-if="!isPlaying" />

          <pause-icon v-else />
        </button>

        <button
          class="control-btn"
          :disabled="!hasNextTrack"
          @click="handleNext"
        >
          <next-track-icon />
        </button>
      </div>

      <!--      прогресс бар-->
      <div class="progress-section d-flex ai-center gap-12">
        <span class="time-label">{{ formattedCurrentTime }}</span>

        <div
          ref="progressBar"
          class="progress-track"
          @click="handleProgressClick"
        >
          <div
            class="progress-fill"
            :style="{ width: `${progress}%` }"
          >
            <div class="progress-thumb"></div>
          </div>
        </div>

        <span class="time-label">{{ formattedDuration }}</span>
      </div>

      <!--      громкость -->

      <div class="volume-control d-flex ai-center gap-8">
        <button
          class="icon-btn"
          @click="toggleMute"
        >
          <volume-on-icon v-if="volume > 0" />

          <volume-off-icon v-else />
        </button>

        <input
          type="range"
          min="0"
          max="100"
          class="volume-slider"
          :value="volume * 100"
          @input="handleVolumeChange"
        />
      </div>
    </div>

    <!--   Секция доп действий -->
    <div class="d-flex ai-center">
      <button
        v-if="!currentTrack.download_url"
        class="icon-btn"
        @click="handleBuySample"
      >
        <i class="bi bi-cart-plus" />
      </button>

      <button
        v-else-if="currentTrack.download_url"
        class="icon-btn"
        @click="handleDownload"
      >
        <download-icon />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PreviousTrackIcon from "@/assets/icons/PreviousTrackIcon.vue";
import PlayIcon from "@/assets/icons/PlayIcon.vue";
import PauseIcon from "@/assets/icons/PauseIcon.vue";
import NextTrackIcon from "@/assets/icons/NextTrackIcon.vue";
import VolumeOnIcon from "@/assets/icons/VolumeOnIcon.vue";
import VolumeOffIcon from "@/assets/icons/VolumeOffIcon.vue";
import DownloadIcon from "@/assets/icons/DownloadIcon.vue";

import { ref } from "vue";
import { useAudioPlayer } from "@/composables/audioPlayer/audioPlayer";
import { usePaymentStore } from "@/stores/payment/store.ts";

const paymentStore = usePaymentStore();

const {
  currentTrack,
  isPlaying,
  isLoading,
  formattedCurrentTime,
  formattedDuration,
  progress,
  volume,
  hasPrevTrack,
  hasNextTrack,
  togglePlay,
  playPrevTrack,
  playNextTrack,
  seekToPercent,
  setVolume,
  downloadTrack,
} = useAudioPlayer();

const progressBar = ref<HTMLElement | null>(null);
const previousVolume = ref(1);

const handleProgressClick = (event: MouseEvent) => {
  if (!progressBar.value) return;
  const rect = progressBar.value.getBoundingClientRect();
  const percent = ((event.clientX - rect.left) / rect.width) * 100;
  seekToPercent(percent);
};

const handleVolumeChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = Number(target.value) / 100;
  setVolume(value);
};

const toggleMute = () => {
  if (volume.value > 0) {
    previousVolume.value = volume.value;
    setVolume(0);
  } else {
    setVolume(previousVolume.value);
  }
};

const handlePrev = async () => {
  await playPrevTrack();
};

const handleNext = async () => {
  await playNextTrack();
};

const handleDownload = async () => {
  if (currentTrack.value) await downloadTrack(currentTrack.value);
};

const handleBuySample = async () => {
  if (currentTrack.value) await paymentStore.buyCurrentSample(currentTrack.value.id);
};
</script>

<style scoped lang="scss">
.track-meta-info {
  width: 300px;
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

.global-player {
  position: fixed;
  z-index: 100;
  right: 0;
  bottom: 0;
  left: 0;

  padding: 16px 24px;
  border-top: 1px solid #334155;

  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  box-shadow: 0 -4px 12px rgb(0 0 0 / 30%);
}

/* Track Info */
.track-info {
  flex: 0 0 240px;
}

.track-cover {
  overflow: hidden;

  width: 80px;
  height: 48px;
  border-radius: 8px;

  background: rgb(51 65 85 / 50%);
}

.mini-waveform {
  display: flex;
  gap: 2px;
  align-items: flex-end;
  justify-content: center;

  height: 100%;
  padding: 8px;
}

.mini-bar {
  width: 2px;
  border-radius: 2px;
  opacity: 0.7;
  background: var(--accent-color);
}

.track-details {
  min-width: 0;
}

.track-name {
  overflow: hidden;

  margin: 0;

  font-size: 16px;
  font-weight: 500;
  color: white;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.artist-name {
  overflow: hidden;

  margin: 0;

  font-size: 14px;
  color: rgb(143 151 163);
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* Controls */
.controls-buttons {
  width: 100%;
}

.control-btn {
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 40px;
  height: 40px;
  border: none;
  border-radius: 10px;

  color: white;

  background: transparent;
  outline: none;

  transition: all 0.2s ease;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:hover:not(:disabled) {
    background: rgb(255 255 255 / 10%);
  }
}

.play-btn {
  width: 48px;
  height: 48px;
  border: 2px solid var(--accent-color);

  color: var(--accent-color);

  background: transparent;

  &:hover:not(:disabled) {
    color: #0f172a;
    background: var(--accent-color);
  }
}

/* Progress */
.progress-section {
  width: 100%;
}

.time-label {
  min-width: 40px;
  font-size: 12px;
  color: rgb(143 151 163);
  text-align: center;
}

.progress-thumb {
  position: absolute;
  top: 50%;
  right: -6px;
  transform: translateY(-50%);

  width: 12px;
  height: 12px;
  border-radius: 50%;

  opacity: 0;
  background: var(--accent-color);

  transition: opacity 0.2s;
}

.progress-track {
  cursor: pointer;

  position: relative;

  flex: 1;

  height: 6px;
  border-radius: 3px;

  background: rgb(148 163 184 / 30%);

  &:hover .progress-thumb {
    opacity: 1;
  }
}

.progress-fill {
  position: relative;

  height: 100%;
  border-radius: 3px;

  background: var(--accent-color);

  transition: width 0.1s linear;
}

.icon-btn {
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 32px;
  height: 32px;
  border: none;
  border-radius: 10px;

  color: rgb(143 151 163);

  background: transparent;
  outline: none;

  transition: all 0.2s ease;

  &:hover {
    color: white;
    background: rgb(255 255 255 / 10%);
  }
}

/* Volume */
.volume-control {
  min-width: 120px;
}

.volume-slider {
  width: 80px;
  height: 4px;
  border-radius: 2px;

  appearance: none;
  background: rgb(148 163 184 / 30%);
  outline: none;

  &::-webkit-slider-thumb {
    cursor: pointer;

    width: 12px;
    height: 12px;
    border-radius: 50%;

    appearance: none;
    background: var(--accent-color);
  }

  &::-moz-range-thumb {
    cursor: pointer;

    width: 12px;
    height: 12px;
    border: none;
    border-radius: 50%;

    background: var(--accent-color);
  }
}

@media (width <= 768px) {
  .track-info {
    flex: unset;
    width: 100%;
  }
}

@media (width <= 1500px) {
  .track-meta-info {
    width: 230px;
  }
}

@media (width <= 1350px) {
  .track-meta-info {
    width: 140px;
  }
}

@media (width <= 1100px) {
  .track-cover {
    display: none;
  }

  .track-meta-info {
    width: 100px;
  }
}
</style>
