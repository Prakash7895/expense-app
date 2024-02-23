import { FC } from 'react';
import Input from './Input';
import { FormFields } from '../utils/types';
import {
  Control,
  UseFormRegister,
  UseFormResetField,
  UseFormSetValue,
  UseFormWatch,
  useController,
} from 'react-hook-form';
import { SelectItem, Textarea } from '@nextui-org/react';
import Select from './Select';
import AutoComplete from './AutoComplete';

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
  register: UseFormRegister<{}>;
  initialValues?: { [key: string]: any };
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
  description,
  descriptionNode,
  showCountryCode,
  register,
  initialValues,
  autoCompleteItem,
  fetchData,
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

    case 'autocomplete':
      return (
        <AutoComplete
          {...field}
          label={label}
          type={type}
          errors={errors}
          defaultValue={defaultValue}
          initialValues={initialValues}
          autoCompleteItem={autoCompleteItem}
          fetchData={fetchData}
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
          description={
            description ?? (descriptionNode && descriptionNode(watch()))
          }
          showCountryCode={showCountryCode}
          register={register}
        />
      );
  }
};

export default FormElements;
