import axios from 'axios';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response.status === 401 &&
      error.response.data.message === 'Unauthorized'
    ) {
      Cookies.remove('access-token');
      window.location.replace('/login');
    }
    throw error;
  }
);

export default axiosInstance;
