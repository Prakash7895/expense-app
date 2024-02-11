import {
  Avatar,
  Button,
  DropdownItem,
  DropdownTrigger,
  NavbarBrand,
  NavbarContent,
  Navbar as NextNavBar,
  Skeleton,
} from '@nextui-org/react';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/axiosInstance';
import {
  ColorScheme,
  User,
  useAppDispatch,
  useAppSelector,
} from '../utils/types';
import {
  getColorSheme,
  getMode,
  getUser,
  setColorScheme,
  setMode,
  setUser,
} from '../utils/store/userSlice';
import { setCategory } from '../utils/store/categorySlice';
import { IoMoon, IoSettings, IoSunny } from 'react-icons/io5';
import Dropdown from './Dropdown';
import DropdownMenu from './DropdownMenu';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const mode = useAppSelector(getMode);
  const colorScheme = useAppSelector(getColorSheme);

  const userQuery = useQuery<User>({
    queryKey: ['loggedInUser'],
    queryFn: async () => {
      return axiosInstance
        .get('/api/user/profile')
        .then((res) => res.data.data);
    },
  });

  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      return axiosInstance
        .get('/api/category/list?pageNo=1&pageSize=10&getAll=true')
        .then((res) => res.data.data);
    },
  });

  useEffect(() => {
    if (userQuery.data && !userQuery.isPending && userQuery.isFetched) {
      dispatch(setUser(userQuery.data));
    }
  }, [userQuery.data]);

  useEffect(() => {
    if (
      categoryQuery.data &&
      !categoryQuery.isPending &&
      categoryQuery.isFetched
    ) {
      dispatch(setCategory(categoryQuery.data));
    }
  }, [categoryQuery.data]);

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
    <NextNavBar
      isBordered
      className={`shadow-md ${mode} text-foreground-800 bg-background`}
    >
      <NavbarBrand>
        <Skeleton isLoaded={!!user} className='w-3/5 rounded-lg'>
          <p className='font-bold text-inherit'>
            {user?.firstName + ' ' + user?.lastName}
          </p>
        </Skeleton>
      </NavbarBrand>

      {/* <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href='#' aria-current='page'>
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color='foreground' href='#'>
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarContent as='div' justify='end'>
        <Dropdown>
          <DropdownTrigger>
            <Button variant='bordered' isIconOnly>
              {colorScheme === 'dark' ? (
                <IoMoon />
              ) : colorScheme === 'light' ? (
                <IoSunny />
              ) : (
                <IoSettings />
              )}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            selectedKeys={new Set([colorScheme])}
            selectionMode='single'
            aria-label='theme setting'
            onSelectionChange={(val) => {
              if (val !== 'all') {
                val.forEach((v) => {
                  dispatch(setColorScheme(v as ColorScheme));
                  localStorage.setItem('colorScheme', v as string);
                });
              }
            }}
          >
            <DropdownItem key='dark'>
              <span className='flex items-center gap-3'>
                <IoMoon /> Dark
              </span>
            </DropdownItem>
            <DropdownItem key='light' className='flex items-center gap-3'>
              <span className='flex items-center gap-3'>
                <IoSunny /> Light
              </span>
            </DropdownItem>
            <DropdownItem key='system' className='flex items-center gap-3'>
              <span className='flex items-center gap-3'>
                <IoSettings /> System
              </span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Dropdown placement='bottom-end'>
          <Skeleton
            isLoaded={!!user}
            className='flex justify-center items-center rounded-full w-10 h-10'
          >
            <DropdownTrigger>
              <Avatar
                isBordered
                as='button'
                className='transition-transform'
                name='Jason Hughes'
                size='sm'
                src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
              />
            </DropdownTrigger>
          </Skeleton>

          <DropdownMenu aria-label='Profile Actions'>
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold'>Signed in as</p>
              <p className='font-semibold'>
                ${user?.email ?? user?.phone ?? 'N/A'}
              </p>
            </DropdownItem>
            {/* <DropdownItem key='settings'>My Settings</DropdownItem>
            <DropdownItem key='team_settings'>Team Settings</DropdownItem>
            <DropdownItem key='analytics'>Analytics</DropdownItem>
            <DropdownItem key='system'>System</DropdownItem>
            <DropdownItem key='configurations'>Configurations</DropdownItem>
            <DropdownItem key='help_and_feedback'>Help & Feedback</DropdownItem> */}
            <DropdownItem
              key='logout'
              color='danger'
              onClick={() => {
                Cookies.remove('access-token');
                navigate('/login');
              }}
            >
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </NextNavBar>
  );
};

export default Navbar;
