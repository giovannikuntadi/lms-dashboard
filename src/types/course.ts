import type { Mentor } from './mentor';
import type { Organization } from './organization';

interface OrganizationCouses {
  id: string;
  courseId: string;
  organizationId: string;
  createdAt: Date;
  updatedAt: Date;
  organization: Organization;
}

export type Course = {
  id: string;
  mentorId: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  mentor: Mentor;
  organizationCourses: OrganizationCouses[];
};
