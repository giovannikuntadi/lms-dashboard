import * as z from 'zod';

export const organizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required'),
});

export type OrganizationInput = z.infer<typeof organizationSchema>;
