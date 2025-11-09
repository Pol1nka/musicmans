<template>
  <div class="samples-table">
    <!-- шапка  -->
    <div class="table-header d-flex ai-center">
      <!-- Pack (обложка) -->
      <div class="col col-pack">Pack</div>

      <!-- Filename -->
      <div class="col col-filename">
        <span>Filename</span>
      </div>

      <!-- Genre -->
      <div class="col col-filename">
        <span>Genre</span>
      </div>

      <!-- Waveform -->
      <div class="col col-waveform">Waveform</div>

      <!-- Time (duration) -->
      <div
        class="col col-time"
        @click="sortBy('duration')"
      >
        <span>Time</span>

        <sort-icon :direction="getSortDirection('duration')" />
      </div>

      <!-- author -->
      <div
        class="col col-key"
        @click="sortBy('author')"
      >
        <span>Author</span>

        <sort-icon :direction="getSortDirection('author')" />
      </div>

      <div class="col col-actions"></div>
    </div>

    <!-- Строки с треками -->
    <sample-table-row
      v-for="samplePiece in packStore.sortedSamples"
      :key="samplePiece.id"
      :sample="samplePiece"
      @click="handleRowClick(samplePiece)"
    />
  </div>
</template>

<script setup lang="ts">
import SampleTableRow from "@/components/packPage/SampleTableRow.vue";

import { storeToRefs } from "pinia";
import { usePackStore } from "@/stores/pack/store.ts";
import { useAudioPlayer } from "@/composables/audioPlayer/audioPlayer.ts";

import type { ISampleTile } from "@/stores/samples/types.ts";

const { playTrack, togglePlay, isTrackCurrent: isCurrentTrack } = useAudioPlayer();

const packStore = usePackStore();
const { sortField, sortDirection } = storeToRefs(packStore);

const sortBy = (field: keyof ISampleTile) => {
  if (sortField.value === field) {
    // Меняем направление сортировки
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    // Новое поле - сортируем по возрастанию
    sortField.value = field;
    sortDirection.value = "asc";
  }
};

const handleRowClick = async (sample: ISampleTile) => {
  if (isCurrentTrack(sample.id)) {
    await togglePlay();
  } else {
    await playTrack(sample);
  }
};

const getSortDirection = (field: keyof ISampleTile): "asc" | "desc" | null => {
  return sortField.value === field ? sortDirection.value : null;
};
</script>

<style scoped lang="scss">
.samples-table {
  width: 100%;
}

.table-header {
  padding: 12px 16px;
  border-bottom: 1px solid #334155;

  font-size: 12px;
  font-weight: 600;
  color: rgb(143 151 163);
  text-transform: uppercase;
}

/* Колонки */
.col {
  &.col-pack {
    flex-shrink: 0;
    width: 60px;
  }

  &.col-filename {
    cursor: pointer;

    display: flex;
    flex: 1;
    gap: 8px;
    align-items: center;

    min-width: 300px;

    &:hover {
      color: white;
    }
  }

  &.col-waveform {
    flex-shrink: 0;
    width: 120px;
  }

  &.col-time {
    cursor: pointer;

    display: flex;
    flex-shrink: 0;
    gap: 4px;
    align-items: center;

    width: 80px;

    &:hover {
      color: white;
    }
  }

  &.col-key {
    cursor: pointer;

    display: flex;
    flex-shrink: 0;
    gap: 4px;
    align-items: center;

    width: 80px;

    &:hover {
      color: white;
    }
  }

  &.col-bpm {
    cursor: pointer;

    display: flex;
    flex-shrink: 0;
    gap: 4px;
    align-items: center;

    width: 80px;

    &:hover {
      color: white;
    }
  }

  &.col-actions {
    flex-shrink: 0;
    justify-content: flex-end;
    width: 120px;
  }
}
</style>
