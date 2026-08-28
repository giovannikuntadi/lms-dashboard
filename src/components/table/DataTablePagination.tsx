import type React from 'react';
import { Icon } from '../icons';

interface DataTablePaginationProps {
  children: React.ReactNode;
  rangeStart: number;
  rangeEnd: number;
  totalItem: number | undefined;
  totalPages: number;
  selectedPage: number;
  onClick: (page: number) => void;
}

export function DataTablePagination({
  children,
  rangeStart,
  rangeEnd,
  totalItem,
  totalPages,
  selectedPage,
  onClick,
}: DataTablePaginationProps) {
  return (
    <div className="border-border-default mb-6 flex items-center justify-between rounded-b-md border border-t-0 px-5 py-3.5">
      <div className="flex items-center gap-2.5">
        <span className="text-text-secondary text-sm font-normal">Rows per page</span>
        {children}
      </div>
      <div className="flex items-center gap-2.5">
        <span className="text-text-secondary text-sm font-normal">
          {rangeStart} - {rangeEnd} of {totalItem}
        </span>
        <div className="flex px-2">
          <button className="cursor-pointer">
            <Icon.PaginationPrev />
          </button>
          {Array.from({ length: totalPages }, (_, page) => (
            <button
              onClick={() => onClick(page)}
              key={page + 1}
              className={`cursor-pointer px-2.5 py-1 text-sm font-normal ${selectedPage === page + 1 ? 'bg-[#18181B]' : 'text-text-secondary'}`}
            >
              {page + 1}
            </button>
          ))}
          <button className="cursor-pointer">
            <Icon.PaginationNext />
          </button>
        </div>
      </div>
    </div>
  );
}
