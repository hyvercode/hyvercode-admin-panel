
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './components/PrivateRoute';
import DashboardLayout from './components/DashboardLayout';
import AuthLayout from './components/AuthLayout';
import PublicLayout from './components/PublicLayout';
import Spinner from './components/ui/loading/Spinner';
import { ToastProvider } from './contexts/ToastContext';

// Lazy load pages for better performance
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Users = lazy(() => import('./pages/Users'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const Forms = lazy(() => import('./pages/Forms'));
const Tables = lazy(() => import('./pages/Tables'));
const AdvancedSelects = lazy(() => import('./pages/AdvancedSelects'));
const Avatars = lazy(() => import('./pages/Avatars'));
const Boards = lazy(() => import('./pages/Boards'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));
const Content = lazy(() => import('./pages/Content'));
const Documentation = lazy(() => import('./pages/Documentation'));
const Editor = lazy(() => import('./pages/Editor'));
const Feedback = lazy(() => import('./pages/Feedback'));
const Icons = lazy(() => import('./pages/Icons'));
const Images = lazy(() => import('./pages/Images'));
const Loaders = lazy(() => import('./pages/Loaders'));
const Navigation = lazy(() => import('./pages/Navigation'));
const Overlays = lazy(() => import('./pages/Overlays'));
const Tasks = lazy(() => import('./pages/Tasks'));
const TextFields = lazy(() => import('./pages/TextFields'));
const Toggles = lazy(() => import('./pages/Toggles'));
const Appointments = lazy(() => import('./pages/Appointments'));

// ERP Pages
const ERPProducts = lazy(() => import('./pages/erp/Products'));
const ERPOrders = lazy(() => import('./pages/erp/Orders'));
const ERPCustomers = lazy(() => import('./pages/erp/Customers'));


// Auth Pages
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

// Public / Sample Pages
const LandingPage = lazy(() => import('./pages/LandingPage'));
const ProductCatalog = lazy(() => import('./pages/samples/ProductCatalog'));
const ProductDetail = lazy(() => import('./pages/samples/ProductDetail'));
const Checkout = lazy(() => import('./pages/samples/Checkout'));
const Blog = lazy(() => import('./pages/samples/Blog'));
const Chat = lazy(() => import('./pages/samples/Chat'));
const POS = lazy(() => import('./pages/samples/PointOfSale'));
const OnlineCourse = lazy(() => import('./pages/samples/OnlineCourse'));
const AIChatAssistant = lazy(() => import('./pages/samples/AIChatAssistant'));


const App: React.FC = () => {
  return (
    <ToastProvider>
      <Suspense fallback={
        <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
          <Spinner size="lg" className="text-primary" />
        </div>
      }>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Private Admin Routes */}
          <Route path="/admin" element={<PrivateRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="profile/:userId" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="tasks" element={<Tasks />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="boards" element={<Boards />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="documentation" element={<Documentation />} />
              <Route path="components/forms" element={<Forms />} />
              <Route path="components/tables" element={<Tables />} />
              <Route path="components/advanced-selects" element={<AdvancedSelects />} />
              <Route path="components/avatars" element={<Avatars />} />
              <Route path="components/content" element={<Content />} />
              <Route path="components/editor" element={<Editor />} />
              <Route path="components/feedback" element={<Feedback />} />
              <Route path="components/icons" element={<Icons />} />
              <Route path="components/images" element={<Images />} />
              <Route path="components/loaders" element={<Loaders />} />
              <Route path="components/navigation" element={<Navigation />} />
              <Route path="components/overlays" element={<Overlays />} />
              <Route path="components/text-fields" element={<TextFields />} />
              <Route path="components/toggles" element={<Toggles />} />

              <Route path="erp/products" element={<ERPProducts />} />
              <Route path="erp/orders" element={<ERPOrders />} />
              <Route path="erp/customers" element={<ERPCustomers />} />
              
              <Route index element={<Navigate to="dashboard" />} />
            </Route>
          </Route>
          
          {/* Public Sample Routes */}
          <Route path="/" element={<PublicLayout />}>
              <Route index element={<LandingPage />} />
              <Route path="sample/products" element={<ProductCatalog />} />
              <Route path="sample/products/:productId" element={<ProductDetail />} />
              <Route path="sample/checkout" element={<Checkout />} />
              <Route path="sample/blog" element={<Blog />} />
              <Route path="sample/chat" element={<Chat />} />
              <Route path="sample/pos" element={<POS />} />
              <Route path="sample/course" element={<OnlineCourse />} />
              <Route path="sample/ai-assistant" element={<AIChatAssistant />} />
          </Route>

        </Routes>
      </Suspense>
    </ToastProvider>
  );
};

export default App;
