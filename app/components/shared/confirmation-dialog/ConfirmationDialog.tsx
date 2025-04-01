import { Button } from "@/components/ui/button";
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
} from "./CommunicationDialogShadCn";
import { FC } from "react";
import { Loader2 } from "lucide-react";

export interface IConfirmationDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  isLoading?: boolean;
  onDecline?: () => void;
  open: boolean;
  negativeText?: string;
  positiveText?: string;
}

const ConfirmationDialog: FC<IConfirmationDialogProps> = ({
  title,
  description,
  onConfirm,
  isLoading,
  onDecline,
  open,
  negativeText = "Cancel",
  positiveText = "Confirm",
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDecline}>
            {negativeText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {isLoading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            {positiveText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
