import { Navigate, Outlet, Route, Routes } from 'react-router';
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
import { BASENAME } from './constants/baseUrl';

export function App() {
  return (
    <>
      <Routes>
        <Route element={<RequireGuest />}>
          <Route path={`${BASENAME}/login`} element={<Login />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route
            element={
              <AppLayout>
                <Outlet />
              </AppLayout>
            }
          >
            <Route path={`${BASENAME}/`} element={<Navigate to={`${BASENAME}/students`} replace />} />
            <Route path={`${BASENAME}/students`} element={<Students />} />
            <Route path={`${BASENAME}/schedule`} element={<Schedule />} />
            <Route path={`${BASENAME}/courses`} element={<Courses />} />
            <Route path={`${BASENAME}/live-sessions`} element={<LiveSessions />} />
            <Route path={`${BASENAME}/assignments`} element={<Assignments />} />
            <Route path={`${BASENAME}/mentors`} element={<Mentors />} />
            <Route path={`${BASENAME}/organizations`} element={<Organizations />} />
            <Route path={`${BASENAME}/settings`} element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}
