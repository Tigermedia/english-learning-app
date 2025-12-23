import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'outline' | 'colored';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  interactive?: boolean;
  selected?: boolean;
  colorClass?: string;
  className?: string;
  onClick?: () => void;
}

const paddingStyles = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-8',
};

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  interactive = false,
  selected = false,
  colorClass = '',
  className = '',
  onClick,
}: CardProps) {
  const baseStyles = `
    rounded-[var(--radius-playful)]
    ${paddingStyles[padding]}
  `;

  const variantStyles = {
    default: 'bg-card shadow-md',
    elevated: 'bg-card shadow-xl',
    outline: 'bg-card border-2 border-gray-200',
    colored: colorClass || 'bg-primary/10',
  };

  const interactiveStyles = interactive
    ? 'cursor-pointer hover:shadow-lg transition-shadow duration-200'
    : '';

  const selectedStyles = selected
    ? 'ring-4 ring-primary ring-offset-2'
    : '';

  return (
    <motion.div
      whileHover={interactive ? { scale: 1.02 } : undefined}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
        ${interactiveStyles}
        ${selectedStyles}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
