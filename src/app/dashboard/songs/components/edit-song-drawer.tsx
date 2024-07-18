import SongForm from "@/app/dashboard/songs/components/song-form";
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
import { Song } from "@/types/song/song-types";
import { ReactNode } from "react";

type EditSongDrawerProps = {
  children?: ReactNode;
  data?: Song;
};

export default function EditSongDrawer(props: EditSongDrawerProps) {
  return (
    <Drawer direction="right">
      <DrawerTrigger>{props.children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-pink-500">
            {props.data ? "Edit song" : "Add new song"}
          </DrawerTitle>
          <DrawerDescription>
            {props.data
              ? "Update your song's details"
              : "Enter your song's details."}
          </DrawerDescription>
        </DrawerHeader>
        <SongForm />
      </DrawerContent>
    </Drawer>
  );
}
