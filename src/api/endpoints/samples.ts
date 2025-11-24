import { useAxios } from "@/api/useAxios.ts";

import type { AxiosInstance } from "axios";
import type { ISampleTile } from "@/stores/samples/types.ts";

export const samplesApi = (instance: AxiosInstance) => ({
  getAllSamples() {
    return useAxios<ISampleTile[]>(instance).get("samples");
  },
});
