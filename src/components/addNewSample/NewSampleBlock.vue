<template>
  <div class="search-panel p-24 gap-24 d-flex flex-column">
    <div class="d-flex">
      <ui-input
        id="newNameSample"
        v-model="title"
        class="search-input"
        name="login"
        type="text"
        placeholder="Название..."
      >
      </ui-input>
    </div>

    <div class="d-flex">
      <ui-input
        id="newSampleDesc"
        v-model="description"
        class="search-input"
        name="login"
        type="text"
        placeholder="Описание..."
      >
      </ui-input>
    </div>

    <div class="d-flex gap-10 w-100">
      <ui-input
        id="login-auth"
        v-model="price"
        class="search-input"
        name="login"
        type="number"
        placeholder="Стоимость семпла в токенах..."
      >
        <coin-icon class="left-icon" />
      </ui-input>

      <custom-select
        v-model="genre"
        option-label="name"
        option-value="value"
        placeholder="Жанр"
        class="w-full md:w-56"
        style="
          align-items: center;
          justify-content: center;

          width: 50% !important;
          min-width: 50% !important;
          max-width: 50% !important;
          height: 56px;
          border: 1px solid rgb(42 54 70);
          border-radius: 10px;

          background-color: rgb(31 41 55);
        "
        :options="allCategories"
      />
    </div>

    <div>
      <div class="card">
        <file-upload
          ref="fileUploadRef"
          mode="basic"
          name="demo[]"
          accept=".wav"
          choose-label="Выбрать WAV"
          style="
            border: none;

            font-weight: 200;
            color: white;

            opacity: 1;
            background: var(--accent-light);
          "
          :auto="false"
          :custom-upload="true"
          :multiple="false"
          @select="onSelect"
        >
          <template #empty>
            <span>Drag and drop files to here to upload.</span>
          </template>
        </file-upload>

        <ul
          v-if="selectedFiles.length"
          class="mt-3"
        >
          <li
            v-for="f in selectedFiles"
            :key="f.name"
            class="d-flex jc-between ai-center px-16"
          >
            <span> {{ f.name }} ({{ (f.size / 1024).toFixed(1) }} KB) </span>

            <i
              class="bi bi-trash-fill trash-icon"
              @click="clearTrack"
            ></i>
          </li>
        </ul>
      </div>
    </div>

    <div class="d-flex jc-end">
      <button
        class="submit-btn outline"
        @click="createSample"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import CustomSelect from "primevue/select";
import UiInput from "@/ui/input/ui-input.vue";
import CoinIcon from "@/assets/icons/addNewSample/CoinIcon.vue";
import FileUpload from "primevue/fileupload";

import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSampleStore } from "@/stores/sample/store.ts";
import { allCategories } from "@/composables/searchFilters/constants.ts";

const sampleStore = useSampleStore();
const { description, genre, price, title, selectedFiles } = storeToRefs(sampleStore);
const { createSample } = sampleStore;

const fileUploadRef = ref(null);

const onSelect = (event) => {
  selectedFiles.value = event.files;
};

const clearTrack = () => {
  selectedFiles.value = [];
  if (fileUploadRef.value) {
    fileUploadRef.value.clear();
  }
};
</script>

<style scoped lang="scss">
.card {
  font-weight: 200;
  color: white;
  background: #2a3646;
}

.trash-icon {
  cursor: pointer;
  font-size: 24px;
  color: darkred;
  stroke: none;
}

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
