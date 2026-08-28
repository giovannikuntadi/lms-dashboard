import type React from 'react';

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="px-6">{children}</div>
    </div>
  );
}
