<template>
  <div
    class="sample-card d-flex p-16 flex-column gap-10 jc-between"
    @click="handleCardClick"
  >
    <div class="waveform-container">
      <div class="waveform-overlay">
        <pack-icon />
      </div>
    </div>

    <!--    блок с текстом карточки-->
    <div class="d-flex flex-column gap-12">
      <div class="d-flex flex-column">
        <h3 class="track-title">{{ pack.name }}</h3>

        <p class="track-artist">{{ pack.author }}</p>
      </div>
      <!--блок с длительностью и размером-->
      <div class="track-meta d-flex ai-center jc-between">
        <!--        <span>{{ trackDuration }}</span>-->

        <!--        <span> {{ sample.size }} size </span>-->
      </div>
    </div>

    <!--    блок с тегами (жанром в нашем случае)-->
    <div class="card-tags d-flex gap-8">
      <genre-tag :text-genre="pack.genre" />
    </div>

    <!--    действия-->
    <div class="d-flex ai-center jc-end">
      <button
        class="play-pack-btn outline"
        @click="handleDownload"
      >
        <play-icon />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import GenreTag from "@/components/homePage/sampleCards/GenreTag.vue";
import PackIcon from "@/assets/icons/PackIcon.vue";
import PlayIcon from "@/assets/icons/PlayIcon.vue";

import router from "@/router";
import type { IProps } from "@/components/allPacksPage/types.ts";

const props = defineProps<IProps>();

const handleCardClick = async () => {
  await router.push({ name: "pack", params: { id: props.pack.id } });
};

const handleDownload = async () => {};
</script>

<style scoped lang="scss">
.waveform-overlay {
  position: absolute;
  z-index: 2;
  inset: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: opacity 0.3s ease;

  svg {
    stroke: var(--accent-color);
  }
}

.waveform-container {
  cursor: pointer;

  position: relative;

  overflow: hidden;
  display: flex;
  gap: 0.25rem;
  align-items: flex-end;
  justify-content: center;

  height: 100px;
  padding: 1.5rem;
  border-radius: 0.75rem;

  opacity: 0.4;
  background: linear-gradient(
    90deg,
    rgb(42 123 155 / 100%) 0%,
    rgb(87 199 133 / 100%) 100%,
    rgb(237 221 83 / 100%) 100%
  );

  transition: background 0.3s ease;
}

.sample-card {
  cursor: pointer;

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
    opacity: 0.6;
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
  width: 3px;
  border-radius: 9999px;

  opacity: 0.8;
  background: var(--accent-color);

  transition: all 0.3s ease;
}

.track-title {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  font-size: 16px;
  font-weight: 600;
  color: white;
}

.track-artist {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

  margin: 0;

  font-size: 14px;
  color: rgb(143 151 163);
  text-overflow: ellipsis;
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

.play-pack-btn {
  width: 50px;
  height: 50px;
  padding: 0 12px;
  border: none;
  border-radius: 50%;

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
    color: var(--dark-text);
    background-color: var(--accent-color);
    transition: all 0.1s linear;

    &:hover {
      color: white;
      background: var(--accent-light);
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
