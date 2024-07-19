"use client";
import DeleteDialog from "@/app/dashboard/songs/components/delete-dialog";
import EditSongDrawer from "@/app/dashboard/songs/components/edit-song-drawer";
import DrawerTableContextProvider from "@/app/dashboard/songs/contexts/DrawerTableContextProvider";
import { Button } from "@/components/ui/button";
import { Song } from "@/types/song/song-types";
import { CellClickedEvent, ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact, AgGridReactProps } from "ag-grid-react";
import axios from "axios";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export type ColDefExtension<T> = { openDialogOnClick?: boolean } & ColDef<T>;

type Model = { id: number };

export type GenericTableWithActionsProps<T extends Model> = {
  colDefs: ColDefExtension<T>[];
  pageTitle?: string;
  pageDescription?: string;
  onDelete?: (id: number) => void;
  onSubmit?: (values: any, isEdit: boolean) => Promise<T | null>;
  addNewButtonText?: string;
  tableProps?: AgGridReactProps<T>;
  url?: string;
};

export default function GenericTableWithActions<T extends Model>({
  tableProps,
  pageTitle,
  colDefs,
  onDelete,
  onSubmit,
  pageDescription,
  url,
  addNewButtonText,
}: GenericTableWithActionsProps<T>) {
  const [rows, setRows] = useState<T[]>([]);
  const gridRef = useRef<AgGridReact>(null);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<T | undefined>(undefined);

  async function handleSubmit(values: any) {
    const isEdit = !!values.id;
    const result = (await onSubmit?.(values, isEdit)) || {};

    setOpen(false);
    setData(undefined);

    if (!result) {
      return;
    }
    if (isEdit) {
      setRows((prevRows) =>
        prevRows.map((item) =>
          item.id === values.id ? { ...item, ...result } : item
        )
      );
    } else {
      setRows((prevRows) => [{ ...(result as T) }, ...prevRows]);
    }
  }

  useEffect(() => {
    if (!open) {
      setData(undefined);
    }
  }, [open]);

  useEffect(() => {
    if (!url) {
      return;
    }

    axios.get(url).then(({ data }) => {
      const rows = data?.data?.data;
      setRows(rows || []);
    });
  }, [url]);

  function updateTable() {
    if (!url) {
      return;
    }
    axios.get(url).then(({ data }) => {
      const rows = data?.data?.data;
      setRows(rows || []);
    });
  }

  const extendedColDefs = useMemo(
    () =>
      [
        ...colDefs.map((c) => ({
          ...c,
          onCellClicked: c.openDialogOnClick ? onCellClicked : undefined,
        })),
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
                    onDelete?.(data.id);
                    setRows((prevRows) =>
                      prevRows.filter((song) => song.id !== data.id)
                    );
                    updateTable();
                  }}
                >
                  <Trash2Icon className="h-5 w-5 text-pink-300 group-hover:text-pink-600" />
                </DeleteDialog>
              </div>
            );
          },
        },
      ] as unknown as ColDef<T>[],
    [colDefs]
  );

  function onCellClicked(event: CellClickedEvent) {
    setData(event?.data);
    setOpen(true);
  }

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
            <p>{pageTitle || ""}</p>
            <p className="text-sm text-gray-500">{pageDescription || ""}</p>
          </div>
          <EditSongDrawer>
            <Button
              variant={"outline"}
              size={"sm"}
              className="text-[14px] text-pink-500 hover:text-pink-600 border-pink-100 hover:bg-gray-25"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              {addNewButtonText || ""}
            </Button>
          </EditSongDrawer>
        </div>

        <div className="flex-1 mt-10">
          <AgGridReact<T>
            ref={gridRef}
            className="ag-theme-quartz"
            columnDefs={extendedColDefs}
            rowClass={"cursor-pointer"}
            rowData={rows}
            onGridReady={() => {
              if (gridRef.current) {
                gridRef.current.api.sizeColumnsToFit();
              }
            }}
            {...tableProps}
          />
        </div>
      </div>
    </DrawerTableContextProvider>
  );
}
