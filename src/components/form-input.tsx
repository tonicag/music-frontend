import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldValues, Path, useFormContext } from "react-hook-form";

export type FormInputProps<T> = {
  name: Path<T>;
  placeholder?: string;
  label?: string;
  description?: string;
  className?: string;
  inputType?: string;
};
export default function FormInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  className,
  inputType,
}: FormInputProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField<T>
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type={inputType || "text"}
              placeholder={placeholder}
              {...field}
              className={cn("", className)}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
