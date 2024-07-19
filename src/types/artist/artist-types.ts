import { Song } from "@/types/song/song-types";

export type Artist = {
  id: number;
  name: string;
  age: number;
  songs: Song[];
};
