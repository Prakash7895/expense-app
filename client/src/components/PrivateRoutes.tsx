import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const PrivateRoutes = () => {
  const accessToken = Cookies.get('access-token');

  return accessToken ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to='/login' />
  );
};

export default PrivateRoutes;
