import { useCallback } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ButtonPrimary } from '@/components/ButtonPrimary';

export function LiveSessions() {
  const handleClickCreateLiveSession = useCallback(() => {
    console.log('create live session');
  }, []);

  return (
    <PageLayout>
      <PageHeader
        breadcrumb={<Breadcrumb>Live Sessions</Breadcrumb>}
        title="Live Sessions"
        description="Manage and update live sessions"
        action={<ButtonPrimary onClick={handleClickCreateLiveSession}>+ Create Live Session</ButtonPrimary>}
      />
    </PageLayout>
  );
}
