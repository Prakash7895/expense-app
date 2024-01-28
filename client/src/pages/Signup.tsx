import { CardBody, CardFooter, CardHeader, Link } from '@nextui-org/react';
import DynamicForm from '../components/DynamicForm';
import { signupFormFields } from '../utils/formFields';
import { signupSchema } from '../utils/validations';

const Signup = () => {
  return (
    <div className='h-screen -mb-6 flex justify-center items-center'>
      <DynamicForm
        formClassName='w-1/4'
        fields={signupFormFields}
        onSubmit={(t) => console.log('TT', t)}
        validationSchema={signupSchema}
        formHeader={<CardHeader className='justify-center'>Sign up</CardHeader>}
        fieldsWrapperComponent={CardBody}
        buttonsWrapperComponent={CardFooter}
        submitButtonLabel='Sign up'
        otherFooterElements={
          <>
            <Link href='/forgot-password'>Forgot Password?</Link>
            <p>
              Already have an account? <Link href='/login'>Login</Link>
            </p>
          </>
        }
        buttonWrapperClassName='justify-center items-center flex-col gap-3'
      />
    </div>
  );
};

export default Signup;
