'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Flame } from 'lucide-react';

interface CountdownTimerProps {
  deadline: string; // ISO date string
  showIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'urgent' | 'minimal';
  label?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

export default function CountdownTimer({
  deadline,
  showIcon = true,
  size = 'md',
  variant = 'default',
  label,
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    total: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const calculateTimeLeft = (): TimeLeft => {
      const now = new Date().getTime();
      const target = new Date(deadline).getTime();
      const difference = target - now;

      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        total: difference,
      };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // Auto-cleanup when timer expires
      if (newTimeLeft.total <= 0) {
        clearInterval(timer);
      }
    }, 1000);

    // Critical cleanup: clear interval when deadline changes or component unmounts
    return () => {
      clearInterval(timer);
    };
  }, [deadline, mounted]);

  if (!mounted) {
    // Prevent hydration mismatch by showing placeholder during SSR
    return (
      <div className="flex items-center gap-2 opacity-0">
        <div className="w-16 h-10 bg-gray-200 rounded animate-pulse" />
      </div>
    );
  }

  if (timeLeft.total <= 0) {
    return null; // Timer expired
  }

  const sizeClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-xl md:text-3xl',
  };

  const digitSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-2xl md:text-4xl',
  };

  const isUrgent = timeLeft.total < 24 * 60 * 60 * 1000; // Less than 24 hours

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center gap-3"
    >
      {/* Label */}
      {label && (
        <div className="flex items-center gap-2 text-white/90">
          {showIcon && (
            <motion.div
              animate={isUrgent ? { scale: [1, 1.2, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {isUrgent ? (
                <Flame className="w-5 h-5 text-orange-400" />
              ) : (
                <Clock className="w-5 h-5" />
              )}
            </motion.div>
          )}
          <span className={`font-medium ${sizeClasses[size]}`}>{label}</span>
        </div>
      )}

      {/* Timer Display */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Seconds */}
        <TimerDigit
          value={timeLeft.seconds}
          label="שניות"
          size={size}
          variant={variant}
          isUrgent={isUrgent}
        />

        <span className={`${digitSizeClasses[size]} font-bold text-white`}>:</span>

        {/* Minutes */}
        <TimerDigit
          value={timeLeft.minutes}
          label="דקות"
          size={size}
          variant={variant}
          isUrgent={isUrgent}
        />

        <span className={`${digitSizeClasses[size]} font-bold text-white`}>:</span>

        {/* Hours */}
        <TimerDigit
          value={timeLeft.hours}
          label="שעות"
          size={size}
          variant={variant}
          isUrgent={isUrgent}
        />

        <span className={`${digitSizeClasses[size]} font-bold text-white`}>:</span>

        {/* Days */}
        <TimerDigit
          value={timeLeft.days}
          label="ימים"
          size={size}
          variant={variant}
          isUrgent={isUrgent}
        />
      </div>

      {/* Urgency Message */}
      {isUrgent && variant !== 'minimal' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-orange-300 text-sm font-medium"
        >
          ⚡ נותרו פחות מ-24 שעות!
        </motion.div>
      )}
    </motion.div>
  );
}

interface TimerDigitProps {
  value: number;
  label: string;
  size: 'sm' | 'md' | 'lg';
  variant: 'default' | 'urgent' | 'minimal';
  isUrgent: boolean;
}

function TimerDigit({ value, label, size, variant, isUrgent }: TimerDigitProps) {
  const digitSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-2xl md:text-4xl',
  };

  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-xs',
    lg: 'text-xs md:text-sm',
  };

  const paddingSizeClasses = {
    sm: 'px-1.5 py-1',
    md: 'px-2 py-1.5',
    lg: 'px-3 py-2',
  };

  const variantClasses = {
    default: 'bg-white/10 backdrop-blur-sm border border-white/20',
    urgent: isUrgent
      ? 'bg-orange-500/20 backdrop-blur-sm border border-orange-400/40'
      : 'bg-white/10 backdrop-blur-sm border border-white/20',
    minimal: 'bg-transparent',
  };

  const formattedValue = value.toString().padStart(2, '0');

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`
        ${variantClasses[variant]}
        ${paddingSizeClasses[size]}
        rounded-lg
        min-w-[50px] md:min-w-[70px]
        flex items-center justify-center
        transition-all duration-300
        ${isUrgent && variant === 'urgent' ? 'shadow-lg shadow-orange-500/20' : ''}
      `}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={formattedValue}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={`${digitSizeClasses[size]} font-bold text-white tabular-nums`}
          >
            {formattedValue}
          </motion.span>
        </AnimatePresence>
      </div>
      {variant !== 'minimal' && (
        <span className={`${labelSizeClasses[size]} text-white/70 font-medium`}>
          {label}
        </span>
      )}
    </div>
  );
}
