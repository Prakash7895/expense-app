import { FC, useEffect, useState } from 'react';
import {
  Control,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
  useController,
} from 'react-hook-form';
import { Input as NextUIInput, SelectItem } from '@nextui-org/react';
import { countries as countryFlags } from 'country-flag-icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import icons from 'country-flag-icons/react/3x2';
import { countries } from '../utils/constants';
import { FormFields } from '../utils/types';
import Select from './Select';

interface InputProps {
  control: Control<
    {
      [x: string]: any;
    },
    any
  >;
  setValue: UseFormSetValue<any>;
  resetField: UseFormResetField<any>;
  register: UseFormRegister<any>;
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
  description,
  showCountryCode,
  register,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('IN');

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

  let countryCodeContent;

  const [_, idxNum] = name?.split('.');

  if (showCountryCode) {
    const selectedOption: any = options.find(
      (option) => option.field === selectedCountry
    );
    const { name: countryCodeName, onBlur } = register(
      `countryCode${idxNum ? '.' + idxNum : ''}`,
      {
        value: selectedOption,
      }
    );

    const { field: countryCodeField } = useController({
      name: countryCodeName,
      control,
      defaultValue: selectedOption ?? '',
      shouldUnregister: true,
    });

    useEffect(() => {
      if (!showCode) {
        countryCodeField.onChange({});
      } else {
        countryCodeField.onChange(selectedOption);
      }
    }, [showCode]);

    countryCodeContent = (
      <>
        {showCode && (
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
              name={countryCodeName}
              items={options}
              value={selectedCountry}
              onBlur={onBlur}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                const selectedOption: any = options.find(
                  (option) => option.field === e.target.value
                );
                countryCodeField.onChange(selectedOption);
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
  }

  const errMessage = name?.split('.')?.reduce((acc: any, nam) => {
    return acc ? acc?.[nam] : {};
  }, errors);

  return (
    <NextUIInput
      size='sm'
      variant='bordered'
      key={name}
      name={name}
      label={label}
      isDisabled={isDisabled}
      value={field.value}
      className={`${!!errMessage?.message ? '' : 'pb-6'} ${className ?? ''}`}
      isInvalid={!!errMessage?.message}
      errorMessage={errMessage?.message as string}
      onChange={(e) => {
        if (subType === 'number') {
          const val = e.target.value?.replace(/[^0-9]/g, '');
          e.target.value = val;
        }
        if (showCountryCode) {
          const canShowCodes = /^\d+$/.test(e.target.value);
          setShowCode(canShowCodes);
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
      startContent={
        showCountryCode && countryCodeContent
          ? countryCodeContent
          : startContent
      }
      classNames={{
        ...classNames,
        label: `${showCode ? 'left-40' : ''} ${classNames?.label}`,
      }}
      description={description}
    />
  );
};

export default Input;
