import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

export type FormWrapperProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  onSubmit: (values: any) => void;
  children?: ReactNode;
  className?: string;
};

export default function FormWrapper<T extends FieldValues>({
  form,
  onSubmit,
  children,
  className,
}: FormWrapperProps<T>) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-8", className)}
      >
        {children}
      </form>
    </Form>
  );
}
