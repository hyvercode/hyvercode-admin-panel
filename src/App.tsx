import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import AuthLayout from './components/AuthLayout';
import DashboardLayout from './components/DashboardLayout';
import PublicLayout from './components/PublicLayout';

// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Dashboard Pages
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Documentation from './pages/Documentation';
import Tasks from './pages/Tasks';
import Editor from './pages/Editor';
import Feedback from './pages/Feedback';
import Appointments from './pages/Appointments';
import CalendarPage from './pages/CalendarPage';
import Forms from './pages/Forms';
import AdvancedSelects from './pages/AdvancedSelects';
import TextFields from './pages/TextFields';
import Toggles from './pages/Toggles';
import Avatars from './pages/Avatars';
import Icons from './pages/Icons';
import Images from './pages/Images';
import Loaders from './pages/Loaders';
import Navigation from './pages/Navigation';
import Overlays from './pages/Overlays';
import Content from './pages/Content';
import Tables from './pages/Tables';

// Public/Sample Pages
import LandingPage from './pages/LandingPage';
import ProductCatalog from './pages/samples/ProductCatalog';
import ProductDetail from './pages/samples/ProductDetail';
import Checkout from './pages/samples/Checkout';
import Blog from './pages/samples/Blog';
import Chat from './pages/samples/Chat';
import PointOfSale from './pages/samples/PointOfSale';
import { ToastProvider } from './contexts/ToastContext';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/sample/products" element={<ProductCatalog />} />
          <Route path="/sample/products/:productId" element={<ProductDetail />} />
          <Route path="/sample/checkout" element={<Checkout />} />
          <Route path="/sample/blog" element={<Blog />} />
          <Route path="/sample/chat" element={<Chat />} />
          <Route path="/sample/pos" element={<PointOfSale />} />
        </Route>
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/advanced-selects" element={<AdvancedSelects />} />
            <Route path="/text-fields" element={<TextFields />} />
            <Route path="/toggles" element={<Toggles />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/icons" element={<Icons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/loaders" element={<Loaders />} />
            <Route path="/navigation" element={<Navigation />} />
            <Route path="/overlays" element={<Overlays />} />
            <Route path="/content" element={<Content />} />
            <Route path="/tables" element={<Tables />} />
            {/* Redirect root in private area to dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Route>
      </Routes>
    </ToastProvider>
  );
};

export default App;
