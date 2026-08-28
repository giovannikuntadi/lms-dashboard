import { auth } from '@/lib/firebase';
import { HOST } from './constants';
import type { Student } from '@/types/student';

interface Total {
  total: number;
}

type ResponseData = Student[] | undefined;
type ResponseMeta = Total | undefined;

interface ListStudent {
  organizationId?: number;
  limit: number;
  offset: number;
  search?: string;
}

export async function listStudents({ limit = 10, offset = 0, organizationId, search }: ListStudent) {
  const url = new URL(`${HOST}/v1/students`);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('offset', String(offset));

  if (organizationId) {
    url.searchParams.set('organizationId', String(organizationId));
  }

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

    if (!response.ok) {
      throw new Error(`Error message: ${response.status}`);
    }

    const data = await response.json();
    const responseData: ResponseData = data.data;
    const responseMeta: ResponseMeta = data.meta;

    return { responseData, responseMeta, limit, offset };
  } catch (error) {
    console.log(error);
  }
}
