import DynamicForm from '../components/DynamicForm';
import { forgotPassFormFields } from '../utils/formFields';
import { forgotPassSchema } from '../utils/validations';
import { useState } from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { errorToast } from '../utils';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [gotOtp, setGotOtp] = useState(false);
  const [OtpEntered, setOtpEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const otpDescription = (val: any) => (
    <div>
      <p
        className='text-default cursor-pointer'
        onClick={() => {
          axiosInstance
            .post('/api/user/resend-otp', {
              emailOrPhone: val?.emailOrPhone,
              countryCode: val?.countryCode?.value,
            })
            .then((res) => {
              toast.success(res.data?.message);
            })
            .catch((err) => {
              errorToast(err);
            });
        }}
      >
        Resend OTP
      </p>
    </div>
  );

  const [formFields, setFormFields] = useState([
    forgotPassFormFields(otpDescription)[0],
  ]);

  const onSubmit = (t: any, _: any, reset: any) => {
    console.log('onSubmit', t);
    setIsLoading(true);
    if (!gotOtp) {
      axiosInstance
        .post('/api/user/get-otp', {
          emailOrPhone: t?.emailOrPhone,
          countryCode: t?.countryCode?.value,
        })
        .then((res) => {
          console.log('RES', res);
          toast.success(res.data?.message);
          setFormFields(
            forgotPassFormFields(otpDescription)
              .slice(0, 2)
              .map((f) => ({
                ...f,
                isDisabled: f.name === 'emailOrPhone',
              }))
          );
          setGotOtp(true);
          setIsLoading(false);
        })
        .catch((err) => {
          errorToast(err);
          setIsLoading(false);
        });
    } else if (!OtpEntered) {
      axiosInstance
        .post('/api/user/verify-otp', {
          emailOrPhone: t?.emailOrPhone,
          countryCode: t?.countryCode?.value,
          otp: t?.otp,
        })
        .then((res) => {
          console.log('RES2222', res);
          toast.success(res.data?.message);
          setFormFields(
            forgotPassFormFields(otpDescription).map((f) => ({
              ...f,
              isDisabled: ['emailOrPhone', 'otp'].includes(f.name),
            }))
          );
          setOtpEntered(true);
          setIsLoading(false);
        })
        .catch((err) => {
          errorToast(err);
          setIsLoading(false);
        });
    } else {
      axiosInstance
        .post('/api/user/reset-password', {
          emailOrPhone: t?.emailOrPhone,
          countryCode: t?.countryCode?.value,
          otp: t?.otp,
          password: t?.password,
        })
        .then((res) => {
          console.log('RES33333', res);
          reset();
          toast.success(res.data?.message);
          setIsLoading(false);
          setOtpEntered(false);
          setGotOtp(false);
          setFormFields([forgotPassFormFields(otpDescription)[0]]);
        })
        .catch((err) => {
          errorToast(err);
          setIsLoading(false);
        });
    }
  };

  const onFormBack = () => {
    if (OtpEntered) {
      setFormFields(
        forgotPassFormFields(otpDescription)
          .slice(0, 2)
          .map((f) => ({
            ...f,
            isDisabled: f.name === 'emailOrPhone',
          }))
      );
      setOtpEntered(false);
    } else if (gotOtp) {
      setFormFields([forgotPassFormFields(otpDescription)[0]]);
      setGotOtp(false);
    }
  };

  return (
    <div className='h-screen -mb-6 flex justify-center items-center'>
      <DynamicForm
        hideCloseButton
        fields={formFields}
        onSubmit={onSubmit}
        validationSchema={forgotPassSchema(gotOtp, OtpEntered)}
        submitButtonProps={{
          isLoading,
          isDisabled: isLoading,
        }}
        formHeader={
          <div className='justify-center pl-4'>
            {gotOtp && (
              <IoArrowBackSharp
                className='absolute left-4 cursor-pointer'
                onClick={onFormBack}
              />
            )}
            Forgot Password
          </div>
        }
        submitButtonLabel={
          gotOtp ? (OtpEntered ? 'Reset Password' : 'Verify OTP') : 'Get OTP'
        }
        otherFooterElements={
          <>
            <p>
              Go to{' '}
              <Link to='/login' className='text-primary-500'>
                Login
              </Link>{' '}
              page
            </p>
          </>
        }
        buttonWrapperClassName='justify-center items-center flex-col gap-3'
      />
    </div>
  );
};

export default ForgotPassword;
