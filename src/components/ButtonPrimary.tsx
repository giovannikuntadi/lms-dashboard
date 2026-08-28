import type React from 'react';

interface ButtonPrimaryProps {
  disabled?: boolean;
  type?: 'submit' | undefined;
  children: React.ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
}

export function ButtonPrimary({ disabled, type, children, ariaLabel, onClick }: ButtonPrimaryProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className="bg-btn-primary cursor-pointer rounded-md px-3 py-2"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
