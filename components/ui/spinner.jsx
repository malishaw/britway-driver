// app/components/ui/spinner.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';

const Spinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`relative ${sizeClasses[size]} flex items-center justify-center`}>
      <Loader2 className={`animate-spin ${sizeClasses[size]}`} />
    </div>
  );
};

export default Spinner;
