import { DropdownProps, Dropdown as NextUIDropdown } from '@nextui-org/react';
import { FC } from 'react';
import { getMode } from '../utils/store/userSlice';
import { useAppSelector } from '../utils/types';

const Dropdown: FC<DropdownProps> = (props) => {
  const mode = useAppSelector(getMode);

  return (
    <NextUIDropdown
      {...props}
      className={`${mode} text-foreground bg-background ${props.className}`}
    >
      {props.children}
    </NextUIDropdown>
  );
};

export default Dropdown;
