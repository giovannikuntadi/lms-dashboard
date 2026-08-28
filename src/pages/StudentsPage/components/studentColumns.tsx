import type { ColumnDef } from '@tanstack/react-table';
import type { Student } from '@/types/student';

export const studentColumns: ColumnDef<Student>[] = [
  { accessorKey: 'code', header: 'Student ID' },
  {
    id: 'student',
    header: 'Student',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-xs font-medium">
          {row.original.firstName[0]}
          {row.original.lastName[0]}
        </div>
        <div>
          <div className="font-medium">
            {row.original.firstName} {row.original.lastName}
          </div>
          <div className="text-zinc-500">{row.original.email}</div>
        </div>
      </div>
    ),
  },
  { accessorKey: 'organization.name', header: 'Organization Name' },
];
