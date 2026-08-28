import { DropdownMenu } from '@/components/DropdownMenu';
import { Icon } from '@/components/icons';
import type { Course } from '@/types/course';
import type { ColumnDef } from '@tanstack/react-table';

interface CourseColumnHandler {
  onView: (course: Course) => void;
  onUpdate: (course: Course) => void;
  onDelete: (course: Course) => void;
}

export function getCourseColumn({ onView, onUpdate, onDelete }: CourseColumnHandler): ColumnDef<Course>[] {
  return [
    {
      id: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div className="table-cell-overflow flex max-w-80 items-center gap-3">
          <div className="h-11 w-22">
            <img src={row.original.thumbnailUrl} className="rounded-lg" />
          </div>
          <span className="w-full truncate">{row.original.title}</span>
        </div>
      ),
    },
    {
      id: 'description',
      header: 'Description',
      cell: ({ row }) => <div className="max-w-80 truncate">{row.original.description}</div>,
    },
    { accessorKey: '', header: 'Modules', size: 121 },
    {
      id: 'organization',
      header: 'Organization',
      size: 121,
      cell: ({ row }) => <div>{row.original.organizationCourses[0].organization.name}</div>,
    },
    { accessorKey: '', header: 'Status', size: 121 },
    {
      id: 'action',
      header: '',
      size: 10,
      cell: ({ row }) => (
        <DropdownMenu
          items={[
            { label: 'View Course', icon: <Icon.ActionView />, onClick: () => onView(row.original) },
            { label: 'Edit Course', icon: <Icon.ActionEdit />, onClick: () => onUpdate(row.original) },
            { label: 'Delete Course', icon: <Icon.ActionDelete />, onClick: () => onDelete(row.original) },
          ]}
        />
      ),
    },
  ];
}
