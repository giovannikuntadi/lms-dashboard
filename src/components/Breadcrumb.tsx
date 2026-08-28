interface BreadcrumbProps {
  children: string;
}

export function Breadcrumb({ children }: BreadcrumbProps) {
  return <span className="text-text-secondary text-sm font-normal">{children}</span>;
}
