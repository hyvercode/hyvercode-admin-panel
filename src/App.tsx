import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './components/DashboardLayout';
import AuthLayout from './components/AuthLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Documentation from './pages/Documentation';
import Tasks from './pages/Tasks';
import CalendarPage from './pages/CalendarPage';
import Appointments from './pages/Appointments';
import Forms from './pages/Forms';
import AdvancedSelects from './pages/AdvancedSelects';
import Feedback from './pages/Feedback';
import Editor from './pages/Editor';
import TextFields from './pages/TextFields';
import Toggles from './pages/Toggles';
import Avatars from './pages/Avatars';
import Icons from './pages/Icons';
import Images from './pages/Images';
import Loaders from './pages/Loaders';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Private routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/advanced-selects" element={<AdvancedSelects />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/text-fields" element={<TextFields />} />
          <Route path="/toggles" element={<Toggles />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/icons" element={<Icons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/loaders" element={<Loaders />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/documentation" element={<Documentation />} />
        </Route>
      </Route>
      
      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default App;