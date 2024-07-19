import { useDrawerTableContext } from "@/app/dashboard/songs/contexts/DrawerTableContextProvider";
import FormInput from "@/components/form-input";
import FormWrapper from "@/components/form-wrapper";
import SelectComponent from "@/components/select-component";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { ReactNode, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type ArtistFormProps = {
  children?: ReactNode;
};

const formSchema = z.object({});

export type EditArtistFormSchema = z.infer<typeof formSchema>;

export default function ArtistForm({ children }: ArtistFormProps) {
  const { onSubmit, data: song } = useDrawerTableContext();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  return (
    <FormWrapper
      form={form}
      onSubmit={(values) => onSubmit?.(values)}
      className="p-4 h-full flex flex-col"
    >
      <div className="!mt-auto">
        <DrawerFooter className={"flex flex-row justify-center"}>
          <Button
            disabled={form.formState.isSubmitting}
            loading={form.formState.isSubmitting}
            type="submit"
          >
            Save
          </Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </FormWrapper>
  );
}
