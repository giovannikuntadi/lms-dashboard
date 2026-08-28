import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { useQuery } from '@tanstack/react-query';
import { HttpService } from '@/services/http';
import { DataTable } from '@/components/table/DataTable';
import { getCourseColumn } from './components/getCourseColumn';
import { useCallback, useMemo, useState } from 'react';
import { DataTableToolbar } from '@/components/table/DataTableToolbar';
import { SearchInput } from '@/components/SearchInput';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { DataTablePagination } from '@/components/table/DataTablePagination';
import { tableParam } from '@/constants/table/defaultParam';
import { Select } from '@/components/Select';
import { TABLE_PAGINATION_OPTION } from '@/constants/table/paginationOption';

export function Courses() {
  const [limit, setLimit] = useState(tableParam.DEFAULT_LIMIT);
  const [offset, setOffset] = useState(tableParam.DEFAULT_OFFSET);
  const [selectedPage, setSelectedPage] = useState(tableParam.DEFAULT_SELECTED_PAGE);
  const [search, setSearch] = useState('');

  const debouncedSearch = useDebouncedValue(search, 300);

  const { data: courses, isLoading } = useQuery({
    queryKey: ['courses', { limit, offset, search }],
    queryFn: () => HttpService.listCourse({ limit, offset, search: debouncedSearch }),
  });

  const handleChangeOnSearchInput = useCallback((value: string) => {
    setSearch(value);
    setOffset(tableParam.DEFAULT_OFFSET);
    setSelectedPage(tableParam.DEFAULT_SELECTED_PAGE);
  }, []);

  const handleViewCourse = useCallback(() => {
    console.log('view');
  }, []);

  const handleUpdateCourse = useCallback(() => {
    console.log('update');
  }, []);

  const handleDeleteCourse = useCallback(() => {
    console.log('delete');
  }, []);

  const handleChangeLimit = useCallback(
    (newLimit: string) => {
      setLimit(Number(newLimit));
      setSelectedPage(tableParam.DEFAULT_SELECTED_PAGE);
      setOffset(offset);
    },
    [offset],
  );

  const handleClickPage = useCallback(
    (page: number) => {
      const currentPage = page + 1;

      if (selectedPage !== currentPage) {
        setSelectedPage(currentPage);
        setOffset(page * (courses?.limit ?? 0));
      }
    },
    [selectedPage, courses?.limit],
  );

  const column = useMemo(() => {
    return getCourseColumn({ onView: handleViewCourse, onUpdate: handleUpdateCourse, onDelete: handleDeleteCourse });
  }, [handleViewCourse, handleUpdateCourse, handleDeleteCourse]);

  const rangeStart: number = useMemo(() => {
    return (courses?.offset ?? 0) + 1;
  }, [courses]);

  const rangeEnd: number = useMemo(() => {
    const limit = courses?.limit ?? 0;
    const offset = courses?.offset ?? 0;
    const total = courses?.responseMeta?.total ?? 0;

    return Math.min(limit + offset, total);
  }, [courses]);

  const totalItem: number = useMemo(() => {
    return courses?.responseMeta?.total;
  }, [courses?.responseMeta]);

  const totalPages: number = useMemo(() => {
    const limit = courses?.limit ?? 0;
    return Math.ceil(totalItem / limit);
  }, [totalItem, courses]);

  return (
    <PageLayout>
      <PageHeader
        breadcrumb={<span className="text-text-secondary text-sm font-normal">Courses</span>}
        title="Courses"
        description="Manage course content, track progress, and schedule updates"
        action={<button className="bg-btn-primary cursor-pointer rounded-md px-3 py-2">+ Create Course</button>}
      />
      <DataTableToolbar dataTitle="Courses" dataCount={courses?.responseMeta.total}>
        <SearchInput value={search} placeholder="Search by title or description" onChange={handleChangeOnSearchInput} />
      </DataTableToolbar>
      {isLoading ? <span>Loading</span> : <DataTable columns={column} data={courses?.responseData ?? []} />}
      <DataTablePagination
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        totalItem={totalItem}
        selectedPage={selectedPage}
        totalPages={totalPages}
        onClick={handleClickPage}
      >
        <Select
          value={String(limit)}
          options={TABLE_PAGINATION_OPTION}
          onChange={newLimit => handleChangeLimit(newLimit)}
        />
      </DataTablePagination>
    </PageLayout>
  );
}
