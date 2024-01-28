import { Button, Card, ButtonProps } from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormFields } from '../utils/types';
import { FC, ReactNode } from 'react';
import Input from './Input';

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
  submitButtonProps?: ButtonProps;
  submitButtonLabel: string;
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
  submitButtonProps,
  submitButtonLabel,
}) => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(validationSchema),
  });

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
          <Input key={field.name} {...field} control={control} />
        ))}
      </FieldWrapper>
      <ButtonWrapper className={buttonWrapperClassName}>
        <Button
          variant='flat'
          color='primary'
          type='submit'
          {...submitButtonProps}
        >
          {submitButtonLabel}
        </Button>
        {otherFooterElements}
      </ButtonWrapper>
    </Card>
  );
};

export default DynamicForm;
