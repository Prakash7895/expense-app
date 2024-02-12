import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useSelector } from 'react-redux';
import { getSettings, setShowSidebar } from '../utils/store/settingSlice';
import { useAppDispatch } from '../utils/types';
import { Suspense } from 'react';

const PrivateRoutes = () => {
  const accessToken = Cookies.get('access-token');
  const dispatch = useAppDispatch();
  const { showSidebar } = useSelector(getSettings);

  return accessToken ? (
    <>
      <Navbar />
      <div
        className='flex flex-1 w-full relative'
        style={{
          height: 'calc(100% - 5rem)',
        }}
      >
        <Sidebar />
        <div
          onClick={() => dispatch(setShowSidebar(!showSidebar))}
          className={`bg-slate-500 opacity-30 absolute z-40 ${
            showSidebar ? 'top-0 bottom-0 left-0 right-0' : ''
          }`}
        ></div>
        <div className='flex-1 p-3 overflow-auto h-full'>
          <Suspense fallback={<div>Loading......</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoutes;
