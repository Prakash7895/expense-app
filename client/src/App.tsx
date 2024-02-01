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

const router = createBrowserRouter([
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/hello', element: <div>Hello</div> },
    ],
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
        <NextUIProvider>
          <RouterProvider router={router} />;
          <ToastContainer position='top-right' />
        </NextUIProvider>
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;
