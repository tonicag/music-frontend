import { Artist } from "@/types/artist/artist-types";

export type Song = {
  id: number;
  name: string;
  artist: Artist;
};
