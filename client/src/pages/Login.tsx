import { CardBody, CardFooter, CardHeader, Link } from '@nextui-org/react';
import DynamicForm from '../components/DynamicForm';
import { loginSchema } from '../utils/validations';
import { loginFormFields } from '../utils/formFields';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (t: any) => {
    setIsLoading(true);
    axiosInstance
      .post('/api/user/login', { ...t })
      .then((res) => {
        console.log('RES2:', res);
        toast.success('Login successfull.');
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log('ERR', err);
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
        formClassName='lg:w-1/4 md:w-1/3 sm:w-1/2 w-full m-10'
        fields={loginFormFields}
        onSubmit={onSubmit}
        validationSchema={loginSchema}
        formHeader={<CardHeader className='justify-center'>Login</CardHeader>}
        fieldsWrapperComponent={CardBody}
        buttonsWrapperComponent={CardFooter}
        submitButtonLabel='Login'
        submitButtonProps={{
          isLoading,
          isDisabled: isLoading,
        }}
        otherFooterElements={
          <>
            <Link href='/forgot-password'>Forgot Password?</Link>
            <Link href='/signup'>Sign Up</Link>
          </>
        }
        buttonWrapperClassName='justify-center items-center flex-col gap-3'
      />
    </div>
  );
};

export default Login;
