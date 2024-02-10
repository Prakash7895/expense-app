import { Modal, ModalProps } from '@nextui-org/react';
import { FC } from 'react';
import { getMode } from '../utils/store/userSlice';
import { useAppSelector } from '../utils/types';

const NextUIModal: FC<ModalProps> = (props) => {
  const mode = useAppSelector(getMode);

  return (
    <Modal
      {...props}
      className={`${mode} text-foreground bg-background ${props.className}`}
    >
      {props.children}
    </Modal>
  );
};

export default NextUIModal;
