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
  placeholder?: string;
} & ComponentProps<typeof Select>;
export default function SelectComponent({
  data,
  placeholder,
  ...restProps
}: SelectComponentProps) {
  return (
    <Select {...restProps}>
      <FormControl>
        <SelectTrigger>
          <SelectValue
            placeholder={placeholder || "Select a verified email to display"}
          />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {data.map((d) => (
          <SelectItem key={d.value} value={String(d.value)}>
            {d.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
