import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { FC, ReactNode } from 'react';
import { getSettings } from '../utils/store/settingSlice';
import { useAppSelector } from '../utils/types';
import NextUIModal from './NextUIModal';

interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  header: string;
  body: ReactNode;
  confirmBtnLabel: string;
  confirmBtnAction: () => void;
}

const Modal: FC<ModalProps> = ({
  body,
  header,
  isOpen,
  handleClose,
  confirmBtnAction,
  confirmBtnLabel,
}) => {
  const { mode } = useAppSelector(getSettings);

  return (
    <NextUIModal
      backdrop='blur'
      isOpen={isOpen}
      onClose={handleClose}
      className={`${mode} text-foreground bg-background`}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{header}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
              <Button onPress={confirmBtnAction}>{confirmBtnLabel}</Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </NextUIModal>
  );
};

export default Modal;
