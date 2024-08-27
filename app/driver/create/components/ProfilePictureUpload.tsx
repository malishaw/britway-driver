import { FC } from 'react';
import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import FileUpload from "@/app/components/file-upload";
import { Control } from 'react-hook-form';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';


const formSchema = z.object({
    file: z.string(),
    profilePicture: z.string(),
  });
  type FormType = z.infer<typeof formSchema>;
interface ProfilePictureUploadProps {
  control: Control<any>;
}

export const ProfilePictureUpload: FC<ProfilePictureUploadProps> = ({ control }) => {
    const form = useForm<FormType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          file: "",
          profilePicture: "",
        },
      });

  return (
    <FormField
      name="profilePicture"
      control={form.control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Profile Picture</FormLabel>
          <FileUpload
                  uploadedFiles={field.value ? [field.value] : undefined}
                  onUploadComplete={(files) => field.onChange(files[0])}
                />
          <FormDescription>Upload a profile picture (max 4MB)</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
