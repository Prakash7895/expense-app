import { FC } from 'react';
import Input from './Input';
import { FormFields } from '../utils/types';
import {
  Control,
  UseFormResetField,
  UseFormSetValue,
  UseFormWatch,
  useController,
} from 'react-hook-form';
import { Select, SelectItem } from '@nextui-org/react';

interface FormElementsProps {
  control: Control<
    {
      [x: string]: any;
    },
    any
  >;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  resetField: UseFormResetField<any>;
}

const FormElements: FC<FormElementsProps & FormFields> = ({
  control,
  label,
  name,
  type,
  className,
  defaultValue,
  isDisabled,
  options,
  subType,
  watch,
  setValue,
  resetField,
  onFieldChange,
}) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
    shouldUnregister: true,
  });

  switch (type) {
    case 'select':
      return (
        <Select
          label={label}
          variant='bordered'
          size='sm'
          className={`${!!errors[name]?.message ? '' : 'pb-6'} ${
            className ?? ''
          }`}
          isInvalid={!!errors[name]?.message}
          errorMessage={errors[name]?.message as string}
          defaultSelectedKeys={field.value ? [field.value] : []}
          {...field}
          onChange={(e) => {
            if (onFieldChange) {
              onFieldChange(e, resetField, setValue);
            }
            field.onChange(e);
          }}
        >
          {(typeof options === 'function' ? options(watch()) : options)!.map(
            (option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            )
          )}
        </Select>
      );

    default:
      return (
        <Input
          label={label}
          name={name}
          className={className}
          defaultValue={defaultValue}
          isDisabled={isDisabled}
          control={control}
          type={type}
          subType={subType}
        />
      );
  }
};

export default FormElements;
