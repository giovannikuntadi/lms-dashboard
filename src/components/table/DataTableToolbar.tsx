import type React from 'react';

interface DataTableToolbarProps {
  dataTitle: string;
  dataCount: number | undefined;
  children: React.ReactNode;
}

export function DataTableToolbar({ dataTitle, dataCount, children }: DataTableToolbarProps) {
  return (
    <div className="border-border-default flex items-center justify-between rounded-t-md border border-b-0 p-5">
      <div className="flex gap-1">
        <span>{dataTitle}</span>
        <span>({dataCount})</span>
      </div>
      <div className="flex gap-2.5">{children}</div>
    </div>
  );
}
