import type { ISampleTile } from "@/stores/samples/types.ts";

export interface IPack {
  pack: {
    author: string;
    created_at: string;
    description: string;
    genre: string;
    id: string;
    name: string;
    updated_at: string;
  };
  samples: ISampleTile[];
}
