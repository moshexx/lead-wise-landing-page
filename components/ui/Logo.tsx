'use client';

import { cn } from '@/lib/utils';

interface LogoProps {
  variant?: 'primary' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Logo({ variant = 'primary', size = 'md', className }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16',
  };

  const textColorClasses = {
    primary: 'text-primary',
    light: 'text-white',
    dark: 'text-gray-900',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* LW Icon with upward arrow */}
      <svg
        className={cn(sizeClasses[size], 'w-auto')}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* L letter */}
        <path
          d="M15 15 L15 75 L40 75"
          stroke="#1e3a8a"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* W letter with upward trend */}
        <path
          d="M35 65 L45 75 L55 55 L65 70 L75 25"
          stroke="#059669"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Arrow head */}
        <path
          d="M75 25 L68 33 M75 25 L67 30"
          stroke="#059669"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* LeadWise Text */}
      <div className="flex flex-col leading-tight">
        <div className={cn('font-bold', textColorClasses[variant])}>
          <span className="text-[#1e3a8a]">Lead</span>
          <span className="text-[#059669]">Wise</span>
        </div>
        <div className={cn('text-[10px] opacity-80', textColorClasses[variant])}>
          המערכת שהופכת לידים לפגישות
        </div>
      </div>
    </div>
  );
}

// Icon-only version for places where we need just the visual
export function LogoIcon({ size = 'md', className }: { size?: 'sm' | 'md' | 'lg' | 'xl'; className?: string }) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
  };

  return (
    <svg
      className={cn(sizeClasses[size], className)}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* L letter */}
      <path
        d="M15 15 L15 75 L40 75"
        stroke="#1e3a8a"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* W letter with upward trend */}
      <path
        d="M35 65 L45 75 L55 55 L65 70 L75 25"
        stroke="#059669"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Arrow head */}
      <path
        d="M75 25 L68 33 M75 25 L67 30"
        stroke="#059669"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// Process icons from the illustrative logo
export function ProcessIcons() {
  return {
    Magnet: ({ className }: { className?: string }) => (
      <svg className={cn('w-16 h-16', className)} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Magnet shape */}
        <path
          d="M30 20 L30 50 Q30 70 50 70 Q70 70 70 50 L70 20"
          stroke="#1e3a8a"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <rect x="25" y="15" width="15" height="20" fill="#3b82f6" rx="2" />
        <rect x="60" y="15" width="15" height="20" fill="#059669" rx="2" />

        {/* Lead icons (people) */}
        <circle cx="40" cy="75" r="3" fill="#f97316" />
        <circle cx="50" cy="78" r="3" fill="#3b82f6" />
        <circle cx="60" cy="76" r="3" fill="#059669" />
        <circle cx="45" cy="82" r="3" fill="#f97316" opacity="0.7" />
        <circle cx="55" cy="80" r="3" fill="#3b82f6" opacity="0.7" />
      </svg>
    ),

    Funnel: ({ className }: { className?: string }) => (
      <svg className={cn('w-16 h-16', className)} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Funnel shape */}
        <path
          d="M20 20 L80 20 L60 60 L40 60 Z"
          fill="#3b82f6"
          opacity="0.3"
        />
        <path
          d="M40 60 L35 85 L65 85 L60 60"
          fill="#059669"
          opacity="0.5"
        />
        <path
          d="M20 20 L80 20 L60 60 L40 60 Z M40 60 L35 85 L65 85 L60 60"
          stroke="#1e3a8a"
          strokeWidth="3"
          fill="none"
        />
        {/* Dots flowing through */}
        <circle cx="50" cy="30" r="2.5" fill="#1e3a8a" />
        <circle cx="50" cy="45" r="2.5" fill="#1e3a8a" />
        <circle cx="50" cy="70" r="2.5" fill="#059669" />
      </svg>
    ),

    Meeting: ({ className }: { className?: string }) => (
      <svg className={cn('w-16 h-16', className)} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Calendar */}
        <rect x="20" y="25" width="35" height="45" rx="4" fill="white" stroke="#1e3a8a" strokeWidth="3" />
        <rect x="20" y="25" width="35" height="10" rx="4" fill="#3b82f6" />
        <path d="M28 35 L28 38 M35 35 L35 38 M42 35 L42 38 M47 35 L47 38" stroke="#1e3a8a" strokeWidth="2" />

        {/* Checkmark */}
        <path d="M28 50 L33 55 L43 42" stroke="#059669" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Two people shaking hands */}
        <circle cx="62" cy="45" r="8" fill="#3b82f6" />
        <path d="M62 53 L62 70" stroke="#3b82f6" strokeWidth="5" strokeLinecap="round" />

        <circle cx="78" cy="45" r="8" fill="#059669" />
        <path d="M78 53 L78 70" stroke="#059669" strokeWidth="5" strokeLinecap="round" />

        {/* Handshake connection */}
        <path d="M58 58 L82 58" stroke="#1e3a8a" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  };
}
