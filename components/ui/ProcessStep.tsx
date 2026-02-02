import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import React from 'react';

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  icon?: LucideIcon | React.ComponentType<{ className?: string }>;
  isLast?: boolean;
}

export default function ProcessStep({
  number,
  title,
  description,
  icon: Icon,
  isLast = false,
}: ProcessStepProps) {
  return (
    <div className="relative flex flex-col items-center text-center">
      {/* Step Number Circle */}
      <div
        className={cn(
          'relative z-10 flex items-center justify-center',
          'w-16 h-16 md:w-20 md:h-20',
          'rounded-full bg-primary text-white',
          'text-2xl md:text-3xl font-bold',
          'shadow-lg'
        )}
      >
        {Icon ? <Icon className="w-8 h-8 md:w-10 md:h-10" /> : number}
      </div>

      {/* Connecting Line (except for last step) */}
      {!isLast && (
        <div className="absolute top-8 md:top-10 start-1/2 w-full h-0.5 bg-primary hidden md:block" />
      )}

      {/* Content */}
      <div className="mt-4 space-y-2">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-900 dark:text-gray-300 max-w-xs">
          {description}
        </p>
      </div>
    </div>
  );
}
