import DynamicForm from '../components/DynamicForm';
import { loginSchema } from '../utils/validations';
import { loginFormFields } from '../utils/formFields';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppDispatch } from '../utils/types';
import { setUser } from '../utils/store/userSlice';
import { BsInfoCircleFill } from 'react-icons/bs';
import { Button, Tooltip } from '@nextui-org/react';
import { getSettings } from '../utils/store/settingSlice';
import { useSelector } from 'react-redux';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { mode } = useSelector(getSettings);

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
        Cookies.set('access-token', res.data.token);
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
              err?.response?.data?.message ??
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
        formHeader={
          <div className='flex items-center'>
            Login
            <Tooltip
              classNames={{
                content: `${mode} text-foreground bg-background`,
              }}
              content={
                <div className='p-3'>
                  <p>Explore with dummy account.</p>
                  <p className='text-default-500 text-small'>
                    Email: prakash_saran@yopmail.com
                  </p>
                  <p className='text-default-500 text-small'>
                    Password: Demo@123
                  </p>
                </div>
              }
            >
              <Button isIconOnly className='border-0 bg-transparent'>
                <BsInfoCircleFill size={15} className='text-default-400' />
              </Button>
            </Tooltip>
          </div>
        }
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
            <Link to='/signup' className='text-primary-500'>
              Sign Up
            </Link>
            <Link to='/forgot-password' className='text-secondary-600'>
              Forgot Password?
            </Link>
          </div>
        }
        buttonWrapperClassName='justify-start items-center flex-row-reverse gap-3'
      />
    </div>
  );
};

export default Login;
