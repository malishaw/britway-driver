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

export interface IConfirmationDialogProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onDecline?: () => void;
  open: boolean;
  negativeText?: string;
  positiveText?: string;
}

const ConfirmationDialog: FC<IConfirmationDialogProps> = ({
  title,
  description,
  onConfirm,
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
          <AlertDialogCancel onClick={onDecline}>{negativeText}</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>{positiveText}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationDialog;
