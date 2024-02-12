import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { getSettings, setMode } from './utils/store/settingSlice';
import { lazy, useEffect } from 'react';
import { useAppDispatch } from './utils/types';
const Home = lazy(() => import('./pages/Home'));
const Transaction = lazy(() => import('./pages/Transaction'));
const Account = lazy(() => import('./pages/Account'));
const Category = lazy(() => import('./pages/Category'));
const Signup = lazy(() => import('./pages/Signup'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const PrivateRoutes = lazy(() => import('./components/PrivateRoutes'));

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
  const { mode, colorScheme } = useSelector(getSettings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const theme = window.matchMedia('(prefers-color-scheme: dark)');

    if (colorScheme === 'system') {
      dispatch(setMode(theme.matches ? 'dark' : 'light'));
    } else {
      dispatch(setMode(colorScheme));
    }
    const handleThemeChange = (event: MediaQueryListEvent) => {
      if (colorScheme === 'system') {
        dispatch(setMode(event.matches ? 'dark' : 'light'));
      }
    };

    theme.addEventListener('change', handleThemeChange);

    return () => {
      theme.removeEventListener('change', handleThemeChange);
    };
  }, [colorScheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider
        className={`h-screen flex flex-col ${mode} text-foreground-600 bg-background`}
      >
        <RouterProvider router={router} />
        <ToastContainer
          className='mt-5'
          position='top-right'
          toastClassName={`${mode} text-foreground-600 bg-background-700`}
          closeButton={({ closeToast }) => (
            <div onClick={closeToast} className='cursor-pointer'>
              <IoClose size={20} className={`${mode} text-foreground-600`} />
            </div>
          )}
        />
      </NextUIProvider>
    </QueryClientProvider>
  );
}

export default App;
