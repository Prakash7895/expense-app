import { ReactNode } from 'react';
import { AppDispatch, RootState } from './store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { UseFormResetField, UseFormSetValue } from 'react-hook-form';
import { SlotsToClasses } from '@nextui-org/react';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export type Mode = 'dark' | 'light';
export type ColorScheme = Mode | 'system';

export interface FormFields<T extends string = any> {
  name: string;
  type: 'text' | 'select' | 'password' | 'textarea';
  className?: string;
  label: string;
  isDisabled?: boolean;
  subType?: 'number';
  defaultValue?: string;
  options?:
    | { value: string; label: string }[]
    | ((values: any) => { value: string; label: string }[]);
  onFieldChange?: (
    event: any,
    resetField?: UseFormResetField<any>,
    setValue?: UseFormSetValue<any>
  ) => void;
  startContent?: JSX.Element;
  classNames?: SlotsToClasses<T>;
}

export interface Column {
  name: string;
  uid: string;
  isSortable?: boolean;
  cellRender?: (item: any) => ReactNode;
}

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface Category {
  id: string;
  name: string;
  type: string;
  userId: string | null;
}

export interface DropdownMenuItem {
  key: string;
  label: string;
  color?:
    | 'danger'
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning';
  className?: string;
}
