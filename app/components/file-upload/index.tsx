import React from "react";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";


interface Props {
  uploadedFiles?: string[];
  onUploadComplete?: (res: string[]) => void;
}

export default function FileUpload({ uploadedFiles, onUploadComplete }: Props) {
  const handleFileClick = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  return (
    <div>
      <UploadDropzone<OurFileRouter, "imageUploader">
        endpoint="imageUploader"
        onClientUploadComplete={res => {
          onUploadComplete?.(res.map(file => file.url))
        }}
      />

      <ul className="mt-5 flex flex-col gap-2">
        {uploadedFiles?.map((file, i) => (
          <li key={file} className="p-5 bg-slate-100 rounded-md" onClick={() => handleFileClick(file)}>
            <div className="flex gap-5 items-center">
              <div className="row-span-2 w-24 h-24">
                {file.startsWith("image") ? (
                  <Image
                    src={file}
                    alt="preview"
                    width={96}
                    height={96}
                    className="object-cover w-24 h-24 rounded"
                  />
                ) : (
                  <FileIcon className="w-24 h-24 text-slate-500" />
                )}
              </div>
              <span className="text-lg font-semibold truncate text-slate-800">
                {file}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
