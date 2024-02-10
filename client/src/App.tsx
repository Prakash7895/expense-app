import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import PrivateRoutes from './components/PrivateRoutes';
import ForgotPassword from './pages/ForgotPassword';
import Transaction from './pages/Transaction';
import Category from './pages/Category';
import Account from './pages/Account';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import { getMode } from './utils/store/userSlice';

export const sidebar = [
  { path: '/', label: 'Home', element: <Home /> },
  {
    path: '/transaction',
    label: 'Transaction',
    element: <Transaction />,
  },
  {
    path: '/account',
    label: 'Account',
    element: <Account />,
  },
  {
    path: '/category',
    label: 'Category',
    element: <Category />,
  },
];

const router = createBrowserRouter([
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [...sidebar],
  },
]);

const queryClient = new QueryClient();

function App() {
  const mode = useSelector(getMode);
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider
        className={`h-screen flex flex-col ${mode} text-foreground-600 bg-content1`}
      >
        <RouterProvider router={router} />
        <ToastContainer position='top-right' />
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default App;
