import FormInput from "@/components/form-input";
import FormWrapper from "@/components/form-wrapper";
import SelectComponent from "@/components/select-component";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Artist } from "@/types/artist/artist-types";
import { Song } from "@/types/song/song-types";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type SongFormProps = {
  song?: Song;
  children?: ReactNode;
  onSubmit: (values: EditSongFormSchema) => void;
};

const formSchema = z
  .object({
    name: z.string().min(2, { message: "This field is required!" }),
    duration: z.string().min(1, { message: "This field is required!" }),
    artistId: z
      .string()
      .min(1, { message: "This field is required!" })
      .nullish(),
  })
  .superRefine(({ artistId }, ctx) => {
    if (!artistId) {
      console.log({ artistId });
      ctx.addIssue({
        code: "custom",
        message: "Artist is required!",
        path: ["artistId"],
      });
    }
  });

export type EditSongFormSchema = z.infer<typeof formSchema>;

export default function SongForm({ song, children, onSubmit }: SongFormProps) {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/artists").then(({ data }) => {
      console.log({ data });
      setArtists(
        data?.data.map((d: Artist) => ({ value: d.id, label: d.name })) || []
      );
    });
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistId: String(song?.artist.id || ""),
      duration: String(song?.duration || ""),
      name: song?.name || "",
    },
  });
  console.log({
    artistId: song?.artist.id || null,
    duration: song?.duration || 0,
    name: song?.name || "",
  });
  return (
    <FormWrapper
      form={form}
      onSubmit={onSubmit}
      className="p-4 h-full flex flex-col"
    >
      <FormInput name="name" placeholder="Enter name" label="Name" />
      <FormInput
        inputType="numeric"
        name="duration"
        label="Duration"
        render={(field) => {
          return (
            <Input
              type="number"
              placeholder="Enter duration in seconds"
              value={form.watch("duration") || ""}
              onChange={field.onChange}
            />
          );
        }}
      />
      <FormInput
        name="artistId"
        label="Artist"
        render={(field) => {
          return (
            <SelectComponent
              data={artists}
              placeholder="Select an artist"
              defaultValue={String(form.watch("artistId") || "")}
              onValueChange={field.onChange}
            />
          );
        }}
      />
      <div className="!mt-auto">{children}</div>
    </FormWrapper>
  );
}
