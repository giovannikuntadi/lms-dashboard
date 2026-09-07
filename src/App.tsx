import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router';
import { RequireGuest } from './routes/RequireGuest';
import { RequireAuth } from './routes/RequireAuth';
import { Login } from './pages/AuthPage/Login';
import { AppLayout } from './components/layout/AppLayout';
import { Students } from './pages/StudentsPage';
import { Schedule } from './pages/SchedulePage';
import { LiveSessions } from './pages/liveSessionsPage';
import { Assignments } from './pages/AssignmentsPage';
import { Mentors } from './pages/MentorsPage';
import { Organizations } from './pages/OrganizationsPage';
import { Courses } from './pages/CoursesPage';
import { Settings } from './pages/SettingsPage';
import { useAuthStore } from './store/authStore';
import { GlobalLoadingScreen } from './components/GlobalLoadingScreen';

export function App() {
  const status = useAuthStore(state => state.status);

  if (status === 'loading') {
    return <GlobalLoadingScreen />;
  }

  return (
    <BrowserRouter basename="/lms-dashboard">
      <Routes>
        <Route element={<RequireGuest />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route
            element={
              <AppLayout>
                <Outlet />
              </AppLayout>
            }
          >
            <Route path="/" element={<Navigate to="/students/enrolled" replace />} />
            <Route path="/students/enrolled" element={<Students />} />
            <Route path="/students/pending" element={<Students />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/live-sessions" element={<LiveSessions />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/mentors" element={<Mentors />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
