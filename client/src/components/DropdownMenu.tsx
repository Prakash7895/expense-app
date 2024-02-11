import {
  DropdownMenuProps,
  DropdownMenu as NextUIDropdownMenu,
} from '@nextui-org/react';
import { FC } from 'react';
import { DropdownMenuItem } from '../utils/types';

const DropdownMenu: FC<DropdownMenuProps<DropdownMenuItem>> = (props) => {
  return (
    <NextUIDropdownMenu {...props} variant='solid'>
      {props.children}
    </NextUIDropdownMenu>
  );
};

export default DropdownMenu;
