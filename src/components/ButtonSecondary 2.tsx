import type React from 'react';

interface ButtonSecondaryProps {
  disabled?: boolean;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
  onClick?: () => void;
}

export function ButtonSecondary({ disabled, children, ariaLabel, className, onClick }: ButtonSecondaryProps) {
  return (
    <button
      disabled={disabled}
      className={`bg-btn-secondary border-border-default cursor-pointer rounded-md border-2 px-3 py-1 ${className}`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
