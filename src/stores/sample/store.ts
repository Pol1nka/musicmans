import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user/store.ts";
import { externalApi } from "@/api/api.ts";

export const useSampleStore = defineStore("sample", () => {
  const userStore = useUserStore();
  const { login } = storeToRefs(userStore);

  const description = ref<string>("");
  const genre = ref<string>("");
  const price = ref<string>("");
  const title = ref<string>("");

  const selectedFiles = ref([]);

  const createdSampleId = ref<string>("");

  const {
    data: createdSampleUuid,
    isSuccess,
    fetching: createNewSample,
  } = externalApi.createSample();

  const saveFiles = async () => {
    const error = "";

    const { fetching: createUserSample } = externalApi.createSampleMusicFile(createdSampleId.value);

    if (!selectedFiles.value.length || !createdSampleUuid.value) {
      return;
    }
    const formData = new FormData();
    selectedFiles.value.forEach((file) => {
      formData.append("file", file);
    });
    try {
      await createUserSample(formData);
    } catch (error) {
      error = "Произошла ошибка создания звука";
      console.log(error);
    }
    return error;
  };

  const createSample = async () => {
    try {
      await createNewSample({
        author: login.value,
        description: description.value,
        genre: genre.value,
        price: Number(price.value),
        title: title.value,
      });
      if (isSuccess.value && createdSampleUuid.value) {
        createdSampleId.value = createdSampleUuid.value.uuid;
        const error = await saveFiles();
        if (!error) {
          window.location.href = "/";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    description,
    genre,
    price,
    title,
    selectedFiles,
    createdSampleId,

    saveFiles,
    createSample,
  };
});
