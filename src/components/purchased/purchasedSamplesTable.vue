<template>
  <div class="samples-table-wrapper">
    <div class="samples-table">
      <!-- шапка  -->
      <div class="table-header">
        <!-- Pack (обложка) -->
        <div class="col col-pack">Pack</div>

        <!-- Filename -->
        <div class="col col-filename">
          <span>Filename</span>
        </div>

        <!-- Genre -->
        <div class="col col-genre">
          <span>Genre</span>
        </div>

        <!-- Waveform -->
        <div class="col col-waveform">Waveform</div>

        <!-- Time (duration) -->
        <div class="col col-time">
          <span>Time</span>
        </div>

        <!-- author -->
        <div class="col col-author">
          <span>Author</span>
        </div>

        <div class="col col-actions"></div>
      </div>

      <!-- Строки с треками -->
      <sample-table-row
        v-for="samplePiece in filteredPurchasedSamples"
        :key="samplePiece.sample.id"
        :sample="samplePiece.sample"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SampleTableRow from "@/components/packPage/SampleTableRow.vue";

import { storeToRefs } from "pinia";
import { usePurchasedSamplesStore } from "@/stores/purchasedSamples/store.ts";

const purchasedStore = usePurchasedSamplesStore();
const { filteredPurchasedSamples } = storeToRefs(purchasedStore);
</script>

<style scoped lang="scss">
/* КРИТИЧЕСКИ ВАЖНО - wrapper ограничивает ширину */
.samples-table-wrapper {
  overflow: hidden; /* Обрезаем всё что выходит */
  width: 100%;
  max-width: 100%; /* Не даём выйти за границы */
}

.samples-table {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.table-header {
  display: flex;
  gap: 12px; /* Уменьшил gap */
  align-items: center;

  width: 100%; /* ВАЖНО */
  min-width: 0; /* ВАЖНО для работы flex shrink */
  padding: 12px 16px;
  border-bottom: 1px solid #334155;

  font-size: 12px;
  font-weight: 600;
  color: rgb(143 151 163);
  text-transform: uppercase;
}

/* Колонки */
.col {
  display: flex;
  gap: 4px;
  align-items: center;
  min-width: 0; /* КРИТИЧЕСКИ ВАЖНО! */

  &.col-pack {
    flex: 0 0 60px;
    max-width: 60px;
  }

  &.col-filename {
    overflow: hidden;
    flex: 1 1 auto;
    min-width: 150px;

    &:hover {
      color: white;
    }
  }

  &.col-genre {
    cursor: pointer;
    flex: 0 0 auto;
    min-width: 80px;

    &:hover {
      color: white;
    }
  }

  &.col-waveform {
    flex: 0 0 120px;
    max-width: 120px;
  }

  &.col-time {
    cursor: pointer;
    flex: 0 0 70px;
    max-width: 70px;

    &:hover {
      color: white;
    }
  }

  &.col-author {
    cursor: pointer;
    flex: 0 0 110px;
    max-width: 110px;

    &:hover {
      color: white;
    }
  }

  &.col-actions {
    flex: 0 0 60px;
    gap: 8px;
    justify-content: flex-end;
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
