import { ref } from "vue";
import { defineStore, storeToRefs } from "pinia";
import { externalApi } from "@/api/api.ts";
import { useUserStore } from "@/stores/user/store.ts";

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
        await saveFiles();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const saveFiles = async () => {
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
