import FormInput from "@/components/form-input";
import FormWrapper from "@/components/form-wrapper";
import SelectComponent from "@/components/select-component";
import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Song } from "@/types/song/song-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type SongFormProps = {
  song?: Song;
};

const formSchema = z.object({
  name: z.string().min(2, { message: "This field is required!" }),
  duration: z.number().min(1, { message: "This field is required!" }),
  artistId: z.number(),
});

export default function SongForm({ song }: SongFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      artistId: song?.artist.id || 0,
      duration: song?.duration || 0,
      name: song?.name || "",
    },
  });

  return (
    <FormWrapper
      form={form}
      onSubmit={(values) => console.log(values)}
      className="p-4 h-full flex flex-col"
    >
      <FormInput name="name" placeholder="Enter name" label="Name" />
      <FormInput
        inputType="numeric"
        name="duration"
        placeholder="Enter duration in seconds"
        label="Duration"
      />
      <FormInput
        name="artistId"
        label="Artist"
        render={(field) => {
          return <SelectComponent field={field} data={[]} />;
        }}
      />
      <div className="!mt-auto">
        <DrawerFooter className={"flex flex-row justify-center"}>
          <Button>Save</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </div>
    </FormWrapper>
  );
}
