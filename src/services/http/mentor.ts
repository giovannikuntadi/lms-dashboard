import { auth } from '@/lib/firebase';
import { HOST } from './constants';

export async function listMentors(limit = 10, offset = 0) {
  const url = new URL(`${HOST}/v1/mentors`);
  url.searchParams.set('limit', String(limit));
  url.searchParams.set('offset', String(offset));

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

    return response.json();
  } catch (error) {
    console.log(error);
  }
}
