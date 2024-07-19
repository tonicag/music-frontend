import SongForm, {
  EditSongFormSchema,
} from "@/app/dashboard/songs/components/song-form";
import { useDrawerTableContext } from "@/app/dashboard/songs/contexts/DrawerTableContextProvider";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { toast } from "@/components/ui/use-toast";
import { Song } from "@/types/song/song-types";
import axios from "axios";
import { CalendarCheck } from "lucide-react";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";

type EditSongDrawerProps = {
  children?: ReactNode;
};

export default function EditSongDrawer({ ...props }: EditSongDrawerProps) {
  const { open, setOpen, data } = useDrawerTableContext();
  return (
    <Drawer direction="right" open={open} onOpenChange={(val) => setOpen(val)}>
      <DrawerTrigger>{props.children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-pink-500">
            {data ? "Edit song" : "Add new song"}
          </DrawerTitle>
          <DrawerDescription>
            {data ? "Update your song's details" : "Enter your song's details."}
          </DrawerDescription>
        </DrawerHeader>
        <SongForm />
      </DrawerContent>
    </Drawer>
  );
}
