import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

import DashboardLayout from './components/DashboardLayout';
import AuthLayout from './components/AuthLayout';
import PrivateRoute from './components/PrivateRoute';
import Spinner from './components/ui/loading/Spinner';
import { ToastProvider } from './contexts/ToastContext';

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Users = lazy(() => import('./pages/Users'));
const Tasks = lazy(() => import('./pages/Tasks'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const Forms = lazy(() => import('./pages/Forms'));
const TextFields = lazy(() => import('./pages/TextFields'));
const Toggles = lazy(() => import('./pages/Toggles'));
const AdvancedSelects = lazy(() => import('./pages/AdvancedSelects'));
const Feedback = lazy(() => import('./pages/Feedback'));
const Appointments = lazy(() => import('./pages/Appointments'));
const Editor = lazy(() => import('./pages/Editor'));
const Avatars = lazy(() => import('./pages/Avatars'));
const Icons = lazy(() => import('./pages/Icons'));
const Images = lazy(() => import('./pages/Images'));
const Loaders = lazy(() => import('./pages/Loaders'));
const Navigation = lazy(() => import('./pages/Navigation'));
const Overlays = lazy(() => import('./pages/Overlays'));
const Content = lazy(() => import('./pages/Content'));
const Tables = lazy(() => import('./pages/Tables'));
const Documentation = lazy(() => import('./pages/Documentation'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <ToastProvider>
      <Suspense fallback={
          <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
              <Spinner size="lg" className="text-primary" />
          </div>
      }>
        <Routes>
          {/* Private Routes (Dashboard) */}
          <Route element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/calendar" element={<CalendarPage />} />
              <Route path="/forms" element={<Forms />} />
              <Route path="/text-fields" element={<TextFields />} />
              <Route path="/toggles" element={<Toggles />} />
              <Route path="/advanced-selects" element={<AdvancedSelects />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/avatars" element={<Avatars />} />
              <Route path="/icons" element={<Icons />} />
              <Route path="/images" element={<Images />} />
              <Route path="/loaders" element={<Loaders />} />
              <Route path="/navigation" element={<Navigation />} />
              <Route path="/overlays" element={<Overlays />} />
              <Route path="/content" element={<Content />} />
              <Route path="/tables" element={<Tables />} />
              <Route path="/documentation" element={<Documentation />} />
            </Route>
          </Route>
          
          {/* Public Routes (Auth) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
            <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
            <Route path="/forgot-password" element={user ? <Navigate to="/" /> : <ForgotPassword />} />
          </Route>

          {/* Not Found */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </ToastProvider>
  );
};

export default App;
