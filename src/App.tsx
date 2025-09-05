import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './contexts/ToastContext';

// Layouts
import AuthLayout from './components/AuthLayout';
import DashboardLayout from './components/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import PublicLayout from './components/PublicLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';
import Documentation from './pages/Documentation';
import CalendarPage from './pages/CalendarPage';
import Appointments from './pages/Appointments';
import Forms from './pages/Forms';
import Editor from './pages/Editor';
import Feedback from './pages/Feedback';
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
import Boards from './pages/Boards';

// ERP Pages
import ErpProducts from './pages/erp/Products';
import ErpOrders from './pages/erp/Orders';
import ErpCustomers from './pages/erp/Customers';


// Auth Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

// Sample Public Pages
import LandingPage from './pages/LandingPage';
import ProductCatalog from './pages/samples/ProductCatalog';
import ProductDetail from './pages/samples/ProductDetail';
import Checkout from './pages/samples/Checkout';
import Blog from './pages/samples/Blog';
import Chat from './pages/samples/Chat';
import PointOfSale from './pages/samples/PointOfSale';
import OnlineCourse from './pages/samples/OnlineCourse';
import AIChatAssistant from './pages/samples/AIChatAssistant';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Routes>
        {/* Auth Routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* Private App Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/boards" element={<Boards />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/forms" element={<Forms />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/feedback" element={<Feedback />} />
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

            {/* ERP Routes */}
            <Route path="/erp/products" element={<ErpProducts />} />
            <Route path="/erp/orders" element={<ErpOrders />} />
            <Route path="/erp/customers" element={<ErpCustomers />} />
          </Route>
        </Route>

        {/* Public Sample Pages */}
        <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sample/products" element={<ProductCatalog />} />
            <Route path="/sample/products/:productId" element={<ProductDetail />} />
            <Route path="/sample/checkout" element={<Checkout />} />
            <Route path="/sample/blog" element={<Blog />} />
            <Route path="/sample/chat" element={<Chat />} />
            <Route path="/sample/pos" element={<PointOfSale />} />
            <Route path="/sample/course" element={<OnlineCourse />} />
            <Route path="/sample/ai-chat" element={<AIChatAssistant />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ToastProvider>
  );
};

export default App;