import { useCallback, useMemo, useState } from 'react';
import { TABLE_PAGINATION_OPTION } from '@/constants/table/paginationOption';
import { useQuery } from '@tanstack/react-query';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { tableParam } from '@/constants/table/defaultParam';
import { HttpService } from '@/services/http';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Breadcrumb } from '@/components/Breadcrumb';
import { DataTableToolbar } from '@/components/table/DataTableToolbar';
import { SearchInput } from '@/components/SearchInput';
import { Select } from '@/components/Select';
import { DataTable } from '@/components/table/DataTable';
import { getOrganizationColumns } from './components/getOrganizationColumns';
import { DataTablePagination } from '@/components/table/DataTablePagination';
import { Dialog } from '@/components/Dialog';
import { CreateOrganizationForm } from './components/CreateOrganizationForm';
import type { Organization } from '@/types/organization';
import { UpdateOrganizationForm } from './components/UpdateOrganizationForm';
import { DeleteOrganizationForm } from './components/DeleteOrganizationForm';
import { OrganizationSkeleton } from './components/OrganizationSkeleton';

export function Organizations() {
  const [organizationToUpdate, setOrganizationToUpdate] = useState<Organization | null>(null);
  const [organizationToDelete, setOrganizationToDelete] = useState<Organization | null>(null);
  const [limit, setLimit] = useState(tableParam.DEFAULT_LIMIT);
  const [offset, setOffset] = useState(tableParam.DEFAULT_OFFSET);
  const [selectedPage, setSelectedPage] = useState(tableParam.DEFAULT_SELECTED_PAGE);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const debouncedSearch = useDebouncedValue(search, 300);

  const {
    data: organizations,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['organizations', { limit, offset, search: debouncedSearch }],
    queryFn: () => HttpService.listOrganizations({ limit, offset, search: debouncedSearch }),
  });

  const columns = useMemo(() => {
    return getOrganizationColumns({ onUpdate: setOrganizationToUpdate, onDelete: setOrganizationToDelete });
  }, []);

  const totalPages: number = useMemo(() => {
    const totalData = organizations?.responseMeta?.total ?? 0;
    const limitData = organizations?.limit ?? 0;

    return Math.ceil(totalData / limitData);
  }, [organizations]);

  const rangeStart: number = useMemo(() => {
    return (organizations?.offset ?? 0) + 1;
  }, [organizations]);

  const rangeEnd: number = useMemo(() => {
    const limit = organizations?.limit ?? 0;
    const offset = organizations?.offset ?? 0;
    const total = organizations?.responseMeta?.total ?? 0;

    return Math.min(limit + offset, total);
  }, [organizations]);

  const organizationData = useMemo(() => {
    return (organizations?.responseData ?? []).map(d => {
      const isoString = d.createdAt;

      const formattedDate = new Date(isoString).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC',
      });

      return { ...d, createdAt: formattedDate };
    });
  }, [organizations?.responseData]);

  const handleChangeOnSearchInput = useCallback((value: string) => {
    setSearch(value);
    setOffset(tableParam.DEFAULT_OFFSET);
    setSelectedPage(tableParam.DEFAULT_SELECTED_PAGE);
  }, []);

  const handleChangeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setOffset(tableParam.DEFAULT_OFFSET);
    setSelectedPage(tableParam.DEFAULT_SELECTED_PAGE);
  }, []);

  const handleClickPage = useCallback(
    (page: number) => {
      const currentPage = page + 1;

      if (selectedPage !== currentPage) {
        setSelectedPage(currentPage);
        setOffset(page * (organizations?.limit ?? 0));
      }
    },
    [selectedPage, organizations?.limit],
  );

  if (isError) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <PageLayout>
      <PageHeader
        breadcrumb={<Breadcrumb>Organizations</Breadcrumb>}
        title="Organizations"
        description="Manage and update organization"
        action={
          <Dialog label="+ Create Organization" open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <CreateOrganizationForm onSuccess={() => setIsDialogOpen(false)} />
          </Dialog>
        }
      />
      <DataTableToolbar dataTitle="Organizations" dataCount={organizations?.responseMeta?.total}>
        <SearchInput value={search} placeholder="Search by name" onChange={handleChangeOnSearchInput} />
      </DataTableToolbar>
      {isLoading ? <OrganizationSkeleton /> : <DataTable columns={columns} data={organizationData ?? []} />}
      <Dialog open={!!organizationToUpdate} onOpenChange={open => !open && setOrganizationToUpdate(null)}>
        {organizationToUpdate && (
          <UpdateOrganizationForm organization={organizationToUpdate} onSuccess={() => setOrganizationToUpdate(null)} />
        )}
      </Dialog>

      <Dialog open={!!organizationToDelete} onOpenChange={open => !open && setOrganizationToDelete(null)}>
        {organizationToDelete && (
          <DeleteOrganizationForm organization={organizationToDelete} onSuccess={() => setOrganizationToDelete(null)} />
        )}
      </Dialog>

      <DataTablePagination
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        totalItem={organizations?.responseMeta?.total}
        totalPages={totalPages}
        onClick={handleClickPage}
        selectedPage={selectedPage}
      >
        <Select
          value={String(limit)}
          onChange={newLimit => handleChangeLimit(Number(newLimit))}
          options={TABLE_PAGINATION_OPTION}
        />
      </DataTablePagination>
    </PageLayout>
  );
}
