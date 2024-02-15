import DynamicForm from '../components/DynamicForm';
import { signupFormFields } from '../utils/formFields';
import { signupSchema } from '../utils/validations';
import { useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { countries as countryFlags } from 'country-flag-icons';
import icons from 'country-flag-icons/react/3x2';
import { countries } from '../utils/constants';
import Select from '../components/Select';
import { SelectItem } from '@nextui-org/react';

const Signup = () => {
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

  const onSubmit = (t: any) => {
    setIsLoading(true);
    axiosInstance
      .post('/api/user/register', { ...t, countryCode: selectedOption?.value })
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

  return (
    <div className='h-screen -mb-6 flex justify-center items-center'>
      <DynamicForm
        hideCloseButton
        formClassName='lg:w-1/4 md:w-1/3 sm:w-1/2 w-full m-10'
        fields={signupFormFields(
          showCountryCode,
          setShowCountryCode,
          startContent
        )}
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
