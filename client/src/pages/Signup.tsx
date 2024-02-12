import DynamicForm from '../components/DynamicForm';
import { signupFormFields } from '../utils/formFields';
import { signupSchema } from '../utils/validations';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (t: any) => {
    setIsLoading(true);
    axiosInstance
      .post('/api/user/register', { ...t })
      .then((res) => {
        console.log('RES2:', res);
        toast.success('Registration successfull.');
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.log('ERR', err);
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
        formClassName='lg:w-1/4 md:w-1/3 sm:w-1/2 w-full m-10'
        fields={signupFormFields}
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
              Already have an account? <Link to='/login'>Login</Link>
            </p>
          </>
        }
        buttonWrapperClassName='justify-center items-center flex-col gap-3'
      />
    </div>
  );
};

export default Signup;
