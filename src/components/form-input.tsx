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
import { ReactNode } from "react";
import {
  ControllerProps,
  ControllerRenderProps,
  FieldValues,
  Path,
  useFormContext,
} from "react-hook-form";

export type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  placeholder?: string;
  label?: string;
  description?: string;
  className?: string;
  inputType?: string;
  render?: (field: ControllerRenderProps<T, Path<T>>) => ReactNode;
};

export default function FormInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  description,
  className,
  inputType,
  render,
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
            {render ? (
              render(field)
            ) : (
              <Input
                type={inputType || "text"}
                placeholder={placeholder}
                {...field}
                className={cn("", className)}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
