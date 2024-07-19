import { useDrawerTableContext } from "@/app/dashboard/songs/contexts/DrawerTableContextProvider";
import FormInput from "@/components/form-input";
import FormWrapper from "@/components/form-wrapper";
import SelectComponent from "@/components/select-component";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Album } from "@/types/album/album-types";
import { Artist } from "@/types/artist/artist-types";
import { Song } from "@/types/song/song-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Music2Icon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type AlbumFormProps = {
  children?: ReactNode;
};

const formSchema = z
  .object({
    id: z.number().nullish(),
    name: z.string().min(2, { message: "This field is required!" }),
    description: z.string().min(2, { message: "This field is required!" }),
    songs: z.array(z.number()),
    artist: z.string().min(1, { message: "This field is required!" }).nullish(),
  })
  .superRefine(({ artist }, ctx) => {
    if (!artist) {
      console.log({ artist });
      ctx.addIssue({
        code: "custom",
        message: "Artist is required!",
        path: ["artist"],
      });
    }
  });

export type EditAlbumFormSchema = z.infer<typeof formSchema>;

export default function AlbumForm({ children }: AlbumFormProps) {
  const { onSubmit, data } = useDrawerTableContext();
  const [artists, setArtists] = useState([]);
  const [songs, setSongs] = useState<Song[]>([]);
  const [search, setSearch] = useState("");
  const album = data as Album | undefined;

  async function getSongs(artistId: string, searchKey: string) {
    if (!artistId) return [];

    const { data } = await axios.get(
      `http://localhost:8000/songs?limit=1000&filterColumn=artist.id&filterValue=${artistId}&searchKey=${searchKey}`
    );

    return data?.data?.data || [];
  }

  useEffect(() => {
    axios.get("http://localhost:8000/artists").then(({ data }) => {
      setArtists(
        data?.data?.data.map((d: Artist) => ({ value: d.id, label: d.name })) ||
          []
      );
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: album?.id || null,
      artist: String(album?.artist.id || "") || null,
      description: album?.description || "",
      name: album?.name || "",
      songs: album?.songs.map((s) => s.id) || [],
    },
  });

  const artistId = form.watch("artist");

  const {
    data: songsData,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["songs", artistId, search],
    queryFn: () => getSongs(artistId || "", search),
  });

  useEffect(() => {
    if (!artistId) return;

    axios
      .get(
        `http://localhost:8000/songs?limit=1000&filterColumn=artist.id&filterValue=${artistId}`
      )
      .then(({ data }) => {
        console.log({ data });
        setSongs(data?.data?.data || []);
      });
  }, [artistId]);

  const currentSongs = form.watch("songs");

  function onSongAdd(id: number) {
    form.setValue("songs", [id, ...currentSongs], { shouldDirty: true });
  }
  function onSongRemove(id: number) {
    form.setValue(
      "songs",
      currentSongs.filter((sId) => sId !== id),
      { shouldDirty: true }
    );
  }

  return (
    <FormWrapper
      form={form}
      onSubmit={(values) => onSubmit?.(values)}
      className="p-4 h-full flex flex-col "
    >
      <div className="flex-1 flex-grow-0 flex flex-col gap-4">
        <FormInput name="name" placeholder="Enter name" label="Name" />
        <FormInput
          name="description"
          placeholder="Enter description"
          label="Description"
        />
        <FormInput
          name="artist"
          label="Artist"
          render={(field) => {
            return (
              <SelectComponent
                data={artists}
                placeholder="Select an artist"
                defaultValue={String(form.watch("artist") || "")}
                onValueChange={(val) => {
                  form.setValue("songs", [], { shouldDirty: true });
                  field.onChange(val);
                }}
              />
            );
          }}
        />
        <FormInput
          name=""
          label="Search songs"
          render={(field) => {
            return (
              <Input
                value={search}
                onChange={(e) => setSearch(e.currentTarget.value)}
              />
            );
          }}
        />
        <FormLabel>Songs</FormLabel>

        <div className="min-h-[200px] max-h-[200px] w-full rounded-lg border overflow-y-auto flex flex-col p-1">
          {(songsData || [])
            .filter((s: Song) => !currentSongs.includes(s.id))
            .map((s: Song) => {
              return (
                <div
                  onClick={() => onSongAdd(s.id)}
                  key={s.id}
                  className="flex items-center gap-1 font-light text-sm w-full rounded-sm hover:bg-pink-100 cursor-pointer p-1"
                >
                  <Music2Icon className="h-5 w-5 text-pink-500" />
                  {s.name}
                </div>
              );
            })}
        </div>

        <FormLabel>Added Songs</FormLabel>

        <div className="min-h-[200px] max-h-[200px] w-full rounded-lg border overflow-y-auto p-4">
          <div className="flex flex-wrap gap-2">
            {currentSongs.map((id) => {
              const songName =
                songs.find((s) => s.id === id)?.name || "Unknown";
              return (
                <Badge
                  onClick={() => onSongRemove(id)}
                  key={id}
                  className="max-w-[120px] h-6 cursor-pointer truncate p-3 bg-pink-300 "
                >
                  {songName}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
      <div className="!mt-auto">
        <DrawerFooter className={"flex flex-row justify-center"}>
          <Button
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
            type="submit"
          >
            Save
          </Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </FormWrapper>
  );
}
