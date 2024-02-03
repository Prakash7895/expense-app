import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const PrivateRoutes = () => {
  const accessToken = Cookies.get('access-token');

  return accessToken ? (
    <>
      <Navbar />
      <div className='flex flex-1 h-full w-full'>
        <Sidebar />
        <div className='flex-1 p-3'>
          <Outlet />
        </div>
      </div>
    </>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoutes;
