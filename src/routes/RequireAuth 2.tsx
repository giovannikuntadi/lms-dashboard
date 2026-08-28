import { useAuthStore } from '@/store/authStore';
import { Navigate, Outlet } from 'react-router';

export function RequireAuth() {
  const status = useAuthStore(state => state.status);

  if (status === 'loading') {
    return <Navigate to="/organizations" replace />;
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
