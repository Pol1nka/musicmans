import { useAxios } from "@/api/useAxios.ts";

import type { AxiosInstance } from "axios";
import type { ISampleTile } from "@/stores/samples/types.ts";

interface IPaymentUrl {
  url: string;
}

export interface PurchasedTrack {
  id: string;
  sampleId: string;
  sample: ISampleTile;
  price: number;
  purchasedAt: string;
}

export const paymentApi = (instance: AxiosInstance) => ({
  setNewPayment() {
    return useAxios<IPaymentUrl>(instance).post("payments/new");
  },

  buyTheSample(sampleId: string) {
    return useAxios<PurchasedTrack>(instance).post(`samples/${sampleId}/purchase`);
  },

  getPurchasedSamples() {
    return useAxios<PurchasedTrack[]>(instance).get("purchases");
  },
});
