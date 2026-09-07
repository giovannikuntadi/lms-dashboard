import { useAuthStore } from '@/store/authStore';
import { Navigate, Outlet } from 'react-router';

export function RequireGuest() {
  const status = useAuthStore(state => state.status);

  if (status === 'authenticated') {
    return <Navigate to="/students/enrolled" replace />;
  }

  return <Outlet />;
}
