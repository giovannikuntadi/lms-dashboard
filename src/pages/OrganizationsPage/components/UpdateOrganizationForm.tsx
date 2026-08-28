import { useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ButtonSecondary } from '@/components/ButtonSecondary';
import { ButtonPrimary } from '@/components/ButtonPrimary';
import { HttpService } from '@/services/http';
import type { Organization } from '@/types/organization';
import { organizationSchema, type OrganizationInput } from '@/schemas/organizationSchema';

interface UpdateOrganizationFormProps {
  organization: Organization;
  onSuccess: () => void;
}

export function UpdateOrganizationForm({ organization, onSuccess }: UpdateOrganizationFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationInput>({
    resolver: zodResolver(organizationSchema),
    defaultValues: { name: organization.name },
  });

  const updateOrganizationMutation = useMutation({
    mutationFn: (data: OrganizationInput) => HttpService.updateOrganization(organization.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      onSuccess();
    },
  });

  const onSubmit = useCallback(
    (data: OrganizationInput) => {
      updateOrganizationMutation.mutate(data);
    },
    [updateOrganizationMutation],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h1 className="text-lg font-semibold">Edit Organization</h1>
      <div className="flex flex-col gap-2.5">
        <label htmlFor="name" className="text-sm font-medium">
          Organization Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter name"
          className="border-border-default focus:shadow-violet8 rounded-md border bg-transparent px-3 py-2 text-[13px] outline-0 focus:shadow-[0_0_0_1px]"
          disabled={updateOrganizationMutation.isPending}
          {...register('name')}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {updateOrganizationMutation.isError && (
        <p className="mt-3 text-sm text-red-500">
          Something went wrong while updating the organization. Please try again.
        </p>
      )}

      <div className="flex justify-end gap-2">
        <DialogPrimitive.Close asChild>
          <ButtonSecondary>Cancel</ButtonSecondary>
        </DialogPrimitive.Close>
        <ButtonPrimary disabled={updateOrganizationMutation.isPending} type="submit">
          {updateOrganizationMutation.isPending ? 'Updating...' : 'Update'}
        </ButtonPrimary>
      </div>
    </form>
  );
}
