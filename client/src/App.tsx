import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import { NextUIProvider } from '@nextui-org/react';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import PrivateRoutes from './components/PrivateRoutes';
import { createContext, useState } from 'react';
import Transaction from './pages/Transaction';
import Category from './pages/Category';
import Account from './pages/Account';

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

interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export const UserContext = createContext<{
  user: User | null;
  updateUser: (val: User) => void;
}>({
  user: null,
  updateUser: (_: User) => {},
});

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider
      value={{
        user: user,
        updateUser: (val: User) => {
          setUser(val);
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <NextUIProvider className='h-screen flex flex-col'>
          <RouterProvider router={router} />
          <ToastContainer position='top-right' />
        </NextUIProvider>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;
