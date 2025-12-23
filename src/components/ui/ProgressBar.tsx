import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: 'primary' | 'secondary' | 'success' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

const colorStyles = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  success: 'bg-success',
  accent: 'bg-accent',
};

const sizeStyles = {
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
};

export function ProgressBar({
  progress,
  color = 'primary',
  size = 'md',
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="w-full">
      <div
        className={`
          w-full bg-gray-200 rounded-full overflow-hidden
          ${sizeStyles[size]}
        `}
      >
        <motion.div
          className={`
            h-full rounded-full
            ${colorStyles[color]}
          `}
          initial={animated ? { width: 0 } : undefined}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {showLabel && (
        <p className="text-sm text-text-light mt-1 text-center">
          {Math.round(clampedProgress)}%
        </p>
      )}
    </div>
  );
}
