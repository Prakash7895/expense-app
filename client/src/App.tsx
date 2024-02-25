import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import { IoClose } from 'react-icons/io5';
import { getSettings, setMode } from './utils/store/settingSlice';
import { useEffect } from 'react';
import { useAppDispatch } from './utils/types';
import lazyWithPreload from './lazyWithPreload';
const Home = lazyWithPreload(() => import('./pages/Home'));
const Transaction = lazyWithPreload(() => import('./pages/Transaction'));
const Account = lazyWithPreload(() => import('./pages/Account'));
const Category = lazyWithPreload(() => import('./pages/Category'));
const Relations = lazyWithPreload(() => import('./pages/Relations'));
const Profile = lazyWithPreload(() => import('./pages/Profile'));
const PrivateRoutes = lazyWithPreload(
  () => import('./components/PrivateRoutes')
);

const Login = lazyWithPreload(() => import('./pages/Login'));
const Signup = lazyWithPreload(() => import('./pages/Signup'));
const ForgotPassword = lazyWithPreload(() => import('./pages/ForgotPassword'));
const DynamicForm = lazyWithPreload(() => import('./components/DynamicForm'));
const Input = lazyWithPreload(() => import('./components/Input'));

Input.preload();
DynamicForm.preload();
Login.preload();
Signup.preload();
ForgotPassword.preload();

export const sidebar = [
  { path: '/', label: 'Home', element: <Home /> },
  {
    path: '/transaction',
    label: 'Transaction',
    element: <Transaction />,
    onMouseOver: () => {
      Transaction.preload();
    },
  },
  {
    path: '/account',
    label: 'Account',
    element: <Account />,
    onMouseOver: () => {
      Account.preload();
    },
  },
  {
    path: '/category',
    label: 'Category',
    element: <Category />,
    onMouseOver: () => {
      Category.preload();
    },
  },
  {
    path: '/users',
    label: 'Users',
    element: <Relations />,
    onMouseOver: () => {
      Relations.preload();
    },
  },
];

const router = createBrowserRouter([
  { path: '/signup', element: <Signup /> },
  { path: '/login', element: <Login /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  {
    path: '/',
    element: <PrivateRoutes />,
    children: [...sidebar, { path: '/profile', element: <Profile /> }],
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
