import { FC, useState } from 'react';
import { Control, useController } from 'react-hook-form';
import { Input as NextUIInput } from '@nextui-org/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FormFields } from '../utils/types';

interface InputProps {
  control: Control<
    {
      [x: string]: any;
    },
    any
  >;
}

const Input: FC<InputProps & FormFields> = ({
  label,
  name,
  className,
  type,
  isDisabled,
  subType,
  control,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
    defaultValue: '',
  });

  return (
    <NextUIInput
      size='sm'
      variant='bordered'
      key={name}
      label={label}
      isDisabled={isDisabled}
      value={field.value}
      className={`${!!errors[name]?.message ? '' : 'pb-6'} ${className ?? ''}`}
      isInvalid={!!errors[name]?.message}
      errorMessage={errors[name]?.message as string}
      onChange={(e) => {
        if (subType === 'number') {
          const val = e.target.value?.replace(/[^0-9]/g, '');
          e.target.value = val;
        }
        field.onChange(e);
      }}
      endContent={
        type === 'password' ? (
          <button
            className='focus:outline-none'
            type='button'
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <FaEye className='text-2xl text-default-400 pointer-events-none' />
            ) : (
              <FaEyeSlash className='text-2xl text-default-400 pointer-events-none' />
            )}
          </button>
        ) : null
      }
      type={type === 'password' ? (isVisible ? 'text' : 'password') : type}
    />
  );
};

export default Input;
