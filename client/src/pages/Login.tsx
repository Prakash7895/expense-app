import { Link } from '@nextui-org/react';
import DynamicForm from '../components/DynamicForm';
import { loginSchema } from '../utils/validations';
import { loginFormFields } from '../utils/formFields';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../utils/types';
import { setUser } from '../utils/store/userSlice';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = Cookies.get('access-token');
    if (accessToken) {
      navigate('/');
    }
  }, []);

  const onSubmit = (t: any) => {
    setIsLoading(true);
    axiosInstance
      .post('/api/user/login', { ...t })
      .then((res) => {
        dispatch(setUser(res.data?.user));
        toast.success('Login successfull.');
        setIsLoading(false);
        navigate('/');
      })
      .catch((err: any) => {
        toast.error(
          <div>
            {err?.response?.data?.errors?.map((el: any) => (
              <p key={el.msg}>{el.msg}</p>
            )) ??
              err?.message ??
              'Error'}
          </div>
        );
        setIsLoading(false);
      });
  };

  return (
    <div className='h-screen -mb-6 flex justify-center items-center'>
      <DynamicForm
        hideCloseButton
        formHeader='Login'
        onSubmit={onSubmit}
        fields={loginFormFields}
        submitButtonLabel='Sign In'
        validationSchema={loginSchema}
        fieldsWrapperClassName='gap-0'
        submitButtonProps={{
          isLoading,
          isDisabled: isLoading,
        }}
        otherFormBodyElements={
          <div className='flex justify-between'>
            <Link href='/signup'>Sign Up</Link>
            <Link href='/forgot-password'>Forgot Password?</Link>
          </div>
        }
        buttonWrapperClassName='justify-start items-center flex-row-reverse gap-3'
      />
    </div>
  );
};

export default Login;
