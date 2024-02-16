import DynamicForm from '../components/DynamicForm';
import { forgotPassFormFields } from '../utils/formFields';
import { forgotPassSchema } from '../utils/validations';
import { useEffect, useState } from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { countries as countryFlags } from 'country-flag-icons';
import { countries } from '../utils/constants';
import icons from 'country-flag-icons/react/3x2';
import Select from '../components/Select';
import { SelectItem } from '@nextui-org/react';
import axiosInstance from '../utils/axiosInstance';
import { errorToast } from '../utils';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [gotOtp, setGotOtp] = useState(false);
  const [OtpEntered, setOtpEntered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showCountryCode, setShowCountryCode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('IN');

  const options = countryFlags
    .map((country) => {
      const c = countries.find((c) => c.code === country);
      return {
        value: c?.countryCode,
        Flag: icons[country as keyof typeof icons],
        label: c?.name,
        field: c?.code,
      };
    })
    .filter((country) => !!country.value)
    .sort((a, b) => (a.label! < b.label! ? -1 : 1));

  const selectedOption: any = options.find(
    (option) => option.field === selectedCountry
  );

  const startContent = (
    <>
      {showCountryCode && (
        <div className='relative w-full max-w-36 h-full'>
          <Select
            label='Country Code'
            variant='bordered'
            size='sm'
            className='absolute -top-[6px] -left-3.5'
            classNames={{
              popoverContent: '!w-[250px]',
              value: 'w-0',
              trigger: 'border-0 border-r-2',
            }}
            items={options}
            onChange={(e) => {
              console.log('change', e.target.value);
              setSelectedCountry(e.target.value);
            }}
            selectedKeys={selectedCountry ? [selectedCountry] : []}
            startContent={
              selectedCountry ? (
                <div className='w-full flex items-center truncate'>
                  {selectedOption?.Flag({ className: 'h-4 shrink-0' })}
                  <p>{selectedOption?.value}</p>
                </div>
              ) : null
            }
          >
            {(item: any) => {
              const Flag = item.Flag;

              return (
                <SelectItem
                  textValue={item.value}
                  key={item.field}
                  classNames={{
                    title: 'flex items-center justify-start gap-3',
                  }}
                >
                  <Flag className='h-6 shrink-0' />
                  <div className='flex-1 flex flex-wrap flex-col text-wrap'>
                    <p className='text-default-700'>{item.label}</p>
                    <p>{item.value}</p>
                  </div>
                </SelectItem>
              );
            }}
          </Select>
        </div>
      )}
    </>
  );

  const otpDescription = (val: any) => (
    <div>
      <p
        className='text-default cursor-pointer'
        onClick={() => {
          axiosInstance
            .post('/api/user/resend-otp', {
              emailOrPhone: val?.emailOrPhone,
              countryCode: selectedOption?.value,
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
    forgotPassFormFields(
      showCountryCode,
      setShowCountryCode,
      startContent,
      otpDescription
    )[0],
  ]);

  useEffect(() => {
    if (!gotOtp && !OtpEntered) {
      setFormFields([
        forgotPassFormFields(
          showCountryCode,
          setShowCountryCode,
          startContent,
          otpDescription
        )[0],
      ]);
    }
  }, [showCountryCode]);

  const onSubmit = (t: any, _: any, reset: any) => {
    console.log('onSubmit', t);
    setIsLoading(true);
    if (!gotOtp) {
      axiosInstance
        .post('/api/user/get-otp', {
          emailOrPhone: t?.emailOrPhone,
          countryCode: selectedOption?.value,
        })
        .then((res) => {
          console.log('RES', res);
          toast.success(res.data?.message);
          setFormFields(
            forgotPassFormFields(
              showCountryCode,
              setShowCountryCode,
              startContent,
              otpDescription
            )
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
          countryCode: selectedOption?.value,
          otp: t?.otp,
        })
        .then((res) => {
          console.log('RES2222', res);
          toast.success(res.data?.message);
          setFormFields(
            forgotPassFormFields(
              showCountryCode,
              setShowCountryCode,
              startContent,
              otpDescription
            ).map((f) => ({
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
          countryCode: selectedOption?.value,
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
          setFormFields([
            forgotPassFormFields(
              showCountryCode,
              setShowCountryCode,
              startContent,
              otpDescription
            )[0],
          ]);
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
        forgotPassFormFields(
          showCountryCode,
          setShowCountryCode,
          startContent,
          otpDescription
        )
          .slice(0, 2)
          .map((f) => ({
            ...f,
            isDisabled: f.name === 'emailOrPhone',
          }))
      );
      setOtpEntered(false);
    } else if (gotOtp) {
      setFormFields([
        forgotPassFormFields(
          showCountryCode,
          setShowCountryCode,
          startContent,
          otpDescription
        )[0],
      ]);
      setGotOtp(false);
    }
  };

  return (
    <div className='h-screen -mb-6 flex justify-center items-center'>
      <DynamicForm
        hideCloseButton
        formClassName='lg:w-1/4 md:w-1/3 sm:w-1/2 w-full m-10'
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
