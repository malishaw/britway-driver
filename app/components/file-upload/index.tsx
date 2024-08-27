import React from "react";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@uploadthing/react";
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

interface Props {
  uploadedFiles?: string[];
  onUploadComplete?: (res: string[]) => void;
}

export default function FileUpload({ uploadedFiles, onUploadComplete }: Props) {
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
          <li key={file} className="p-5 bg-slate-100 rounded-md ">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <div className="flex gap-0 items-center cursor-pointer">
                  <div className="row-span-2 w-24 h-10">
                    {file.startsWith("image") ? (
                      <Image
                        src={file}
                        alt="preview"
                        width={96}
                        height={96}
                        className="object-cover w-24 h-24 rounded "
                      />
                    ) : (
                      <FileIcon className="w-8 h-8 text-slate-500 text-center items-center " />
                    )}
                  </div>
                  <span className="text-sm font-semibold truncate text-slate-800 ">
                    {file}
                  </span>
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent className="w-[90vw] max-w-[800px] h-[80vh] max-h-[600px] flex flex-col sm:w-[80vw] md:w-[70vw] lg:w-[60vw]">
              <AlertDialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
  <AlertDialogCancel className="w-full sm:w-auto">Close</AlertDialogCancel>
  <div className="flex flex-col sm:flex-row gap-2">
    <AlertDialogAction 
      className="w-full sm:w-auto"
      onClick={() => window.open(file, '_blank')}
    >
      Open in New Tab
    </AlertDialogAction>
    <AlertDialogAction asChild className="w-full sm:w-auto">
      <a
        href={file}
        download
        onClick={(e) => {
          e.preventDefault();
          fetch(file)
            .then(response => response.blob())
            .then(blob => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = url;
              a.download = file.split('/').pop() || 'download';
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
            });
        }}
      >
        Download
      </a>
    </AlertDialogAction>
  </div>
</AlertDialogFooter>

                <AlertDialogTitle className="text-center text-white">File Preview</AlertDialogTitle>
                <AlertDialogDescription className="flex-grow flex justify-center items-center ">
  <div className="w-full h-full flex justify-center items-center p-16 pt-0 pb-0">
    {file.startsWith("image") ? (
      <Image
        src={file}
        alt="preview"
        width={800}
        height={600}
        className="object-contain max-w-full max-h-full"
      />
    ) : (
      <iframe src={file} className="w-full h-full" />
    )}
  </div>
</AlertDialogDescription>

                {/* <AlertDialogHeader>
                  
                </AlertDialogHeader> */}
              </AlertDialogContent>
            </AlertDialog>
          </li>
        ))}
      </ul>
    </div>
  );
}
