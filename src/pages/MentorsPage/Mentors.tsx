import { useCallback, useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHeader } from '@/components/layout/PageHeader';
import { Breadcrumb } from '@/components/Breadcrumb';
import { ButtonPrimary } from '@/components/ButtonPrimary';
import { useQuery } from '@tanstack/react-query';
import { HttpService } from '@/services/http';
import { MentorCard } from './components/MentorCard';
import type { Mentor } from '@/types/mentor';
import { Dialog } from '@/components/Dialog';
import { MentorDetail } from './components/MentorDetail';
import { MentorSkeleton } from './components/MentorSkeleton';

export function Mentors() {
  // const [open, setOpen] = useState(false);
  const [mentorToView, setMentorToView] = useState<Mentor | null>(null);

  const { data: mentors, isLoading } = useQuery({
    queryKey: ['mentors'],
    queryFn: () => HttpService.listMentors(),
  });

  const handleClickCreateMentor = useCallback(() => {
    console.log('create mentor');
  }, []);

  const handleClickAboutMentor = useCallback((mentor: Mentor) => {
    setMentorToView(mentor);
  }, []);

  return (
    <PageLayout>
      <PageHeader
        breadcrumb={<Breadcrumb>Mentors</Breadcrumb>}
        title="Mentors"
        description="Manage mentor profiles and assign mentors to courses"
        action={<ButtonPrimary onClick={handleClickCreateMentor}>+ Create Mentor</ButtonPrimary>}
      />
      <div className="grid grid-cols-1 gap-6 py-6 md:grid-cols-2">
        {isLoading
          ? Array.from({ length: 4 }, (_, index) => (
              <div key={index}>
                <MentorSkeleton />
              </div>
            ))
          : mentors?.data.map((mentor: Mentor) => (
              <MentorCard key={mentor.id} mentor={mentor} onClick={handleClickAboutMentor} />
            ))}
      </div>
      <Dialog open={!!mentorToView} onOpenChange={open => !open && setMentorToView(null)} maxWidth="max-w-1000">
        {mentorToView && <MentorDetail mentor={mentorToView} />}
      </Dialog>
    </PageLayout>
  );
}
