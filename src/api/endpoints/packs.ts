import { useAxios } from "@/api/useAxios.ts";

import type { AxiosInstance } from "axios";
import type { IPack } from "@/stores/pack/types.ts";
import type { IPacks } from "@/stores/packs/types.ts";
import type { Ref } from "vue";

export const packsApi = (instance: AxiosInstance) => ({
  getCurrentPack(packId: Ref<string>) {
    return useAxios<IPack>(instance).get(() => `packs/${packId.value}`);
  },

  getAllPacks() {
    return useAxios<IPacks[]>(instance).get("packs");
  },
});
