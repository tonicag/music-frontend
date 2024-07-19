"use client";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { Song } from "@/types/song/song-types";
import { CellClickedEvent, ColDef } from "ag-grid-community";
import { Button } from "@/components/ui/button";
import {
  DeleteIcon,
  PlusIcon,
  Trash,
  Trash2Icon,
  TrashIcon,
} from "lucide-react";
import EditSongDrawer from "@/app/dashboard/songs/components/edit-song-drawer";
import axios from "axios";
import { EditSongFormSchema } from "@/app/dashboard/songs/components/song-form";
import { toast } from "@/components/ui/use-toast";
import DrawerTableContextProvider from "@/app/dashboard/songs/contexts/DrawerTableContextProvider";
import DeleteDialog from "@/app/dashboard/songs/components/delete-dialog";

type ColDefExtension<T> = {};

export default function SongsTable() {
  const [songs, setSongs] = useState<Song[]>([]);
  const gridRef = useRef<AgGridReact>(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<Song | undefined>(undefined);

  async function handleSubmit(values: EditSongFormSchema) {
    try {
      if (!values.id) {
        const result = await axios.post("http://localhost:8000/songs", values);

        toast({ title: "Song added succesfully!", variant: "default" });
      } else {
        const { data: result } = await axios.put(
          `http://localhost:8000/songs/${values.id}`,

          values
        );

        setSongs((prevSongs) =>
          prevSongs.map((song) =>
            song.id === values.id ? { ...song, ...result?.data } : song
          )
        );

        toast({ title: "Song updated succesfully!", variant: "default" });
      }
    } catch (e) {
    } finally {
      setOpen(false);
      setData(undefined);
    }
  }

  useEffect(() => {
    if (!open) {
      setData(undefined);
    }
  }, [open]);

  async function deleteSong(id: number) {
    try {
      await axios.delete(`http://localhost:8000/songs/${id}`);
      toast({ title: "Song delted succesfully!", variant: "default" });

      setSongs((prevSongs) => prevSongs.filter((song) => song.id !== id));
    } catch (e) {
      toast({
        title: "There was a problem deleting the song!",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    axios.get("http://localhost:8000/songs").then(({ data }) => {
      const songs = data?.data?.data;
      setSongs(songs || []);
    });
  }, []);

  function onCellClicked(event: CellClickedEvent) {
    setData(event?.data);
    setOpen(true);
  }

  const colDefs = useMemo<ColDef<Song>[]>(
    () => [
      { field: "id", headerName: "", sortable: true, onCellClicked },
      { field: "name", headerName: "Name", sortable: true, onCellClicked },
      {
        field: "artist.name",
        headerName: "Artist",
        sortable: true,
        onCellClicked,
      },
      {
        field: "id",
        headerName: "",
        sortable: true,
        width: 40,
        maxWidth: 40,
        minWidth: 40,
        resizable: false,
        suppressMovable: false,
        cellClass: "!p-0 flex justify-center items-center",
        cellRenderer: ({ data }: { data: Song }) => {
          return (
            <div className="group w-full h-full flex items-center justify-center">
              <DeleteDialog
                className=""
                onSuccess={() => {
                  deleteSong(data.id);
                }}
              >
                <Trash2Icon className="h-5 w-5 text-pink-300 group-hover:text-pink-600" />
              </DeleteDialog>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <DrawerTableContextProvider
      open={open}
      setOpen={setOpen}
      data={data}
      onSubmit={handleSubmit}
    >
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
            ref={gridRef}
            className="ag-theme-quartz"
            columnDefs={colDefs}
            rowClass={"cursor-pointer"}
            rowData={songs}
            onGridReady={() => {
              if (gridRef.current) {
                gridRef.current.api.sizeColumnsToFit();
              }
            }}
          />
        </div>
      </div>
    </DrawerTableContextProvider>
  );
}
