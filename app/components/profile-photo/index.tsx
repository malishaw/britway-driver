import { OurFileRouter } from "@/app/api/uploadthing/core";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@uploadthing/react";
import { User } from "lucide-react";
import React from "react";

interface Props {
  uploadedFiles?: string[];
  onUploadComplete?: (res: string[]) => void;
  //add this to remove the added image clicking by the "X" icon
  onRemoveFile?: (file: string) => void;
  currentImageUrl?: string;
}

export default function ProfilePhoto({
  onRemoveFile,
  onUploadComplete,
  uploadedFiles,
  currentImageUrl,
}: Props) {
  const [isPending, setIsPending] = React.useState(false);

  return (
    <div className="flex flex-col items-center gap-2">
      <UploadButton<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          setIsPending(false);
          onUploadComplete?.(res.map((file) => file.url));
        }}
        onUploadBegin={() => {
          setIsPending(true);
        }}
        className="ut-button:hidden"
        content={{
          button({ ready }) {
            return (
              <div className="cursor-pointer group relative">
                <Avatar className="h-24 w-24 hover:opacity-90 transition-opacity">
                  <AvatarImage src={currentImageUrl} />
                  <AvatarFallback className="bg-muted">
                    {isPending ? (
                      <div className="animate-pulse">Uploading...</div>
                    ) : (
                      <User className="h-12 w-12 text-muted-foreground" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  Change Photo
                </div>
              </div>
            );
          },
        }}
      />
      {currentImageUrl && (
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => onRemoveFile?.(currentImageUrl)}
        >
          Remove photo
        </Button>
      )}
    </div>
  );
}
