import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { ButtonSecondary } from '@/components/ButtonSecondary';
import { HttpService } from '@/services/http';
import type { Organization } from '@/types/organization';
import { ButtonDanger } from '@/components/ButtonDanger';

interface DeleteOrganizationFormProps {
  organization: Organization;
  onSuccess: () => void;
}

export function DeleteOrganizationForm({ organization, onSuccess }: DeleteOrganizationFormProps) {
  const queryClient = useQueryClient();

  const deleteOrganizationMutation = useMutation({
    mutationFn: () => HttpService.deleteOrganization(organization.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
      onSuccess();
    },
    onError: error => {
      console.error(error);
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-lg font-semibold">Delete Organization</h1>
      <p>
        Are you sure to delete <strong className="text-red-500">{organization.name}</strong> ?
      </p>

      {deleteOrganizationMutation.isError && (
        <p className="mt-3 text-sm text-red-500">
          Something went wrong while deleting the organization. Please try again.
        </p>
      )}

      <div className="flex justify-end gap-2">
        <DialogPrimitive.Close asChild>
          <ButtonSecondary>Cancel</ButtonSecondary>
        </DialogPrimitive.Close>
        <ButtonDanger
          disabled={deleteOrganizationMutation.isPending}
          onClick={() => deleteOrganizationMutation.mutate()}
        >
          {deleteOrganizationMutation.isPending ? 'Deleting...' : 'Delete'}
        </ButtonDanger>
      </div>
    </div>
  );
}
