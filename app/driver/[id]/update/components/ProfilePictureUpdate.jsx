import { FC } from 'react';
import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import FileUpload from "@/app/components/file-upload";
import { Control } from 'react-hook-form';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Image from 'next/image';


export const ProfilePictureUpdate = ({ control, currentPicture, userName }) => {
  return (
    <FormField
      name="profilePicture"
      control={control}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Update Profile Picture</FormLabel>
          <Avatar className="w-24 h-24 mb-4">
            <AvatarImage src={field.value || currentPicture} alt="Profile picture" />
            <AvatarFallback>
  {field.value || currentPicture ? (
    <Image src={field.value || currentPicture} alt="Profile picture" width={96} height={96} />
  ) : (
    userName?.substring(0, 2).toUpperCase() || 'NA'
  )}
</AvatarFallback>

          </Avatar>
          <FileUpload
            uploadedFiles={field.value ? [field.value] : undefined}
            onUploadComplete={(files) => field.onChange(files[0])}
          />
          <FormDescription>Update your profile picture (max 4MB)</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};