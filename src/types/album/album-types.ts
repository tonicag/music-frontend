import { Artist } from "@/types/artist/artist-types";
import { Song } from "@/types/song/song-types";

export type Album = {
  id: number;
  description: string;
  name: string;
  artist: Artist;
  songs: Song[];
};
