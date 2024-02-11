import { Modal, ModalProps } from '@nextui-org/react';
import { FC } from 'react';
import { getSettings } from '../utils/store/settingSlice';
import { useAppSelector } from '../utils/types';

const NextUIModal: FC<ModalProps> = (props) => {
  const { mode } = useAppSelector(getSettings);

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
