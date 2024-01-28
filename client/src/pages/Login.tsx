import { CardBody, CardFooter, CardHeader, Link } from '@nextui-org/react';
import DynamicForm from '../components/DynamicForm';
import { loginSchema } from '../utils/validations';
import { loginFormFields } from '../utils/formFields';

const Login = () => {
  return (
    <div className='h-screen -mb-6 flex justify-center items-center'>
      <DynamicForm
        formClassName='w-1/4'
        fields={loginFormFields}
        onSubmit={(t) => console.log('TT', t)}
        validationSchema={loginSchema}
        formHeader={<CardHeader className='justify-center'>Login</CardHeader>}
        fieldsWrapperComponent={CardBody}
        buttonsWrapperComponent={CardFooter}
        submitButtonLabel='Login'
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
