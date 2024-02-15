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
import { SelectItem, Textarea } from '@nextui-org/react';
import Select from './Select';

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
  startContent,
  classNames,
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

    case 'textarea':
      return (
        <Textarea
          label={label}
          className={`${!!errors[name]?.message ? '' : 'pb-6'} ${
            className ?? ''
          }`}
          isInvalid={!!errors[name]?.message}
          errorMessage={errors[name]?.message as string}
          {...field}
          size='sm'
          variant='bordered'
        />
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
          setValue={setValue}
          resetField={resetField}
          classNames={classNames}
          startContent={startContent}
          onFieldChange={onFieldChange}
        />
      );
  }
};

export default FormElements;
