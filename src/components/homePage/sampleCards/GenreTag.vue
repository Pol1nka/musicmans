<template>
  <div class="genre-tag d-flex ai-center jc-center">
    <p class="text-genre">{{ textGenre }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  textGenre: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.genre-tag {
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 7px 12px;
  border-radius: 9999px;

  color: white;

  background-color: rgb(51 62 77 / 80%);

  &:hover {
    background-color: rgb(51 62 77 / 40%);
  }
}

.text-genre {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  line-height: 1; // 👈 добавь это
}
</style>
