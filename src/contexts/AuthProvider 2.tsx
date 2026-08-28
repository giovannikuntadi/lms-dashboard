import type React from 'react';
import { useEffect } from 'react';
import { auth } from '@/lib/firebase/firebase';
import { useAuthStore } from '@/store/authStore';
import { onAuthStateChanged } from 'firebase/auth';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const setUser = useAuthStore(state => state.setUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });

    return unsubscribe;
  }, [setUser]);

  return children;
}
