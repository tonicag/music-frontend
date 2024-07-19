import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";

type DeleteDialogProps = {
  title?: string;
  description?: string;
  onSuccess?: () => void;
  className?: string;
  children: ReactNode;
};

export default function DeleteDialog({
  children,
  title,
  onSuccess,
  description,
  className,
}: DeleteDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent className={className}>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || "Are you absolutely sure?"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description || "This action cannot be undone."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onSuccess?.()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
