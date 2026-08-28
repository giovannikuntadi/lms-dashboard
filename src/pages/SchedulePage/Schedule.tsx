import { useCallback, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { TABLE_ORGANIZATION_SELECT_WIDTH } from '@/constants/table/organizationSelectWidth';
import { tableParam } from '@/constants/table/defaultParam';
import { HttpService } from '@/services/http';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Breadcrumb } from '@/components/Breadcrumb';
import { Select } from '@/components/Select';

export function Schedule() {
  const [organizationId, setOrganizationId] = useState(tableParam.DEFAULT_ORGANIZATION_ID);

  const { data: organizations } = useQuery({
    queryKey: ['organizations'],
    queryFn: () => HttpService.listOrganizations({}),
  });

  const organizationOptions = useMemo(() => {
    return [
      { value: '0', label: 'All Organizations' },
      ...(organizations?.responseData?.map(org => ({
        value: String(org.id),
        label: org.name,
      })) ?? []),
    ];
  }, [organizations]);

  const handleChangeOrganization = useCallback((newOrganization: number) => {
    setOrganizationId(newOrganization);
  }, []);

  return (
    <PageLayout>
      <PageHeader
        breadcrumb={<Breadcrumb>Schedule</Breadcrumb>}
        title="Schedule"
        description="Manage sessions, assignments, and events"
        action={
          <Select
            value={String(organizationId)}
            onChange={newOrganization => handleChangeOrganization(Number(newOrganization))}
            width={TABLE_ORGANIZATION_SELECT_WIDTH}
            options={organizationOptions}
          />
        }
      />
    </PageLayout>
  );
}
