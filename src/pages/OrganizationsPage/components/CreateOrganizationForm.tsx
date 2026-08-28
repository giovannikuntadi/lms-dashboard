import { organizationSchema, type OrganizationInput } from '@/schemas/organizationSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ButtonSecondary } from '@/components/ButtonSecondary';
import { ButtonPrimary } from '@/components/ButtonPrimary';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { HttpService } from '@/services/http';
import { useCallback } from 'react';

interface CreateOrganizationFormProps {
  onSuccess: () => void;
}

export function CreateOrganizationForm({ onSuccess }: CreateOrganizationFormProps) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrganizationInput>({ resolver: zodResolver(organizationSchema) });

  const createOrganizationMutation = useMutation({
    mutationFn: HttpService.createOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      onSuccess();
    },
  });

  const onSubmit = useCallback(
    (data: OrganizationInput) => {
      createOrganizationMutation.mutate(data);
    },
    [createOrganizationMutation],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <h1 className="text-lg font-semibold">Add Organization</h1>
      <div className="flex flex-col gap-2.5">
        <label htmlFor="name" className="text-sm font-medium">
          Organization Name
        </label>
        <input
          id="name"
          type="text"
          placeholder="Enter name"
          className="border-border-default focus:shadow-violet8 rounded-md border bg-transparent px-3 py-2 text-[13px] outline-0 focus:shadow-[0_0_0_1px]"
          disabled={createOrganizationMutation.isPending}
          {...register('name')}
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      {createOrganizationMutation.isError && (
        <p className="mt-3 text-sm text-red-500">
          Something went wrong while creating the organization. Please try again.
        </p>
      )}

      <div className="flex justify-end gap-2">
        <DialogPrimitive.Close asChild>
          <ButtonSecondary>Cancel</ButtonSecondary>
        </DialogPrimitive.Close>
        <ButtonPrimary disabled={createOrganizationMutation.isPending} type="submit">
          {createOrganizationMutation.isPending ? 'Creating...' : 'Create'}
        </ButtonPrimary>
      </div>
    </form>
  );
}
