import { CardBody, CardFooter, CardHeader, Link } from '@nextui-org/react';
import DynamicForm from '../components/DynamicForm';
import { forgotPassFormFields } from '../utils/formFields';
import { forgotPassSchema } from '../utils/validations';
import { useState } from 'react';

const ForgotPassword = () => {
  const [formFields, setFormFields] = useState([forgotPassFormFields[0]]);
  const [gotOtp, setGotOtp] = useState(false);

  const onSubmit = (t: any) => {
    console.log('onSubmit', t);
    if (!gotOtp) {
      setFormFields(
        forgotPassFormFields.map((f) => ({
          ...f,
          isDisabled: f.name === 'emailOrPhone',
        }))
      );
      setGotOtp(true);
    }
  };

  return (
    <div className='h-screen -mb-6 flex justify-center items-center'>
      <DynamicForm
        formClassName='w-1/4'
        fields={formFields}
        onSubmit={onSubmit}
        validationSchema={forgotPassSchema(gotOtp)}
        formHeader={<CardHeader className='justify-center'>Sign up</CardHeader>}
        fieldsWrapperComponent={CardBody}
        buttonsWrapperComponent={CardFooter}
        submitButtonLabel={gotOtp ? 'Reset Password' : 'Get OTP'}
        otherFooterElements={
          <>
            <p>
              Go to <Link href='/login'>Login</Link> page
            </p>
          </>
        }
        buttonWrapperClassName='justify-center items-center flex-col gap-3'
      />
    </div>
  );
};

export default ForgotPassword;
