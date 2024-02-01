import {
  Button,
  ButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormFields } from '../utils/types';
import { FC, ReactNode } from 'react';
import FormElements from './FormElements';

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
  otherFormBodyElements?: ReactNode;
  submitButtonProps?: ButtonProps;
  submitButtonLabel?: string;
  isOpen: boolean;
  onOpenChange?: (e: any) => void;
  hideCloseButton?: boolean;
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
  isOpen,
  onOpenChange,
  hideCloseButton,
}) => {
  const defaultValues = fields.reduce((acc, field) => {
    return { ...acc, [field.name]: field.defaultValue ?? '' };
  }, {});

  const { handleSubmit, control } = useForm<typeof defaultValues>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const ButtonWrapper = buttonsWrapperComponent ?? ModalFooter;
  const FieldWrapper = fieldsWrapperComponent ?? ModalBody;

  return (
    <Modal
      backdrop='blur'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement='top-center'
      isDismissable={false}
      hideCloseButton={hideCloseButton}
      scrollBehavior='inside'
      as={'form'}
      onSubmit={handleSubmit(onSubmit)}
      className={formClassName}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className='flex flex-col gap-1'>
              {formHeader}
            </ModalHeader>
            <FieldWrapper className={fieldsWrapperClassName}>
              {fields.map((field) => (
                <FormElements key={field.name} {...field} control={control} />
              ))}
              {otherFormBodyElements}
            </FieldWrapper>
            <ButtonWrapper className={buttonWrapperClassName}>
              <Button color='primary' type='submit' {...submitButtonProps}>
                {submitButtonLabel}
              </Button>
              {otherFooterElements}
            </ButtonWrapper>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DynamicForm;
