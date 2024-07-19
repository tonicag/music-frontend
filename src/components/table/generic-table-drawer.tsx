import { useDrawerTableContext } from "@/app/dashboard/songs/contexts/DrawerTableContextProvider";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode } from "react";

export type DrawerConfig = {
  drawerTitleEdit?: string;
  drawerTitleCreate?: string;
  drawerDescriptionEdit?: string;
  drawerDescriptionCreate?: string;
};

export type GenericTableDrawer = {
  children?: ReactNode;
  formComponent?: React.ComponentType<any>;
  drawerConfig?: DrawerConfig;
};

export function GenericTableDrawer({
  formComponent,
  drawerConfig,
  ...props
}: GenericTableDrawer) {
  const { open, setOpen, data } = useDrawerTableContext();

  const FormComponent = formComponent;
  return (
    <Drawer direction="right" open={open} onOpenChange={(val) => setOpen(val)}>
      <DrawerTrigger>{props.children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-pink-500">
            {data
              ? drawerConfig?.drawerTitleEdit
              : drawerConfig?.drawerTitleCreate}
          </DrawerTitle>
          <DrawerDescription>
            {data
              ? drawerConfig?.drawerDescriptionEdit
              : drawerConfig?.drawerDescriptionCreate}
          </DrawerDescription>
        </DrawerHeader>
        {FormComponent && <FormComponent />}
        {/* <SongForm /> */}
      </DrawerContent>
    </Drawer>
  );
}
