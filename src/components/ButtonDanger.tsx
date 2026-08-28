interface ButtonDangerProps {
  disabled?: boolean;
  type?: 'submit' | undefined;
  children: React.ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
}

export function ButtonDanger({ disabled, type, children, ariaLabel, onClick }: ButtonDangerProps) {
  return (
    <button
      disabled={disabled}
      type={type}
      className="bg-btn-danger cursor-pointer rounded-md px-3 py-2"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
