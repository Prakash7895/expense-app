import { InputSlots } from '@nextui-org/react';
import { Category, FormFields } from './types';
import { ReactNode } from 'react';
import axiosInstance from './axiosInstance';

export const loginFormFields: FormFields[] = [
  {
    label: 'Email/Phone',
    name: 'emailOrPhone',
    type: 'text',
    className: 'my-3',
    showCountryCode: true,
  },
  { label: 'Password', name: 'password', type: 'password' },
];

export const signupFormFields: (
  emailOrPhone?: string | null
) => FormFields<InputSlots>[] = (emailOrPhone) => [
  {
    label: 'First Name',
    name: 'firstName',
    type: 'text',
  },
  {
    label: 'LastName',
    name: 'lastName',
    type: 'text',
  },
  {
    label: 'Email/Phone',
    name: 'emailOrPhone',
    type: 'text',
    defaultValue: emailOrPhone ? emailOrPhone : '',
    isDisabled: !!emailOrPhone,
    showCountryCode: true,
  },
  { label: 'Password', name: 'password', type: 'password' },
  { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
];

export const forgotPassFormFields: (
  otpDescription: (val: any) => ReactNode
) => FormFields<InputSlots>[] = (otpDescription) => [
  {
    label: 'Email/Phone',
    name: 'emailOrPhone',
    type: 'text',
    showCountryCode: true,
  },
  {
    label: 'OTP',
    name: 'otp',
    type: 'text',
    subType: 'number',
    defaultValue: '',
    classNames: { description: 'ml-auto' },
    descriptionNode: otpDescription,
  },
  { label: 'Password', name: 'password', type: 'password', defaultValue: '' },
  {
    label: 'Confirm Password',
    name: 'confirmPassword',
    type: 'password',
    defaultValue: '',
  },
];

export const addTransaction = (
  categoryList: Category[],
  autoCompleteItem: (item: any) => ReactNode
) =>
  [
    { label: 'Amount', name: 'amount', type: 'text', subType: 'number' },
    {
      label: 'Type',
      name: 'type',
      type: 'select',
      options: [
        { value: 'credit', label: 'Credit' },
        { value: 'debit', label: 'Debit' },
      ],
      onFieldChange(_, resetField) {
        if (resetField) {
          resetField('categoryId');
        }
      },
    },
    {
      label: 'Category',
      name: 'categoryId',
      type: 'select',
      options: ({ type }) =>
        type
          ? categoryList
              .filter((el) => el.type === type)
              .map((el) => ({ label: el.name, value: el.id }))
          : [],
    },
    { label: 'Description', name: 'description', type: 'text' },
    {
      label: 'User',
      name: 'relatedUserId',
      type: 'autocomplete',
      autoCompleteItem: autoCompleteItem,
      fetchData: (queryKey) =>
        axiosInstance.get(
          `/api/user/related-users?pageNo=1&pageSize=5${
            queryKey[1] ? '&name=' + queryKey[1] : ''
          }`
        ),
    },
  ] as FormFields[];

export const categoryFormFields: FormFields[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
  },
  {
    label: 'Type',
    name: 'type',
    type: 'select',
    options: [
      { value: 'credit', label: 'Credit' },
      { value: 'debit', label: 'Debit' },
    ],
  },
];

export const accountFormFields: FormFields[] = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
  },
  {
    label: 'Description',
    name: 'description',
    type: 'textarea',
  },
];

export const inviteFormFields: FormFields = {
  label: 'Email/Phone',
  name: 'emailOrPhone',
  type: 'text',
  showCountryCode: true,
};
