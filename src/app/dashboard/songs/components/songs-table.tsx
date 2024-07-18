"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useMemo } from "react";
import { Song } from "@/types/song/song-types";
import { ColDef } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import EditSongDrawer from "@/app/dashboard/songs/components/edit-song-drawer";

export default function SongsTable() {
  const colDefs = useMemo<ColDef<Song>[]>(
    () => [
      { field: "id", headerName: "", sortable: true },
      { field: "name", headerName: "Name", sortable: true },
      {
        field: "artist.name",
        headerName: "Artist",
        sortable: true,
      },
    ],
    []
  );

  return (
    <div className="w-full min-h-full max-h-screen flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <p>Songs</p>
          <p className="text-sm text-gray-500">Manage your songs.</p>
        </div>
        <EditSongDrawer>
          <Button
            variant={"outline"}
            size={"sm"}
            className="text-[14px] text-pink-500 hover:text-pink-600 border-pink-100 hover:bg-gray-25"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add new song
          </Button>
        </EditSongDrawer>
      </div>

      <div className="flex-1 mt-10">
        <AgGridReact
          className="ag-theme-quartz"
          columnDefs={colDefs}
          rowData={[]}
        />
      </div>
    </div>
  );
}
