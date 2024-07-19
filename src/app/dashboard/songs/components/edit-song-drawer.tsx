import SongForm, {
  EditSongFormSchema,
} from "@/app/dashboard/songs/components/song-form";
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
import { ReactNode, useState } from "react";

type EditSongDrawerProps = {
  children?: ReactNode;
  data?: Song;
};

export default function EditSongDrawer(props: EditSongDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleSubmit(values: EditSongFormSchema) {
    try {
      setLoading(true);
      const data = await axios.post("http://localhost:8000/songs", {
        ...values,
        artistId: values.artistId,
      });
      toast({ title: "Song added succesfully!", variant: "default" });
      setOpen(false);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <Drawer direction="right" open={open} onOpenChange={(val) => setOpen(val)}>
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
        <SongForm onSubmit={handleSubmit}>
          <DrawerFooter className={"flex flex-row justify-center"}>
            <Button loading={loading} disabled={loading}>
              Save
            </Button>
            <DrawerClose>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </SongForm>
      </DrawerContent>
    </Drawer>
  );
}
