import { Select as NextUISelect, SelectProps } from '@nextui-org/react';
import { FC } from 'react';
import { getSettings } from '../utils/store/settingSlice';
import { useAppSelector } from '../utils/types';

const Select: FC<SelectProps> = (props) => {
  const { mode } = useAppSelector(getSettings);

  return (
    <NextUISelect
      {...props}
      classNames={{
        ...props.classNames,
        popoverContent: `${mode} text-foreground bg-background ${props.classNames?.popoverContent}`,
        value: `!text-default-900 ${props.classNames?.value}`,
      }}
    >
      {props.children}
    </NextUISelect>
  );
};

export default Select;
