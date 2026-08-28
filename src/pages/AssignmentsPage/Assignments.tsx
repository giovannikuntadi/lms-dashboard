import { useCallback } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ButtonPrimary } from '@/components/ButtonPrimary';

export function Assignments() {
  const handleClickCreateAssignment = useCallback(() => {
    console.log('create assignment');
  }, []);

  return (
    <PageLayout>
      <PageHeader
        breadcrumb={<Breadcrumb>Assignments</Breadcrumb>}
        title="Assignments"
        description="Track your coursework progress and submissions"
        action={<ButtonPrimary onClick={handleClickCreateAssignment}>+ Create Assignment</ButtonPrimary>}
      />
    </PageLayout>
  );
}
