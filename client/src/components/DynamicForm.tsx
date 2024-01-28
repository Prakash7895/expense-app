import { Button, Card, Input } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormFields } from '../utils/types';
import { FC, ReactNode } from 'react';

interface DynamicFormProps {
  onSubmit: SubmitHandler<any>;
  fields: FormFields[];
  validationSchema?: any;
  formHeader?: ReactNode;
  fieldsWrapperComponent?: FC;
  fieldsWrapperClassName?: string;
  formClassName?: string;
  buttonsWrapperComponent?: FC;
  buttonWrapperClassName?: string;
  otherFooterElements?: ReactNode;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  onSubmit,
  fields,
  validationSchema,
  buttonsWrapperComponent,
  buttonWrapperClassName,
  otherFooterElements,
  fieldsWrapperClassName,
  fieldsWrapperComponent,
  formHeader,
  formClassName,
}) => {
  const { handleSubmit, register, formState } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { errors } = formState;
  console.log(errors);

  const ButtonWrapper = buttonsWrapperComponent ?? 'div';
  const FieldWrapper = fieldsWrapperComponent ?? 'div';

  return (
    <Card
      as={'form'}
      onSubmit={handleSubmit(onSubmit)}
      className={formClassName}
    >
      {formHeader}
      <FieldWrapper className={fieldsWrapperClassName}>
        {fields.map((field) => (
          <Input
            size='sm'
            variant='bordered'
            key={field.name}
            type={field.type}
            label={field.label}
            {...register(field.name)}
            className={`${!!errors[field.name]?.message ? '' : 'pb-6'} ${
              field.className ?? ''
            }`}
            isInvalid={!!errors[field.name]?.message}
            errorMessage={errors[field.name]?.message as string}
          />
        ))}
      </FieldWrapper>
      <ButtonWrapper className={buttonWrapperClassName}>
        <Button variant='flat' color='primary' type='submit'>
          Login
        </Button>
        {otherFooterElements}
      </ButtonWrapper>
    </Card>
  );
};

export default DynamicForm;
