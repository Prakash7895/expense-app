import {
  Button,
  ButtonProps,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { FieldValues, UseFormReset, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormFields } from '../utils/types';
import { FC, ReactNode } from 'react';
import FormElements from './FormElements';
import NextUIModal from './NextUIModal';

interface DynamicFormProps {
  onSubmit: (
    data: FieldValues,
    event?: React.BaseSyntheticEvent,
    reset?: UseFormReset<any>
  ) => unknown | Promise<unknown>;
  fields: FormFields[];
  validationSchema?: any;
  formHeader?: ReactNode;
  fieldsWrapperComponent?: FC;
  fieldsWrapperClassName?: string;
  formClassName?: string;
  buttonsWrapperComponent?: FC;
  buttonWrapperClassName?: string;
  otherFooterElements?: ReactNode;
  otherFormBodyElements?: ReactNode;
  submitButtonProps?: ButtonProps;
  submitButtonLabel?: string;
  onOpenChange?: (e: any) => void;
  hideCloseButton?: boolean;
  initialValues?: { [key: string]: any };
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
  submitButtonProps = {},
  submitButtonLabel,
  otherFormBodyElements,
  onOpenChange,
  hideCloseButton,
  initialValues,
}) => {
  const defaultValues = fields.reduce((acc, field) => {
    return {
      ...acc,
      [field.name]: initialValues?.[field.name] ?? field.defaultValue ?? '',
    };
  }, {});

  const {
    handleSubmit,
    control,
    watch,
    setValue,
    resetField,
    reset,
    register,
  } = useForm<typeof defaultValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
    shouldUnregister: true,
  });

  const ButtonWrapper = buttonsWrapperComponent ?? ModalFooter;
  const FieldWrapper = fieldsWrapperComponent ?? ModalBody;

  return (
    <NextUIModal
      backdrop='blur'
      isOpen={true}
      onOpenChange={onOpenChange}
      placement='center'
      isDismissable={false}
      hideCloseButton={hideCloseButton}
      scrollBehavior='inside'
      as={'form'}
      onSubmit={handleSubmit((data, event) => {
        onSubmit(data, event, reset);
      })}
      className={formClassName}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              {formHeader}
            </ModalHeader>
            <FieldWrapper className={fieldsWrapperClassName}>
              {fields.map((field, idx) => (
                <FormElements
                  key={field.name + idx}
                  {...field}
                  control={control}
                  watch={watch}
                  setValue={setValue}
                  resetField={resetField}
                  register={register}
                  initialValues={initialValues}
                />
              ))}
              {otherFormBodyElements}
            </FieldWrapper>
            <ButtonWrapper className={buttonWrapperClassName}>
              <Button type='submit' {...submitButtonProps}>
                {submitButtonLabel}
              </Button>
              {otherFooterElements}
            </ButtonWrapper>
          </>
        )}
      </ModalContent>
    </NextUIModal>
  );
};

export default DynamicForm;
