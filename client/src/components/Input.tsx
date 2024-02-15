import { FC, useState } from 'react';
import {
  Control,
  UseFormResetField,
  UseFormSetValue,
  useController,
} from 'react-hook-form';
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
  setValue: UseFormSetValue<any>;
  resetField: UseFormResetField<any>;
}

const Input: FC<InputProps & FormFields> = ({
  label,
  name,
  className,
  type,
  isDisabled,
  subType,
  control,
  defaultValue,
  setValue,
  resetField,
  onFieldChange,
  startContent,
  classNames,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
    defaultValue: defaultValue ?? '',
    shouldUnregister: true,
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
        if (onFieldChange) {
          onFieldChange(e, resetField, setValue);
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
      startContent={startContent}
      classNames={classNames}
    />
  );
};

export default Input;
