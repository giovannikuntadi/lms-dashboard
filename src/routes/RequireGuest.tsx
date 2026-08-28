import { useAuthStore } from '@/store/authStore';
import { Navigate, Outlet } from 'react-router';

export function RequireGuest() {
  const status = useAuthStore(state => state.status);

  if (status === 'loading') {
    return <span>Loading</span>;
  }

  if (status === 'authenticated') {
    return <Navigate to="/students" replace />;
  }

  return <Outlet />;
}
