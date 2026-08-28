import { auth } from '@/lib/firebase';
import { HOST } from './constants';
import type { Organization } from '@/types/organization';
import type { OrganizationInput } from '@/schemas/organizationSchema';

interface Total {
  total: number;
}

type ResponseData = Organization[] | undefined;
type ResponseMeta = Total | undefined;

interface ListOrganization {
  limit?: number;
  offset?: number;
  search?: string;
}

export async function listOrganizations({ limit = 10, offset = 0, search }: ListOrganization) {
  const url = new URL(`${HOST}/v1/organizations`);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('offset', String(offset));

  if (search) {
    url.searchParams.set('query', String(search));
  }

  const token = await auth.currentUser?.getIdToken();

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    const responseData: ResponseData = data.data;
    const responseMeta: ResponseMeta = data.meta;

    return { responseData, responseMeta, limit, offset };
  } catch (error) {
    console.log(error);
  }
}

export async function createOrganization(data: OrganizationInput) {
  const url = `${HOST}/v1/organizations`;
  const token = await auth.currentUser?.getIdToken();

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function updateOrganization(id: number, data: OrganizationInput) {
  const url = `${HOST}/v1/organizations/${id}`;

  const token = await auth.currentUser?.getIdToken();

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function deleteOrganization(id: number) {
  const url = `${HOST}/v1/organizations/${id}`;

  const token = await auth.currentUser?.getIdToken();

  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error message: ${response.status}`);
    }
  } catch (error) {
    console.log(error);
  }
}
