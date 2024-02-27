import DynamicForm from '../components/DynamicForm';
import { signupFormFields } from '../utils/formFields';
import { signupSchema } from '../utils/validations';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { Link, useSearchParams } from 'react-router-dom';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [params] = useSearchParams();
  const emailOrPhone = params.get('emailOrPhone');

  const onSubmit = (t: any) => {
    setIsLoading(true);
    axiosInstance
      .post('/api/user/register', {
        ...t,
        countryCode: t.countryCode?.value ?? '',
      })
      .then(() => {
        toast.success('Registration successfull.');
        setIsLoading(false);
      })
      .catch((err: any) => {
        toast.error(
          <div>
            {err?.response?.data?.errors?.map((el: any) => (
              <p key={el.msg}>{el.msg}</p>
            ))}
          </div>
        );
        setIsLoading(false);
      });
  };

  return (
    <div className='h-screen -mb-6 flex justify-center items-center'>
      <DynamicForm
        hideCloseButton
        fields={signupFormFields(emailOrPhone)}
        onSubmit={onSubmit}
        validationSchema={signupSchema}
        formHeader={'Sign up'}
        submitButtonLabel='Sign up'
        submitButtonProps={{
          isLoading,
          isDisabled: isLoading,
        }}
        otherFooterElements={
          <>
            <p>
              Already have an account?{' '}
              <Link to='/login' className='text-primary-500'>
                Login
              </Link>
            </p>
          </>
        }
        buttonWrapperClassName='justify-center items-center flex-col gap-3'
      />
    </div>
  );
};

export default Signup;
