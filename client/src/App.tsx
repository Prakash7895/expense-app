import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import { NextUIProvider } from '@nextui-org/react';

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/forgot-password', element: <></> },
]);

function App() {
  return (
    <NextUIProvider>
      <RouterProvider router={router} />;
    </NextUIProvider>
  );
}

export default App;
