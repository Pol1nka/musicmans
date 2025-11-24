import type { ISampleTile } from "@/stores/samples/types.ts";

export interface IProps {
  sample: ISampleTile;
}

export interface IEmits {
  (e: "download"): void;

  (e: "purchase"): void;
}
