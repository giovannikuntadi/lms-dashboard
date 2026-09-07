import { useCallback, useMemo, useState } from 'react';
import { TABLE_ORGANIZATION_SELECT_WIDTH } from '@/constants/table/organizationSelectWidth';
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
import { getStudentColumns } from './components/getStudentColumns';
import { DataTablePagination } from '@/components/table/DataTablePagination';
import { Dialog } from '@/components/Dialog';
import type { Student } from '@/types/student';
import type { SegmentedControlItem } from '@/components/SegmentedControl';
import { StudentStatus } from './components/StudentStatus';
import { SegmentedControl } from '@/components/SegmentedControl';
import { useNavigate } from 'react-router';

export function Students() {
  const [limit, setLimit] = useState(tableParam.DEFAULT_LIMIT);
  const [offset, setOffset] = useState(tableParam.DEFAULT_OFFSET);
  const [organizationId, setOrganizationId] = useState(tableParam.DEFAULT_ORGANIZATION_ID);
  const [selectedPage, setSelectedPage] = useState(tableParam.DEFAULT_SELECTED_PAGE);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [studentToView, setStudentToView] = useState<Student | null>(null);
  const [studentToUpdate, setStudentToUpdate] = useState<Student | null>(null);
  // const [selectedStatus, setSelectedStatus] = useState(StudentStatus.ENROLLED);

  const navigate = useNavigate();

  const debouncedSearch = useDebouncedValue(search, 300);

  const {
    data: students,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['students', { limit, offset, organizationId, search: debouncedSearch }],
    queryFn: () => HttpService.listStudents({ limit: limit, offset: offset, organizationId, search: debouncedSearch }),
  });

  const STUDENT_STATUS = useMemo(() => {
    return [
      { value: StudentStatus.ENROLLED, label: 'Enrolled', to: '/students/enrolled' },
      { value: StudentStatus.PENDING, label: 'Pending', to: '/students/pending' },
    ];
  }, []);

  // const selectedSegment = useMemo(() => {
  //   const location = window.location.pathname;

  //   STUDENT_STATUS.map(status => status.value === selectedStatus);
  // }, []);

  const column = useMemo(() => {
    return getStudentColumns({ onView: setStudentToView, onUpdate: setStudentToUpdate });
  }, [setStudentToView, setStudentToUpdate]);

  const { data: organizations } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => HttpService.listOrganizations({ limit: 100, offset }),
  });

  const totalPages: number = useMemo(() => {
    const totalData = students?.responseMeta?.total ?? 0;
    const limitData = students?.limit ?? 0;

    return Math.ceil(totalData / limitData);
  }, [students]);

  const rangeStart: number = useMemo(() => {
    return (students?.offset ?? 0) + 1;
  }, [students]);

  const rangeEnd: number = useMemo(() => {
    const limit = students?.limit ?? 0;
    const offset = students?.offset ?? 0;
    const total = students?.responseMeta?.total ?? 0;

    return Math.min(limit + offset, total);
  }, [students]);

  const organizationOptions = useMemo(() => {
    return [
      { value: '0', label: 'All Organizations' },
      ...(organizations?.responseData?.map(org => ({
        value: String(org.id),
        label: org.name,
      })) ?? []),
    ];
  }, [organizations]);

  const handleClickSegment = useCallback(
    (item: SegmentedControlItem) => {
      navigate(item.to);
    },
    [navigate],
  );

  const handleChangeOnSearchInput = useCallback((value: string) => {
    setSearch(value);
    setOffset(tableParam.DEFAULT_OFFSET);
    setSelectedPage(tableParam.DEFAULT_SELECTED_PAGE);
  }, []);

  const handleChangeOrganization = useCallback((newOrganization: number) => {
    setOrganizationId(newOrganization);
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
        setOffset(page * (students?.limit ?? 0));
      }
    },
    [selectedPage, students?.limit],
  );

  if (isError) {
    return <div>Error loading data: {error.message}</div>;
  }

  return (
    <PageLayout>
      <PageHeader
        breadcrumb={<Breadcrumb>Students</Breadcrumb>}
        title="Students"
        description="Track student progress and update student profiles"
        action={
          <Dialog label="+ Invite Student" open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <span>tes</span>
          </Dialog>
        }
      />
      <SegmentedControl items={STUDENT_STATUS} onClick={handleClickSegment} />
      <DataTableToolbar dataTitle="Students" dataCount={students?.responseMeta?.total}>
        <SearchInput value={search} placeholder="Search by name or email" onChange={handleChangeOnSearchInput} />
        <Select
          value={String(organizationId)}
          onChange={newOrganization => handleChangeOrganization(Number(newOrganization))}
          width={TABLE_ORGANIZATION_SELECT_WIDTH}
          options={organizationOptions}
        />
      </DataTableToolbar>
      {isLoading ? <span>Loading</span> : <DataTable columns={column} data={students?.responseData ?? []} />}

      <Dialog open={!!studentToView} onOpenChange={open => !open && setStudentToView(null)}>
        {studentToView && <span>tes</span>}
      </Dialog>

      <Dialog open={!!studentToUpdate} onOpenChange={open => !open && setStudentToUpdate(null)}>
        {studentToUpdate && <span>tes</span>}
      </Dialog>

      <DataTablePagination
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        totalItem={students?.responseMeta?.total}
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
