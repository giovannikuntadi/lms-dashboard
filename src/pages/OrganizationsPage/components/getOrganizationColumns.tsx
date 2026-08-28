import type { ColumnDef } from '@tanstack/react-table';
import type { Organization } from '@/types/organization';
import { DropdownMenu } from '@/components/DropdownMenu';
import { Icon } from '@/components/icons';

interface OrganizationColumnHandlers {
  onUpdate: (organization: Organization) => void;
  onDelete: (organizaton: Organization) => void;
}

export function getOrganizationColumns({ onUpdate, onDelete }: OrganizationColumnHandlers): ColumnDef<Organization>[] {
  return [
    { accessorKey: 'name', header: 'Organization Name' },
    { accessorKey: 'createdAt', header: 'Created Date' },
    {
      id: 'actions',
      header: '',
      size: 10,
      cell: ({ row }) => (
        <DropdownMenu
          items={[
            { label: 'Update Organization', icon: <Icon.ActionEdit />, onClick: () => onUpdate(row.original) },
            {
              label: 'Delete Organization',
              icon: <Icon.ActionDelete />,
              color: 'red-500',
              onClick: () => onDelete(row.original),
            },
          ]}
        />
      ),
    },
  ];
}
