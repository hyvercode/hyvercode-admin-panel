import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import AuthLayout from './components/AuthLayout';
import DashboardLayout from './components/DashboardLayout';
import PublicLayout from './components/PublicLayout';

// Route Guards
import PrivateRoute from './components/PrivateRoute';

// Pages
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Tasks from './pages/Tasks';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Documentation from './pages/Documentation';
import Boards from './pages/Boards';
import Forms from './pages/Forms';
import Tables from './pages/Tables';
import Content from './pages/Content';
import Overlays from './pages/Overlays';
import Navigation from './pages/Navigation';
import Avatars from './pages/Avatars';
import Icons from './pages/Icons';
import Images from './pages/Images';
import Loaders from './pages/Loaders';
import TextFields from './pages/TextFields';
import Toggles from './pages/Toggles';
import Feedback from './pages/Feedback';
import AdvancedSelects from './pages/AdvancedSelects';
import Editor from './pages/Editor';
import Appointments from './pages/Appointments';
import CalendarPage from './pages/CalendarPage';

// Sample Pages
import PointOfSale from './pages/samples/PointOfSale';
import OnlineCourse from './pages/samples/OnlineCourse';
import Chat from './pages/samples/Chat';
import AIChatAssistant from './pages/samples/AIChatAssistant';
import Checkout from './pages/samples/Checkout';
import ProductCatalog from './pages/samples/ProductCatalog';
import ProductDetail from './pages/samples/ProductDetail';
import Blog from './pages/samples/Blog';
import LandingPage from './pages/LandingPage';

// ERP Pages
import ErpProducts from './pages/erp/Products';
import ErpOrders from './pages/erp/Orders';
import ErpCustomers from './pages/erp/Customers';

import { ToastProvider } from './contexts/ToastContext';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Routes>
        {/* Public Routes with Cart */}
        <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sample/products" element={<ProductCatalog />} />
            <Route path="/sample/products/:productId" element={<ProductDetail />} />
            <Route path="/sample/checkout" element={<Checkout />} />
            <Route path="/sample/blog" element={<Blog />} />
            <Route path="/sample/course" element={<OnlineCourse />} />
        </Route>
        
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Private Routes (Dashboard) */}
        {/* FIX: Refactored to use idiomatic react-router-dom v6 private routes.
            The PrivateRoute component acts as a layout route, which then renders
            the DashboardLayout for all nested admin routes. This resolves the type error. */}
        <Route element={<PrivateRoute />}>
          <Route path="/admin" element={<DashboardLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              
              {/* Management */}
              <Route path="users" element={<Users />} />
              <Route path="profile/:userId" element={<Profile />} />
              <Route path="tasks" element={<Tasks />} />

              {/* ERP */}
              <Route path="erp/products" element={<ErpProducts />} />
              <Route path="erp/orders" element={<ErpOrders />} />
              <Route path="erp/customers" element={<ErpCustomers />} />

              {/* Demos */}
              <Route path="documentation" element={<Documentation />} />
              <Route path="boards" element={<Boards />} />
              <Route path="forms" element={<Forms />} />
              <Route path="tables" element={<Tables />} />
              <Route path="content" element={<Content />} />
              <Route path="overlays" element={<Overlays />} />
              <Route path="navigation" element={<Navigation />} />
              <Route path="avatars" element={<Avatars />} />
              <Route path="icons" element={<Icons />} />
              <Route path="images" element={<Images />} />
              <Route path="loaders" element={<Loaders />} />
              <Route path="text-fields" element={<TextFields />} />
              <Route path="toggles" element={<Toggles />} />
              <Route path="feedback" element={<Feedback />} />
              <Route path="advanced-selects" element={<AdvancedSelects />} />
              <Route path="editor" element={<Editor />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="calendar" element={<CalendarPage />} />
              
              {/* Sample Pages (Internal) */}
              <Route path="sample/pos" element={<PointOfSale />} />
              <Route path="sample/chat" element={<Chat />} />
              <Route path="sample/ai-chat" element={<AIChatAssistant />} />
              
              {/* Settings */}
              <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        {/* Not Found Route */}
        <Route path="*" element={<div className="flex items-center justify-center h-screen">404 Not Found</div>} />
      </Routes>
    </ToastProvider>
  );
};

export default App;