import { Select as NextUISelect, SelectProps } from '@nextui-org/react';
import { FC, forwardRef } from 'react';
import { getSettings } from '../utils/store/settingSlice';
import { useAppSelector } from '../utils/types';

const Select: FC<SelectProps> = forwardRef<HTMLSelectElement, SelectProps>(
  (props, ref) => {
    const { mode } = useAppSelector(getSettings);

    return (
      <NextUISelect
        {...props}
        classNames={{
          ...props.classNames,
          popoverContent: `${mode} text-foreground bg-background ${props.classNames?.popoverContent}`,
          value: `!text-default-900 ${props.classNames?.value}`,
        }}
        ref={ref}
      >
        {props.children}
      </NextUISelect>
    );
  }
);

export default Select;
