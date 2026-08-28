import type { Organization } from './organization';

export type Student = {
  id: number;
  organizationId: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  createdAt: string;
  updatedAt: string;
  code: string;
  organization: Organization;
};
