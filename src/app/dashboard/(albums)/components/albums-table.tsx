"use client";
import AlbumForm from "@/app/dashboard/(albums)/components/album-form";
import ArtistForm from "@/app/dashboard/artists/components/artist-form";
import SongForm from "@/app/dashboard/songs/components/song-form";
import GenericTableWithActions, {
  ColDefExtension,
} from "@/components/table/generic-table-with-actions";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { Album } from "@/types/album/album-types";
import { Artist } from "@/types/artist/artist-types";
import { Song } from "@/types/song/song-types";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import { useMemo } from "react";

export function AlbumsTable() {
  const colDefs = useMemo<ColDefExtension<Album>[]>(
    () => [
      { field: "id", headerName: "", sortable: true, openDialogOnClick: true },
      {
        field: "name",
        headerName: "Name",
        sortable: true,
        openDialogOnClick: true,
      },
      {
        field: "description",
        headerName: "Description",
        sortable: true,
        openDialogOnClick: true,
      },
      {
        field: "songs",
        headerName: "Description",
        width: 300,
        minWidth: 300,
        sortable: true,
        openDialogOnClick: true,
        cellRenderer: ({ data }: { data: Album }) => {
          return (
            <div className="flex gap-1 items-center h-full flex-wrap">
              {data.songs.map((s) => (
                <Badge key={s.id}>{s.name}</Badge>
              ))}
              {data.songs.map((s) => (
                <Badge key={s.id}>{s.name}</Badge>
              ))}
            </div>
          );
        },
      },
    ],
    []
  );

  async function deleteSong(id: number) {
    try {
      await axios.delete(`http://localhost:8000/albums/${id}`);

      toast({ title: "Song delted succesfully!", variant: "default" });

      return true;
    } catch (e) {
      toast({
        title: "There was a problem deleting the song!",
        variant: "destructive",
      });
    }

    return false;
  }

  async function handleSubmit(values: any, isEdit: boolean) {
    try {
      console.log({ album: values });
      if (!values.id) {
        const { data: result } = await axios.post(
          "http://localhost:8000/albums",
          values
        );

        toast({ title: "Song added succesfully!", variant: "default" });
        return result?.data;
      } else {
        const { data: result } = await axios.put(
          `http://localhost:8000/albums/${values.id}`,
          values
        );

        toast({ title: "Song updated succesfully!", variant: "default" });
        return result?.data;
      }
    } catch (e) {
      return null;
    }
  }

  return (
    <GenericTableWithActions
      url={"http://localhost:8000/albums"}
      colDefs={colDefs}
      onDelete={deleteSong}
      onSubmit={handleSubmit}
      addNewButtonText="Add new album"
      pageTitle="Albums"
      pageDescription="Manage your albums."
      formComponent={AlbumForm}
      drawerConfig={{
        drawerDescriptionCreate: "Enter the details of your album!",
        drawerDescriptionEdit: "Enter the updated details of your album!",
        drawerTitleCreate: "Add new album",
        drawerTitleEdit: "Edit your album",
      }}
      tableProps={{ rowHeight: 80 }}
    />
  );
}
