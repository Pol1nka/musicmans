import { useAxios } from "@/api/useAxios.ts";

import type { AxiosInstance } from "axios";
import type { ISampleTile } from "@/stores/samples/types.ts";
import type { IDownloadUrl, IUuid } from "@/api/types.ts";

export const samplesApi = (instance: AxiosInstance) => ({
  getAllSamples() {
    return useAxios<ISampleTile[]>(instance).get("samples");
  },

  createSample() {
    return useAxios<IUuid>(instance).post("samples");
  },

  createSampleMusicFile(sampleId: string) {
    return useAxios<IDownloadUrl>(instance, {
      customHeaders: {
        "Content-Type": undefined,
      },
    }).post(`samples/${sampleId}`);
  },
});
