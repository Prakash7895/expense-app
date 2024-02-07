import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const PrivateRoutes = () => {
  const accessToken = Cookies.get('access-token');

  return accessToken ? (
    <>
      <Navbar />
      <div
        className='flex flex-1 w-full'
        style={{
          height: 'calc(100% - 5rem)',
        }}
      >
        <Sidebar />
        <div className='flex-1 p-3 overflow-auto h-full'>
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoutes;
