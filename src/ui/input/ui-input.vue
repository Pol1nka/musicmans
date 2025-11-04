<template>
  <div class="wrp select-none">
    <div
      class="input"
      :class="$attrs.class"
    >
      <slot />

      <input
        :id="$attrs.id as string"
        v-model="modelValue"
        autocomplete="off"
        :name="$attrs.name as string"
        :type="inputType"
        :placeholder
        :disabled
        :readonly="$attrs.readonly as boolean"
        :class="{
          'without-placeholder': !placeholder,
          'has-error': errorMessage,
        }"
        @focus="onFocus"
        @focusout="onFocusOut"
      />

      <exclamation-circle-icon
        v-if="errorMessage"
        class="icon error"
      />

      <x-circle-icon
        v-if="showClearIcon"
        class="icon"
        @mousedown.prevent="clearValue"
      />

      <component
        :is="eyeIcon"
        v-else-if="modelValue && isPasswordInput"
        class="icon"
        @mousedown.prevent="togglePasswordVisibility"
      />

      <div
        v-if="placeholder"
        class="header-container d-flex justify-content-between gap-8"
      >
        <span
          v-if="placeholder"
          class="title"
        >
          {{ placeholder }}
        </span>
      </div>
    </div>

    <div
      v-if="errorMessage || suggestion"
      class="underline"
    >
      <div
        v-if="errorMessage"
        class="error"
      >
        {{ errorMessage }}
      </div>

      <div v-else-if="suggestion">
        {{ suggestion }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import XCircleIcon from "@/assets/icons/XCircleIcon.vue";
import EyeIcon from "@/assets/icons/EyeIcon.vue";
import EyeSlashIcon from "@/assets/icons/EyeSlashIcon.vue";
import ExclamationCircleIcon from "@/assets/icons/ExclamationCircleIcon.vue";

import { computed, ref, watch } from "vue";

import type { IProps } from "@/ui/input/types.ts";

const emit = defineEmits(["update:errorMessage"]);

const props = withDefaults(defineProps<IProps>(), {
  type: "",
  placeholder: "",
  errorMessage: "",
  suggestion: "",
});

const modelValue = defineModel<string>({ default: "" });
console.log(modelValue.value);
const components = {
  EyeIcon,
  EyeSlashIcon,
};

const isPasswordInput = ref<boolean>(props.type === "password");
const isFocus = ref<boolean>(false);
const statePassword = ref<string>("password");

const inputType = computed(() => (isPasswordInput.value ? statePassword.value : props.type));
const eyeIcon = computed(() =>
  statePassword.value === "text" ? components.EyeSlashIcon : components.EyeIcon,
);

const showClearIcon = computed<boolean>(
  () =>
    !!modelValue.value &&
    !props.disabled &&
    !props.hideClearIcon &&
    !props.errorMessage &&
    !isPasswordInput.value,
);

const limitMarginRight = computed(() => (showClearIcon.value || props.errorMessage ? "56px" : 0));

watch(modelValue, () => {
  emit("update:errorMessage", "");
});

const clearValue = () => {
  modelValue.value = "";
};

const onFocus = () => {
  isFocus.value = true;
  if (props.errorMessage) {
    emit("update:errorMessage", "");
  }
};

const onFocusOut = () => {
  isFocus.value = false;
};
const togglePasswordVisibility = () => {
  statePassword.value = statePassword.value === "text" ? "password" : "text";
};
</script>

<style lang="scss" scoped>
.wrp {
  overflow: hidden;
  width: 100%;
}

.input {
  position: relative;

  overflow: hidden;

  width: 100%;
  height: 56px;

  font-size: 16px;

  background-color: transparent;

  .header-container {
    pointer-events: none;

    transform-origin: 0 50%;

    padding: 16px 16px 16px 56px;

    font-size: 16px;
    line-height: 20px;
    color: var(--light-text);
    letter-spacing: 0.2px;

    transition:
      opacity 0.3s ease-in-out,
      transform 0.3s ease-in-out;
  }

  .title {
    overflow: hidden;

    box-sizing: border-box;

    text-align: start;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .limit-container {
    margin-right: v-bind(limitMarginRight);
    white-space: nowrap;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;

    box-sizing: border-box;
    width: 100%;
    height: 56px;
    padding: 16px;
    border: 1px solid var(--dark-text);
    border-radius: 10px;

    line-height: 1.15;
    color: white;

    background: transparent;
    outline: none;

    &::placeholder {
      font-size: 8px;
      color: transparent;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      margin: 0;
      -webkit-appearance: none;
    }

    &:focus {
      border: 3px double var(--accent-color);
    }

    &:focus,
    &:not(:placeholder-shown) {
      padding: 24px 46px 8px;
    }

    &:disabled {
      background-color: var(--dark-text);
    }

    &:focus ~ .header-container,
    &:not(:placeholder-shown) ~ .header-container {
      transform: translateX(3px) translateY(-10px) scale(0.75);
      width: 133%;
    }
  }

  .has-error {
    border-color: var(--error);
    color: var(--error);

    &:focus {
      border-color: var(--error);
    }
  }
}

.without-placeholder {
  &:focus,
  &:not(:placeholder-shown) {
    padding: 16px 46px 16px 16px;
  }
}

.icon {
  cursor: pointer;

  position: absolute;
  right: 0;

  box-sizing: unset;
  padding: 18px;

  color: var(--light-text);
}

.underline {
  margin-top: 4px;

  font-size: 12px;
  line-height: 16px;
  text-align: left;
  letter-spacing: 0.4px;
}

.error {
  color: var(--error);
}
</style>
