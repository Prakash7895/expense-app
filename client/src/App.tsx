import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import { NextUIProvider } from '@nextui-org/react';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';

const router = createBrowserRouter([
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
]);

function App() {
  return (
    <NextUIProvider>
      <RouterProvider router={router} />;
    </NextUIProvider>
  );
}

export default App;
