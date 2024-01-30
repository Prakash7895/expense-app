import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import { NextUIProvider } from '@nextui-org/react';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <RouterProvider router={router} />;
        <ToastContainer position='top-right' />
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default App;
