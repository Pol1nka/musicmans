<template>
  <div class="search-panel p-24 gap-24 d-flex flex-column">
    <div class="d-flex">
      <ui-input
        id="login-auth"
        v-model="filters.searchQuery"
        class="search-input"
        name="login"
        type="text"
        placeholder="Поиск семплов или ключевых слов..."
      >
        <loupe-icon class="left-icon" />
      </ui-input>
    </div>

    <div class="d-flex gap-24">
      <custom-select
        v-model="filters.genre"
        option-label="name"
        option-value="value"
        placeholder="Жанр"
        class="w-full md:w-56"
        style="
          align-items: center;
          justify-content: center;

          min-width: 200px;
          height: 56px;
          border: 1px solid rgb(42 54 70);
          border-radius: 10px;

          background-color: rgb(31 41 55);
        "
        :options="allCategories"
      />

      <button
        v-if="filters.genre"
        class="submit-btn text-only"
        @click="$resetFilters"
      >
        Сбросить
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import CustomSelect from "primevue/select";
import UiInput from "@/ui/input/ui-input.vue";
import LoupeIcon from "@/assets/icons/LoupeIcon.vue";

import { storeToRefs } from "pinia";
import { useSamplesStore } from "@/stores/samples/store.ts";
import { allCategories } from "@/composables/searchFilters/constants.ts";

const samplesStore = useSamplesStore();
const { filters } = storeToRefs(samplesStore);
const { $resetFilters } = samplesStore;
</script>

<style scoped lang="scss">
.search-panel {
  border: 0.5px solid rgb(61 74 92 / 50%);
  border-radius: 12px;
  background-color: var(--search-color);
}

.left-icon {
  cursor: pointer;

  position: absolute;
  left: 0;

  box-sizing: unset;
  width: 22px;
  height: 22px;
  padding: 18px 12px;

  color: var(--light-text);
}

.search-input {
  border-radius: 10px;
  background-color: rgb(42 54 70);
}

.submit-btn {
  height: 56px;
  padding: 0 24px;
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

  &.filled {
    color: white;
    background-color: var(--accent-color);
  }

  &.outline {
    border: 1px solid var(--accent-color);
    color: var(--accent-color);
    background-color: transparent;
  }

  &.text-only {
    border: none;
    color: var(--accent-color);
    background: transparent;

    &:hover {
      background-color: rgb(42 54 70);
    }
  }
}

:deep(.p-select) {
  --p-select-color: #fff !important;
}

.p-select.p-focus {
  border: 2px solid var(--accent-color) !important;
  box-shadow: none;
}

.p-select:focus-within {
  border: 2px solid var(--accent-color) !important;
}
</style>
