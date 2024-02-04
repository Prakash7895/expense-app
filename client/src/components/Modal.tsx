import {
  Button,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Modal as NextModal,
} from '@nextui-org/react';
import { FC, ReactNode } from 'react';

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
  return (
    <NextModal backdrop='blur' isOpen={isOpen} onClose={handleClose}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{header}</ModalHeader>
            <ModalBody>{body}</ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
              <Button color='secondary' onPress={confirmBtnAction}>
                {confirmBtnLabel}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </NextModal>
  );
};

export default Modal;
