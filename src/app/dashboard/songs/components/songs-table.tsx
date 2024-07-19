"use client";
import SongForm from "@/app/dashboard/songs/components/song-form";
import GenericTableWithActions, {
  ColDefExtension,
} from "@/components/table/generic-table-with-actions";
import { toast } from "@/components/ui/use-toast";
import { Song } from "@/types/song/song-types";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import { useMemo } from "react";

export function SongsTable() {
  const colDefs = useMemo<ColDefExtension<Song>[]>(
    () => [
      { field: "id", headerName: "", sortable: true, openDialogOnClick: true },
      {
        field: "name",
        headerName: "Name",
        sortable: true,
        openDialogOnClick: true,
      },
      {
        field: "artist.name",
        headerName: "Artist",
        sortable: true,
        openDialogOnClick: true,
      },
    ],
    []
  );

  async function deleteSong(id: number) {
    try {
      await axios.delete(`http://localhost:8000/songs/${id}`);

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
          "http://localhost:8000/songs",
          values
        );

        toast({ title: "Song added succesfully!", variant: "default" });
        return result?.data;
      } else {
        const { data: result } = await axios.put(
          `http://localhost:8000/songs/${values.id}`,
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
      url={"http://localhost:8000/songs"}
      colDefs={colDefs}
      onDelete={deleteSong}
      onSubmit={handleSubmit}
      addNewButtonText="Add new song"
      pageTitle="Songs"
      pageDescription="Manage your songs."
      formComponent={SongForm}
      drawerConfig={{
        drawerDescriptionCreate: "Enter the details of your song!",
        drawerDescriptionEdit: "Enter the updated details of your song!",
        drawerTitleCreate: "Add new song",
        drawerTitleEdit: "Edit your song",
      }}
    />
  );
}
