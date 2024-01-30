import { CardBody, CardFooter, CardHeader, Link } from '@nextui-org/react';
import DynamicForm from '../components/DynamicForm';
import { forgotPassFormFields } from '../utils/formFields';
import { forgotPassSchema } from '../utils/validations';
import { useState } from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';

const ForgotPassword = () => {
  const [formFields, setFormFields] = useState([forgotPassFormFields[0]]);
  const [gotOtp, setGotOtp] = useState(false);
  const [OtpEntered, setOtpEntered] = useState(false);

  const onSubmit = (t: any) => {
    console.log('onSubmit', t);
    if (!gotOtp) {
      setFormFields(
        forgotPassFormFields.slice(0, 2).map((f) => ({
          ...f,
          isDisabled: f.name === 'emailOrPhone',
        }))
      );
      setGotOtp(true);
    } else if (!OtpEntered) {
      setFormFields(
        forgotPassFormFields.map((f) => ({
          ...f,
          isDisabled: ['emailOrPhone', 'otp'].includes(f.name),
        }))
      );
      setOtpEntered(true);
    }
  };

  const onFormBack = () => {
    if (OtpEntered) {
      setFormFields(
        forgotPassFormFields.slice(0, 2).map((f) => ({
          ...f,
          isDisabled: f.name === 'emailOrPhone',
        }))
      );
      setOtpEntered(false);
    } else if (gotOtp) {
      setFormFields([forgotPassFormFields[0]]);
      setGotOtp(false);
    }
  };

  return (
    <div className='h-screen -mb-6 flex justify-center items-center'>
      <DynamicForm
        formClassName='lg:w-1/4 md:w-1/3 sm:w-1/2 w-full m-10'
        fields={formFields}
        onSubmit={onSubmit}
        validationSchema={forgotPassSchema(gotOtp, OtpEntered)}
        formHeader={
          <CardHeader className='justify-center'>
            {gotOtp && (
              <IoArrowBackSharp
                className='absolute left-4 cursor-pointer'
                onClick={onFormBack}
              />
            )}
            Sign up
          </CardHeader>
        }
        fieldsWrapperComponent={CardBody}
        buttonsWrapperComponent={CardFooter}
        submitButtonLabel={
          gotOtp ? (OtpEntered ? 'Reset Password' : 'Verify OTP') : 'Get OTP'
        }
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
