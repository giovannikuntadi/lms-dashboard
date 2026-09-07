import { useAuthStore } from '@/store/authStore';
import { Navigate, Outlet } from 'react-router';

export function RequireAuth() {
  const status = useAuthStore(state => state.status);

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
