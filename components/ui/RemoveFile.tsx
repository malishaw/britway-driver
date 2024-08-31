// RemoveFile.tsx
import React from 'react';
import router from 'next/router';
import { X } from 'lucide-react';

interface RemoveFileProps {
  file: string;
  onSuccess?: () => void;
}

export default function RemoveFile({ file, onSuccess }: RemoveFileProps) {
  const handleRemoveFile = async () => {
    try {
      const response = await fetch(`/api/driver/${file}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Execute onSuccess callback if provided
        onSuccess?.();
        // Optionally, redirect or update the UI
        router.push('/driver/update');
      } else {
        const errorData = await response.json();
        console.error('Failed to remove file:', errorData.message);
      }
    } catch (error) {
      console.error('An error occurred while removing the file:', error);
    }
  };

  return (
    <button 
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      onClick={handleRemoveFile}
    >
      <X size={16} />
    </button>
  );
}
