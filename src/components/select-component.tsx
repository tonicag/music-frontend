import { FormControl } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ComponentProps } from "react";
import { ControllerRenderProps } from "react-hook-form";

type DataItem = {
  value: string;
  label: string;
};
export type SelectComponentProps = {
  data: DataItem[];
  field: ControllerRenderProps<any>;
} & ComponentProps<typeof Select>;
export default function SelectComponent({ field, data }: SelectComponentProps) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Select a verified email to display" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {data.map((d) => (
          <SelectItem key={d.value} value={d.value}>
            {d.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
