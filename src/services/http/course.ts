import { auth } from '@/lib/firebase';
import { HOST } from './constants';

interface ListCourseProps {
  limit?: number;
  offset?: number;
  search?: string;
}

export async function listCourse({ limit = 10, offset = 0, search }: ListCourseProps) {
  const url = new URL(`${HOST}/v1/courses`);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('offset', String(offset));

  if (search) {
    url.searchParams.set('query', search);
  }

  const token = await auth?.currentUser?.getIdToken();

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
    const responseData = data.data;
    const responseMeta = data.meta;

    return { responseData, responseMeta, limit, offset, search };
  } catch (error) {
    console.log(error);
  }
}
