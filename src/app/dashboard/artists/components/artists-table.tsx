"use client";
import ArtistForm from "@/app/dashboard/artists/components/artist-form";
import SongForm from "@/app/dashboard/songs/components/song-form";
import GenericTableWithActions, {
  ColDefExtension,
} from "@/components/table/generic-table-with-actions";
import { toast } from "@/components/ui/use-toast";
import { Artist } from "@/types/artist/artist-types";
import { Song } from "@/types/song/song-types";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import { useMemo } from "react";

export function ArtistsTable() {
  const colDefs = useMemo<ColDefExtension<Artist>[]>(
    () => [
      { field: "id", headerName: "", sortable: true, openDialogOnClick: true },
      {
        field: "name",
        headerName: "Name",
        sortable: true,
        openDialogOnClick: true,
      },
      {
        field: "age",
        headerName: "Artist",
        sortable: true,
        openDialogOnClick: true,
      },
    ],
    []
  );

  async function deleteSong(id: number) {
    try {
      await axios.delete(`http://localhost:8000/artists/${id}`);

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
      if (!isEdit) {
        const { data: result } = await axios.post(
          "http://localhost:8000/artists",
          values
        );

        toast({ title: "Song added succesfully!", variant: "default" });
        return result?.data;
      } else {
        const { data: result } = await axios.put(
          `http://localhost:8000/artists/${values.id}`,
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
      url={"http://localhost:8000/artists"}
      colDefs={colDefs}
      onDelete={deleteSong}
      onSubmit={handleSubmit}
      addNewButtonText="Add new artist"
      pageTitle="Artists"
      pageDescription="Manage your artists."
      formComponent={ArtistForm}
      drawerConfig={{
        drawerDescriptionCreate: "Enter the details of your artist!",
        drawerDescriptionEdit: "Enter the updated details of your artist!",
        drawerTitleCreate: "Add new artist",
        drawerTitleEdit: "Edit your artist",
      }}
    />
  );
}
